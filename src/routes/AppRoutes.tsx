import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Bienvenida from '../pages/Bienvenida/Bienvenida'
import Login from '../pages/Login/Login'
import Registro from '../pages/Registro/Registro'
import MundoNiveles from '../pages/MundoNiveles/MundoNiveles'
import Nivel1 from '../pages/Nivel1/Nivel1'
import Nivel2 from '../pages/Nivel2/Nivel2'
import Nivel3 from '../pages/Nivel3/Nivel3'
import Nivel4 from '../pages/Nivel4/Nivel4'
import Nivel5 from '../pages/Nivel5/Nivel5'
import Victoria from '../pages/Victoria/Victoria'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/mundo-niveles" element={<MundoNiveles />} />
        <Route path="/nivel1" element={<Nivel1 />} />
        <Route path="/nivel2" element={<Nivel2 />} />
        <Route path="/nivel3" element={<Nivel3 />} />
        <Route path="/nivel4" element={<Nivel4 />} />
        <Route path="/nivel5" element={<Nivel5 />} />
        <Route path="/victoria" element={<Victoria />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
