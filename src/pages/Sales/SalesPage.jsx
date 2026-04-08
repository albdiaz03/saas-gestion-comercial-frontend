import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getSales,
  createSale,
  updateSale,
  deleteSale
} from '../../services/saleService';
import { getClients } from '../../services/clientService';
import { getProducts } from '../../services/productService';
import './Sales.css';

const EMPTY_ITEM = { productsId: '', quantity: 1, unitPrice: '' };

const EMPTY_FORM = {
  clientsId: '',
  date: new Date().toISOString().slice(0, 10),
  items: [{ ...EMPTY_ITEM }]
};

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

const fetchAll = async () => {
  setLoading(true);
  try {
    const [salesRes, clientsRes, productsRes] = await Promise.all([
      getSales(),
      getClients(),
      getProducts(),
    ]);

    console.log("SALES:", salesRes);
    console.log("CLIENTS:", clientsRes);
    console.log("PRODUCTS:", productsRes);

    setSales(salesRes);
    setClients(clientsRes);
    setProducts(productsRes);
  } catch (error) {
    console.error("ERROR FETCH:", error);
    toast.error("Error al cargar datos");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAll();
  }, []);

  // Calcular total de los items del form
  const formTotal = form.items.reduce((acc, i) => {
    const qty = Number(i.quantity) || 0;
    const price = Number(i.unitPrice) || 0;
    return acc + qty * price;
  }, 0);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (sale) => {
    setEditingId(sale.id);
    setForm({
      clientsId: sale.clientsId,
      date: sale.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      items: sale.items.map((i) => ({
        productsId: i.productsId,
        quantity: i.quantity,
        unitPrice: i.unitPrice
      }))
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // Cambios en campos del form principal
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Cambios en un item
  const handleItemChange = (index, field, value) => {
    setForm((f) => {
      const items = [...f.items];
      items[index] = { ...items[index], [field]: value };

      // Auto-fill unitPrice desde el producto seleccionado
      if (field === 'productsId') {
        const product = products.find((p) => p.id === value);
        if (product?.price) items[index].unitPrice = product.price;
      }

      return { ...f, items };
    });
  };

  const addItem = () =>
    setForm((f) => ({ ...f, items: [...f.items, { ...EMPTY_ITEM }] }));

  const removeItem = (index) =>
    setForm((f) => ({
      ...f,
      items: f.items.filter((_, i) => i !== index)
    }));

  const handleSubmit = async () => {
    const payload = {
      clientsId: form.clientsId,
      date: form.date ? new Date(form.date).toISOString() : undefined,
      items: form.items.map((i) => ({
        productsId: i.productsId,
        quantity: Number(i.quantity),
        unitPrice: Number(i.unitPrice)
      }))
    };

    setSaving(true);
    const promise = editingId
      ? updateSale(editingId, payload)
      : createSale(payload);

    toast.promise(promise, {
      loading: editingId ? 'Actualizando venta...' : 'Registrando venta...',
      success: editingId ? 'Venta actualizada ✓' : 'Venta registrada ✓',
      error: (err) =>
        err?.response?.data ||
        (editingId ? 'Error al actualizar' : 'Error al registrar')
    });

    try {
      await promise;
      closeModal();
      fetchAll();
    } catch {
      // toast.promise maneja el error
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    const promise = deleteSale(id);
    toast.promise(promise, {
      loading: 'Eliminando...',
      success: 'Venta eliminada',
      error: 'Error al eliminar'
    });
    promise.then(fetchAll).catch(() => {});
  };

  const isFormValid =
    form.clientsId &&
    form.items.length > 0 &&
    form.items.every((i) => i.productsId && i.quantity > 0 && i.unitPrice > 0);

  const filtered = sales.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.clientName?.toLowerCase().includes(q) ||
      s.items?.some((i) => i.productName?.toLowerCase().includes(q))
    );
  });

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('es-CL', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      : '—';

  const formatPrice = (n) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(n);

  return (
    <div className="sale-page">
      <div className="sale-header">
        <h1 className="sale-title">Ventas</h1>
        <button className="sale-btn-add" onClick={openCreate}>
          + Nueva venta
        </button>
      </div>

      <div className="sale-search-bar">
        <input
          type="text"
          placeholder="Buscar por cliente o producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="sale-spinner-wrap">
          <div className="sale-spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="sale-empty">
          <div className="sale-empty-icon">🧾</div>
          <p>
            {search
              ? 'Sin resultados para tu búsqueda'
              : 'No hay ventas registradas aún'}
          </p>
        </div>
      ) : (
        <div className="sale-table-wrapper">
          <table className="sale-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Items</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.clientName}</td>
                  <td>
                    <span className="sale-badge-items">
                      {s.items?.length ?? 0} producto
                      {s.items?.length !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td>
                    <span className="sale-badge-total">
                      {formatPrice(s.totalAmount)}
                    </span>
                  </td>
                  <td>{formatDate(s.date)}</td>
                  <td>
                    <div className="sale-actions">
                      <button
                        className="sale-btn-edit"
                        onClick={() => openEdit(s)}
                      >
                        Editar
                      </button>
                      <button
                        className="sale-btn-delete"
                        onClick={() => handleDelete(s.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="sale-modal-overlay"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="sale-modal">
            <h2 className="sale-modal-title">
              {editingId ? 'Editar venta' : 'Nueva venta'}
            </h2>

            {/* Cliente y fecha */}
            <div className="sale-form-row">
              <div className="sale-form-group">
                <label>Cliente</label>
                <select
                  name="clientsId"
                  value={form.clientsId}
                  onChange={handleFormChange}
                >
                  <option value="">Seleccionar...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sale-form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            {/* Items */}
            <div className="sale-items-section">
              <span className="sale-items-label">Productos</span>

              {form.items.map((item, index) => (
                <div className="sale-item-row" key={index}>
                  <select
                    value={item.productsId}
                    onChange={(e) =>
                      handleItemChange(index, 'productsId', e.target.value)
                    }
                  >
                    <option value="">Producto...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    placeholder="Cant."
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Precio u."
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, 'unitPrice', e.target.value)
                    }
                  />
                  <button
                    className="sale-btn-remove-item"
                    onClick={() => removeItem(index)}
                    disabled={form.items.length === 1}
                    title="Eliminar item"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button className="sale-btn-add-item" onClick={addItem}>
                + Agregar producto
              </button>

              {formTotal > 0 && (
                <p className="sale-total-preview">
                  Total: <strong>{formatPrice(formTotal)}</strong>
                </p>
              )}
            </div>

            <div className="sale-modal-footer">
              <button className="sale-btn-cancel" onClick={closeModal}>
                Cancelar
              </button>
              <button
                className="sale-btn-save"
                onClick={handleSubmit}
                disabled={saving || !isFormValid}
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
