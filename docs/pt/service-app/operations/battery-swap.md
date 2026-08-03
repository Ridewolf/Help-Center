# Troca de Bateria — Passo a Passo

Uma troca de bateria é uma sequência em duas etapas: o app destrava o veículo e o compartimento da bateria, oferece uma janela de tempo para você trocar fisicamente o pack, e então trava tudo novamente. **A etapa de fechamento ocorre automaticamente** — essa é a parte que todo operador precisa conhecer antes da primeira troca.

Você executa uma troca na [página do veículo](../fleet/vehicle-controls.md), na aba **Scooter**.

## O que inicia uma troca

Existem duas formas de iniciar, e ambas fazem exatamente a mesma coisa:

- O botão **Troca de Bateria** na aba Scooter. Ele tem um ícone de raio e mostra a contagem regressiva ao vivo em seu próprio botão.
- Definir o status do veículo para **Carregando** na ficha **Status**. Esse caminho executa a mesma sequência dentro da confirmação de mudança de status.

De qualquer forma, um diálogo de confirmação aparece antes de qualquer comando ser enviado.

## Fluxo do operador

1. Abra o veículo e permaneça na aba **Scooter**.
2. Toque em **Troca de Bateria** — ou defina o status para **Carregando**.
3. Confirme no diálogo.
4. O app envia **Modo Troca de Bateria Ativado**. Em caso de sucesso, você recebe uma notificação "Modo Troca de Bateria Ativado", um pulso háptico, e o veículo aparece como destravado.
5. Uma **contagem regressiva de 12 segundos** começa imediatamente e diminui a cada segundo no botão. Troque a bateria enquanto ela estiver ativa.
6. Quando a contagem chegar a zero, o app envia **Modo Troca de Bateria Desativado** automaticamente. Você não precisa apertar nada.
7. Em caso de sucesso, você sente um segundo pulso háptico — uma confirmação dupla intencional para que você possa ouvir e sentir o fechamento sem olhar para a tela — vê uma notificação "Modo Troca de Bateria Desativado", e o veículo aparece como travado novamente.

## O que cada etapa faz

| Etapa                      | O que acontece no veículo                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Modo Troca de Bateria Ativado**   | Veículo destravado, limite de velocidade aumentado para 25 km/h, compartimento da bateria liberado        |
| **Espera**                   | 12 segundos — nada é enviado, esta é sua janela de trabalho                            |
| **Modo Troca de Bateria Desativado**  | Compartimento da bateria travado, limite de velocidade restaurado para 6 km/h, veículo travado           |

Note o que acontece com o limite de velocidade: ele é aumentado de 6 para 25 km/h durante a janela da troca e restaurado para 6 quando a janela se fecha. Ele nunca é removido — 25 km/h é o teto de serviço enquanto o veículo está destravado, e 6 km/h é o padrão quando estacionado.

## O que você vê e sente

- Notificações no início e no fim da sequência: "Modo Troca de Bateria Ativado", depois "Modo Troca de Bateria Desativado"
- Dois pulsos hápticos, um para cada etapa
- Uma contagem regressiva de 12 a 0 no botão **Troca de Bateria**
- O ícone de trava na área de telemetria alternando para destravado e voltando para travado

## Quando uma etapa falha

Se qualquer etapa falhar, você recebe uma notificação de erro e um pulso háptico de erro. **Nada é tentado novamente automaticamente.**

O caso a se planejar é uma falha na etapa de fechamento: ela deixa o veículo destravado, com limite de 25 km/h e compartimento da bateria aberto. Não se afaste do veículo nessa situação.

1. Envie **Modo Ride** desligado (travar) na aba Scooter, ou execute a troca novamente.
2. Confirme que o ícone de trava está verde antes de sair do veículo.

## Status de carregamento e trocas são a mesma ação

Como definir um veículo para **Carregando** executa essa sequência, os dois não são independentes. Mudar o status é uma troca completa: espere o veículo destravar, aguarde 12 segundos e travar novamente. Se você só queria renomear o veículo, esteja preparado para que ele abra.

## Trocando vários veículos

Troque um veículo por vez na página do próprio veículo. Executar uma troca de bateria em toda uma fila não está disponível no app atualmente — o [modo em lote](batch-mode.md) é uma lista de tarefas que você toca para avançar, não uma ferramenta de comando em massa.

## Problemas comuns

| Sintoma                                  | O que fazer                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| A contagem parece travada                | Ela diminui a cada segundo. Se a tela entrou em repouso, verifique o ícone de trava para saber em qual etapa da sequência você está |
| A etapa de fechamento nunca ocorreu            | Procure uma notificação de erro. Nada tenta novamente — execute a troca novamente, ou trave o veículo com **Modo Ride** desligado |
| O limite de velocidade ainda mostra 25 km/h      | A etapa de fechamento não foi concluída; essa etapa é que restaura 6 km/h                          |
| O compartimento da bateria não abre       | A etapa de abertura falhou ou mostrou erro — o compartimento só libera quando essa etapa tem sucesso |

## Dicas

- **Tenha o pack de substituição em mãos antes de tocar.** Doze segundos é tempo suficiente para trocar, não para buscar.
- **Confie no segundo pulso háptico.** Dois pulsos significam que a sequência foi fechada; um pulso e silêncio significam que verifique a tela.
- **Sempre saia com o ícone de trava verde** — é a única verificação que detecta todos os modos de falha acima.
