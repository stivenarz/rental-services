// About.jsx
import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="ab-container">
      <h2 className="ab-title">Sobre Nosotros</h2>

      <p className="ab-subtitle">
        Somos una empresa especializada en servicios locativos para el hogar,
        ofreciendo soluciones profesionales, confiables y rápidas para mantener
        tus espacios siempre en óptimas condiciones.
      </p>

      <div className="ab-grid">

        <div className="ab-card">
          <div className="ab-icon">🏠</div>
          <h3 className="ab-card-title">Tu hogar en buenas manos</h3>
          <p className="ab-card-desc">
            Nuestro equipo está conformado por especialistas certificados con amplia
            experiencia en mantenimiento y reparaciones residenciales.
          </p>
        </div>

        <div className="ab-card">
          <div className="ab-icon">⚙️</div>
          <h3 className="ab-card-title">Servicios profesionales</h3>
          <p className="ab-card-desc">
            Ofrecemos soluciones integrales en plomería, electricidad,
            albañilería, pintura y más, usando materiales de calidad y técnicas avanzadas.
          </p>
        </div>

        <div className="ab-card">
          <div className="ab-icon">⭐</div>
          <h3 className="ab-card-title">Calidad garantizada</h3>
          <p className="ab-card-desc">
            Garantizamos trabajos impecables, atención personalizada y resultados
            que superan tus expectativas.
          </p>
        </div>

      </div>
    </section>
  );
}
