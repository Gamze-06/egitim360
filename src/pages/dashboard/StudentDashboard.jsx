import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, enrolledCourses, logout } = useContext(AuthContext);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div>
          <h1 style={{ fontSize: 32 }}>🎓 Öğrenci Paneli</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Hoş geldin, <strong>{user?.email}</strong>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "white",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Çıkış Yap
        </button>
      </div>

      {/* CONTENT */}
      <h2 style={{ marginBottom: 20 }}>Kurslarım</h2>

      {enrolledCourses.length === 0 ? (
        <div
          style={{
            padding: 40,
            border: "2px dashed var(--border)",
            borderRadius: 20,
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          Henüz bir kursa katılmadınız.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "white",
                borderRadius: 20,
                padding: 24,
                border: "1px solid var(--border)",
                boxShadow:
                  "0 10px 24px rgba(0,0,0,.06)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* TOP */}
              <div>
                <h3 style={{ marginBottom: 6 }}>
                  {course.title}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: 14,
                  }}
                >
                  {course.instructor}
                </p>

                {/* PROGRESS */}
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      height: 8,
                      background: "var(--border)",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${course.progress}%`,
                        height: "100%",
                        background:
                          course.progress === 100
                            ? "var(--success)"
                            : "var(--primary)",
                        transition: "width .3s",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    %{course.progress} tamamlandı
                  </p>
                </div>
              </div>

              {/* ACTION */}
              <div style={{ marginTop: 20 }}>
                {course.progress === 100 ? (
                  <button
                    onClick={() =>
                      navigate(`/certificate/${course.id}`)
                    }
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "none",
                      background:
                        "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    🎓 Sertifikayı Gör
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate(`/course/${course.id}`)
                    }
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "white",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Derse Devam Et →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
