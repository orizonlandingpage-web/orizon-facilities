import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const solucoes = [
  {
    titulo: 'Condomínios residenciais',
    texto:
      'Manutenção predial atenta, limpeza detalhada das áreas comuns e rotinas adaptadas à convivência e segurança das famílias.',
  },
  {
    titulo: 'Condomínios comerciais',
    texto:
      'Controle de acesso ágil, postura corporativa e manutenção contínua para preservar a imagem profissional do prédio.',
  },
  {
    titulo: 'Empreendimentos mistos e compactos',
    texto:
      'Dimensionamento inteligente de postos para garantir cobertura essencial com otimização dos custos operacionais.',
  },
];

export function SolucoesSobMedida() {
  return (
    <section className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Soluções sob medida"
          title="Atendimento planejado para a realidade do seu espaço."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {solucoes.map((solucao) => (
            <Reveal key={solucao.titulo}>
              <h3 className="font-display text-lg text-navy">{solucao.titulo}</h3>
              <div className="mt-3 h-px w-10 bg-gold" aria-hidden="true" />
              <p className="mt-3 text-graytext">{solucao.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
