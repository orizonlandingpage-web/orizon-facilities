import { site } from '../config/site';

/**
 * Monta um link https://wa.me com mensagem pré-preenchida.
 * O número precisa vir só com dígitos (55 + DDD + número) — sem +, espaço,
 * hífen ou parênteses; senão o WhatsApp Web não reconhece o destinatário.
 */
export function buildWhatsAppLink(mensagem: string, numero: string = site.whatsappNumero): string {
  if (!/^\d{10,15}$/.test(numero)) {
    throw new Error(`Número de WhatsApp inválido: "${numero}". Use só dígitos, com código do país.`);
  }
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

interface DadosFormularioContato {
  nome: string;
  condominio: string;
  servico: string;
}

/**
 * Monta a mensagem do formulário de contato a partir dos campos preenchidos.
 * Campos vazios são omitidos da mensagem em vez de aparecerem em branco.
 */
export function montarMensagemContato(dados: DadosFormularioContato): string {
  const linhas = [
    'Olá! Gostaria de uma proposta para o meu condomínio.',
    dados.nome.trim() && `Nome: ${dados.nome.trim()}`,
    dados.condominio.trim() && `Condomínio: ${dados.condominio.trim()}`,
    dados.servico.trim() && `Serviço de interesse: ${dados.servico.trim()}`,
  ].filter(Boolean);

  return linhas.join('\n');
}
