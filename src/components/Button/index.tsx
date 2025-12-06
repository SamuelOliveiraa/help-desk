import { Loader2 } from "lucide-react";
import { tv } from "tailwind-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link" | "delete";
  fullWidth?: boolean;
  loading?: boolean;
};

const buttonVariants = tv({
  base: "flex items-center justify-center gap-3 rounded-md cursor-pointer transition-colors duration-200 min-h-10 disabled:cursor-not-allowed disabled:opacity-60",
  variants: {
    variant: {
      primary: "bg-gray-200 text-gray-600 hover:bg-gray-100",
      secondary:
        "bg-gray-500 text-gray-200 hover:bg-gray-400/40 hover:text-gray-100",
      link: "bg-transparent text-gray-300 hover:bg-gray-500 hover:text-gray-100",
      delete: "bg-red-500 text-gray-600",
    },
    loading: {
      true: "cursor-not-allowed opacity-60",
    },
    fullWidth: {
      true: "w-full py-3 px-4",
      false: "w-fit p-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    loading: false,
    fullWidth: false,
  },
});

export default function Button({
  children,
  fullWidth,
  variant,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ fullWidth, loading, variant })}
      disabled={loading}
      {...rest}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </button>
  );
}
