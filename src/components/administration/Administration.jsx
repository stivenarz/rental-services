import { useState } from "react";
import "./Administration.css";

export default function Administration() {
  const [services, setServices] = useState([
    { id: 1, title: "Servicio 1", description: "Descripción del servicio 1" },
    { id: 2, title: "Servicio 2", description: "Descripción del servicio 2" }
  ]);

  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) return;

    if (editingId) {
      // Editar servicio existente
      setServices((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...form } : item
        )
      );
      setEditingId(null);
    } else {
      // Crear nuevo servicio
      setServices((prev) => [
        ...prev,
        { id: Date.now(), title: form.title, description: form.description }
      ]);
    }

    setForm({ title: "", description: "" });
  };

  const handleEdit = (service) => {
    setForm({ title: service.title, description: service.description });
    setEditingId(service.id);
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* Formulario */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título del servicio"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Descripción del servicio"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="btn-primary">
          {editingId ? "Guardar Cambios" : "Agregar Servicio"}
        </button>
      </form>

      {/* Lista */}
      <div className="services-list">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>

            <div className="actions">
              <button
                className="btn-edit"
                onClick={() => handleEdit(service)}
              >
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDelete(service.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
