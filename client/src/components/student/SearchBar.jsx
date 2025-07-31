"use client"

import { useState } from "react"
import { assets } from "../../assets/assets"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : "")

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate("/course-list/" + input)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={onSearchHandler}
        className="w-full h-14 flex items-center bg-white border border-gray-200 rounded-full shadow-lg overflow-hidden
                   focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300"
      >
        <img
          src={assets.search_icon || "/placeholder.svg?height=24&width=24&query=search icon"}
          alt="search icon"
          className="w-6 h-6 ml-5 mr-3 text-gray-400 flex-shrink-0"
        />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for courses, topics, or instructors..."
          className="flex-grow h-full outline-none border-none text-gray-700 placeholder-gray-400 text-base bg-transparent"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-8 py-3 rounded-full mr-2
                     shadow-md hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
