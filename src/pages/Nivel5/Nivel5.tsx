import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { InstructionPanel } from '../../components/Nivel-5/InstructionPanel/InstructionPanel';
import { ResultsPanel } from '../../components/Nivel-5/ResultsPanel/ResultsPanel'; 
import { CodeEditor } from '../../components/Nivel-5/CodeEditor/CodeEditor';
import { GameCanvas } from '../../components/Nivel-5/GameCanvas/GameCanvas';
import { useLevel5Store } from './state/level5Store';
import { api } from '../../services/api';
import { Nivel } from '../../models/Nivel';
import { EvaluacionResponse } from '../../models/EvaluacionResponse';
import './Nivel5.css';

// El evaluador concatena este código con "evaluarFlujo()" y ejecuta todo como un solo script.
// Por eso TODO debe vivir dentro de la función, incluyendo el console.log final.
const INITIAL_JAVASCRIPT_CODE = `function evaluarFlujo() {
  let suma = 0;

  // Escribe tu bucle for y las condiciones en JavaScript aquí abajo:
  for (let i = 1; i <= 10; i++) {

  }

  console.log(suma);
}`;

export const Nivel5: React.FC = () => {
  const navigate = useNavigate(); 

  const { setPos, sumarPuntos, addConsoleMessage, resetLevel, setIsLevelCompleted } = useLevel5Store();

  const [nivelData, setNivelData] = useState<Nivel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [backendError, setBackendError] = useState<string>('');

  const [code, setCode] = useState<string>(INITIAL_JAVASCRIPT_CODE);
  const [outputConsole, setOutputConsole] = useState<string>('Esperando inicialización de parámetros cuánticos...');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(2);
  const [revealEnabled, setRevealEnabled] = useState<boolean>(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNivelCore = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error('Sesión inválida o expirada.');

        const data = await api.getNivel(token, 5);
        setNivelData(data);
      } catch (e: any) {
        console.error('Fallo al recuperar metadatos del nivel 5:', e);
        setBackendError('Error al sincronizar datos del servidor.');
      } finally {
        setLoading(false);
      }
    };

    resetLevel();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    fetchNivelCore();
  }, [token, resetLevel]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setRevealEnabled(true);
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTimer = useMemo(() => {
    if (timeLeft <= 0) return "DESBLOQUEADA";
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const handleExecuteCode = async (studentCode: string) => {
    setBackendError('');
    setIsLevelCompleted(false);
    setIsCorrect(false);
    resetLevel();
    addConsoleMessage("> [GraalVM JS] Evaluando flujo secuencial en el servidor...");
    setOutputConsole('Sincronizando flujos de control con la base central de Marte...');

    try {
      if (!token) {
        setBackendError('Error de autenticación. Inicia sesión nuevamente.');
        return;
      }

      const respuesta: EvaluacionResponse = await api.evaluarScript(token, 5, studentCode);

      setIsCorrect(respuesta.correcto);
      setIsLevelCompleted(respuesta.correcto);

      if (respuesta.correcto) {
        setOutputConsole(`¡ÉXITO OPERACIONAL! 🎉\n${respuesta.mensaje}`);
        addConsoleMessage("> [OK] Ejecución exitosa en JavaScript.");
        addConsoleMessage("> [PROGRESO]: Sentencia 'break' detectada en el umbral crítico.");

        setTimeout(() => { setPos(1, 1); sumarPuntos(4, 2); }, 800);
        setTimeout(() => { setPos(3, 1); sumarPuntos(16, 4); }, 1600);
        setTimeout(() => { setPos(1, 3); sumarPuntos(36, 6); }, 2400);
        setTimeout(() => { setPos(3, 3); sumarPuntos(64, 8); }, 3200);

      } else {
        setOutputConsole(`Error en la evaluación del script: ❌\n${respuesta.mensaje}`);
        addConsoleMessage("> ❌ ERROR: Flujo interrumpido catastróficamente o faltan directivas de escape.");

        if (studentCode.includes('for')) {
          setTimeout(() => { setPos(2, 2); }, 1000);
          addConsoleMessage("> 💥 [CRÍTICO]: Suma superior a 300 unidades. Sistemas colapsados.");
        }
      }
    } catch (err: any) {
      console.error("Error de red o compilación remota:", err);
      setBackendError(err.message || 'Problema de enlace de datos con Spring Boot.');
      setOutputConsole('Error de pasarela: No se pudo obtener respuesta del motor de evaluación.');
      setIsCorrect(false);
    }
  };

  const handleRevealSolutionInEditor = () => {
    if (!revealEnabled) return;
    const jsSolution = `function evaluarFlujo() {\n  let suma = 0;\n  for (let i = 1; i <= 10; i++) {\n    if (i % 2 === 0) {\n      let cuadrado = i * i;\n      suma += cuadrado;\n      if (suma > 300) {\n        break;\n      }\n    }\n  }\n  console.log(suma);\n}`;
    setCode(jsSolution);
    setOutputConsole('💡 Solución oficial en JavaScript inyectada en el búfer. Ejecuta el código para completar el nivel.');
  };

  if (loading) return <div className="loading-viewport">Cargando telemetría cuántica de Marte...</div>;
  if (backendError) return <div className="error-viewport">⚠️ {backendError}</div>;

  return (
    <div className="nivel5-container"> 
      <div className="neon-glow-cyan"></div>
      <div className="neon-glow-purple"></div>

      <div className="cyber-level-header">
        <div className="header-left-block">
          <button className="back-button-cyber" onClick={() => navigate('/mundo-niveles')}>
            ← Volver al mapa
          </button>
          <div className="header-glitch-wrapper">
            <h1 className="header-title" data-text="NIVEL 5">NIVEL 5</h1>
          </div>
        </div>

        <div className="header-top-timer">
          <span className="timer-label">RESPUESTA DISPONIBLE EN:</span>
          <span className={`timer-countdown ${timeLeft <= 0 ? 'timer-unlocked-glow' : ''}`}>
            {formattedTimer}
          </span>
        </div>
      </div>

      <div className="game-level-workspace nivel5-layout">
        <div className="layout-left">
          <div className="quadrant-wrapper theory-mission-card">
            <InstructionPanel 
              isRevealDisabled={!revealEnabled} 
              onReveal={handleRevealSolutionInEditor}
              teoria={nivelData?.teoria}
              descripcion={nivelData?.descripcionReto}
            />
          </div>
          <div className="quadrant-wrapper results-card">
            <ResultsPanel output={outputConsole} isCorrect={isCorrect} />
          </div>
        </div>

        <div className="layout-right">
          <div className="quadrant-wrapper editor-card">
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              onExecute={handleExecuteCode} 
              initialCode={nivelData?.codigoSolucion || ''}
            />
          </div>
          <div className="quadrant-wrapper canvas-card">
            <GameCanvas /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nivel5;