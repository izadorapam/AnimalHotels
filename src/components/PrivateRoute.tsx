import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { state } = useAuth();
  console.log("PrivateRoute — user:", state.user, "token:", state.token);

  if (!state.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}