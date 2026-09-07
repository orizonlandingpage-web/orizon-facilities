import { describe, expect, it } from 'vitest';
import { buildWhatsAppLink, montarMensagemContato } from './whatsapp';

describe('buildWhatsAppLink', () => {
  it('monta o link com número e mensagem codificados', () => {
    const link = buildWhatsAppLink('Olá, tudo bem?', '5511987654321');
    expect(link).toBe('https://wa.me/5511987654321?text=Ol%C3%A1%2C%20tudo%20bem%3F');
  });

  it('escapa acentos e quebras de linha corretamente', () => {
    const link = buildWhatsAppLink('Condomínio: Água Branca\nServiço: Jardinagem');
    expect(link).toContain('Condom%C3%ADnio');
    expect(link).toContain('%0A');
  });

  it('rejeita número com caracteres além de dígitos', () => {
    expect(() => buildWhatsAppLink('oi', '+55 (11) 98765-4321')).toThrow(/inválido/);
  });

  it('rejeita número muito curto', () => {
    expect(() => buildWhatsAppLink('oi', '123')).toThrow(/inválido/);
  });
});

describe('montarMensagemContato', () => {
  it('inclui todos os campos preenchidos', () => {
    const msg = montarMensagemContato({
      nome: 'Maria Silva',
      condominio: 'Ed. Jardins',
      servico: 'Manutenção Predial',
    });
    expect(msg).toContain('Nome: Maria Silva');
    expect(msg).toContain('Condomínio: Ed. Jardins');
    expect(msg).toContain('Serviço de interesse: Manutenção Predial');
  });

  it('omite campos vazios em vez de deixar em branco', () => {
    const msg = montarMensagemContato({ nome: 'João', condominio: '', servico: '' });
    expect(msg).toContain('Nome: João');
    expect(msg).not.toContain('Condomínio:');
    expect(msg).not.toContain('Serviço de interesse:');
  });
});
