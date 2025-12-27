import { useNavigate, useSearchParams } from "react-router-dom";
import { courses } from "../data/courses";

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter") || "all";

  const filteredCourses = courses.filter((course) => {
    const title = course.title.toLowerCase();

    if (filter === "free") return course.price === 0;

    if (filter === "frontend")
      return (
        title.includes("react") ||
        title.includes("frontend") ||
        title.includes("ui")
      );

    if (filter === "backend")
      return (
        title.includes("java") ||
        title.includes("node") ||
        title.includes("sql") ||
        title.includes("mongo")
      );

    return true;
  });

  const setFilter = (value) => {
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 32, marginBottom: 6 }}>
            Tüm Kurslar
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            Yazılım yolculuğuna uygun eğitimi seç
          </p>
        </div>

        {/* FILTER */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "all", label: "Tümü" },
            { key: "frontend", label: "Frontend" },
            { key: "backend", label: "Backend" },
            { key: "free", label: "Ücretsiz" },
          ].map((item) => {
            const active = filter === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: active
                    ? "1px solid var(--primary)"
                    : "1px solid var(--border)",
                  background: active
                    ? "var(--primary-soft)"
                    : "white",
                  color: active
                    ? "var(--primary)"
                    : "var(--text)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              style={{
                background: "white",
                borderRadius: 14,
                border: "1px solid var(--border)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "none")
              }
            >
              {/* IMAGE */}
              <img
                src={course.image}
                alt={course.title}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                }}
              />

              {/* CONTENT */}
              <div
                style={{
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color:
                      course.price === 0
                        ? "#16a34a"
                        : "var(--primary)",
                    marginBottom: 6,
                  }}
                >
                  {course.price === 0
                    ? "Ücretsiz"
                    : "Ücretli"}
                </span>

                <h3
                  style={{
                    fontSize: 17,
                    lineHeight: 1.4,
                    marginBottom: 6,
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    marginBottom: 14,
                  }}
                >
                  {course.instructor}
                </p>

                <div style={{ marginTop: "auto" }}>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--muted)",
                      marginBottom: 14,
                    }}
                  >
                    {course.price === 0
                      ? "Ücretsiz"
                      : `${course.price} ₺`}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/course/${course.id}`)
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "white",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Detayları Gör →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {filteredCourses.length === 0 && (
          <p
            style={{
              marginTop: 40,
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            Bu filtreye uygun kurs bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
