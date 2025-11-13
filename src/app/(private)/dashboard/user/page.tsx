"use client";

import { useCallback, useEffect, useState } from "react";
import { getTicketByTechnicianID } from "@/lib/api/tickets";
import type { Ticket } from "@/types/tickets";
import TicketStatus from "@/components/TicketStatus";
import TicketContentCard from "@/components/TicketContentCard";
import { Loader2 } from "lucide-react";
import { getUserByToken } from "@/utils/cookies";

export default function UserPage() {
	const [allTickets, setAllTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState(false)

	const fetchTickets = useCallback(async () => {
		try {
			setLoading(true)
			const user = await getUserByToken()
			if (user) {
				const data = await getTicketByTechnicianID(Number(user.id))
				if (data) setAllTickets(data)
			}
		} catch (err) {
			console.error("Erro ao buscar chamados:", err);
			setLoading(false)
		} finally {
			setLoading(false)

		}
	}, []);

	useEffect(() => {
		fetchTickets();
	}, [fetchTickets]);


	// separa tickets por status
	const openTickets = allTickets.filter((t) => t.status === "open");
	const inProgressTickets = allTickets.filter((t) => t.status === "inProgress");
	const finishedTickets = allTickets.filter((t) => t.status === "finished");

	return (
		<div className="flex w-full h-full flex-col mb-10">
			<h1 className="text-4xl text-black">Meus Chamados</h1>

			{loading ? (<div className="flex items-center justify-center">
				<Loader2 className="animate-spin" />
			</div>) :
				<>
					{openTickets && openTickets.length > 0 && (
						<div className="flex flex-col mt-10 gap-4">
							<TicketStatus variant="open" />
							<TicketContentCard tickets={openTickets} />
						</div>
					)}

					{inProgressTickets && inProgressTickets.length > 0 && (
						<div className="flex flex-col mt-10 gap-4">
							<TicketStatus variant="inProgress" />
							<TicketContentCard tickets={inProgressTickets} />
						</div>
					)}

					{finishedTickets && finishedTickets.length > 0 && (
						<div className="flex flex-col mt-10 gap-4">
							<TicketStatus variant="finished" />
							<TicketContentCard tickets={finishedTickets} />
						</div>
					)}
				</>
			}
		</div>
	);
}
