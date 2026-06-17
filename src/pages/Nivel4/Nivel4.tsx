import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Nivel4.css';
import alien from '../../assets/images/alien2.png';
import cristal from '../../assets/images/cristal.png';
import fondoAnimacion from '../../assets/images/planeta.png';
import { api } from '../../services/api'; // Import api
import { EvaluacionResponse } from '../../models/EvaluacionResponse'; // Import EvaluacionResponse
import { useNivel } from '../../hooks/useNivel'; // Import useNivel

const INITIAL_CODE = `function multiplicar(a,b){
}`;

const SOLUTION_CODE = `boolean cristalEncontrado = true;

if(cristalEncontrado) {
    for(int i = 1; i <= 5; i++) {
        System.out.println("Cristal recolectado " + i);
    }
}`;

function Nivel4() {
  const navigate = useNavigate();

  // Integrate useNivel hook for Nivel 4
  const {
    nivel,
    token,
    loading,
    error, setError,
    revealEnabled, setRevealEnabled,
    formattedTimer
  } = useNivel(4); // Pass 4 for Nivel 4

  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('Aquí se mostrará el resultado de la ejecución.');
  const [isCorrect, setIsCorrect] = useState(false);
  const [responseUsed, setResponseUsed] = useState(false);
  const [cristalRecogido, setCristalRecogido] = useState(false);

  // Guard clauses for loading and error states
  if (loading) return <div>Cargando datos de la misión...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const handleExecute = async () => {
    setError('');
    setOutput('Evaluando tu código en el servidor...');

    try {
      if (!token) {
        setError('No se encontró la sesión. Por favor inicia sesión.');
        return;
      }

      // Call the API to evaluate the script for Nivel 4
      const respuesta: EvaluacionResponse = await api.evaluarScript(token, 4, code);
      
      setIsCorrect(respuesta.correcto);

      if (respuesta.correcto) {
        setOutput(`¡Excelente! 🎉\n${respuesta.mensaje}`);
        setTimeout(() => {
          setCristalRecogido(true);
        }, 3000);
      } else {
        setOutput(`Error en la compilación: ❌\n${respuesta.mensaje}`);
      }
    } catch (err: any) {
      console.error("Error al ejecutar el script:", err);
      setError(err.message || 'Hubo un problema de conexión con el servidor.');
      setIsCorrect(false);
    }
  };

  const handleReveal = () => {
    if (!revealEnabled || responseUsed) return;
    setCode(nivel?.codigoSolucion || '');
    setResponseUsed(true);
    setRevealEnabled(false);
    setOutput('💡 Solución insertada en el editor.');
  };

  const handleFinish = () => {
    if (!isCorrect) return;
    navigate('/mundo-niveles');
  };

  const handleHint = () => {
    if (!nivel || !nivel.pistas) {
      setOutput('📌 Pista: Primero crea una variable boolean, luego verifica su valor con un if y finalmente usa un for para repetir la recolección.'); // Fallback if API has no hint
      return;
    }

    if (Array.isArray(nivel.pistas)) {
      const todasLasPistas = nivel.pistas.join('\n📌 ');
      setOutput(`📌 ${todasLasPistas}`);
    } else {
      setOutput(`📌 ${nivel.pistas}`);
    }
  };

  return (
    <div className="nivel4-page">

      <div className="nivel-header">

        <div>
          <button
            className="back-button"
            onClick={() => navigate('/mundo-niveles')}
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

          {/* Dynamically loads theory from DB, with a fallback just in case */}
          <p>{nivel?.teoria || 'Una variable almacena información. Una condición permite tomar decisiones y un ciclo permite repetir acciones varias veces. En este ejemplo, si la nave está lista, se encienden los motores tres veces.'}</p>

          <pre>
            <code>
{`let naveLista = true;

if(naveLista) {

    for(let i = 1; i <= 3; i++) {
        console.log("Motor encendido");
    }

}
`}
            </code>
          </pre>

          <div className="challenge-box">
            <h3>Ejercicio</h3>

            <p>
            {nivel?.descripcionReto || 'El alien encontró un cristal espacial.\n\nDeclara una variable boolean llamada cristalEncontrado con valor true.\n\nSi el cristal fue encontrado, utiliza un ciclo for para mostrar:\n\nCristal recolectado 1\nCristal recolectado 2\nCristal recolectado 3\nCristal recolectado 4\nCristal recolectado 5'}
            </p>
          </div>

          <div className="actions-row">

            <Button onClick={handleHint}>
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
  );
}

export default Nivel4;