import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store'; 
import './InstructionPanel.css';

export const InstructionPanel: React.FC = () => {
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const { setRevealSolution } = useLevel5Store();
  
  // Tiempo inicial en segundos: 3 minutos = 180 segundos
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isRevealDisabled, setIsRevealDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRevealDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="instruction-inner-layout">
      
      {/* SECCIÓN DE TEORÍA */}
      <div className="theory-block-section">
        <h2 className="section-panel-title">
          <span className="title-icon cyan-glow">📘</span> Teoría
        </h2>
        <p className="panel-prose-text">Las variables permiten almacenar información de forma volátil.</p>
        <p className="panel-prose-text">Los operadores matemáticos y de módulo permiten realizar cálculos condicionales utilizando valores.</p>
        <p className="panel-prose-text">Las estructuras de control iterativas indexadas ejecutan bloques de código un número determinado de veces.</p>
        
        <div className="code-example-static-box">
          <pre>
{`int oxigeno = 20;
int agua = 30;
int recursos = oxigeno + agua;

if (recursos >= 50) {
    System.out.println("Misión lista");
}`}
          </pre>
        </div>
      </div>

      {/* SECCIÓN DE MISIÓN */}
      <div className="mission-block-section">
        <h2 className="section-panel-title">
          <span className="title-icon purple-glow">🎯</span> Misión
        </h2>
        <p className="panel-prose-text">
          El alien necesita configurar el recolector automatizado indexado en <strong>Java</strong>. Debes evaluar las celdas del 1 al 10 de la matriz cuántica. Extrae <strong>12 unidades</strong> de antimateria exclusivamente de las celdas impares. Si la energía acumulada supera los 40 puntos, detén el flujo inmediatamente invocando la instrucción de escape <code>break</code>.
        </p>
        
        {/* BOTONES DE ACCIÓN COMPACTOS ESTILO FOTO */}
        <div className="mission-actions-row">
          <button className="btn-cyber-action hint-style" onClick={() => setShowHintModal(true)}>
            <span className="btn-icon">💡</span> Pista
          </button>
          
          <button 
            className={`btn-cyber-action reveal-style ${isRevealDisabled ? 'is-locked' : 'is-unlocked'}`}
            disabled={isRevealDisabled}
            onClick={() => !isRevealDisabled && setRevealSolution(true)}
          >
            {isRevealDisabled ? (
              <>
                <span className="btn-icon">🔒</span> Respuesta Bloqueada
              </>
            ) : (
              <>
                <span className="btn-icon">👁️</span> Mostrar respuesta
              </>
            )}
          </button>
        </div>
      </div>

      {/* MODAL CON PORTAL PARA LA PISTA */}
      {showHintModal && createPortal(
        <div className="cyber-modal-overlay">
          <div className="cyber-modal-card animate-fade-in">
            <div className="modal-cyber-header">
              <span className="header-telemetry"><span className="pulse-dot"></span> ⚙️ SISTEMA DE ASISTENCIA</span>
              <button className="modal-close-btn" onClick={() => setShowHintModal(false)}>✕</button>
            </div>
            
            <div className="modal-body-content">
              <h3>💡 Sugerencia de Optimización Cuántica</h3>
              <p>
                Para verificar si una celda es impar en Java, puedes aplicar el operador de residuo o módulo <code>%</code> con el número 2. Si el residuo es diferente de cero (<code>celda % 2 != 0</code>), significa que has localizado un cuadrante impar.
              </p>
              <p>
                No olvides que la acumulación de la energía debe sumarse consecutivamente de 12 en 12 antes de evaluar la ruptura del ciclo crítico.
              </p>
              <div className="alert-box-modal">
                <strong>Clave de sintaxis:</strong> Asegúrate de inicializar <code>int energiaTotal = 0;</code> de forma externa al ciclo <code>for</code>.
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};