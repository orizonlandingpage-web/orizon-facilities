import { useState, type FormEvent } from 'react';
import { site } from '../config/site';
import { buildWhatsAppLink, montarMensagemContato } from '../lib/whatsapp';
import { trackWhatsAppClick } from '../lib/analytics';

/**
 * Formulário de 4 campos que NÃO envia nada a um backend — monta a
 * mensagem e abre o WhatsApp. Decisão do usuário: contato 100% estático,
 * sem servidor, sem chave de API. `preventDefault()` evita o reload da
 * página, que perderia o estado da SPA.
 */
export function CTAFinal() {
  const [nome, setNome] = useState('');
  const [condominio, setCondominio] = useState('');
  const [servico, setServico] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const mensagem = montarMensagemContato({ nome, condominio, servico });
    trackWhatsAppClick('formulario');
    window.open(buildWhatsAppLink(mensagem), '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="contato" className="bg-offwhite px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl text-navy sm:text-4xl">
          Peça uma proposta feita para o seu condomínio, não uma tabela de preços.
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-gold" aria-hidden="true" />
        <p className="mt-4 text-graytext">
          Cada condomínio tem porte, fluxo e rotina diferentes. Um especialista da Orizon analisa o
          seu caso antes de falar em valor.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5 text-left">
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-navy">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full rounded-md border border-graymid/40 bg-white px-4 py-2.5
                text-navy focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="condominio" className="block text-sm font-semibold text-navy">
              Condomínio ou administradora
            </label>
            <input
              id="condominio"
              name="condominio"
              type="text"
              required
              value={condominio}
              onChange={(e) => setCondominio(e.target.value)}
              className="mt-1 w-full rounded-md border border-graymid/40 bg-white px-4 py-2.5
                text-navy focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="servico" className="block text-sm font-semibold text-navy">
              Serviço de interesse
            </label>
            <select
              id="servico"
              name="servico"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className="mt-1 w-full rounded-md border border-graymid/40 bg-white px-4 py-2.5
                text-navy focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none"
            >
              <option value="">Ainda não sei / quero todos</option>
              <option value="Limpeza e Conservação">Limpeza e Conservação</option>
              <option value="Manutenção Predial">Manutenção Predial</option>
              <option value="Jardinagem e Paisagismo">Jardinagem e Paisagismo</option>
              <option value="Controle de Acesso e Monitoramento">
                Controle de Acesso e Monitoramento
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gold px-7 py-3 font-body font-semibold text-navy
              transition-colors hover:bg-gold/90 focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Solicitar proposta pelo WhatsApp
          </button>

          <p className="text-center text-xs text-graytext">
            Sem compromisso. Seus dados não são compartilhados com terceiros.
          </p>
        </form>

        <p className="mt-6 text-sm text-graytext">
          Prefere ligar? {site.telefone} · {site.email}
        </p>
      </div>
    </section>
  );
}
