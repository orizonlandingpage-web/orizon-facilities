// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import indexHtml from '../../index.html?raw';
import consentInitSource from '../../public/consent-init.js?raw';
import { site } from '../config/site';

type Comando = [string, string, Record<string, unknown>?];

/**
 * public/consent-init.js é um script clássico (não um módulo ES), sem
 * export — precisa rodar como side-effect pra ser testado. `new Function`
 * o executa no escopo global do jsdom, exatamente como o navegador faria
 * ao carregar o <script src="/consent-init.js"> em index.html.
 */
function rodarConsentInit(): void {
  new Function(consentInitSource)();
}

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = '';
  window.dataLayer = [];
});

describe('consent-init.js', () => {
  it('carrega o gtm.js com o mesmo ID configurado em src/config/site.ts', () => {
    rodarConsentInit();

    const srcs = Array.from(document.querySelectorAll('script')).map((s) => s.src);
    expect(srcs.some((src) => src.includes(`gtm.js?id=${site.analytics.gtm}`))).toBe(true);
  });

  it('nega consentimento por padrão quando não há escolha salva', () => {
    rodarConsentInit();

    const comandos = window.dataLayer as Comando[];
    const consentDefault = comandos.find((c) => c[0] === 'consent' && c[1] === 'default');
    expect(consentDefault?.[2]).toMatchObject({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });

  it('restaura consentimento concedido de uma visita anterior', () => {
    localStorage.setItem('orizon-cookie-consent', 'accepted');

    rodarConsentInit();

    const comandos = window.dataLayer as Comando[];
    const consentUpdate = comandos.find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(consentUpdate?.[2]).toEqual({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  });

  it('não restaura nada quando o visitante recusou antes', () => {
    localStorage.setItem('orizon-cookie-consent', 'rejected');

    rodarConsentInit();

    const comandos = window.dataLayer as Comando[];
    const consentUpdate = comandos.find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(consentUpdate).toBeUndefined();
  });
});

describe('index.html', () => {
  it('carrega consent-init.js como script clássico, antes do bundle React', () => {
    const linhaScript = indexHtml.split('\n').find((linha) => linha.includes('consent-init.js'));
    const indiceConsentInit = indexHtml.indexOf('consent-init.js');
    const indiceMain = indexHtml.indexOf('src/main.tsx');

    expect(linhaScript).toBeDefined();
    expect(linhaScript).not.toContain('type="module"');
    expect(indiceConsentInit).toBeGreaterThanOrEqual(0);
    expect(indiceMain).toBeGreaterThan(indiceConsentInit);
  });
});
