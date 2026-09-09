import { site } from '../config/site.ts';
import { perguntas } from '../config/faq.ts';

/**
 * Monta o JSON-LD (@graph) injetado estaticamente no <head> do build por
 * vite.config.ts (plugin `transformIndexHtml`). Fica no HTML final, não em
 * runtime do React — crawlers que não executam JS (Bing, WhatsApp, LinkedIn,
 * boa parte dos bots de IA) só enxergam o schema se ele estiver no arquivo.
 *
 * Três nós:
 * - ProfessionalService: dados da empresa. Sem `address` (não há endereço
 *   comercial público hoje — ver checklist de SEO) e sem `aggregateRating`
 *   (não existe avaliação real; inventar violaria as diretrizes do Google e
 *   o CDC, arts. 36-37).
 * - WebSite: aponta para o ProfessionalService via `publisher`.
 * - FAQPage: gerado de src/config/faq.ts, a mesma fonte usada pela UI em
 *   src/sections/FAQ.tsx — não duplicar a lista em outro lugar.
 */
export function buildStructuredData() {
  const empresaId = `${site.url}/#empresa`;

  const servicos = [
    'Limpeza e Conservação',
    'Manutenção Predial',
    'Jardinagem e Paisagismo',
    'Controle de Acesso e Monitoramento',
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService' as const,
        '@id': empresaId,
        name: site.nome,
        description: site.descricaoCurta,
        url: site.url,
        logo: `${site.url}/images/logo.webp`,
        image: `${site.url}/images/hero-1600.webp`,
        telephone: site.telefone,
        email: site.email,
        inLanguage: 'pt-BR',
        areaServed: site.regiaoAtendida.map((cidade) => ({
          '@type': 'City',
          name: cidade,
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços condominiais',
          itemListElement: servicos.map((nome) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: nome },
          })),
        },
      },
      {
        '@type': 'WebSite' as const,
        url: site.url,
        name: site.nome,
        inLanguage: 'pt-BR',
        publisher: { '@id': empresaId },
      },
      {
        '@type': 'FAQPage' as const,
        mainEntity: perguntas.map((item) => ({
          '@type': 'Question',
          name: item.pergunta,
          acceptedAnswer: { '@type': 'Answer', text: item.resposta },
        })),
      },
    ],
  };
}
