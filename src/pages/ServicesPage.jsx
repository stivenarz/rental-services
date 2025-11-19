import { useState } from 'react';
import Services from '../components/services/Services';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

export default function ServicesPage() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Navbar setSearch={setSearch} />
      <Services search={search} />
      <Footer />
    </>
  );
}
