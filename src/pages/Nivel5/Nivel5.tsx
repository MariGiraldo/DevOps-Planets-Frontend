import React, { useState, useEffect } from 'react';
import { InstructionPanel } from '../../components/Nivel-5/InstructionPanel/InstructionPanel';
import { ResultsPanel } from '../../components/Nivel-5/ResultsPanel/ResultsPanel'; 
import { CodeEditor } from '../../components/Nivel-5/CodeEditor/CodeEditor';
import { GameCanvas } from '../../components/Nivel-5/GameCanvas/GameCanvas';
import { useLevel5Store } from './state/level5Store';
import './Nivel5.css';

export const Nivel5: React.FC = () => {
  // Extraemos las acciones y estados globales del store
  const { setPos, sumarPuntos, addConsoleMessage, resetLevel, setIsLevelCompleted } = useLevel5Store();

  // CONTROL DEL TIEMPO: Manejado localmente en la raíz del nivel (3 minutos = 180 segundos)
  const [timeLeft, setTimeLeft] = useState<number>(180);

  useEffect(() => {
    resetLevel();
    
    // Forzar al navegador a ir al tope superior sin animaciones intermedias
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [resetLevel]);

  // Efecto que controla el retroceso del reloj segundo a segundo
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formateador auxiliar para transformar los segundos a formato MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleExecuteCode = (studentCode: string) => {
    // Restablecer simulación previa antes de correr la nueva
    resetLevel();

    // VALIDADOR ESTRICTO DE TOKENS JAVA
    const tieneForJava = studentCode.includes('for') && studentCode.includes('int celda');
    const tieneCondicionImpar = studentCode.includes('celda % 2 != 0') || studentCode.includes('celda % 2 == 1');
    const tieneAcumulador = studentCode.includes('energiaTotal = energiaTotal + 12') || studentCode.includes('energiaTotal += 12');
    const tieneBreak = studentCode.includes('break;');
    const tienePrintJava = studentCode.includes('System.out.println');

    if (tieneForJava && tieneCondicionImpar && tieneAcumulador && tieneBreak && tienePrintJava) {
      
      addConsoleMessage("> [JVM] Compilando RecolectorQuantum.java con éxito...");
      addConsoleMessage("> Iniciando hilos de recolección física en Marte...");

      // Celda 1 (Impar) -> El alien se mueve y recolecta primera gema
      setTimeout(() => {
        setPos(1, 4);
        sumarPuntos(12, 1);
        addConsoleMessage("> [Celda 1]: Extracción de antimateria exitosa. +12 Unidades.");
      }, 1000);

      // Celda 3 (Impar) -> Avanza en diagonal y absorbe segunda gema
      setTimeout(() => {
        setPos(2, 3);
        sumarPuntos(12, 3);
        addConsoleMessage("> [Celda 3]: Extracción de antimateria exitosa. +12 Unidades.");
      }, 2000);

      // Celda 5 (Impar) -> Continúa el camino y suma puntos
      setTimeout(() => {
        setPos(3, 2);
        sumarPuntos(12, 5);
        addConsoleMessage("> [Celda 5]: Extracción de antimateria exitosa. +12 Unidades.");
      }, 3000);

      // Celda 7 (Impar) -> Suma 48 unidades totales. Supera los 40 -> ¡Dispara el BREAK de emergencia!
      setTimeout(() => {
        setPos(3, 1);
        sumarPuntos(12, 7);
        addConsoleMessage("> [Celda 7]: Extracción crítica de antimateria. +12 Unidades.");
        addConsoleMessage("> [ALERTA CORRIENTE]: Nivel de contenedor de energía superó las 40 unidades.");
        addConsoleMessage("> [BREAK]: Rompiendo ciclo 'for' prematuramente para mitigar explosión.");
      }, 4000);

      // Fin del hilo e impresión por consola -> Desbloquea el botón del panel inferior izquierdo
      setTimeout(() => {
        addConsoleMessage("> [System.out.println]: Impresión de diagnóstico finalizado -> 48");
        addConsoleMessage("> [ÉXITO]: Estabilizador cuántico en línea. Nivel 5 completado.");
        
        if (setIsLevelCompleted) {
          setIsLevelCompleted(true);
        }
      }, 5000);

    } else {
      addConsoleMessage("> ❌ JAVA COMPILATION ERROR: Estructura del ciclo incompleta, falta el operador de módulo '%' o la sintaxis de escape 'break;'.");
    }
  };

  return (
    <div className="nivel5-container"> 
      
      {/* Luces de neón ambientales decorativas */}
      <div className="neon-glow-cyan"></div>
      <div className="neon-glow-purple"></div>

      {/* Título Superior Interactivo Cyberpunk */}
      <div className="cyber-level-header">
        <div className="header-glitch-wrapper">
          <span className="header-tag">SYSTEM: CORE_PHASE_05</span>
          <h1 className="header-title" data-text="NIVEL 5">NIVEL 5</h1>
        </div>
        
        {/* BARRA DE ESTADO COMPLETA: Empuja el tiempo dinámicamente hacia el extremo derecho */}
        <div className="header-status-bar">
          <div className="status-left-info">
            <div className="status-indicator-pulse"></div>
            <span className="status-text">COMPILADOR DE ANTIMATERIA ACTIVO</span>
          </div>

          {/* EL TEMPORIZADOR FLOTANTE EXACTO EN LA ESQUINA SUPERIOR DERECHA */}
          {timeLeft > 0 && (
            <div className="header-top-timer">
              <span className="timer-label">RESPUESTA DISPONIBLE EN:</span>
              <span className="timer-countdown">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contenedor Grid Principal */}
      <div className="game-level-workspace nivel5-layout">
        
        {/* LADO IZQUIERDO: Panel superior (Teoría y Misión) + Panel inferior (Resultado y Salida) */}
        <div className="layout-left">
          <div className="quadrant-wrapper theory-mission-card">
            <InstructionPanel />
          </div>
          <div className="quadrant-wrapper results-card">
            <ResultsPanel />
          </div>
        </div>

        {/* LADO DERECHO: Editor de Código + Sub-Workspace (Consola + Simulación) */}
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