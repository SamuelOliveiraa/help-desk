"use client";

import Button from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailsTechnicals() {
  const router = useRouter();

  return (
    <div className="max-w-5xl flex flex-col m-auto gap-6 h-full">
      <header>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span>Voltar</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl text-blue-400 font-bold">
            Perfil de Técnico
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 h-full">
        <div className="max-w-96 w-full border border-gray-500 rounded-lg p-6 max-h-80">
          <h2 className="font-bold text-xl mb-2">Dados pessoais</h2>

          <p className="text-sm text-gray-300">
            Defina as informações do perfil de técnico
          </p>
        </div>

        <div className="max-w-lg w-full border border-gray-500 rounded-lg p-6 max-h-72 ">
          <h2 className="font-bold text-xl mb-2">Horários de atendimento</h2>

          <p className="text-sm text-gray-300">
            Selecione os horários de disponibilidade do técnico para atendimento
          </p>

          <div>
            <div>
              <h2 className="font-bold text-gray-300 text-sm uppercase">
                Manhã
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
