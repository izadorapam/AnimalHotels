import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  from?: string;
}

export default function Login() {
  const { state, login } = useAuth();
  const navigate = useNavigate();

  const location = useLocation() as { state?: LocationState };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email, senha);

      const from = location.state?.from || "/";

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className="text-red-400">Login</h1>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />

        <button type="submit" disabled={state.isLoading}>
          {state.isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
