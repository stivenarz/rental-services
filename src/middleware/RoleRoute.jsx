import { Navigate } from 'react-router-dom';

export default function RoleRoute({ children, allowedRole }) {
    
  // Cambiar por request al servidor
  const user = JSON.parse(localStorage.getItem('user'));

  // No está autenticado
  if (!user) return <Navigate to="/login" replace />;

  // No tiene el rol requerido
  if (user.role !== allowedRole) return <Navigate to="/" replace />;

  // Tiene el rol, permitir acceso
  return children;
}
