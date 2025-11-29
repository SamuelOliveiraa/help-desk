# [Help Desk](https://help-desk-samuel.vercel.app/login)

![Imagem do Projeto Help Desk](public/og-image.png)

Aplicação web construída com Next.js para centralizar o atendimento de suporte técnico. O sistema oferece portais distintos para administradores, usuários e técnicos, permitindo a abertura, o acompanhamento e a resolução de chamados com controle de acesso baseado em papéis.

## Sumário

- [Visão Geral](#visão-geral)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
  - [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Banco de Dados e Prisma](#banco-de-dados-e-prisma)
  - [Executando o Projeto](#executando-o-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Roadmap e Melhorias](#roadmap-e-melhorias)
- [Licença](#licença)

## Visão Geral

O Help Desk concentra a gestão completa do ciclo de vida de um chamado: criação, priorização, atribuição para técnicos, execução e encerramento. Todas as operações internas são protegidas por autenticação com JWT armazenado em cookies, enquanto o middleware do Next.js garante que cada usuário acesse apenas as rotas correspondentes ao seu papel.

## Principais Funcionalidades

- Autenticação com e-mail e senha e emissão de tokens JWT seguros.
- Painéis exclusivos para `admin`, `user` e `technician` com redirecionamento automático após o login.
- Abertura de chamados pelos usuários com seleção de serviços, cálculo automático do valor e resumo do pedido.
- Gestão de tickets pelo administrador: visualização por status (`open`, `inProgress`, `finished`) e acesso aos detalhes.
- Catálogo de serviços com possibilidade de ativação/desativação e definição de valores.
- Integração com Prisma ORM para manipulação de usuários, serviços, subserviços e tickets em banco PostgreSQL.
- UI responsiva construída com componentes Radix UI, Tailwind CSS e design system próprio.

## Tecnologias

- Next.js 15 (App Router)
- React 19 com TypeScript
- Tailwind CSS e Tailwind Merge
- Prisma ORM + PostgreSQL
- Radix UI (Dialog, Dropdown, Select, Tooltip, etc.)
- React Hook Form e React Hot Toast
- Axios para integrações com as rotas internas de API
- JSON Web Tokens com a biblioteca `jose`

## Pré-requisitos

- Node.js 18 ou superior
- NPM (ou Yarn/PNPM/Bun, se preferir)
- Banco de dados PostgreSQL acessível
- Conta com permissões para executar migrações Prisma no banco configurado

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/help-desk.git
   cd help-desk
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
   > Caso prefira outro gerenciador de pacotes, adapte os comandos (`yarn`, `pnpm`, `bun`).

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou `.env.local`, se preferir manter separado do versionamento) com as configurações abaixo:

```
DATABASE_URL="postgresql://usuario:senha@host:5432/nome_do_banco"
DIRECT_URL="postgresql://usuario:senha@host:5432/nome_do_banco"
JWT_SECRET="uma_chave_bem_secreta_e_complexa"
```

- `DATABASE_URL`: utilizada pelo Prisma para conectar ao banco principal.
- `DIRECT_URL`: conexão direta usada por ferramentas como Prisma Studio; pode ser igual à `DATABASE_URL`.
- `JWT_SECRET`: chave usada para assinar e validar os tokens JWT. Altere para um valor robusto; o fallback presente no código serve apenas para desenvolvimento.

### Banco de Dados e Prisma

1. Aplique as migrações existentes ou crie novas:
   ```bash
   npx prisma migrate dev
   ```
2. Gere o client Prisma:
   ```bash
   npx prisma generate
   ```
3. (Opcional) Utilize o Prisma Studio para inspecionar os dados:
   ```bash
   npx prisma studio
   ```

As migrações atuais criam as tabelas de usuários, serviços, subserviços e tickets, além dos enums de papéis (`admin`, `user`, `technician`) e status de chamados.

### Executando o Projeto

- Ambiente de desenvolvimento:

  ```bash
  npm run dev
  ```

  A aplicação ficará disponível em `http://localhost:3000`.

- Build de produção:
  ```bash
  npm run build
  npm run start
  ```

## Scripts Disponíveis

- `npm run dev`: inicia o servidor Next.js em modo de desenvolvimento.
- `npm run build`: gera o client do Prisma, compila a aplicação e executa o type-check.
- `npm run start`: inicia o servidor em modo de produção (requer build prévio).
- `npm run lint`: executa o ESLint com as regras definidas pelo Next.js/TypeScript.

## Estrutura de Pastas

```
.
├── prisma/               # Schema do Prisma, migrações e base de dados local
├── public/               # Assets estáticos (logos, favicon, imagens)
└── src/
    ├── app/              # Rotas públicas e privadas (App Router)
    │   ├── api/          # Rotas de API (login, usuários, tickets, serviços)
    │   ├── (public)/     # Páginas de autenticação (login e register)
    │   └── (private)/    # Dashboards para admin, user e technician
    ├── components/       # Design system e componentes compartilhados
    ├── lib/              # Serviços de API, autenticação e utilitários Prisma
    ├── types/            # Tipagens compartilhadas
    └── utils/            # Helpers de formatação, cookies e autenticação
```

## Autenticação e Autorização

- O login gera um token JWT armazenado em cookie com validade de 3 dias.
- O middleware (`src/middleware.ts`) intercepta todas as rotas privadas, validando o token.
- Usuários sem token válido são redirecionados para `/login`.
- Após a validação, o middleware redireciona automaticamente cada usuário para o dashboard correspondente ao papel:
  - `/dashboard/admin`
  - `/dashboard/user`
  - `/dashboard/technician`

## Roadmap e Melhorias

- ✅ Cadastro e autenticação com controle de papéis.
- ✅ Fluxo completo de abertura e acompanhamento de chamados.
- 🔜 Implementar notificações por e-mail.
- 🔜 Adicionar o react query no projeto para melhorar o desempenho e cache.
- 🔜 Adicionar testes automatizados (unitários e e2e).

## Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).
