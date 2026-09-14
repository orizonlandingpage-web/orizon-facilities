# Arquitetura e decisões do projeto

Este documento reúne as decisões de arquitetura, identidade visual e restrições de
conteúdo do site institucional da Orizon Facilities — o que qualquer pessoa dando
manutenção no projeto precisa saber antes de mexer no código.

## O que é

Landing page single-page de captação para a **Orizon Facilities** (terceirização de serviços
condominiais: limpeza, manutenção predial, jardinagem, controle de acesso). Sem backend — a
conversão acontece via WhatsApp (link direto ou formulário que monta a mensagem e abre `wa.me`).

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

## Arquitetura

- `src/App.tsx` é o índice da página: monta as ~10 seções em uma ordem deliberada (documentada
  no comentário do arquivo, baseada em pesquisa de CRO/copywriting). Reordenar seções é decisão
  de produto, não refactor mecânico.
- `src/config/site.ts` é a **única** fonte de dados da empresa (telefone, WhatsApp, e-mail,
  CNPJ, região atendida, URL do site). Nenhum outro arquivo deve hardcodar esses valores.
- `src/lib/whatsapp.ts` centraliza a lógica de contato: `buildWhatsAppLink()` monta o link
  `wa.me`, `montarMensagemContato()` monta a mensagem do formulário. O form em
  `src/sections/CTAFinal.tsx` não faz POST a lugar nenhum — só monta a mensagem e abre o
  WhatsApp. É um dos dois fluxos do site com lógica testada (`src/lib/whatsapp.test.ts`).
- Scroll-reveal é **CSS-first**: a animação real é `.reveal` com `animation-timeline: view()`
  (`src/styles/index.css`). `src/components/Reveal.tsx` + `src/lib/use-in-view.ts` existem só
  como fallback via `IntersectionObserver` para navegadores sem scroll-driven animations
  (Firefox, hoje). Invariante a preservar: o conteúdo é visível por padrão — nunca em branco se
  o fallback falhar.
- **SEO** tem duas fontes, ambas derivadas de `src/config/site.ts`: `index.html` (metatags
  estáticas — title, description, canonical, Open Graph) e `src/lib/structured-data.ts`
  (JSON-LD `ProfessionalService`/`WebSite`/`FAQPage`, injetado no `<head>` do build pelo
  plugin em `vite.config.ts`, não em runtime — por isso `src/sections/FAQ.tsx` não renderiza
  `<script type="application/ld+json">` próprio). As perguntas do FAQ vivem em
  `src/config/faq.ts`, consumidas pelos dois. `public/robots.txt` e `public/sitemap.xml`
  têm o domínio (`site.url`) escrito literalmente — atualizar junto se ele mudar.
- `src/components/WhatsAppFab.tsx` só renderiza depois que o hero (`#topo`) sai da viewport,
  para não sobrepor o CTA do próprio hero em telas baixas. `Footer` tem padding extra para não
  cobrir o último elemento focável (WCAG 2.4.11).
- Imagens ficam em `public/images/*.webp` com `srcSet` em múltiplas resoluções; os originais em
  maior resolução ficam em `assets-originais/` (fora de `public/`, não vão para o build). O
  hero é o elemento de LCP da página — tem preload dedicado em `index.html`. Ver
  `docs/CREDITOS-IMAGENS.md` para a origem de cada imagem.
- **Deploy (Vercel)** — `vercel.json` define headers de segurança (CSP; X-Frame-Options; HSTS)
  e `Cache-Control` explícito, já que a Vercel não garante cache longo automático para build
  do Vite como garante para Next.js: `immutable` para `/assets/*` (hash no nome, gerado a cada
  build) e cache curto com revalidação para `/images/*` (nomes fixos). A CSP libera só os
  hosts do Google necessários para analytics (ver bullet abaixo) — qualquer script de
  terceiro novo precisa de uma entrada explícita em `script-src`/`connect-src`/etc., já que
  não há `'unsafe-inline'`.
- **Analytics e consentimento** — GA4 e GTM (`src/config/site.ts` → `site.analytics`) são
  inicializados por `src/lib/analytics.ts`, chamado uma vez em `src/main.tsx`, usando
  **Google Consent Mode v2**: os scripts sempre carregam, mas com todo sinal
  (`ad_storage`/`ad_user_data`/`ad_personalization`/`analytics_storage`) em `denied` até o
  visitante responder ao banner de cookies (`src/components/CookieConsent.tsx`). A resposta
  do banner propaga em tempo real via `subscribeToConsentChange()`
  (`src/lib/cookieConsent.ts`) — o mesmo hook que o `WhatsAppFab` já usava para se esconder
  enquanto o banner não foi respondido. O script principal do GTM/GA4 é injetado via
  `document.createElement('script')` dentro do bundle (não como `<script>` inline no HTML) de
  propósito: a CSP não tem `'unsafe-inline'`, então qualquer tag colada direto no `index.html`
  seria bloqueada em produção. O `<noscript>` do GTM entra pelo mesmo plugin
  `transformIndexHtml` de `vite.config.ts` que já injeta o JSON-LD. `trackWhatsAppClick()`
  dispara o evento `contato_whatsapp` nos 4 pontos de conversão (Header, Hero, WhatsAppFab,
  formulário do CTAFinal) — a única conversão real do site, sem página de obrigado.

## ⚠️ Restrição de conteúdo — não óbvia no código

**Vocabulário proibido:** "vigilância", "ronda", "segurança patrimonial" não podem aparecer em
nenhum lugar da página — a Orizon não tem a autorização de funcionamento da Polícia Federal
exigida pela Lei nº 14.967/2024 para vigilância patrimonial. O 4º serviço se chama
"Controle de Acesso e Monitoramento" (ver comentário em `src/sections/Servicos.tsx`).

Essa restrição é travada por teste automatizado: `src/lib/structured-data.test.ts` falha se
qualquer um desses termos aparecer no JSON-LD gerado a partir de `src/config/faq.ts` e
`src/config/site.ts`. Se for reintroduzir esse serviço no futuro (a Orizon obtiver a
autorização), revisar `src/sections/Servicos.tsx`, a copy do hero e o teste acima juntos.

**Checklist de conteúdo pendente antes de publicar** (dados reais da empresa, prazos do FAQ):
`docs/CONTEUDO-PENDENTE.md`.

## Convenções

- **Branches:** `feat/<slice>-<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **Tests:** TDD onde a complexidade pede; testes lêem como spec
