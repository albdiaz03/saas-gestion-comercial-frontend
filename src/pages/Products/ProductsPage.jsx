import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import "../Products/Products.css";
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    }catch (err){
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  }, []);

  return (
    <div style={styles.page}>
    {/* Header*/}
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>Productos</h1>
        <p style={styles.subtitle}>
          {products.length} producto {products.length !== 1 ? "s" : ""} registrado{products.length !==1 ? "s" : ""} 
        </p>
      </div>
    </div>

    {/*Tabla*/}
    <div style={styles.card}>
      {loading ? (
        <div style={styles.statebox}> 
          <span style={styles.spinner}>!</span>
          <p style={styles.stateText}>Cargando Productos....</p>
        </div>
        ) : error ? (
          <div style={styles.statebox}> 
          <span style={styles.errorIcon}>!</span>
          <p style={styles.stateText}>{error}</p>
          </div>
          
        ) : products === 0 ? (
          <div style={styles.statebox}> 
          <span style={styles.emptyIcon}>!</span>
          <p style={styles.stateText}>No hay productos registrados</p>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={{ ...styles.th, textAlign: "rigth"}}>Pecio</th>
                  <th style={{ ...styles.th, textAlign: "rigth"}}>Stock</th>
                  <th style={{ ...styles.th, textAlign: "center"}}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {products.map ((p, i) => (
                  <tr
                  key={p.id}
                  style={{
                    ...styles.tr,
                    backgroundColor: i % 2 === 0 ? "#ffff" : "#f8fafc",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "f1f5f9"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = i % 2 === 0 ? "#ffffff" : "#f8fafc"}
                  >
                    <td style={styles.td}>
                      <div style={styles.productName}>{p.name}</div>
                    </td>
                    <td style={{ ...styles.td, textAlign: "rigth"}}>
                      <span style={styles.price}>${Number(p.price).toLocaleString("es-CL")}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "rigth"}}>
                      <span style={{ ...styles.stock,
                        color: p.stock <= 5 ? "#ef4444" : p.stock >= 20 ? "#f59e0b" : "#64748b"
                      }}>
                        {p.stock}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "center"}}>
                      <span style={{
                        ...styles.badge,
                        backgroundColor: p.isActive ? "#dcfce7" : "#fee2e2",
                        color: p.isActive ? "#16a34a" : "dc2626",
                      }}>
                        {p.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
    <style>{`
    @keyframes spin {
    to { transform: rotate (360deg); }
    }
    `}</style>
  </div>
  );
}

const styles = {
   page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "4px 0 0 0",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    padding: "12px 20px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: {
    transition: "background-color 0.15s ease",
    cursor: "default",
  },
  td: {
    padding: "14px 20px",
    borderBottom: "1px solid #f1f5f9",
    color: "#334155",
  },
  productName: {
    fontWeight: "500",
    color: "#0f172a",
  },
  price: {
    fontWeight: "600",
    color: "#0f172a",
    fontVariantNumeric: "tabular-nums",
  },
  stock: {
    fontWeight: "500",
    fontVariantNumeric: "tabular-nums",
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    gap: "12px",
  },
  stateText: {
    color: "#94a3b8",
    fontSize: "14px",
    margin: 0,
  },
  emptyIcon: {
    fontSize: "32px",
  },
  errorIcon: {
    fontSize: "28px",
    color: "#ef4444",
  },
  spinner: {
    width: "28px",
    height: "28px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  
};

export default ProductsPage;