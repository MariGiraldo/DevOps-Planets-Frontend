import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import './Login.css';

import fondo from '../../assets/backgrounds/Fondo.jpeg';
import alien from '../../assets/images/alien.jpeg';

export default function Login() {

  const navigate = useNavigate();

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      const response = await login(
        nombreUsuario,
        password
      );

      localStorage.setItem(
        'token',
        response.token
      );

      localStorage.setItem(
        'usuario',
        response.nombreUsuario
      );

      navigate('/mundo');

    } catch (err) {

      setError(
        'Usuario o contraseña incorrectos'
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fondo})`
      }}
    >

      <div className="login-card">

        <img
          src={alien}
          alt="Alien"
          className="alien-image"
        />

        <h1>DEVOPS PLANET</h1>

        <p>
          Accede a la base marciana
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) =>
              setNombreUsuario(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          {error && (

            <p className="error-message">
              {error}
            </p>

          )}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? 'Ingresando...'
              : 'INGRESAR'}

          </button>

        </form>

        <p className="register-link">

          ¿No tienes cuenta?

          <Link to="/registro">
            {' '}Regístrate
          </Link>

        </p>

      </div>

    </div>

  );
}