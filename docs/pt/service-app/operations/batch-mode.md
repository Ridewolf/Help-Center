# Modo em Lote — Enfileirando Vários Veículos

O modo em lote (`/batch`) reúne vários veículos em uma fila para que você possa vê-los lado a lado e trabalhar neles sem precisar procurar cada um novamente. Acesse-o pela tela inicial ou pelo link de escaneamento no estado vazio do [mapa da frota](../fleet/fleet-map.md).

**Leia isto primeiro:** o modo em lote é uma lista de trabalho, não uma ferramenta de comandos em massa. Os botões de ação em grupo na parte inferior da tela **não estão disponíveis no app atualmente**. Você age em cada veículo a partir da sua própria [página do veículo](../fleet/vehicle-controls.md).

## Adicionando veículos

1. Abra o modo em lote.
2. Escaneie o código QR de um veículo — o scanner é o mesmo usado no mapa da frota, então as mesmas regras de busca se aplicam (etiqueta, VIN ou IMEI).
3. Cada escaneamento bem-sucedido adiciona o veículo à fila no estado **ocioso**.
4. Repita para cada veículo que deseja na lista.

Filas longas permanecem responsivas, então não há motivo prático para manter a lista curta além do seu próprio plano de turno.

## Lendo a fila

Cada linha mostra:

| Elemento             | Como ler                                                                            |
| -------------------- | ----------------------------------------------------------------------------------- |
| **Etiqueta**         | O código do veículo                                                                 |
| **Barra de bateria** | Vermelha a 10% ou menos, laranja a 20% ou menos, âmbar a 40% ou menos, verde acima de 40% |
| **Bateria do rastreador** | A carga do próprio rastreador                                                      |
| **Ícone de conectividade** | Se o rastreador está online ou offline                                            |
| **Status**           | O status atual do veículo                                                           |
| **Estado da linha**  | ocioso, em execução, ok ou falhou                                                  |

Uma linha com falha mostra sua mensagem de erro no lugar da telemetria, para que você veja o que deu errado sem sair da fila.

**Tocar em qualquer linha abre a página desse veículo** — é assim que você realmente age sobre um veículo: enfileire-os aqui e depois trabalhe um por vez.

## Removendo veículos

- **O ícone de lixeira em uma linha** remove esse veículo da fila. Não envia nada para o veículo — a remoção afeta apenas sua lista.
- **O ícone de lixeira no cabeçalho** limpa toda a fila após uma confirmação. Está desabilitado enquanto o lote estiver marcado como em execução.

## Ações em grupo

Cinco botões ficam na parte inferior da tela: uma engrenagem de configurações, desbloquear, um sino, um raio e camadas. **Essas ações em grupo não estão disponíveis no app atualmente.** Tocar em um deles não envia nada para nenhum veículo.

Para desbloquear, emitir um beep, trocar uma bateria ou enviar um comando ao rastreador, abra o veículo na fila e use os controles na [página do veículo](../fleet/vehicle-controls.md):

- Trancar e destrancar — **Modo de Condução**
- Som do localizador — **Beep**
- [Troca de bateria](battery-swap.md) — a sequência temporizada de troca
- Comandos do fornecedor — a folha de **Comandos**

## Problemas comuns

| Sintoma                                        | O que significa                                                                    |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| Pressionar uma ação em grupo parece não fazer nada | Correto — ações em grupo não estão disponíveis atualmente. Trabalhe cada veículo pela sua página |
| O botão limpar tudo está desabilitado          | O lote está marcado como em execução                                               |
| Uma linha não mostra bateria nem conectividade  | Esses valores são desconhecidos para esse veículo — não zero                       |
| Um veículo escaneado não apareceu                | O código não foi resolvido. As regras são as mesmas do mapa da frota: etiqueta, VIN ou IMEI |

## Dicas

- **Monte a fila no início de uma rota.** Escanear dez veículos em um pátio de uma vez é melhor do que procurá-los um a um depois.
- **Use as cores da bateria para ordenar seu trabalho** — vermelhos primeiro, são os que um usuário reportará em seguida.
- **A fila é só sua**, então remover uma linha nunca altera nada para colegas ou para o veículo.
- **Para operações em toda a frota, use o painel.** Alterações de status em massa, etiquetas em massa e comandos em massa ficam na [lista de Veículos do painel](../../operations/fleet/vehicles.md#ações-em-massa).
