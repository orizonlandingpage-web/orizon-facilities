/**
 * Consent Mode v2 — default de consentimento + carregamento do GTM.
 *
 * Precisa ser um <script> clássico, referenciado por <link src> (não inline,
 * a CSP do site não tem 'unsafe-inline' — ver vercel.json), sem type="module"
 * e sem async/defer, o mais cedo possível em <head>, em index.html. É a
 * única forma de garantir que o Google Tag Manager processe o consent
 * default de forma síncrona, antes de qualquer bundle da aplicação rodar.
 *
 * Arquivo estático: não passa pelo build/TypeScript, por isso o ID do GTM e
 * a chave de consentimento estão hardcoded aqui, replicando
 * `site.analytics.gtm` e a STORAGE_KEY de src/lib/cookieConsent.ts. Os dois
 * lados são checados por teste (src/lib/consent-init.test.ts) — atualizar
 * os três juntos se algum desses valores mudar.
 */
(function () {
  var GTM_ID = 'GTM-TDS78GG3';
  var CONSENT_STORAGE_KEY = 'orizon-cookie-consent';

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);

  if (window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }

  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(script);
})();
