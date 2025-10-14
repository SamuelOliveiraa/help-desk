type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link";
  fullWidth?: boolean;
};

export default function Button({
  children,
  fullWidth,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`py-3 px-4 flex items-center justify-center gap-3 rounded-md cursor-pointer ${
        fullWidth ? "w-full" : "w-fit"
      } ${
        variant === "secondary"
          ? "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100"
          : variant === "link"
          ? "bg-transparent text-gray-300 hover:bg-gray-500 hover:text-gray-100"
          : "bg-gray-200 text-gray-600 hover:bg-gray-100"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
