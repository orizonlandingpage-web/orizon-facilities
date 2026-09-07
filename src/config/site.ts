/**
 * Único lugar com dados reais/placeholder da empresa.
 * Nenhum outro arquivo deve hardcodar telefone, WhatsApp, CNPJ ou número de
 * postos/anos de mercado — importe daqui.
 *
 * TODO(orizon): substituir todos os placeholders abaixo pelos dados reais
 * antes de publicar a página. Ver docs/CONTEUDO-PENDENTE.md para a lista
 * completa do que falta levantar.
 */
export const site = {
  nome: 'Orizon Facilities',

  // 55 + DDD + número, só dígitos (sem +, espaço, hífen ou parênteses)
  whatsappNumero: '5579996384207',
  whatsappMensagemPadrao: 'Olá! Vim pelo site da Orizon Facilities e gostaria de um orçamento.',

  telefone: '(79) 99638-4207',
  email: 'orizonfacilities@gmail.com',
  cidade: 'Sergipe',

  cnpj: '00.000.000/0001-00',
} as const;
