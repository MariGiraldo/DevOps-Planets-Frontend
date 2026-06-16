import React, { useEffect, useRef } from 'react';
import { useLevel5Store } from '../../../pages/Nivel5/state/level5Store';
import omniAlienImg from '../../../assets/images/omni.png'; 
import animationBgImg from '../../../assets/backgrounds/Animation.jpg'; 
import './GameCanvas.css';

export const GameCanvas: React.FC = () => {
  const { colonoPos, puntosEnergia, gemasRecolectadas, consoleMessages } = useLevel5Store();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // MAPA AMPLIADO: Agregamos nodos 10 y 12 para la simulación de falla por falta de break
  const gemasPlanteadas = [
    { id: 2, x: 1, y: 1, valor: "2² (4u)" },
    { id: 4, x: 3, y: 1, valor: "4² (16u)" },
    { id: 6, x: 1, y: 3, valor: "6² (36u)" },
    { id: 8, x: 3, y: 3, valor: "8² (64u)" },
    { id: 10, x: 0, y: 2, valor: "10² (100u)" },
    { id: 12, x: 2, y: 2, valor: "12² (144u)" },
  ];

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  }, [consoleMessages]);

  const esSobrecarga = puntosEnergia > 300;

  return (
    <div className="canvas-recolector-view">
      
      {/* HUD DE CONTROL DE FLUJO */}
      <div className={`puntos-hud ${esSobrecarga ? 'hud-critico-overload' : ''}`}>
        <div className="hud-meta-data">
          <span className="hud-label">Simulación: ACUMULADOR DE ENERGÍA DE LA APP</span>
          <span className="hud-limite-aviso">
            {esSobrecarga ? '💥 ¡SISTEMA COLAPSADO!' : 'UMBRAL MÁXIMO SECURE: 300u'}
          </span>
        </div>
        <div className={`hud-number ${esSobrecarga ? 'overload-danger' : ''}`}>
          {puntosEnergia} <span>SUMA TOTAL</span>
        </div>
        <div className="hud-bar-wrapper">
          <div 
            className={`hud-fill ${esSobrecarga ? 'bar-danger' : ''}`} 
            style={{ width: `${Math.min((puntosEnergia / 300) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* MAPA TÁCTICO */}
      <div className="simulation-workspace-split">
        <div 
          className="map-grid-viewport"
          style={{ backgroundImage: `url(${animationBgImg})` }}
        >
          {gemasPlanteadas.map((gema) => (
            !gemasRecolectadas.includes(gema.id) && (
              <div 
                key={gema.id}
                className="gema-quantum-item"
                style={{ gridColumn: gema.x + 1, gridRow: gema.y + 1 }}
                title={gema.valor}
              >
                💎
              </div>
            )
          ))}

          {/* Personaje con detector de mini explosión si no se usó break */}
          <div 
            className={`robot-collector-entity alien-character-wrapper ${esSobrecarga ? 'explosion-active' : ''}`}
            style={{ gridColumn: colonoPos.x + 1, gridRow: colonoPos.y + 1 }}
          >
            {esSobrecarga && (
              <div className="mini-explosion-particle-container">
                <span className="particle-boom">💥</span>
              </div>
            )}
            <img 
              src={omniAlienImg} 
              alt="Alien Omni" 
              className={`alien-sprite-img ${esSobrecarga ? 'alien-damaged' : ''}`} 
            />
            <div className={esSobrecarga ? "fuego-alerta" : "pulse-proximity-scanner"}></div>
          </div>
        </div>

        {/* LOGS DE TELEMETRÍA */}
        <div className="telemetry-terminal-console">
          <div className="console-title-bar">LOGS DE SALIDA DE COMPILACIÓN (JAVA)</div>
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