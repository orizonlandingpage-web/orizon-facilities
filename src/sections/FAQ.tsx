import { SectionHeading } from '../components/SectionHeading';
import { perguntas } from '../config/faq';

/**
 * Usa <details>/<summary> nativo: acessível de graça (navegável por
 * teclado, anunciado por screen reader como "collapsed/expanded" sem
 * nenhum JS ou aria-expanded manual).
 *
 * As perguntas vêm de src/config/faq.ts — mesma fonte usada pelo schema
 * FAQPage estático (src/lib/structured-data.ts, injetado no HTML em build
 * time por vite.config.ts). Por isso este componente NÃO renderiza mais um
 * <script type="application/ld+json"> próprio: renderizar aqui também
 * duplicaria o schema no runtime além do que já vai estático no <head>.
 */
export function FAQ() {
  return (
    <section id="faq" className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Dúvidas comuns" title="Perguntas frequentes" />

        <div className="mt-10 divide-y divide-graymid/20">
          {perguntas.map((item) => (
            <details key={item.pergunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-navy">
                {item.pergunta}
                <span className="ml-4 text-gold-text group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-graytext">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
