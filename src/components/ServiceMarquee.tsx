const SERVICOS = ['Limpeza', 'Manutenção Predial', 'Jardinagem', 'Controle de Acesso'];

/**
 * Quantas vezes repetir SERVICOS dentro de cada "metade" da trilha. O truque
 * de loop sem costura (mover -50%) só fica invisível se cada metade já for
 * mais larga que a viewport — senão, em telas largas, sobra um vão vazio
 * entre o fim de um ciclo e o início do outro (foi exatamente o que
 * aconteceu com só 1 repetição: 4 itens não enchem um monitor grande).
 * 8x cobre até telas ultrawide/4K com folga.
 */
const REPETICOES_POR_METADE = 8;
const METADE = Array.from({ length: REPETICOES_POR_METADE }, () => SERVICOS).flat();

/**
 * Faixa contínua com os 4 serviços, rolando da direita para a esquerda.
 * Puramente decorativo/redundante em relação à seção de Serviços (que tem a
 * lista real, acessível) — por isso aria-hidden na faixa inteira. Pausa no
 * hover e para completamente sob prefers-reduced-motion (ver .marquee-track
 * em src/styles/index.css).
 */
export function ServiceMarquee() {
  const itens = [...METADE, ...METADE];

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-navy/10 bg-gold py-3">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {itens.map((servico, i) => (
          <span
            key={`${servico}-${i}`}
            className="flex items-center gap-10 font-display text-sm font-bold tracking-[0.25em] text-navy uppercase"
          >
            {servico}
            <span className="text-navy/40">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
