"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputForm from "@/components/InputForm";
import { Service } from "@/types/services";
import { getAllServicesActives } from "@/lib/fetchers/services";
import Button from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserByToken } from "@/utils/client/cookies";
import toast from "react-hot-toast";
import { createTicket } from "@/lib/fetchers/tickets";
import { formatToBRL } from "@/utils/formatters/formatToBRL";
import TextAreaForm from "@/components/TextAreaForm";

type FormValues = {
  title: string;
  description: string;
  serviceID: string;
};

export default function NewTicket() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      serviceID: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serviceSelected, setServiceSelected] = useState<Service>();
  const [services, setServices] = useState<Service[]>();
  const [userID, setUserID] = useState<string>();

  const fetchServices = useCallback(async () => {
    try {
      const data = await getAllServicesActives();
      if (data) setServices(data);
      await fetchUserID();
    } catch (error) {
      console.error("Não foi possível localizar os serviços", error);
    }
  }, []);

  const fetchUserID = async () => {
    try {
      const user = await getUserByToken();
      if (user?.id) setUserID(user.id);
    } catch (error) {
      console.error("Não foi possível localizar o ID do usuario", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  async function handleSubmitForm(data: FormValues) {
    try {
      setLoading(true);
      if (!data.serviceID || !serviceSelected) {
        toast.error("Por favor selecione um serviço.");
        return;
      }

      if (!userID) {
        fetchUserID();
      }

      const newTicket = {
        ...data,
        serviceID: data.serviceID,
        userID: userID || "",
        amount: Number(serviceSelected?.value),
      };

      const res = await createTicket(newTicket);

      if (res) {
        toast.success(res.message);
        reset();
        setServiceSelected(undefined);
        router.push("/dashboard/user");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl flex flex-col m-auto gap-6 p-5 h-full">
      <header className="flex items-center justify-between w-full">
        <h2 className="text-2xl text-blue-400 font-bold">Novo Chamado</h2>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row h-full">
        <div className="max-w-[624px] w-full border border-gray-500 rounded-lg p-8 max-h-fit flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-xl">Informações</h2>

            <p className="text-sm text-gray-300">
              Configure os dias e horários em que você está disponível para
              atender chamados
            </p>
          </div>

          <form className="flex flex-col gap-6">
            <InputForm
              type="text"
              inputID="title"
              label="Título"
              placeholder="Digite um título para o chamado"
              register={register("title", {
                required: "O título é obrigatorio",
              })}
              error={errors.title}
            />

            <TextAreaForm
              inputID="description"
              label="Descrição"
              placeholder="Descreva o que está acontecendo"
              register={register("description", {
                required: "A descrição é obrigatoria",
              })}
              error={errors.description}
            />

            <Controller
              name="serviceID"
              control={control}
              rules={{ required: "O serviço é obrigatório" }}
              render={({ field }) => (
                <Select
                  onValueChange={val => {
                    field.onChange(val);
                    const selected = services?.find(
                      service => service.id === val,
                    );
                    setServiceSelected(selected);
                  }}
                  value={String(field.value) || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Selecione o tipo de serviço"
                      className="block w-full truncate"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {services?.map(service => (
                        <SelectItem
                          key={service.id}
                          value={service.id}
                          className="max-w-lg min-w-0 "
                        >
                          <span className="block max-w-md truncate">
                            {service.title}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.serviceID && (
              <p className="text-red-500 text-sm">{errors.serviceID.message}</p>
            )}
          </form>
        </div>

        {serviceSelected && (
          <div className="max-w-96 w-full border border-gray-500 rounded-lg p-6 h-fit flex flex-col gap-4">
            <header>
              <h2 className="font-bold text-xl">Resumo</h2>

              <p className="text-sm text-gray-300">Valores e detalhes</p>
            </header>

            <div className="flex flex-col gap-1 ">
              <p className="text-sm text-gray-300">Categoria do serviço</p>
              <span className="text-gray-200 font-bold w-full truncate">
                {serviceSelected?.title}
              </span>
            </div>

            <div className="flex flex-col gap-1 ">
              <p className="text-sm text-gray-300">Custo Inicial</p>
              <span className="text-gray-200 font-bold text-xl">
                {formatToBRL(Number(serviceSelected.value))}
              </span>
            </div>

            <p className="text-sm text-gray-300 ">
              O chamado será automaticamente atribuído a um técnico disponível
            </p>

            <Button
              type="submit"
              loading={loading}
              onClick={handleSubmit(handleSubmitForm)}
              fullWidth
            >
              Criar Chamado
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
