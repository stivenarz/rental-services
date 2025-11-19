import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiService from '../../services/apiService';
import { getLS } from '../../services/localStorageService';
import "./reservations.css";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // switches
  const [hideCanceled, setHideCanceled] = useState(true);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    apiService
      .getAll("agendas")
      .then((rsvs) => {
        const user = getLS("user") || null;
        if (!user || !user.id) return;

        setReservations(rsvs.filter((rsv) => rsv.userId === user.id));
        setLoading(false);
      })
      .catch((error) =>
        toast.error("Error al intentar obtener las reservas")
      );
  }, []);

  const cancelReservation = (rsv) => {
    if (confirm("Está seguro de cancelar la reserva?")) {
      const rsvUpdated = { ...rsv, status: "cancelada" };
      apiService.update("agendas", rsv.id, rsvUpdated).then((res) => {
        setReservations((prev) =>
          prev.map((item) => (item.id !== rsv.id ? item : rsvUpdated))
        );
        toast.success("Reserva cancelada");
      });
    }
  };

  // filtros aplicados
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
        {/* Switch ocultar canceladas */}
        <label className="switch-wrapper">
          <input
            type="checkbox"
            checked={hideCanceled}
            onChange={() => setHideCanceled(!hideCanceled)}
          />
          <span className="switch-slider"></span>
          <span className="switch-label">Ocultar canceladas</span>
        </label>

        {/* Switch mostrar solo finalizadas */}
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
