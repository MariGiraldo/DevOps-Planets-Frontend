import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imágenes
import alien from '../../assets/images/alienn.png';
import diamond from '../../assets/images/diamond.png';
import energy from '../../assets/images/energy.png';
import reactor from '../../assets/images/reactor.png';
import fondoNivel3 from '../../assets/backgrounds/fondo-nivel3.jpg';

// Estilos
import './Nivel3.css';

// Hooks y Servicios (La funcionalidad de Nivel 1 y 2)
import { api } from '../../services/api';
import { EvaluacionResponse } from '../../models/EvaluacionResponse';
import { useNivel } from '../../hooks/useNivel';

const INITIAL_CODE = `function bucles(n){

}`;

const SOLUTION_CODE = `int minerales = 40;
int energia = 30;

int total = minerales + energia;

if (total >= 70) {
    System.out.println("Base construida");
}`;

function Nivel3() {
  const navigate = useNavigate();

  // 1. Integración del Hook del Nivel
 const { 
     
      nivel, token,
    
      loading, 
      error, setError,
      revealEnabled, setRevealEnabled,
       formattedTimer 
    } = useNivel(3);

  // 2. Estados del Editor y Animación
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('Aquí aparecerá el resultado...');
  const [isCorrect, setIsCorrect] = useState(false);
  const [responseUsed, setResponseUsed] = useState(false);

  const [animationStep, setAnimationStep] = useState(0);
  const [stage, setStage] = useState(0); 
  // 0 = inicio, 1 = analizando, 2 = error, 3 = éxito

  // 3. Lógica de Ejecución con la API Backend
  const handleExecute = async () => {
    if (setError) setError('');
    setOutput('Analizando recursos...');
    setStage(1);

    try {
      if (!token) {
        if (setError) setError('No se encontró la sesión. Por favor inicia sesión.');
        return;
      }

      // Llamada a tu backend
      const data: EvaluacionResponse = await api.evaluarScript(token, 3, code);

      if (!data.correcto) {
        // Mostrar error si el backend dice que el código es incorrecto
        setTimeout(() => {
          setStage(2);
          setOutput(data.mensaje || '❌ RECURSOS INSUFICIENTES');
          setIsCorrect(false);
        }, 1500);
        return;
      }

      // 4. Lógica de Animación Reparada (¡Si el código es correcto!)
      setOutput('✅ ¡Código correcto! Iniciando recolección...');
      setAnimationStep(1);

      setTimeout(() => {
        setAnimationStep(2);
      }, 1500);

      setTimeout(() => {
        setAnimationStep(3);
      }, 3000);

      setTimeout(() => {
        setAnimationStep(4);
      }, 4500);

      setTimeout(() => {
        setAnimationStep(5);
        setStage(3);
        setOutput(`✔ CONDICIÓN SUPERADA\n${data.mensaje || ''}`);
        setIsCorrect(true);
      }, 6500);

    } catch (err: any) {
      console.error("Error al ejecutar el script:", err);
      if (setError) setError(err.message || 'Hubo un problema de conexión con el servidor.');
      setStage(2);
      setIsCorrect(false);
    }
  };

  // 5. Controles Secundarios
  const handleHint = () => {
    // Usa pistas de la base de datos si existen, si no usa el default
    if (nivel && nivel.pistas) {
      const pistasStr = Array.isArray(nivel.pistas) ? nivel.pistas.join('\n💡 ') : nivel.pistas;
      setOutput(`💡 ${pistasStr}`);
    } else {
      setOutput('💡 Pista: crea una variable llamada total usando minerales + energia y verifica si total >= 70');
    }
  };

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return;
    setCode(nivel?.codigoSolucion|| '');
    setResponseUsed(true);
    if (setRevealEnabled) setRevealEnabled(false);
    setOutput('💡 Solución cargada en el editor');
  };

  const handleClear = () => {
    setCode(INITIAL_CODE);
    setOutput('Editor reiniciado');
    setIsCorrect(false);
    setStage(0);
    setAnimationStep(0);
  };

  // 6. Pantallas de Carga/Error
  if (loading) return <div>Cargando datos de la misión...</div>;
  if (error && !output.includes('Analizando')) return <div className="error-message">{error}</div>;

  return (
    <div className="nivel3-page" style={{ backgroundImage: `url(${fondoNivel3})` }}>
      {/* HEADER */}
      <div className="nivel-header">
        <div>
          <button className="back-button" onClick={() => navigate('/mundo-niveles')}>
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

          {/* Renderiza la teoría de la BD si existe */}
          {nivel?.teoria ? (
            <p>{nivel.teoria}</p>
          ) : (
            <>
              <p>Las variables permiten almacenar información.</p>
              <p>Los operadores matemáticos permiten realizar cálculos utilizando valores.</p>
              <p>Las estructuras condicionales permiten tomar decisiones dependiendo de una condición.</p>
            </>
          )}

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
              {nivel?.descripcionReto || 'El alien necesita construir una base espacial. Declara las variables minerales y energia, calcula el total y verifica si la base puede construirse cuando el total sea mayor o igual a 70.'}
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
            spellCheck={false}
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
            onClick={() => navigate('/mundo-niveles')}
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
              className={`diamond ${animationStep >= 1 ? 'collect' : ''}`}
            />

            <img
              src={energy}
              alt="energia"
              className={`energy-resource ${animationStep >= 2 ? 'collect' : ''}`}
            />

            <img
              src={alien}
              alt="alien"
              className={`alien-player step-${animationStep} ${animationStep >= 5 ? 'alien-hidden' : ''}`}
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
  );
}

export default Nivel3;