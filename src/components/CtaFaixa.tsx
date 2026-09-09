interface CtaFaixaProps {
  titulo: string;
}

/**
 * Faixa de CTA reutilizada em pontos intermediários de scroll (não só no
 * topo e no final) — a pesquisa de CRO recomenda repetir o CTA onde a
 * lógica do argumento pede, em vez de só na dobra inicial.
 */
export function CtaFaixa({ titulo }: CtaFaixaProps) {
  return (
    <div className="bg-navy px-6 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <p className="font-display text-2xl text-offwhite sm:text-3xl">{titulo}</p>
        <a
          href="#contato"
          className="mt-8 inline-block rounded-full bg-gold px-7 py-3 font-body font-semibold
            text-navy transition-colors hover:bg-gold/90 focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite"
        >
          Solicitar proposta para meu condomínio
        </a>
      </div>
    </div>
  );
}
