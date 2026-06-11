import { useNavigate } from 'react-router-dom'
import './MundoNiveles.css'

function MundoNiveles() {
  const navigate = useNavigate()

  const niveles = [
    { id: 1, nombre: 'Nivel 1', path: '/nivel1' },
    { id: 2, nombre: 'Nivel 2', path: '/nivel2' },
    { id: 3, nombre: 'Nivel 3', path: '/nivel3' },
    { id: 4, nombre: 'Nivel 4', path: '/nivel4' },
    { id: 5, nombre: 'Nivel 5', path: '/nivel5' },
  ]

  return (
    <div className="mundo-niveles">
      <h1>Mundo de Niveles</h1>
      <div className="niveles-grid">
        {niveles.map(nivel => (
          <button
            key={nivel.id}
            className="nivel-card"
            onClick={() => navigate(nivel.path)}
          >
            {nivel.nombre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MundoNiveles
