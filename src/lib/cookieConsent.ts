const STORAGE_KEY = 'orizon-cookie-consent';
const EVENT_NAME = 'orizon:cookie-consent-change';

export type CookieConsent = 'accepted' | 'rejected';

/**
 * localStorage não dispara o evento `storage` na mesma aba que fez a
 * mudança (só em outras abas) — por isso o CustomEvent manual, para o
 * WhatsAppFab saber na hora que o usuário respondeu ao banner de cookies.
 */
export function getStoredConsent(): CookieConsent | null {
  const valor = localStorage.getItem(STORAGE_KEY);
  return valor === 'accepted' || valor === 'rejected' ? valor : null;
}

export function setStoredConsent(consentimento: CookieConsent): void {
  localStorage.setItem(STORAGE_KEY, consentimento);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeToConsentChange(callback: () => void): () => void {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}
