import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import LessonDetail from "../pages/LessonDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import InstructorDashboard from "../pages/dashboard/InstructorDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Payment from "../pages/Payment";
import Certificate from "../pages/Certificate";
import RoleProtectedRoute from "./RoleProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course/:id" element={<CourseDetail />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* STUDENT */}
      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute allowedRole="student">
            <StudentDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* LESSON DETAIL */}
      <Route
        path="/course/:courseId/lesson/:lessonIndex"
        element={
          <RoleProtectedRoute allowedRole="student">
            <LessonDetail />
          </RoleProtectedRoute>
        }
      />

      {/* PAYMENT */}
      <Route
        path="/payment/:id"
        element={
          <RoleProtectedRoute allowedRole="student">
            <Payment />
          </RoleProtectedRoute>
        }
      />

      {/* CERTIFICATE */}
      <Route
        path="/certificate/:id"
        element={
          <RoleProtectedRoute allowedRole="student">
            <Certificate />
          </RoleProtectedRoute>
        }
      />

      {/* INSTRUCTOR */}
      <Route
        path="/instructor"
        element={
          <RoleProtectedRoute allowedRole="instructor">
            <InstructorDashboard />
          </RoleProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
