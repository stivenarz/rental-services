import React, { useState } from "react";
import { getLS, setLS } from '../../services/localStorageService'
import apiService from '../../services/apiService'
import toast from "react-hot-toast";
import "./Profile.css";

/**
 * Componente que muestra y permite editar la información del perfil del usuario.
 * Permite actualizar nombre, correo, teléfono y dirección.
 *
 * @component
 * @returns {JSX.Element} Formulario de perfil del usuario
 */
export default function Profile() {

  /**
   * Usuario actual almacenado en LocalStorage.
   * @type {Object}
   * @property {number} id - ID del usuario
   * @property {string} name - Nombre del usuario
   * @property {string} email - Email del usuario
   * @property {string} phone - Teléfono del usuario
   * @property {string} address - Dirección del usuario
   */
  const [user, setUser] = useState(getLS('user'));

  /**
   * Estado del formulario editable del usuario.
   * Se inicializa con los valores del usuario actual.
   *
   * @type {[Object, Function]}
   */
  const [userForm, setUserForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  /** URL generada automáticamente para mostrar un avatar basado en el nombre del usuario */
  const logoUrl = `https://ui-avatars.com/api/?name=${user.name}&background=6f6ff5&color=fff`;

  /**
   * Maneja los cambios de los inputs del formulario de perfil.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e Evento del input
   */
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Envía los datos modificados del usuario al servidor para actualizar su perfil.
   * Si la operación es exitosa, actualiza LocalStorage y el estado global del usuario.
   */
  const handleSave = () => {
    apiService
      .update('users', user.id, userForm)
      .then(res => {
        setUser(res);
        setLS('user', res);
        toast.success("Perfil actualizado exitosamente.");
      })
      .catch(() =>
        toast.error('Error al intentar actualizar tu perfil')
      );
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-box">
        <h2 className="profile-title">Mi Perfil</h2>
        <p className="profile-sub">Administra tu información personal</p>

        {/* Avatar */}
        <div className="profile-avatar">
          <img
            src={logoUrl}
            alt="avatar"
          />
        </div>

        {/* Formulario de usuario */}
        <div className="profile-userForm">

          <div className="profile-field">
            <label>Nombre completo</label>
            <input
              name="name"
              value={userForm.name}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Correo electrónico</label>
            <input
              name="email"
              value={userForm.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="profile-field">
            <label>Teléfono</label>
            <input
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="profile-field">
            <label>Dirección</label>
            <input
              name="address"
              value={userForm.address}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>

        <button className="profile-btn" onClick={handleSave}>
          Guardar cambios
        </button>

      </div>
    </div>
  );
}
