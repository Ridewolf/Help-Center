# Reprodutor de Replay

O Reprodutor de Replay (`/apps/replay-player`) é uma ferramenta forense que anima o trajeto GPS de um veículo ao longo de um dia — ou a rota completa de uma única corrida — em um mapa. Use-o para investigar incidentes, validar reivindicações de passageiros, auditar rotas incomuns ou simplesmente assistir a movimentação da frota.

Não é um mapa em tempo real (para isso, veja o Painel em tempo real) — ele reproduz **coordenadas históricas** do backend com controle total da linha do tempo.

Permissão necessária: **Replay Player** (`k7m8n9`).

## Layout

A página é dividida em uma barra lateral esquerda (seletores + painéis de informações) e uma grande área de mapa com uma barra de controles na parte inferior:

| Região       | Largura | Conteúdo                                                               |
| ------------ | ------- | --------------------------------------------------------------------- |
| **Barra lateral**  | 320 px | Abas de seleção (Por Veículo / Por Corrida), painel(s) de informações por veículo |
| **Mapa**      | flex    | Mapa MapLibre com a polilinha da rota, marcadores de início / fim, cursor ao vivo |
| **Controles** | inferior| Reproduzir / pausar, menu de velocidade, controle deslizante da linha do tempo, leitura de tempo decorrido / total |

## Controles (barra lateral)

A barra lateral controla **o que** será reproduzido. Ela possui duas abas que alternam o modelo de seleção.

### Aba Por Veículo

Reproduza o trajeto completo de um ou mais veículos durante o dia (ou qualquer data que escolher):

- **Veículos** — seleção múltipla de até **5** veículos. Digite para pesquisar, filtre a lista por etiquetas no menu suspenso abaixo.
- **Data** — popover de calendário; padrão é hoje. A reprodução cobre o dia inteiro no horário local da data escolhida.
- **Etiquetas** — restringe o menu de veículos aos que possuem qualquer uma das etiquetas selecionadas. Útil para frotas grandes.
- **Carregar** — busca as coordenadas do dia para todos os veículos selecionados em paralelo e as renderiza.

Ao carregar vários veículos, cada um recebe sua própria polilinha (colorida pela velocidade) e seu próprio marcador móvel no mapa, além de um cartão de informações dedicado na barra lateral.

### Aba Por Corrida

Reproduza as coordenadas de uma única corrida em vez de um dia inteiro:

- **Veículo** (opcional) — seleção única; restringe a lista de corridas abaixo
- **Data** (opcional) — popover de calendário; filtra corridas para um único dia. Limpe para ver todas as datas.
- **Etiquetas** (opcional) — filtra a lista de corridas por etiquetas de veículos
- **Lista de corridas** — lista rolável e paginada de corridas que correspondem aos filtros acima. Cada cartão mostra o horário de início, pílula de status, duração e distância.

Clicar em um cartão de corrida carrega suas coordenadas imediatamente — não é necessário botão Carregar separado.

## Linha do tempo (barra inferior)

A barra de controles fica na parte inferior do mapa:

| Controle           | Função                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Reproduzir / Pausar** | Inicia ou pausa a animação                                                            |
| **Menu de velocidade**  | Escolhe o multiplicador da velocidade de reprodução (veja abaixo)                      |
| **Controle deslizante da linha do tempo** | Avança para qualquer ponto na reprodução; o mapa atualiza instantaneamente          |
| **Decorrido / Total**   | `mm:ss` (ou `h:mm:ss` se maior que uma hora) — tempo decorrido da reprodução e duração total |

Quando vários veículos são carregados, o controle deslizante abrange o início e fim **global** da união de todos os trajetos. Trajetos que ainda não começaram no tempo atual simplesmente não têm marcador no mapa.

## Mapa

O mapa usa o estilo do tema atual (veja [Themes](../../features/ux/themes.md)). Para cada trajeto carregado:

- Uma **polilinha** é desenhada colorida pela velocidade — verde para lento, laranja para médio, vermelho para rápido
- Um **marcador verde de Início** é colocado no primeiro ponto
- Um **marcador vermelho de Fim** é colocado no último ponto
- Um **marcador de veículo** se move ao longo da linha conforme a linha do tempo avança

Os controles do mapa ficam no canto superior direito (empilhamento vertical):

| Botão             | Função                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Zoom in / out** | Zoom padrão do mapa                                                                        |
| **Redefinir orientação** | Rotaciona o mapa para o norte para cima se você tiver inclinado / rotacionado            |
| **Ajustar limites** | Dá zoom / move para ajustar toda a(s) rota(s) na visualização — útil após uma reprodução longa que desloca a câmera |
| **Tela cheia**    | Coloca o mapa em tela cheia; a barra de controles permanece na parte inferior               |

## Velocidade de reprodução

O menu de velocidade oferece oito predefinições: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** reproduz o replay em tempo real — uma corrida de 20 minutos leva 20 minutos para ser reproduzida
- **128x** comprime um dia de 8 horas em cerca de 4 minutos
- A velocidade pode ser alterada durante a reprodução; a animação continua suavemente de onde parou

Use velocidades mais altas (32x / 64x / 128x) para replays de veículos durante o dia inteiro, velocidades mais baixas (1x / 2x / 4x) para análises forenses de corridas onde você quer ver exatamente onde o passageiro estava a cada segundo.

## Painel de informações por veículo

Cada veículo carregado recebe um pequeno cartão na barra lateral que atualiza ao vivo conforme a reprodução avança:

| Campo           | O que mostra                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **Velocidade**  | Velocidade interpolada atual em km/h (codificada por cores verde / amarelo / vermelho) |
| **Coordenadas** | Latitude / longitude atuais com 6 casas decimais                          |
| **Distância**   | Distância acumulada percorrida até agora em km (haversine, calculada no cliente) |
| **Ponto**       | Índice do ponto atual / total de pontos (progresso no conjunto de dados)   |

Quando a reprodução não foi iniciada ou nenhum dado está carregado, o cartão mostra travessões.

## Estados vazios / de carregamento

- **Nenhuma seleção** — a área do mapa mostra um ícone de play e a mensagem "Selecione um veículo e data ou corrida para iniciar a repetição"
- **Carregando** — um spinner centralizado com "Carregando coordenadas..." sobrepõe o mapa
- **Sem dados** — se a data / corrida escolhida não tiver pontos de coordenadas, um aviso em toast diz "Nenhum dado de coordenada encontrado para esta seleção" e o mapa permanece vazio
- **Falha no carregamento do mapa** — o mapa é um chunk preguiçoso (~1 MB); se o carregamento falhar (deploy desatualizado, offline), você verá um toast de erro solicitando que atualize a página

## Fluxos típicos

- **Investigar uma reclamação** — mude para Por Corrida, pesquise a corrida do usuário, clique nela → assista a rota em 4x para ver onde ele realmente foi versus o que alegou
- **Auditar um veículo "perdido"** — Por Veículo, escolha a unidade, defina a data de hoje → reproduza em 128x para ver o dia inteiro em segundos; a última posição do marcador é onde ele está atualmente
- **Comparar dois veículos** — Por Veículo, selecione duas unidades que fizeram rotas similares, mesma data → ambas as polilinhas e marcadores são exibidos juntos para comparação visual
- **Localizar o horário de um evento** — carregue uma corrida → arraste o controle deslizante até o timestamp de um bilhete / registro → leia as coordenadas no painel de informações
- **Detectar excesso de velocidade** — carregue o dia de um veículo → procure segmentos de polilinha **vermelhos** → arraste o controle deslizante para essa área para confirmar

## Dicas

- **Máximo de 5 veículos** por vez — a interface limita a seleção múltipla para manter o desempenho do mapa razoável. Para mais, faça sessões separadas.
- **Use Ajustar Limites após uma longa reprodução** — a reprodução segue o marcador, que desloca a câmera; um clique em Ajustar Limites reencaixa toda a rota.
- **As cores de velocidade não estão vinculadas a tarifas** — são apenas indicações visuais baseadas na velocidade GPS observada (>15 km/h amarelo, >30 km/h vermelho). Compare com o _modo de velocidade_ do veículo na página de detalhes do veículo para contexto.
- **O controle deslizante pode ser arrastado em ambas as direções** — arraste para trás para retroceder. Combine com baixa velocidade para avançar por segmentos difíceis.
- **Sem estado na URL** — as seleções não são persistidas na URL, então você não pode compartilhar um link direto. Salve capturas de tela se precisar marcar um momento.
- **Combine com a página [Ride Detail](../../operations/trips/ride-detail.md)** — o detalhe da corrida tem um mapa de rota estático com eventos na linha do tempo; o player de repetição adiciona a dimensão temporal sobre ele.
