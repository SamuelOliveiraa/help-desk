import { Loader2 } from "lucide-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link" | "delete";
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  fullWidth,
  variant = "primary",
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-3 rounded-md cursor-pointer transition-colors duration-200 ${
        loading && "cursor-not-allowed opacity-60"
      } ${fullWidth ? "w-full py-3 px-4 " : "w-fit p-2"} ${
        variant === "secondary"
          ? "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100"
          : variant === "link"
          ? "bg-transparent text-gray-300 hover:bg-gray-500 hover:text-gray-100"
          : variant === "delete"
          ? "bg-red-500 text-gray-600"
          : "bg-gray-200 text-gray-600 hover:bg-gray-100"
      }`}
      {...rest}
      disabled={loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </button>
  );
}
