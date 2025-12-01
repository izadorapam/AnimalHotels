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
      className="
        flex flex-col gap-4 
        max-w-lg 
        bg-white/80 
        backdrop-blur-sm 
        p-6 
        rounded-xl 
        shadow-md 
        border border-white/30
      "
    >

      {/* NOME */}
      <div>
        <label className="block font-semibold mb-1 text-[#2C5F5D]">Nome</label>
        <input
          type="text"
          {...register("nome", { required: true })}
          className="
            border p-2 rounded w-full 
            text-[#2C5F5D] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7DD3C0]
          "
        />
        {errors.nome && <p className="text-red-600 text-sm">Informe o nome</p>}
      </div>

      {/* ESPÉCIE */}
      <div>
        <label className="block font-semibold mb-1 text-[#2C5F5D]">Espécie</label>
        <input
          type="text"
          {...register("especie", { required: true })}
          className="
            border p-2 rounded w-full 
            text-[#2C5F5D] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7DD3C0]
          "
        />
        {errors.especie && (
          <p className="text-red-600 text-sm">Informe a espécie</p>
        )}
      </div>

      {/* RAÇA */}
      <div>
        <label className="block font-semibold mb-1 text-[#2C5F5D]">Raça</label>
        <input
          type="text"
          {...register("raca", { required: true })}
          className="
            border p-2 rounded w-full 
            text-[#2C5F5D] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7DD3C0]
          "
        />
        {errors.raca && (
          <p className="text-red-600 text-sm">Informe a raça</p>
        )}
      </div>

      {/* IDADE */}
      <div>
        <label className="block font-semibold mb-1 text-[#2C5F5D]">Idade</label>
        <input
          type="number"
          {...register("idade", { required: true })}
          className="
            border p-2 rounded w-full 
            text-[#2C5F5D] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7DD3C0]
          "
        />
        {errors.idade && (
          <p className="text-red-600 text-sm">Informe a idade</p>
        )}
      </div>

      {/* TUTOR */}
      <div>
        <label className="block font-semibold mb-1 text-[#2C5F5D]">Tutor</label>

        <select
          {...register("tutorId", { required: true })}
          className="
            border p-2 rounded w-full 
            text-[#2C5F5D] 
            bg-white 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#7DD3C0]
          "
          defaultValue={defaultValues?.tutorId ?? ""}
        >
          <option value="" className="text-gray-400">
            Selecione um tutor
          </option>

          {tutors.map((t) => (
            <option key={t.id} value={t.id} className="text-[#2C5F5D]">
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
        className="
          bg-[#7DD3C0] 
          hover:bg-[#6BC2AF] 
          text-white 
          font-semibold 
          px-4 py-2 
          rounded-lg 
          mt-2 
          shadow-md 
          transition-all 
          duration-300
        "
      >
        Salvar
      </button>
    </form>
  );
}
