"use client"
import { assets } from "../../assets/assets"
import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center w-full pt-24 md:pt-36 pb-16 md:pb-24 px-4 sm:px-8 lg:px-16 text-center overflow-hidden
                bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"
    >
      {" "}
      {/* Enhanced gradient background */}
      {/* Optional: Add subtle background shapes/blobs for extra visual interest */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-indigo-200 dark:bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-gray-100 max-w-5xl mx-auto leading-tight mb-6 drop-shadow-lg">
        Empower Your Future with Courses Designed{" "}
        <span className="text-blue-700 dark:text-blue-400">to Fit Your Choice.</span>{" "}
        <img
          src={assets.sketch || "/placeholder.svg?height=80&width=150&query=hand drawn underline sketch"}
          alt="sketch underline"
          className="hidden md:block absolute -bottom-8 right-0 w-32 lg:w-48 transform rotate-3"
        />
      </h1>
      <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
        We bring together world-class instructors, interactive content, and a supportive community to help you achieve
        your personal and professional goals.
      </p>
      <SearchBar />
      {/* Add a simple animation for the SearchBar or a subtle element */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Hero
