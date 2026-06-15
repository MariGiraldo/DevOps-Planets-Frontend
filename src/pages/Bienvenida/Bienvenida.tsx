import { useNavigate } from 'react-router-dom';
import './Bienvenida.css';

import fondo from '../../assets/backgrounds/Fondo.jpeg';
import alien from '../../assets/images/alien.jpeg';

export default function Bienvenida() {

  const navigate = useNavigate();

  return (

    <div
      className="bienvenida-container"
      style={{
        backgroundImage: `url(${fondo})`
      }}
    >

      <div className="bienvenida-content">

        <div className="bienvenida-texto">

          <h1>
            Explora Marte y domina la programación
          </h1>

          <p>
            Bienvenido, explorador
          </p>

          <button
            onClick={() => navigate('/login')}
          >
            COMENZAR
          </button>

        </div>

        <div className="bienvenida-imagen">

          <img
            src={alien}
            alt="Marciano"
          />

        </div>

      </div>

    </div>
  );
}