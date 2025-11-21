import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorageObserver, getLS } from '../services/localStorageService';

/**
 * Función para validar si se tiene permiso de acceder a las rutas protegidas
 * @returns {string} devuelve la ruta si tiene permitido acceder a ella
 */
export default function RoleRoute({ children, allowedRole }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => getLS('user'));

  useLocalStorageObserver(e => {
    if (e?.key === "user") {
      setUser(e.value);

      if (!e.value) {
        navigate("/login", { replace: true });
      }
    }
  });

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allowedRole) return <Navigate to="/" replace />;

  return children;
}
