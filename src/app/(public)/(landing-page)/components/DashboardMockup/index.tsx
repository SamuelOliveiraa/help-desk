import TicketStatus from "@/components/TicketStatus";
import { Status } from "@/types/tickets";
import { Clock, Filter, LayoutGrid, Search, UserCheck } from "lucide-react";

interface TicketDashboardMockup {
  id: string;
  title: string;
  client: string;
  tech: string;
  status: Status;
  time: string;
}

const tickets: TicketDashboardMockup[] = [
  {
    id: "#4821",
    title: "Servidor de e-mail fora do ar",
    client: "Alpha Log",
    tech: "Marina R.",
    status: "open",
    time: "há 4 min",
  },
  {
    id: "#4818",
    title: "Impressora fiscal não responde",
    client: "Mercado Sul",
    tech: "Diego F.",
    status: "inProgress",
    time: "há 27 min",
  },
  {
    id: "#4809",
    title: "Instalação de VPN — 3 estações",
    client: "Nova Clínica",
    tech: "Ana P.",
    status: "inProgress",
    time: "há 1 h",
  },
  {
    id: "#4796",
    title: "Backup semanal validado",
    client: "Grupo Vertex",
    tech: "Marina R.",
    status: "finished",
    time: "ontem",
  },
];

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-md flex-1 hidden sm:block">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-gray-600/60 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-chart-4/40" />
        <span className="ml-3 truncate text-xs font-medium text-subtle-foreground">
          app.helpdesk.io / chamados
        </span>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col gap-4 bg-gray-100 px-3 py-5 sm:px-4">
          {[LayoutGrid, UserCheck, Clock, Filter].map((Icon, i) => (
            <span
              key={i}
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                i === 0
                  ? "bg-blue-200 text-sidebar-primary-foreground"
                  : "bg-gray-500 "
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
        </div>

        {/* content */}
        <div className="min-w-0 p-4 sm:p-6 bg-white">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="label-xs text-subtle-foreground">
                Fila de atendimento
              </p>
              <h3 className="truncate text-base font-bold text-foreground sm:text-lg">
                Chamados de hoje
              </h3>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Search className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { v: "12", l: "Abertos", c: "text-status-open-foreground" },
              { v: "07", l: "Em atend.", c: "text-status-progress-foreground" },
              { v: "38", l: "Encerrados", c: "text-status-closed-foreground" },
            ].map(k => (
              <div key={k.l} className="rounded-xl border shadow-sm p-2.5">
                <p className={`text-lg font-bold sm:text-xl ${k.c}`}>{k.v}</p>
                <p className="label-xs truncate text-subtle-foreground">
                  {k.l}
                </p>
              </div>
            ))}
          </div>

          <ul className="mt-4 space-y-2.5">
            {tickets.map(t => (
              <li
                key={t.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border shadow-sm bg-background px-3 py-3 transition-all duration-200 hover:border-primary/30 hover:shadow-soft"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    <span className="text-subtle-foreground">{t.id}</span>{" "}
                    {t.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {t.client} · {t.tech} · {t.time}
                  </p>
                </div>
                <TicketStatus variant={t.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
