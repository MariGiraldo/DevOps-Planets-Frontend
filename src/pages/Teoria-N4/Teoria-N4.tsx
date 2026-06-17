import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS LA IMAGEN DE FONDO
import fondoEspacial from '../../assets/backgrounds/Fondo.jpeg'; 
import './Teoria-N4.css'; 

export const TeoriaN4: React.FC = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/nivel4'); 
  };

  const handleVolverAlMapa = () => {
    navigate('/mundo-niveles'); 
  };

  return (
    /* Aplicamos la imagen de fondo dinámicamente */
    <div 
      className="teoria-n1-bg" 
      style={{ backgroundImage: `url(${fondoEspacial})` }}
    >
      {/* Botón de Retorno Tipo Enlace */}
      <div className="back-to-map-link" onClick={handleVolverAlMapa}>
        ← Volver al mapa
      </div>

      {/* Ventana de Cristal */}
      <div className="glass-card-container">
        
        {/* Cabecera de Telemetría */}
        <div className="card-telemetry-header">
          <span className="geo-icon">⌖</span>
          <span className="line-deco"></span>
          <span className="location-tag">📍 MARTE_SECTOR_4</span>
        </div>

        {/* Títulos Principales */}
        <div className="header-titles-block">
          <h1 className="main-cyber-title">Nivel 4: Ciclos</h1>
          <h2 className="sub-cyber-title">Automatización Repetitiva</h2>
        </div>

        {/* Layout de Contenido Distribuido */}
        <div className="theory-interactive-layout">
          
          {/* Bloque Izquierdo: Mascota Animada Flotando */}
          <div className="alien-mascot-container">
            <div className="alien-aurora-ring"></div>
            <img 
              src={omniAlienImg} 
              alt="Mascota Omni Astronauta" 
              className="alien-floating-sprite" 
            />
          </div>

          {/* Bloque Derecho: Subtarjeta de Teoría de Bucles en JS */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">JavaScript Loops</span>
              <span className="spec-title">Tema: 'El bucle WHILE'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Escribir el mismo código una y otra vez agota la energía de la computadora de la nave. Para realizar tareas repetitivas de forma eficiente, usamos <strong>ciclos o bucles</strong>.
              </p>
              <p className="spec-prose">
                El bucle <code>while</code> (mientras...) ejecuta un bloque de instrucciones de manera repetida <strong>mientras una condición específica sea verdadera (true)</strong>. Es vital modificar la variable de control dentro del ciclo para evitar un bucle infinito que congele el sistema de navegación.
              </p>
              
              {/* Contenedor de Sintaxis Oficial JavaScript */}
              <div className="syntax-example-box">
                <span className="keyword-js">let</span> <span className="variable-js">vueltas</span> = <span className="number-js">0</span>;
                <br />
                <span className="keyword-js">while</span> (<span className="variable-js">vueltas</span> &lt; <span className="number-js">3</span>) &#123;
                <br />
                &nbsp;&nbsp;<span className="variable-js">nave</span>.<span className="variable-js">escanearSuelo</span>();
                <br />
                &nbsp;&nbsp;<span className="variable-js">vueltas</span> = <span className="variable-js">vueltas</span> + <span className="number-js">1</span>;
                <br />
                &#125;
              </div>

              <p className="spec-prose small-text">
                • <strong>Evaluación Continua:</strong> Antes de cada repetición, el sistema verifica la condición entre paréntesis.<br />
                • <strong>Contador (`vueltas`):</strong> Incrementa en cada iteración para asegurar que el ciclo se detenga tras cumplir su objetivo espacial.
              </p>
            </div>

            {/* Botón de Acción Estilo Neón Verde */}
            <button className="btn-cyber-comenzar" onClick={handleComenzar}>
              INICIAR SECUENCIA
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeoriaN4;