// Services.jsx
import React, { useEffect, useState } from 'react';
import './services.css';

export default function Services({ services, serviceRequest }) {
  const [loading, setLoading] = useState(true);

  // Simula carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="sv-container">
      <h2 className="sv-title">Servicios Locativos para tu Hogar</h2>
      <p className="sv-subtitle">Contamos con profesionales expertos para mejorar, reparar o transformar tus espacios.</p>

      {/* Spinner */}
      {loading ? (
        <div className="sv-loading">
          <div className="sv-spinner"></div>
        </div>
      ) : (
        <div className="sv-grid">
          {services.length > 0 ? (
            services.map((srv, i) => (
              <div className="sv-card" key={i}>
                <div className="sv-icon">{srv.icon}</div>
                <h3 className="sv-card-title">{srv.title}</h3>
                <p className="sv-card-desc">{srv.description}</p>
                <button className="sv-btn" onClick={() => serviceRequest(srv)}>
                  Solicitar servicio
                </button>
              </div>
            ))
          ) : (
            <>
              <p>*** No se encontraron resultados ***</p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
