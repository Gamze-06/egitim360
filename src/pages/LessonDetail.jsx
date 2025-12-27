import { useParams, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { courses } from "../data/courses";

const LessonDetail = () => {
  const { courseId, lessonIndex } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { completeLesson } = useContext(AuthContext);

  const [watched, setWatched] = useState(0);
  const [completed, setCompleted] = useState(false);

  const course = courses.find((c) => c.id === Number(courseId));
  const lesson =
    course?.lessons && course.lessons[Number(lessonIndex)];

  if (!course || !lesson) {
    return <h2 style={{ padding: "20px" }}>Ders bulunamadı</h2>;
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const percent = Math.floor(
      (video.currentTime / video.duration) * 100
    );

    setWatched(percent);

    // %80 izlendiyse ve daha önce tamamlanmadıysa
    if (percent >= 80 && !completed) {
      completeLesson(course.id, lessonIndex);
      setCompleted(true);
    }
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px" }}>
      <h1>{lesson.title}</h1>

      <p style={{ color: "#555", marginBottom: "10px" }}>
        Kurs: <strong>{course.title}</strong>
      </p>

      {/* VIDEO */}
      <video
        ref={videoRef}
        width="100%"
        height="420"
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{
          borderRadius: "12px",
          background: "black",
          marginBottom: "10px",
        }}
      >
        <source src={lesson.video} type="video/mp4" />
      </video>

      {/* YÜZDE GÖSTERİM */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            height: "8px",
            background: "#e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${watched}%`,
              height: "100%",
              background:
                watched >= 80 ? "#22c55e" : "#4f46e5",
              transition: "width 0.2s",
            }}
          />
        </div>

        <p style={{ fontSize: "14px", marginTop: "6px" }}>
          İzleme: %{watched}{" "}
          {completed && "✅ Ders Tamamlandı"}
        </p>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Dashboard’a Dön
      </button>
    </div>
  );
};

export default LessonDetail;
