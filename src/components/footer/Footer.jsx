import React from "react";
import "./Footer.css";

/**
 * Footer Component
 *
 * Este componente renderiza un pie de página  con tres secciones:
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
    <footer className="footer">
      <div className="footer-container custom-container">
        <div className="footer-columns">

          {/* Columna: About Us */}
          <div className="footer-col">
            <h3 className="footer-title">Sobre nosotros</h3>
            <p className="footer-desc">
              Ofrecemos servicios confiables para el hogar, como plomería, carpintería y reparaciones generales. Calidad y profesionalismo garantizados.
            </p>
          </div>

          {/* Columna: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-title">Accesos rápidos</h3>
            <ul className="footer-links">
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Acerca de nosotros</a></li>
            </ul>
          </div>

          {/* Columna: Contact */}
          <div className="footer-col">
            <h3 className="footer-title">Contactanos</h3>
            <ul className="footer-contact">
              <li>Email: info@rentalservices.com</li>
              <li>Teléfono: +57 320 555 0101</li>
              <li>Ubicación: Medellin, Colombia</li>
            </ul>
          </div>

        </div>

        {/* Línea inferior del pie de página */}
        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
