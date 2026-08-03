"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  PlusCircle,
  Send,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import TicketStatus from "@/components/TicketStatus";
import { Status } from "@/types/tickets";
import Button from "@/components/common/Button";
import Link from "next/link";

// --- TIPOS ---
type TabId = "admin" | "tecnico" | "cliente";

interface TabItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
  headline: string;
  bullets: string[];
}

// --- DADOS FIXOS ---
const TABS: TabItem[] = [
  {
    id: "admin",
    label: "Visão do Administrador",
    icon: ShieldCheck,
    headline:
      "Gerenciamento centralizado de clientes, serviços e atribuição de chamados.",
    bullets: [
      "Cadastro de clientes e catálogo de serviços com valores",
      "Atribuição de chamados por técnico e prioridade",
      "Relatórios de volume, tempo médio e encerramentos",
    ],
  },
  {
    id: "tecnico",
    label: "Visão do Técnico",
    icon: UserCheck,
    headline: "Cards intuitivos para iniciar e encerrar chamados com 1 clique.",
    bullets: [
      "Fila pessoal com horários de atendimento do dia",
      "Iniciar, pausar e encerrar sem sair da tela",
      "Registro automático de tempo e histórico técnico",
    ],
  },
  {
    id: "cliente",
    label: "Visão do Cliente",
    icon: ClipboardList,
    headline:
      "Formulário limpo e sem distrações para abrir novos chamados instantaneamente.",
    bullets: [
      "Abertura de chamado em menos de 30 segundos",
      "Acompanhamento do status em tempo real",
      "Histórico completo de atendimentos e valores",
    ],
  },
];

const ADMIN_TICKETS: {
  id: number;
  title: string;
  tech: string;
  status: Status;
}[] = [
  {
    id: 1,
    title: "Alpha Log — servidor de e-mail",
    tech: "Marina R.",
    status: "open",
  },
  {
    id: 2,
    title: "Mercado Sul — impressora fiscal",
    tech: "Diego F.",
    status: "inProgress",
  },
  {
    id: 3,
    title: "Grupo Vertex — backup semanal",
    tech: "Ana P.",
    status: "finished",
  },
];

const TECH_TICKETS: {
  id: number;
  title: string;
  action: string;
  status: Status;
}[] = [
  {
    id: 1,
    title: "#4818 Impressora fiscal",
    action: "Encerrar chamado",
    status: "inProgress",
  },
  {
    id: 2,
    title: "#4821 Servidor de e-mail",
    action: "Iniciar atendimento",
    status: "open",
  },
];

// --- SUBCOMPONENTES DE PAINEL ---
function AdminPanel() {
  return (
    <div className="space-y-2.5">
      <p className="label-xs text-subtle-foreground">Atribuição de chamados</p>
      {ADMIN_TICKETS.map(ticket => (
        <div
          key={ticket.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border shadow-sm bg-background px-3.5 py-3"
        >
          <div>
            <p className="truncate text-sm font-semibold text-foreground">
              {ticket.title}
            </p>
            <p className="text-xs text-muted-foreground">
              Técnico: {ticket.tech}
            </p>
          </div>
          <div className="w-fit hidden sm:block">
            <TicketStatus variant={ticket.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TechPanel() {
  return (
    <div className="space-y-3">
      <p className="label-xs text-subtle-foreground">
        Minha fila · Hoje 08:00 – 18:00
      </p>
      {TECH_TICKETS.map(ticket => (
        <div
          key={ticket.id}
          className="rounded-xl border shadow-sm bg-background p-4 flex flex-col gap-3"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="truncate text-sm font-semibold text-foreground">
              {ticket.title}
            </p>
            <div className="w-fit hidden sm:block">
              <TicketStatus variant={ticket.status} />
            </div>
          </div>
          <Button className="w-full">
            <CheckCircle2 className="h-4 w-4" />
            {ticket.action}
          </Button>
        </div>
      ))}
    </div>
  );
}

function ClientPanel() {
  return (
    <div className="rounded-xl border border-border/60 bg-background p-5">
      <p className="label-xs text-subtle-foreground">Novo chamado</p>
      <div className="mt-4 space-y-3.5">
        <div>
          <label className="label-xs text-muted-foreground">Assunto</label>
          <div className="mt-1.5 rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm text-foreground">
            Internet instável na recepção
          </div>
        </div>
        <div>
          <label className="label-xs text-muted-foreground">
            Tipo de serviço
          </label>
          <div className="mt-1.5 rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm text-foreground">
            Suporte de rede · R$ 180,00
          </div>
        </div>
        <div>
          <label className="label-xs text-muted-foreground">Descrição</label>
          <div className="mt-1.5 h-20 rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm text-muted-foreground">
            Queda de conexão intermitente desde às 9h…
          </div>
        </div>
        <Button className="w-full">
          <Send className="h-4 w-4" />
          Abrir chamado
        </Button>
      </div>
    </div>
  );
}

function ActivePanel({ tabId }: { tabId: TabId }) {
  switch (tabId) {
    case "admin":
      return <AdminPanel />;
    case "tecnico":
      return <TechPanel />;
    case "cliente":
      return <ClientPanel />;
  }
}

// --- COMPONENTE PRINCIPAL ---
export function Services() {
  const [activeTabId, setActiveTabId] = useState<TabId>("admin");
  const currentTab = TABS.find(tab => tab.id === activeTabId) ?? TABS[0]!;

  return (
    <section id="services" className="my-20 border-y border-border/60 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24 lg:px-8">
        {/* Header da Seção */}
        <div className="max-w-2xl">
          <p className="label-xs text-blue-200">Como funciona na prática</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Uma interface para cada papel da operação
          </h2>
        </div>

        {/* Abas de Navegação */}
        <div
          id="para-quem-e"
          className="mt-10 flex flex-wrap gap-2 rounded-2xl border border-border/60 bg-background p-2"
        >
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTabId === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTabId(tab.id)}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-gray-500 shadow-soft"
                    : "text-gray-100 hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="mt-8 grid items-start gap-8 rounded-3xl border border-border/60 bg-background p-6 shadow-soft lg:grid-cols-2 lg:gap-14 lg:p-10">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {currentTab.headline}
            </h3>

            <ul className="space-y-3.5">
              {currentTab.bullets.map(bullet => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue-200" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="#plans" className="text-sm">
              <Button>
                <PlusCircle className="h-4 w-4" />
                Testar esta visão
              </Button>
            </Link>
          </div>

          <div className="min-w-0 rounded-2xl border border-border/60 bg-muted/50 p-4 sm:p-6">
            <ActivePanel tabId={activeTabId} />
          </div>
        </div>
      </div>
    </section>
  );
}
