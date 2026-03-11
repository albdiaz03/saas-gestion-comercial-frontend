// SaludoSales → Devuelve el HTML con el mensaje visible.
function SaludoSales() {
  return (
    <div>
      <h1>saludo sale</h1>
      <h5>memsaje solo para sale</h5>
    </div>
  );
}

// SalesPage → Renderiza <SaludoSales />.
function SalesPage() {
  return <SaludoSales />;
}

export default SalesPage;
