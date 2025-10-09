type ButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "link";
  fullWidth?: boolean;
};

export default function Button({
  children,
  fullWidth,
  type = "primary",
  ...rest
}: ButtonProps) {
  return (
    <div
      className={`py-3 px-4 flex items-center justify-center gap-3 rounded-md cursor-pointer ${
        fullWidth ? "w-full" : "w-fit"
      } ${
        type === "secondary"
          ? "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100"
          : type === "link"
          ? "bg-transparent text-gray-300 hover:bg-gray-500 hover:text-gray-100"
          : "bg-gray-200 text-gray-600 hover:bg-gray-100"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
