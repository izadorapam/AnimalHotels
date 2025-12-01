import { Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";

// Páginas principais
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

// Tutors
import Tutors from "../pages/tutores/TutoresPage";
import EditarTutor from "../pages/tutores/EditarTutor";
import NovoTutor from "../pages/tutores/NovoTutor";

// Animals
import AnimalPage from "../pages/animais/AnimalPage";
import AnimalCreate from "../pages/animais/AnimalCreate";
import AnimalEdit from "../pages/animais/AnimalEdit";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();
  const token = state?.token;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}



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

      {/* TUTORs */}
      <Route
        path="/tutors"
        element={
          <PrivateRoute>
            <Tutors />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutors/novo"
        element={
          <PrivateRoute>
            <NovoTutor />
          </PrivateRoute>
        }
      />
      <Route
        path="/tutors/:id"
        element={
          <PrivateRoute>
            <EditarTutor />
          </PrivateRoute>
        }
      />

      {/* ANIMAls */}
      <Route
        path="/animals"
        element={
          <PrivateRoute>
            <AnimalPage />
          </PrivateRoute>
        }
      />

      {/* ESTA DEVE VIR ANTES */}
      <Route
        path="/animals/novo"
        element={
          <PrivateRoute>
            <AnimalCreate />
          </PrivateRoute>
        }
      />

      {/* ESTA FICA POR ÚLTIMO */}
      <Route
        path="/animals/:id"
        element={
          <PrivateRoute>
            <AnimalEdit />
          </PrivateRoute>
        }
      />


      {/* QUALQUER OUTRA ROTA REDIRECIONA */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
