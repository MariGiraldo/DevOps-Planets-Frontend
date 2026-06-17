import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Nivel2.css';
import { api } from '../../services/api';
import { EvaluacionResponse } from '../../models/EvaluacionResponse';
import { useNivel } from '../../hooks/useNivel'; // <-- Your custom hook!

const INITIAL_CODE = `function MayoroMenor(){

}`;

const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {
        int numero = 8;
        if (numero % 2 == 0) {
            System.out.println("Es par");
        } else {
            System.out.println("Es impar");
        }
    }
}`;

function Nivel2() {
  const navigate = useNavigate();

  // 1. Call the hook and pass '2' for Nivel 2!
  const { 
     
      nivel, token,
    
      loading, 
      error, setError,
      revealEnabled, setRevealEnabled,
       formattedTimer 
    } = useNivel(2);

  // 2. Keep only the states specific to the editor
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('Aquí se mostrará el resultado de la ejecución.');
  const [isCorrect, setIsCorrect] = useState(false);
  const [responseUsed, setResponseUsed] = useState(false);

  // 3. Update execution to use the real API instead of regex
  const handleExecute = async () => {
    setError('');
    setOutput('Evaluando tu código en el servidor...');

    try {
      if (!token) {
        setError('No se encontró la sesión. Por favor inicia sesión.');
        return;
      }

      // Sends the code to Level 2 in your Spring Boot backend!
      const respuesta: EvaluacionResponse = await api.evaluarScript(token, 2, code);
      
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
    setCode(nivel?.codigoSolucion||'');
    setResponseUsed(true);
    setRevealEnabled(false);
    setOutput('💡 Solución insertada. Ejecuta nuevamente.');
  };

  const handleFinish = () => {
    if (!isCorrect) return;
    navigate('/mundo-niveles');
  };

  // 4. Dynamic Hints from the database
  const handleHint = () => {
    if (!nivel || !nivel.pistas) {
      setOutput('📌 Pista: usa numero % 2 == 0'); // Fallback if API has no hint
      return;
    }

    if (Array.isArray(nivel.pistas)) {
      const todasLasPistas = nivel.pistas.join('\n📌 ');
      setOutput(`📌 ${todasLasPistas}`);
    } else {
      setOutput(`📌 ${nivel.pistas}`);
    }
  };

  // 5. Guard Clauses
  if (loading) return <div>Cargando datos de la misión...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="nivel2-page">
      <div className="nivel-header">
        <div>
          <button className="back-button" onClick={() => navigate('/mundo')}>
            ← Volver al mapa
          </button>
          <h1>Nivel 2: Condicionales Básicas</h1>
          <p>Determina si un número es par o impar usando el operador módulo.</p>
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
          
          {/* Dynamically loads theory from DB, with a fallback just in case */}
          <p>{nivel?.teoria || 'El operador % (módulo) permite obtener el residuo de una división.'}</p>
          <p></p>

          <div className="challenge-box">
            <h3>💡 Misión</h3>
            <p><strong>{nivel?.descripcionReto || 'Debes verificar si el número es par usando una condición if.'}</strong></p>
            <p> <strong></strong></p>
          </div>

          <div className="actions-row">
            <Button onClick={handleHint}>Pista</Button>
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
            <Button onClick={handleExecute}>Ejecutar Java</Button>
            <Button variant="secondary" onClick={() => setCode(INITIAL_CODE)}>
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
          <Button onClick={handleFinish} disabled={!isCorrect}>
            Terminar nivel
          </Button>
        </section>

        {/* ANIMACIÓN */}
        <section className="panel animation-panel">
          <h2>Animación</h2>
          <div className="space-animation">
            {/* The rocket-fly class will trigger when the backend says isCorrect! */}
            <div className={`rocket ${isCorrect ? 'rocket-fly' : ''}`}>
              🚀
            </div>
            <div className="mars">🪐</div>
          </div>
          <p>Si es correcto, el cohete despega.</p>
        </section>
      </div>
    </div>
  );
}

export default Nivel2;