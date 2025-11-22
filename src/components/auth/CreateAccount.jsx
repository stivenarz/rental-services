import React, { useState } from "react";
import "./Auth.css";
import apiService from "../../services/apiService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * Componente CreateAccount
 *
 * Permite registrar un nuevo usuario enviando los datos al backend.
 * Gestiona el formulario, valida campos requeridos y muestra notificaciones
 * dependiendo del resultado de la operación.
 *
 * @component
 * @returns {JSX.Element} Formulario de registro de usuario.
 */
export function CreateAccount() {
  /**
   * Estado que almacena los datos del formulario de registro.
   *
   * @typedef {Object} FormData
   * @property {string} name - Nombre del usuario.
   * @property {string} email - Correo electrónico del usuario.
   * @property {string} phone - Número de teléfono del usuario.
   * @property {string} address - Dirección del usuario.
   * @property {boolean} isDeleted - Flag para indicar si el usuario está eliminado (por defecto false).
   * @property {string} role - Rol asignado al usuario (por defecto 'user').
   * @property {string} password - Contraseña del usuario.
   */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isDeleted: false,
    role: "user",
    password: "",
  });

  const navigate = useNavigate();

  /**
   * Maneja los cambios de los inputs del formulario.
   *
   * @function handleChange
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Envía los datos del formulario al backend para crear un usuario.
   *
   * @function handleSubmit
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    apiService
      .post("users/", formData)
      .then(() => {
        toast.success("Usuario registrado correctamente, puedes iniciar sesión");
        navigate("/#/login");
      })
      .catch((error) =>
        toast.error(
          "Error intentando registrar el usuario: " + (error.detail || "")
        )
      );
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create Account</h2>

        <div className="auth-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Teléfono</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Dirección</label>
          <input
            type="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-btn">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
