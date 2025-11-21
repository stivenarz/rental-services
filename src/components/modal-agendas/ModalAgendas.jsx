import React, { useState } from 'react';
import './ModalAgendas.css';

export default function AgendasModal({ agenda = {}, technicians = [], onClose, onUpdate }) {
  const [status, setStatus] = useState(agenda.status || '');
  const [techObs, setTechObs] = useState(agenda.technicianObservation || '');
  const [techIdSelected, setTechIdSelected] = useState(Number(agenda.technician_id));

  const saveChanges = () => {
    onUpdate({
      ...agenda,
      technician_id: Number(techIdSelected),
      status,
      technicianObservation: techObs,
    });
    onClose();
  };

  return (
    <div className="ag-modal-overlay" onClick={onClose}>
      <div className="ag-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="ag-modal-title">Detalles de la Visita</h3>

        <div className="ag-modal-section">
          <p>
            <strong>Usuario:</strong> {agenda.userName}
          </p>
          <p>
            <strong>Email:</strong> {agenda.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {agenda.phone}
          </p>
          <p>
            <strong>Dirección:</strong> {agenda.address}
          </p>
          <p>
            <strong>Fecha:</strong> {agenda.date}
          </p>
          <p>
            <strong>Observación del usuario:</strong> {agenda.observation}
          </p>
        </div>

        <div className="ag-modal-edit">
          <label>Técnico asignado</label>

          <select value={techIdSelected ?? ''} onChange={(e) => setTechIdSelected(e.target.value)}>
            <option value="">Seleccione un técnico</option>

            {technicians.map((t) => (
              <option value={t.id} key={'so' + t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <label>Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Observación del técnico</label>
          <textarea rows="3" value={techObs} onChange={(e) => setTechObs(Number(e.target.value))} />
        </div>

        <div className="ag-modal-buttons">
          <button className="ag-btn ag-cancel" onClick={onClose}>
            Cerrar
          </button>
          <button className="ag-btn ag-save" onClick={saveChanges}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
