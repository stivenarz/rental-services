import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../components/about/about';
import Register from '../pages/Register';
import Recovery from '../pages/Recovery';
import Login from '../components/auth/Login';
import Reservations from '../components/reservations/Reservations';
import Profile from '../components/profile/Profile';
import Contact from '../components/contact/Contact';
import Administration from '../components/administration/administration';
import RoleRoute from '../middleware/RoleRoute';
import AgendasAdmin from '../components/agendas-admin/AgendasAdmin';
import TechniciansAdmin from '../components/technicians-admin/TechniciansAdmin';

export default function AppRouter({ search }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/administration"
          element={
            <RoleRoute allowedRole={'admin'}>
              <Administration />
            </RoleRoute>
          }
        />
        <Route
          path="/agendas"
          element={
            <RoleRoute allowedRole={'admin'}>
              <AgendasAdmin />
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
