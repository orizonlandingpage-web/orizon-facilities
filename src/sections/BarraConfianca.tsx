import { Reveal } from '../components/Reveal';

/**
 * Substituiu a antiga barra de números (anos de mercado, postos ativos,
 * condomínios atendidos) — eram placeholders zerados em src/config/site.ts
 * e publicar estatística inventada é publicidade enganosa (CDC, arts. 36–37).
 * Estes três cards são afirmações de proposta de valor, não números que
 * dependem de dado real da empresa para não mentir.
 */
const cards = [
  {
    titulo: 'Atendimento ágil',
    texto: 'Sua paz começa com nossa resposta rápida e eficaz.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    ),
  },
  {
    titulo: 'Gestão transparente',
    texto:
      'Acompanhe tudo com clareza e controle total.',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </>
    ),
  },
  {
    titulo: 'Zero risco trabalhista',
    texto:
      'Segurança total para seu condomínio e sua gestão.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    ),
  },
];

export function BarraConfianca() {
  return (
    <section
      aria-label="Por que confiar na Orizon Facilities"
      className="border-y border-graymid/20 bg-offwhite"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        {cards.map((card) => (
          <Reveal
            key={card.titulo}
            className="flex flex-col items-center rounded-lg border border-graymid/20 p-6 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-text">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
                className="h-6 w-6"
              >
                {card.icon}
              </svg>
            </span>
            <h3 className="mt-4 font-display text-lg text-navy">{card.titulo}</h3>
            <p className="mt-2 text-sm text-graytext">{card.texto}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
