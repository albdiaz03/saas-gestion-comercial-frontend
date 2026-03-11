import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {

      const response = await axios.post(
        'http://localhost:5152/api/Auth/login',
        {
          email: email,
          password: password
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email
        })
      );

      alert('Login correcto');

      navigate('/dashboard');

    } catch (error) {
      alert("Login incorrecto");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default LoginPage;