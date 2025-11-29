import { Ban, CircleCheck } from "lucide-react";
import { tv } from "tailwind-variants";

const serviceStatusSpanVariant = tv({
  base: "hidden lg:block text-base font-bold rounded-full py-2 px-4",
  variants: {
    status: {
      true: "bg-green-400/20 text-green-400",
      false: "bg-red-100 text-red-400"
    }
  },
  defaultVariants: {
    status: true
  }
});

export default function ServiceStatus({ status }: { status: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {status ? (
        <CircleCheck className="text-green-400 lg:hidden" />
      ) : (
        <Ban className="text-red-400 lg:hidden" />
      )}
      <span className={serviceStatusSpanVariant({ status })}>
        {status ? "Ativo" : "Inativo"}
      </span>
    </div>
  );
}
