import { SectionHeading } from '../components/SectionHeading';

/**
 * Usa <details>/<summary> nativo: acessível de graça (navegável por
 * teclado, anunciado por screen reader como "collapsed/expanded" sem
 * nenhum JS ou aria-expanded manual).
 *
 * Perguntas 6 e 7 têm placeholder de prazo — ver docs/CONTEUDO-PENDENTE.md.
 */
const perguntas = [
  {
    pergunta: 'Terceirizar sai mais caro que contratar pela CLT?',
    resposta:
      'Nem sempre é mais barato no valor nominal, pois os encargos são os mesmos e há a margem da prestadora. O que muda é o custo total e o risco: acabam o 13º, as férias, a rescisão e a hora extra de cobertura. Desconfie de proposta muito abaixo do mercado: costuma significar inadimplência trabalhista adiante.',
  },
  {
    pergunta: 'O condomínio pode ser processado por um funcionário terceirizado?',
    resposta:
      'O condomínio tem responsabilidade subsidiária: se a prestadora não pagar, ele pode ser acionado (Súmula 331 do TST). A proteção real é escolher bem e fiscalizar, por isso a Orizon entrega mensalmente guias de FGTS e INSS, folha de pagamento e certidões negativas.',
  },
  {
    pergunta: 'Existe risco de reconhecimento de vínculo com o condomínio?',
    resposta:
      'A Lei 13.429/2017 afasta o vínculo empregatício direto, desde que não haja subordinação direta: quem dá ordem, escala e feedback ao colaborador é a Orizon, não o síndico.',
  },
  {
    pergunta: 'E quando alguém falta? Fico sem cobertura no posto?',
    resposta:
      'Não. A escala é dimensionada com folguista e plantonista para cobrir falta, atestado e férias: é justamente o que se contrata numa terceirização, garantindo continuidade do posto.',
  },
  {
    pergunta: 'Quem treina e equipa a equipe?',
    resposta:
      'A Orizon. Seleção, integração, treinamento de função e de segurança do trabalho, uniforme e EPI são por nossa conta.',
  },
  {
    pergunta: 'Qual o prazo mínimo de contrato?',
    resposta: 'O prazo mínimo é de 12 meses.',
  },
];

export function FAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  };

  return (
    <section className="bg-offwhite px-6 py-24">
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

      {/* JSON-LD estático (sem dado de usuário) para o rich snippet de FAQ no Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
