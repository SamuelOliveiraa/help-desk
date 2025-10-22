import { X } from "lucide-react";

type TagTimeProps = {
  selected?: boolean;
  text: string;
  readOnly?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function TagTime({
  selected,
  text,
  readOnly,
  ...rest
}: TagTimeProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 py-1 px-3 transition-colors duration-200 rounded-full border border-gray-400 ${readOnly && ""} ${selected && "text-gray-600 bg-blue-200 "}`}
      {...rest}
    >
      {text}
      {selected && <X className="size-3" />}
    </button>
  );
}
