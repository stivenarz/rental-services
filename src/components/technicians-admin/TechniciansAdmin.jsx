import React, { useState, useMemo, useEffect } from "react";
import "./techniciansAdmin.css";
import TechnicianModal from "../technicians-modal/TechniciansModal";
import apiService from '../../services/apiService';
import toast from "react-hot-toast";

export default function TechniciansAdmin() {
  const [technicians, setTechnicians] = useState([]);
  const [openTechnician, setOpenTechnician] = useState(null);
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  // 🔥 Cargar datos del servidor
  useEffect(() => {
    const loadTechnicians = async () => {
      try {
        const res = await apiService.getAll("technicians");
        setTechnicians(res);   // ← ahora sí guardas el array REAL
      } catch (error) {
        toast.error("No se pudo obtener los técnicos desde el servidor");
      }
    };

    loadTechnicians();
  }, []);

  // 🔥 Obtener especialidades únicas
  const uniqueSpecialties = useMemo(() => {
    if (!technicians || technicians.length === 0) return [];
    const all = technicians.flatMap(t => t.specialties || []);
    return [...new Set(all)];
  }, [technicians]);

  // 🔥 Filtrar técnicos
  const filteredTechnicians = useMemo(() => {
    if (specialtyFilter === "all") return technicians;
    return technicians.filter(t =>
      t.specialties.includes(specialtyFilter)
    );
  }, [technicians, specialtyFilter]);

  // 🔥 Actualizar / crear técnico
  const updateTechnician = (updated) => {
    if (!updated.id) {
      updated.id = technicians.length
        ? Math.max(...technicians.map(t => t.id)) + 1
        : 1;

        apiService
        .post('technicians/', updated)
        .then(res => {
          setTechnicians(prev => [...prev, res]);
          toast.success(`Técnico ${updated.name} creado exitosamente`)
        })
      .catch(error => toast.error('Error al intentar guardar el técnico'))
      } else {
        apiService
      .update('technicians', updated.id, updated)
      .then(res => {
        setTechnicians(prev =>
          prev.map(t => (t.id === updated.id ? res : t))
        );
        toast.success(`El técnico ${updated.name} se actualizó correctamente`)
      })
      .catch(error => toast.error('Error al intentar actualizar el técnico'))
    }
  };

  const deleteTechnician = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este técnico?")) {
      apiService
      .remove('technicians', id)
      .then(()=> {
        setTechnicians(prev => prev.filter(t => t.id !== id));
        toast.success('Se eliminó el técnico correctamente')
      }
      )
      .catch(error => toast.error('Error al intentar eliminar el técnico'))
    }
  };

  return (
    <section className="container">
      <h2 className="title">Administración de Técnicos</h2>
      <p className="subtitle">Gestiona los técnicos y sus especialidades</p>

      {/* BOTÓN AGREGAR */}
      <div className="tech-add-btn-wrapper">
        <button
          className="tech-add-btn"
          onClick={() =>
            setOpenTechnician({ name: "", email: "", phone: "", specialties: [] })
          }
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
                <tr key={t.id} className="tech-row">
                  <td onClick={() => setOpenTechnician(t)}>{t.name}</td>
                  <td onClick={() => setOpenTechnician(t)}>{t.email}</td>
                  <td onClick={() => setOpenTechnician(t)}>{t.phone}</td>
                  <td onClick={() => setOpenTechnician(t)}>
                    {t.specialties.join(", ")}
                  </td>
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

      {openTechnician && (
        <TechnicianModal
          technician={openTechnician}
          onClose={() => setOpenTechnician(null)}
          onUpdate={updateTechnician}
          onDelete={deleteTechnician}
        />
      )}
    </section>
  );
}
