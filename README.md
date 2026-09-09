# Orizon Facilities — site institucional

Landing page single-page de captação para a **Orizon Facilities**, empresa de terceirização de
serviços condominiais (limpeza, manutenção predial, jardinagem e controle de acesso) atuando em
Aracaju e região metropolitana.

Sem backend: a conversão acontece via WhatsApp — link direto ou formulário que monta a mensagem
e abre o `wa.me` no navegador.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **Tailwind CSS v4** (`@tailwindcss/vite` — tokens de tema em `src/styles/index.css`, sem
  `tailwind.config.ts`)
- **Vitest** para testes

## Como rodar

Requer Node.js 22 LTS.

```bash
npm install       # instala as dependências
npm run dev        # sobe o servidor de desenvolvimento (Vite)
```

Outros comandos:

```bash
npm run lint         # eslint
npm run typecheck     # checagem de tipos (tsc)
npm run test           # roda a suíte de testes (vitest)
npm run build           # build de produção (dist/)
npm run preview          # serve o build de produção localmente
```

## Estrutura do projeto

```
src/
  App.tsx              # monta as seções da página, em ordem deliberada (ver docs/ARQUITETURA.md)
  config/
    site.ts             # única fonte de dados da empresa (telefone, WhatsApp, e-mail, CNPJ...)
    faq.ts               # perguntas do FAQ (usadas na UI e no schema JSON-LD)
  lib/
    whatsapp.ts           # monta o link wa.me e a mensagem do formulário de contato
    structured-data.ts     # gera o JSON-LD (SEO) injetado no HTML de build
  sections/                # cada seção da página (Hero, Servicos, FAQ, ...)
  components/               # componentes reutilizáveis (Header, Footer, Reveal, ...)
docs/                        # decisões de projeto e pendências de conteúdo
public/                       # assets estáticos servidos como estão (imagens, robots.txt, ...)
assets-originais/               # imagens de marca em resolução maior, fora do build
```

Para decisões de arquitetura, identidade visual e a restrição de vocabulário sobre o serviço de
controle de acesso (relevante juridicamente — ver Lei nº 14.967/2024), consulte
**[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)**.

## Deploy

O projeto está configurado para deploy estático na **Vercel** (`vercel.json`): headers de
segurança (CSP, HSTS, anti-clickjacking) e `Cache-Control` para os assets de build.

## Antes de publicar

Há dados de placeholder que precisam ser substituídos pelos dados reais da empresa antes do
site ir ao ar (CNPJ, prazos do FAQ, etc.) — checklist completo em
[`docs/CONTEUDO-PENDENTE.md`](docs/CONTEUDO-PENDENTE.md).
