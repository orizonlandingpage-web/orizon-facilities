import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const diferenciais = [
  {
    titulo: 'Planejamento de escalas',
    texto: 'Organização prévia e rotinas alinhadas para manter a operação do seu condomínio funcionando de forma contínua.',
  },
  {
    titulo: 'Transparência documental',
    texto:
      'Acompanhamento claro das obrigações legais e trabalhistas para a tranquilidade da administração do prédio.',
  },
  {
    titulo: 'Comunicação direta.',
    texto: 'Canal de suporte próximo e ponto focal definido para atender prontamente as demandas do condomínio.',
  },
  {
    titulo: 'Alinhamento e capacitação',
    texto:
      'Profissionais orientados sobre as regras de segurança, uso de equipamentos e conduta de atendimento aos moradores.',
  },
  {
    titulo: 'Previsibilidade financeira',
    texto: 'Contratos estruturados para auxiliar o planejamento do condomínio, evitando custos operacionais inesperados.',
  },
  {
    titulo: 'Foco em estabilidade',
    texto:
      'Atenção à gestão de pessoas e valorização da equipe para promover um ambiente de confiança e rotina estável.',
  },
];

export function Diferenciais() {
  return (
    <section className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="O compromisso Orizon"
          title="Uma gestão de terceirização pensada para facilitar o seu dia a dia."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item, i) => (
            <Reveal key={item.titulo}>
              <span className="font-display text-sm text-gold-text">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg text-navy">{item.titulo}</h3>
              <p className="mt-2 text-graytext">{item.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
