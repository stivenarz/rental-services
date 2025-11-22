import React, { useState } from 'react';
import './ModalAgendas.css';

/**
 * Modal para visualizar y actualizar la información de una agenda.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.agenda - Datos de la agenda seleccionada.
 * @param {number} props.agenda.id - ID de la agenda.
 * @param {string} props.agenda.userName - Nombre del usuario.
 * @param {string} props.agenda.email - Correo del usuario.
 * @param {string} props.agenda.phone - Teléfono del usuario.
 * @param {string} props.agenda.address - Dirección del usuario.
 * @param {string|Date} props.agenda.date - Fecha agendada.
 * @param {string} props.agenda.observation - Observación del usuario.
 * @param {string} props.agenda.status - Estado actual de la agenda.
 * @param {string} props.agenda.technicianObservation - Observación del técnico.
 * @param {number|string} props.agenda.technician_id - Técnico asignado.
 *
 * @param {Array<Object>} props.technicians - Lista de técnicos disponibles.
 * @param {number} props.technicians[].id - ID del técnico.
 * @param {string} props.technicians[].name - Nombre del técnico.
 *
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onUpdate - Función que recibe los datos actualizados.
 *
 * @returns {JSX.Element} Modal de edición de agendas.
 */
export default function AgendasModal({ agenda = {}, technicians = [], onClose, onUpdate }) {

  /**
   * Estado del campo "status".
   * @type {string}
   */
  const [status, setStatus] = useState(agenda.status || '');

  /**
   * Estado de la observación del técnico.
   * @type {string}
   */
  const [techObs, setTechObs] = useState(agenda.technicianObservation || '');

  /**
   * Técnico seleccionado.
   * @type {number|null}
   */
  const [techIdSelected, setTechIdSelected] = useState(Number(agenda.technician_id));

  /**
   * Guarda los cambios hechos en el modal y los envía al componente padre.
   *
   * @function
   */
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

        {/* Información del usuario y de la agenda */}
        <div className="ag-modal-section">
          <p><strong>Usuario:</strong> {agenda.userName}</p>
          <p><strong>Email:</strong> {agenda.email}</p>
          <p><strong>Teléfono:</strong> {agenda.phone}</p>
          <p><strong>Dirección:</strong> {agenda.address}</p>
          <p><strong>Fecha:</strong> {agenda.date}</p>
          <p><strong>Observación del usuario:</strong> {agenda.observation}</p>
        </div>

        {/* Controles de edición */}
        <div className="ag-modal-edit">

          <label>Técnico asignado</label>
          <select
            value={techIdSelected ?? ''}
            onChange={(e) => setTechIdSelected(e.target.value)}
          >
            <option value="">Seleccione un técnico</option>
            {technicians.map((t) => (
              <option value={t.id} key={'so' + t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <label>Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Observación del técnico</label>

          <textarea
            rows="3"
            value={techObs}
            onChange={(e) => setTechObs(Number(e.target.value))}
          />
        </div>

        {/* Botones */}
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
