import { useState } from 'react';
import { getStoredConsent, setStoredConsent, type CookieConsent } from '../lib/cookieConsent';

/**
 * Banner de cookies (LGPD, Lei 13.709/2018): informa a finalidade, guarda a
 * escolha em localStorage (não mostra de novo) e dá ao "Recusar" o mesmo
 * peso visual do "Aceitar" — consentimento não pode ser mais difícil de
 * negar do que de dar.
 *
 * GA4 e GTM (src/lib/analytics.ts) usam Google Consent Mode v2: os scripts
 * carregam sempre, mas com todo sinal de análise/publicidade em `denied`
 * até o visitante responder aqui. `setStoredConsent()` dispara
 * `subscribeToConsentChange()`, que atualiza o consentimento em tempo real
 * sem precisar recarregar a página.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);

  function responder(consentimento: CookieConsent) {
    setStoredConsent(consentimento);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-navy px-4 py-3 sm:px-8
        sm:py-5"
    >
      <div
        className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center
        sm:justify-between sm:gap-4"
      >
        <p className="text-xs text-graymid sm:text-sm">
          Usamos cookies essenciais e, com sua autorização, cookies de análise e publicidade,
          conforme a LGPD.
        </p>

        <div className="flex w-full shrink-0 gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => responder('rejected')}
            className="flex-1 rounded-lg border border-offwhite/30 px-5 py-2 font-display text-sm
              font-bold text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-offwhite sm:flex-none sm:py-2.5"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => responder('accepted')}
            className="flex-1 rounded-lg bg-gold px-5 py-2 font-display text-sm font-bold text-navy
              transition-colors hover:bg-offwhite focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:flex-none sm:py-2.5"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
