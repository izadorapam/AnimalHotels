import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css"; // opcional se quiser estilização separada

export function Navbar() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (!state.user) {
    // usuário não logado → não mostra navbar
    return null;
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/tutores" className={({ isActive }) => isActive ? "active" : ""}>
            Tutores
          </NavLink>
        </li>

        <li>
          <NavLink to="/animais" className={({ isActive }) => isActive ? "active" : ""}>
            Animais
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}
