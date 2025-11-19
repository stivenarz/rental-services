import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './AgendasAdministration.css';
import AgendasModal from '../modal-agendas/ModalAgendas';
import apiService from '../../services/apiService';

export default function AgendasAdministration() {
  const [agendas, setAgendas] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [openAgenda, setOpenAgenda] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [techFilter, setTechFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    apiService
      .getAll('agendas')
      .then((res) => {
        setAgendas(res);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`Error al obtener las reservas: ${error.detail}`);
        return [];
      });
    apiService
      .getAll('technicians')
      .then((res) => {
        setTechnicians(res);
      })
      .catch((error) => toast.error(`Error al obtener los técnicos: ${error.detail}`));
  }, []);

  const filteredAgendas = useMemo(() => {
    return agendas.filter((a) => {
      const agendaDate = new Date(a.date);
      const isExpired = agendaDate < today;
      const isUpcoming = agendaDate >= today;

      if (filterType === 'expired' && !isExpired) return false;
      if (filterType === 'upcoming' && !isUpcoming) return false;
      if (techFilter !== 'all' && String(a.technician_id) !== String(techFilter)) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (fromDate && agendaDate < new Date(fromDate)) return false;
      if (toDate && agendaDate > new Date(toDate)) return false;
      return true;
    });
  }, [agendas, filterType, techFilter, statusFilter, fromDate, toDate]);

  const updateAgenda = (updated) => {
    apiService.update('agendas', updated.id, updated)
    .then(res=>{
      toast.success('Reserva actualizada correctamente')
      setAgendas((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    })
    .catch(error => toast.error(`Error al guardar cambios: ${error.detail}`))
  };

  return (
    <>
      {isLoading ? (
        <div className="sv-loading">
          <div className="sv-spinner"></div>
        </div>
      ) : (
        <section className="container">
          <h2 className="title">Administración de Agendas</h2>
          <p className="subtitle">Control de visitas programadas por los usuarios</p>

          {/* FILTROS */}
          <div className="ag-filters">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">Todas</option>
              <option value="expired">Visitas vencidas</option>
              <option value="upcoming">Próximas visitas</option>
            </select>

            <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
              <option value="all">Todos los técnicos</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Finalizado">Finalizado</option>
              <option value="Cancelado">Cancelado</option>
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
                    <tr key={'tr' + a.id} onClick={() => setOpenAgenda(a)} className="ag-row">
                      <td>{a.userName}</td>
                      <td>{a.date}</td>
                      <td>{a.observation}</td>
                      <td>{technicians.find(t => t.id === a.technician_id)?.name}</td>
                      <td className={`ag-status ${a.status}`}>{a.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MODAL */}
          {openAgenda && <AgendasModal agenda={openAgenda} technicians={technicians} onClose={() => setOpenAgenda(null)} onUpdate={updateAgenda} />}
        </section>
      )}
    </>
  );
}
