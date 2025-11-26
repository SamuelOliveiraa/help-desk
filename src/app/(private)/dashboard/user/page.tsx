"use client";

import { useCallback, useEffect, useState } from "react";
import { getTicketByTechnicianID } from "@/lib/api/tickets";
import type { Ticket } from "@/types/tickets";
import TicketStatus from "@/components/TicketStatus";
import TicketContentCard from "@/components/TicketContentCard";
import { Loader2, NotepadText } from "lucide-react";
import { getUserByToken } from "@/utils/cookies";
import ItensNotFound from "@/components/ItensNotFound";

export default function UserPage() {
	const [allTickets, setAllTickets] = useState<Ticket[]>([]);
	const [loading, setLoading] = useState(false)

	const fetchTickets = useCallback(async () => {
		try {
			setLoading(true)
			const user = await getUserByToken()
			if (user) {
				const data = await getTicketByTechnicianID(user.id)
				if (data) setAllTickets(Array.isArray(data) ? data : [])
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
				<ItensNotFound title="Nenhum chamado localizado" description="Você ainda não criou nenhum chamado. Quando precisar de ajuda, abra seu primeiro chamado e acompanhe tudo por aqui." />

			)}
		</div>
	);
}
