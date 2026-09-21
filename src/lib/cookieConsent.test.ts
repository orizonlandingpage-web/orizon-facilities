// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  abrirPreferenciasDeCookies,
  getStoredConsent,
  setStoredConsent,
  subscribeToConsentChange,
  subscribeToOpenPreferences,
} from './cookieConsent';

beforeEach(() => {
  localStorage.clear();
});

describe('getStoredConsent / setStoredConsent', () => {
  it('retorna null quando nada foi salvo ainda', () => {
    expect(getStoredConsent()).toBeNull();
  });

  it('faz round-trip das preferências granulares', () => {
    setStoredConsent({ analytics: true, ads: false });
    expect(getStoredConsent()).toEqual({ analytics: true, ads: false });
  });

  it('ignora valor no formato antigo (string simples "accepted"/"rejected") sem lançar erro', () => {
    localStorage.setItem('orizon-cookie-consent', 'accepted');
    expect(getStoredConsent()).toBeNull();
  });

  it('ignora JSON válido mas com formato inesperado', () => {
    localStorage.setItem('orizon-cookie-consent', JSON.stringify({ foo: 'bar' }));
    expect(getStoredConsent()).toBeNull();
  });

  it('dispara o evento de mudança de consentimento', () => {
    const callback = vi.fn();
    const unsubscribe = subscribeToConsentChange(callback);

    setStoredConsent({ analytics: true, ads: true });

    expect(callback).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});

describe('abrirPreferenciasDeCookies', () => {
  it('dispara o evento de reabertura, que subscribeToOpenPreferences escuta', () => {
    const callback = vi.fn();
    const unsubscribe = subscribeToOpenPreferences(callback);

    abrirPreferenciasDeCookies();

    expect(callback).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});
