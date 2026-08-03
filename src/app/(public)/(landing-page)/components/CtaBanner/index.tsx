import Button from "@/components/common/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section
      id="plans"
      className="mx-auto max-w-7xl px-5 pb-16 md:pb-24 lg:px-0"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(140deg,oklch(0.223_0.016_268.9)_0%,oklch(0.196_0.015_266.8)_60%,oklch(0.28_0.06_268)_100%)] px-6 py-14 text-center sm:px-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        />
        <div className="mx-auto max-w-2xl flex items-center flex-col gap-4">
          <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3 py-1.5 text-xs font-semibold text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            Comece grátis, sem compromisso
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
            Pronto para levar seu atendimento ao próximo nível?
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Centralize chamados, técnicos e clientes hoje mesmo — e veja seu
            tempo de resposta cair pela metade.
          </p>
          <Link href="/register">
            <Button
              variant="secondary"
              className="mx-auto hover:opacity-90 hover:bg-gray-500"
            >
              Criar Conta Agora
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
