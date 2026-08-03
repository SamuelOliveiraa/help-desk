import { CalendarClock, LayoutGrid, ReceiptText, Users } from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Gestão Visual de Chamados",
    text: "Acompanhe o status em tempo real com identificadores claros por cores.",
  },
  {
    icon: CalendarClock,
    title: "Painel de Técnicos & Horários",
    text: "Controle a disponibilidade da sua equipe de suporte por horários definidos.",
  },
  {
    icon: Users,
    title: "Multi-Perfil (Admin, Técnico e Cliente)",
    text: "Visões personalizadas e permissões sob medida para cada usuário.",
  },
  {
    icon: ReceiptText,
    title: "Histórico e Valores de Serviços",
    text: "Transparência total com registros de preço por tipo de atendimento.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-5 py-10 md:py-12 lg:px-0"
    >
      <div className="max-w-2xl">
        <p className="label-xs text-blue-400">Recursos principais</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tudo que seu suporte precisa, em um só lugar
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Ferramentas objetivas para reduzir ruído, ganhar previsibilidade e
          resolver mais rápido.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map(f => (
          <article
            key={f.title}
            className="card-lift rounded-2xl border border-border/60 bg-white p-6 shadow-soft"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-400/30 text-blue-500 ">
              <f.icon className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <h3 className="mt-5 text-base font-semibold leading-snug text-foreground">
              {f.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {f.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
