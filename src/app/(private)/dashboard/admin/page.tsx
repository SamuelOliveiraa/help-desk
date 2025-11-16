"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllTickets } from "@/lib/api/tickets";
import type { Ticket } from "@/types/tickets";
import TicketStatus from "@/components/TicketStatus";
import TicketContentCard from "@/components/TicketContentCard";
import TicketCard from "@/components/TicketCard";

export default function DashboardPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getAllTickets()
      if (data) setAllTickets(Array.isArray(data) ? data : [])

    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);


  // separa tickets por status
  const openTickets = allTickets.filter((ticket) => ticket.status === "open");
  const inProgressTickets = allTickets.filter((ticket) => ticket.status === "inProgress");
  const finishedTickets = allTickets.filter((ticket) => ticket.status === "finished");

  return (
    <div className="flex w-full h-full flex-col mb-10">
      <h1 className="text-4xl text-black">Chamados</h1>

      {!loading && openTickets?.length === 0 ? null : (
        <div className="flex flex-col mt-10 gap-4">
          <TicketStatus variant="open" loading={loading} />
          <TicketContentCard tickets={openTickets} loading={loading} />
        </div>
      )}

      {!loading && inProgressTickets?.length === 0 ? null : (
        <div className="flex flex-col mt-10 gap-4">
          <TicketStatus variant="inProgress" loading={loading} />
          <TicketContentCard tickets={inProgressTickets} loading={loading} />
        </div>
      )}

      {!loading && finishedTickets?.length === 0 ? null : (
        <div className="flex flex-col mt-10 gap-4">
          <TicketStatus variant="finished" loading={loading} />
          <TicketContentCard tickets={finishedTickets} loading={loading} />
        </div>
      )}

      {allTickets.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 opacity-70"
          >
            <path d="M7 8h10" />
            <path d="M7 12h4" />
            <path d="M7 16h7" />
            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9" />
            <path d="M21 4v4h-4" />
          </svg>

          {/* Título */}
          <h2 className="text-2xl font-semibold text-gray-700">
            Nenhum chamado encontrado
          </h2>

          {/* Mensagem */}
          <p className="text-gray-500 mt-2 max-w-md">
            Você ainda não criou nenhum chamado.
            Quando precisar de ajuda, abra seu primeiro chamado e acompanhe tudo por aqui.
          </p>
        </div>
      )}

    </div>
  );
}
