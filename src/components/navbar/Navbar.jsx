import React, { useState, useRef, useEffect } from 'react';
import { getLS, useLocalStorageObserver, removeLS } from '../../services/localStorageService';
import { nameShortener } from '../../services/utils';
import { useLocation } from 'react-router-dom';
import './navbar.css';

export default function Navbar({ links = null, setSearch = null }) {
  const [user, setUser] = useState(() => {
    const localUser = getLS('user');
    return localUser ? localUser : null;
  });
  const [title, setTitle] = useState('Servicios locativos');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const logoStr = nameShortener(user?.name || '', 2);
  const location = useLocation();
  useLocalStorageObserver((change) => {
    if (!change) return;
    if (change.key === 'user') {
      setUser(change.value);
    }
  }, []);

  // User profile
  const logOut = () => {
    removeLS('user');
  };

  // Cierre del dropdown al hacer click fuera
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const defaultLinks = [
    { label: 'Servicios', href: '/' },
    { label: 'Acerca de nosotros', href: '/about' },
    { label: 'Contáctenos', href: '/contact' },
  ];

  const navLinks = links ?? defaultLinks;

  return (
    <header className="nm-header">
      <nav className="nm-nav" aria-label="Main navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="nm-logo">{title[0] ?? 'M'}</div>
          <h1 style={{ fontSize: 16 }}>{title}</h1>

          {/* Desktop links */}
          <div className="nm-links" role="menubar">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nm-link" role="menuitem">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right side: search + actions */}
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </>
            )}
          </div>

          <div className="nm-actions">

            <div className="nm-sep" aria-hidden />

            {/* Profile dropdown condicionado por la variable user */}
            {!user ? (
              <a href="/login" className="nm-dropdown-item">
                Iniciar sesión
              </a>
            ) : (
              <div className="nm-dropdown" ref={profileRef}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className={`nm-avatar ${profileOpen ? 'nm-focus' : ''}`} aria-haspopup="true" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)}>
                    <span style={{ fontWeight: 700 }}>{logoStr}</span>
                  </button>
                </div>

                {profileOpen && (
                  <div className="nm-dropdown-panel" role="menu" aria-label="Perfil">
                    <a href="/profile" className="nm-dropdown-item">
                      Mi perfil
                    </a>
                    {user.role === 'admin' && 
                    <a href="/services-administration" className="nm-dropdown-item">
                      Administrar servicios
                    </a>
                    }
                    {user.role === 'admin' && 
                    <a href="/technicians" className="nm-dropdown-item">
                      Administrar técnicos
                    </a>
                    }
                    {user.role === 'admin' && 
                    <a href="/agendas-administration" className="nm-dropdown-item">
                      Administrar agendas
                    </a>
                    }
                    <a href="/reservations" className="nm-dropdown-item">
                      Reservas
                    </a>
                    <a className="nm-dropdown-item" onClick={(e) => logOut()}>
                      Cerrar sesión
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button className="nm-hamburger" aria-label="Abrir menú" aria-expanded={mobileOpen} onClick={() => setMobileOpen((s) => !s)}>
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

      {/* Mobile panel (se renderiza cuando mobileOpen=true) */}
      {mobileOpen && (
        <div className="nm-mobile-menu" role="dialog" aria-label="Menú móvil">
          <div className="nm-mobile-panel">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="nm-mobile-link" onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <button className="nm-btn" style={{ flex: 1 }}>
                Iniciar sesión
              </button>
              <button className="nm-btn primary" style={{ flex: 1 }}>
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
