import React, { useState } from "react";
import toast from "react-hot-toast";
import "./contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes integrar tu backend

    toast.success("Tu mensaje ha sido enviado correctamente.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-container">
      <h2 className="contact-title">Contacto</h2>
      <p className="contact-subtitle">
        ¿Tienes alguna inquietud o deseas obtener más información sobre nuestros
        servicios? ¡Estamos aquí para ayudarte!
      </p>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-box">
          <div className="contact-icon">📞</div>
          <h3 className="contact-label">Teléfono</h3>
          <p className="contact-value">+57 300 000 0000</p>
        </div>

        <div className="contact-box">
          <div className="contact-icon">📧</div>
          <h3 className="contact-label">Correo electrónico</h3>
          <p className="contact-value">soporte@servilocas.com</p>
        </div>

        <div className="contact-box">
          <div className="contact-icon">📍</div>
          <h3 className="contact-label">Ubicación</h3>
          <p className="contact-value">Bogotá, Colombia</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input
          type="text"
          name="name"
          placeholder="Ingresa tu nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="ejemplo@correo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Mensaje</label>
        <textarea
          name="message"
          placeholder="Escribe tu mensaje..."
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className="contact-btn" type="submit">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}
