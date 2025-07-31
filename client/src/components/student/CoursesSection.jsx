import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext.jsx'
import CourseCard from './CourseCard'

const CoursesSection = () => {

  const { allCourses } = useContext(AppContext)

  return (
    <div className="py-16 md:px-40 px-8">
       <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-gray-600 mb-4">
        Learn from the best
      </h2>
       <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-0 md:my-16 my-10">
        {allCourses.slice(0, 4).map((course, index) =>
          <CourseCard key={index} course={course} />
        )}
      </div>

      <Link to={'/course-list'} onClick={() => scrollTo(0, 0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>Show all courses</Link>
    </div>
  )
}

export default CoursesSection
