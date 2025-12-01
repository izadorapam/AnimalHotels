// src/routes/AnimalRoutes.tsx
import { Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import AnimalPage from "../pages/animais/AnimalPage";
import AnimalCreate from "../pages/animais/AnimalCreate";
import AnimalEdit from "../pages/animais/AnimalEdit";

export const AnimalRoutes = (
  <>
    <Route
      path="/animals"
      element={
        <PrivateRoute>
          <AnimalPage />
        </PrivateRoute>
      }
    />

    <Route
      path="/animals/novo"
      element={
        <PrivateRoute>
          <AnimalCreate />
        </PrivateRoute>
      }
    />

    <Route
      path="/animals/:id"
      element={
        <PrivateRoute>
          <AnimalEdit />
        </PrivateRoute>
      }
    />
  </>
);
