import Image from "next/image";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  links: NavLink[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Produto",
    links: [
      { label: "Recursos", href: "#resources" },
      { label: "Como Funciona", href: "#services" },
      { label: "Planos", href: "#plans" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre o HelpDesk", href: "/#top" },
      { label: "Contato", href: "/#top" },
      { label: "Suporte", href: "/#top" },
      { label: "Status do Sistema", href: "/#top" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/privacy-policy" },
      { label: "Termos de Uso", href: "/terms-of-use" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {/* Conteúdo Principal */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand & Descrição */}
          <div>
            <Link href="/" aria-label="Ir para a página inicial">
              <Image
                src="/logo-help-desk.png"
                alt="Logo do HelpDesk"
                width={170}
                height={170}
                priority
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sistema de HelpDesk para organizar chamados, equipes e horários de
              atendimento.
            </p>
          </div>

          {/* Links de Navegação */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {NAV_GROUPS.map(group => (
              <div key={group.title}>
                <p className="label-xs text-subtle-foreground font-semibold">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-subtle-foreground">
            © {currentYear} HelpDesk. Todos os direitos reservados.
          </p>
          <p className="text-xs text-subtle-foreground">
            Feito para equipes de suporte exigentes.
          </p>
        </div>
      </div>
    </footer>
  );
}
