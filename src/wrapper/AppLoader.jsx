import React, { useEffect, useState } from "react";

export default function AppLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return children;
}
