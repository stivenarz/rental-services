import React from "react";
import "./About.css";

/**
 * Componente About
 *
 * Renderiza la sección "Sobre Nosotros" del sitio web, donde se describe
 * la empresa y sus valores principales. Esta sección incluye:
 * - Título y descripción introductoria
 * - Tres tarjetas informativas con íconos y textos explicativos
 *
 * Este componente es completamente estático y no maneja estado ni eventos.
 *
 * @component
 * @returns {JSX.Element} Sección informativa "Sobre Nosotros".
 */
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

        {/* Tarjeta 1 */}
        <div className="ab-card">
          <div className="ab-icon">🏠</div>
          <h3 className="ab-card-title">Tu hogar en buenas manos</h3>
          <p className="ab-card-desc">
            Nuestro equipo está conformado por especialistas certificados con amplia
            experiencia en mantenimiento y reparaciones residenciales.
          </p>
        </div>

        {/* Tarjeta 2 */}
        <div className="ab-card">
          <div className="ab-icon">⚙️</div>
          <h3 className="ab-card-title">Servicios profesionales</h3>
          <p className="ab-card-desc">
            Ofrecemos soluciones integrales en plomería, electricidad,
            albañilería, pintura y más, usando materiales de calidad y técnicas avanzadas.
          </p>
        </div>

        {/* Tarjeta 3 */}
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
