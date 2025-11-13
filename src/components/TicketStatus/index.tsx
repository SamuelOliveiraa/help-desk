import { Status } from "@/types/tickets";
import { CircleCheckIcon, CircleQuestionMark, Clock8, MessageCircleQuestionIcon } from "lucide-react";

export default function TicketStatus({ variant }: { variant: Status }) {
    return (
        <div className={`w-fit flex items-center gap-2 cursor-default rounded-full px-2 py-1 font-bold ${variant === 'open' ? "bg-red-400/20 text-red-400" : variant === 'finished' ? "bg-green-400/20 text-green-400" : "bg-yellow-500/20 text-yellow-600"}`
        } >
            {variant === 'open' ? (
                <CircleQuestionMark size={18} />
            ) : variant === 'finished' ? <CircleCheckIcon size={18} /> : <Clock8 size={18} />
            }
            <span
                className={`hidden md:block text-base font-bold  `}
            >
                {variant === 'open' ? "Aberto" : variant === 'finished' ? "Encerrado" : "Em atendimento"}
            </span>
        </div >
    )
}
