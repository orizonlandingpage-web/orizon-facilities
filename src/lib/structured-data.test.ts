import { describe, expect, it } from 'vitest';
import { buildStructuredData } from './structured-data';
import { site } from '../config/site';
import { perguntas } from '../config/faq';

describe('buildStructuredData', () => {
  const grafo = buildStructuredData()['@graph'];
  const tipos = grafo.map((no) => no['@type']);

  function acha<T extends (typeof grafo)[number]['@type']>(tipo: T) {
    const no = grafo.find((item) => item['@type'] === tipo);
    if (!no) throw new Error(`Nó "${tipo}" não encontrado no @graph`);
    return no as Extract<(typeof grafo)[number], { '@type': T }>;
  }

  it('inclui os três nós esperados', () => {
    expect(tipos).toEqual(['ProfessionalService', 'WebSite', 'FAQPage']);
  });

  it('usa site.url em vez de domínio hardcodado', () => {
    const empresa = acha('ProfessionalService');
    expect(empresa.url).toBe(site.url);
    expect(empresa['@id']).toBe(`${site.url}/#empresa`);
    expect(acha('WebSite').url).toBe(site.url);
  });

  it('gera uma Question por pergunta de src/config/faq.ts', () => {
    const faqPage = acha('FAQPage');
    expect(faqPage.mainEntity).toHaveLength(perguntas.length);
    expect(faqPage.mainEntity[0]?.name).toBe(perguntas[0].pergunta);
  });

  it('nunca menciona vocabulário proibido por Lei nº 14.967/2024', () => {
    const texto = JSON.stringify(buildStructuredData()).toLowerCase();
    expect(texto).not.toMatch(/vigilância|ronda|segurança patrimonial/);
  });
});
