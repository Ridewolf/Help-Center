# Análises — Mapas de Calor

A página Mapas de Calor (`/analytics/heatmaps`) é um **visualizador geográfico de densidade**: escolha uma fonte de dados, um intervalo de datas e um modo de visualização — o mapa mostra onde a atividade se concentra na sua área de operação.

Use para **descoberta de demanda** (onde os riders querem começar? onde terminam?) e **planejamento de cobertura** (onde os riders procuram, mas não temos veículos?).

## Fontes de dados

Três fontes de sinal, uma de cada vez:

| Fonte          | O que mostra                                                             |
| -------------- | ------------------------------------------------------------------------ |
| **Scans**      | Onde os riders **abriram o app e buscaram veículos** — intenção de demanda |
| **Inícios de corrida** | Onde as corridas **realmente começaram** — demanda convertida           |
| **Fins de corrida**   | Onde as corridas **terminaram** — locais naturais de desembarque        |

Compare _Scans_ vs _Inícios de corrida_ para encontrar **demanda não atendida**: lugares onde os riders procuraram mas não encontraram veículo.

## Modos de visualização

Quatro formas de renderizar os mesmos dados:

| Modo         | O que desenha                                                                    |
| ------------ | -------------------------------------------------------------------------------- |
| **Mapa de calor**  | Clássico desfoque suave — melhor para **ver picos** rapidamente                 |
| **Hexágonos** | Bin hexagonal — melhor para **comparar zonas** com geometria consistente         |
| **Clusters** | Agrupamentos de pontos que se expandem ao dar zoom — melhor para **analisar pontos individuais** |
| **Grade**     | Grade quadrada regular — melhor para **alinhar com zonas de planejamento**       |

Os mesmos dados podem contar histórias diferentes em modos distintos — alterne enquanto investiga.

## Esquemas de cores

Uma linha de pequenas amostras permite escolher o esquema de cores — útil para operadores daltônicos ou para combinar com a paleta da marca. O nome do esquema aparece como dica ao passar o mouse.

## Controle deslizante de pontos

Um controle deslizante na barra de ferramentas permite controlar quantos pontos de dados serão amostrados (ex: 1k / 10k / 100k). Mais pontos = imagem de densidade mais precisa, porém renderização mais lenta. Comece com poucos enquanto explora, aumente quando restringir a área / intervalo.

## Intervalo de datas

Uma barra padrão de intervalo de datas no topo. Quanto maior o intervalo, mais agregada a imagem; para "o que aconteceu esta manhã" escolha algumas horas.

## Mapa

O mapa preenche a página. Controles padrão de mapa (panorâmica, zoom, alternar camadas). A sobreposição do mapa de calor fica sobre a base do mapa.

Uma **legenda** em um canto explica a escala de cores do modo ativo — densidade de baixa a alta.

## Fluxos de trabalho típicos

- **Encontrar demanda não atendida** — Fonte = Scans, Modo = Mapa de calor → identifique uma área quente → mude a Fonte para Inícios de corrida → se a mesma área estiver fria = demanda não atendida → considere reequilibrar ou expandir para essa área
- **Planejar uma nova zona** — Fonte = Fins de corrida, Modo = Hexágonos → procure concentrações naturais de desembarque fora das zonas atuais → proponha para operações
- **Analisar um ponto quente** — Modo = Clusters → dê zoom na área quente → pontos individuais mostram lat/long exatos; cruze com [Busca de Veículo](vehicles.md) para detalhes da corrida
- **Comparar janelas de tempo** — carregue Scans da manhã → capture tela → mude para Scans da noite → compare as capturas lado a lado (o painel ainda não suporta visualização de dois períodos; exportação manual necessária)
- **Auditoria de cobertura** — Fonte = Scans da última semana → procure pontos quentes longe de qualquer zona planejada → considere redesenhar os limites da zona

## Dicas

- **Scans ≠ corridas** — muitas buscas não se convertem (rider não vê veículo, vê preço, desiste). A diferença entre Scans e Inícios de corrida é seu sinal mais acionável
- **Modo mapa de calor oculta escala** — as cores são relativas dentro do mapa visível; o zoom muda a imagem. O modo Hexágonos é mais fiel em níveis fixos de zoom
- **Comece com poucos pontos, termine com muitos** — explorar com 1k pontos é rápido; só aumente para 100k quando souber o que está vendo
- **Modo grade para planejamento** — se suas zonas forem mais retangulares, a Grade se alinha a elas e facilita os cálculos; caso contrário prefira Hexágonos
- **Daltônico?** — experimente os esquemas alternativos; os dados subjacentes são os mesmos
- **O mapa não atualiza automaticamente ao mudar a data** — dependendo da configuração, pode ser necessário clicar em _Aplicar_ / _Atualizar_ após alterar o intervalo de datas
- **Legenda importa** — o que parece "vermelho e dramático" pode ser uma contagem absoluta pequena; sempre confira a legenda antes de interpretar
