import { getStoredConsent, subscribeToConsentChange, type ConsentPreferences } from './cookieConsent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/**
 * Réplica mínima do gtag() do snippet oficial: só empilha os argumentos em
 * `dataLayer` como um item `[comando, ...args]`. gtag.js/gtm.js leem esse
 * item por índice (`item[0]`, `item[1]`...), então um array simples aqui
 * tem exatamente o mesmo efeito do `arguments` usado no snippet original.
 */
function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

function atualizarConsentimento(preferencias: ConsentPreferences): void {
  const analytics = preferencias.analytics ? 'granted' : 'denied';
  const ads = preferencias.ads ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
}

/**
 * Só cuida da resposta ao banner de cookies em tempo real. O default de
 * consentimento e o carregamento do GTM já rodaram antes disso — em
 * public/consent-init.js, um <script> clássico (síncrono, sem type="module")
 * no <head> de index.html, carregado antes do bundle React. Precisa ser
 * assim para o GTM processar o consent default de forma síncrona (ver
 * docs/ARQUITETURA.md). Se o visitante já tinha respondido antes,
 * consent-init.js já restaurou o consentimento; o check abaixo é só
 * redundância defensiva caso esse script não rode por algum motivo.
 */
export function initAnalytics(): void {
  const preferencias = getStoredConsent();
  if (preferencias) {
    atualizarConsentimento(preferencias);
  }

  subscribeToConsentChange(() => {
    const atuais = getStoredConsent();
    if (atuais) atualizarConsentimento(atuais);
  });
}

/**
 * Dispara imediatamente antes de abrir o WhatsApp pelo formulário de contato
 * (a única conversão do site que o gatilho nativo de "clique em link" do GTM
 * não enxerga, porque o WhatsApp abre via `window.open()` programático, não
 * por clique num `<a href="wa.me/...">`). Os 3 CTAs que são links diretos de
 * WhatsApp (Header, Hero, WhatsAppFab) não disparam nada daqui — o GTM já
 * captura esses cliques sozinho pelo gatilho de link, como `generate_lead_whatsapp`.
 * Sem dado pessoal no payload (LGPD).
 */
export function trackLeadForm(): void {
  window.dataLayer.push({
    event: 'generate_lead_form',
    lead_channel: 'whatsapp',
    form_name: 'solicitacao_proposta',
  });
}

/** Clique em qualquer link `tel:` do site — indicador secundário; a conversão de ligação em si é medida pelo Google Ads. */
export function trackClickToCall(): void {
  window.dataLayer.push({ event: 'click_to_call', phone_location: 'site' });
}
