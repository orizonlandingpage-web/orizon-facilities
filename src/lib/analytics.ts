import { getStoredConsent, subscribeToConsentChange } from './cookieConsent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export type OrigemWhatsApp = 'header' | 'hero' | 'fab' | 'formulario';

/**
 * Réplica mínima do gtag() do snippet oficial: só empilha os argumentos em
 * `dataLayer` como um item `[comando, ...args]`. gtag.js/gtm.js leem esse
 * item por índice (`item[0]`, `item[1]`...), então um array simples aqui
 * tem exatamente o mesmo efeito do `arguments` usado no snippet original.
 */
function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

function atualizarConsentimento(concedido: boolean): void {
  const status = concedido ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
}

/**
 * Só cuida da resposta ao banner de cookies em tempo real. O default de
 * consentimento e o carregamento do GTM já rodaram antes disso — em
 * public/consent-init.js, um <script> clássico (síncrono, sem type="module")
 * no <head> de index.html, carregado antes do bundle React. Precisa ser
 * assim para o GTM processar o consent default de forma síncrona (ver
 * docs/ARQUITETURA.md). Se o visitante já tinha aceitado antes,
 * consent-init.js já restaurou o consentimento; o check abaixo é só
 * redundância defensiva caso esse script não rode por algum motivo.
 */
export function initAnalytics(): void {
  if (getStoredConsent() === 'accepted') {
    atualizarConsentimento(true);
  }

  subscribeToConsentChange(() => atualizarConsentimento(getStoredConsent() === 'accepted'));
}

/**
 * Dispara o evento de conversão em todo clique nos CTAs de WhatsApp — a
 * única conversão real do site (sem backend, sem página de obrigado). No
 * GTM isso vira gatilho de Evento Personalizado `contato_whatsapp`, com
 * `origem` como variável de camada de dados para comparar qual CTA converte
 * mais.
 */
export function trackWhatsAppClick(origem: OrigemWhatsApp): void {
  window.dataLayer.push({ event: 'contato_whatsapp', origem });
}
