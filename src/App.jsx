import AppRouter from './router/AppRouter'; // Manejador de rutas de react
import { Toaster } from 'react-hot-toast'; // Notificaciones personalizadas de react
import './App.css';
import { userAdminValidation } from './services/userAdmin';

function App() {
  userAdminValidation();

  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: '#4CAF50', color: '#fff' } },
          error: { style: { background: '#f44336', color: '#fff' } },
        }}
      />
    </>
  );
}

export default App;
