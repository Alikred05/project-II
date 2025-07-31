"use client"
import { assets } from "../../assets/assets"

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center text-center py-20 md:py-28 px-4 md:px-8 lg:px-16 w-full">

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-600 mb-4">
        Learn anything, anytime, anywhere
      </h2>

      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10 max-w-3xl mx-auto">

        Whether you're a student looking to enhance your skills or an educator wanting to share knowledge, Edemy LMS is
        the perfect platform for you.
      </p>
      <div className="flex flex-col sm:flex-row items-center font-medium gap-6 md:gap-8">

        <button
          className="px-10 py-4 rounded-full text-white bg-blue-600 dark:bg-blue-700 shadow-lg
                           hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
        >

          Get Started
        </button>
        <button
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold px-4 py-2 rounded-full
                           hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
        >
          Learn more
          <img
            src={assets.arrow_icon || "/placeholder.svg?height=20&width=20&query=arrow icon"}
            alt="arrow_icon"
            className="w-5 h-5 text-blue-600 dark:text-blue-400"

          />
        </button>
      </div>
    </div>
  )
}

export default CallToAction
