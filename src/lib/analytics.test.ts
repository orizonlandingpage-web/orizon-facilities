// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { initAnalytics, trackWhatsAppClick } from './analytics';
import { setStoredConsent } from './cookieConsent';

type Comando = [string, string, Record<string, string>?];

function comandos(): Comando[] {
  return window.dataLayer as Comando[];
}

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = '';
  window.dataLayer = [];
});

describe('initAnalytics', () => {
  it('registra o consentimento negado por padrão antes de iniciar o GTM', () => {
    initAnalytics();

    const indiceDefault = comandos().findIndex((c) => c[0] === 'consent' && c[1] === 'default');
    const indiceGtmStart = window.dataLayer.findIndex(
      (item) => typeof item === 'object' && item !== null && 'gtm.start' in item,
    );

    expect(indiceDefault).toBeGreaterThanOrEqual(0);
    expect(indiceGtmStart).toBeGreaterThan(indiceDefault);
    expect(comandos()[indiceDefault][2]).toMatchObject({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });

  it('injeta só o script do gtm.js — GA4 não carrega gtag.js direto (evita duplicidade)', () => {
    initAnalytics();

    const srcs = Array.from(document.querySelectorAll('script')).map((s) => s.src);
    expect(srcs.some((src) => src.includes('gtm.js?id=GTM-TDS78GG3'))).toBe(true);
    expect(srcs.some((src) => src.includes('gtag/js'))).toBe(false);
  });

  it('se o visitante já aceitou antes, atualiza o consentimento para granted já na inicialização', () => {
    setStoredConsent('accepted');
    window.dataLayer = []; // setStoredConsent acima não deve gravar nada no dataLayer

    initAnalytics();

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  });
});

describe('resposta ao banner de cookies em tempo real', () => {
  it('aceitar dispara consent update com os 4 sinais em granted', () => {
    initAnalytics();
    window.dataLayer.length = 0; // limpa o que já rodou na inicialização

    setStoredConsent('accepted');

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  });

  it('recusar dispara consent update com os 4 sinais em denied', () => {
    initAnalytics();
    window.dataLayer.length = 0;

    setStoredConsent('rejected');

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });
});

describe('trackWhatsAppClick', () => {
  it('empilha o evento contato_whatsapp com a origem do clique', () => {
    trackWhatsAppClick('hero');
    expect(window.dataLayer).toContainEqual({ event: 'contato_whatsapp', origem: 'hero' });
  });
});
