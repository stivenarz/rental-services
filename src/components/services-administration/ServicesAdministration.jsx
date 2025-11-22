import { useEffect, useState } from 'react';
import './ServicesAdministration.css';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

/**
 * Componente para administrar servicios.
 * Permite crear, editar, listar y eliminar servicios desde el backend.
 *
 * @component
 * @returns {JSX.Element} Interfaz de administración de servicios
 */
export default function ServicesAdministration() {
  /**
   * Lista de servicios obtenidos del backend.
   * @type {Array<Object>}
   */
  const [services, setServices] = useState([]);

  /**
   * Formulario para crear o editar un servicio.
   * @type {{ icon: string, title: string, description: string }}
   */
  const [form, setForm] = useState({ icon: '', title: '', description: '' });

  /**
   * ID del servicio que se está editando.
   * Si es null, el formulario crea un nuevo servicio.
   * @type {number|null}
   */
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getServices();
  }, []);

  /**
   * Obtiene todos los servicios desde el backend y los almacena en estado.
   *
   * @function
   * @returns {void}
   */
  const getServices = () => {
    apiService
      .getAll('services')
      .then((res) => setServices(res))
      .catch(error => console.error(error.detail));
  };

  /**
   * Crea un nuevo servicio en el backend.
   *
   * @function
   * @param {Object} srv - Datos del nuevo servicio.
   * @param {string} srv.icon - Ícono del servicio.
   * @param {string} srv.title - Título del servicio.
   * @param {string} srv.description - Descripción del servicio.
   * @returns {void}
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
   * Actualiza un servicio existente en el backend.
   *
   * @function
   * @param {Object} srv - Servicio actualizado.
   * @param {number} srv.id - ID del servicio.
   * @param {string} srv.icon
   * @param {string} srv.title
   * @param {string} srv.description
   * @returns {void}
   */
  const updateService = (srv) => {
    apiService
      .update('services', srv.id, srv)
      .then((res) => {
        setServices((prev) =>
          prev.map((item) => (item.id === editingId ? { ...item, ...res } : item))
        );
        toast.success(`Se actualizó el servicio ${srv.title} correctamente`);
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  /**
   * Elimina un servicio del backend y del estado.
   *
   * @function
   * @param {number} id - ID del servicio a eliminar.
   * @returns {void}
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

  /**
   * Maneja los cambios en los inputs del formulario.
   *
   * @function
   * @param {Event} e - Evento de cambio del input.
   * @returns {void}
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * Maneja el envío del formulario para crear o actualizar un servicio.
   *
   * @function
   * @param {Event} e - Evento submit del formulario.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.icon.trim() || !form.title.trim() || !form.description.trim()) {
      toast.error('Completa todos los campos');
      return;
    }

    if (editingId) {
      updateService({ id: editingId, ...form });
      setEditingId(null);
    } else {
      createService(form);
    }

    setForm({ icon: '', title: '', description: '' });
  };

  /**
   * Activa el modo edición llenando el formulario con los datos del servicio seleccionado.
   *
   * @function
   * @param {Object} service - Servicio a editar.
   * @returns {void}
   */
  const handleEdit = (service) => {
    setForm({
      icon: service.icon,
      title: service.title,
      description: service.description
    });
    setEditingId(service.id);
  };

  /**
   * Confirma y ejecuta la eliminación de un servicio.
   *
   * @function
   * @param {number} id - ID del servicio a eliminar.
   * @returns {void}
   */
  const handleDelete = (id) => {
    if (confirm(`Estás seguro de eliminar el servicio?`)) {
      deleteService(id);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* Formulario */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="icon"
          placeholder="Ícono del servicio"
          value={form.icon}
          onChange={handleChange}
        />

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
          <p>*** No se encontraron servicios ***</p>
        )}
      </div>
    </div>
  );
}
