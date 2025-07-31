"use client"
import { useEffect, useState } from "react"
import { Star } from "lucide-react" // Import Lucide React Star icon

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0)

  const handleRating = (value) => {
    setRating(value)
    if (onRate) onRate(value)
  }

  useEffect(() => {
    if (initialRating !== undefined && initialRating !== null) {
    
      setRating(initialRating)
    }
  }, [initialRating])

  return (
    <div className="flex items-center gap-0.5">
     
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors duration-200
              ${
                starValue <= rating
                  ? "text-yellow-400 fill-yellow-400" // Filled star color
                  : "text-gray-300 dark:text-gray-600 hover:text-yellow-300 dark:hover:text-yellow-500" // Unfilled star color with hover
              }`}
            onClick={() => handleRating(starValue)}
            aria-label={`Rate ${starValue} out of 5 stars`} // Accessibility
          />
        )
      })}
    </div>
  )
}

export default Rating
