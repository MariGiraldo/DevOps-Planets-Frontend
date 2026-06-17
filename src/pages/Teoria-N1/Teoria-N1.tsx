import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS TU IMAGEN DE FONDO REAL
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
              srcSet="" 
              alt="Mascota Omni Astronauta" 
              className="alien-floating-sprite" 
            />
          </div>

          {/* Bloque Derecho: Subtarjeta de Teoría Extendida de JavaScript */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">JavaScript Core</span>
              <span className="spec-title">Tema: 'Guardar información'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Para que nuestra nave pueda explorar Marte, necesita procesar y memorizar datos constantemente. Una <strong>variable</strong> es como un contenedor virtual en la memoria de la computadora donde guardamos telemetría, recursos o nombres.
              </p>
              <p className="spec-prose">
                A diferencia de otros lenguajes, <strong>JavaScript es de tipado dinámico</strong>. Esto significa que las "cajas" se adaptan automáticamente a lo que guardes dentro (texto, números, etc.) sin necesidad de declarar un tipo estricto. Usamos <code>let</code> para valores que pueden cambiar y <code>const</code> para datos fijos.
              </p>
              
              {/* Contenedor de Sintaxis Oficial JavaScript */}
              <div className="syntax-example-box">
                <span className="keyword-js">let</span> <span className="variable-js">planeta</span> = <span className="string-js">"Marte"</span>;
                <br />
                <span className="keyword-js">const</span> <span className="variable-js">oxigeno</span> = <span className="number-js">92</span>;
              </div>

              <p className="spec-prose small-text">
                • <strong>let:</strong> Permite crear variables cuyo valor puede cambiar o ser reasignado en el viaje.<br />
                • <strong>const:</strong> Crea una constante. Una vez que guardas un dato aquí, se queda congelado y no puede cambiar.
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