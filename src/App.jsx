import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      {/*Añadimos toaster para las alertas*/}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f1c2e',
            color: '#e6edf3',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif',
            padding: '12px 16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          },
          success: {
            iconTheme: { primary: '#388bfd', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <AppRouter />
    </div>
  );
}

export default App;