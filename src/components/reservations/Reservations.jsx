import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiService from '../../services/apiService';
import { getLS } from '../../services/localStorageService';
import "./Reservations.css";

/**
 * Componente que muestra las reservas del usuario autenticado.
 * Permite filtrar, cancelar y visualizar el estado de cada reserva.
 *
 * @component
 * @returns {JSX.Element} Vista de reservas del usuario
 */
export default function Reservations() {
  /** @type {[Array, Function]} Lista de reservas del usuario */
  const [reservations, setReservations] = useState([]);

  /** @type {[boolean, Function]} Estado de carga mientras se obtienen las reservas */
  const [loading, setLoading] = useState(true);

  /** @type {[boolean, Function]} Si se deben ocultar reservas canceladas */
  const [hideCanceled, setHideCanceled] = useState(true);

  /** @type {[boolean, Function]} Si se deben mostrar solo reservas finalizadas */
  const [showFinished, setShowFinished] = useState(false);

  /**
   * Obtiene todas las reservas y filtra solo las del usuario logueado.
   */
  useEffect(() => {
    apiService
      .getAll("agendas")
      .then((rsvs) => {
        const user = getLS("user") || null;
        if (!user || !user.id) return;

        setReservations(rsvs.filter((rsv) => rsv.userId === user.id));
        setLoading(false);
      })
      .catch(() => toast.error("Error al intentar obtener las reservas"));
  }, []);

  /**
   * Cancela una reserva si el usuario confirma la acción.
   *
   * @param {Object} rsv - Reserva seleccionada
   * @param {number} rsv.id - ID de la reserva
   * @param {string} rsv.status - Estado actual de la reserva
   */
  const cancelReservation = (rsv) => {
    if (confirm("Está seguro de cancelar la reserva?")) {
      const rsvUpdated = { ...rsv, status: "cancelada" };

      apiService.update("agendas", rsv.id, rsvUpdated).then(() => {
        setReservations((prev) =>
          prev.map((item) => (item.id !== rsv.id ? item : rsvUpdated))
        );
        toast.success("Reserva cancelada");
      });
    }
  };

  /**
   * Aplica filtros a la lista de reservas según switches activos.
   *
   * @type {Array}
   */
  const filteredReservations = reservations
    .filter((rsv) => (hideCanceled ? rsv.status !== "cancelada" : true))
    .filter((rsv) => (showFinished ? rsv.status === "finalizada" : true));

  if (loading) {
    return (
      <div className="reservations-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Mis Reservas</h2>

      {/* 🔥 Switches modernos */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {/* Switch: ocultar canceladas */}
        <label className="switch-wrapper">
          <input
            type="checkbox"
            checked={hideCanceled}
            onChange={() => setHideCanceled(!hideCanceled)}
          />
          <span className="switch-slider"></span>
          <span className="switch-label">Ocultar canceladas</span>
        </label>

        {/* Switch: mostrar solo finalizadas */}
        <label className="switch-wrapper">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
          />
          <span className="switch-slider"></span>
          <span className="switch-label">Mostrar solo finalizadas</span>
        </label>
      </div>

      {/* Lista o mensaje vacío */}
      {filteredReservations.length === 0 ? (
        <p className="no-reservations">No hay reservas para mostrar.</p>
      ) : (
        <div className="reservations-list">
          {filteredReservations.map((item) => (
            <div key={item.id} className="reservation-card">
              <div className="card-info">
                <h3>{item.service}</h3>

                <p>
                  <span>Fecha:</span> {item.date}
                </p>
                <p>
                  <span>Hora:</span> {item.hour}
                </p>

                <p className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </p>
              </div>

              <button
                className="cancel-btn"
                onClick={() => cancelReservation(item)}
              >
                Cancelar Reserva
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
