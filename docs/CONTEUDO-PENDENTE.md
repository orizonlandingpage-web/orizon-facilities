# Conteúdo pendente antes de publicar

Este arquivo lista tudo que está como placeholder na landing page e precisa de
dado real da Orizon antes do site ir ao ar. Nada aqui é opcional — publicar
número ou depoimento fictício é publicidade enganosa (CDC, arts. 36–37).

## Bloqueante — jurídico

- [ ] **Segurança/vigilância patrimonial.** O 4º serviço está nomeado
  "Controle de Acesso e Monitoramento" porque a Orizon não tem autorização de
  funcionamento da Polícia Federal (exigida pela Lei nº 14.967/2024) para
  vigilância patrimonial. Se a Orizon obtiver essa autorização, revisar
  `src/sections/Servicos.tsx` e a copy do hero para reposicionar o serviço
  como "Segurança Patrimonial" e **exibir o número da autorização** — é o
  gatilho de confiança mais forte disponível para essa seção.

## Dados da empresa (`src/config/site.ts`)

- [ ] Número de WhatsApp real (hoje: `5511900000000`)
- [ ] Telefone
- [ ] E-mail
- [ ] Cidade(s)/região de atuação real
- [ ] CNPJ

## FAQ (`src/sections/FAQ.tsx`)

- [ ] Prazo médio real de implantação (pergunta 6)
- [ ] Prazo mínimo de contrato e condições de rescisão (pergunta 7)

## Diferenciais (`src/sections/Diferenciais.tsx`)

Os bullets afirmam compromissos operacionais (cobertura de falta no mesmo
turno, supervisor com visita periódica, baixo turnover). Confirmar que a
operação real sustenta cada um antes de publicar — diferencial que não se
cumpre gera reclamação pública, e o setor é sensível a isso (síndico consulta
Reclame Aqui).

## Imagens

Resolvido — hero e os cards de serviço usam imagens de marca definitivas
(ver `CREDITOS-IMAGENS.md`). `PROMPTS-IMAGENS.md` fica só como referência caso
queira gerar variações no futuro.
