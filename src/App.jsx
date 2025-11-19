import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

import './App.css';

function App() {
  return (
    <>
      <AppRouter />
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
