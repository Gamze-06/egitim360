import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  /* ================= AUTH ================= */

  const login = (email, role = "student") => {
    setUser({ email, role });
    setEnrolledCourses([]);
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
  };

  /* ================= ENROLL ================= */

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => {
      if (prev.some((c) => c.id === course.id)) return prev;

      return [
        ...prev,
        {
          ...course,
          progress: 0,
          completedLessons: [], // 🔥 kurs bazlı
        },
      ];
    });
  };

  /* ================= PROGRESS ================= */

  const completeLesson = (courseId, lessonIndex) => {
    setEnrolledCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;

        // Aynı dersi tekrar sayma
        if (course.completedLessons.includes(lessonIndex)) {
          return course;
        }

        const updatedCompleted = [
          ...course.completedLessons,
          lessonIndex,
        ];

        const totalLessons = course.lessons.length;
        const progress = Math.round(
          (updatedCompleted.length / totalLessons) * 100
        );

        return {
          ...course,
          completedLessons: updatedCompleted,
          progress,
        };
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        enrolledCourses,
        enrollCourse,
        completeLesson,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
