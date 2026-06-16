import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Nivel1.css'



const INITIAL_CODE = `public class Main {
    public static void main(String[] args) {
        // Escribe tu código abajo de esta línea ...
        System.out.println("Planeta: " + planeta);
    }
}`
const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {
        String planeta = "Marte";
        System.out.println("Planeta: " + planeta);
    }
}`

function Nivel1() {
  const navigate = useNavigate()
  const [code, setCode] = useState(INITIAL_CODE)
  const [output, setOutput] = useState('Aquí se mostrará el resultado de la ejecución.')
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
    const valid = normalized.includes('stringplaneta="marte"') || normalized.includes('stringplaneta=\"marte\"')
    if (valid) {
      setOutput('✅ ¡Correcto! El código declara la variable y la imprime correctamente.')
      setIsCorrect(true)
    } else {
      setOutput('❌ Revisa la sintaxis: declara una variable String llamada planeta y guárdale "Marte".')
      setIsCorrect(false)
    }
  }

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return
    setCode(SOLUTION_CODE)
    setResponseUsed(true)
    setRevealEnabled(false)
    setOutput('💡 Solución insertada en el editor. Ajusta y ejecuta para continuar.')
  }

  const handleFinish = () => {
  if (!isCorrect) return
  navigate('/mundo-niveles')
}

  return (
    <div className="nivel1-page">
      <div className="nivel-header">
        <div>
          <button className="back-button" onClick={() => navigate('/mundo-niveles')}>
            ← Volver al mapa
          </button>
          <h1>Nivel 1: Guardar información</h1>
          <p>Aprende a declarar una variable String y guardar el valor "Marte".</p>
        </div>
        <div className="timer-card">
          <span>Respuesta disponible en</span>
          <strong>{formattedTimer}</strong>
        </div>
      </div>

      <div className="nivel-grid">
        <section className="panel theory-panel">
          <h2>Teoría</h2>
          <p>Una variable es un espacio en memoria donde se guarda información para usarla luego.</p>
          <p>En Java, primero defines el tipo, después el nombre y finalmente el valor.</p>
          
          <div className="challenge-box">
            <h3>Ejercicio</h3>
            <p>Declara una variable String llamada <strong>planeta</strong> y guarda en ella el texto <strong>"Marte"</strong>. Luego ejecuta el código.</p>
          </div>
          <div className="actions-row">
            <Button onClick={() => setOutput('📌 Pista: Usa "String" seguido del nombre de la variable y el valor entre comillas.')}>Pista</Button>
            <Button variant="secondary" onClick={handleReveal} disabled={!revealEnabled || responseUsed}>
              {responseUsed ? 'Respuesta usada' : 'Mostrar respuesta'}
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
            <Button onClick={handleExecute}>Ejecutar</Button>
            <Button variant="secondary" onClick={() => setCode(INITIAL_CODE)}>
              Limpiar
            </Button>
          </div>
        </section>
      </div>

      <div className="resultado-grid">
        <section className="panel result-panel">
          <h2>Resultado</h2>
          <div className={`result-box ${isCorrect ? 'success' : 'error'}`}>
            {output}
          </div>
          <Button onClick={handleFinish} disabled={!isCorrect} className="finish-button">
            Terminar nivel
          </Button>
        </section>

        <section className="panel animation-panel">
  <h2>Misión Espacial</h2>
  <div className={`galaga-stage ${isCorrect ? 'is-victory' : ''}`}>
    <div className="stars" />
    <div className="ship">🚀</div>
    {!isCorrect && (
      <>
        <div className="invader inv-1">👾</div>
        <div className="invader inv-2">👾</div>
        <div className="invader inv-3">👾</div>
      </>
    )}
    {isCorrect && <div className="laser" />}
    {isCorrect && <div className="boom">💥</div>}
  </div>
  <p className="galaga-caption">
    {isCorrect
      ? '¡Código correcto! Nave despegando hacia el aprendizaje.'
      : 'Resuelve el ejercicio para activar el ataque.'}
  </p>
</section>
      </div>
    </div>
  )
}

export default Nivel1
