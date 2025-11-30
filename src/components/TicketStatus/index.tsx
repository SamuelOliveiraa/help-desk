import { Status } from "@/types/tickets";
import { CircleCheckIcon, CircleQuestionMark, Clock8 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { tv } from "tailwind-variants";

const ticketStatusContainerVariant = tv({
  base: "w-fit flex items-center gap-2 cursor-default rounded-full px-2 py-1 font-bold",
  variants: {
    variant: {
      open: "bg-red-400/20 text-red-400",
      finished: "bg-green-400/20 text-green-400",
      inProgress: "bg-yellow-500/20 text-yellow-600",
    },
  },
  defaultVariants: {
    variant: "open",
  },
});

export default function TicketStatus({
  variant,
  loading,
}: {
  variant: Status;
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton className="rounded-full w-20 h-9" />;
  }
  return (
    <div className={ticketStatusContainerVariant({ variant })}>
      {variant === "open" ? (
        <CircleQuestionMark size={18} />
      ) : variant === "finished" ? (
        <CircleCheckIcon size={18} />
      ) : (
        <Clock8 size={18} />
      )}
      <span className="hidden md:block text-base font-bold">
        {variant === "open"
          ? "Aberto"
          : variant === "finished"
            ? "Encerrado"
            : "Em atendimento"}
      </span>
    </div>
  );
}
