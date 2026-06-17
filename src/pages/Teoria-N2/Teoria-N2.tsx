import React from 'react';
import { useNavigate } from 'react-router-dom';
import omniAlienImg from '../../assets/images/omni.png'; 

// IMPORTAMOS LA IMAGEN DE FONDO
import fondoEspacial from '../../assets/backgrounds/Fondo.jpeg'; 
import "./Teoria-N2.css";
export const TeoriaN2: React.FC = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/nivel2'); 
  };

  const handleVolverAlMapa = () => {
    navigate('/mundo-niveles'); 
  };

  return (
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
          <span className="location-tag">📍 MARTE_SECTOR_2</span>
        </div>

        {/* Títulos Principales */}
        <div className="header-titles-block">
          <h1 className="main-cyber-title">Nivel 2: Operaciones</h1>
          <h2 className="sub-cyber-title">Procesando Datos en Marte</h2>
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

          {/* Bloque Derecho: Subtarjeta de Teoría de Operaciones en JS */}
          <div className="inner-spec-card">
            <div className="spec-header">
              <span className="spec-token">JavaScript Operators</span>
              <span className="spec-title">Tema: 'Modificar y combinar datos'</span>
            </div>
            
            <div className="spec-body-content">
              <p className="spec-prose">
                Ya sabemos guardar información, pero para sobrevivir en Marte necesitamos procesarla. Los <strong>operadores</strong> nos permiten calcular rutas, actualizar el escudo de la nave o fusionar cadenas de texto.
              </p>
              <p className="spec-prose">
                En JavaScript podemos usar operadores matemáticos tradicionales (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>). Además, el símbolo <code>+</code> hace magia doble: si lo usas con números los suma, pero si lo usas con textos los <strong>concatena</strong> (los une en una sola frase).
              </p>
              
              {/* Contenedor de Sintaxis Oficial JavaScript */}
              <div className="syntax-example-box">
                <span className="keyword-js">let</span> <span className="variable-js">minerales</span> = <span className="number-js">50</span> + <span className="number-js">25</span>;
                <br />
                <span className="keyword-js">let</span> <span className="variable-js">combustible</span> = <span className="number-js">100</span> - <span className="number-js">15</span>;
                <br />
                <span className="keyword-js">let</span> <span className="variable-js">alerta</span> = <span className="string-js">"Peligro: "</span> + <span className="string-js">"Tormenta"</span>;
              </div>

              <p className="spec-prose small-text">
                • <strong>Matemáticas:</strong> Las variables numéricas reaccionan de inmediato calculando nuevos totales.<br />
                • <strong>Concatenación:</strong> Unir textos con <code>+</code> es vital para que la IA de la nave envíe reportes legibles al panel.
              </p>
            </div>

            {/* Botón de Acción Estilo Neón Verde */}
            <button className="btn-cyber-comenzar" onClick={handleComenzar}>
              INICIAR CÁLCULO
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TeoriaN2;