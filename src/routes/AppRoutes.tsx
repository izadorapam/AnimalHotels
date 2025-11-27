import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tutores from "../pages/Tutores";
import Animais from "../pages/Animais";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
