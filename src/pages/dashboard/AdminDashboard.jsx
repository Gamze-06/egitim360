import { useState } from "react";
import { courses as initialCourses } from "../../data/courses";

const AdminDashboard = () => {
  const [courses, setCourses] = useState(initialCourses);

  const handleApprove = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? { ...course, status: "approved" }
          : course
      )
    );
  };

  const handleReject = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const pendingCourses = courses.filter(
    (course) => course.status === "pending"
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Paneli</h2>

      <h3>Onay Bekleyen Kurslar</h3>

      {pendingCourses.length === 0 && (
        <p>Onay bekleyen kurs yok 🎉</p>
      )}

      <ul>
        {pendingCourses.map((course) => (
          <li key={course.id}>
            <strong>{course.title}</strong> – {course.instructor}
            <button
              onClick={() => handleApprove(course.id)}
              style={{ marginLeft: "10px" }}
            >
              Onayla
            </button>
            <button
              onClick={() => handleReject(course.id)}
              style={{ marginLeft: "5px" }}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
