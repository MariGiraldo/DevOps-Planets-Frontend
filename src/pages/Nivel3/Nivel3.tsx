import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alien from '../../assets/images/alienn.png'
import diamond from '../../assets/images/diamond.png'
import energy from '../../assets/images/energy.png'
import reactor from '../../assets/images/reactor.png'



import './Nivel3.css'

import fondoNivel3 from '../../assets/backgrounds/fondo-nivel3.jpg'

const INITIAL_CODE = `int minerales = 40;
int energia = 30;

int total =

if () {

}`

const SOLUTION_CODE = `int minerales = 40;
int energia = 30;

int total = minerales + energia;

if (total >= 70) {
    System.out.println("Base construida");
}`

function Nivel3() {
  const navigate = useNavigate()

  const [code, setCode] = useState(INITIAL_CODE)
  const [output, setOutput] = useState('Aquí aparecerá el resultado...')
  const [isCorrect, setIsCorrect] = useState(false)

  const [timer, setTimer] = useState(180)
  const [revealEnabled, setRevealEnabled] = useState(false)
  const [responseUsed, setResponseUsed] = useState(false)

  const [animationStep, setAnimationStep] = useState(0)

  // 👇 ANIMACIÓN DEL “JUEGO”
  const [stage, setStage] = useState(0)
  // 0 = inicio
  // 1 = analizando
  // 2 = error
  // 3 = éxito

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setRevealEnabled(true)
          clearInterval(interval)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTimer = useMemo(() => {
    const m = Math.floor(timer / 60)
    const s = timer % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [timer])

   const handleExecute = () => {
  const normalized = code.replace(/\s+/g, '').toLowerCase()

  const valid =
    normalized.includes('inttotal=minerales+energia') &&
    normalized.includes('if(total>=70)')

  setOutput('Analizando recursos...')
  setStage(1)

  if (!valid) {
    setTimeout(() => {
      setStage(2)
      setOutput('❌ RECURSOS INSUFICIENTES')
      setIsCorrect(false)
    }, 1500)

    return
  }



  setAnimationStep(1)

  setTimeout(() => {
    setAnimationStep(2)
  }, 1500)

  setTimeout(() => {
    setAnimationStep(3)
  }, 3000)

  setTimeout(() => {
    setAnimationStep(4)
  }, 4500)

  setTimeout(() => {
    setAnimationStep(5)

    setStage(3)
    setOutput('✔ CONDICIÓN SUPERADA')
    setIsCorrect(true)
  }, 6500)
}

  const handleHint = () => {
    setOutput(
      '💡 Pista: crea una variable llamada total usando minerales + energia y verifica si total >= 70'
    )
  }

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return
    setCode(SOLUTION_CODE)
    setResponseUsed(true)
    setOutput('💡 Solución cargada en el editor')
  }

  const handleClear = () => {
    setCode(INITIAL_CODE)
    setOutput('Editor reiniciado')
    setIsCorrect(false)
    setStage(0)
     setAnimationStep(0)
  }

  return (
    <div
      className="nivel3-page"
      style={{ backgroundImage: `url(${fondoNivel3})` }}
    >
      {/* HEADER */}
      <div className="nivel-header">
        <div>
          <button
            className="back-button"
            onClick={() => navigate('/mundo')}
          >
            ← Volver al mapa
          </button>

          <h1>Nivel 3: Construcción Inteligente</h1>
          <p>Variables + Operaciones + Condicionales</p>
        </div>

        <div className="timer-card">
          <span>Tiempo</span>
          <strong>{formattedTimer}</strong>
        </div>
      </div>

      {/* MAIN */}
      <div className="nivel-grid">
        {/* TEORÍA */}
        <section className="panel theory-panel">
          <h2>Teoría</h2>

          <p>
            Las variables permiten almacenar información.
          </p>

          <p>
            Los operadores matemáticos permiten realizar cálculos utilizando valores.
          </p>

          <p>
            Las estructuras condicionales permiten tomar decisiones dependiendo de una condición.
          </p>

          <pre>
            <code>
{`int oxigeno = 20;
int agua = 30;

int recursos = oxigeno + agua;

if (recursos >= 50) {
    System.out.println("Misión lista");
}`}
          </code>
          </pre>
          

          <div className="challenge-box">
            <h3>Misión</h3>
            <p>
              El alien necesita construir una base espacial.
              Declara las variables <strong>minerales</strong> y <strong> energia</strong>,
              calcula el total y verifica si la base puede construirse
              cuando el total sea mayor o igual a 70.
            </p>
          </div>

          <div className="actions-row">
            <button className="boton-secundario" onClick={handleHint}>
              Pista
            </button>

            <button
              className="boton"
              onClick={handleReveal}
              disabled={!revealEnabled || responseUsed}
            >
              {responseUsed ? 'Respuesta usada' : 'Mostrar respuesta'}
            </button>
          </div>
        </section>

        {/* EDITOR */}
        <section className="panel editor-panel">
          <h2>Editor</h2>

          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="editor-buttons">
            <button className="boton" onClick={handleExecute}>
              Ejecutar
            </button>

            <button className="boton-secundario" onClick={handleClear}>
              Limpiar
            </button>
          </div>
        </section>
      </div>

      {/* RESULT + ANIMACIÓN */}
      <div className="resultado-grid">

        <section className="panel">
          <h2>Resultado</h2>

          <div className="result-box">
            {output}
          </div>

          <button
            className="boton"
            disabled={!isCorrect}
            onClick={() => navigate('/mundo')}
          >
            Terminar nivel
          </button>
        </section>

        {/* ANIMACIÓN REAL TIPO JUEGO */}
        <section className="panel">
          <h2>Simulación</h2>



                   
          <div className="animation-world">

          
  {animationStep < 3 && (
  <>
    <div className="path path-1" />
    <div className="path path-2" />
  </>
)}

  <img
  src={diamond}
  alt="diamante"
  className={`diamond ${
    animationStep >= 1 ? 'collect' : ''
  }`}
/>

<img
  src={energy}
  alt="energia"
  className={`energy-resource ${
    animationStep >= 2 ? 'collect' : ''
  }`}
/>

  <img
  src={alien}
  alt="alien"
  className={`
    alien-player
    step-${animationStep}
    ${animationStep >= 5 ? 'alien-hidden' : ''}
  `}
/>

  {animationStep >= 3 && (
    <div className="counter">
      40 + 30 = 70
    </div>
  )}

  {animationStep === 4 && (
  <div className="loading-box">
    Analizando recursos...
    <div className="bar" />
  </div>
)}

  {animationStep === 4 && (
  <div className="build-effect">

    <div className="particle p1" />
    <div className="particle p2" />
    <div className="particle p3" />
    <div className="particle p4" />

    <p>Construyendo base...</p>

  </div>
)}

  {animationStep >= 5 && (
    <div className="base-built">

      <img
        src={reactor}
        alt="reactor"
        className="reactor-img"
      />

     

    </div>
  )}

</div>
        </section>

      </div>
    </div>
  )
}

export default Nivel3