import { Ban, CircleCheck } from "lucide-react";

export default function ServiceStatus({ status }: { status: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {status ? (
        <CircleCheck className="text-green-400 lg:hidden" />
      ) : (
        <Ban className="text-red-400 lg:hidden" />
      )}
      <span
        className={`text-base font-bold rounded-full py-2 px-4 ${status ? "bg-green-400/20 text-green-400" : "bg-red-100 text-red-400"}`}
      >
        {status ? "Ativo" : "Inativo"}
      </span>
    </div>
  );
}
