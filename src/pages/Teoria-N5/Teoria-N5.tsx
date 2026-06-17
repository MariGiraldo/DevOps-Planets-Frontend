import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS LA IMAGEN DE FONDO
import fondoEspacial from '../../assets/backgrounds/Fondo.jpeg'; 
import './Teoria-N5.css'; 

export const TeoriaN5: React.FC = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/nivel5'); 
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
          <span className="location-tag">📍 MARTE_SECTOR_5</span>
        </div>

        {/* Títulos Principales */}
        <div className="header-titles-block">
          <h1 className="main-cyber-title">Nivel 5: Control Avanzado</h1>
          <h2 className="sub-cyber-title">Consolidación y Escape (Break)</h2>
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

          {/* Bloque Derecho: Subtarjeta de Teoría de Estructuras Complejas en JS */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">Control Flow</span>
              <span className="spec-title">Tema: 'Instrucción Break'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Has dominado el almacenamiento volátil con <strong>variables</strong>, las <strong>operaciones</strong> matemáticas y los <strong>ciclos</strong> repetitivos. Ahora es momento de unificar todo y aprender a controlar situaciones críticas.
              </p>
              <p className="spec-prose">
                A veces, un ciclo está programado para dar muchas vueltas, pero una condición del sistema nos obliga a detenerlo antes de tiempo. La instrucción <code>break</code> rompe inmediatamente el bucle actual y expulsa el flujo del programa hacia afuera, sin importar si la condición original seguía siendo verdadera.
              </p>
              
              {/* Contenedor de Sintaxis Oficial JavaScript */}
              <div className="syntax-example-box">
                <span className="keyword-js">let</span> <span className="variable-js">escaneo</span> = <span className="number-js">1</span>;
                <br />
                <span className="keyword-js">while</span> (<span className="variable-js">escaneo</span> &lt;= <span className="number-js">10</span>) &#123;
                <br />
                &nbsp;&nbsp;<span className="keyword-js">if</span> (<span className="variable-js">sensor</span>.<span className="variable-js">detectarAnomalia</span>()) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword-js">break</span>; <span className="string-js">// Aborto inmediato</span>
                <br />
                &nbsp;&nbsp;&#125;
                <br />
                &nbsp;&nbsp;<span className="variable-js">escaneo</span> = <span className="variable-js">escaneo</span> + <span className="number-js">1</span>;
                <br />
                &#125;
              </div>

              <p className="spec-prose small-text">
                • <strong>Uso Estratégico:</strong> El <code>break</code> suele vivir dentro de un <code>if</code>. Si se cumple la condición de emergencia, el bucle se destruye.<br />
                • <strong>Eficiencia de Cómputo:</strong> Evita que la nave gaste recursos procesando ciclos innecesarios cuando el objetivo ya fue alcanzado o el peligro es inminente.
              </p>
            </div>

            {/* Botón de Acción Estilo Neón Verde */}
            <button className="btn-cyber-comenzar" onClick={handleComenzar}>
              COMPLETAR SIMULACIÓN
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeoriaN5;