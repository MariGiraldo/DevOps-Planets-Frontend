import React, { useEffect, useState, useRef } from "react";
import "./MundoNiveles.css";
import ProgressService, { Nivel } from "../../services/ProgressService";
import fondoMapa from "../../assets/images/fondo7.png"; 
import omniImg from "../../assets/images/alien6.png";
import naveImg from "../../assets/images/nave9.png";
import musicaMapa from "../../assets/sounds/mapa-loop.mp3";

const MundoNiveles: React.FC = () => {
  const service = ProgressService.getInstance();
  const [niveles, setNiveles] = useState<Nivel[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Función para iniciar el audio
  const startAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Error al reproducir:", e));
    }
  };

  useEffect(() => {
    setNiveles([...service.getNiveles()]);

    // Crear el objeto audio al montar
    audioRef.current = new Audio(musicaMapa);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Intentar reproducir automáticamente (muchos navegadores lo bloquearán)
    audioRef.current.play().catch(() => console.log("Bloqueo de autoplay detectado"));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleNivelClick = (nivel: Nivel) => {
    // Activamos el audio al hacer clic en un nivel
    startAudio();

    if (nivel.estado === "BLOQUEADO") return;
    service.completarNivel(nivel.id);
    setNiveles([...service.getNiveles()]);
  };

  const getClass = (estado: string) => {
    if (estado === "COMPLETADO") return "nivel completado";
    if (estado === "DESBLOQUEADO") return "nivel desbloqueado";
    return "nivel bloqueado";
  };

  const ultimoProgreso = niveles.filter(n => n.estado === "COMPLETADO").length;
  const nivelActivo = ultimoProgreso < 5 ? (ultimoProgreso === 0 ? 1 : ultimoProgreso + 1) : 5;

  return (
    // Añadimos un evento onClick al contenedor para activar el audio al primer clic
    <div className="mundo-container" style={{ backgroundImage: `url(${fondoMapa})` }} onClick={startAudio}>

      <div className="header">
        <h1>🪐 Mapa del Planeta (Marte)</h1>
        <div className="progress">
          Usuario: AstroDev | Progreso: {ultimoProgreso}/5
        </div>
      </div>

      <img src={omniImg} alt="OVNI" className={`ovni ovni-pos-${nivelActivo}`} />
      <img src={naveImg} alt="Nave Espacial" className="nave-espacial" />

      <div className="mapa">
        {niveles.map((nivel) => (
          <div
            key={nivel.id}
            data-id={nivel.id} 
            className={getClass(nivel.estado)}
            onClick={() => handleNivelClick(nivel)}
          >
            <div className="flag">🏁</div>
            <span>Nivel {nivel.id}</span>
            {nivel.estado === "BLOQUEADO" && <div className="lock">🔒</div>}
            {nivel.estado === "COMPLETADO" && <div className="check">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MundoNiveles;