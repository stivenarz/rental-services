import React, { useState, useRef, useEffect } from 'react';
import { getLS, useLocalStorageObserver, removeLS } from '../../services/localStorageService';
import { nameShortener } from '../../services/utils';
import { useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Barra de navegación principal del sitio.
 * Incluye navegación, búsqueda, avatar del usuario, menú de perfil y versión móvil.
 *
 * @component
 * @param {Object} props
 * @param {{label: string, href: string}[] | null} props.links - Lista de enlaces personalizados para el menú.
 * @param {Function | null} props.setSearch - Función para actualizar el texto de búsqueda.
 * @returns {JSX.Element} Navbar renderizado.
 */
export default function Navbar({ links = null, setSearch = null }) {
  
  /**
   * Estado del usuario autenticado.
   * Se obtiene desde LocalStorage y se mantiene sincronizado con `useLocalStorageObserver`.
   *
   * @type {[Object|null, Function]}
   */
  const [user, setUser] = useState(() => {
    const localUser = getLS('user');
    return localUser ? localUser : null;
  });

  /**
   * Título principal mostrado junto al logo.
   * @type {[string, Function]}
   */
  const [title, setTitle] = useState('Servicios locativos');

  /**
   * Controla la apertura del menú móvil.
   * @type {[boolean, Function]}
   */
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Controla la apertura del menú de perfil.
   * @type {[boolean, Function]}
   */
  const [profileOpen, setProfileOpen] = useState(false);

  /** Referencia del contenedor del menú de perfil para detectar clics fuera */
  const profileRef = useRef(null);

  /** Iniciales del usuario generadas por el helper `nameShortener` */
  const logoStr = nameShortener(user?.name || '', 2);

  /** Ubicación actual en React Router */
  const location = useLocation();

  /**
   * Observa cambios en LocalStorage para sincronizar el usuario.
   */
  useLocalStorageObserver((change) => {
    if (!change) return;
    if (change.key === 'user') {
      setUser(change.value);
    }
  }, []);

  /**
   * Cierra la sesión eliminando el usuario del LocalStorage.
   */
  const logOut = () => {
    removeLS('user');
  };

  /**
   * Cierra el menú de perfil al hacer clic fuera del mismo.
   */
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  /** Enlaces por defecto del navbar */
  const defaultLinks = [
    { label: 'Servicios', href: '/#/' },
    { label: 'Acerca de nosotros', href: '/#/about' },
    { label: 'Contáctenos', href: '/#/contact' },
  ];

  /** Enlaces finales a usar en la interfaz */
  const navLinks = links ?? defaultLinks;

  return (
    <header className="nm-header">
      <nav className="nm-nav" aria-label="Main navigation">
        
        {/* LOGO + TÍTULO + LINKS DESKTOP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="nm-logo">{title[0] ?? 'M'}</div>
          <h1 style={{ fontSize: 16 }}>{title}</h1>

          <div className="nm-links" role="menubar">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nm-link" role="menuitem">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* BUSCADOR + ACCIONES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="nm-search" role="search" aria-label="Buscar">
            {location.pathname === '/' && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <input
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar"
                  onChange={(e) => setSearch && setSearch(e.target.value)}
                />
              </>
            )}
          </div>

          <div className="nm-actions">

            <div className="nm-sep" aria-hidden />

            {/* MENÚ DE PERFIL O LOGIN */}
            {!user ? (
              <a href="/#/login" className="nm-dropdown-item">
                Iniciar sesión
              </a>
            ) : (
              <div className="nm-dropdown" ref={profileRef}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    className={`nm-avatar ${profileOpen ? 'nm-focus' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <span style={{ fontWeight: 700 }}>{logoStr}</span>
                  </button>
                </div>

                {profileOpen && (
                  <div className="nm-dropdown-panel" role="menu" aria-label="Perfil">

                    <a href="/#/profile" className="nm-dropdown-item">Mi perfil</a>

                    {user.role === 'admin' && (
                      <>
                        <a href="/#/services-administration" className="nm-dropdown-item">Administrar servicios</a>
                        <a href="/#/technicians" className="nm-dropdown-item">Administrar técnicos</a>
                        <a href="/#/agendas-administration" className="nm-dropdown-item">Administrar agendas</a>
                        <a href="/#/graphic" className="nm-dropdown-item">Gráfico de servicios agendados</a>
                      </>
                    )}

                    <a href="/#/reservations" className="nm-dropdown-item">Reservas</a>

                    <a className="nm-dropdown-item" onClick={logOut}>Cerrar sesión</a>
                  </div>
                )}
              </div>
            )}

            {/* BOTÓN HAMBURGUESA (MÓVIL) */}
            <button
              className="nm-hamburger"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <div className="nm-mobile-menu" role="dialog" aria-label="Menú móvil">
          <div className="nm-mobile-panel">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nm-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}

            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <button className="nm-btn" style={{ flex: 1 }}>Iniciar sesión</button>
              <button className="nm-btn primary" style={{ flex: 1 }}>Crear cuenta</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
