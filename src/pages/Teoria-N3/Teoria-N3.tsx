import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS LA IMAGEN DE FONDO
import fondoEspacial from '../../assets/backgrounds/Fondo.jpeg'; 
import './Teoria-N3.css'; 

export const TeoriaN3: React.FC = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/nivel3'); 
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
          <span className="location-tag">📍 MARTE_SECTOR_3</span>
        </div>

        {/* Títulos Principales */}
        <div className="header-titles-block">
          <h1 className="main-cyber-title">Nivel 3: Condicionales</h1>
          <h2 className="sub-cyber-title">Toma de Decisiones</h2>
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

          {/* Bloque Derecho: Subtarjeta de Teoría de Condicionales en JS */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">JavaScript Logic</span>
              <span className="spec-title">Tema: 'Estructuras IF / ELSE'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Explorar Marte requiere autonomía. Nuestra nave no puede preguntarnos qué hacer a cada segundo; debe <strong>tomar decisiones por sí sola</strong> analizando las variables de su entorno.
              </p>
              <p className="spec-prose">
                Las condicionales crean bifurcaciones en el código. Usamos <code>if</code> (si...) para ejecutar acciones solo cuando una condición es <strong>verdadera (true)</strong>, y un <code>else</code> (si no...) opcional para controlar la ruta de escape alternativa.
              </p>
              
              {/* Contenedor de Sintaxis Oficial JavaScript */}
              <div className="syntax-example-box">
                <span className="keyword-js">if</span> (<span className="variable-js">oxigeno</span> &lt; <span className="number-js">20</span>) &#123;
                <br />
                &nbsp;&nbsp;<span className="variable-js">alarma</span> = <span className="string-js">"¡Oxígeno Crítico!"</span>;
                <br />
                &#125; <span className="keyword-js">else</span> &#123;
                <br />
                &nbsp;&nbsp;<span className="variable-js">alarma</span> = <span className="string-js">"Sistemas Estables"</span>;
                <br />
                &#125;
              </div>

              <p className="spec-prose small-text">
                • <strong>Condición (parentesis):</strong> Compara datos y siempre devuelve un valor Booleano (true o false).<br />
                • <strong>Bloques &#123; &#125;:</strong> Las llaves encierran el set de instrucciones cuánticas que se ejecutarán en cada decisión.
              </p>
            </div>

            {/* Botón de Acción Estilo Neón Verde */}
            <button className="btn-cyber-comenzar" onClick={handleComenzar}>
              INICIAR MISIÓN
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeoriaN3;