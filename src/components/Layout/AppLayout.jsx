import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';
import './AppLayout.css';

function AppLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <div className="layout">

      {/* Burger solo visible en mobile */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay oscuro al abrir en mobile */}
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? 'active' : ''}`}
        onClick={closeMobileSidebar}
      />

      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'open' : ''}`}>

        {/* Toggle collapse — solo desktop */}
        <button
          className="toggle-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          ☰
        </button>

        <h3 className="sidebar-title">My SaaS</h3>

        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || "User"}</span>
            <span className="user-email">{user?.email || "email@email.com"}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link className="sidebar-link" to="/dashboard" onClick={closeMobileSidebar}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link className="sidebar-link" to="/products" onClick={closeMobileSidebar}>
            <Package size={18} />
            <span>Products</span>
          </Link>
          <Link className="sidebar-link" to="/clients" onClick={closeMobileSidebar}>
            <Users size={18} />
            <span>Clients</span>
          </Link>
          <Link className="sidebar-link" to="/sales" onClick={closeMobileSidebar}>
            <ShoppingCart size={18} />
            <span>Sales</span>
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

      </aside>

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;