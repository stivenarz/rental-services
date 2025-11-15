import React from "react";
import "./footer.css";

export default function FooterModern() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <div className="footer-container custom-container">
        <div className="footer-columns">
          <div className="footer-col">
            <h3 className="footer-title">About Us</h3>
            <p className="footer-desc">
              We offer reliable home services such as plumbing, carpentry and 
              general repairs. Quality and professionalism guaranteed.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>Email: info@example.com</li>
              <li>Phone: +57 320 555 0101</li>
              <li>Location: Bogotá, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
