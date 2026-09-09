import { site } from '../config/site';
import { buildWhatsAppLink } from '../lib/whatsapp';

/**
 * Cabeçalho fixo simples: wordmark + telefone visível + CTA de WhatsApp.
 * Não é um menu de site institucional — a página é single-page, então não
 * há links de navegação a esconder atrás de um menu mobile.
 */
export function Header() {
  const whatsappHref = buildWhatsAppLink(site.whatsappMensagemPadrao);

  return (
    <header className="sticky top-0 z-40 border-b border-graymid/20 bg-offwhite/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/*
          Aqui usamos só o emblema (não o lockup completo empilhado da
          Logo.png original) porque, numa altura de header de ~40-48px, o
          "FACILITIES" do lockup completo fica ilegível — o emblema é
          quadrado e lê bem em qualquer tamanho; o nome vira texto real
          tipografado ao lado, nítido em qualquer densidade de tela.
        */}
        <a href="#topo" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/icon-192.png"
            alt=""
            className="h-9 w-9 sm:h-10 sm:w-10"
            width={192}
            height={192}
          />
          <span className="font-display text-lg leading-none font-bold text-navy sm:text-xl">
            Orizon
            <span className="block text-[0.6em] font-semibold tracking-[0.3em] text-gold-text">
              FACILITIES
            </span>
          </span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${site.telefone.replace(/\D/g, '')}`}
            className="hidden font-body text-sm text-graytext hover:text-navy sm:block"
          >
            {site.telefone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gold px-5 py-2.5 font-display text-sm font-bold text-navy
              transition-colors hover:bg-gold-text hover:text-offwhite focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
