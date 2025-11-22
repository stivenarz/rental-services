/**
 * Componente principal de la aplicación.
 * 
 * Este componente inicializa las validaciones de administrador,
 * renderiza el enrutador principal de la aplicación y configura
 * las notificaciones globales utilizando react-hot-toast.
 */

import AppRouter from './router/AppRouter'; // Manejador de rutas principales de React Router
import { Toaster } from 'react-hot-toast'; // Sistema de notificaciones emergentes
import './App.css';
import { userAdminValidation } from './services/userAdmin';

function App() {
  // Ejecuta una validación inicial del usuario administrador
  // al momento de montar la aplicación.
  userAdminValidation();

  return (
    <>
      {/* Contenedor de rutas principales */}
      <AppRouter />

      {/* Configuración global del sistema de notificaciones */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: { 
            style: { background: '#4CAF50', color: '#fff' } 
          },
          error: { 
            style: { background: '#f44336', color: '#fff' } 
          },
        }}
      />
    </>
  );
}

export default App;
