# Tarifas de Veículo

A biblioteca de regras de preços para sua frota Ridewolf. Uma **Tarifa** é um conjunto autônomo de regras monetárias — preço base, taxa de início da corrida, tarifa por distância, tarifa de pausa, tarifa de reserva paga, além de níveis de desconto e uma rede de segurança de reembolso automático — que o sistema usa para calcular o que um usuário paga por uma corrida.

Está localizada em `/settings/vehicle-tariffs`. Permissão: **Listar Tarifas** (`v1w2x3`).

## O que é uma Tarifa

Uma Tarifa **não** está vinculada diretamente a um veículo — ela está vinculada a um **Modelo de Veículo** em [Configurações de Veículo](vehicle-settings.md). A cadeia é:

```
Tarifa  →  Modelo de Veículo  →  Veículo  →  Corrida
```

Um único registro de tarifa contém:

- **Identidade** — `Nome`, `Descrição` (Markdown), `Status` (Ativo / Inativo / Arquivado), `Etiquetas`
- **Unidade de precificação** — `Tipo`: um dos `per-minute`, `per-hour`, `per-day`, `per-month`. Isso controla a granularidade da cobrança (por minuto usa cálculo em segundos; por dia/mês usa cobrança arredondada para cima — uma unidade completa é cobrada antecipadamente)
- **Campos de precificação** (todos os valores monetários usam a moeda da sua empresa):
  - **Preço base** — custo de uma unidade de precificação (ex: um minuto, um dia)
  - **Preço de início da corrida** — taxa fixa de desbloqueio cobrada uma vez no início da corrida
  - **Preço por distância** — custo por km percorrido
  - **Preço de pausa** — cobrança por minuto enquanto a corrida está pausada
  - **Preço de reserva paga** — cobrança por minuto após expirar o período gratuito de reserva
  - **Tempo de reserva** — minutos gratuitos de reserva antes da cobrança da reserva paga
- **Níveis de desconto** — três níveis opcionais (Primeiro / Segundo / Terceiro). Cada nível é _"após N unidades, aplicar X % de desconto"_, então corridas mais longas ficam progressivamente mais baratas
- **Reembolso automático** — alternador + dois limites (`distance` em metros, `time` em segundos). Quando ativado, se o usuário parar a corrida antes de atingir ambos os limites, o backend cancela e reembolsa — protege os usuários de serem cobrados por um desbloqueio falho

## Onde a Tarifa se aplica

1. O operador cria / edita uma **Tarifa** aqui
2. O operador vincula a tarifa a um **Modelo de Veículo** em [Configurações de Veículo](vehicle-settings.md)
3. Veículos atribuídos a esse modelo herdam a tarifa
4. Quando um usuário inicia uma corrida, o backend **faz um snapshot da tarifa** no registro da corrida e usa esse snapshot para todos os cálculos de cobrança

> **O snapshot é a parte crítica.** Editar ou excluir uma tarifa depois **não** altera retroativamente corridas finalizadas ou em andamento. A discriminação da corrida que você vê em [Detalhes da Corrida](../../operations/trips/ride-detail.md) é calculada a partir dos valores da tarifa **como eram no início da corrida** — é assim que o Ridewolf mantém a cobrança auditável.

## Filtros

A barra de filtro acima da tabela:

| Filtro      | Tipo   | Opções                                                  |
| ----------- | ------ | ------------------------------------------------------- |
| **Pesquisar** | texto  | Formato livre — corresponde a nome / descrição          |
| **Status**  | seleção| Todos os status · Ativo · Inativo · Arquivado           |
| **Tipo**    | seleção| Todos os tipos · Por minuto · Por hora · Por dia · Por mês |

Os filtros têm debounce e a tabela recarrega a partir da página 1 a cada alteração. O estado da URL é sincronizado — cole a URL para compartilhar a mesma visualização.

## Colunas

| Coluna          | Ordenável | Notas                                                                             |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| **Nome**        | sim       | O rótulo da tarifa                                                                |
| **Descrição**   | sim       | Texto truncado; texto completo ao passar o mouse (Markdown renderizado em outro lugar) |
| **Tipo**        | sim       | Distintivo contornado — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Preço**       | sim       | Preço base, formatado na moeda da sua empresa, monoespaçado                      |
| **Etiquetas**   | não       | Até 2 chips de etiqueta + `+N` excedente. Clique para abrir um popover de edição rápida |
| **Status**      | sim       | Distintivo colorido (Ativo verde / Inativo cinza / Arquivado azul). Clique para edição rápida |
| **Criado**      | sim       | Data de criação                                                                   |
| **Atualizado**  | sim       | Data da última atualização                                                       |

A ordenação é **do lado do cliente** — funciona na página atual.

## Ações do cabeçalho

- **Atualização automática** — atualiza a lista (clique manual ou intervalo, veja [Atualização automática](../../features/ux/notifications.md))
- **Exportar** — abre o diálogo de exportação (página atual · todos filtrados · páginas específicas). A saída é um arquivo `vehicle-tariffs-export.json`
- **+ Criar** — abre o formulário de criação. Visível apenas se você tiver a sub-permissão **Criar Tarifa**

## Ações da linha

O menu `⋯` por linha:

- **Visualizar detalhes** — abre `/settings/vehicle-tariffs/:id` (sempre disponível)
- **Editar** — abre `/settings/vehicle-tariffs/:id/edit` (requer sub-permissão `edit`)
- **Excluir** — abre uma confirmação com espera de 3 segundos; ao confirmar a tarifa é removida (requer sub-permissão `delete`)

> **Excluir com cautela.** Modelos de Veículo que apontam para a tarifa excluída precisarão ser reatribuídos a outra tarifa antes que novas corridas possam começar nesses veículos. Registros de corridas existentes mantêm seu snapshot intacto.

## Edição rápida (Etiquetas / Status)

Clique diretamente nos chips de **Etiquetas** ou no distintivo de **Status** em qualquer linha → um pequeno diálogo abre permitindo alterar apenas esses campos sem entrar no formulário completo de edição. Uma notificação confirma; a tabela é atualizada.

## Formulário de criação / edição

Tanto `/settings/vehicle-tariffs/create` quanto `/settings/vehicle-tariffs/:id/edit` compartilham o mesmo layout de formulário: um cartão à esquerda com os campos, uma barra lateral **Guia de Campo** à direita com ajuda contextual e uma **pré-visualização ao vivo** dos valores que você inseriu (nome, tipo, preço base, início/distância, pausa, reserva, etiquetas, níveis de desconto).

### Campos obrigatórios

| Campo          | Obrigatório | Validação                                |
| -------------- | ----------- | --------------------------------------- |
| **Nome**       | sim         | Não vazio                               |
| **Tipo**       | sim         | Uma das 4 opções                        |
| **Status**     | sim         | Um dos `active` / `inactive` / `archived`                  |
| **Preço base** | sim         | `>= 0`                                 |

Todos os outros campos monetários têm valor padrão `0` e aceitam `0` (efetivamente "recurso desabilitado").

### Seções

1. **Identidade** — Nome, Descrição (Markdown), Tipo, Status, Etiquetas
2. **Precificação** — Preço base, preço de início da corrida, preço por distância, preço de pausa, preço de reserva paga, tempo de reserva (minutos)
3. **Reembolso automático** — Alternar. Quando ativado, preencha `Distância` (metros) e `Tempo` (segundos). Ambos os limites devem ser ultrapassados antes que a corrida seja considerada iniciada; caso contrário, ela é cancelada automaticamente com reembolso
4. **Níveis de desconto** — Três níveis. Cada um: `Desconto %` (0-100) e `Após unidades` (quantas unidades de precificação devem passar antes do desconto ativar). Deixe um nível com zeros para ignorá-lo

### Comportamento ao salvar

- **Criar** → notificação "criado", redireciona para a página de detalhes
- **Editar** → notificação "atualizado", redireciona para a página de detalhes
- **Alterações não salvas** são monitoradas via comparação de instantâneos. Sair da página (cancelar / voltar) abre um diálogo de confirmação se algo foi alterado

> **Mapeamento de status no backend.** O valor `archived` do formulário é enviado ao backend como `deleted` — esse é o nome interno. Os operadores veem `archived` em toda a interface.

## Página de detalhes

`/settings/vehicle-tariffs/:id` exibe um cabeçalho com o rótulo da tarifa, um distintivo de status, ações **Editar** e **Excluir**, três cartões de estatísticas gerais (Status / Criado / Atualizado), depois um cartão **Detalhes** com:

- Campos de identidade (Nome, Tipo, Status, Preço base, datas)
- **Descrição** renderizada a partir de Markdown
- **Precificação** — visualização em grade de todas as 5 tarifas monetárias (`TariffPriceGrid`)
- **Reembolso automático** — distintivo habilitado/desabilitado, mais os dois limites se ativo
- **Níveis de desconto** — detalhamento visual dos três níveis (`TariffDiscountTiers`)
- **Etiquetas** — chips de etiquetas resolvidas (somente se houver alguma definida)
- **Informações do sistema** — ID completo, carimbos de data/hora de criação/atualização

## Como o instantâneo orienta o detalhamento da corrida

Quando você abre um [Detalhe da Corrida](../../operations/trips/ride-detail.md), o **cartão de detalhamento** é calculado a partir de:

- `ride.tariff` — o instantâneo embutido na corrida no momento do início
- A telemetria ao vivo da corrida (duração, distância, tempo de pausa, tempo de reserva)

A matemática que o backend replica localmente:

- **Base** — `unidades × Preço base`, onde `units` = segundos decorrido (por minuto) ou dias/meses arredondados para cima para tipos baseados em teto
- **Taxa de desbloqueio** — valor fixo `Preço de início da corrida`, cobrado uma vez
- **Distância** — `km × Preço por distância`
- **Pausa** — `minutos de pausa × Preço de pausa`
- **Reserva** — primeiros `minutos de tempo de reserva` grátis, depois `minutos pagos × Preço de reserva paga`
- **Níveis de desconto** aplicados por cima após ultrapassar os limites

Se você corrigir um erro de digitação na tarifa hoje, **as corridas de ontem não são afetadas** — seus detalhamentos ainda mostram os números antigos porque o instantâneo é a fonte da verdade.

## Fluxos de trabalho

- **Lançar um novo esquema de precificação** — criar a tarifa (Status `Inativo`) → revisar com finanças → mudar para `Ativo` → vincular ao Modelo de Veículo relevante em [Configurações do Veículo](vehicle-settings.md)
- **Promoção sazonal** — duplicar uma tarifa existente (manual: criar nova + copiar campos), alterar `Preço base`, dar um nome com sufixo de data (ex.: `Verão 2026 — Scooter`), vincular ao modelo para o período da promoção, depois reverter
- **Ajuste de reembolso automático** — começar com limites conservadores (distância pequena + tempo curto) para que desbloqueios falhados não sejam cobrados, depois afrouxar se houver reembolsos falsos positivos em [Corridas](../../operations/trips/rides.md)
- **Aposentar uma tarifa antiga** — definir Status para `Arquivado` (enviado como `deleted` ao backend) quando nenhum Modelo de Veículo a referenciar. Corridas antigas mantêm seus instantâneos — você pode arquivar com segurança
- **Renomear para clareza** — Nome é puramente um rótulo. Renomeações afetam novos instantâneos de corrida a partir desse ponto; corridas finalizadas mantêm o nome antigo no detalhamento

## Dicas

- **Instantâneo, instantâneo, instantâneo** — em dúvida sobre o preço de uma corrida histórica, verifique `ride.tariff.*` no [Detalhe da Corrida](../../operations/trips/ride-detail.md), não a tarifa atual nesta lista
- **Não exclua — arquive** — tarifas arquivadas permanecem no banco de dados (são excluídas logicamente no servidor) e ainda podem ser resolvidas a partir de instantâneos de corridas antigas. `Excluir` definitivo é adequado para rascunhos nunca usados
- **Use a pré-visualização ao vivo do Guia de Campo** — a barra lateral direita mostra os totais calculados enquanto você digita, que é a forma mais rápida de validar uma nova tarifa antes de salvar
- **O tipo importa para a matemática** — mudar de `per-minute` para `per-hour` não redimensiona automaticamente o `Preço base`; você deve recalculá-lo manualmente (1 minuto a €0,20 ≠ 1 hora a €0,20)
- **Níveis de desconto são sequenciais** — `Após` é medido nas mesmas unidades que `Tipo`. Um nível com `Após: 30, Desconto: 10 %` numa tarifa `per-minute` significa "a partir do minuto 30, cobrar 90 % do preço base". Os três níveis se acumulam em ordem — vence o maior aplicável
- **Etiquete suas tarifas** — as etiquetas são propagadas para o Modelo de Veículo e ajudam a filtrar nesta lista. Rótulos comuns: `Scooter`, `Bike`, `Promo`, `Legacy`
