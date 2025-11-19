import React, { useEffect, useState } from 'react';
import { getLS } from '../../services/localStorageService';
import './modalform.css';

export default function ServiceRequestModal({ isOpen, onClose, onSubmit, service }) {
  const [user, setUser] = useState(getLS('user') || null);

  const [formData, setFormData] = useState({
    userId: user ? user.id : null,
    userName: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    address: user ? user.address : '',
    date: new Date() || '',
    observation: '',
    service: service.title,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal-title"> Solicitar: {service.title} </h2>
        <p className="sv-subtitle">Diligencia los datos para agendar tu visita.</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            {user ? (
              <label>{user.name}</label>
            ) : (
              <>
                <label>Nombre</label>
                <input type="text" name="userName" value={formData.userName} defaultValue={formData.userName} onChange={handleChange} required />
              </>
            )}
          </div>

          <div className="modal-field">
            {user ? (
              <label>{user.email}</label>
            ) : (
              <>
                <label>Correo electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </>
            )}
          </div>

          <div className="modal-field">
            {user ? (
              <label>{user.phone}</label>
            ) : (
              <>
            <label>Teléfono</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
              </>
            )}
          </div>

          <div className="modal-field">
            <label>Fecha</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="modal-field">
            <label>Detalles adicionales</label>
            <textarea name="observation" rows="4" value={formData.observation} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="modal-submit">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
