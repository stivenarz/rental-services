import React, { useState } from "react";
import "./modalAgendas.css";

export default function AgendasModal({ agenda, onClose, onUpdate }) {
  const [tech, setTech] = useState(agenda.technician);
  const [status, setStatus] = useState(agenda.status);
  const [techObs, setTechObs] = useState(agenda.technicianObservation);

  const saveChanges = () => {
    onUpdate({
      ...agenda,
      technician: tech,
      status,
      technicianObservation: techObs,
    });

    onClose();
  };

  return (
    <div className="ag-modal-overlay">
      <div className="ag-modal">
        <h3 className="ag-modal-title">Detalles de la Visita</h3>

        <div className="ag-modal-section">
          <p><strong>Usuario:</strong> {agenda.userName}</p>
          <p><strong>Email:</strong> {agenda.email}</p>
          <p><strong>Teléfono:</strong> {agenda.phone}</p>
          <p><strong>Dirección:</strong> {agenda.address}</p>
          <p><strong>Fecha:</strong> {agenda.date}</p>
          <p><strong>Observación del usuario:</strong> {agenda.observation}</p>
        </div>

        <div className="ag-modal-edit">
          <label>Técnico asignado</label>
          <input
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
          />

          <label>Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
            <option value="canceled">Cancelado</option>
          </select>

          <label>Observación del técnico</label>
          <textarea
            rows="3"
            value={techObs}
            onChange={(e) => setTechObs(e.target.value)}
          />
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
