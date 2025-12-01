import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./components/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
