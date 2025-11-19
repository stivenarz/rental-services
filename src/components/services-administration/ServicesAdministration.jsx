import { useEffect, useState } from 'react';
import './ServicesAdministration.css';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

export default function ServicesAdministration() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ icon: '', title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getServices();
  }, []);

  /**
   * Función que obtiene los servicios del backend
   */
  const getServices = () => {
    apiService
      .getAll('services')
      .then((res) => setServices(res))
      .catch(error => console.error(error.detail));
  };

  /**
   * Función que crea un servicio en el backend
   */
  const createService = (srv) => {
    apiService
      .post('services/', srv)
      .then((res) => {
        setServices([res, ...services]);
        toast.success(`Servicio ${srv.title} creado exitosamente`);
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  /**
   * Función que actualiza un servicio en el backend
   */
  const updateService = (srv) => {
    apiService
      .update('services', srv.id, srv)
      .then((res) => {
        setServices((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...res } : item)));
        toast.success(`Se actualizó el servicio ${srv.title} correctamente`);
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  /**
   * Función que elimina un servicio en el backend
   */
  const deleteService = (id) => {
    apiService
      .remove('services', id)
      .then(() => {
        setServices((prev) => prev.filter((item) => item.id !== editingId));
        toast.success('Se eliminó el servicio correctamente');
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.icon.trim() || !form.title.trim() || !form.description.trim()) {
      toast.error('Completa todos los campos')
      return
    };

    if (editingId) {
      // Editar servicio existente
      updateService({id: editingId, ...form});
      setEditingId(null);
    } else {
      // Crear nuevo servicio
      createService(form);
    }
    setForm({ icon: '', title: '', description: '' });
  };

  const handleEdit = (service) => {
    setForm({icon: service.icon, title: service.title, description: service.description });
    setEditingId(service.id);
  };

  const handleDelete = (id) => {
    if (confirm(`Estás seguro de eliminar el servicio?`)) deleteService(id);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* Formulario */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="icon" placeholder="ícono del servicio" value={form.icon} onChange={handleChange} />
        <input type="text" name="title" placeholder="Título del servicio" value={form.title} onChange={handleChange} />

        <textarea name="description" placeholder="Descripción del servicio" value={form.description} onChange={handleChange}></textarea>

        <button type="submit" className="btn-primary">
          {editingId ? 'Guardar Cambios' : 'Agregar Servicio'}
        </button>
      </form>

      {/* Lista */}
      <div className="services-list">
        {services.length > 0 ? (
          services.map((service) => (
            <div className="service-card" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="actions">
                <button className="btn-edit" onClick={() => handleEdit(service)}>
                  Editar
                </button>

                <button className="btn-delete" onClick={() => handleDelete(service.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            <p>*** No se encontraron servicios ***</p>
          </>
        )}
      </div>
    </div>
  );
}
