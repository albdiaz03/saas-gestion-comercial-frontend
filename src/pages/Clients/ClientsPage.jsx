import { useEffect, useState } from "react";
import AppLayout from '../../components/Layout/AppLayout';
import "../Products/Products.css";
import toast from 'react-hot-toast';
import { getClients, createClient, updateClient, deleteClient } from "../../services/clientService";

const emptyForm = { name: "", email: "", phone: "", isActive: true };

function ClientsPage() {
  const [clients, setClients]     = useState([]);
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
    try {
      setLoading(true);
      const data = await getClients();
      setClients(data);        // ← era setClient, faltaba la s
    } catch {
      setError("Error al cargar los clientes.");
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

  const openEdit = (c) => {
    setEditing(c);
    setForm({ name: c.name, email: c.email, phone: c.phone, isActive: c.isActive });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.name.trim())  return setFormError("El nombre es obligatorio.");
    if (!form.email.trim()) return setFormError("El email es obligatorio.");
    if (!form.phone.trim()) return setFormError("El teléfono es obligatorio.");

    setSaving(true);
    setFormError("");
    try {
      const dto = {
        name:     form.name.trim(),
        email:    form.email.trim(),   // ← era Number(form.price), incorrecto
        phone:    form.phone.trim(),   // ← era Number(form.stock), incorrecto
        isActive: form.isActive,
      };

      await toast.promise(
        editing ? updateClient(editing.id, dto) : createClient(dto),
        {
          loading: editing ? 'Actualizando...' : 'Creando cliente...',
          success: editing ? 'Cliente actualizado' : 'Cliente creado',
          error:   'Error al guardar. Intenta de nuevo.',
        }
      );
      await fetchData();
      closeModal();
    } catch {
      // toast.promise maneja el error
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await toast.promise(
        deleteClient(deleteId),
        {
          loading: 'Eliminando...',
          success: 'Cliente eliminado',
          error:   'Error al eliminar.',
        }
      );
      setDeleteId(null);
      await fetchData();
    } catch {
      setDeleteId(null);
    }
  };

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <>
    <div className="prod-page">

      {/* Header */}
      <div className="prod-header">
        <div>
          <h1 className="prod-title">Clientes</h1>
          <p className="prod-subtitle">
            {clients.length} cliente{clients.length !== 1 ? "s" : ""} registrado{clients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="prod-btn-primary" onClick={openCreate}>
          + Nuevo cliente
        </button>
      </div>

      {/* Búsqueda */}
      <div className="prod-search-row">
        <input
          className="prod-search"
          placeholder="Buscar cliente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="prod-card">
        {loading ? (
          <div className="prod-state">
            <div className="prod-spinner" />
            <p className="prod-state-text">Cargando clientes...</p>
          </div>
        ) : error ? (
          <div className="prod-state">
            <span className="prod-state-icon">⚠️</span>
            <p className="prod-state-text">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="prod-state">
            <span className="prod-state-icon">👥</span>
            <p className="prod-state-text">
              {search ? "Sin resultados." : "No hay clientes registrados."}
            </p>
          </div>
        ) : (
          <div className="prod-table-wrapper">
            <table className="prod-table">
              <thead>
                <tr>
                  <th className="prod-th">Nombre</th>
                  <th className="prod-th">Email</th>
                  <th className="prod-th">Teléfono</th>
                  <th className="prod-th prod-th-center">Estado</th>
                  <th className="prod-th prod-th-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className={`prod-tr ${i % 2 !== 0 ? "prod-tr-alt" : ""}`}>
                    <td className="prod-td">
                      <span className="prod-name">{c.name}</span>
                    </td>

                    <td className="prod-td">{c.email}</td>
                    <td className="prod-td">{c.phone}</td>

                    <td className="prod-td prod-td-center">
                      <span className={`prod-badge ${c.isActive ? "prod-badge-active" : "prod-badge-inactive"}`}>
                        {c.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td className="prod-td prod-td-center">
                      <div className="prod-actions">
                        <button className="prod-btn-edit" onClick={() => openEdit(c)}>
                          Editar
                        </button>
                        <button className="prod-btn-delete" onClick={() => setDeleteId(c.id)}>
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
      </div>
    </div>

    {/* Modal Crear/Editar */}
    {modalOpen && (
      <div className="prod-modal-overlay" onClick={closeModal}>
        <div className="prod-modal" onClick={e => e.stopPropagation()}>
          <div className="prod-modal-header">
            <h2 className="prod-modal-title">
              {editing ? "Editar cliente" : "Nuevo cliente"}
            </h2>
            <button className="prod-modal-close" onClick={closeModal}>✕</button>
          </div>

          <div className="prod-modal-body">
            <div className="prod-field">
              <label className="prod-label">Nombre</label>
              <input
                className="prod-input"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="prod-field">
              <label className="prod-label">Email</label>
              <input
                className="prod-input"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>

            <div className="prod-field">
              <label className="prod-label">Teléfono</label>
              <input
                className="prod-input"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              />
            </div>

            <div className="prod-field">
              <label className="prod-label">Estado</label>
              <button
                className={`prod-toggle ${form.isActive ? "prod-toggle-on" : "prod-toggle-off"}`}
                onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              >
                {form.isActive ? "Activo" : "Inactivo"}
              </button>
            </div>

            {formError && <p className="prod-form-error">{formError}</p>}
          </div>

          <div className="prod-modal-footer">
            <button className="prod-btn-cancel" onClick={closeModal}>
              Cancelar
            </button>
            <button className="prod-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear cliente"}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Modal Eliminar */}
    {deleteId && (
      <div className="prod-modal-overlay" onClick={() => setDeleteId(null)}>
        <div className="prod-modal" onClick={e => e.stopPropagation()}>
          <div className="prod-modal-header">
            <h2 className="prod-modal-title">Eliminar cliente</h2>
            <button className="prod-modal-close" onClick={() => setDeleteId(null)}>✕</button>
          </div>

          <div className="prod-modal-body">
            <p className="prod-confirm-text">
              ¿Estás seguro? Esta acción no se puede deshacer.
            </p>
          </div>

          <div className="prod-modal-footer">
            <button className="prod-btn-cancel" onClick={() => setDeleteId(null)}>
              Cancelar
            </button>
            <button className="prod-btn-danger" onClick={handleDelete}>
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}
export default ClientsPage;