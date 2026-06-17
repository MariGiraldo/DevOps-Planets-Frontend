import React from 'react';
import './ResultsPanel.css';

interface ResultsPanelProps {
  output: string;
  isCorrect: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ output, isCorrect }) => {
  return (
    <div className="results-inner-layout">
      <h2 className="results-panel-title">Resultado de Consola</h2>
      
      <div className="results-display-box">
        <div className="results-empty-state">
          {/* El contenedor cambia de color de borde según el estado devuelto por Spring Boot */}
          <pre className={`fallback-text ${isCorrect ? 'output-success-text' : 'output-normal-text'}`}>
            {output}
          </pre>
        </div>
      </div>

      {/* Botón final vinculado al estado de éxito real enviado por la API */}
      <button 
        className={`btn-finish-level ${isCorrect ? 'active-glow' : 'disabled-locked'}`}
        disabled={!isCorrect}
      >
        {isCorrect ? '🔓 Terminar Nivel' : '🔒 Terminar Nivel'}
      </button>
    </div>
  );
};