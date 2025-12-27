import { useParams } from "react-router-dom";
import { useContext, useRef } from "react";
import html2pdf from "html2pdf.js";
import { AuthContext } from "../context/AuthContext";

const Certificate = () => {
  const { id } = useParams();
  const { user, enrolledCourses } = useContext(AuthContext);
  const certificateRef = useRef(null);

  const course = enrolledCourses.find(
    (c) => c.id === Number(id) && c.progress === 100
  );

  if (!course) {
    return <h2 style={{ padding: "20px" }}>Sertifika bulunamadı</h2>;
  }

  const today = new Date().toLocaleDateString("tr-TR");

  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 10,
        filename: `egitim360-${course.title}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(certificateRef.current)
      .save();
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* PDF ALANI */}
      <div
        ref={certificateRef}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "50px",
          border: "8px solid #4f46e5",
          borderRadius: "20px",
          textAlign: "center",
          background: "#f8fafc",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
          🎓 Sertifika
        </h1>

        <p>Bu sertifika</p>

        <h2 style={{ margin: "10px 0" }}>{user.email}</h2>

        <p>kişisinin</p>

        <h2 style={{ margin: "15px 0", color: "#4f46e5" }}>
          {course.title}
        </h2>

        <p>eğitimini başarıyla tamamladığını onaylar.</p>

        <p style={{ marginTop: "30px" }}>
          <strong>Tarih:</strong> {today}
        </p>

        <p style={{ marginTop: "10px" }}>
          <strong>Egitim360</strong>
        </p>
      </div>

      {/* PDF BUTTON */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "14px 28px",
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📄 PDF Olarak İndir
        </button>
      </div>
    </div>
  );
};

export default Certificate;
