import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const dores = [
  {
    titulo: 'Desfalque na escala operacional',
    texto: 'Ausências não planejadas e falta de cobertura imediata, impactando a rotina e a segurança dos moradores.',
  },
  {
    titulo: 'Turnover alto',
    texto: 'Trocas constantes no quadro funcional, comprometendo a padronização do serviço e o reconhecimento do condomínio.',
  },
  {
    titulo: 'Exposição a passivos trabalhistas',
    texto: 'Insegurança jurídica decorrente da ausência de auditoria rigorosa de recolhimento de encargos e conformidade legal.',
  },
];

export function Problema() {
  return (
    <section className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Os desafios do dia a dia"
          title="Terceirização eficiente não deve gerar sobrecarga ao síndico."
          description="Falhas operacionais e ausência de respaldo técnico frequentemente transferem demandas indevidas à administração predial."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {dores.map((dor) => (
            <Reveal key={dor.titulo}>
              <h3 className="font-display text-xl text-navy">{dor.titulo}</h3>
              <div className="mt-3 h-px w-10 bg-gold" aria-hidden="true" />
              <p className="mt-3 text-graytext">{dor.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
