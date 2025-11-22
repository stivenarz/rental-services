import { useState } from "react";
import "./Auth.css";
import toast from "react-hot-toast";

/**
 * Componente para la recuperación de cuenta.
 * Permite al usuario ingresar su email para recibir un enlace de recuperación.
 *
 * @component
 * @returns {JSX.Element} Render del formulario de recuperación de cuenta.
 */
export function RecoverAccount() {
  /**
   * Estado que almacena el correo electrónico ingresado por el usuario.
   *
   * @type {[string, Function]}
   */
  const [email, setEmail] = useState("");

  /**
   * Maneja el envío del formulario de recuperación.
   * Aquí se puede integrar la lógica de backend para enviar el enlace.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Recovery link sent to: ${email}`);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Recover Account</h2>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn">Send Recovery Link</button>
      </form>
    </div>
  );
}
