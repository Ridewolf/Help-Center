# Rider App — Iniciando, Pausando e Finalizando uma Corrida

Uma corrida no Rider App passa por uma sequência fixa de etapas: escolher um veículo, opcionalmente reservá-lo, passar pelas verificações iniciais, tirar as fotos antes da corrida, andar, pausar e retomar conforme necessário, e então finalizar a corrida com uma foto de estacionamento e uma avaliação.

O tempo é tarifado em **três segmentos separados** — reserva, corrida ativa e pausa — por isso o total do passageiro às vezes o surpreende. A [distribuição do custo](#detalhamento-de-custos) é onde você resolve essas dúvidas.

Existem duas formas de iniciar: **Reservar** (segurar o veículo primeiro, depois iniciar) e **início direto** (iniciar imediatamente). Ambas começam no [Mapa](map.md).

## Selecionando um veículo

O passageiro pode:

- **Tocar em um marcador de veículo** no mapa, ou
- **Escanear seu código QR** — o botão **Escanear** abre o scanner (`/ride/start`). Ele usa o scanner nativo da câmera no Android e iOS, e um leitor de câmera na página no web. Uma folha de **entrada manual do código do veículo** é oferecida quando o código está danificado ou ilegível. Um código errado exibe um toast de _código inválido_, e o scanner também expira automaticamente.

Ambas as rotas levam à mesma folha de detalhes do veículo: os planos tarifários, além de **Iniciar** e **Reservar**. A posição do passageiro é capturada no momento do escaneamento e reutilizada para o início ou reserva.

## Por que um passageiro não pode iniciar uma corrida

Siga estas etapas na ordem — elas são os verdadeiros bloqueios, na ordem em que ocorrem:

1. **Não há botão Escanear.** A barra inferior do mapa aparece apenas quando o passageiro tem acesso ao pagamento da corrida: um cartão vinculado, ou um provedor que não suporta cartões salvos. Sem cartão em um provedor que aceita cartão significa sem **Escanear** e sem **Corrida em grupo**. Corrija isso em [Métodos de Pagamento](../money/payment-methods.md). **Verifique isso primeiro.**
2. **Nenhum plano ou método de pagamento selecionado.** **Iniciar** / **Reservar** permanece desabilitado até que um plano tarifário seja escolhido, que o plano não esteja marcado como desabilitado e — onde o provedor exige escolha explícita — um método de pagamento seja selecionado. O botão desabilitado indica o motivo.
3. **Saldo mínimo para iniciar — apenas para pagadores por saldo.** Um passageiro **sem cartão vinculado** é verificado contra o saldo mínimo para iniciar da tarifa e recusado se estiver abaixo, com uma mensagem indicando o valor necessário. Quando a tarifa não define esse valor, a regra é simplesmente "saldo maior que zero". Passageiros **com** cartão vinculado não são bloqueados por saldo. A regra se aplica tanto para **Iniciar** quanto para **Reservar**. Consulte o valor real na tarifa em [Tarifas de Veículo](../../settings/infrastructure/vehicle-tariffs.md) — nunca cite um número de memória.
4. **Permissão de localização.** **Reservar** faz uma verificação de localização e aborta se a permissão não for concedida. **Iniciar** precisa de coordenadas utilizáveis ou recorre ao modal **Antes de você andar**.
5. **Muito longe do veículo.** O app abre um diálogo indicando o código do veículo e o raio necessário. Se o veículo não reportou posição, o mesmo diálogo aparece em modo "veículo offline" com uma contagem regressiva para tentar novamente. Se a posição do passageiro não puder ser lida, aparece um diálogo "não conseguimos ler sua localização".
6. **Cooldown de reserva.** Um veículo que acabou de ser liberado não pode ser reservado imediatamente; o app abre um diálogo de cooldown de reserva.
7. **Fotos antes da corrida não concluídas** — veja a próxima seção.
8. **Uma ação já está em andamento.** Os botões travam e mostram um spinner enquanto uma requisição está em execução. Isso não é uma trava; um segundo toque é ignorado.

## Fotos antes da corrida

As provas fotográficas antes da corrida são configuradas por empresa e estão habilitadas por padrão. Três configurações as controlam:

- Um **interruptor mestre** para provas de início
- **Fotos do veículo** — podem ser habilitadas, marcadas como obrigatórias e ter uma contagem de fotos (padrão: habilitado, não obrigatório, uma foto)
- **Selfie** — pode ser habilitada e marcada como obrigatória (padrão: habilitada, não obrigatória)

A ordem é fixa: modal **Antes de você andar** → fotos do veículo → selfie → ativação do veículo. Uma etapa habilitada mas não obrigatória pode ser pulada pelo passageiro; uma obrigatória não pode. Com as provas de início totalmente desativadas, o modal vai direto para a ativação.

As fotos vão para sua fila de moderação — veja [Comprovantes de Estacionamento](../../support/tickets-proofs-chat/park-proofs.md).

## Pausando e retomando

- **Pausar** e **Retomar** são o mesmo botão alternável, enviado com a localização atual do passageiro.
- Cada ação é ignorada por cerca de **8 segundos** deliberadamente, para que um segundo toque rápido não faça nada.
- **Retomar pode exigir uma selfie.** Sempre que a prova de selfie estiver habilitada para sua empresa, retomar abre primeiro uma verificação de selfie — e **essa não pode ser pulada**.
- **Pausar é tarifado.** Minutos pausados são cobrados pelo **Preço da Pausa** da tarifa. Não há limite máximo para a duração da pausa.
- **Sem saldo durante a pausa.** Uma corrida pausada com saldo zero ou negativo faz o cartão da corrida ativa mostrar um aviso de saldo insuficiente com **Recarregar** e **Finalizar corrida**. O passageiro não pode retomar até que o saldo seja recuperado. Considere isso uma forte indicação, não uma certeza — o app infere isso pelo saldo, então também verifique a carteira no painel.

## Finalizando uma corrida

A sequência exata, para que você possa informar ao passageiro o que esperar a seguir:

1. **Encerrar corrida** abre o **modal pós-corrida**: orientação de estacionamento (onde é permitido e proibido estacionar) e uma lista de verificação — em pé, trancado, foto, arredores. Se os comprovantes de encerramento estiverem desativados para sua empresa, a corrida simplesmente termina aqui.
2. **Continuar** abre o **modal de comprovante de estacionamento**, quando comprovantes de encerramento e fotos de estacionamento estão ambos habilitados. Caso contrário, a corrida termina sem um comprovante.
3. O usuário captura o número necessário de fotos do estacionamento — o modal mostra um contador capturado / necessário. **Pular** é oferecido quando as fotos de estacionamento não são obrigatórias (e em algumas versões do app mesmo quando são), e encerra a corrida sem comprovante após um diálogo de confirmação.
4. **Concluir** é recusado localmente se faltarem fotos. Então o app obtém uma nova localização e **fecha a corrida primeiro, antes de enviar qualquer coisa** — assim uma rejeição (zona errada, muito longe) aparece imediatamente.
5. As fotos então são enviadas uma a uma e registradas como comprovantes de estacionamento no fim da corrida. Um envio falho **não reverte a corrida** — ela já está fechada, e a cobrança não é afetada.
6. A corrida é recarregada e o **modal de avaliação** abre: uma avaliação por estrelas com comentário opcional, ou pular.

### Fora da zona de estacionamento

Se o encerramento for rejeitado porque o veículo está fora de uma zona de estacionamento permitida, o app abre um diálogo ilustrado de **fora da zona de estacionamento**. A ação "mostrar zonas no mapa" retorna o usuário para a corrida ativa e **limpa as fotos de estacionamento propositalmente** — o veículo está prestes a se mover, então as fotos estariam erradas. O usuário move o veículo para uma zona permitida e tira as fotos novamente.

Quais zonas permitem estacionamento é totalmente sua configuração — veja [Zones](../../settings/infrastructure/zones.md).

Rejeições por distância no encerramento abrem o mesmo diálogo de distância excessiva do início, com uma tentativa que revalida as fotos e tenta encerrar novamente. Um encerramento falho também deixa uma linha de tentativa no cartão da corrida ativa.

## Detalhamento de custos

Cinco linhas compõem o preço total. Use estes nomes ao explicar uma cobrança:

| Linha            | O que é                              | Campo da tarifa             |
| ---------------- | ----------------------------------- | --------------------------- |
| **Taxa de desbloqueio** | Cobrado uma vez, para abrir o veículo | **Preço de início da corrida** |
| **Reserva**      | Parte paga de uma retenção           | **Preço de reserva pago** por minuto, após o **Tempo de reserva** gratuito |
| **Tempo ativo**  | Tempo de uso                        | Preço por minuto            |
| **Distância**    | Distância percorrida                | **Preço por distância** por km |
| **Tempo de pausa** | Tempo em pausa                     | **Preço de pausa** por minuto |


Se a tarifa não puder ser carregada, o detalhe da corrida mostra apenas o total — sem detalhamento e sem erro. O total ainda está correto.

Um registro de corrida finalizada contém: status, preço, distância (exibida em km), duração (exibida em minutos), etiqueta e tipo do veículo, tarifa, os segmentos de tempo ativo e pausa, o período de reserva, endereços de início e fim, carimbos de data/hora e a avaliação. Para corridas concluídas, a rota é desenhada em um mapa. Os usuários veem tudo isso em [History](../money/history.md); sua equipe vê o equivalente do lado do operador em [Ride Detail](../../operations/trips/ride-detail.md).

## Solução de problemas

| O usuário diz…                                | O que geralmente é                                                                                                           |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| "Não consigo iniciar ou reservar"             | Siga as oito etapas em [Why a rider cannot start a ride](#por-que-um-passageiro-não-pode-iniciar-uma-corrida) na ordem                         |
| "Não tem botão de Scan"                        | Nenhum cartão vinculado em um provedor que suporte cartões salvos                                                           |
| "Diz saldo insuficiente e informa um valor"  | Esse é o saldo mínimo de início da tarifa. Recarregue — ou vincule um cartão, que remove totalmente essa restrição          |
| "O veículo não desbloqueia" (mas o app aceitou o início) | Lado do veículo: verifique seu estado e conectividade em [Vehicle Detail](../../operations/fleet/vehicle-detail.md) |
| "Não consigo encerrar a corrida"               | Geralmente fora de uma zona de estacionamento permitida, ou rejeição por distância excessiva / veículo offline. Cada um tem seu próprio diálogo |
| "Não consigo retomar minha corrida pausada"    | Um selfie de retomada não confirmado, ou carteira vazia                                                                       |
| "Minhas fotos de estacionamento desapareceram" | Esperado, após usar "mostrar zonas no mapa" — elas são limpas para que o usuário as refaça no local correto                 |
| "A corrida terminou mas não há comprovante em foto" | A corrida fecha antes do envio, então um envio falho deixa a corrida fechada sem comprovante. A cobrança não é afetada     |
| "Fui cobrado a mais"                            | Abra a corrida em History e leia o detalhamento linha a linha contra a tarifa. Uma pausa longa ou uma retenção paga não percebida explicam a maioria |

## Dicas

- **As cinco linhas de detalhamento são todo o seu vocabulário para disputas de cobrança.** Nomeie a linha e depois o campo de tarifa correspondente.
- **Reservas pagas são a surpresa silenciosa.** Um passageiro que reservou e depois caminhou lentamente paga por isso; a linha de reserva mostrará isso.
- **Selfies para retomar não podem ser puladas** — se um passageiro estiver preso em uma corrida pausada, pergunte se apareceu uma tela de selfie.
- **Debounces parecem bugs.** Pausar / retomar ignora toques por cerca de 8 segundos; ensine os passageiros a esperar em vez de tocar repetidamente.
- **Uma corrida encerrada sem comprovante não é um problema de cobrança**, e reenvio não é possível. Anote isso na corrida se precisar de um registro.
