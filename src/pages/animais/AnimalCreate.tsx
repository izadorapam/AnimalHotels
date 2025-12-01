import { useEffect, useState } from "react";
import { animalService } from "../../services/animalService";
import { Animal } from "../../types/Animal";
import { useNavigate } from "react-router-dom";
import AnimalForm from "../../components/forms/AnimalForm";
import { api } from "../../services/api";
import { PawPrint, Plus } from "lucide-react";

export default function AnimalCreate() {
  const [tutors, setTutors] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadTutors = async () => {
    const res = await api.get("/tutors");
    setTutors(res.data);
  };

  useEffect(() => {
    loadTutors();
  }, []);

  const handleSubmit = async (data: Partial<Animal>) => {
    await animalService.create(data);
    navigate("/animals");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#A8D8EA] via-[#B8E6D5] to-[#7DD3C0] flex flex-col items-center">

      {/* CARD */}
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-xl p-8 border border-white/20">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <PawPrint className="w-8 h-8 text-[#7DD3C0]" />
          <h1 className="text-2xl font-semibold text-[#2C5F5D]">Novo Animal</h1>
        </div>

        {/* FORM */}
            <div className="bg-white/60 rounded-lg p-6 shadow flex flex-col items-center">
              <div className="w-full max-w-lg">  {/* centraliza e limita largura do form */}
                <AnimalForm onSubmit={handleSubmit} tutors={tutors} />
              </div>
            </div>


        {/* BUTTON VOLTAR */}
        <button
          onClick={() => navigate("/animals")}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-[#7DD3C0] to-[#A8D8EA] hover:from-[#6BC2AF] hover:to-[#97C7D9] text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <Plus className="w-4 h-4 rotate-180" />
          Voltar
        </button>
      </div>
    </div>
  );
}
