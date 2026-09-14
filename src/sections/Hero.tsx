import { site } from '../config/site';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { trackWhatsAppClick } from '../lib/analytics';
import { ServiceMarquee } from '../components/ServiceMarquee';

/**
 * Hero com imagem única em Ken Burns (zoom lento via CSS, classe `.ken-burns`
 * em src/styles/index.css). Optamos por uma imagem só, não um carrossel:
 * a pesquisa de copywriting aponta carrossel no hero como erro recorrente
 * (divide a atenção da headline) e evita a exigência de controle de pausa
 * da WCAG SC 2.2.2 que um autoplay de múltiplos slides implicaria.
 *
 * A imagem é o elemento de LCP da página — por isso o preload dela está no
 * <head> de index.html, com fetchpriority="high" e sem lazy-loading.
 */
export function Hero() {
  const whatsappHref = buildWhatsAppLink(site.whatsappMensagemPadrao);

  return (
    <section id="topo" className="relative flex flex-col overflow-hidden bg-navy sm:min-h-svh">
      {/*
        object-[25%_center]: a foto tem duas pessoas centralizadas na
        composição original. Se o corte automático (object-cover) usasse o
        centro padrão, elas cairiam bem atrás do bloco de texto (que fica à
        esquerda). Ancorando o corte mais para a esquerda da imagem, as
        pessoas acabam aparecendo mais à direita do enquadramento visível —
        fora da área do texto, em qualquer proporção de tela.
      */}
      <img
        src="/images/hero-1600.webp"
        srcSet="/images/hero-800.webp 800w, /images/hero-1600.webp 1600w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
        className="ken-burns absolute inset-0 h-full w-full object-cover object-[25%_center]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50"
        aria-hidden="true"
      />
      {/* Reforço horizontal: escurece mais o lado do texto (esquerda) e
          deixa o lado da foto (direita, onde ficam as pessoas) mais claro. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/35 via-55% to-transparent"
        aria-hidden="true"
      />

      {/*
        min-h-svh só a partir de `sm`: no mobile a seção não força altura de
        tela cheia, então o hero fica do tamanho do próprio conteúdo — sem
        isso, sobrava um vão vazio entre o último botão e o letreiro em
        telas baixas. items-start (mobile) evita cortar o topo do texto;
        items-center (sm+) centraliza dentro da altura cheia da viewport.
        (O WhatsAppFab não é problema aqui: ele só aparece depois que o hero
        sai da tela — ver WhatsAppFab.tsx.)
      */}
      <div className="relative flex flex-1 items-start sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl border-l-4 border-gold pl-6">
            <p className="mb-4 font-display text-sm font-bold tracking-[0.25em] text-gold uppercase sm:mb-2">
              Serviços Condominiais em Aracaju
            </p>

            <h1 className="font-display text-3xl leading-[1.05] font-bold text-offwhite sm:text-5xl sm:leading-[1.08] md:text-6xl">
              Seu condomínio em boas mãos.{' '}
              <span className="text-gold">Nós cuidamos de toda a gestão.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-offwhite/85 sm:mt-6 sm:text-lg">
              Manutenção predial, limpeza, jardinagem e portaria com equipe própria Orizon em
              Aracaju e região metropolitana. Escala 100% garantida e conformidade trabalhista
              auditada mês a mês.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5
                  font-display text-sm font-bold text-navy transition-colors hover:bg-offwhite
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-offwhite sm:px-6 sm:py-3.5 sm:text-base"
              >
                Solicitar proposta para meu condomínio
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
                className="rounded-lg border border-offwhite/30 px-5 py-2.5 font-display text-sm
                  font-bold text-offwhite transition-colors hover:border-offwhite
                  hover:bg-offwhite/10 focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:px-6 sm:py-3.5
                  sm:text-base"
              >
                Falar com um especialista no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <ServiceMarquee />
      </div>
    </section>
  );
}
