import { Ticket } from "@/types/tickets";
import TicketCard from "../TicketCard";

export default function TicketContentCard({ tickets }: { tickets: Ticket[] | undefined }) {
    return (
        <div className="max-w-7xl w-full h-fit flex flex-wrap gap-8 items-center justify-start overflow-x-hidden">
            {tickets?.length === 0 ? (
                <p>Ainda não ha chamados registrados</p>
            ) : (
                tickets?.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))
            )}
        </div>
    )
}
