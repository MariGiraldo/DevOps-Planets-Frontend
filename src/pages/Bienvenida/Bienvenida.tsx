import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Bienvenida.css'

// Modificación en src/pages/Bienvenida/Bienvenida.tsx

function Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="bienvenida">
      <div className="bienvenida-content">
        <h1>Bienvenido a DevOps Planet</h1>
        <p>Explora Marte, desbloquea banderas y aprende programación con ejercicios prácticos.</p>
        <div className="bienvenida-buttons">
          {/* CAMBIADO: De '/map' a '/mundo' para coincidir con tu mapa de niveles */}
          <Button onClick={() => navigate('/mundo')}>Comenzar</Button>
          <Button variant="secondary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        </div>
      </div>
    </div>
  )
}

export default Bienvenida
