import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLS } from "../../services/localStorageService";
import apiService from "../../services/apiService";
import { toast } from "react-hot-toast";
import "./Login.css";

/**
 * Componente de inicio de sesión (Login).
 * Permite al usuario ingresar sus credenciales y autenticarse en la aplicación.
 *
 * @component
 * @returns {JSX.Element} Formulario de inicio de sesión.
 */
export default function Login() {
  /**
   * Estado que almacena el email y la contraseña ingresados por el usuario.
   *
   * @type {[{email: string, password: string}, Function]}
   */
  const [formData, setFormData] = useState({ email: "", password: "" });

  /**
   * Hook de navegación para redirigir al usuario después de autenticarse.
   */
  const navigate = useNavigate();

  /**
   * Maneja los cambios en los campos del formulario actualizando el estado.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input.
   * @returns {void}
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Maneja el envío del formulario de autenticación.
   * Realiza la petición al backend, guarda el usuario autenticado en localStorage
   * y redirige al inicio si es exitoso.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    apiService
      .post("users/login", formData)
      .then((userLogged) => {
        setLS("user", userLogged);
        navigate("/#/");
      })
      .catch((error) => toast.error(error.detail));
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-sub">Inicia sesión para continuar</p>

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-field">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-btn">Ingresar</button>

        <div className="login-links">
          <a href="/#/recovery">¿Olvidaste tu contraseña?</a>
          <a href="/#/register">Crear una cuenta</a>
        </div>
      </form>
    </div>
  );
}
