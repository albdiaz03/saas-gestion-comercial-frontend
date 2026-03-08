import AppLayout from "../../components/Layout/AppLayout";
import axios from "axios";
import { useEffect, useState } from "react";


function DashboardPage() {

    // Estado donde guardaremos el mensaje de la API
    const [message, setMessage] = useState("");
    useEffect (() => {
        // Función que consulta el backend
        const fetchData = async () => {
            // Recuperamos el token guardado en login
            const token = localStorage.getItem("token");
            // Llamada GET al backend
            const response = await axios.get(
                "http://localhost:5152/api/dashboard",
                {   
                    // Enviamos el token en los headers
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Guardamos la respuesta en el estado
            setMessage(resumeAndPrerenderToNodeStream.data.message)
        };
        // Ejecutamos la llamada
        fetchData();
    }, []);

  return (

    <AppLayout>

      <h2>Dashboard</h2>
      <p>{message}</p>

    </AppLayout>

  );

}

export default DashboardPage;