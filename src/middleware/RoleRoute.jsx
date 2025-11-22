import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocalStorageObserver, getLS } from "../services/localStorageService";

/**
 * @typedef {Object} RoleRouteProps
 * @property {React.ReactNode} children - Elementos hijos que representan la ruta protegida.
 * @property {string} allowedRole - Rol permitido para acceder a esta ruta.
 */

/**
 * Componente que protege rutas verificando el rol del usuario almacenado en localStorage.
 * 
 * Si el usuario:
 * - **no está autenticado**, redirige a `/login`.
 * - **no tiene el rol permitido**, redirige a `/`.
 *
 * Además, escucha cambios en localStorage para cerrar sesión automáticamente
 * si el usuario es eliminado desde otra pestaña o por el backend.
 *
 * @param {RoleRouteProps} props - Propiedades del componente.
 * @returns {JSX.Element} El contenido protegido o una redirección.
 *
 * @example
 * <RoleRoute allowedRole="admin">
 *   <AdminDashboard />
 * </RoleRoute>
 */
export default function RoleRoute({ children, allowedRole }) {
  const navigate = useNavigate();

  /**
   * Estado del usuario obtenido desde localStorage al inicio.
   * @type {[Object|null, Function]}
   */
  const [user, setUser] = useState(() => getLS("user"));

  /**
   * Observa cambios del localStorage y actualiza el usuario.
   * Si `user` se elimina, redirige automáticamente al login.
   */
  useLocalStorageObserver((e) => {
    if (e?.key === "user") {
      setUser(e.value);

      // Si quitaron el usuario del localStorage → cerrar sesión
      if (!e.value) {
        navigate("/login", { replace: true });
      }
    }
  });

  // Usuario no autenticado → enviar al login
  if (!user) return <Navigate to="/login" replace />;

  // Usuario autenticado pero sin el rol requerido → enviar al home
  if (user.role !== allowedRole) return <Navigate to="/" replace />;

  // Usuario con permiso → mostrar contenido
  return children;
}
