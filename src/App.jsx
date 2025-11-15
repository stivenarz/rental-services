import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar/navbar';
import AppRouter from './router/Approuter';
import { getLS, useLocalStorageObserver } from './services/localStorageService';
import './App.css';

function App() {
  const [title, setTitle] = useState('Servicios locativos');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(() => {
    const localUser = getLS('user');
    return localUser ? localUser : null;
  });

  // User Profile
  useLocalStorageObserver((change) => {
    if (!change) return;
    if (change.key === 'user') {
      setUser(change.value);
    }
  }, []);

  return (
    <>
      <div className="header">
        <Navbar brand={title} user={user} setSearch={setSearch} />
      </div>
      <div>
        <AppRouter search= {search} />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { style: { background: '#4CAF50', color: '#fff' } },
          error: { style: { background: '#f44336', color: '#fff' } },
        }}
      />
    </>
  );
}

export default App;
