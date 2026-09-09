import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

/**
 * O 4º serviço se chama "Controle de Acesso e Monitoramento", não
 * "Segurança Patrimonial". Segurança privada/vigilância é atividade
 * regulada pela Lei nº 14.967/2024 e exige autorização de funcionamento da
 * Polícia Federal — a Orizon não possui essa autorização hoje. Termos como
 * "vigilância", "ronda" e "segurança patrimonial" não devem ser usados em
 * nenhum lugar da página enquanto isso não mudar (ver docs/CONTEUDO-PENDENTE.md).
 */
const servicos = [
  {
    nome: 'Limpeza e Conservação',
    texto:
      'Áreas comuns do seu condomínio em Aracaju sempre limpas, com equipe fixa e qualificada.',
    imagem: 'servico-limpeza',
    alt: 'Equipe de limpeza da Orizon higienizando a área comum de um condomínio',
  },
  {
    nome: 'Manutenção Predial',
    texto:
      'Manutenção elétrica, hidráulica e de estrutura com equipe própria e chamado registrado, sem intermediário.',
    imagem: 'servico-manutencao',
    alt: 'Técnico da Orizon realizando manutenção predial em um condomínio',
  },
  {
    nome: 'Jardinagem e Paisagismo',
    texto:
      'Cuidado contínuo para o seu jardim com um cronograma regular de poda, corte, adubação e irrigação.',
    imagem: 'servico-jardinagem',
    alt: 'Jardineiro da Orizon cuidando do paisagismo de um condomínio',
  },
  {
    nome: 'Controle de Acesso e Monitoramento',
    texto:
      'Portaria com triagem de visitantes e monitoramento de câmeras, com procedimento escrito.',
    imagem: 'servico-acesso',
    alt: 'Porteiro da Orizon fazendo o controle de acesso na entrada de um condomínio',
  },
];

export function Servicos() {
  return (
    <section id="servicos" className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="O que fazemos" title="Nossos serviços, uma gestão só." onDark />

        {/*
          aspect-video (16:9), não 4:5: as fotos mostram cenas com pessoas
          espalhadas horizontalmente (técnicos lado a lado na manutenção,
          aperto de mão). Um recorte 4:5 (mais alto que largo) cortaria uma
          das pessoas fora do quadro. 16:9 fica perto da proporção nativa
          dessas fotos — quase nenhum recorte de object-cover.
        */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {servicos.map((servico) => (
            <Reveal key={servico.nome} className="group">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <img
                  src={`/images/${servico.imagem}.webp`}
                  srcSet={`/images/${servico.imagem}-500.webp 500w, /images/${servico.imagem}.webp 800w`}
                  sizes="(min-width: 1280px) 23vw, (min-width: 640px) 47vw, 90vw"
                  alt={servico.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy from-10% via-navy/20 via-40% to-transparent"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 font-display text-lg font-bold text-offwhite">{servico.nome}</h3>
              <p className="mt-2 text-sm text-graymid">{servico.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
