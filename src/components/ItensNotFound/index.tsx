import { Tag } from "lucide-react";
import React from "react";
import { tv } from "tailwind-variants";

type ItensNotFoundProps = {
  title: string;
  description?: string;
  className?: string;
};

const ItensNotFoundVariants = tv({
  base: "flex flex-col items-center justify-center mt-24 text-center gap-2 px-4"
});

export default function ItensNotFound({
  title,
  description,
  className
}: ItensNotFoundProps) {
  return (
    <div className={ItensNotFoundVariants({ className })}>
      <Tag size={70} color="#6b7280" />

      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

      <p className="text-gray-400/50 max-w-md">{description}</p>
    </div>
  );
}
