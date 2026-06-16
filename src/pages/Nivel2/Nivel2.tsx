import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Nivel2.css'

const INITIAL_CODE = `int combustible = 50;
int extra = 20;`

const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {

        int combustible = 50;
        int extra = 20;

        int total = combustible + extra;

        System.out.println(total);
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
      normalized.includes('intcombustible=50') &&
      normalized.includes('intextra=20') &&
      normalized.includes('inttotal=combustible+extra')

    if (valid) {
      setOutput(
        '✅ ¡Correcto! Has calculado correctamente el combustible total.'
      )
      setIsCorrect(true)
    } else {
      setOutput(
        '❌ Debes crear una variable llamada total que almacene combustible + extra.'
      )
      setIsCorrect(false)
    }
  }

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return

    setCode(SOLUTION_CODE)
    setResponseUsed(true)
    setRevealEnabled(false)

    setOutput(
      '💡 Solución insertada en el editor. Ejecuta nuevamente para validar.'
    )
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

          <h1>Nivel 2: Variables y Operaciones</h1>

          <p>
            Calcula el combustible total necesario para llegar a Marte.
          </p>
        </div>

        <div className="timer-card">
          <span>Respuesta disponible en</span>
          <strong>{formattedTimer}</strong>
        </div>
      </div>

      <div className="nivel-grid">
        <section className="panel theory-panel">
          <h2>Teoría</h2>

          <p>
            Las variables también almacenan números y permiten realizar
            operaciones matemáticas.
          </p>

          <pre>
            <code>
{`int combustible = 50;
int extra = 20;

int total = combustible + extra;`}
            </code>
          </pre>

          <div className="challenge-box">
            <h3>Misión Espacial</h3>

            <p>
              Calcula el combustible total sumando las variables
              <strong> combustible </strong>
              y
              <strong> extra</strong>.
            </p>
          </div>

          <div className="actions-row">
            <Button
              onClick={() =>
                setOutput(
                  '📌 Pista: Crea una variable llamada total y asígnale combustible + extra.'
                )
              }
            >
              Pista
            </Button>

            <Button
              variant="secondary"
              onClick={handleReveal}
              disabled={!revealEnabled || responseUsed}
            >
              {responseUsed
                ? 'Respuesta usada'
                : 'Mostrar respuesta'}
            </Button>
          </div>
        </section>

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
              Ejecutar Compilador Java
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

      <div className="resultado-grid">
        <section className="panel result-panel">
          <h2>Resultado</h2>

          <div
            className={`result-box ${
              isCorrect ? 'success' : 'error'
            }`}
          >
            {output}
          </div>

          <Button
            onClick={handleFinish}
            disabled={!isCorrect}
          >
            Terminar nivel
          </Button>
        </section>

        <section className="panel animation-panel">
          <h2>Viaje a Marte</h2>

          <div className="space-animation">
            <div
              className={`rocket ${
                isCorrect ? 'rocket-fly' : ''
              }`}
            >
              🚀
            </div>

            <div className="mars">🪐</div>
          </div>

          <p>
            Cuando resuelvas el ejercicio correctamente,
            el cohete llegará a Marte.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Nivel2