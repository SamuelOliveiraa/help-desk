import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "2 de agosto de 2026";

  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* Header Simples de Navegação */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-white/80 backdrop-blur-md">
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

      {/* Conteúdo Principal */}
      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        {/* Título da Página */}
        <header className="border-b border-border/60 pb-8">
          <p className="label-xs font-semibold text-primary">
            Conformidade e Segurança
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Última atualização: {lastUpdated}
          </p>
        </header>

        {/* Seções da Política */}
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-foreground">
              1. Introdução
            </h2>
            <p className="mt-2">
              A sua privacidade é fundamental para nós. Esta Política de
              Privacidade explica como o **HelpDesk** coleta, usa, armazena e
              protege os seus dados pessoais quando você utiliza nossa
              plataforma SaaS, em conformidade com a Lei Geral de Proteção de
              Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              2. Dados Coletados
            </h2>
            <p className="mt-2">
              Coletamos apenas as informações estritamente necessárias para a
              prestação do serviço:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong>Dados de Cadastro:</strong> Nome completo, endereço de
                e-mail e senha criptografada.
              </li>
              <li>
                <strong>Dados operacionais:</strong> Conteúdo dos chamados de
                suporte, históricos de atendimento e valores atrelados aos
                serviços.
              </li>
              <li>
                <strong>Dados Técnicos:</strong> Endereço IP, tipo de navegador,
                sistema operacional e registros de acesso para fins de
                auditabilidade e segurança.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              3. Finalidade do Tratamento dos Dados
            </h2>
            <p className="mt-2">
              Utilizamos os seus dados exclusivamente para as seguintes
              finalidades:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Identificar e autenticar usuários no sistema (administradores,
                técnicos e clientes);
              </li>
              <li>
                Permitir o gerenciamento, atribuição e resolução de chamados de
                suporte;
              </li>
              <li>
                Enviar notificações essenciais sobre atualizações no status dos
                chamados;
              </li>
              <li>
                Garantir a segurança da plataforma e prevenir fraudes ou acessos
                não autorizados.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              4. Compartilhamento de Dados
            </h2>
            <p className="mt-2">
              O HelpDesk **não vende nem aluga** seus dados pessoais a
              terceiros. O compartilhamento ocorre apenas quando estritamente
              necessário para a operação do sistema, como provedores de
              infraestrutura de nuvem, banco de dados e gateways de pagamento,
              ou por força de obrigação legal.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              5. Armazenamento e Segurança
            </h2>
            <p className="mt-2">
              Adotamos medidas técnicas e organizacionais adequadas para
              proteger seus dados pessoais, incluindo criptografia de senhas,
              conexões seguras via HTTPS/TLS e controles restritos de acesso à
              base de dados.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              6. Seus Direitos (LGPD)
            </h2>
            <p className="mt-2">
              Como titular dos dados, você possui o direito de:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                Confirmar a existência do tratamento e acessar seus dados;
              </li>
              <li>
                Solicitar a correção de dados incompletos, inexatos ou
                desatualizados;
              </li>
              <li>
                Solicitar a exclusão ou anonimização de dados desnecessários;
              </li>
              <li>
                Revogar o consentimento para o tratamento de dados a qualquer
                momento.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              7. Uso de Cookies
            </h2>
            <p className="mt-2">
              Utilizamos cookies essenciais apenas para manter sua sessão ativa
              com segurança e memorizar suas preferências de navegação. Não
              utilizamos cookies de rastreamento para fins publicitários de
              terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground">
              8. Encarregado de Dados (DPO) e Contato
            </h2>
            <p className="mt-2">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta
              Política de Privacidade, entre em contato com a nossa equipe pelo
              e-mail{" "}
              <a
                href="mailto:privacidade@helpdesk.com.br"
                className="font-medium text-primary hover:underline"
              >
                privacidade@helpdesk.com.br
              </a>
              .
            </p>
          </section>
        </div>

        {/* Card de Ação no Final */}
        <div className="mt-12 rounded-2xl border border-border/60 bg-muted/40 p-6 text-center">
          <p className="text-xs text-muted-foreground">
            Deseja entender as regras de utilização do sistema?
          </p>
          <Link
            href="/terms-of-use"
            className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Consulte nossos Termos de Uso &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
