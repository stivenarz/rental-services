import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';
import RoleRoute from '../middleware/RoleRoute';
import ServicesPage from '../pages/ServicesPage';
import ProfilePage from '../pages/ProfilePage';
import ContactPage from '../pages/ContactPage';
import ReservasPage from '../pages/ReservasPage';
import ServicesAdministrationPage from '../pages/ServicesAdministrationPage';
import AgendasAdministrationPage from '../pages/AgendasAdministrationPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import RecoveryPage from '../pages/RecoveryPage';
import TechniciansAdminPage from '../pages/TechniciansAdminPage';
import GraphicPage from '../pages/GraphicPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServicesPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservations" element={<ReservasPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/graphic" element={<GraphicPage />} />
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
              <TechniciansAdminPage />
            </RoleRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
