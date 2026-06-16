import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store'; 
import './InstructionPanel.css';

interface InstructionPanelProps {
  isRevealDisabled: boolean;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({ isRevealDisabled }) => {
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const { setRevealSolution } = useLevel5Store();

  return (
    <div className="instruction-inner-layout">
      
      {/* SECCIÓN DE TEORÍA */}
      <div className="theory-block-section">
        <h2 className="section-panel-title">
          <span className="title-icon cyan-glow">📘</span> Teoría de Flujo Avanzado
        </h2>
        <p className="panel-prose-text">Las variables permiten almacenar información de forma volátil dentro del entorno.</p>
        <p className="panel-prose-text">Los operadores matemáticos y de módulo permiten realizar cálculos condicionales utilizando valores del sistema.</p>
        <p className="panel-prose-text">Las estructuras de control iterativas ejecutan bloques de código un número determinado de veces, alterables mediante instrucciones de escape como <code>break</code>.</p>
        
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
          <span className="title-icon purple-glow">🎯</span> Misión de la App
        </h2>
        <p className="panel-prose-text">
          El sistema central necesita configurar el recolector automatizado indexado en <strong>Java</strong>. Debes evaluar los nodos del 1 al 10 de la matriz cuántica usando un bucle <code>for</code>. 
        </p>
        <p className="panel-prose-text">
          Si el nodo evaluado es <strong>par</strong>, calcula su potencia al cuadrado y acumúlala en la variable <code>suma</code>. Si la energía acumulada llega a superar el umbral crítico de <strong>300 unidades</strong>, aborta el ciclo inmediatamente invocando la instrucción <code>break</code>. Al final, imprime el resultado de la suma.
        </p>
        
        {/* BOTONES DE ACCIÓN COMPACTOS */}
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
                Para comprobar si un nodo es par en Java, utiliza el operador de residuo <code>%</code> con el número 2. Si el residuo es exactamente cero (<code>i % 2 == 0</code>), has aislado exitosamente un componente par.
              </p>
              <p>
                Eleva el valor multiplicándolo por sí mismo o calculando su cuadrado, añádelo al acumulador y evalúa el disparo de la condición de quiebre de seguridad.
              </p>
              <div className="alert-box-modal">
                <strong>Clave de sintaxis:</strong> Asegúrate de inicializar tu acumulador <code>int suma = 0;</code> de forma externa al bucle.
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};