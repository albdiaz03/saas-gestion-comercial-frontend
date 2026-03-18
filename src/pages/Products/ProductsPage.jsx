import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import AppLayout from '../../components/Layout/AppLayout';
import "./Products.css";
import toast from 'react-hot-toast';

const emptyForm = { name: "", price: "", stock: "", isActive: true };

function ProductsPage() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId]   = useState(null);
  const [search, setSearch]       = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  console.log("TOKEN:", token);
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, price: p.price, stock: p.stock, isActive: p.isActive });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleSave = async () => {


    if (!form.name.trim())      return setFormError("El nombre es obligatorio.");
    if (form.price === "")      return setFormError("El precio es obligatorio.");
    if (form.stock === "")      return setFormError("El stock es obligatorio.");
    if (Number(form.price) < 0) return setFormError("El precio no puede ser negativo.");
    if (Number(form.stock) < 0) return setFormError("El stock no puede ser negativo.");

    setSaving(true);
    setFormError("");
    try {
      const dto = {
        name:     form.name.trim(),
        price:    Number(form.price),
        stock:    Number(form.stock),
        isActive: form.isActive,
      };

      await toast.promise(
      editing ? updateProduct(editing.id, dto) : createProduct(dto),
      {
        loading: editing ? 'Actualizando...' : 'Creando producto...',
        success: editing ? 'Producto actualizado' : 'Producto creado',
        error: 'Error al guardar. Intenta de nuevo.',
      }
    ); 
      await fetchData();
      closeModal();
    } catch {
  
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
  try {
    await toast.promise(
      deleteProduct(deleteId),
      {
        loading: 'Eliminando...',
        success: 'Producto eliminado',
        error: 'Error al eliminar.',
      }
    );
    setDeleteId(null);
    await fetchData();
  } catch {
    setDeleteId(null);
  }
};

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="prod-page">

        {/* Header */}
        <div className="prod-header">
          <div>
            <h1 className="prod-title">Productos</h1>
            <p className="prod-subtitle">
              {products.length} producto{products.length !== 1 ? "s" : ""} registrado{products.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="prod-btn-primary" onClick={openCreate}>
            + Nuevo producto
          </button>
        </div>

        {/* Búsqueda */}
        <div className="prod-search-row">
          <input
            className="prod-search"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Tabla */}
        <div className="prod-card">
          {loading ? (
            <div className="prod-state">
              <div className="prod-spinner" />
              <p className="prod-state-text">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="prod-state">
              <span className="prod-state-icon">⚠️</span>
              <p className="prod-state-text">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="prod-state">
              <span className="prod-state-icon">📦</span>
              <p className="prod-state-text">
                {search ? "Sin resultados." : "No hay productos registrados."}
              </p>
            </div>
          ) : (
            <div className="prod-table-wrapper">
              <table className="prod-table">
                <thead>
                  <tr>
                    <th className="prod-th">Nombre</th>
                    <th className="prod-th prod-th-right">Precio</th>
                    <th className="prod-th prod-th-right">Stock</th>
                    <th className="prod-th prod-th-center">Estado</th>
                    <th className="prod-th prod-th-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id} className={`prod-tr ${i % 2 !== 0 ? "prod-tr-alt" : ""}`}>
                      <td className="prod-td"><span className="prod-name">{p.name}</span></td>
                      <td className="prod-td prod-td-right">
                        <span className="prod-price">${Number(p.price).toLocaleString("es-CL")}</span>
                      </td>
                      <td className="prod-td prod-td-right">
                        <span className={`prod-stock ${p.stock <= 5 ? "prod-stock-low" : p.stock <= 20 ? "prod-stock-mid" : ""}`}>
                          {p.stock}{p.stock <= 5 && <span className="prod-stock-warn"> ⚠ bajo</span>}
                        </span>
                      </td>
                      <td className="prod-td prod-td-center">
                        <span className={`prod-badge ${p.isActive ? "prod-badge-active" : "prod-badge-inactive"}`}>
                          {p.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="prod-td prod-td-center">
                        <div className="prod-actions">
                          <button className="prod-btn-edit" onClick={() => openEdit(p)}>Editar</button>
                          <button className="prod-btn-delete" onClick={() => setDeleteId(p.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {modalOpen && (
        <div className="prod-modal-overlay" onClick={closeModal}>
          <div className="prod-modal" onClick={e => e.stopPropagation()}>
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">{editing ? "Editar producto" : "Nuevo producto"}</h2>
              <button className="prod-modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="prod-modal-body">
              <div className="prod-field">
                <label className="prod-label">Nombre</label>
                <input className="prod-input" placeholder="Nombre del producto"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="prod-field-row">
                <div className="prod-field">
                  <label className="prod-label">Precio</label>
                  <input className="prod-input" type="number" min="0" placeholder="0"
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div className="prod-field">
                  <label className="prod-label">Stock</label>
                  <input className="prod-input" type="number" min="0" placeholder="0"
                    value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
                </div>
              </div>
              <div className="prod-field">
                <label className="prod-label">Estado</label>
                <button
                  className={`prod-toggle ${form.isActive ? "prod-toggle-on" : "prod-toggle-off"}`}
                  onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  style={{ width: "fit-content" }}
                >
                  {form.isActive ? "Activo" : "Inactivo"}
                </button>
              </div>
              {formError && <p className="prod-form-error">{formError}</p>}
            </div>
            <div className="prod-modal-footer">
              <button className="prod-btn-cancel" onClick={closeModal}>Cancelar</button>
              <button className="prod-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {deleteId && (
        <div className="prod-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="prod-modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="prod-modal-header">
              <h2 className="prod-modal-title">Eliminar producto</h2>
              <button className="prod-modal-close" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="prod-modal-body">
              <p className="prod-confirm-text">¿Estás seguro? Esta acción no se puede deshacer.</p>
            </div>
            <div className="prod-modal-footer">
              <button className="prod-btn-cancel" onClick={() => setDeleteId(null)}>Cancelar</button>
              <button className="prod-btn-danger" onClick={handleDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default ProductsPage;