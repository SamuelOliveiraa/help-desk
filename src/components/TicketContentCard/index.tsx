import { Ticket } from "@/types/tickets";
import TicketCard from "../TicketCard";

export default function TicketContentCard({ tickets, loading }: { tickets: Ticket[] | undefined, loading?: boolean }) {
    if (loading) {
        // Mostra 3 skeletons de TicketCard enquanto carrega
        return (
            <div className="max-w-7xl w-full h-fit flex flex-wrap gap-8 items-center justify-start overflow-x-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                    <TicketCard key={i} loading ticket={{} as Ticket} />
                ))}
            </div>
        );
    }
    return (
        <div className="max-w-7xl w-full h-fit flex flex-wrap gap-8 items-center justify-start overflow-x-hidden">
            {tickets?.length !== 0 && (
                tickets?.map((ticket) => (
                    <TicketCard loading={loading} key={ticket.id} ticket={ticket} />
                ))
            )}
        </div>
    )
}
