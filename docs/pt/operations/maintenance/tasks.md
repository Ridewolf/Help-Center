# Tarefas de Manutenção

A página de Tarefas de Manutenção (`/maintenance/tasks`) é o lar das **ordens de serviço para sua frota** — reparos, inspeções, serviço programado. Ela compartilha o **Painel de Insights de Manutenção** com [Inventário e Peças](inventory.md) e [Automação de Manutenção](automation.md), oferecendo uma visão ao vivo dos últimos 30 dias da carga de trabalho de manutenção.

Encontre-a na barra lateral em **Manutenção → Tarefas**.

> **Aviso: criação de tarefas em breve.** O botão **Criar tarefa** está atualmente desabilitado com uma dica "em breve" — registros de tarefas não podem ser criados ou editados no produto hoje. Os números do Painel de Insights, no entanto, estão ao vivo. Não planeje um fluxo de trabalho baseado na criação de tarefas aqui até que o recurso seja lançado.

## Painel de Insights de Manutenção

O painel no topo da página está totalmente funcional e é somente leitura. Ele cobre uma **janela móvel de 30 dias** (fixa — não há seletor de datas) e mostra:

| Bloco          | Métricas                                                   |
| -------------- | ---------------------------------------------------------- |
| **Tarefas**    | total, pendentes, em andamento, concluídas, atrasadas      |
| **Serviço**    | agendadas, concluídas, duração média, próximas nesta semana |
| **Inventário** | total de itens, estoque baixo, sem estoque, valor total   |
| **Automação**  | regras ativas, acionadas hoje, taxa de sucesso            |

- Um bloco fica **aviso** quando há tarefas abertas, e **perigo** quando algo está sem estoque.
- Abaixo dos blocos: um gráfico de barras da distribuição do status das tarefas e um medidor de progresso para a taxa de sucesso da automação.
- O mesmo painel (e os mesmos dados) aparece em todas as três páginas de Manutenção, então a troca entre elas é instantânea.

## O modelo de tarefa

Mesmo que a criação ainda não esteja disponível, o formato da tarefa está definido — útil para planejar como sua equipe irá usá-la:

- **Etiqueta** e **descrição**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Prioridade** e **gravidade** — cada uma `low` / `medium` / `high` / `critical`
- **Impacto** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Origem** — `user`, `iot`, `inspection`, `schedule` (de onde a tarefa se originou)
- **Categoria / subcategoria**, **veículo** vinculado, **responsável**, **etiquetas**
- **Custo** — peças, mão de obra, total
- **SLA** — prazo e status do SLA

Não há um campo separado de "tipo de tarefa" — o que você poderia pensar como _rotina_, _reparo_ ou _inspeção_ se mapeia em **origem**, **categoria**, **gravidade** e **impacto**.

## O fluxo planejado de criação

Quando a criação for lançada, será um assistente de três etapas:

1. **Informações** — nome e descrição
2. **Status** — escolha o status inicial
3. **Revisão** — um resumo que você pode voltar para editar qualquer campo, depois enviar

## Perguntas comuns

- **"Criar tarefa" não abre — é um problema de permissões?** Não. O botão está desabilitado para todos enquanto o recurso está sendo finalizado. Esperado.
- **O Painel de Insights ignora meus filtros de data.** Não há filtros para aplicar — a janela de 30 dias é fixa.
- **As métricas de troca de bateria mostram esqueletos de espaço reservado.** Essa agregação ainda não está disponível.
- **Onde está o histórico de serviço por veículo?** Não disponível na versão atual. Por enquanto, use o registro de atividade do veículo na [página de detalhes do veículo](../fleet/vehicle-detail.md) como o registro mais próximo.

## Dicas

- **Acompanhe reparos urgentes através dos [Bilhetes](../../support/tickets-proofs-chat/tickets.md) por enquanto** — até que a criação de tarefas seja lançada, a fila de bilhetes de suporte (com seus campos de gravidade e SLA) é a alternativa funcional para acompanhamentos acionáveis.
- **Use o Painel de Insights como um painel de saúde** — tarefas atrasadas e peças sem estoque são os dois números que deixam os blocos vermelhos; verifique-os no início do turno.
