import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState([
    { id: 1, title: "React ile Modern Web Geliştirme", price: 499 },
    { id: 2, title: "Frontend Yol Haritası", price: 0 },
  ]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    const newCourse = {
      id: Date.now(),
      title,
      price: price ? Number(price) : 0,
    };

    setCourses([...courses, newCourse]);
    setTitle("");
    setPrice("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Eğitmen Paneli</h2>

      <p>
        Hoş geldin, <strong>{user?.email}</strong>
      </p>

      <hr />

      <h3>Kurslarım</h3>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} –{" "}
            {course.price === 0 ? "Ücretsiz" : `${course.price} ₺`}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Yeni Kurs Ekle</h3>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Kurs Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Fiyat (₺)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Kurs Ekle</button>
      </form>
    </div>
  );
};

export default InstructorDashboard;
