"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import TagTime from "@/components/TagTime";
import {
  createUser,
  getCurrentUser,
  getUsersByID,
  updateUser
} from "@/lib/api/users";
import { Role, User, WorkingHours } from "@/types/user";
import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  password?: string;
};

const INITIAL_WORKING_HOURS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00"
].map((time, index) => ({
  id: index,
  time,
  active: false
}));

export default function DetailsTechnicals({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHours[]>(
    INITIAL_WORKING_HOURS
  );
  const [workingHoursSelected, setWorkingHoursSelected] = useState<
    WorkingHours[]
  >([]);

  const idPage = id === "details" ? "" : id;

  const fetchUsers = useCallback(async () => {
    try {
      if (id === "details") return;

      const user = await getUsersByID(id);
      if (!user) return;

      reset({
        name: user.name,
        email: user.email
      });

      setUser(user);

      if (user?.workingHours) {
        setWorkingHoursSelected(user.workingHours);

        setWorkingHours(prev =>
          prev.map(hour => {
            const found = user.workingHours?.find(
              h => h.id === hour.id && h.active
            );
            return found
              ? { ...hour, active: true }
              : { ...hour, active: false };
          })
        );
      }
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }, [id, reset]);

  // Edição — carrega o técnico pelo ID
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Criação de usuário - carrega o usuario logado atualmente
  useEffect(() => {
    if (id !== "details") return;
    getCurrentUser()
      .then((data: User) => {
        setUser(data);
        if (data.workingHours) {
          setWorkingHours(data.workingHours);
        }
      })
      .catch(() => console.log("Erro ao buscar usuário logado"));
  }, [id]);

  function handleAddWorkingHours(selectedHour: WorkingHours) {
    setWorkingHours(prev =>
      prev.map(hour =>
        hour.id === selectedHour.id ? { ...hour, active: !hour.active } : hour
      )
    );
    setWorkingHoursSelected(prev => {
      const exists = prev.some(hour => hour.id === selectedHour.id);
      if (exists) {
        // remove se já estiver ativo
        return prev.filter(hour => hour.id !== selectedHour.id);
      } else {
        // adiciona se foi ativado
        const updated = [...prev, { ...selectedHour, active: true }];
        return updated.sort((a, b) => a.id - b.id);
      }
    });
  }

  async function handleEditTechnican({
    name,
    email,
    workingHours
  }: {
    name: string;
    email: string;
    workingHours: WorkingHours[];
  }) {
    const data = await updateUser({
      id: Number(id),
      name,
      email,
      workingHours
    });

    if (data !== null) {
      router.back();
      toast.success(data.message);
    }
  }

  async function handleCreateTechnican({
    name,
    email,
    password,
    workingHours
  }: {
    name: string;
    email: string;
    password: string;
    workingHours: WorkingHours[];
  }) {
    const { message, token } = await createUser({
      name,
      email,
      password,
      workingHours,
      role: "technician" as Role
    });

    if (token) {
      router.back();
    }

    toast.success(message);
  }

  async function handleSubmitForm(data: FormValues) {
    try {
      setLoading(true);

      if (workingHoursSelected.length < 4) {
        toast.error(
          "Horários de atendimento não podem estar vazios, selecione pelo menos 4 horários."
        );
        return;
      }

      if (id !== "details") {
        await handleEditTechnican({
          name: data.name,
          email: data.email,
          workingHours: workingHoursSelected
        });
      } else {
        await handleCreateTechnican({
          ...data,
          password: data.password || "",
          workingHours: workingHoursSelected
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "Erro interno de servidor, por favor contate a equipe de suporte"
        );
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    router.back();
  }

  return (
    <div className="max-w-5xl flex flex-col m-auto gap-6 h-full">
      <header>
        <div
          className="w-fit flex items-center gap-2 cursor-pointer"
          onClick={handleBack}
        >
          <ArrowLeft />
          <span>Voltar</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl text-blue-400 font-bold">
            {id !== "details"
              ? "Editar Perfil de Técnico"
              : "Criar  Perfil de Técnico"}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handleBack}>
              Cancelar
            </Button>
            <Button
              loading={loading}
              type="submit"
              onClick={handleSubmit(handleSubmitForm)}
            >
              Salvar
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row h-full">
        <div className="max-w-96 w-full border border-gray-500 rounded-lg p-6 max-h-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Dados pessoais</h2>

            <p className="text-sm text-gray-300">
              Defina as informações do perfil de técnico
            </p>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            {idPage && (
              <Avatar avatar={user?.avatar || ""} name={user?.name || ""} />
            )}

            <InputForm
              type="text"
              inputID="name"
              label="Nome"
              placeholder="Digite o nome completo"
              register={register("name", {
                required: "O nome é obrigatorio"
              })}
              error={errors.name}
            />

            <InputForm
              inputID="email"
              label="E-mail"
              placeholder="Digite o e-mail completo"
              register={register("email", {
                required: "O e-mail é obrigatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um e-mail válido"
                }
              })}
              type="email"
              error={errors.email}
            />

            {!idPage && (
              <InputForm
                isPassword={true}
                inputID="password"
                label="Senha"
                placeholder="Digite sua senha"
                register={register("password", {
                  required: "A senha  é obrigatorio",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter mais de 8 caracteres"
                  }
                })}
                error={errors.password}
                helperText="A senha deve ter mais de 8 caracteres"
              />
            )}
          </form>
        </div>

        <div className="w-full border border-gray-500 rounded-lg p-6 h-fit">
          <h2 className="font-bold text-xl mb-2">Horários de atendimento</h2>

          <p className="text-sm text-gray-300">
            Selecione os horários de disponibilidade do técnico para atendimento
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="font-bold text-gray-300 text-sm uppercase">Manhã</h2>

            <div className="flex flex-wrap gap-2">
              {workingHours.slice(0, 6).map(hour => (
                <TagTime
                  key={hour.id}
                  text={hour.time}
                  selected={hour.active}
                  onClick={() => handleAddWorkingHours(hour)}
                />
              ))}
            </div>

            <h2 className="font-bold text-gray-300 text-sm uppercase">Tarde</h2>

            <div className="flex flex-wrap gap-2">
              {workingHours.slice(6, 12).map(hour => (
                <TagTime
                  key={hour.id}
                  text={hour.time}
                  selected={hour.active}
                  onClick={() => handleAddWorkingHours(hour)}
                />
              ))}
            </div>

            <h2 className="font-bold text-gray-300 text-sm uppercase">Noite</h2>

            <div className="flex flex-wrap gap-2">
              {workingHours.slice(12).map(hour => (
                <TagTime
                  key={hour.id}
                  text={hour.time}
                  selected={hour.active}
                  onClick={() => handleAddWorkingHours(hour)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
