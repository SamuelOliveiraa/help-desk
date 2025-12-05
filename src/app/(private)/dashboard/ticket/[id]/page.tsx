"use client";

import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import ButtonBack from "@/components/ButtonBack";
import TicketStatus from "@/components/TicketStatus";
import { Skeleton } from "@/components/ui/skeleton";
import { getTicketByPublicID } from "@/lib/fetchers/tickets";
import { Ticket } from "@/types/tickets";
import { Role } from "@/types/user";
import { getUserByToken } from "@/utils/client/cookies";
import { formtDataToBRL } from "@/utils/formatters/formatDataToBRL";
import { formatToBRL } from "@/utils/formatters/formatToBRL";
import { CircleCheckBig, Clock2, Plus, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>("user");

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(true);
      const user = await getUserByToken();
      if (user) setRole(user?.role);

      if (!Array.isArray(id) && id) {
        const data = await getTicketByPublicID(id);
        if (data) setTicket(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return (
    <div className="max-w-5xl flex flex-col m-auto gap-6 h-full">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <ButtonBack />
          <h2 className="text-2xl text-blue-400 font-bold">
            Chamado Detalhado
          </h2>
        </div>

        {role !== "user" && (
          <div className="flex gap-2 items-center">
            <Button variant="secondary">
              <CircleCheckBig size={18} />
              <span>Encerrar</span>
            </Button>

            <Button>
              <Clock2 size={18} />
              <span>Iniciar Atendimento</span>
            </Button>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-4 lg:flex-row h-full">
        <div className="flex flex-col gap-4">
          <div className="max-w-[624px] lg:w-[624px] w-full border border-gray-500 rounded-lg p-8 max-h-fit flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              {loading ? (
                <Skeleton className="w-24 h-7" />
              ) : (
                <span> {ticket?.publicID} </span>
              )}

              <TicketStatus
                loading={loading}
                variant={ticket?.status || "open"}
              />
            </div>

            {loading ? (
              <Skeleton className="w-full h-9" />
            ) : (
              <h2 className="text-2xl font-bold text-gray-200 break-words">
                {ticket?.title}
              </h2>
            )}

            <div>
              <span className="text-sm text-gray-400">Descrição</span>

              {loading ? (
                <Skeleton className="w-full h-20" />
              ) : (
                <p className="break-words min-h-[2.5rem] max-h-52 overflow-y-auto">
                  {ticket?.description}
                </p>
              )}
            </div>

            <div>
              <span className="text-sm text-gray-400">Categoria</span>

              {loading ? (
                <Skeleton className="w-full h-9" />
              ) : (
                <p className="w-full truncate">{ticket?.service?.title}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400">Criado em</span>

                {loading ? (
                  <Skeleton className="w-36 h-8" />
                ) : (
                  <p>{formtDataToBRL(ticket?.createdAt)}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-400">Atualizado em</span>
                {loading ? (
                  <Skeleton className="w-36 h-8" />
                ) : (
                  <p>{formtDataToBRL(ticket?.updatedAt)}</p>
                )}
              </div>
            </div>

            {role !== "user" && (
              <div>
                <span className="text-sm text-gray-400">Cliente</span>
                <div className="flex gap-2 h-full items-center">
                  <Avatar
                    size="sm"
                    loading={loading}
                    name={ticket?.user?.name || ""}
                    avatar={ticket?.user?.avatar || ""}
                  />

                  {loading ? (
                    <Skeleton className="w-36 h-8" />
                  ) : (
                    <h2 className="text-left">{ticket?.user?.name}</h2>
                  )}
                </div>
              </div>
            )}
          </div>

          {role === "technician" && (
            <div className="max-w-[624px] w-full border border-gray-500 rounded-lg p-8 max-h-fit flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-gray-400/10 pb-2">
                <span className="text-base text-gray-400">
                  Serviços Adicionais
                </span>
                <Button>
                  <Plus size={20} />
                </Button>
              </div>

              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      className="flex items-center justify-between mb-1 gap-2"
                      key={`item-teste-${index}`}
                    >
                      <Skeleton className="flex-1 h-8" />
                      <Skeleton className="w-20 h-8" />
                      <Skeleton className="w-10 h-8" />
                    </div>
                  ))
                : ticket?.subServices?.map(subService => (
                    <div
                      className="flex items-center border-b order-gray-400/10 gap-4 pb-1"
                      key={subService.id}
                    >
                      <span className="font-bold flex-1">
                        {subService.title}
                      </span>

                      <span>{subService.title}</span>

                      <Button variant="secondary">
                        <Trash size={20} className="text-red-400" />
                      </Button>
                    </div>
                  ))}

              {!loading &&
                (!ticket?.subServices || ticket.subServices.length === 0) && (
                  <div className="flex items-center flex-col gap-2">
                    <h2 className="text-lg font-semibold">
                      Nenhum serviço adicional foi registrado
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Adicione abaixo qualquer serviço extra realizado durante a
                      visita ao cliente.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="max-w-96 w-full border border-gray-500 rounded-lg p-6 h-fit flex flex-col gap-4">
          <header className="flex flex-col gap-3">
            <h2 className="font-bold text-sm text-gray-400">
              Tecnico responsavel
            </h2>

            <div className="flex gap-2 h-full items-center">
              <Avatar
                size="lg"
                loading={loading}
                name={ticket?.technician?.name || ""}
                avatar={ticket?.technician?.avatar || ""}
              />

              {loading ? (
                <Skeleton className="flex-1 h-10" />
              ) : (
                <div className="hidden md:flex items-center flex-col flex-1 md:items-start">
                  <h2 className="text-left text-base">
                    {ticket?.technician?.name}
                  </h2>

                  <span className="text-gray-400 text-sm">
                    {ticket?.technician?.email}
                  </span>
                </div>
              )}
            </div>
          </header>

          <div>
            <span className="text-sm text-gray-400">Valores</span>

            <div className="flex items-center justify-between">
              <span>Preço base</span>

              {loading ? (
                <Skeleton className="w-20 h-7" />
              ) : (
                <span>{formatToBRL(ticket?.amount || 100)}</span>
              )}
            </div>
          </div>

          {ticket?.subServices && ticket?.subServices?.length > 0 && (
            <div>
              <span className="text-sm text-gray-400">Adicionais</span>

              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      className="flex items-center justify-between mb-1"
                      key={`item-teste-${index}`}
                    >
                      <Skeleton className="w-32 h-7" />
                      <Skeleton className="w-20 h-7" />
                    </div>
                  ))
                : ticket?.subServices.map(subService => (
                    <div
                      className="flex items-center justify-between mb-1"
                      key={subService.id}
                    >
                      <span>{subService.title}</span>

                      <span>{subService.value}</span>
                    </div>
                  ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xl font-bold border-t border-gray-400/10 pt-4">
            <span>Total</span>

            {loading ? (
              <Skeleton className="w-32 h-8" />
            ) : (
              <span>{formatToBRL(ticket?.amount || 100)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
