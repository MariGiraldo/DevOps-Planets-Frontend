import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api'; // Usamos tu servicio central de API
import { JwtResponse } from '../../models/JwtResponse';

// Assets de diseño
import alien from '../../assets/images/omni.png';
import fondo from '../../assets/backgrounds/Fondo.jpeg';

import './Registro.css';

export default function Registro() {
  const navigate = useNavigate();

  // Estados independientes del diseño visual
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    // 1. Validación en el Frontend
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      console.log('Intentando registrar al explorador:', nombreUsuario);

      // 2. Llamada a la API que retorna el Token (Lógica del componente 1)
      const data: JwtResponse = await api.register(nombreUsuario, password);

      console.log('¡Registro exitoso! Guardando sesión para:', data.nombreUsuario);
      
      // 3. Autenticación automática: Guardamos el token recibido
      localStorage.setItem('token', data.token);
      
      // 4. Redirección directa al mapa del mundo espacial
      navigate('/mundo-niveles');

    } catch (err: any) {
      console.error('Falló el registro en el servidor:', err);
      setError('Error al crear la cuenta. Intenta con otro nombre de usuario.');
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
        <h1>
          CREA TU CUENTA
          <br />
          DE EXPLORADOR
        </h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'REGISTRANDO...' : 'REGISTRARME'}
          </button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta?
          <Link to="/login"> Iniciar sesión</Link>
        </p>
      </div>

      <img
        src={alien}
        alt="Marciano"
        className="alien-side"
      />
    </div>
  );
}