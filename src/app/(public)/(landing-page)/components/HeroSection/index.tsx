import { ArrowRight, PlayCircle, Zap } from "lucide-react";
import Link from "next/link";
import { DashboardMockup } from "../DashboardMockup";
import Button from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section id="hero-section" className="flex items-center">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:px-0">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-white px-3 py-1.5 text-xs font-semibold text-blue-400 shadow-soft">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.6} />
            Gestão de Suporte Descomplicada
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            O sistema de HelpDesk definitivo para{" "}
            <span className="text-blue-400 ">organizar seus chamados</span> e
            equipe.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Acompanhe solicitações, atribua técnicos, controle horários de
            atendimento e entregue suporte de excelência aos seus clientes.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#plans">
              <Button>
                Começar Gratuitamente
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="link" className="border-black/20">
                <PlayCircle className="size-4" />
                Ver Demonstração
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Sem cartão de crédito · Configure sua equipe em minutos
          </p>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}
