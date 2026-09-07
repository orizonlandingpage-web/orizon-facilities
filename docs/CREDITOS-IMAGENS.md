# Créditos de imagens

## `public/images/hero-1600.webp` / `hero-800.webp` e os 4 `servico-*.webp`

**Imagens geradas por IA, fornecidas pelo usuário** (com a marca Orizon já
aplicada — uniforme, logo, sinalização), substituindo os placeholders de banco
de imagens da primeira versão. Não exigem crédito de fotógrafo/banco.

Os arquivos originais (maior resolução, antes do redimensionamento para uso no
site) ficam guardados em `assets-originais/` na raiz do projeto — **fora de
`public/`**, para não ir para o build/deploy. Se precisar gerar variações ou
regenerar em resolução maior, comece a partir de lá.

| Arquivo servido | Original em `assets-originais/` | Uso |
|---|---|---|
| `hero-1600.webp` / `hero-800.webp` | `hero.jpg` | Fundo do hero (Ken Burns) |
| `servico-limpeza.webp` / `-500.webp` | `limpeza.webp` | Card "Limpeza e Conservação" |
| `servico-manutencao.webp` / `-500.webp` | `manutencao.webp` | Card "Manutenção Predial" |
| `servico-jardinagem.webp` / `-500.webp` | `jardinagem.webp` | Card "Jardinagem e Paisagismo" |
| `servico-acesso.webp` / `-500.webp` | `acesso.webp` | Card "Controle de Acesso e Monitoramento" |

**Tratamento aplicado:** redimensionadas (1600/800px o hero; 800/500px os
cards), convertidas para WebP (qualidade 82). Sem recorte manual — o
enquadramento final é feito via `object-cover`/`object-position` no CSS
(ver comentário em `src/sections/Hero.tsx` sobre por que o hero usa
`object-[25%_center]`).

**Nota sobre `servico-manutencao.webp`:** substitui a foto antiga de
porteiro/recepção usada quando o serviço se chamava "Portaria" (renomeado
para "Manutenção Predial" — controle de acesso já cobre a função de
portaria/recepção). O arquivo antigo (`portaria.webp`) permanece em
`assets-originais/` só por rastreabilidade histórica, sem uso no site.

**Nota sobre `servico-acesso.webp`:** deliberadamente não mostra vigilante,
ronda ou vigilância patrimonial — mostra tecnologia/sala de controle de acesso,
consistente com o card "Controle de Acesso e Monitoramento" (ver
`CONTEUDO-PENDENTE.md` sobre por que este serviço não pode ser posicionado como
"segurança").

## Logo (`public/images/logo*.webp`, `public/*icon*.png`, `public/favicon-32.png`)

Fornecida pelo usuário em `public/images/Logo.png` (autoria da Orizon/terceiro
contratado pela Orizon — não é asset de banco de imagens). Processada localmente
com ffmpeg: recorte da área transparente, geração da versão branca (silhueta,
para uso sobre navy) e do favicon/apple-touch-icon a partir do emblema. Nenhuma
edição de conteúdo, só recorte e redimensionamento.

## Histórico — fotos de banco substituídas

A primeira versão da página usava fotos do Pexels (licença de uso comercial
livre) como placeholder no hero e nos 4 cards de serviço, até o usuário
fornecer as imagens de marca acima. Não estão mais em uso, mas ficam
registradas aqui por rastreabilidade:

| Uso anterior | Foto | Fotógrafo(a) |
|---|---|---|
| Hero | [Balconies of a Modern Apartment Building](https://www.pexels.com/photo/balconies-of-a-modern-apartment-building-16110999/) | Ayşegül Aytören |
| Limpeza | [Group of people cleaning a dining room](https://www.pexels.com/photo/group-of-people-cleaning-a-dining-room-6197108/) | Tima Miroshnichenko |
| Portaria | [A receptionist looking at a tablet](https://www.pexels.com/photo/a-receptionist-looking-at-a-tablet-4269266/) | Cedric Fauntleroy |
| Jardinagem | [Gardener trimming hedges with pruning shears](https://www.pexels.com/photo/gardener-trimming-hedges-with-pruning-shears-38936338/) | Magda Ehlers |
| Controle de Acesso | [Smartphone NFC access control in modern building](https://www.pexels.com/photo/smartphone-nfc-access-control-in-modern-building-33335189/) | Jakub Zerdzicki |

Todas sob [Pexels License](https://www.pexels.com/license/).
