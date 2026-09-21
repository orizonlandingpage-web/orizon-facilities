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
  `vite.config.ts` importa `structured-data.ts`, `site.ts` e `faq.ts` direto no topo do
  arquivo — ou seja, esses três módulos são avaliados **em Node, antes de `vite build`
  rodar**, para gerar o JSON-LD e o `<noscript>` do GTM via `transformIndexHtml`.
  Invariante: eles não podem referenciar `window`/`document` nem importar CSS/asset no
  escopo do módulo — isso quebra `npm run dev` e `npm run build` já no carregamento da
  config, com um erro que não aponta pra causa óbvia.
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
- **Analytics e consentimento** — o default de consentimento e o carregamento do GTM
  acontecem em **`public/consent-init.js`**, um `<script>` clássico (sem `type="module"`,
  sem `async`/`defer`) referenciado em `index.html` — precisa ser o primeiro `<script>` do
  `<head>` que roda antes do bundle React, porque `<script type="module">` (como
  `src/main.tsx`) tem semântica `defer` e o Google Tag Manager precisa enxergar o
  `gtag('consent', 'default', ...)` de forma síncrona (confirmado via Google Tag
  Assistant — sem isso, o GTM processa o consentimento como implícito mesmo com o comando
  presente no `dataLayer`). Não é `<script>` inline: a CSP não tem `'unsafe-inline'` (ver
  `vercel.json`), então tem que ser um arquivo estático de mesma origem (`'self'`), não
  processado pelo build/TypeScript — por isso o ID do GTM e a chave/formato de
  consentimento (`orizon-cookie-consent`, JSON `{ analytics: boolean, ads: boolean }`)
  estão replicados à mão nesse arquivo, batendo com `site.analytics.gtm`
  (`src/config/site.ts`) e o tipo `ConsentPreferences`/`STORAGE_KEY` de
  `src/lib/cookieConsent.ts`. Os três lados são checados por teste
  (`src/lib/consent-init.test.ts`) — atualizar os três juntos se algum desses valores
  mudar. O GA4 (`G-VGHZQPR2RB`) **não** tem `gtag.js` próprio: é uma tag de configuração
  dentro do container GTM, que lê o mesmo `dataLayer`. `src/lib/analytics.ts` (chamado em
  `src/main.tsx`) só cuida da resposta ao banner de cookies
  (`src/components/CookieConsent.tsx`) **em tempo real**, propagada via
  `subscribeToConsentChange()` (`src/lib/cookieConsent.ts`) — o mesmo hook que o
  `WhatsAppFab` já usava para se esconder enquanto o banner não foi respondido. O
  `<noscript>` do GTM entra pelo plugin `transformIndexHtml` de `vite.config.ts`, que
  também injeta o JSON-LD.

  O consentimento é granular por categoria (Análise / Publicidade), não binário — o
  banner tem um segundo passo "Personalizar" com um checkbox por categoria, e um botão
  "Preferências de cookies" no `Footer` reabre o banner a qualquer momento (dispara
  `abrirPreferenciasDeCookies()`/`subscribeToOpenPreferences()` de `cookieConsent.ts`).

  Os únicos eventos de conversão disparados **pelo código** são `generate_lead_form()`
  (formulário do `CTAFinal`, logo antes do `window.open()` que abre o WhatsApp — sem
  nenhum dado pessoal do formulário no payload) e `click_to_call` (cliques em `tel:`, no
  `Header` e no `Footer`). Os 3 CTAs que são links diretos de WhatsApp (`Header`, `Hero`,
  `WhatsAppFab`) **não** disparam nada pelo código — o GTM já captura esses cliques
  sozinho, nativamente, pelo gatilho de "clique em link" configurado no container para
  URLs contendo `wa.me`, como evento `generate_lead_whatsapp`. Isso só funciona porque são
  `<a href="wa.me/...">` de verdade; o formulário abre o WhatsApp via `window.open()`
  programático — sem `<a>` sendo clicado —, por isso só ele precisa do evento manual.
  Reintroduzir um evento de clique nesses 3 links duplicaria a conversão que o GTM já
  registra.
- **Testes** — não há `vitest.config.ts`; o ambiente padrão do Vitest é `node`. Teste
  que toca `window`/DOM opta por `jsdom` só no próprio arquivo, via
  `// @vitest-environment jsdom` na primeira linha (`src/lib/analytics.test.ts`).
  `src/lib/whatsapp.test.ts` cobre o único fluxo com lógica de negócio real do site;
  `src/lib/structured-data.test.ts` é o que trava a restrição de vocabulário abaixo.
  `src/lib/consent-init.test.ts` é a única rede de proteção de `public/consent-init.js`
  (fora do `include` de eslint e `tsc`, ver `CLAUDE.md`): executa o script estático de
  verdade via `new Function()` em jsdom e confere a ordem dos `<script>` em `index.html`.

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
