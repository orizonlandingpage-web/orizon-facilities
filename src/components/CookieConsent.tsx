import { useEffect, useRef, useState } from 'react';
import {
  getStoredConsent,
  setStoredConsent,
  subscribeToOpenPreferences,
  type ConsentPreferences,
} from '../lib/cookieConsent';

const PREFERENCIAS_PADRAO: ConsentPreferences = { analytics: false, ads: false };

/**
 * Banner de cookies (LGPD, Lei 13.709/2018): informa a finalidade, guarda a
 * escolha em localStorage (não mostra de novo) e dá ao "Recusar" o mesmo
 * peso visual do "Aceitar todos" — consentimento não pode ser mais difícil
 * de negar do que de dar. "Personalizar" abre um segundo passo com Análise e
 * Publicidade escolhidas separadamente. O link "Preferências de cookies" no
 * Footer reabre este banner a qualquer momento, via `subscribeToOpenPreferences`
 * (src/lib/cookieConsent.ts) — nesse caso o foco vai direto pro primeiro
 * botão, já que foi uma ação deliberada do visitante; na primeira aparição
 * automática (carregamento da página) o foco não é roubado.
 *
 * GA4 e GTM (src/lib/analytics.ts) usam Google Consent Mode v2: os scripts
 * carregam sempre, mas com os sinais de análise/publicidade em `denied` até
 * o visitante responder aqui. `setStoredConsent()` dispara
 * `subscribeToConsentChange()`, que atualiza o consentimento em tempo real
 * sem precisar recarregar a página.
 */
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);
  const [personalizando, setPersonalizando] = useState(false);
  const [rascunho, setRascunho] = useState<ConsentPreferences>(
    () => getStoredConsent() ?? PREFERENCIAS_PADRAO,
  );
  const primeiroElementoRef = useRef<HTMLButtonElement>(null);
  const vindoDeReabertura = useRef(false);

  useEffect(
    () =>
      subscribeToOpenPreferences(() => {
        setRascunho(getStoredConsent() ?? PREFERENCIAS_PADRAO);
        setPersonalizando(false);
        vindoDeReabertura.current = true;
        setVisible(true);
      }),
    [],
  );

  useEffect(() => {
    if (visible && vindoDeReabertura.current) {
      primeiroElementoRef.current?.focus();
      vindoDeReabertura.current = false;
    }
  }, [visible]);

  function responder(preferencias: ConsentPreferences) {
    setStoredConsent(preferencias);
    setVisible(false);
  }

  if (!visible) return null;

  if (personalizando) {
    return (
      <div
        role="region"
        aria-label="Preferências de cookies"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-navy px-4 py-4
          sm:px-8 sm:py-6"
      >
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-semibold text-offwhite">Preferências de cookies</p>
          <p className="mt-1 text-xs text-graymid sm:text-sm">
            Cookies essenciais ficam sempre ativos — são necessários para o site funcionar.
          </p>

          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-3 text-sm text-offwhite/90">
              <input
                type="checkbox"
                checked={rascunho.analytics}
                onChange={(e) => setRascunho((r) => ({ ...r, analytics: e.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
              />
              <span>
                <span className="font-semibold">Cookies de análise</span> — nos ajudam a entender
                como o site é usado (Google Analytics).
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm text-offwhite/90">
              <input
                type="checkbox"
                checked={rascunho.ads}
                onChange={(e) => setRascunho((r) => ({ ...r, ads: e.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
              />
              <span>
                <span className="font-semibold">Cookies de publicidade</span> — usados para medir e
                personalizar anúncios (Google Ads).
              </span>
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              ref={primeiroElementoRef}
              type="button"
              onClick={() => setPersonalizando(false)}
              className="flex-1 rounded-lg border border-offwhite/30 px-5 py-2 font-display text-sm
                font-bold text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-offwhite sm:flex-none"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => responder(rascunho)}
              className="flex-1 rounded-lg bg-gold px-5 py-2 font-display text-sm font-bold text-navy
                transition-colors hover:bg-offwhite focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:flex-none"
            >
              Salvar preferências
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="flex w-full flex-wrap shrink-0 gap-3 sm:w-auto sm:flex-nowrap">
          <button
            ref={primeiroElementoRef}
            type="button"
            onClick={() => responder({ analytics: false, ads: false })}
            className="flex-1 rounded-lg border border-offwhite/30 px-5 py-2 font-display text-sm
              font-bold text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-offwhite sm:flex-none sm:py-2.5"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => setPersonalizando(true)}
            className="flex-1 rounded-lg border border-offwhite/30 px-5 py-2 font-display text-sm
              font-bold text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite/10
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-offwhite sm:flex-none sm:py-2.5"
          >
            Personalizar
          </button>
          <button
            type="button"
            onClick={() => responder({ analytics: true, ads: true })}
            className="flex-1 rounded-lg bg-gold px-5 py-2 font-display text-sm font-bold text-navy
              transition-colors hover:bg-offwhite focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:flex-none sm:py-2.5"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
