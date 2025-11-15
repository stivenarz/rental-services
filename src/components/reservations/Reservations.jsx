// src/components/Reservations/Reservations.jsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./reservations.css";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simula datos desde servidor
  useEffect(() => {
    setTimeout(() => {
      setReservations([
        {
          id: 1,
          service: "Plomería",
          date: "2025-11-20",
          hour: "10:00 AM",
          status: "Confirmada",
        },
        {
          id: 2,
          service: "Albañilería",
          date: "2025-11-23",
          hour: "02:00 PM",
          status: "Pendiente",
        },
        {
          id: 3,
          service: "Mantenimiento eléctrico",
          date: "2025-11-28",
          hour: "09:00 AM",
          status: "Confirmada",
        },
      ]);

      setLoading(false);
    }, 600);
  }, []);

  const cancelReservation = (id) => {
    const updated = reservations.filter((item) => item.id !== id);
    setReservations(updated);
    toast.success('Reserva cancelada')
  };

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

      {reservations.length === 0 ? (
        <p className="no-reservations">No tienes reservas activas.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((item) => (
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
                onClick={() => cancelReservation(item.id)}
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
