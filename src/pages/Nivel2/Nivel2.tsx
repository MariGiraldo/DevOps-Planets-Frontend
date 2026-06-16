import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Nivel2.css'

const INITIAL_CODE = `int numero = 8;`

const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {

        int numero = 8;

        if (numero % 2 == 0) {
            System.out.println("Es par");
        } else {
            System.out.println("Es impar");
        }
    }
}`

function Nivel2() {
  const navigate = useNavigate()

  const [code, setCode] = useState(INITIAL_CODE)
  const [output, setOutput] = useState(
    'Aquí se mostrará el resultado de la ejecución.'
  )

  const [isCorrect, setIsCorrect] = useState(false)
  const [timer, setTimer] = useState(180)
  const [revealEnabled, setRevealEnabled] = useState(false)
  const [responseUsed, setResponseUsed] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (current <= 1) {
          setRevealEnabled(true)
          clearInterval(interval)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [timer])

  const handleExecute = () => {
    const normalized = code.replace(/\s+/g, '').toLowerCase()

    const valid =
      normalized.includes('intnumero=8') &&
      normalized.includes('numero%2==0') &&
      normalized.includes('espar')

    if (valid) {
      setOutput('✅ ¡Correcto! Has identificado correctamente si es par.')
      setIsCorrect(true)
    } else {
      setOutput('❌ Debes usar (numero % 2 == 0) para validar si es par.')
      setIsCorrect(false)
    }
  }

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return

    setCode(SOLUTION_CODE)
    setResponseUsed(true)
    setRevealEnabled(false)

    setOutput('💡 Solución insertada. Ejecuta nuevamente.')
  }

  const handleFinish = () => {
    if (!isCorrect) return
    navigate('/mundo')
  }

  return (
    <div className="nivel2-page">

      <div className="nivel-header">
        <div>
          <button
            className="back-button"
            onClick={() => navigate('/mundo')}
          >
            ← Volver al mapa
          </button>

          <h1>Nivel 2: Condicionales Básicas</h1>

          <p>
            Determina si un número es par o impar usando el operador módulo.
          </p>
        </div>

        <div className="timer-card">
          <span>Respuesta disponible en</span>
          <strong>{formattedTimer}</strong>
        </div>
      </div>

      <div className="nivel-grid">

        {/* TEORÍA */}
        <section className="panel theory-panel">
          <h2>Teoría</h2>

          <p>
            El operador <strong>%</strong> (módulo) permite obtener el residuo de una división.
          </p>

          <p>
            Si un número dividido entre 2 tiene residuo 0, entonces es un número par.
          </p>

          <div className="challenge-box">
            <h3>💡 Misión</h3>

            <p>
              Debes verificar si el número es par usando una condición if.
            </p>

            <p>
              Ejemplo: <strong>numero % 2 == 0</strong>
            </p>
          </div>

          <div className="actions-row">
            <Button
              onClick={() =>
                setOutput('📌 Pista: usa numero % 2 == 0')
              }
            >
              Pista
            </Button>

            <Button
              variant="secondary"
              onClick={handleReveal}
              disabled={!revealEnabled || responseUsed}
            >
              {responseUsed ? 'Respuesta usada' : 'Mostrar respuesta'}
            </Button>
          </div>
        </section>

        {/* EDITOR */}
        <section className="panel editor-panel">
          <h2>Editor</h2>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor"
            spellCheck={false}
          />

          <div className="editor-buttons">
            <Button onClick={handleExecute}>
              Ejecutar Java
            </Button>

            <Button
              variant="secondary"
              onClick={() => setCode(INITIAL_CODE)}
            >
              Limpiar
            </Button>
          </div>
        </section>

      </div>

      {/* RESULTADO */}
      <div className="resultado-grid">

        <section className="panel result-panel">
          <h2>Resultado</h2>

          <div className={`result-box ${isCorrect ? 'success' : 'error'}`}>
            {output}
          </div>

          <Button
            onClick={handleFinish}
            disabled={!isCorrect}
          >
            Terminar nivel
          </Button>
        </section>

        {/* ANIMACIÓN */}
        <section className="panel animation-panel">
          <h2>Animación</h2>

          <div className="space-animation">
            <div className={`rocket ${isCorrect ? 'rocket-fly' : ''}`}>
              🚀
            </div>

            <div className="mars">🪐</div>
          </div>

          <p>
            Si es correcto, el cohete despega.
          </p>
        </section>

      </div>
    </div>
  )
}

export default Nivel2