// src/routes/TutorRoutes.tsx
import { Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Tutors from "../pages/tutores/TutoresPage";
import NovoTutor from "../pages/tutores/NovoTutor";
import EditarTutor from "../pages/tutores/EditarTutor";

export const TutorRoutes = (
  <>
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
  </>
);
