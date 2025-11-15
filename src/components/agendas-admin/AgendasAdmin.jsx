// AgendasAdmin.jsx
import React, { useState, useMemo } from 'react';
import './agendasAdmin.css';
import AgendasModal from '../modal-agendas/ModalAgendas';

const testAgendas = [
  {
    id: 1,
    userName: 'Carlos López',
    email: 'carlos@example.com',
    phone: '3001112233',
    address: 'Cra 10 #20-33',
    date: '2025-02-10',
    observation: 'Revisión de filtraciones en la cocina',
    technician: 'Andrés García',
    technicianObservation: 'Trabajo finalizado sin novedades',
    status: 'completed',
  },
  {
    id: 2,
    userName: 'María Pérez',
    email: 'maria@example.com',
    phone: '3012233445',
    address: 'Cl 45 #13-20',
    date: '2025-02-20',
    observation: 'Instalación de tomacorrientes',
    technician: 'Laura Martínez',
    technicianObservation: '',
    status: 'pending',
  },
  {
    id: 3,
    userName: 'Juan Rodríguez',
    email: 'juan@example.com',
    phone: '3059988776',
    address: 'Av 1 #90-11',
    date: '2025-01-15',
    observation: 'Pintura de habitación',
    technician: 'Pedro Sánchez',
    technicianObservation: 'Cliente satisfecho',
    status: 'canceled',
  },
];

export default function AgendasAdmin() {
  const [agendas, setAgendas] = useState(testAgendas);

  const [openAgenda, setOpenAgenda] = useState(null); // ← estado del modal

  const [filterType, setFilterType] = useState('all');
  const [techFilter, setTechFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const today = new Date();

  const filteredAgendas = useMemo(() => {
    return agendas.filter((a) => {
      const agendaDate = new Date(a.date);
      const isExpired = agendaDate < today;
      const isUpcoming = agendaDate >= today;

      if (filterType === 'expired' && !isExpired) return false;
      if (filterType === 'upcoming' && !isUpcoming) return false;

      if (techFilter !== 'all' && a.technician !== techFilter) return false;

      if (statusFilter !== 'all' && a.status !== statusFilter) return false;

      if (fromDate && agendaDate < new Date(fromDate)) return false;

      if (toDate && agendaDate > new Date(toDate)) return false;

      return true;
    });
  }, [agendas, filterType, techFilter, statusFilter, fromDate, toDate]);

  const updateAgenda = (updated) => {
    setAgendas((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const uniqueTechnicians = [...new Set(agendas.map((a) => a.technician))];

  return (
    <section className="ag-admin-container">
      <h2 className="ag-admin-title">Administración de Agendas</h2>
      <p className="ag-admin-subtitle">Control de visitas programadas por los usuarios</p>

      {/* FILTROS */}
      <div className="ag-filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Todas</option>
          <option value="expired">Visitas vencidas</option>
          <option value="upcoming">Próximas visitas</option>
        </select>

        <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
          <option value="all">Todos los técnicos</option>
          {uniqueTechnicians.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="completed">Completado</option>
          <option value="canceled">Cancelado</option>
        </select>
      </div>

      {/* RANGO DE FECHAS */}
      <div className="ag-date-filters">
        <div className="ag-date-item">
          <label>Desde</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>

        <div className="ag-date-item">
          <label>Hasta</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>

      {/* TABLA */}
      <div className="ag-table-wrapper">
        <table className="ag-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Observación</th>
              <th>Técnico</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {filteredAgendas.length === 0 ? (
              <tr>
                <td colSpan="5" className="ag-empty">
                  No hay resultados
                </td>
              </tr>
            ) : (
              filteredAgendas.map((a) => (
                <tr key={a.id} onClick={() => setOpenAgenda(a)} className="ag-row">
                  <td>{a.userName}</td>
                  <td>{a.date}</td>
                  <td>{a.observation}</td>
                  <td>{a.technician}</td>
                  <td className={`ag-status ${a.status}`}>{a.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openAgenda && <AgendasModal agenda={openAgenda} onClose={() => setOpenAgenda(null)} onUpdate={updateAgenda} />}
    </section>
  );
}
