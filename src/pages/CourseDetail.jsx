import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { courses } from "../data/courses";
import { AuthContext } from "../context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, enrollCourse, completeLesson } = useContext(AuthContext);

  const course = courses.find((c) => c.id === Number(id));
  const [activeLesson, setActiveLesson] = useState(0);

  if (!course) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Kurs bulunamadı</h2>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (course.price > 0) {
      navigate(`/payment/${course.id}`);
      return;
    }

    enrollCourse(course);
  };

  const lesson = course.lessons[activeLesson];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 40 }}>
      {/* HERO */}
      <h1 style={{ fontSize: 32 }}>{course.title}</h1>
      <p style={{ color: "var(--muted)", marginBottom: 20 }}>
        Eğitmen: {course.instructor}
      </p>

      {/* VIDEO */}
      <div style={{ marginBottom: 30 }}>
        <video
          key={lesson.video}
          controls
          width="100%"
          style={{ borderRadius: 12 }}
          onEnded={() => completeLesson(course.id, activeLesson)}
        >
          <source src={lesson.video} type="video/mp4" />
        </video>
      </div>

      {/* LESSON LIST */}
      <h3>Kurs İçeriği</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {course.lessons.map((l, index) => (
          <li
            key={index}
            onClick={() => setActiveLesson(index)}
            style={{
              padding: "12px 16px",
              marginBottom: 8,
              borderRadius: 8,
              cursor: "pointer",
              background:
                index === activeLesson
                  ? "var(--primary-soft)"
                  : "var(--surface)",
              border: "1px solid var(--border)",
              fontWeight: index === activeLesson ? 600 : 400,
            }}
          >
            ▶ {l.title}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleEnroll}
        style={{
          marginTop: 30,
          padding: "14px 28px",
          background: "var(--primary)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {course.price === 0 ? "Kursa Katıl" : "Satın Al"}
      </button>
    </div>
  );
};

export default CourseDetail;
