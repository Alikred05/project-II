"use client"
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 text-center py-16 md:py-24">
      {/* Increased overall vertical padding for more presence */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-start justify-between gap-16 md:gap-24 pb-12 border-b border-gray-200 dark:border-gray-700">
        {/* Increased horizontal gaps between sections */}
        {/* Company Info Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-2/5 lg:w-1/3">
          <img
            src={assets.logo_dark || "/placeholder.svg?height=40&width=160&query=company logo dark"}
            alt="logo"
            className="w-36 md:w-48 mb-6 transition-transform duration-300 hover:scale-105"
            // Slightly larger logo, added hover scale
          />
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left max-w-md">
            {/* Slightly larger text for better readability */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum quas, eum possimus dolore libero deleniti
            eveniet ea optio, necessitatibus, numquam quasi. Dignissimos at blanditiis molestias!
          </p>
        </div>

        {/* Company Links Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/5 lg:w-1/6">
          <h2 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-6">Company</h2>
          {/* Slightly larger heading, increased bottom margin */}
          <ul className="flex flex-col items-center md:items-start space-y-4 text-base text-gray-700 dark:text-gray-300">
            {/* Increased vertical spacing between links */}
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                // Added font-medium for links
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-2/5 lg:w-1/3">
          <h2 className="font-bold text-gray-900 dark:text-gray-100 text-xl mb-6">Subscribe to our newsletter</h2>
          {/* Slightly larger heading, increased bottom margin */}
          <p className="text-base text-gray-700 dark:text-gray-300 mb-5 text-center md:text-left">
            {/* Slightly larger text */}
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                         bg-white dark:text-gray-800 placeholder-gray-400 dark:placeholder-gray-500
                         outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
              // Slightly more vertical padding, rounded-lg, text-base
            />
            <button
              className="w-full sm:w-auto px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg
                               hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
              // Increased horizontal padding, rounded-lg, more pronounced shadow and hover effects
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="pt-8 text-center text-sm md:text-base text-gray-600 dark:text-gray-400">
        {/* Slightly larger text for copyright */}
        Copyright 2025@RojanPoudel. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
