import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { buildStructuredData } from './src/lib/structured-data.ts';
import { site } from './src/config/site.ts';

/**
 * Injeta o JSON-LD (ProfessionalService + WebSite + FAQPage) direto no HTML
 * de build, antes de </head>. Precisa estar no arquivo estático — não em
 * runtime do React — para crawlers que não executam JS (Bing, WhatsApp,
 * LinkedIn) também lerem o schema. Ver src/lib/structured-data.ts.
 */
function structuredDataPlugin(): Plugin {
  return {
    name: 'orizon-structured-data',
    transformIndexHtml(html) {
      const json = JSON.stringify(buildStructuredData());
      const tag = `<script type="application/ld+json">${json}</script>`;
      return html.replace('</head>', `${tag}\n  </head>`);
    },
  };
}

/**
 * Injeta o <noscript> do GTM logo após <body>, como no snippet oficial do
 * Google. O script principal do GTM (e o do GA4) carrega via
 * src/lib/analytics.ts, empacotado no bundle — não aqui — para respeitar a
 * CSP (script-src 'self') e o Consent Mode v2. Ver docs/ARQUITETURA.md.
 * Como o site é uma SPA React, quem navega sem JS não vê conteúdo algum de
 * qualquer forma; isso entra só por fidelidade ao snippet do GTM.
 */
function gtmNoScriptPlugin(): Plugin {
  return {
    name: 'orizon-gtm-noscript',
    transformIndexHtml(html) {
      const tag =
        `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.analytics.gtm}" ` +
        `height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;
      return html.replace('<body>', `<body>\n    ${tag}`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), structuredDataPlugin(), gtmNoScriptPlugin()],
});
