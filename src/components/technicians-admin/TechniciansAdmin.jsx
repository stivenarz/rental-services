import React, { useState, useMemo } from "react";
import "./techniciansAdmin.css";
import TechnicianModal from "../technicians-modal/TechniciansModal";

const testTechnicians = [
  {
    id: 1,
    name: "Andrés García",
    email: "andres@example.com",
    phone: "3001112233",
    specialties: ["Plomería", "Electricidad"],
  },
  {
    id: 2,
    name: "Laura Martínez",
    email: "laura@example.com",
    phone: "3012233445",
    specialties: ["Albañilería", "Pintura"],
  },
  {
    id: 3,
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    phone: "3059988776",
    specialties: ["Electricidad", "Pintura"],
  },
];

export default function TechniciansAdmin() {
  const [technicians, setTechnicians] = useState(testTechnicians);
  const [openTechnician, setOpenTechnician] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const uniqueSpecialties = useMemo(() => {
    const all = technicians.flatMap((t) => t.specialties);
    return [...new Set(all)];
  }, [technicians]);

  const filteredTechnicians = useMemo(() => {
    if (specialtyFilter === "all") return technicians;
    return technicians.filter((t) =>
      t.specialties.includes(specialtyFilter)
    );
  }, [technicians, specialtyFilter]);

  const updateTechnician = (updated) => {
    if (!updated.id) {
      updated.id = technicians.length
        ? Math.max(...technicians.map((t) => t.id)) + 1
        : 1;
      setTechnicians((prev) => [...prev, updated]);
    } else {
      setTechnicians((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
    }
  };

  const deleteTechnician = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este técnico?")) {
      setTechnicians((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <section className="tech-admin-container">
      <h2 className="tech-admin-title">Administración de Técnicos</h2>
      <p className="tech-admin-subtitle">
        Gestiona los técnicos y sus especialidades de servicio
      </p>

      {/* BOTÓN AGREGAR */}
      <div className="tech-add-btn-wrapper">
        <button
          className="tech-add-btn"
          onClick={() => setOpenTechnician({ name: "", email: "", phone: "", specialties: [] })}
        >
          + Agregar Técnico
        </button>
      </div>

      {/* FILTRO POR ESPECIALIDAD */}
      <div className="tech-filters">
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
        >
          <option value="all">Todas las especialidades</option>
          {uniqueSpecialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* TABLA */}
      <div className="tech-table-wrapper">
        <table className="tech-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnicians.length === 0 ? (
              <tr>
                <td colSpan="5" className="tech-empty">
                  No hay técnicos
                </td>
              </tr>
            ) : (
              filteredTechnicians.map((t) => (
                <tr
                  key={t.id}
                  className="tech-row"
                >
                  <td onClick={() => setOpenTechnician(t)}>{t.name}</td>
                  <td onClick={() => setOpenTechnician(t)}>{t.email}</td>
                  <td onClick={() => setOpenTechnician(t)}>{t.phone}</td>
                  <td onClick={() => setOpenTechnician(t)}>{t.specialties.join(", ")}</td>
                  <td>
                    <button
                      className="tech-delete-btn"
                      onClick={() => deleteTechnician(t.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openTechnician && (
        <TechnicianModal
          technician={openTechnician}
          onClose={() => setOpenTechnician(null)}
          onUpdate={updateTechnician}
          onDelete={deleteTechnician} // ← opcional: también desde modal
        />
      )}
    </section>
  );
}
