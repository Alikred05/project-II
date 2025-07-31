import { Webhook } from "svix";
import Stripe from "stripe";
import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

// Initialize Stripe instance
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===================================
// Clerk Webhooks: Sync users with DB
// ===================================
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                break;
            }

            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }

        return res.json({ success: true });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// =========================================
// Stripe Webhook: Handle course enrollment
// =========================================
export const stripeWebhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify the Stripe webhook signature
        event = Stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        // ✅ Main event for successful payments using Checkout Sessions
        case 'checkout.session.completed': {
            const session = event.data.object;
            const purchaseId = session.metadata?.purchaseId;

            if (!purchaseId) break;

            const purchase = await Purchase.findById(purchaseId);
            if (!purchase) break;

            const user = await User.findById(purchase.userId);
            const course = await Course.findById(purchase.courseId);

            if (!user || !course) break;

            // Add user to course's enrolled students (if not already)
            if (!course.enrolledStudents.includes(user._id)) {
                course.enrolledStudents.push(user._id);
                await course.save();
            }

            // Add course to user's enrolled courses (if not already)
            if (!user.enrolledCourses.includes(course._id)) {
                user.enrolledCourses.push(course._id);
                await user.save();
            }

            // Mark purchase as completed
            purchase.status = 'completed';
            await purchase.save();

            break;
        }

        // Optional: Handle payment failure
        case 'checkout.session.expired':
        case 'payment_intent.payment_failed': {
            const session = event.data.object;
            const purchaseId = session.metadata?.purchaseId;

            if (purchaseId) {
                const purchase = await Purchase.findById(purchaseId);
                if (purchase) {
                    purchase.status = 'failed';
                    await purchase.save();
                }
            }

            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};
