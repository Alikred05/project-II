import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'



const CourseCard = ({course}) => {

   const{ currency, calculateRating } = useContext(AppContext)

   const isValidPrice = typeof course.coursePrice === "number" && !isNaN(course.coursePrice)
    const originalPrice = isValidPrice ? course.coursePrice.toFixed(2) : "0.00" 
   const discountedPrice = isValidPrice
    ? (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)
    : "0.00"
    const hasDiscount = isValidPrice && course.discount > 0 && discountedPrice !== originalPrice


  return (
       <Link
      to={"/course/" + course._id}
      onClick={() => window.scrollTo(0, 0)} // Use window.scrollTo for client-side navigation
      className="block rounded-xl shadow-lg overflow-hidden transform transition-all duration-300
                 hover:scale-[1.02] hover:shadow-xl border border-gray-100 dark:border-gray-700 group
                 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950" // Applied the matching gradient background
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={course.courseThumbnail || "/placeholder.svg?height=192&width=300&query=course thumbnail"}
          alt={course.courseTitle}
        />
        {hasDiscount && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {course.discount}% OFF
          </span>
        )}
        </div>
      <div className="p-5 text-left flex flex-col h-full">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200">
          {course.courseTitle}
        </h3>
           <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-3">{course.educator.name}</p>
        <div className="flex items-center space-x-2 mb-3">
          <p className="text-gray-800 dark:text-gray-200 font-semibold md:text-lg lg:text-xl">
            {calculateRating(course)}
          </p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                alt="star rating"
                className="w-4 h-4"
              />
            ))}
          </div>
             <p className="text-base md:text-lg lg:text-xl text-gray-500 dark:text-gray-400">
            ({course.courseRatings.length})
          </p>
          </div>
          <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-blue-700 dark:text-blue-400">{currency}{(course.coursePrice - course.discount * course.coursePrice/100).toFixed(2)}</p>
        </div>
    </Link>
  )
}

export default CourseCard

