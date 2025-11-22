import React, { useState } from 'react';
import { getLS } from '../../services/localStorageService';
import './ModalForm.css';

/**
 * Modal para solicitar un servicio.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal debe mostrarse.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onSubmit - Función que recibe los datos del formulario al enviar.
 * @param {Object} props.service - Información del servicio solicitado.
 * @param {string} props.service.title - Título del servicio.
 * @returns {JSX.Element|null} Retorna el modal si está abierto, o null si no.
 */
export default function ServiceRequestModal({ isOpen, onClose, onSubmit, service }) {
  /**
   * Usuario almacenado en localStorage.
   * @type {Object|null}
   */
  const [user, setUser] = useState(getLS('user') || null);

  /**
   * Estado del formulario de solicitud del servicio.
   * @typedef {Object} FormData
   * @property {number|null} userId - ID del usuario.
   * @property {string} userName - Nombre del usuario.
   * @property {string} email - Correo del usuario.
   * @property {string} phone - Teléfono del usuario.
   * @property {string} address - Dirección del usuario.
   * @property {string|Date} date - Fecha de la solicitud.
   * @property {string} observation - Observación adicional.
   * @property {string} service - Nombre del servicio solicitado.
   */
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

  /**
   * Manejador de cambios en los campos del formulario.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento del input.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Manejador del envío del formulario.
   *
   * @param {React.FormEvent} e - Evento del formulario.
   */
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
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  defaultValue={formData.userName}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </div>

          <div className="modal-field">
            {user ? (
              <label>{user.email}</label>
            ) : (
              <>
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </div>

          <div className="modal-field">
            {user ? (
              <label>{user.phone}</label>
            ) : (
              <>
                <label>Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </>
            )}
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
              name="observation"
              rows="4"
              value={formData.observation}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="modal-submit">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
