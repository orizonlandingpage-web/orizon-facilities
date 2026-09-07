import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const passos = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    texto:
      'Visitamos o condomínio, medimos área, fluxo e rotina, e ouvimos o que não está funcionando hoje. Sem custo e sem compromisso.',
  },
  {
    numero: '02',
    titulo: 'Proposta dimensionada',
    texto:
      'Você recebe o desenho dos postos, escalas e escopo por serviço, item por item, sem pacote fechado que ninguém entende.',
  },
  {
    numero: '03',
    titulo: 'Implantação assistida',
    texto:
      'Contrato assinado, seleção, treinamento, uniformes e integração da equipe, sem o condomínio ficar descoberto.',
  },
  {
    numero: '04',
    titulo: 'Operação com supervisão',
    texto:
      'Visitas do supervisor, checklists, canal direto com o síndico e documentação trabalhista entregue todo mês.',
  },
];

export function Processo() {
  return (
    <section className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Como funciona"
          title="Da primeira conversa ao primeiro dia de operação."
        />

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((passo) => (
            <li key={passo.numero}>
              <Reveal>
                <span className="font-display text-3xl text-gold-text">{passo.numero}</span>
                <h3 className="mt-3 font-display text-lg text-navy">{passo.titulo}</h3>
                <p className="mt-2 text-graytext">{passo.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
