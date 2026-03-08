import { Link, useNavigate } from "react-router-dom";

function AppLayout({ children }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        // eliminamos el token del browser
        localStorage.removeItem("token");

        //redieccion al logn
        navigate("/");
    }

  return (

    <div style={{ display: "flex", height: "100vh" }}>

      <div style={{
        width: "200px",
        background: "#1e293b",
        color: "white",
        padding: "20px"
      }}>

        <h3>SaaS</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/sales">Sales</Link>
        </nav>

        <button
            onClick={handleLogout}
            style={{ marginTop: "20px" }}
            >
                Logout
        </button>

      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>

    </div>

  );
}

export default AppLayout;