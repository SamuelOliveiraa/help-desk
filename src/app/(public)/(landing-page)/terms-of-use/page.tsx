import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "2 de agosto de 2026";

  return (
    <main className="min-h-screen bg-white text-foreground">
      <header className="border-b border-border/60 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o início
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <header className="border-b border-border/60 pb-8">
          <p className="label-xs text-primary font-semibold">Documento Legal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Última atualização: {lastUpdated}
          </p>
        </header>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">
              1. Aceitação dos Termos
            </h2>
            <p className="mt-2">
              Ao acessar e utilizar o sistema **HelpDesk**, você concorda em
              cumprir e estar vinculado a estes Termos de Uso. Caso não concorde
              com qualquer disposição aqui apresentada, solicitamos que não
              utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              2. Descrição do Serviço
            </h2>
            <p className="mt-2">
              O HelpDesk é uma solução SaaS destinada à gestão de chamados,
              suporte técnico e controle de atendimento. Reservamo-nos o direito
              de atualizar, modificar ou descontinuar recursos do sistema
              visando a melhoria contínua da experiência.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              3. Cadastro e Segurança da Conta
            </h2>
            <p className="mt-2">
              Para utilizar a plataforma, o usuário deve fornecer informações
              precisas e manter suas credenciais de acesso (e-mail e senha) sob
              sigilo. Você é inteiramente responsável por qualquer atividade
              realizada sob sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              4. Uso Aceitável
            </h2>
            <p className="mt-2">
              Você se compromete a utilizar a plataforma de forma ética e legal.
              É estritamente proibido:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Tentar violar a segurança ou autenticação do sistema;</li>
              <li>
                Inserir dados falsos, maliciosos ou de terceiros sem permissão;
              </li>
              <li>
                Utilizar o serviço para envio de spams ou comunicações não
                solicitadas;
              </li>
              <li>Praticar engenharia reversa no código do sistema.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              5. Planos e Pagamentos
            </h2>
            <p className="mt-2">
              O acesso aos recursos pagos do HelpDesk ocorre mediante
              assinatura. As condições de faturamento, renovação automática e
              cancelamento estão descritas na área de contratação do plano. A
              ausência de pagamento poderá acarretar a suspensão temporária dos
              serviços.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              6. Propriedade Intelectual
            </h2>
            <p className="mt-2">
              Todos os direitos relativos à marca, logotipo, código-fonte,
              design de interface e conteúdos do HelpDesk pertencem
              exclusivamente à plataforma. O uso do serviço não concede nenhuma
              licença ou transferência desses direitos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              7. Limitação de Responsabilidade
            </h2>
            <p className="mt-2">
              Empregamos nossos melhores esforços para manter a plataforma
              disponível 24/7. Contudo, não nos responsabilizamos por
              indisponibilidades temporárias decorrentes de falhas de provedores
              externos, manutenção programada ou eventos de força maior.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              8. Modificações nos Termos
            </h2>
            <p className="mt-2">
              Podemos alterar estes termos a qualquer momento. Alterações
              significativas serão notificadas através do sistema ou por e-mail.
              O uso continuado da plataforma após as mudanças constitui
              aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              9. Contato
            </h2>
            <p className="mt-2">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato
              conosco através do suporte pelo e-mail{" "}
              <a
                href="mailto:suporte@helpdesk.com.br"
                className="font-medium text-primary hover:underline"
              >
                suporte@helpdesk.com.br
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/40 p-6 text-center">
          <p className="text-xs text-muted-foreground">
            Dúvidas sobre como tratamos seus dados?
          </p>
          <Link
            href="/privacy-policy"
            className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Consulte nossa Política de Privacidade &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
