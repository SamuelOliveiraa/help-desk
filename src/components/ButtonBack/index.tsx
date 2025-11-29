"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }
  return (
    <button
      type="button"
      className="w-fit flex items-center gap-2 cursor-pointer"
      onClick={handleBack}
    >
      <ArrowLeft />
      <span>Voltar</span>
    </button>
  );
}
