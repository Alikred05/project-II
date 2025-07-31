"use client"

import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Loading = () => {
  const { path } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`)
      }, 5000) // Navigates after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [path, navigate]) // Added navigate to dependency array for best practice

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 z-[9999] p-4">
      <div className="flex space-x-3">
        <div
          className="w-5 h-5 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-5 h-5 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-5 h-5 bg-purple-600 dark:bg-purple-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <p className="mt-8 text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
        Loading content, please wait...
      </p>

     
      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  )
}

export default Loading
