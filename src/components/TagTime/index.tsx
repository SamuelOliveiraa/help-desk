import { X } from "lucide-react";

type TagTimeProps = {
  selected?: boolean;
  text: string;
  id?: number;
  readOnly?: boolean;
};

export default function TagTime({
  selected,
  text,
  readOnly,
  id
}: TagTimeProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 py-1 px-3 transition-colors duration-200 rounded-full border border-gray-400 ${readOnly && ""} ${selected && "text-gray-600 bg-blue-200 "}`}
    >
      {text}
      {selected && <X className="size-3" />}
    </button>
  );
}
