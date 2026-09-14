# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Mantenha curto e humano.** Para regras determinísticas, use `settings.json`.
> Para conhecimento sob demanda, use `.claude/skills/`.
> Para arquitetura, identidade visual e restrições de conteúdo do projeto, ver
> **`docs/ARQUITETURA.md`** — leia esse arquivo antes de mexer em código.

## O que é

Landing page single-page de captação para a **Orizon Facilities** (terceirização de serviços
condominiais: limpeza, manutenção predial, jardinagem, controle de acesso). Sem backend — a
conversão acontece via WhatsApp (link direto ou formulário que monta a mensagem e abre `wa.me`).

## Stack

- **Frontend:** React 19 + TypeScript, Vite, **Tailwind CSS v4** via `@tailwindcss/vite`
  — não há `tailwind.config.ts`; os tokens vivem em `src/styles/index.css` (`@theme`).
- **Testes:** Vitest
- **Runtime:** Node.js 22 LTS

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
- Não duplicar em `CLAUDE.md` o que já está em `docs/ARQUITETURA.md` — atualize lá.
