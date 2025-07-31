"use client"
import { assets } from "../../assets/assets"

const Companies = () => {
  return (
    <div className="py-16 md:py-24 text-center">

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-600 mb-4">
        Trusted by learners from 
      </h2>
        {/* Trusted by learners from */}
      
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 md:gap-x-16 md:gap-y-12 px-4 md:px-8 md:pt-10 lg:px-16">
       
        <img
          src={assets.microsoft_logo || "/placeholder.svg?height=48&width=120&query=Microsoft logo"}
          alt="Microsoft logo"
          className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
         
        />
        <img
          src={assets.walmart_logo || "/placeholder.svg?height=48&width=120&query=Walmart logo"}
          alt="Walmart logo"
          className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        />
        <img
          src={assets.accenture_logo || "/placeholder.svg?height=48&width=120&query=Accenture logo"}
          alt="Accenture logo"
          className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        />
        <img
          src={assets.adobe_logo || "/placeholder.svg?height=48&width=120&query=Adobe logo"}
          alt="Adobe logo"
          className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        />
        <img
          src={assets.paypal_logo || "/placeholder.svg?height=48&width=120&query=PayPal logo"}
          alt="PayPal logo"
          className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        />
      </div>
    </div>
  )
}

export default Companies
