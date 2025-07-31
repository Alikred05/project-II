"use client"
import { assets, dummyTestimonial } from "../../assets/assets"

const TestimonialSection = () => {
  return (
    <div className="py-20 md:py-28 px-4 md:px-8 lg:px-16 text-center w-full">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-600 mb-4">
        What Our Learners Say
      </h2>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
        Hear from our learners as they share their journeys of transformation, success, and how our platform has made a
        difference in their lives.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-left border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden
                       transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl
                       bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"
          >
            <div className="flex items-center gap-4 px-6 py-5 bg-gray-50 dark:bg-white rounded-t-2xl">
              <img
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
                src={testimonial.image || "/placeholder.svg?height=56&width=56&query=testimonial avatar"}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {/* Gradient text for name */}
                  {testimonial.name}
                </h1>
                <p className="text-sm bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-700 dark:to-blue-500 bg-clip-text text-transparent">
                  {/* Gradient text for role */}
                  {testimonial.role}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{testimonial.feedback}</p>
            </div>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline px-6 pb-6 block text-right"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
