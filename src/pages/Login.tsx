import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { PawPrint, Heart, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A8D8EA] via-[#B8E6D5] to-[#7DD3C0] p-4 relative">

      {/* paw prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <PawPrint className="absolute top-10 left-10 w-12 h-12 text-white/20 rotate-12" />
        <PawPrint className="absolute top-32 right-20 w-16 h-16 text-white/15 -rotate-12" />
        <PawPrint className="absolute bottom-20 left-32 w-14 h-14 text-white/20 rotate-45" />
        <PawPrint className="absolute bottom-32 right-10 w-10 h-10 text-white/15 -rotate-45" />
        <Heart className="absolute top-1/4 right-1/4 w-8 h-8 text-white/10 animate-pulse" />
        <Heart className="absolute bottom-1/3 left-1/4 w-6 h-6 text-white/10 animate-pulse" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl rounded-xl p-6 relative z-10">

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#7DD3C0] to-[#A8D8EA] rounded-full flex items-center justify-center shadow-lg mb-2">
            <PawPrint className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-base font-base text-[#2C5F5D]">Bem-vindo de volta!</h1>
          <p className="text-[#5A9B94]">Faça login para acessar o Hotel de Animais</p>
        </div>

        {/* Alert */}
        {state.error && (
          <div className="flex items-center gap-2 mb-4 p-3 border border-red-200 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 text-sm">{state.error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
              <label className="text-[#2C5F5D] font-medium text-sm">Email</label>
              <input
                className="w-full bg-gray-100 text-gray-900 border border-[#B8E6D5] rounded-lg px-3 py-2 outline-none 
                          placeholder-gray-500 focus:border-[#7DD3C0] focus:ring-2 focus:ring-[#7DD3C0]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="digite o seu email"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#2C5F5D] font-medium text-sm">Senha</label>
              <input
                type="password"
                className="w-full bg-gray-100 text-gray-900 border border-[#B8E6D5] rounded-lg px-3 py-2 outline-none 
                          placeholder-gray-500 focus:border-[#7DD3C0] focus:ring-2 focus:ring-[#7DD3C0]"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="digite sua senha"
              />
            </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full bg-gradient-to-r from-[#7DD3C0] to-[#A8D8EA] hover:from-[#6BC2AF] hover:to-[#97C7D9] text-white py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {state.isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Entrando...
              </>
            ) : (
              <>
                <PawPrint className="w-4 h-4" />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#5A9B94]">
            Cuidando do seu pet com amor{" "}
            <Heart className="inline w-4 h-4 text-[#7DD3C0]" />
          </p>
        </div>
      </div>
    </div>
  );
}
