import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS TU IMAGEN DE FONDO REAL (Cambia 'simulation-bg.jpg' por la que prefieras)
import fondoEspacial from '../../assets/backgrounds/Fondo.jpeg'; 
import './Teoria-N1.css';

export const TeoriaN1: React.FC = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/nivel1'); 
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
          <span className="location-tag">📍 MARTE_SECTOR_1</span>
        </div>

        {/* Títulos Principales */}
        <div className="header-titles-block">
          <h1 className="main-cyber-title">Nivel 1: Variables</h1>
          <h2 className="sub-cyber-title">Guardar Información</h2>
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

          {/* Bloque Derecho: Subtarjeta de Teoría Extendida de Java */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">Java Core</span>
              <span className="spec-title">Tema: 'Guardar información'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Para que nuestra nave pueda explorar Marte, necesita procesar y memorizar datos constantemente. Una <strong>variable</strong> es un espacio contenedor reservado en la memoria RAM del sistema operativo. 
              </p>
              <p className="spec-prose">
                A diferencia de otros lenguajes, <strong>Java es de tipado fuerte</strong>. Esto significa que cada caja cuántica que crees debe declarar estrictamente qué tipo de datos va a resguardar en su interior antes de poder asignarle un valor. No puedes mezclar textos con números enteros.
              </p>
              
              {/* Contenedor de Sintaxis Oficial Java */}
              <div className="syntax-example-box">
                <span className="keyword-java">String</span> <span className="variable-java">planeta</span> = <span className="string-java">"Marte"</span>;
                <br />
                <span className="keyword-java">int</span> <span className="variable-java">oxigeno</span> = <span className="number-java">92</span>;
              </div>

              <p className="spec-prose small-text">
                • <strong>String:</strong> Cadena de caracteres para textos (siempre va entre comillas dobles).<br />
                • <strong>int:</strong> Tipo primitivo matemático para almacenar números enteros (sin decimales).
              </p>
            </div>

            {/* Botón de Acción Estilo Neón Verde */}
            <button className="btn-cyber-comenzar" onClick={handleComenzar}>
              COMENZAR
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeoriaN1;