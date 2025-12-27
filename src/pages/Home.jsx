import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #4f46e5, #6366f1)",
          color: "white",
          padding: "100px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <h1
              style={{
                fontSize: 48,
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              Yazılım Öğrenmenin  
              <br />
              <strong>360° Yolu</strong>
            </h1>

            <p
              style={{
                fontSize: 18,
                opacity: 0.9,
                marginBottom: 30,
                lineHeight: 1.6,
              }}
            >
              egitim360 ile frontend, backend, mobil ve
              kariyer eğitimlerini gerçek projelerle öğren.
            </p>

            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => navigate("/courses")}
                style={{
                  padding: "14px 26px",
                  borderRadius: 12,
                  border: "none",
                  background: "white",
                  color: "#4f46e5",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Kursları Keşfet
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  padding: "14px 26px",
                  borderRadius: 12,
                  border: "2px solid white",
                  background: "transparent",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ücretsiz Başla
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 24,
              padding: 30,
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 16,
              }}
            >
              <li style={{ marginBottom: 16 }}>
                ✔ Video tabanlı dersler
              </li>
              <li style={{ marginBottom: 16 }}>
                ✔ İlerleme takibi
              </li>
              <li style={{ marginBottom: 16 }}>
                ✔ Sertifika
              </li>
              <li>
                ✔ Kariyer odaklı içerikler
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* INFO */}
      <section
        style={{
          background: "var(--bg)",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 32, marginBottom: 20 }}>
            Neden egitim360?
          </h2>

          <p
            style={{
              maxWidth: 700,
              margin: "0 auto",
              color: "var(--muted)",
              fontSize: 16,
              lineHeight: 1.6,
            }}
          >
            Sadece izleyerek değil, yaparak öğren.
            Gerçek projeler, ölçülebilir ilerleme ve
            sertifika sistemiyle yazılım kariyerine
            sağlam bir adım at.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
