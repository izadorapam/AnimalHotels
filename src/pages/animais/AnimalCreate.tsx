import { useEffect, useState } from "react";
import { animalService } from "../../services/animalService";
import { Animal } from "../../types/Animal";
import { useNavigate } from "react-router-dom";
import AnimalForm from "../../components/forms/AnimalForm";
import { api } from "../../services/api";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Novo Animal</h1>

      <AnimalForm onSubmit={handleSubmit} tutors={tutors} />
    </div>
  );
}
