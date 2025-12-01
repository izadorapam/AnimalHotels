import { useForm } from "react-hook-form";
import { Animal } from "../../types/Animal";

interface Props {
  defaultValues?: Partial<Animal>;
  onSubmit: (data: Partial<Animal>) => void;
  tutors: any[];
}

export default function AnimalForm({ defaultValues, onSubmit, tutors }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Animal>>({
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-lg bg-white p-6 rounded shadow"
    >
      {/* NOME */}
      <div>
        <label className="block font-semibold mb-1">Nome</label>
        <input
          type="text"
          {...register("nome", { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.nome && <p className="text-red-600 text-sm">Informe o nome</p>}
      </div>

      {/* ESPÉCIE */}
      <div>
        <label className="block font-semibold mb-1">Espécie</label>
        <input
          type="text"
          {...register("especie", { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.especie && (
          <p className="text-red-600 text-sm">Informe a espécie</p>
        )}
      </div>

      {/* RAÇA */}
      <div>
        <label className="block font-semibold mb-1">Raça</label>
        <input
          type="text"
          {...register("raca", { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.raca && (
          <p className="text-red-600 text-sm">Informe a raça</p>
        )}
      </div>

      {/* IDADE */}
      <div>
        <label className="block font-semibold mb-1">Idade</label>
        <input
          type="number"
          {...register("idade", { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.idade && (
          <p className="text-red-600 text-sm">Informe a idade</p>
        )}
      </div>

      {/* TUTOR */}
      <div>
        <label className="block font-semibold mb-1">Tutor</label>
        <select
          {...register("tutorId", { required: true })}
          className="border p-2 rounded w-full"
          defaultValue={defaultValues?.tutorId ?? ""}
        >
          <option value="">Selecione um tutor</option>
          {tutors.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>

        {errors.tutorId && (
          <p className="text-red-600 text-sm">Selecione um tutor</p>
        )}
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Salvar
      </button>
    </form>
  );
}
