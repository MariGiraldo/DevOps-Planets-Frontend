import React, { useEffect, useRef } from 'react';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store';
// 1. IMPORTA LA IMAGEN USANDO LA RUTA RELATIVA CORRECTA:
import omniAlienImg from '../../../assets/images/omni.png'; 
import './GameCanvas.css';

export const GameCanvas: React.FC = () => {
  const { colonoPos, puntosEnergia, gemasRecolectadas, consoleMessages } = useLevel5Store();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const gemasPlanteadas = [
    { id: 1, x: 1, y: 4 },
    { id: 3, x: 2, y: 3 },
    { id: 5, x: 3, y: 2 },
    { id: 7, x: 3, y: 1 },
  ];

  useEffect(() => {
    if (consoleEndRef.current) {
      // CORREGIDO: block: 'nearest' frena el autoscroll de la ventana completa del navegador
      consoleEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  }, [consoleMessages]);

  return (
    <div className="canvas-recolector-view">
      
      {/* SECCIÓN SUPERIOR: HUD DE PUNTOS DE ENERGÍA */}
      <div className="puntos-hud">
        <div className="hud-meta-data">
          <span className="hud-label">Simulación (ANTIMATERIA)</span>
          <span className="hud-limite-aviso">LÍMITE CRÍTICO: 40u</span>
        </div>
        <div className={`hud-number ${puntosEnergia > 40 ? 'overload-danger' : ''}`}>
          {puntosEnergia} <span>UNIDADES</span>
        </div>
        <div className="hud-bar-wrapper">
          <div 
            className={`hud-fill ${puntosEnergia > 40 ? 'bar-danger' : ''}`} 
            style={{ width: `${Math.min((puntosEnergia / 48) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* SECCIÓN INTERMEDIA: MAPA TÁCTICO */}
      <div className="simulation-workspace-split">
        <div className="map-grid-viewport">
          {gemasPlanteadas.map((gema) => (
            !gemasRecolectadas.includes(gema.id) && (
              <div 
                key={gema.id}
                className="gema-quantum-item"
                style={{ gridColumn: gema.x + 1, gridRow: gema.y + 1 }}
              >
                💎
              </div>
            )
          ))}

          {/* El Alien con la ruta asignada */}
          <div 
            className="robot-collector-entity alien-character-wrapper"
            style={{ gridColumn: colonoPos.x + 1, gridRow: colonoPos.y + 1 }}
          >
            {/* 2. USA EL NOMBRE DE LA IMPORTACIÓN EN EL SRC */}
            <img 
              src={omniAlienImg} 
              alt="Alien Omni" 
              className="alien-sprite-img" 
            />
            <div className="pulse-proximity-scanner"></div>
          </div>
        </div>

        {/* LOGS DE TELEMETRÍA */}
        <div className="telemetry-terminal-console">
          <div className="console-title-bar">LOGS DE SALIDA DE COMPILACIÓN</div>
          <div className="console-logs-flow">
            {consoleMessages.map((msg, idx) => (
              <div key={idx} className="console-line">{msg}</div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>

    </div>
  );
};