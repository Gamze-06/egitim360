import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkStyle = ({ isActive }) => ({
    position: "relative",
    textDecoration: "none",
    color: isActive ? "var(--text)" : "var(--muted)",
    fontWeight: 500,
    padding: "6px 2px",
    transition: "color 0.2s ease",
  });

  const underlineStyle = (isActive) => ({
    position: "absolute",
    left: 0,
    bottom: -4,
    height: 2,
    width: isActive ? "100%" : "0%",
    background: "var(--primary)",
    borderRadius: 2,
    transition: "width 0.25s ease",
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        background: isDark
          ? scrolled
            ? "linear-gradient(180deg, rgba(2,6,23,0.98), rgba(2,6,23,0.92))"
            : "linear-gradient(180deg, rgba(15,23,42,0.85), rgba(2,6,23,0.7))"
          : "var(--surface)",
        borderBottom: isDark
          ? scrolled
            ? "1px solid rgba(148,163,184,0.25)"
            : "1px solid rgba(148,163,184,0.12)"
          : "1px solid var(--border)",
        boxShadow: isDark
          ? scrolled
            ? "0 12px 40px rgba(0,0,0,0.45)"
            : "0 6px 20px rgba(0,0,0,0.25)"
          : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <span
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            fontSize: 22,
            fontWeight: 800,
            color: "var(--primary)",
            letterSpacing: "-0.5px",
          }}
        >
          egitim360
        </span>

        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* KURSLAR */}
          <NavLink to="/courses" style={linkStyle}>
            {({ isActive }) => (
              <>
                Kurslar
                <span style={underlineStyle(isActive)} />
              </>
            )}
          </NavLink>

          {/* 🌙☀️ THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Tema Değiştir"
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: isDark
                ? "1px solid rgba(148,163,184,0.25)"
                : "1px solid var(--border)",
              background: isDark
                ? "radial-gradient(circle at top, #1e1b4b, #020617)"
                : "var(--surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: 18,
              boxShadow: isDark
                ? "0 0 0 1px rgba(99,102,241,0.2)"
                : "none",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: isDark
                    ? "1px solid rgba(148,163,184,0.25)"
                    : "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Giriş
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  background:
                    "linear-gradient(135deg, var(--primary), #6366f1)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Kayıt Ol
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: isDark
                    ? "1px solid rgba(148,163,184,0.25)"
                    : "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Panelim
              </button>

              <button
                onClick={logout}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: isDark
                    ? "1px solid rgba(148,163,184,0.25)"
                    : "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text)",
                  cursor: "pointer",
                }}
              >
                Çıkış
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;