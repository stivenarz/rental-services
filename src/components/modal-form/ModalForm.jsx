import React, { useState } from "react";
import "./modalform.css";

export default function ServiceRequestModal({ isOpen, onClose, onSubmit, service}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: service.title,
    details: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title"> Solicitar: {service.title} </h2>
        <p className="sv-subtitle">
          Diligencia los datos para agendar tu visita.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-field">
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-field">
            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-field">
            <label>Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-field">
            <label>Detalles adicionales</label>
            <textarea
              name="details"
              rows="4"
              value={formData.details}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="modal-submit">Enviar solicitud</button>
        </form>
      </div>
    </div>
  );
}
