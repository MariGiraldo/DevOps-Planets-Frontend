import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Bienvenida.css'

function Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="bienvenida">
      <div className="bienvenida-content">
        <h1>Bienvenido a DevOps Planet</h1>
        <p>Aprende DevOps mientras completas los niveles</p>
        <div className="bienvenida-buttons">
          <Button onClick={() => navigate('/login')}>Iniciar Sesión</Button>
          <Button onClick={() => navigate('/registro')}>Registrarse</Button>
        </div>
      </div>
    </div>
  )
}

export default Bienvenida
