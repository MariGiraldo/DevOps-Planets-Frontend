import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './InstructionPanel.css';

interface InstructionPanelProps {
  isRevealDisabled: boolean;
  onReveal: () => void;
  teoria?: string;
  descripcion?: string;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({ 
  isRevealDisabled, 
  onReveal, 
  teoria, 
  descripcion 
}) => {
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  return (
    <div className="instruction-inner-layout">
      
      {/* SECCIÓN DE TEORÍA DINÁMICA */}
      <div className="theory-block-section">
        <h2 className="section-panel-title">
          <span className="title-icon cyan-glow">📘</span> Teoría del Nivel
        </h2>
        <p className="panel-prose-text">
          {teoria || "Las variables y estructuras iterativas en JavaScript (motores V8) te permiten manipular flujos cuánticos de datos en tiempo real mediante sentencias de salto controlado."}
        </p>
        
        <div className="code-example-static-box">
          <pre>
{`let oxigeno = 20;
let recursos = oxigeno + 30;

if (recursos >= 50) {
    console.log("Misión lista");
}`}
          </pre>
        </div>
      </div>

      {/* SECCIÓN DE MISIÓN */}
      <div className="mission-block-section">
        <h2 className="section-panel-title">
          <span className="title-icon purple-glow">🎯</span> Misión del Sistema
        </h2>
        <p className="panel-prose-text">
          {descripcion || "Evalúa los nodos del 1 al 10 de la matriz cuántica usando un bucle 'for' en JavaScript. Si el residuo es par, acumula su potencia al cuadrado. Detén el bucle con un 'break' si pasas de las 300 unidades."}
        </p>
        
        <div className="mission-actions-row">
          <button className="btn-cyber-action hint-style" onClick={() => setShowHintModal(true)}>
            <span className="btn-icon">💡</span> Pista
          </button>
          
          <button 
            className={`btn-cyber-action reveal-style ${isRevealDisabled ? 'is-locked' : 'is-unlocked'}`}
            disabled={isRevealDisabled}
            onClick={onReveal}
          >
            {isRevealDisabled ? '🔒 Respuesta Bloqueada' : '👁️ Mostrar respuesta'}
          </button>
        </div>
      </div>

      {/* MODAL DE ASISTENCIA TÉCNICA */}
      {showHintModal && createPortal(
        <div className="cyber-modal-overlay">
          <div className="cyber-modal-card animate-fade-in">
            <div className="modal-cyber-header">
              <span className="header-telemetry"><span className="pulse-dot"></span> ⚙️ SISTEMA DE ASISTENCIA</span>
              <button className="modal-close-btn" onClick={() => setShowHintModal(false)}>✕</button>
            </div>
            
            <div className="modal-body-content">
              <h3>💡 Sugerencia del Intérprete</h3>
              <p>
                Para verificar residuos pares en JavaScript, utiliza la igualdad estricta <code>i % 2 === 0</code>. Asegúrate de añadir el quiebre de seguridad estructural antes de que los contenedores se sobrecarguen.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};