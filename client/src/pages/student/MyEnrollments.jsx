"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { Line } from "rc-progress"
import Footer from "../../components/student/Footer"
import { toast } from "react-toastify"
import axios from "axios"

const MyEnrollMents = () => {
  const {
    navigate,
    enrolledCourses,
    calculateCourseDuration,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext)

  const [progressArray, setProgressArray] = useState([])

  const getCourseProgress = async () => {
    try {
      const token = await getToken()
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } },
          )
          console.log("dta", data.progressData)
          const totalLectures = calculateNoOfLectures(course)
          const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0
          return { totalLectures, lectureCompleted }
        }),
      )
      setProgressArray(tempProgressArray)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses()
    }
  }, [userData, fetchUserEnrolledCourses])

  useEffect(()=>{
    if(enrolledCourses.length > 0){
      getCourseProgress();
    }
  }, [enrolledCourses])

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Enrollments</h1>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-gray-50">
              <tr className="border-b border-gray-200 text-gray-700 text-left">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-2/5 sm:w-auto">
                  Course
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                  Duration
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">
                  Completed
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right sm:text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 text-gray-800">
              {enrolledCourses.map((course, index) => (
                <tr
                  className="border-b border-gray-200 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  key={index}
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex items-center space-x-4 py-3">
                    <img
                      className="w-16 h-10 sm:w-24 sm:h-14 md:w-28 md:h-16 object-cover rounded-md cursor-pointer"
                      onClick={() => navigate("/player/" + course._id)}
                      src={course.courseThumbnail || "/placeholder.svg"}
                      alt="courseThumbnail"
                    />
                    <div className="flex-1 cursor-pointer" onClick={() => navigate("/player/" + course._id)}>
                      <p className="font-medium text-base sm:text-lg mb-1 line-clamp-2">{course.courseTitle}</p>
                      <Line
                        strokeWidth={2}
                        percent={
                          progressArray[index]
                            ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures
                            : 0
                        }
                        className="bg-gray-200 rounded-full h-1.5"
                        strokeColor="#2563eb"
                      />
                      <span className="text-xs text-gray-500 mt-1 block">
                        {progressArray[index] &&
                          `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} `}{" "}
                        Lectures Completed
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden sm:table-cell text-gray-700">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden sm:table-cell text-gray-700">
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} `}{" "}
                    <span>Lectures</span>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right sm:text-left">
                    <button
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 
                                            ${
                                              progressArray[index] &&
                                              progressArray[index].lectureCompleted /
                                                progressArray[index].totalLectures ===
                                                1
                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                      onClick={() => navigate("/player/" + course._id)}
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                        ? "Completed"
                        : "On Going"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollMents
