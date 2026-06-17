import React, { useRef } from 'react';
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onExecute: (code: string) => void;
  initialCode: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onExecute, initialCode }) => {
  const highlightLayerRef = useRef<HTMLPreElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightLayerRef.current) {
      highlightLayerRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightLayerRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleClear = () => {
    setCode(initialCode);
  };

  // HIGHLIGHTER OPTIMIZADO PARA JAVASCRIPT (V8)
  const highlightJavaScript = (text: string) => {
    if (!text) return ' ';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tokens actualizados: let, const, for, if, break, console, log
    const regex = /(\/\/.*?)(?=\n|$)|(?:\b(for|if|break|let|const|function)\b)|(?:\b(console\.log)\b)|(?:\b(suma|cuadrado|i|n)\b)|(?:\b(\d+)\b)|(\*|\+|\b>|===|==|=TemplateElement|%|!=|;|\{|\})/g;

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
      <div className="editor-header">
        <h2 className="editor-panel-title">
          <span className="title-icon cyan-glow">💻</span> Editor de JavaScript
        </h2>
        <span className="file-name">ControlFlujo.js</span>
      </div>

      <div className="editor-workspace-wrapper">
        <pre className="editor-highlight-layer" ref={highlightLayerRef} aria-hidden="true">
          <code dangerouslySetInnerHTML={{ __html: highlightJavaScript(code) }} />
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
          ▶ Ejecutar en Node.js
        </button>
        <button className="btn-clear" onClick={handleClear}>
          Limpiar
        </button>
      </div>
    </div>
  );
};