import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { InstructionPanel } from '../../components/Nivel-5/InstructionPanel/InstructionPanel';
import { ResultsPanel } from '../../components/Nivel-5/ResultsPanel/ResultsPanel'; 
import { CodeEditor } from '../../components/Nivel-5/CodeEditor/CodeEditor';
import { GameCanvas } from '../../components/Nivel-5/GameCanvas/GameCanvas';
import { useLevel5Store } from './state/level5Store';
import './Nivel5.css';

export const Nivel5: React.FC = () => {
  const navigate = useNavigate(); 
  const { setPos, sumarPuntos, addConsoleMessage, resetLevel, setIsLevelCompleted } = useLevel5Store();

  const [timeLeft, setTimeLeft] = useState<number>(180);

  useEffect(() => {
    resetLevel();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [resetLevel]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
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

  const isRevealDisabled = timeLeft > 0;

  // CONTROLADOR DE COMPILACIÓN CON SIMULACIÓN DE ESCAPE O SOBRECARGA
  const handleExecuteCode = (studentCode: string) => {
    resetLevel();

    const tieneForJava = studentCode.includes('for') && (studentCode.includes('int i') || studentCode.includes('i <='));
    const tieneCondicionPar = studentCode.includes('% 2 == 0');
    const tieneCuadrado = studentCode.includes('* i') || studentCode.includes('cuadrado');
    const tieneAcumulador = studentCode.includes('suma +=') || studentCode.includes('suma = suma +');
    const tienePrintJava = studentCode.includes('System.out.println');
    const tieneBreak = studentCode.includes('break;');

    // Estructura básica mínima de bucle construida
    if (tieneForJava && tieneCondicionPar && tieneCuadrado && tieneAcumulador && tienePrintJava) {
      addConsoleMessage("> [JVM] Compilando ControlFlujo.java con éxito...");
      addConsoleMessage("> Iniciando bucle iterativo sobre la matriz cuántica de la app...");

      // Pasos comunes iniciales (Nodos 2, 4, 6, 8)
      setTimeout(() => { setPos(1, 1); sumarPuntos(4, 2); addConsoleMessage("> [i = 2] Nodo Par. Cuadrado: 4. Suma: 4u."); }, 1000);
      setTimeout(() => { setPos(3, 1); sumarPuntos(16, 4); addConsoleMessage("> [i = 4] Nodo Par. Cuadrado: 16. Suma: 20u."); }, 2000);
      setTimeout(() => { setPos(1, 3); sumarPuntos(36, 6); addConsoleMessage("> [i = 6] Nodo Par. Cuadrado: 36. Suma: 56u."); }, 3000);
      setTimeout(() => { setPos(3, 3); sumarPuntos(64, 8); addConsoleMessage("> [i = 8] Nodo Par. Cuadrado: 64. Suma: 120u."); }, 4000);

      if (tieneBreak) {
        // CAMINO A: El estudiante usó correctamente la instrucción break de escape
        setTimeout(() => {
          sumarPuntos(100, 10); // Agrega nodo 10 (Suma = 220)
          addConsoleMessage("> [i = 10] Nodo Par. Cuadrado: 100. Suma: 220u.");
          addConsoleMessage("> [System.out.println]: Flujo de la app finalizado. Output -> 220");
          addConsoleMessage("> [ÉXITO]: Sentencia 'break' resguardada con éxito. Nivel completado.");
          if (setIsLevelCompleted) setIsLevelCompleted(true);
        }, 5000);

      } else {
        // CAMINO B: ¡FALTA EL BREAK! El recolector se sale de control y recolecta las nuevas celdas par
        setTimeout(() => {
          sumarPuntos(100, 10); 
          addConsoleMessage("> [i = 10] Nodo Par. Cuadrado: 100. Suma: 220u.");
        }, 5000);

        setTimeout(() => {
          setPos(2, 2); // Se mueve al centro de sobrecarga
          sumarPuntos(144, 12); // Agrega nodo par 12 (12*12 = 144) -> Total = 364u (Supera los 300)
          addConsoleMessage("> [⚠️ CRÍTICO] [i = 12] Nodo Par detectado. Cuadrado: 144. Suma: 364u.");
        }, 6000);

        setTimeout(() => {
          addConsoleMessage("> 💥 [SOBRECARGA DETECTADA]: La suma superó las 300 unidades de antimateria permitidas.");
          addConsoleMessage("> ❌ ERROR OPERACIONAL: Contenedores destruídos por falta de sentencia de escape 'break;'.");
        }, 7000);
      }

    } else {
      addConsoleMessage("> ❌ JAVA COMPILATION ERROR: Estructura lógica inválida. Revisa los componentes mínimos del bucle for e impresión.");
    }
  };

  return (
    <div className="nivel5-container"> 
      <div className="neon-glow-cyan"></div>
      <div className="neon-glow-purple"></div>

      <div className="cyber-level-header">
        <div className="header-left-block">
          <button className="back-button-cyber" onClick={() => navigate('/mundo')}>
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
            <InstructionPanel isRevealDisabled={isRevealDisabled} />
          </div>
          <div className="quadrant-wrapper results-card">
            <ResultsPanel />
          </div>
        </div>

        <div className="layout-right">
          <div className="quadrant-wrapper editor-card">
            <CodeEditor onExecute={handleExecuteCode} />
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