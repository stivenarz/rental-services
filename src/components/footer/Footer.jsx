import React from "react";
import "./Footer.css";

/**
 * Footer Component
 *
 * Este componente renderiza un pie de página moderno con tres secciones:
 *  - Información de la empresa
 *  - Enlaces rápidos de navegación
 *  - Datos de contacto
 *
 * Además muestra dinámicamente el año actual.
 *
 * @component
 * @returns {JSX.Element} Estructura visual del footer.
 */
export default function Footer() {
  /**
   * Obtiene el año actual para mostrarlo en la parte inferior del footer.
   * @type {number}
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <div className="footer-container custom-container">
        <div className="footer-columns">

          {/* Columna: About Us */}
          <div className="footer-col">
            <h3 className="footer-title">About Us</h3>
            <p className="footer-desc">
              We offer reliable home services such as plumbing, carpentry and 
              general repairs. Quality and professionalism guaranteed.
            </p>
          </div>

          {/* Columna: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          {/* Columna: Contact */}
          <div className="footer-col">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>Email: info@example.com</li>
              <li>Phone: +57 320 555 0101</li>
              <li>Location: Bogotá, Colombia</li>
            </ul>
          </div>

        </div>

        {/* Línea inferior del pie de página */}
        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
