// Services.jsx
import React, { useEffect, useState } from 'react';
import './Services.css';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';
import ServiceRequestModal from '../modal-form/ModalForm';

/**
 * Componente que muestra la lista de servicios disponibles para los usuarios.
 * Permite filtrar servicios, ver detalles y solicitar un servicio mediante un formulario modal.
 *
 * @component
 * @param {Object} props
 * @param {string} props.search - Cadena de búsqueda para filtrar servicios
 * @returns {JSX.Element}
 */
export default function Services({ search }) {
  /**
   * Estado para controlar el spinner de carga inicial.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * Lista completa de servicios obtenidos del servidor.
   * @type {Array<Object>}
   */
  const [services, setServices] = useState([]);

  /**
   * Servicio actualmente seleccionado para solicitar.
   * @type {Object|null}
   */
  const [selectedService, setSelectedService] = useState(null);

  /**
   * Lista filtrada de servicios según el texto ingresado en el buscador.
   * @type {Array<Object>}
   */
  const [servicesFiltered, setServicesFiltered] = useState(services);

  /**
   * Controla la apertura del modal de solicitud de servicio.
   * @type {boolean}
   */
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    apiService
      .getAll('services')
      .then((res) => {
        setServices(res);
        setServicesFiltered(res);
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    /**
     * Normaliza un texto eliminando acentos para permitir mejor búsqueda.
     *
     * @param {string} str
     * @returns {string}
     */
    const normalize = (str) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const text = normalize(search);

    const filterServices = services.filter((service) => {
      return (
        normalize(service.title).includes(text) ||
        normalize(service.description).includes(text)
      );
    });

    setServicesFiltered(filterServices);
  }, [search, services]);

  /**
   * Abre el modal y establece el servicio seleccionado.
   *
   * @function
   * @param {Object} service - Servicio seleccionado
   */
  const serviceRequest = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  /**
   * Envía la solicitud de servicio al backend (agendas/create).
   *
   * @function
   * @param {Object} formData - Datos del formulario enviado
   */
  const sendRequest = (formData) => {
    apiService
      .post('agendas/', formData)
      .then(() => {
        toast.success('Solicitud de servicio exitosa. Puedes visualizarla en tus reservas');
        closeModal();
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  /**
   * Cierra el modal de solicitud.
   *
   * @function
   */
  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <section className="container">
        <h2 className="title">Servicios Locativos para tu Hogar</h2>
        <p className="subtitle">
          Contamos con profesionales expertos para mejorar, reparar o transformar tus espacios.
        </p>

        {/* Spinner */}
        {loading ? (
          <div className="sv-loading">
            <div className="sv-spinner"></div>
          </div>
        ) : (
          <div className="sv-grid">
            {servicesFiltered.length > 0 ? (
              servicesFiltered.map((srv, i) => (
                <div className="sv-card" key={i}>
                  <div className="sv-icon">{srv.icon}</div>
                  <h3 className="sv-card-title">{srv.title}</h3>
                  <p className="sv-card-desc">{srv.description}</p>
                  <button className="sv-btn" onClick={() => serviceRequest(srv)}>
                    Solicitar servicio
                  </button>
                </div>
              ))
            ) : (
              <>
                {search.length ? (
                  <p>
                    *** No se encontraron resultados con el texto: <b>{search}</b> ***
                  </p>
                ) : (
                  <p>*** No se encontraron servicios para visualizar ***</p>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {selectedService && (
        <ServiceRequestModal
          isOpen={modalOpen}
          service={selectedService}
          onSubmit={sendRequest}
          onClose={closeModal}
        />
      )}
    </>
  );
}
