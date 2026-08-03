# Rebalance — Corridas

A página de Corridas de Rebalanceamento (`/rebalance/runs`) é o **registro operacional de cada viagem de rebalanceamento**: quem dirigiu qual van, de qual depósito vieram, quantas scooters e baterias estão a bordo, se estão no horário e onde ocorreram problemas.

Uma **corrida** é o trabalho de campo de um turno — um motorista, uma van, um depósito de origem, uma lista ordenada de paradas e uma janela planejada de ETA. A página permite que os despachantes monitorem corridas ativas e revisem as concluídas.

Esta página é a visualização detalhada por viagem que complementa o resumo de nível superior [Analytics — Rebalance](runs.md) e o quadro baseado em localização [Rebalance — Dead Zones](dead-zones.md).

Permissão necessária: operador autenticado (a rota apenas exige _requiresAuth_, sem ID de permissão específico).

> Nota — no momento da redação, os endpoints CRUD de `/rebalance/runs` ainda não estão ativos. A página renderiza o bloco de filtros, a linha de KPI e o layout da tabela com KPIs simulados e uma lista vazia. _Criar corrida_, _Pesquisar_, _Atualização automática_ e o menu de ações por linha (_Despachar_, _Reatribuir_, _Reotimizar_, _Imprimir folha_, _Exportar_, _Editar_, _Cancelar_) estão implementados no código, mas comentados aguardando o backend. Clicar em uma linha navega para `/rebalance/runs/:id`, mas a página de detalhes não faz parte desta versão.

## Linha de KPI (topo)

Uma linha com cinco cartões de KPI resume as corridas de hoje.

| KPI                | O que mostra                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Corridas ativas** | Corridas atualmente em _Despachado_ / _Em andamento_ / _Pausado_                              |
| **% no horário**    | Percentual de corridas que atingem a janela planejada de ETA; tendência verde ≥ 90%, vermelha abaixo |
| **Corridas atrasadas** | Contagem de corridas marcadas como _Atrasadas_ no SLA — o indicador "o que precisa de ajuda" do despachante |
| **Total km hoje**   | Distância acumulada percorrida por todas as vans de rebalanceamento hoje                      |
| **Trocas de bateria** | Total de trocas de bateria realizadas pela equipe de campo hoje                              |

Os cinco juntos dão uma visão rápida de como a operação de campo de hoje está indo em relação ao plano.

## Filtros

Quatro filtros ficam no cartão _Filtros_; todos combinados com AND. Um botão _Limpar tudo_ à direita reseta o bloco.

| Filtro            | Tipo     | Opções                                                                                   |
| ----------------- | -------- | --------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _Todos_ / _Planejado_ / _Despachado_ / _Em andamento_ / _Pausado_ / _Concluído_ / _Cancelado_ |
| **Risco de SLA**  | Dropdown | _Todos_ / _No caminho certo_ / _Em risco_ / _Atrasado_ — flag de atraso da corrida       |
| **Cidade**        | Dropdown | _Todas as cidades_ / _Moscou_ / _São Petersburgo_                                       |
| **Tem incidentes**| Dropdown | _Todos_ / _Sim_ / _Não_ — incidentes registrados contra a corrida                        |

Um controle de _Pesquisar_ por texto livre (por número da corrida, motorista ou van) está implementado, mas atualmente oculto junto com _Atualização automática_ e _Criar corrida_ até o endpoint estar disponível.

## Colunas

A tabela tem nove colunas visíveis. As linhas são clicáveis — navegam para `/rebalance/runs/:id` (visualização detalhada não incluída nesta versão).

| Coluna               | Conteúdo                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Corrida #**        | Identificador legível da corrida (ex: `RUN-2026-0517-001`)                                                             |
| **Motorista / Van**  | Avatar do motorista + nome + telefone; modelo da van + placa abaixo                                                    |
| **Depósito / Cidade**| Nome do depósito de origem e sua cidade                                                                                |
| **Status**           | Indicador de status — cinza _Planejado_, azul _Despachado_, verde _Em andamento_, amarelo _Pausado_, azul-petróleo _Concluído_, vermelho _Cancelado_ |
| **Paradas**          | Progresso como `concluído / total`, com _Falhou: N_ em vermelho abaixo quando alguma parada falhou                     |
| **Carga**            | Scooters carregadas (`🛴 em / capacidade`) e baterias carregadas (`🔋 carregadas + descarregadas / capacidade`)          |
| **Planejado**        | Horário ETA início–fim + distância planejada (km) e duração (min)                                                      |
| **Risco de SLA**     | Indicador de risco — verde _No caminho certo_, âmbar _Em risco_, vermelho _Atrasado_                                    |
| **Criado / Atualizado** | Data de criação no topo, data da última atualização abaixo                                                            |

A coluna de ações (menu de três pontos) está implementada, mas comentada aguardando os endpoints CRUD; veja _Ações por linha_ abaixo para o conjunto planejado.

## Referência de status

Uma corrida está em exatamente um status; o status determina quais ações de despacho estão disponíveis:

| Status          | Significado                                          |
| --------------- | ---------------------------------------------------- |
| **Planned**     | Criado e agendado, mas ainda não enviado ao motorista |
| **Dispatched**  | Enviado ao motorista / van — aguardando partida      |
| **In progress** | Van está em movimento e/ou fazendo paradas           |
| **Paused**      | Motorista pausou a corrida (intervalo, incidente, etc.) |
| **Completed**   | Todas as paradas tentadas, corrida encerrada          |
| **Canceled**    | Abortada antes da conclusão                            |

## Referência de risco SLA

Um indicador em tempo real se a corrida vai cumprir sua janela planejada:

| Risco        | Significado                                           |
| ------------ | ---------------------------------------------------- |
| **On track** | Ritmo atual corresponde ao ETA planejado              |
| **At risk**  | Tendência de atraso, mas ainda dentro da distância recuperável |
| **Late**     | Plano já perdido — precisa de atenção do despachante  |

Use _SLA risk = Late_ como o primeiro filtro do despachante pela manhã.

## Ações na linha (planejadas)

Cada linha terá um menu de três pontos à direita com as ações abaixo; hoje a coluna está oculta aguardando a API.

| Ação            | O que fará                                               |
| --------------- | -------------------------------------------------------- |
| **View**        | Abrir a página de detalhes da corrida em `/rebalance/runs/:id` |
| **Dispatch**    | Mover uma corrida _Planned_ para _Dispatched_, notificando o motorista |
| **Reassign**    | Alterar motorista e/ou van na corrida                    |
| **Reoptimize**  | Reexecutar o otimizador de rota nas paradas restantes    |
| **Print sheet** | Gerar uma folha de corrida imprimível (resumo para o motorista) |
| **Export**      | Exportar os dados da corrida como arquivo (filtros / ordenação respeitados) |
| **Edit**        | Abrir o editor da corrida                                |
| **Cancel**      | Cancelar a corrida — abre um diálogo de confirmação      |

## Estados vazios / de carregamento

- **Loading** — um spinner com "Carregando corridas…" enquanto o backend é consultado
- **Error** — um banner de _Alerta_ com um botão _Tentar novamente_ se a requisição falhar
- **Empty** — um ícone centralizado de _Caminhão_ com "Nenhuma corrida encontrada"; este é o **estado esperado hoje** pois o endpoint não retorna itens

## Fluxos típicos

- **Varredura matinal de despacho** — Filtrar _Status = Planned_, ordenar por data de criação, despachar cada um em ordem
- **Monitoramento ao vivo** — Filtrar _Status = In progress_, depois _SLA risk = Late_ para destacar motoristas que precisam de ajuda; uma vez habilitado, o _Auto-refresh_ mantém a visualização atualizada
- **Revisão de fim de dia** — Filtrar _Status = Completed_, examinar a coluna _Stops_ para corridas com paradas falhadas, clicar em cada uma para análise de incidentes
- **Cidade a cidade** — Filtrar _City_ ao operar em múltiplas cidades; conferir contagens na página [Analytics — Rebalance](runs.md)
- **Triagem de incidentes** — Filtrar _Has incidents = Yes_ para destacar todas as corridas com problemas hoje
- **Verificação de capacidade** — Observar a coluna _Payload_ nas linhas _In progress_; vans próximas da capacidade podem precisar retornar ao depósito em breve

## Dicas

- **Números de corrida são identificadores estáveis** — compartilhe-os com a equipe de campo para coordenação clara ("olhe a CORRIDA-2026-0517-003")
- **A coluna de paradas mostra a verdade rapidamente** — `4/7` significa quatro feitas, três restantes; um _Failed: N_ vermelho abaixo = precisa de acompanhamento
- **"Payload" esgotado importa** — um alto número de baterias descarregadas significa que a van está cheia de baterias mortas e deve passar por um carregador
- **Criado vs Atualizado** — _Atualizado_ marca toda vez que o motorista age na corrida; um _Atualizado_ antigo numa linha _In progress_ = o motorista não fez check-in há um tempo
- **Status _Paused_ não é erro** — motoristas pausam para intervalos, incidentes e interações com passageiros; corridas pausadas por muito tempo merecem uma ligação
- **Até o endpoint ser lançado, trate esta página como uma prévia de layout / UX** — a estrutura, filtros e linguagem visual são finais; os dados por trás não são
