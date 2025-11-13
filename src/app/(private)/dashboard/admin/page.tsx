"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllTickets } from "@/lib/api/tickets";
import type { Ticket } from "@/types/tickets";
import TicketStatus from "@/components/TicketStatus";
import TicketContentCard from "@/components/TicketContentCard";

export default function DashboardPage() {
  const [openTickets, setOpenTickets] = useState<Ticket[]>();
  const [finishedTickets, setFinishedTickets] = useState<Ticket[]>();
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>();

  const fetchTickets = useCallback(async () => {
    try {
      const allTickets = await getAllTickets()
      const ticketsinProgess = allTickets?.filter((ticket) => ticket.status === "inProgress")
      const ticketsOpen = allTickets?.filter((ticket) => ticket.status === "open")
      const ticketsFinished = allTickets?.filter((ticket) => ticket.status === "finished")

      if (ticketsinProgess) setInProgressTickets(ticketsinProgess);
      if (ticketsOpen) setOpenTickets(ticketsOpen);
      if (ticketsFinished) setFinishedTickets(ticketsFinished);

    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="flex w-full h-full flex-col mb-10">
      <h1 className="text-4xl text-black">Chamados</h1>

      <div className="flex flex-col mt-10 gap-4">
        <TicketStatus variant="open" />
        <TicketContentCard tickets={openTickets} />
      </div>

      <div className="flex flex-col mt-10 gap-4">
        <TicketStatus variant="inProgress" />
        <TicketContentCard tickets={inProgressTickets} />
      </div>

      <div className="flex flex-col mt-10 gap-4">
        <TicketStatus variant="finished" />
        <TicketContentCard tickets={finishedTickets} />
      </div>

    </div>
  );
}
