import React, { useState, useRef } from 'react';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store'; 
import './CodeEditor.css';

interface CodeEditorProps {
  onExecute: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ onExecute }) => {
  const { resetLevel } = useLevel5Store();

  // RETO EN JAVA: Inicialización de variables sincronizada con el validador principal
  const [code, setCode] = useState<string>(
`int suma = 0;

// Escribe tu bucle for y las condiciones en Java aquí abajo:
`
  );

  const highlightLayerRef = useRef<HTMLPreElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightLayerRef.current) {
      highlightLayerRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightLayerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Acción para restablecer el editor al estado base unificado del nivel 5
  const handleClear = () => {
    resetLevel();
    setCode(`int suma = 0;\n\n// Escribe tu bucle for y las condiciones en Java aquí abajo:\n`);
  };

  // MOTOR REGEX DE UNA SOLA PASADA ACTUALIZADO PARA LAS VARIABLES DEL ALGORITMO
  const highlightJava = (text: string) => {
    if (!text) return ' ';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Se agregaron 'suma', 'cuadrado', 'i' y 'n' para un resaltado de sintaxis preciso
    const regex = /(\/\/.*?)(?=\n|$)|(?:\b(for|if|break|int)\b)|(?:\b(System\.out\.println)\b)|(?:\b(suma|cuadrado|i|n)\b)|(?:\b(\d+)\b)|(\*|\+|\b>|==|=|%|!=|;|\{|\})/g;

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
    <div className="code-editor-container">
      {/* CABECERA CORREGIDA */}
      <div className="editor-header">
        <h2 className="editor-panel-title">
          <span className="title-icon cyan-glow">💻</span> Editor
        </h2>
        <span className="file-name">ControlFlujo.java</span>
      </div>

      <div className="editor-workspace-wrapper">
        <pre className="editor-highlight-layer" ref={highlightLayerRef} aria-hidden="true">
          <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
        </pre>
        <textarea
          className="editor-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      <div className="editor-actions">
        <button className="btn-execute" onClick={() => onExecute(code)}>
          ▶ Ejecutar Compilador Java
        </button>
        <button className="btn-clear" onClick={handleClear}>
          Limpiar
        </button>
      </div>
    </div>
  );
};