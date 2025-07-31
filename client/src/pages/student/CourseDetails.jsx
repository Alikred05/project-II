"use client"

import { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../context/AppContext"
import Loading from "../../components/student/Loading"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration"
import Footer from "../../components/student/Footer"
import YouTube from "react-youtube"
import { toast } from "react-toastify"
import axios from "axios"

const CourseDetails = () => {
  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const youtubePlayerRef = useRef(null)

  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext)

  const fetcheCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/" + id)
      if (data.success) {
        setCourseData(data.courseData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const enrollCourse = async () => {
    try {
      if (!userData) {
        return toast.warn("Login to Enroll!")
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Already Enrolled")
      }
      const token = await getToken()
      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetcheCourseData()
  }, [])

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  }, [userData, courseData])

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handlePreviewClick = (lectureUrl) => {
    const videoId = lectureUrl.split("/").pop()
    setPlayerData({ videoId })

    setTimeout(() => {
      if (youtubePlayerRef.current) {
        const iframe = youtubePlayerRef.current.getIframe()
        if (iframe && iframe.requestFullscreen) {
          iframe.requestFullscreen().catch((err) => {
            console.error("Error attempting to enable full-screen mode:", err)
            toast.error("Failed to go fullscreen. Please allow fullscreen in your browser settings.")
          })
        }
      }
    }, 100)
  }

  return courseData ? (
    <>
      <div className="relative flex flex-col md:flex-row items-start justify-between px-4 md:px-8 lg:px-16 pt-20 pb-10 gap-12 lg:gap-16">
        {/* Enhanced Hero Background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10 opacity-70"></div>

        {/* Left Column - Course Overview */}
        <div className="w-full md:w-1/2 z-10 text-gray-800">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 drop-shadow-sm">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 250) + "...", // Increased slice for more description
            }}
          ></p>

          {/* Review and Stats Section */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 pb-6 text-base text-gray-600">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-800">{calculateRating(courseData)}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="w-4 h-4"
                    key={i}
                    src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                    alt="star rating"
                  />
                ))}
              </div>
              <p className="text-blue-600 font-medium">
                ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-700 font-medium">
                {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "students" : "student"}{" "}
                enrolled
              </p>
            </div>
          </div>
          <p className="text-md text-gray-600">
            Course by{" "}
            <span className="text-blue-700 font-semibold hover:underline cursor-pointer">
              {courseData.educator.name}
            </span>
          </p>

          {/* Course Structure */}
          <div className="pt-12 text-gray-800">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Course Curriculum</h2>
            <div>
              {courseData.courseContent.map((chapter, index) => (
                <div
                  className="border border-gray-200 bg-white mb-4 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  key={index}
                >
                  <div
                    className="flex items-center justify-between px-6 py-4 cursor-pointer select-none bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        className={`w-5 h-5 transform transition-transform duration-300 ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon || "/placeholder.svg?height=20&width=20&query=down arrow icon"}
                        alt="toggle section"
                      />
                      <p className="font-bold text-lg md:text-xl text-gray-900">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}{" "}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="list-none pl-0 pr-4 py-3 text-gray-700 border-t border-gray-100">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 py-2 px-6 hover:bg-blue-50 transition-colors duration-150"
                        >
                          {lecture.isPreviewFree ? (
                            <img
                              onClick={() => handlePreviewClick(lecture.lectureUrl)}
                              className="w-5 h-5 cursor-pointer text-blue-600 flex-shrink-0"
                              src={assets.play_icon || "/placeholder.svg?height=20&width=20&query=play icon"}
                              alt="play preview"
                            />
                          ) : (
                            <img
                              className="w-5 h-5 text-gray-400 flex-shrink-0"
                              src={assets.play_icon || "/placeholder.svg?height=20&width=20&query=play icon disabled"}
                              alt="play icon"
                            />
                          )}
                          <div className="flex items-center justify-between w-full text-gray-800 text-base md:text-lg">
                            <p className="flex-grow">{lecture.lectureTitle}</p>
                            <div className="flex gap-4 items-center flex-shrink-0">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() => handlePreviewClick(lecture.lectureUrl)}
                                  className="text-blue-600 cursor-pointer font-medium hover:underline"
                                >
                                  Preview
                                </p>
                              )}
                              <p className="text-gray-500 text-sm">
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ["h", "m"],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Description */}
          <div className="py-12 text-gray-800">
            <h3 className="text-3xl font-bold text-gray-900 mb-5">About This Course</h3>
            <p
              className="rich-text text-gray-700 leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* Right Column - Course Card */}
        <div className="w-full md:w-1/2 z-10 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.01] sticky top-28">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video rounded-t-2xl"
              onReady={(event) => {
                youtubePlayerRef.current = event.target
              }}
            />
          ) : (
            <img
              src={courseData.courseThumbnail || "/placeholder.svg?height=400&width=700&query=course thumbnail preview"}
              alt="courseThumbnail"
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 text-red-600 text-base font-semibold mb-4">
              <img
                className="w-5 h-5"
                src={assets.time_left_clock_icon || "/placeholder.svg?height=20&width=20&query=clock icon"}
                alt="time left icon"
              />
              <p>
                <span className="font-bold">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-4 items-baseline mb-6">
              <p className="text-gray-900 text-4xl md:text-5xl font-extrabold">
                {currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="text-xl text-gray-500 line-through">
                {currency} {courseData.coursePrice}{" "}
              </p>
              <p className="text-xl text-green-600 font-bold">{courseData.discount}% off </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-base text-gray-700 mb-8">
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={assets.star || "/placeholder.svg?height=20&width=20&query=star icon"}
                  alt="star icon"
                />
                <p>{calculateRating(courseData)} Rating</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={assets.time_clock_icon || "/placeholder.svg?height=20&width=20&query=duration icon"}
                  alt="time clock icon"
                />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={assets.lesson_icon || "/placeholder.svg?height=20&width=20&query=lessons icon"}
                  alt="lesson icon"
                />
                <p>{calculateNoOfLectures(courseData)} Lessons</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={assets.student_icon || "/placeholder.svg?height=20&width=20&query=students icon"}
                  alt="students icon"
                />
                <p>{courseData.enrolledStudents.length} Students</p>
              </div>
            </div>

						<div
							// onClick={enrollCourse}
							
						>
							{isAlreadyEnrolled
								? <p className="md:mt-6 mt-4 w-full py-3 rounded text-center  bg-blue-600 text-white font-medium"> Already Enrolled </p>
								: courseData.coursePrice -
										(courseData.discount * courseData.coursePrice) / 100 ===
								  0.00
								? <p className="md:mt-6 mt-4 w-full py-3 rounded text-center  bg-blue-600 text-white font-medium"> Free </p>
								: <button onClick={enrollCourse} className="md:mt-6 mt-4 w-full py-3 rounded text-center  bg-blue-600 text-white font-medium"> Enroll Now</button>}
						</div>

						<div >
							{courseData.coursePrice -
								(courseData.discount * courseData.coursePrice) / 100 ===
							0.00 ? (
								<p className="md:mt-6 mt-4 w-full text-center py-3 rounded  bg-blue-600 text-white font-medium">Click on Course structure </p>
							) : isAlreadyEnrolled ? <Link  to="/my-enrollments"><p className="md:mt-6 mt-4 w-full text-center py-3 rounded  bg-blue-600 text-white font-medium">My Enrollments</p> </Link> : ""}
						</div>

						<div className="pt-6">
							<p className="md:text-xl text-lg font-medium text-gray-800">
								What's in the course?{" "}
							</p>
							<ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
								<li>Lifetime access with free updates.</li>
								<li>Step-by-step, hands-on project guidance.</li>
								<li>Downloadable resources and source code.</li>
								<li>Quizzes to test your knowledge.</li>
								<li>Certificate of completion.</li>
								<li>Quizzes to test your knowledge.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	) : (
		<Loading />
	);
};
export default CourseDetails;