const STORAGE_KEY = 'orizon-cookie-consent';
const CHANGE_EVENT_NAME = 'orizon:cookie-consent-change';
const OPEN_EVENT_NAME = 'orizon:open-cookie-preferences';

export interface ConsentPreferences {
  analytics: boolean;
  ads: boolean;
}

function ehConsentPreferences(valor: unknown): valor is ConsentPreferences {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    typeof (valor as ConsentPreferences).analytics === 'boolean' &&
    typeof (valor as ConsentPreferences).ads === 'boolean'
  );
}

/**
 * Formato antigo (antes da granularidade por categoria) gravava a string
 * simples `'accepted'`/`'rejected'` nessa mesma chave — `JSON.parse` disso dá
 * erro (não é JSON válido) e cai no `catch`, retornando `null` como se o
 * visitante nunca tivesse respondido. Efeito colateral aceito: quem já tinha
 * escolhido no formato antigo vê o banner de novo uma vez.
 */
export function getStoredConsent(): ConsentPreferences | null {
  const valor = localStorage.getItem(STORAGE_KEY);
  if (!valor) return null;

  try {
    const parsed: unknown = JSON.parse(valor);
    return ehConsentPreferences(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(preferencias: ConsentPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencias));
  window.dispatchEvent(new Event(CHANGE_EVENT_NAME));
}

/**
 * localStorage não dispara o evento `storage` na mesma aba que fez a
 * mudança (só em outras abas) — por isso o CustomEvent manual, para o
 * WhatsAppFab e o analytics saberem na hora que o visitante respondeu.
 */
export function subscribeToConsentChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT_NAME, callback);
  return () => window.removeEventListener(CHANGE_EVENT_NAME, callback);
}

/** Disparado pelo link "Preferências de cookies" no Footer, para reabrir o banner. */
export function abrirPreferenciasDeCookies(): void {
  window.dispatchEvent(new Event(OPEN_EVENT_NAME));
}

export function subscribeToOpenPreferences(callback: () => void): () => void {
  window.addEventListener(OPEN_EVENT_NAME, callback);
  return () => window.removeEventListener(OPEN_EVENT_NAME, callback);
}
