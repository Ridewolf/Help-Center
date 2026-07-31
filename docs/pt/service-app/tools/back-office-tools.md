# Ferramentas de Back-Office no Aplicativo de Serviço

Além das telas de campo, o Aplicativo de Serviço possui um conjunto de ferramentas de back-office: reprodução de rotas, análises e as três filas de suporte. Este artigo explica o que cada uma faz no aplicativo e onde difere do mesmo recurso no painel do operador.

**Tudo aqui, exceto o Replay Player, está disponível apenas para proprietários** e simplesmente não aparece no [menu de navegação](../basics/overview.md#a-gaveta-de-navegação) para outros operadores — não há item desabilitado para tocar.

## Replay Player

**Replay Player** (`/replay-player`) reconstrói para onde um veículo foi em um dia específico.

1. **Escolha um veículo.** Até 500 veículos são pré-carregados, ordenados alfabeticamente. Filtre a lista digitando parte de uma etiqueta ou IMEI.
2. **Escolha um dia** no calendário. Datas futuras não podem ser selecionadas.
3. O aplicativo carrega as coordenadas desse veículo para o dia local inteiro. Um dia sem dados mostra "Sem dados para este dia".

### O mapa

- As zonas são desenhadas por baixo
- A rota inteira aparece como uma linha fina e esmaecida, colorida pela velocidade
- A parte que você já reproduziu aparece como um rastro grosso
- Um triângulo verde rotativo marca o veículo
- Marcadores verdes e vermelhos indicam o início e o fim do dia

Uma **câmera de perseguição** está ativada por padrão: ela segue o veículo e ajusta o zoom conforme a velocidade muda. Movimentar, dar zoom ou girar o mapa manualmente desativa essa função — recarregue o dia se quiser ativá-la novamente.

### Controles

| Controle           | Detalhes                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Scrubber**       | Colorido pela velocidade, com ícones de eventos para estacionado, iniciado, aviso de velocidade e alerta de velocidade |
| **Zoom da linha do tempo** | De 1x a 32x, para escolher um momento preciso em um dia movimentado                      |
| **Velocidade de reprodução** | 1, 2, 4, 8, 16, 32, 64, 128x                                                           |

Atalhos de teclado (úteis na versão web):

- **Espaço** ou **K** — reproduzir / pausar
- **Setas esquerda / direita** — avançar ou retroceder 10 segundos; segure **Shift** para um minuto, **Alt** para uma hora, **Ctrl** ou **Cmd** para um dia
- **Home / End** — ir para o início ou fim do dia
- **Setas para cima / para baixo** — alternar o preset de velocidade de reprodução

O banner de dados ao vivo mostra **Velocidade** e **Distância**. Leituras de ignição, bateria, conexão e GPS não estão disponíveis atualmente no aplicativo — os campos aparecem, mas sem leitura, então um espaço em branco não indica falta de dados.

Para a ferramenta de reprodução mais completa — múltiplos veículos ao mesmo tempo, reprodução por corrida, filtro por etiqueta — use o [Replay Player](../../apps/tools/replay-player.md) do painel.

## Análises

**Análises** (`/analytics`, apenas para proprietários) é um painel diário de KPIs: receita, corridas, distância, duração, recargas e preço médio por corrida, por quilômetro e por minuto, cada um com um gráfico de tendência de 30 dias, além de um gráfico de barras por hora com seletor de métrica.

Dois detalhamentos, ambos com presets de 7, 30 e 90 dias:

| Detalhamento               | O que mostra                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| **`/analytics/payments`**  | Fluxo de pagamentos, qualidade, saldo, métodos de pagamento e maiores pagadores |
| **`/analytics/heatmaps`**  | Densidade de escaneamentos de QR, inícios ou fins de corrida (até 5.000 pontos) |

O painel tem as versões completas desses relatórios — veja [Relatório de Pagamentos](../../analytics/reports/payments.md) e [Mapas de Calor](../../analytics/reports/heatmaps.md).

## Suporte — Bilhetes

**Suporte** (`/support/tickets`, apenas para proprietários) é a fila de reclamações de veículos.

- **Status**: novo, triagem, em andamento, aguardando informações, resolvido, ignorado, duplicado
- **Prioridade**: baixo a crítico
- **Indicador de contagem regressiva do SLA**: fica laranja com menos de duas horas e vermelho após o prazo

O botão **veículo** de um bilhete abre a página desse veículo, para que você possa agir na reclamação imediatamente. O botão **tarefa de manutenção** abre a tela de Manutenção do aplicativo, que aqui é uma tela "Em Breve" (veja abaixo).

Bilhetes para um único veículo também são listados na aba **Bilhetes** da [página do veículo](../fleet/vehicle-controls.md#aba-bilhetes), onde **Resolver Todos** fecha todos de uma vez. Para a fila completa com filtros, atribuição e histórico, use o [Tickets](../../support/tickets-proofs-chat/tickets.md) do painel.

## Conversas

**Conversas** (`/support/dialogs`, apenas para proprietários) é um mensageiro ao vivo com os riders: **Assumir** e **Tomar Controle** para reivindicar um chat, um compositor de mensagens, indicador de digitação e até 5 anexos de imagem por mensagem. Se a conexão ao vivo cair, o aplicativo recarrega a cada 15 segundos.

**Enviar uma resposta desta tela não está disponível atualmente no aplicativo.** Leia as conversas aqui se ajudar no campo, mas responda aos riders pela página [Conversas](../../support/tickets-proofs-chat/conversations.md) do painel.

## Comprovantes de estacionamento

**Comprovantes de estacionamento** (`/support/park-proofs`, apenas para proprietários) é uma galeria de revisão das fotos que os riders tiram: início, estacionamento, fim e selfies. Cada foto tem uma etiqueta de previsão automática — **estacionamento**, **sem estacionamento**, **sem corrida** ou **incerto** — com um valor de confiança. Use o gesto de pinça para alternar entre layouts de 1, 2 e 3 colunas.

Ações de revisão:

| Ação                     | O que faz                                           |
| ------------------------ | --------------------------------------------------- |
| **Aprovar**              | Marca a foto como boa                               |
| **Avisar**               | Adverte o condutor; requer um comentário           |
| **Rejeitar** / **Multar**| Requer um comentário e um valor                     |
| **Bloquear**             | Bloqueia o condutor; requer um comentário          |
| **Aprovar com Comentário** | Aprova e pode anexar um código promocional opcional |

A aprovação com bônus não está disponível atualmente no aplicativo.

A fila de [Comprovantes de Estacionamento](../../support/tickets-proofs-chat/park-proofs.md) do Painel possui o fluxo completo de moderação, filtros e regras automáticas de revisão.

## Manutenção e Rebalanceamento

`/maintenance` e `/rebalancing` no Aplicativo de Serviço são telas "Em Breve": sem dados, nada para configurar. **Rebalanceamento** também aparece no menu de navegação com um selo **Em Breve**.

Isso é importante quando você responde a um operador de campo: o Painel tem suas próprias funcionalidades reais de manutenção e rebalanceamento, que são coisas completamente diferentes dessas telas. Nunca descreva a funcionalidade de manutenção do Painel como se um técnico pudesse usá-la no Aplicativo de Serviço.

## Problemas comuns

| Sintoma                                                        | O que significa                                                    |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| O banner de Repetir mostra espaços em branco para ignição ou bateria | Essas leituras não estão disponíveis atualmente no aplicativo — não é uma falha |
| Repetir não encontra dados para um dia                         | O veículo pode não ter se movido ou reportado naquele dia — tente outra data |
| Análises, Suporte, Conversas ou Comprovantes de estacionamento estão ausentes | Estão disponíveis apenas para proprietários                      |
| O botão de manutenção de um bilhete leva a "Em Breve"         | Esperado neste aplicativo — use o Painel para trabalhos de manutenção |
| Uma resposta de chat parece enviar, mas nada acontece          | Responder pelo aplicativo não está disponível atualmente — responda pelo Painel |
| Aprovar com bônus indisponível em Comprovantes de Estacionamento | Essa ação não está disponível atualmente                          |

## Dicas

- **A câmera de perseguição é a forma mais rápida de revisar um dia** — inicie a reprodução em 8x e desacelere apenas perto dos ícones de eventos na barra de progresso.
- **Use a fila de bilhetes do aplicativo para planejar uma rota**, depois aja a partir da página de cada veículo; a força do aplicativo é a proximidade, não a papelada.
- **Faça o trabalho de moderação e mensagens pelo Painel.** As cópias dessas filas no aplicativo servem para consultar informações enquanto você está na rua.
