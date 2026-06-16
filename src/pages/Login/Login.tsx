import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api'; // Conectado a tu servicio real
import { JwtResponse } from '../../models/JwtResponse'; // Tu modelo de datos

import './Login.css';

// Assets de diseño
import fondo from '../../assets/backgrounds/Fondo.jpeg';
import alien from '../../assets/images/omni.png';

export default function Login() {
  const navigate = useNavigate();

  // Estados
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reiniciar errores y activar el estado de carga
    setError('');
    setLoading(true);
    console.log('Intentando iniciar sesión con:', nombreUsuario);

    try {
      // 1. Llamada a tu API unificada
      const data: JwtResponse = await api.login(nombreUsuario, password);
      
      console.log('¡Login exitoso! Hola de nuevo,', data.nombreUsuario);

      // 2. Guardar los datos de sesión en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', data.nombreUsuario);

      // 3. Redirigir al usuario al mapa del mundo espacial
      navigate('/mundo');

    } catch (err: any) {
      console.error('Falló el inicio de sesión:', err);
      // Mensaje de error amigable para la interfaz
      setError('Error al ingresar a la cuenta. Verifica tus credenciales e intenta de nuevo.');
    } finally {
      // Apagar el estado de carga sin importar si hubo éxito o error
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
        <h1>ACCESO A LA BASE MARCIANA</h1>
        <p>Inicia sesión para continuar tu misión</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            disabled={loading} // Bloquea el input mientras carga
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // Bloquea el input mientras carga
            required
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'INGRESAR'}
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta?
          <Link to="/registro"> Regístrate</Link>
        </p>
      </div>

      <img
        src={alien}
        alt="Alien"
        className="alien-side"
      />
    </div>
  );
}