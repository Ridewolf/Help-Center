# Rider App — Histórico (Corridas e Pagamentos)

O Histórico (`/history`) é o único lugar no rider app com os dados do próprio passageiro. Ele tem duas abas em uma tela — **Corridas** e **Pagamentos** — e é para onde você envia um passageiro para qualquer coisa sobre uma viagem passada ou um pagamento anterior.

Cada aba tem sua própria paginação e seu próprio scroll infinito, carregando a próxima página conforme o passageiro se aproxima do final. Trocar de aba reseta a posição do scroll e a paginação, e os dados são recarregados sempre que a tela é reaberta.

Para os equivalentes do lado do operador, veja [Rides — List](../../operations/trips/rides.md) e [Payments — History](../../operations/payments/payments.md).

## Aba Corridas

Cada cartão de corrida mostra: tipo de veículo, número do veículo, local de início e fim, horário de início e fim, distância em quilômetros, duração em minutos, custo e status. Os cartões carregam 20 por página. Tocar em um abre o [detalhe da corrida](#detalhe-da-corrida).

| Status        | Cor    | Significado                                 |
| ------------- | ------ | ------------------------------------------- |
| **Concluído** | Verde  | A corrida terminou normalmente              |
| **Cancelado** | Vermelho | A corrida foi cancelada                      |
| **Expirado**  | Amarelo | A corrida ou reserva expirou sem ser concluída |

## Aba Pagamentos

Cada registro de pagamento mostra: tipo, valor, moeda, status, provedor, data, saldo antes e depois, e — em caso de falha — um código de erro.

**Tipos:** recarga, reembolso, débito e bônus.

**Codificação de cor do valor:**

| Cor    | Aplica-se a             |
| ------ | ------------------------ |
| Verde  | Recargas, reembolsos, bônus |
| Laranja | Multas                   |
| Vermelho | Débitos e cobranças      |

**Badges de status:** _pendente_ em âmbar, _falhou_ em vermelho, _reembolsado_ em tom apagado. Um **pagamento concluído não mostra badge algum** — a ausência de badge é o caso normal e saudável, não dados faltando. Passageiros às vezes interpretam como "nada aconteceu"; significa o oposto.

O **código de falha** em um pagamento falhado é o que deve ser lido quando um passageiro pergunta por que um pagamento não foi concluído.

## Detalhe da corrida

Tocar em um cartão de corrida abre `/history/:id`. Mostra:

- **Fatos da corrida** — status, preço, distância (em km), duração (em minutos), etiqueta e tipo do veículo, tarifa, endereço de início e fim, carimbos de data/hora e a avaliação que o passageiro deixou
- **Detalhamento do custo** — as cinco linhas que compõem o preço total: taxa de desbloqueio, reserva, tempo ativo, distância e tempo de pausa. Veja [Detalhamento do custo](../riding/rides.md#detalhamento-de-custos) para o que cada um corresponde na tarifa
- **Linha do tempo da atividade** — o período de reserva primeiro (quando houver), depois os blocos de corrida e pausa em ordem cronológica. Esta é a forma mais clara de mostrar ao passageiro para onde foi seu dinheiro em uma corrida que pareceu cara
- **Mapa da rota** — para corridas concluídas: a rota desenhada como uma linha, com marcador de início e marcador de fim, ajustado para caber toda a viagem

Se a tarifa da corrida não puder ser carregada, a tela mostra **apenas o total, sem detalhamento e sem mensagem de erro**. O total ainda está correto — por isso o detalhamento às vezes está ausente.

## Atualmente não disponível no app

Passageiros pedem isso regularmente. Nenhum deles existe no Histórico, então diga isso claramente em vez de mandar o passageiro procurar:

- Agrupar a lista por Hoje / Ontem / Esta Semana
- Um painel de filtro por data, tipo de veículo ou status
- Uma ação **Baixar Recibo** (PDF ou email)
- Reavaliar uma corrida passada (a avaliação é dada no fim da corrida)
- Um formulário **Reportar Problema** em uma corrida — use [Suporte](../help/support.md) em vez disso
- Exportação do histórico de corridas ou pagamentos para CSV ou PDF
- Um banner de totais ou valor gasto acumulado no topo da lista

Estatísticas para o passageiro também [não estão disponíveis atualmente](analytics.md). Se um passageiro precisar de totais ou de um documento estilo recibo, produza-o pelo painel: [Rides — List](../../operations/trips/rides.md) e [Payments — History](../../operations/payments/payments.md) exportam ambos.

## FAQ

| Passageiro pergunta…                  | Resposta                                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| "O que significa esse detalhamento?" | Leia as cinco linhas em ordem. Uma linha grande de pausa ou reserva explica a maioria dos totais surpreendentes                  |
| "Por que não há detalhamento?"       | A tarifa da corrida não pôde ser carregada, então só o total é mostrado. O total está correto                                    |
| "Por que meu pagamento está pendente?" | O provedor não confirmou. Para recarga por redirecionamento ou QR, o passageiro provavelmente não terminou o pagamento — veja [Payment Methods](payment-methods.md#recargas-pendentes) |
| "Onde estão meus totais?"             | Não há total em lugar algum no rider app; some-os na lista ou obtenha-os pelo painel                                             |
| "Posso obter um recibo?"             | Não pelo app. Exporte o registro de pagamento pelo painel se o passageiro precisar de um documento                              |
| "Por que meu pagamento não tem badge?" | Porque foi concluído. Apenas pagamentos pendentes, falhados e reembolsados têm badge                                           |

## Dicas

- **O detalhe da corrida resolve disputas de cobrança, não a lista.** Abra a corrida, leia a discriminação contra a tarifa e depois explique a única linha que domina.
- **A linha do tempo da atividade é seu melhor auxílio visual.** Um passageiro que vê um bloco de pausa de 40 minutos para de discutir sobre o total.
- **"Sem badge" significa concluído.** Ensine isso à sua equipe para que parem de perseguir pagamentos saudáveis.
- **Códigos de falha ficam registrados.** Leia o código antes de especular sobre um banco.
