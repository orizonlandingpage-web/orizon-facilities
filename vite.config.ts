import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { buildStructuredData } from './src/lib/structured-data.ts';

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), structuredDataPlugin()],
});
