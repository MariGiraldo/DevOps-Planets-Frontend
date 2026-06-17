import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Nivel1.css';
import { api } from '../../services/api';
import { Nivel } from '../../models/Nivel';
import { EvaluacionResponse } from '../../models/EvaluacionResponse';
import { useNivel } from '../../hooks/useNivel';

const INITIAL_CODE = `function declarar(){
}`;

const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {
        String planeta = "Marte";
        System.out.println("Planeta: " + planeta);
    }
}`;

function Nivel1() {
  // --- 1. State Hooks ---
const navigate = useNavigate();
  
  
const { 
   
    nivel, token,
  
    loading, 
    error, setError,
    revealEnabled, setRevealEnabled,
     formattedTimer 
  } = useNivel(1);

  // You still keep the states that are specific strictly to this editor session
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('Aquí se mostrará el resultado...');
  const [isCorrect, setIsCorrect] = useState(false);
  const [responseUsed, setResponseUsed] = useState(false);

 



  

  // --- 4. Handlers ---
  const handleExecute = async () => {
    setError('');
    setOutput('Evaluando tu código en Marte...');

    try {
      if (!token) {
        setError('No se encontró la sesión. Por favor inicia sesión.');
        return;
      }

      // API Call to Spring Boot
      const respuesta: EvaluacionResponse = await api.evaluarScript(token, 1, code);
      
      // Update state based on backend evaluation
      setIsCorrect(respuesta.correcto);

      if (respuesta.correcto) {
        setOutput(`¡Excelente! 🎉\n${respuesta.mensaje}`);
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
    setCode(nivel?.codigoSolucion|| ''); // Insert solution code into the editor
    setResponseUsed(true);
    setRevealEnabled(false);
    setOutput('💡 Solución insertada en el editor. Ajusta y ejecuta para continuar.');
  };

  const handleFinish = () => {
    if (!isCorrect) return;
    navigate('/mundo-niveles'); // Or '/mundo-niveles' depending on your routing setup
  };

  const handleHint = () => {
    if (!nivel || !nivel.pistas) {
      setOutput("No hay pistas disponibles para este nivel");
      return;
    }

    if (Array.isArray(nivel.pistas)) {
      const todasLasPistas = nivel.pistas.join('\n📌 ');
      setOutput(`📌 ${todasLasPistas}`);
    } else {
      setOutput(`📌 ${nivel.pistas}`);
    }
  };

  // --- 5. Guard Returns (Must be after all Hooks) ---
  if (loading) return <div>Loading planet data...</div>;
  if (error) return <div>{error}</div>;

  // --- 6. Main Render ---
  return (
    <div className="nivel1-page">
      <div className="nivel-header">
        <div>
          <button className="back-button" onClick={() => navigate('/mundo')}>
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
          {/* Fallback to text if API doesn't provide theory */}
          <p>{nivel?.teoria || 'Una variable es un espacio en memoria donde se guarda información para usarla luego. En Java, primero defines el tipo, después el nombre y finalmente el valor.'}</p>
          
          <div className="challenge-box">
            <h3>Ejercicio</h3>
            <p><strong>{nivel?.descripcionReto || 'Declara una variable String llamada planeta y guarda en ella el texto "Marte". Luego ejecuta el código.'}</strong></p>
          </div>
          
          <div className="actions-row">
            <Button onClick={handleHint}>Pista</Button>
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

        {/* --- Galaga Animation Panel --- */}
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
  );
}

export default Nivel1;