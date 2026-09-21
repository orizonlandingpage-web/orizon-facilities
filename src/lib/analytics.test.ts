// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { initAnalytics, trackClickToCall, trackLeadForm } from './analytics';
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
  it('se o visitante já respondeu antes, atualiza o consentimento granular já na inicialização', () => {
    setStoredConsent({ analytics: true, ads: false });
    window.dataLayer = []; // setStoredConsent acima não deve gravar nada no dataLayer

    initAnalytics();

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('sem escolha salva, não dispara nenhum consent update na inicialização', () => {
    initAnalytics();

    expect(comandos().find((c) => c[0] === 'consent' && c[1] === 'update')).toBeUndefined();
  });
});

describe('resposta ao banner de cookies em tempo real', () => {
  it('aceitar todos dispara consent update com os 4 sinais em granted', () => {
    initAnalytics();
    window.dataLayer.length = 0; // limpa o que já rodou na inicialização

    setStoredConsent({ analytics: true, ads: true });

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  });

  it('recusar tudo dispara consent update com os 4 sinais em denied', () => {
    initAnalytics();
    window.dataLayer.length = 0;

    setStoredConsent({ analytics: false, ads: false });

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('personalizar com só análise concede analytics_storage e nega os 3 sinais de publicidade', () => {
    initAnalytics();
    window.dataLayer.length = 0;

    setStoredConsent({ analytics: true, ads: false });

    const update = comandos().find((c) => c[0] === 'consent' && c[1] === 'update');
    expect(update?.[2]).toEqual({
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });
});

describe('trackLeadForm', () => {
  it('empilha generate_lead_form com o canal e o nome do formulário, sem dado pessoal', () => {
    trackLeadForm();

    expect(window.dataLayer).toContainEqual({
      event: 'generate_lead_form',
      lead_channel: 'whatsapp',
      form_name: 'solicitacao_proposta',
    });
  });
});

describe('trackClickToCall', () => {
  it('empilha click_to_call com a localização do clique', () => {
    trackClickToCall();

    expect(window.dataLayer).toContainEqual({ event: 'click_to_call', phone_location: 'site' });
  });
});
