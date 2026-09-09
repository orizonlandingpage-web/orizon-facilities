import { site } from './site.ts';

/**
 * Fonte única das perguntas frequentes: consumida pela UI
 * (src/sections/FAQ.tsx) e pelo schema FAQPage estático
 * (src/lib/structured-data.ts). Evita ter a mesma pergunta escrita duas
 * vezes e divergindo com o tempo.
 *
 * Perguntas 6 e 7 têm placeholder de prazo — ver docs/CONTEUDO-PENDENTE.md.
 */
export const perguntas = [
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
  {
    pergunta: 'Vocês atendem quais cidades?',
    resposta: `Atendemos condomínios em ${site.regiaoAtendida.join(', ')}.`,
  },
  {
    pergunta: 'Quanto custa terceirizar a limpeza de um condomínio?',
    resposta:
      'O valor depende do número de postos, da jornada (diurna, noturna, 12x36) e dos encargos de cada função — não existe tabela fechada. Por isso o diagnóstico inicial é gratuito: medimos a área e o fluxo do seu condomínio antes de fechar qualquer número.',
  },
  {
    pergunta: 'Vocês fazem portaria e controle de acesso?',
    resposta:
      'Sim, com triagem de visitantes, controle de entrada e saída e procedimento escrito. É um serviço de portaria e monitoramento, dimensionado conforme o fluxo do seu condomínio.',
  },
] as const;
