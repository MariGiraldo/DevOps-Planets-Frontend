import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Bienvenida.css'

function Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="bienvenida">
      <div className="bienvenida-content">
        <div className="bienvenida-badge">Nivel 1: Variables</div>
        <h1>Bienvenido a DevOps Planet</h1>
        <p>Explora Marte, desbloquea banderas y aprende programación con ejercicios prácticos.</p>
        <div className="bienvenida-buttons">
          <Button onClick={() => navigate('/mundo')}>Comenzar</Button>
          <Button variant="secondary" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
        </div>
      </div>
    </div>
  )
}

export default Bienvenida
