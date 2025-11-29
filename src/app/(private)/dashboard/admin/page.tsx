"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllTickets } from "@/lib/api/tickets";
import type { Ticket } from "@/types/tickets";
import TicketStatus from "@/components/TicketStatus";
import TicketContentCard from "@/components/TicketContentCard";
import TicketCard from "@/components/TicketCard";
import { Tag } from "lucide-react";
import ItensNotFound from "@/components/ItensNotFound";

export default function DashboardPage() {
  const [allTickets, setAllTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllTickets();
      if (data) setAllTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // separa tickets por status
  const openTickets = allTickets.filter(ticket => ticket.status === "open");
  const inProgressTickets = allTickets.filter(
    ticket => ticket.status === "inProgress"
  );
  const finishedTickets = allTickets.filter(
    ticket => ticket.status === "finished"
  );

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
        <ItensNotFound
          title="Nenhum chamado localizado"
          description="Os usuários ainda não abriram chamados. Quando surgirem solicitações, elas aparecerão automaticamente no seu painel."
        />
      )}
    </div>
  );
}
