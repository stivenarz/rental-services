import { useEffect, useState } from 'react';
import Services from '../components/services/Services';
import ServiceRequestModal from '../components/modal-form/ModalForm';
import { toast } from 'react-hot-toast';
import Footer from '../components/footer/footer';

const servicesTest = [
  {
    id: 1,
    title: 'Plomería',
    description: 'Reparaciones, instalación de tuberías y mantenimiento preventivo.',
    icon: '🔧',
  },
  {
    id: 2,
    title: 'Albañilería',
    description: 'Construcción, enchapes, pañetes y reparaciones estructurales.',
    icon: '🧱',
  },
  {
    id: 3,
    title: 'Electricidad',
    description: 'Instalaciones eléctricas, diagnóstico y mejoras en redes residenciales.',
    icon: '⚡',
  },
  {
    id: 4,
    title: 'Pintura',
    description: 'Acabados profesionales, interiores, exteriores y restauración de muros.',
    icon: '🎨',
  },
];

export default function Home({ search }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [servicesFiltered, setServicesFiltered] = useState(servicesTest);

  useEffect(() => {
    const normalize = (str) =>
      str
        .normalize('NFD') // separa caracteres base + acento
        .replace(/[\u0300-\u036f]/g, '') // elimina acentos
        .toLowerCase();
    const filterServices = servicesTest.filter((service) => {
      const text = normalize(search).toLowerCase();
      return normalize(service.title).toLowerCase().includes(text) || normalize(service.description).toLowerCase().includes(text);
    });
    setServicesFiltered(filterServices)
  }, [search]);

  const serviceRequest = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };
  const sendRequest = (formData) => {
    console.log(formData);
    toast.success('Solicitud de servicio exitoso');
  };

  const closeModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <Services services={servicesFiltered} serviceRequest={serviceRequest} />
          {selectedService ? <ServiceRequestModal isOpen={modalOpen} service={selectedService} onSubmit={sendRequest} onClose={closeModal} /> : null}
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
