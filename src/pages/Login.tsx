import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { state, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate("/tutores");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          disabled={state.isLoading}
        />
        <input 
          type="password"
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          placeholder="Senha"
          disabled={state.isLoading}
        />
        <button type="submit" disabled={state.isLoading}>
          {state.isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}