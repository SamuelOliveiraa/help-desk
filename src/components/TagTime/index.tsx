import { X } from "lucide-react";
import { tv } from "tailwind-variants";
import { Skeleton } from "../ui/skeleton";

type TagTimeProps = {
  selected?: boolean;
  text: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const tagTimeButtonVariants = tv({
  base: "flex items-center justify-center gap-1 py-1 px-3 transition-colors duration-200 rounded-full border border-gray-400",
  variants: {
    selected: {
      true: "text-gray-600 bg-blue-200 ",
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export default function TagTime({
  selected,
  text,
  loading,
  ...rest
}: TagTimeProps) {
  if (loading) {
    return <Skeleton className="w-16 h-8 rounded-full" />;
  }

  return (
    <button className={tagTimeButtonVariants({ selected })} {...rest}>
      {text}
      {selected && <X className="size-3" />}
    </button>
  );
}
