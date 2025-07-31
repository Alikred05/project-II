"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import SearchBar from "../../components/student/SearchBar"
import { useParams } from "react-router-dom"
import CourseCard from "../../components/student/CourseCard"
import { assets } from "../../assets/assets"
import Footer from "../../components/student/Footer"

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      input
        ? setFilteredCourse(tempCourses.filter((item) => item.courseTitle.toLowerCase().includes(input.toLowerCase())))
        : setFilteredCourse(tempCourses)
    }
  }, [allCourses, input])

  return (
    <>
      <div className="relative bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* Hero Section for Course List */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-12 text-left">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between w-full">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-600 mb-4">
        Explore Our Courses 
      </h2>
              
              <p className="text-lg text-gray-600">
                <span
                  className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>{" "}
                <span className="mx-2">/</span> <span className="font-semibold text-gray-800">Course List</span>
              </p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <SearchBar data={input} />
            </div>
          </div>
        </div>

        {/* Search Tag Display */}
        {input && (
          <div className="container mx-auto px-4 md:px-8 lg:px-16 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100 text-blue-800 rounded-full shadow-sm text-sm font-medium">
              <p className="truncate max-w-xs">
                Searching for: <span className="font-semibold">{input}</span>
              </p>
              <img
                src={assets.cross_icon || "/placeholder.svg?height=16&width=16&query=cross icon"}
                alt="clear search"
                className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200"
                onClick={() => navigate("/course-list")}
              />
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          {filteredCourse.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCourse.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-gray-700">No courses found matching your search.</p>
              <button
                onClick={() => navigate("/course-list")}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                View All Courses
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CourseList
