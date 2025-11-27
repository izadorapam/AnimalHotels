import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, senha);
  }

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
