# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Mantenha curto e humano.** Para regras determinísticas, use `settings.json`.
> Para conhecimento sob demanda, use `.claude/skills/`.

## O que é

Landing page single-page de captação para a **Orizon Facilities** (terceirização de serviços
condominiais: limpeza, manutenção predial, jardinagem, controle de acesso). Sem backend — a conversão
acontece via WhatsApp (link direto ou formulário que monta a mensagem e abre `wa.me`).

> ℹ️ **Nota:** `README.md` na raiz documenta o *Claude Code Starter Pack* (o template de
> `.claude/` deste repo), não o produto Orizon Facilities.

## Stack

- **Frontend:** React 19 + TypeScript, Vite, **Tailwind CSS v4** via `@tailwindcss/vite`
  — não há `tailwind.config.ts`; os tokens vivem em `src/styles/index.css` (`@theme`).
- **Testes:** Vitest
- **Runtime:** Node.js 22 LTS

## Identidade visual

Tokens definidos em `src/styles/index.css` (`@theme`) — fonte da verdade:

- **Navy** `--color-navy` `#18293C` — cor primária, texto, fundos escuros
- **Dourado** `--color-gold` `#C5985B` — acento, CTAs, detalhes
- **Cinza** `--color-graymid` `#8F98A1` — texto secundário, bordas
- **Off-white** `--color-offwhite` `#F7F8FA` — fundo de seções claras

Dois tokens derivados existem só para contraste AA sobre fundo claro (o dourado e o cinza da
marca reprovam WCAG sobre off-white/branco): `--color-gold-text` `#896431` e
`--color-graytext` `#5F6C79`. Regra prática: `text-gold`/`text-graymid` só sobre fundo navy;
sobre fundo claro use `text-gold-text`/`text-graytext` (ver uso em
`src/components/SectionHeading.tsx`).

Tipografia: **Sora** (`--font-display`, títulos) e **Archivo** (`--font-body`, texto), via
`@fontsource-variable`.

## Comandos essenciais

```bash
npm install              # instala deps
npm run dev               # sobe dev server (Vite)

npm run lint              # eslint
npm run typecheck         # tsc -b --noEmit
npm run test               # vitest run (todos os testes)
npm run test:watch        # vitest em watch mode

npm run build              # tsc -b && vite build
npm run preview             # serve o build de produção localmente
```

Rodar um teste específico (não há script dedicado — use `npx vitest` direto):

```bash
npx vitest run src/lib/whatsapp.test.ts        # um arquivo
npx vitest run -t "rejeita número muito curto"  # um `it` pelo nome
```

## Arquitetura

- `src/App.tsx` é o índice da página: monta as ~10 seções em uma ordem deliberada (documentada
  no comentário do arquivo, baseada em pesquisa de CRO/copywriting). Reordenar seções é decisão
  de produto, não refactor mecânico.
- `src/config/site.ts` é a **única** fonte de dados da empresa (telefone, WhatsApp, e-mail,
  CNPJ). Nenhum outro arquivo deve hardcodar esses valores.
- `src/lib/whatsapp.ts` centraliza a lógica de contato: `buildWhatsAppLink()` monta o link
  `wa.me`, `montarMensagemContato()` monta a mensagem do formulário. O form em
  `src/sections/CTAFinal.tsx` não faz POST a lugar nenhum — só monta a mensagem e abre o
  WhatsApp. É o único fluxo do site com lógica testada (`src/lib/whatsapp.test.ts`).
- Scroll-reveal é **CSS-first**: a animação real é `.reveal` com `animation-timeline: view()`
  (`src/styles/index.css`). `src/components/Reveal.tsx` + `src/lib/use-in-view.ts` existem só
  como fallback via `IntersectionObserver` para navegadores sem scroll-driven animations
  (Firefox, hoje). Invariante a preservar: o conteúdo é visível por padrão — nunca em branco se
  o fallback falhar.
- `src/components/WhatsAppFab.tsx` só renderiza depois que o hero (`#topo`) sai da viewport,
  para não sobrepor o CTA do próprio hero em telas baixas. `Footer` tem padding extra para não
  cobrir o último elemento focável (WCAG 2.4.11).
- Imagens ficam em `public/images/*.webp` com `srcSet` em múltiplas resoluções; os originais em
  maior resolução ficam em `assets-originais/` (fora de `public/`, não vão para o build). O
  hero é o elemento de LCP da página — tem preload dedicado em `index.html`. Ver
  `docs/CREDITOS-IMAGENS.md` para a origem de cada imagem.

## Restrições de conteúdo (não óbvias no código)

- **Vocabulário proibido:** "vigilância", "ronda", "segurança patrimonial" não podem aparecer em
  nenhum lugar da página — a Orizon não tem a autorização de funcionamento da Polícia Federal
  exigida pela Lei nº 14.967/2024 para vigilância patrimonial. O 4º serviço se chama
  "Controle de Acesso e Monitoramento" (ver comentário em `src/sections/Servicos.tsx`).
- **Placeholders que não podem ir ao ar:** checklist completo do que falta antes de publicar
  (dados da empresa, prazos do FAQ, foto do card "Manutenção Predial"): `docs/CONTEUDO-PENDENTE.md`.

## Convenções

- **Branches:** `feat/<slice>-<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **PRs:** Sempre referencie a issue, descreva o "porquê", não só o "o quê"
- **Tests:** TDD onde a complexidade pede; testes lêem como spec

## Quando pedir ajuda

- Para revisão: invoque a skill `code-review-b2`.
- Para auditoria de segurança: invoque a skill `security-check`.
- Para UI/componentes de página: invoque `frontend-design` (visual distinto) ou
  `frontend-ui-engineering` (a11y/responsividade/produção).
- Para features novas ou requisitos ambíguos: invoque `spec-driven-development`
  antes de codar.
- Para commitar: invoque a skill `commit` (nunca dá push sozinha).
- Para regras determinísticas (formatação, secrets, comandos perigosos): já há hooks rodando.

## O que NÃO fazer

- Não criar arquivos `.env*` — este projeto não tem backend/secrets; se algum dia precisar,
  use Secret Manager / Supabase secrets.
- Não usar `any` em TypeScript sem comentário justificando (`@typescript-eslint/no-explicit-any`
  já bloqueia isso no lint).
- Não hardcodar hex no JSX — use as classes do tema (`bg-navy`, `text-gold`, `text-gold-text`,
  `text-graytext`).
- Não hardcodar telefone/WhatsApp/CNPJ/números fora de `src/config/site.ts`.
- Não adicionar deps sem rodar audit primeiro.
