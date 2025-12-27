import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrollCourse } = useContext(AuthContext);

  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <h2>Ödeme bulunamadı</h2>;
  }

  const handlePayment = () => {
    // Fake payment success
    enrollCourse(course);
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Ödeme Ekranı</h2>

      <p>
        <strong>Kurs:</strong> {course.title}
      </p>
      <p>
        <strong>Fiyat:</strong> {course.price} ₺
      </p>

      <hr />

      <input type="text" placeholder="Kart Üzerindeki İsim" />
      <input type="text" placeholder="Kart Numarası" />
      <input type="text" placeholder="SKT / CVV" />

      <button
        onClick={handlePayment}
        style={{ marginTop: "15px" }}
      >
        Ödemeyi Tamamla
      </button>
    </div>
  );
};

export default Payment;
