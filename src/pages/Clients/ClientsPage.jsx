import AppLayout from '../../components/Layout/AppLayout';

// Componente que solo devuelve el saludo
function ClientSaludo() {
  return (
    <div>
      <h1>Saludo Client</h1>
      <h5>saludete</h5>
    </div>
  );
}

// Página completa de clientes (contenido principal)
function ClientsPageContent() {
  return <div></div>;
}

// Wrapper que aplica AppLayout (sidebar + children)
// “Usa AppLayout como estructura de la página y coloca estos componentes dentro”.
function ClientsPage() {
  return (
    <AppLayout>
      <ClientsPageContent />
      <ClientSaludo />
    </AppLayout>
  );
}

export default ClientsPage;
