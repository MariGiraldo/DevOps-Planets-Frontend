
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import './Nivel4.css'
import alien from '../../assets/images/alien2.png'
import cristal from '../../assets/images/cristal.png'
import fondoAnimacion from '../../assets/images/planeta.png'

const INITIAL_CODE = `boolean cristalEncontrado = true;

if(cristalEncontrado) {

}`

const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {

        boolean cristalEncontrado = true;

        if(cristalEncontrado) {

            for(int i = 1; i <= 5; i++) {
                System.out.println("Cristal recolectado " + i);
            }

        }

    }
}`
function Nivel4() {
  const navigate = useNavigate()

  const [code, setCode] = useState(INITIAL_CODE)
  const [output, setOutput] = useState('Aquí se mostrará el resultado de la ejecución.')
  const [isCorrect, setIsCorrect] = useState(false)
  const [timer, setTimer] = useState(180)
  const [revealEnabled, setRevealEnabled] = useState(false)
  const [responseUsed, setResponseUsed] = useState(false)
  const [cristalRecogido, setCristalRecogido] = useState(false)

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
    normalized.includes('booleancristalencontrado=true') &&
    normalized.includes('if(cristalencontrado)') &&
    normalized.includes('for(inti=1;i<=5;i++)')

  if (valid) {

    setOutput(
      '✅ ¡Correcto! El alien encontró el cristal espacial y comenzó a recolectarlo.'
    )

    setIsCorrect(true)

    setTimeout(() => {
      setCristalRecogido(true)
    }, 3000)

  } else {

    setOutput(
      '❌ Debes declarar la variable cristalEncontrado, usar una condición if y un ciclo for.'
    )

    setIsCorrect(false)
    setCristalRecogido(false)
  }
}
  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return

    setCode(SOLUTION_CODE)
    setResponseUsed(true)
    setRevealEnabled(false)

    setOutput('💡 Solución insertada en el editor.')
  }

  const handleFinish = () => {
    if (!isCorrect) return

    navigate('/mundo')
  }

  return (
    <div className="nivel nivel4-page">

      <div className="nivel-header">

        <div>
          <button
            className="back-button"
            onClick={() => navigate('/mundo')}
          >
            ← Volver al mapa
          </button>

          <h1>Nivel 4:  Recolección de Cristales</h1>

          <p>
              Aplica variables, condiciones y ciclos for para automatizar la recolección de recursos en el planeta.

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
         Una variable almacena información. Una condición permite tomar decisiones y un ciclo permite repetir acciones varias veces. En este ejemplo, si la nave está lista, se encienden los motores tres veces.
          </p>

          <pre>
            <code>
{`boolean naveLista = true;

if(naveLista) {

    for(int i = 1; i <= 3; i++) {
        System.out.println("Motor encendido");
    }

}
}`}
            </code>
          </pre>

          <div className="challenge-box">
            <h3>Ejercicio</h3>

            <p>
            El alien encontró un cristal espacial.

Declara una variable boolean llamada cristalEncontrado con valor true.

Si el cristal fue encontrado, utiliza un ciclo for para mostrar:

Cristal recolectado 1
Cristal recolectado 2
Cristal recolectado 3
Cristal recolectado 4
Cristal recolectado 5
            </p>
          </div>

          <div className="actions-row">

            <Button
              onClick={() =>
                setOutput(
                  '📌  Pista: Primero crea una variable boolean, luego verifica su valor con un if y finalmente usa un for para repetir la recolección.'
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
              Ejecutar
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
            className="finish-button"
          >
            Terminar nivel
          </Button>

        </section>

       <section className="panel animation-panel">

  <h2>Animación</h2>

  <div
  className="animation-placeholder"
  style={{
    backgroundImage: `url(${fondoAnimacion})`
  }}
>
  <div className="scene">

  <img
    src={alien}
    alt="Alien"
    className={isCorrect ? 'alien-walk' : 'alien-image'}
  />

{!cristalRecogido && (
  <>
    <img src={cristal} className="cristal c1" />
    <img src={cristal} className="cristal c2" />
    <img src={cristal} className="cristal c3" />
    <img src={cristal} className="cristal c4" />
    <img src={cristal} className="cristal c5" />
  </>
)}

</div>
<p className="animation-text">
  {cristalRecogido
    ? '🏆 Objetivo cumplido: 5/5 cristales recolectados.'
    : '🎯 Objetivo: ayuda al alien a recolectar los 5 cristales para completar la misión.'}
</p>
</div>

</section>
          </div>

        
     
    </div>
  )
}

export default Nivel4
