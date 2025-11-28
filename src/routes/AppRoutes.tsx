// ...existing code...
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tutores from "../pages/Tutores";
import Animais from "../pages/Animais";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const user = state?.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutores"
        element={
          <PrivateRoute>
            <Tutores />
          </PrivateRoute>
        }
      />
      <Route
        path="/animais"
        element={
          <PrivateRoute>
            <Animais />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
