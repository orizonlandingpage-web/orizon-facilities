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
  cidade: 'Aracaju',
  estado: 'SE',

  // Cidades cobertas pela operação — usadas no Footer, no Hero e no schema
  // (areaServed) de src/lib/structured-data.ts. Uma fonte só para todas.
  regiaoAtendida: ['Aracaju', 'Barra dos Coqueiros', 'São Cristóvão', 'Nossa Senhora do Socorro'],
  regiaoTexto: 'Aracaju e região metropolitana',

  cnpj: '00.000.000/0001-00',

  // Sem barra final: canonical, Open Graph e sitemap.xml montam a URL a
  // partir daqui (ex.: `${site.url}/`). Trocar aqui é o único lugar a mudar
  // quando o domínio definitivo estiver registrado.
  url: 'https://orizonfacilities.com.br',

  // Reusada em <meta name="description">, Open Graph e no schema
  // ProfessionalService — mantém a mensagem de venda idêntica em todo canal.
  descricaoCurta:
    'Limpeza, portaria, manutenção predial e jardinagem para condomínios em Aracaju e região. Escala 100% coberta e conformidade trabalhista auditada todo mês.',
} as const;
