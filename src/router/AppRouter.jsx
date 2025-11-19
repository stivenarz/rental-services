import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import Register from '../pages/Register';
import Recovery from '../pages/Recovery';
import Login from '../components/auth/Login';
import RoleRoute from '../middleware/RoleRoute';
import TechniciansAdmin from '../components/technicians-admin/TechniciansAdmin';
import ServicesPage from '../pages/ServicesPage';
import ProfilePage from '../pages/ProfilePage';
import ContactPage from '../pages/ContactPage';
import ReservasPage from '../pages/ReservasPage';
import ServicesAdministrationPage from '../pages/ServicesAdministrationPage';
import AgendasAdministrationPage from '../pages/AgendasAdministrationPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServicesPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<ReservasPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/services-administration"
          element={
            <RoleRoute allowedRole={'admin'}>
              <ServicesAdministrationPage />
            </RoleRoute>
          }
        />
        <Route
          path="/agendas-administration"
          element={
            <RoleRoute allowedRole={'admin'}>
              <AgendasAdministrationPage />
            </RoleRoute>
          }
        />
        <Route
          path="/technicians"
          element={
            <RoleRoute allowedRole={'admin'}>
              <TechniciansAdmin />
            </RoleRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
