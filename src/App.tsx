import { useEffect } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';

// Importamos el audio directamente en la raíz
import mapaLoopAudio from './assets/sounds/mapa-loop.mp3';

function App() {

  useEffect(() => {
    // Creamos la instancia única del audio para toda la aplicación
    const backgroundMusic = new Audio(mapaLoopAudio);
    backgroundMusic.loop = true;       // Reproducción infinita
    backgroundMusic.volume = 0.4;      // Volumen moderado al 40%

    const playAudio = () => {
      backgroundMusic.play().catch((error) => {
        console.log("El navegador bloqueó el autoplay del juego. Esperando interacción... 🎧", error);
      });
    };

    // Intentamos reproducir el audio de inmediato
    playAudio();

    // Evento de salvaguarda: si el navegador lo bloqueó, arranca con el primer clic del usuario
    const handleFirstClick = () => {
      if (backgroundMusic.paused) {
        playAudio();
      }
      document.removeEventListener('click', handleFirstClick);
    };
    document.addEventListener('click', handleFirstClick);

    // Limpieza al desmontar la app completa (opcional, por buenas prácticas)
    return () => {
      backgroundMusic.pause();
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;