import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const CourseCard = ({ course }) => {
  const { enrolledCourses } = useContext(AuthContext);

  const isEnrolled = enrolledCourses.some(
    (enrolled) => enrolled.id === course.id
  );

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* KATILDIN ETİKETİ */}
      {isEnrolled && (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "4px 8px",
            fontSize: "12px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Katıldın
        </span>
      )}

      <img src={course.image} alt={course.title} width="100%" />

      <div style={{ padding: "10px" }}>
        <h4>{course.title}</h4>
        <p>{course.instructor}</p>

        <strong>
          {course.price === 0 ? "Ücretsiz" : `${course.price} ₺`}
        </strong>

        <br />

        <Link to={`/course/${course.id}`}>
          {isEnrolled ? "Kursa Git" : "Detaya Git"}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
