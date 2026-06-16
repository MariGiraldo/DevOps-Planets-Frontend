import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Victoria.css'

import alien from '../../assets/icons/omni.png'

function Victoria() {
  const navigate = useNavigate()

  return (
    <div className="victoria-page">

      <div className="victoria-container">

        <h1 className="victoria-title">
          🏆 ¡MISIÓN COMPLETADA!
        </h1>

        <p className="victoria-text">
          Has logrado superar todos los niveles y completar la misión espacial.
        </p>

        <div className="victoria-alien">
          <img src={alien} alt="alien" />
        </div>

        <Button onClick={() => navigate('/mundo')}>
          Volver al mapa
        </Button>

      </div>

    </div>
  )
}

export default Victoria