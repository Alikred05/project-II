"use client"

import { useContext } from "react"
import { assets } from "../../assets/assets"
import { Link, useLocation } from "react-router-dom"
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"
import { AppContext } from "../../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const Navbar = () => {
  const location = useLocation()
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext)
  const { openSignIn } = useClerk()
  const { user } = useUser()

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator")
        return
      }
      const token = await getToken()
      const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("educ", data)
      if (data.success) {
        setIsEducator(true)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 py-4
                  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 border-b border-gray-200 dark:border-gray-700 shadow-sm`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo_dark || "/placeholder.svg?height=32&width=128&query=company logo"}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer transition-transform duration-200 hover:scale-105"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-300 font-medium">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="px-4 py-2 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <Link
              to="/my-enrollments"
              className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800 px-6 py-2 rounded-full shadow-md
                       hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 active:scale-95"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4 text-gray-700 dark:text-gray-300">
        {user && (
          <>
            <button
              onClick={becomeEducator}
              className="text-sm px-3 py-1 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
            >
              {isEducator ? "Dashboard" : "Educator"}
            </button>
            <span className="text-gray-400 dark:text-gray-500 text-sm">|</span>
            <Link
              to="/my-enrollments"
              className="text-sm px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <img
              src={assets.user_icon || "/placeholder.svg?height=24&width=24&query=user icon"}
              alt="User Icon"
              className="w-6 h-6"
            />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
