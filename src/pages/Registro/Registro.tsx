import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';

import './Registro.css';

import fondo from '../../assets/backgrounds/Fondo.jpeg';
import alien from '../../assets/images/alien.jpeg';

export default function Registro() {

  const navigate = useNavigate();

  const [nombreUsuario, setNombreUsuario] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirmarPassword,
    setConfirmarPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError('');

    if (
      password !== confirmarPassword
    ) {

      setError(
        'Las contraseñas no coinciden'
      );

      return;
    }

    setLoading(true);

    try {

      await register(
        nombreUsuario,
        password
      );

      navigate('/login');

    } catch {

      setError(
        'No fue posible registrar el usuario'
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="registro-container"
      style={{
        backgroundImage: `url(${fondo})`
      }}
    >

      <div className="registro-card">

        <img
          src={alien}
          alt="Alien"
          className="alien-image"
        />

        <h1>
          Crea tu cuenta, explorador
        </h1>

        <form
          onSubmit={handleRegister}
        >

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarPassword}
            onChange={(e) =>
              setConfirmarPassword(
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
              ? 'Registrando...'
              : 'REGISTRARME'}

          </button>

        </form>

        <p className="login-link">

          ¿Ya tienes cuenta?

          <Link to="/login">
            {' '}Iniciar sesión
          </Link>

        </p>

      </div>

    </div>

  );
}
