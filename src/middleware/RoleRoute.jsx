import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocalStorageObserver, getLS } from '../services/localStorageService';

export default function RoleRoute({ children, allowedRole }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => getLS('user'));

  useLocalStorageObserver(({ key, value }) => {
    if (key === "user") {
      setUser(value);

      if (!value) {
        navigate("/login", { replace: true });
      }
    }
  });

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allowedRole) return <Navigate to="/" replace />;

  return children;
}
