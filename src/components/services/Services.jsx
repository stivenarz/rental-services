// Services.jsx
import React, { useEffect, useState } from 'react';
import './Services.css';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';
import ServiceRequestModal from '../modal-form/ModalForm';

export default function Services({ search }) {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [servicesFiltered, setServicesFiltered] = useState(services);
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

  // Simula carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const normalize = (str) =>
      str
        .normalize('NFD') // separa caracteres base + acento
        .replace(/[\u0300-\u036f]/g, '') // elimina acentos
        .toLowerCase();
    const filterServices = services.filter((service) => {
      const text = normalize(search).toLowerCase();
      return normalize(service.title).toLowerCase().includes(text) || normalize(service.description).toLowerCase().includes(text);
    });
    setServicesFiltered(filterServices);
  }, [search]);

  const serviceRequest = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };
  const sendRequest = (formData) => {
    apiService
      .post('agendas/', formData)
      .then((res) => {
        toast.success('Solicitud de servicio exitoso, puedes visualizarlo en tus reservas');
        closeModal()
      })
      .catch((error) => {
        toast.error(error.detail);
      });
  };

  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <section className="container">
        <h2 className="title">Servicios Locativos para tu Hogar</h2>
        <p className="subtitle">Contamos con profesionales expertos para mejorar, reparar o transformar tus espacios.</p>

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
              <>{search.length ? <p>*** No se encontraron resultados con el texto: {search} ***</p> : <p>*** No se encontraron servicios para visualizar ***</p>}</>
            )}
          </div>
        )}
      </section>
      {selectedService ? <ServiceRequestModal isOpen={modalOpen} service={selectedService} onSubmit={sendRequest} onClose={closeModal} /> : null}
    </>
  );
}
