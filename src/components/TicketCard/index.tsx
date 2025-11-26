import { Ticket } from "@/types/tickets";
import Button from "../Button";
import { CheckCircle2, PencilLine } from "lucide-react";
import TicketStatus from "../TicketStatus";
import Avatar from "../Avatar";
import { formatToBRL } from "@/utils/formatToBRL";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export default function TicketCard({ ticket, loading }: { ticket: Ticket, loading?: boolean }) {

    if (loading) {
        return (
            <Skeleton className="w-96 h-60" />
        )
    }
    return (
        <Link href={`/dashboard/ticket/${ticket.id}`} className="max-w-96 w-full p-4 border max-h-fit rounded-lg flex flex-col gap-3">
            <header className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-400">
                    {ticket.publicID}
                </span>

                <div className="flex items-center gap-2 max-w-40">
                    <Button variant="secondary">
                        <PencilLine size={18} />
                    </Button>

                    <Button>
                        <CheckCircle2 size={18} />
                        <span>Encerrar</span>
                    </Button>
                </div>
            </header>

            <div className="flex flex-col gap-3 ">
                <div className="flex flex-col">
                    <h2 className="font-bold text-base">
                        {ticket.title}
                    </h2>
                    <span className="text-sm text-gray-400">
                        {ticket.service.title}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                        {/* 10/04/25 15:13 */}
                        {new Date(ticket.createdAt).toLocaleString("pt-BR").slice(0, -3)}
                    </span>

                    <span className="text-md">
                        {formatToBRL(ticket.amount)}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-400/10 pt-6">
                <div className="flex gap-2 items-center">
                    <Avatar size="sm" avatar={ticket.technician?.avatar || ""} name={ticket.technician?.name || ""} />
                    <span>{ticket.technician?.name}</span>
                </div>
                <TicketStatus variant={ticket.status} />
            </div>

        </Link>
    )
}
