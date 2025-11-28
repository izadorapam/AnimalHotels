import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { state } = useAuth();

  if (!state.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}