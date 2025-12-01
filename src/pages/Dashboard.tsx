import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8D8EA] via-[#B8E6D5] to-[#7DD3C0] flex flex-col items-center justify-center p-6">

      {/* Card principal */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 flex flex-col items-center gap-6">

        {/* Header */}
        <h1 className="text-3xl font-bold text-[#1F3A3A] mb-4 text-center">
            Bem-vinda ao Dashboard
          </h1>
          <p className="text-[#1F3A3A]/80 text-center">
            Aqui você pode gerenciar seus animais, tutores e acompanhar estatísticas importantes.
          </p>

          {/* Blocos de exemplo */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

            <div className="bg-[#7DD3C0]/70 rounded-xl p-4 text-center shadow hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate("/animals")}>
              <h2 className="text-xl font-semibold text-[#0F2A2A]">Animais</h2>
              <p className="text-[#0F2A2A]/90 text-lg mt-2">12 cadastrados</p>
            </div>

            <div className="bg-[#A8D8EA]/70 rounded-xl p-4 text-center shadow hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate("/tutors")}>
              <h2 className="text-xl font-semibold text-[#0F2A2A]">Tutores</h2>
              <p className="text-[#0F2A2A]/90 text-lg mt-2">5 cadastrados</p>
            </div>

            <div className="bg-[#B8E6D5]/70 rounded-xl p-4 text-center shadow hover:scale-105 transition-transform cursor-pointer"
                onClick={() => alert("Não implementado ainda")}>
              <h2 className="text-xl font-semibold text-[#0F2A2A]">Alertas</h2>
              <p className="text-[#0F2A2A]/90 text-lg mt-2">2 pendentes</p>
            </div>
          </div>

      </div>
    </div>
  );
}
