// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import { PrivateRoute } from "./PrivateRoute";
import { TutorRoutes } from "./TutorRoutes";
import { AnimalRoutes } from "./AnimalRoutes";

export function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* ROTAS DE TUTORES */}
      {TutorRoutes}

      {/* ROTAS DE ANIMAIS */}
      {AnimalRoutes}

      {/* QUALQUER OUTRA ROTA */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
