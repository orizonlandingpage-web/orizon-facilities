import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { trackWhatsAppClick } from '../lib/analytics';
import { getStoredConsent, subscribeToConsentChange } from '../lib/cookieConsent';

/**
 * Botão flutuante fixo de WhatsApp.
 *
 * Só monta depois que o hero (#topo) sai completamente da viewport. O hero
 * já tem seu próprio CTA de WhatsApp, então não perdemos conversão — e isso
 * elimina uma categoria inteira de bug: como o FAB é `fixed` num canto fixo
 * da tela e o hero tenta caber conteúdo acima da dobra, em viewports baixos
 * (ex.: 360×640, 375×667) o botão do hero acabava exatamente atrás do FAB,
 * não importa o quanto eu ajustasse o espaçamento — a matemática (altura de
 * conteúdo constante vs. viewport curto) sempre alcançava algum tamanho de
 * tela real. Não renderizar o FAB enquanto o hero está visível resolve na
 * raiz, em vez de perseguir pixel por breakpoint.
 *
 * Requisitos de acessibilidade aplicados (WCAG 2.2):
 * - <a> semântico, nunca <div onClick> — navegável por teclado de graça.
 * - 56×56px (h-14 w-14): passa SC 2.5.8 (AA, mínimo 24px) e SC 2.5.5
 *   (AAA, mínimo 44px) com folga.
 * - aria-label descreve a ação E avisa que abre em nova aba.
 * - Ícone com aria-hidden + focusable="false": não duplica leitura de tela.
 * - env(safe-area-inset-bottom): não cobre a home indicator do iPhone.
 * - O padding-bottom compensatório no <Footer> evita cobrir conteúdo focado
 *   (SC 2.4.11 Focus Not Obscured) quando o usuário chega ao fim da página.
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  // Enquanto o banner de cookies não foi respondido, ele ocupa a faixa
  // inferior inteira da tela — o FAB ficaria por baixo dele. Some até o
  // usuário aceitar ou recusar.
  const [consentPending, setConsentPending] = useState(() => getStoredConsent() === null);

  useEffect(() => {
    // #topo é o <section> do Hero, sempre presente antes deste componente
    // montar (ver App.tsx).
    const hero = document.getElementById('topo');
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => subscribeToConsentChange(() => setConsentPending(getStoredConsent() === null)),
    [],
  );

  const href = buildWhatsAppLink(site.whatsappMensagemPadrao);

  if (!visible || consentPending) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('fab')}
      aria-label="Falar com a Orizon Facilities no WhatsApp (abre em nova aba)"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50
        flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]
        text-white shadow-lg transition-transform
        hover:scale-105 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.663 4.523 1.814 6.383L4 29l7.828-1.775A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.353l-.355-.21-4.646 1.053 1.08-4.53-.232-.372A9.7 9.7 0 0 1 5.25 15c0-5.93 4.823-10.75 10.754-10.75S26.75 9.07 26.75 15 21.933 24.75 16.004 24.75Zm5.62-8.06c-.308-.154-1.82-.898-2.102-1-.282-.103-.487-.154-.692.154-.205.308-.795 1-.975 1.205-.18.205-.359.231-.667.077-.308-.154-1.3-.479-2.475-1.526-.915-.816-1.533-1.824-1.713-2.132-.18-.308-.02-.474.135-.627.138-.138.308-.36.462-.539.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.539-.077-.154-.692-1.667-.948-2.283-.25-.6-.503-.519-.692-.529l-.59-.01c-.205 0-.539.077-.821.385-.282.308-1.077 1.052-1.077 2.566s1.103 2.976 1.257 3.18c.154.205 2.17 3.312 5.256 4.645.735.317 1.308.507 1.755.65.737.235 1.408.202 1.938.123.591-.088 1.82-.744 2.077-1.463.257-.719.257-1.334.18-1.463-.077-.128-.282-.205-.59-.36Z" />
      </svg>
    </a>
  );
}
