import { Routes, Route, Navigate } from 'react-router-dom';
import Bienvenida from '../pages/Bienvenida/Bienvenida';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Bienvenida />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/registro"
        element={<Registro />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}