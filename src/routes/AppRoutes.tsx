import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
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
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}