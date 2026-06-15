import React from 'react';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store'; 
import './ResultsPanel.css';

export const ResultsPanel: React.FC = () => {
  const { revealSolution, isLevelCompleted, consoleMessages } = useLevel5Store();

  // Código de la solución que se va a formatear e iluminar
  const javaSolutionCode = `int energiaTotal = 0;
for (int celda = 1; celda <= 10; celda++) {
    if (celda % 2 != 0) {
        energiaTotal = energiaTotal + 12;
        if (energiaTotal > 40) {
            break;
        }
    }
}
System.out.println(energiaTotal);`;

  // El mismo motor regex optimizado de tu editor para no perder rendimiento
  const highlightJavaOutput = (text: string) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const regex = /(\/\/.*?)(?=\n|$)|(?:\b(for|if|break|int)\b)|(?:\b(System\.out\.println)\b)|(?:\b(energiaTotal|celda)\b)|(?:\b(\d+)\b)|(\*|\+|\b>|==|=|%|!=|;|\{|\})/g;

    return html.replace(regex, (match, comment, keyword, func, variable, number, operator) => {
      if (comment)  return `<span class="token-comment">${match}</span>`;
      if (keyword)  return `<span class="token-keyword">${match}</span>`;
      if (func)     return `<span class="token-function">${match}</span>`;
      if (variable) return `<span class="token-variable">${match}</span>`;
      if (number)   return `<span class="token-number">${match}</span>`;
      if (operator) return `<span class="token-operator">${match}</span>`;
      return match;
    });
  };

  return (
    <div className="results-inner-layout">
      <h2 className="results-panel-title">Resultado</h2>
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="results-display-box">
        {revealSolution ? (
          <div className="revealed-solution-container animate-fade-in">
            <div className="solution-terminal-header">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="terminal-title">ALGORITMO INTEGRAL DE RESPALDO</span>
            </div>
            <div className="solution-code-block">
              <pre>
                <code dangerouslySetInnerHTML={{ __html: highlightJavaOutput(javaSolutionCode) }} />
              </pre>
            </div>
            <div className="solution-footer-meta">
              <span className="expected-badge">OUTPUT ESPERADO:</span>
              <code className="output-target-value">48</code>
            </div>
          </div>
        ) : (
          <div className="results-empty-state">
            <p className="fallback-text">
              {consoleMessages[consoleMessages.length - 1] || '> Esperando ejecución de parámetros cuánticos...'}
            </p>
          </div>
        )}
      </div>

      {/* BOTÓN TERMINAR NIVEL ESTILO PÍLDORA PREMIUM */}
      <button 
        className={`btn-finish-level ${isLevelCompleted ? 'active-glow' : 'disabled-locked'}`}
        disabled={!isLevelCompleted}
      >
        {isLevelCompleted ? '🔓 Terminar Nivel' : '🔒 Terminar Nivel'}
      </button>
    </div>
  );
};