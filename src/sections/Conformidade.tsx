import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

/**
 * Esta é a seção que ataca a objeção nº1 do síndico: a responsabilidade
 * subsidiária do condomínio pela Súmula 331 do TST. Nenhum concorrente
 * analisado na pesquisa transforma isso em argumento de venda visível —
 * é o diferencial real da página, não um bloco de "confiança" genérico.
 */
const documentos = [
  'Guias de recolhimento de FGTS',
  'Guias de recolhimento de INSS',
  'Folha de pagamento da equipe',
  'Certidões negativas (federal, estadual, municipal, trabalhista)',
];

export function Conformidade() {
  return (
    <section id="conformidade" className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Conformidade"
          title="Sua fiscalização documentada, todo mês, sem você precisar cobrar."
          description="Pela Súmula 331 do TST, o condomínio tem responsabilidade subsidiária pelos encargos trabalhistas da terceirizada. O que protege o síndico é a fiscalização, que precisa ser documentada."
          onDark
        />

        <Reveal className="mt-12 max-w-2xl">
          <ul className="space-y-3" role="list">
            {documentos.map((doc) => (
              <li key={doc} className="flex items-start gap-3 text-graymid">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-graymid">
            Documentos entregues junto com a nota fiscal, mensalmente, sem necessidade de
            solicitação.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
