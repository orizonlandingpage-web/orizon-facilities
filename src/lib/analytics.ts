import { site } from '../config/site';
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

function carregarScript(src: string): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
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
 * Inicializa o GTM com Google Consent Mode v2: por padrão, tudo negado
 * (nenhum cookie de análise/publicidade é gravado) até o visitante responder
 * ao banner de cookies (src/components/CookieConsent.tsx). A ordem das
 * chamadas importa — o default de consentimento precisa existir antes do
 * script do GTM carregar. O GA4 não tem script próprio aqui: é uma tag
 * configurada dentro do container GTM, que lê o mesmo `dataLayer`.
 */
export function initAnalytics(): void {
  window.dataLayer = window.dataLayer || [];

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);

  if (getStoredConsent() === 'accepted') {
    atualizarConsentimento(true);
  }

  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  carregarScript(`https://www.googletagmanager.com/gtm.js?id=${site.analytics.gtm}`);

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
