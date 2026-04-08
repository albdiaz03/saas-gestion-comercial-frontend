import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, LogOut } from 'lucide-react';
import './AppLayout.css';

const navItems = [
  { to: '/dashboard', icon: <LayoutDashboard size={17} />, label: 'Dashboard' },
  { to: '/products',  icon: <Package size={17} />,         label: 'Products'  },
  { to: '/clients',   icon: <Users size={17} />,           label: 'Clients'   },
  { to: '/sales',     icon: <ShoppingCart size={17} />,    label: 'Sales'     },
];

function AppLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className={`layout${collapsed ? ' layout--collapsed' : ''}`}>

      {/* MOBILE NAVBAR */}
      <nav className="mobile-navbar">
        <span className="mobile-navbar-brand">My SaaS</span>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <>
          <div className="sidebar-overlay" onClick={closeMenu} />

          <div className="mobile-dropdown">
            <div className="sidebar-user">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-email">{user?.email || 'email@email.com'}</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              {navItems.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="sidebar-link"
                  onClick={closeMenu}
                >
                  <span className="link-icon">{icon}</span>
                  <span className="link-label">{label}</span>
                </NavLink>
              ))}
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
              <span className="link-icon"><LogOut size={17} /></span>
              <span className="link-label">Logout</span>
            </button>
          </div>
        </>
      )}

      {/* SIDEBAR DESKTOP */}
      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>

        {/* HEADER */}
        <div className="sidebar-header">
          <span className="sidebar-title">My SaaS</span>

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(v => !v)}
          >
            {collapsed ? '☰' : '✕'}
          </button>
        </div>

        {/* USER */}
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-email">{user?.email || 'email@email.com'}</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* NAV */}
        <nav className="sidebar-nav">
          <span className="nav-section-label">Main Menu</span>

          {navItems.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} className="sidebar-link">
              <span className="link-icon">{icon}</span>
              <span className="link-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          <span className="link-icon"><LogOut size={17} /></span>
          <span className="link-label">Logout</span>
        </button>
      </aside>

      {/* CONTENIDO DINÁMICO */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AppLayout;