import { useForm } from "react-hook-form";
import { Animal } from "../../types/Animal";

interface Props {
  defaultValues?: Partial<Animal>;
  onSubmit: (data: Partial<Animal>) => void;
  tutors: { id: string | number; nome: string }[];
}

export default function AnimalForm({ defaultValues, onSubmit, tutors }: Props) {
  const { register, handleSubmit } = useForm<Partial<Animal>>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

      {/* Nome */}
      <input
        {...register("nome")}
        placeholder="Nome do animal"
        className="input border p-2 rounded"
        required
      />

      {/* Espécie */}
      <select
        {...register("especie")}
        className="input border p-2 rounded"
        required
      >
        <option value="">Selecione a espécie</option>
        <option value="cachorro">Cachorro</option>
        <option value="gato">Gato</option>
      </select>

      {/* Raça */}
      <input
        {...register("raca")}
        placeholder="Raça"
        className="input border p-2 rounded"
        required
      />

      {/* Idade */}
      <input
        type="number"
        {...register("idade", { valueAsNumber: true })}
        placeholder="Idade"
        className="input border p-2 rounded"
        required
      />

      {/* Tutor */}
      <select
        {...register("tutorId", { valueAsNumber: true })}   // <<<<< CORREÇÃO AQUI
        className="input border p-2 rounded"
        required
      >
        <option value="">Selecione o tutor</option>
        {tutors.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Salvar
      </button>
    </form>
  );
}
