# Dispositivos IoT

A página IoT (`/iot`) é o **inventário de hardware** — cada unidade de rastreador / trava que sua frota possui, independentemente de estar atualmente fixada a um veículo. Cada linha é um dispositivo físico identificado pelo seu **IMEI**, com telemetria ao vivo (estado online, fixação GPS, sinal GSM, bateria) atualizada a partir do último ping.

Este é o espelho do lado do dispositivo de [Veículos](../../operations/fleet/vehicles.md): um veículo sem IoT não pode ser rastreado ou controlado; um IoT sem veículo é apenas hardware não atribuído na prateleira.

Permissão necessária: **Dispositivos IoT** (`n8p9q9`). Subpermissões controlam `edit` / `send-command` / `delete` e a ação em massa _Gerar veículo_ utiliza `operations.vehicles.create`.

## Como os dispositivos chegam aqui

Os dispositivos não são descobertos automaticamente — você os registra conforme recebe os lotes:

1. **Aquisição** — você compra unidades IoT de um fornecedor (Omni, Segway, Okai, etc.). Cada unidade tem um **IMEI** único impresso na caixa / adesivo
2. **+ Criar** aqui — insira Nome, IMEI, Fornecedor, Status. O dispositivo agora está no inventário, mas não vinculado
3. **Vincular a um veículo** — feito a partir de [Criar / Editar Veículo](../../operations/fleet/vehicle-create-edit.md) selecionando este IoT no seletor de dispositivos. Um IoT por veículo, um veículo por IoT
4. **A telemetria começa a fluir** assim que o dispositivo liga com um SIM e alcança o broker MQTT da Ridewolf. A lista mostra o instantâneo mais recente — atualize ou aguarde o AutoRefresh

Alternativamente, use a ação em massa **Gerar veículo** abaixo para criar um veículo novo para cada IoT selecionado em uma única operação (por exemplo, após integrar um lote de novas scooters).

## Filtros

| Filtro | Tipo     | Notas                                      |
| ------ | -------- | ------------------------------------------ |
| Pesquisa | Texto     | Corresponde a nome e IMEI                   |
| Status | Dropdown | `Todos` / `Ativo` / `Inativo` / `Arquivado` |

Os filtros são sincronizados com a URL (atualizar mantém sua visualização) e podem ser resetados para os padrões via o link Limpar na barra de filtros.

## Colunas

| Coluna          | Ordenável? | Conteúdo                                                                 |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **Nome**        | sim       | Nome do dispositivo + ID curto; clique na linha para abrir a página de detalhes           |
| **Trava**        | —         | Indicador do estado da trava (Travado / Destravado) do último comando MQTT          |
| **Online**      | —         | Ponto verde se o último ping estiver dentro da janela de atualização; vermelho se desatualizado |
| **GPS**         | —         | Indicador de fixação válida / inválida                                           |
| **GSM**         | —         | Força do sinal (escala 0-32, vermelho ≤10, amarelo ≤20, verde ≤32)            |
| **Bateria**     | sim       | Percentual da bateria com barra colorida                                     |
| **Status**      | sim       | Indicador `Ativo` / `Inativo` / `Arquivado`                                 |
| **Último Sinal** | sim       | Tempo desde o último pacote de telemetria (relativo, ex: "há 5m")          |

## Ações por linha

Um menu de três pontos por linha. As ações disponíveis dependem das permissões:

| Ação            | Permissão | O que faz                                                               |
| ----------------- | ---------- | -------------------------------------------------------------------------- |
| **Visualizar detalhes**  | —          | Abre a página de detalhes do dispositivo (abas Detalhes / Atividade / Comandos / Histórico) |
| **Visualizar localização** | —          | Abre as últimas coordenadas GPS conhecidas no Google Maps (nova aba)               |
| **Editar**          | `edit`     | Abre o formulário de edição (Nome / IMEI / Fornecedor / Status)                         |
| **Excluir**        | `delete`   | Remove o registro do dispositivo. A confirmação tem um atraso de 3 segundos antes de desbloquear  |

## Ações em massa

Selecione várias linhas (checkbox no cabeçalho ou por linha) para revelar a barra de ações em massa. As ações também são controladas por permissões — as que você não pode executar ficam ocultas, não esmaecidas:

| Ação                     | Permissão        | O que faz                                                                                                       |
| -------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Gerar veículo**       | `vehicles.create` | Cria um veículo novo para cada IoT selecionado, nomeado automaticamente com o prefixo da sua empresa; escolha um modelo de veículo + etiquetas opcionais |
| **Alterar status**          | `edit`            | Define Ativo / Inativo / Arquivado para todos os selecionados                                                                  |
| **Testar conexão (Bip)** | `send-command`    | Envia um comando `Beep` para cada dispositivo — útil para localizar fisicamente unidades em um depósito                            |
| **Enviar comando**           | `send-command`    | Escolha um comando do fornecedor do primeiro selecionado (procedimento predefinido ou avançado multi-etapas) e envie para todos         |
| **Excluir**                 | `delete`          | Exclusão em massa com diálogo de confirmação (atraso de 3 segundos para confirmar)                                                    |

As operações em massa são executadas sequencialmente com progresso (`processado / total`) e um painel de itens falhados — sucesso parcial é normal, dispositivos falhados permanecem selecionados para que você possa tentar novamente ou inspecionar.

## Página de detalhes

Clicar em uma linha (ou _Visualizar detalhes_) abre a página de detalhes do dispositivo. Quatro abas:

- **Detalhes** — IMEI / Fornecedor / Status / coordenadas com visualização embutida do Google Maps; bloco completo de telemetria (modo de velocidade, validade do GPS, valor bruto GSM, bateria, estado da trava)
- **Atividade** — registro genérico de atividade para este dispositivo (`entity-type=iot`)
- **Comandos** — emissor de comandos com conhecimento do fornecedor. O mesmo mecanismo é usado na aba Comandos do [Detalhe do Veículo](../../operations/fleet/vehicle-detail.md) — veja esse artigo para o procedimento / fluxo avançado
- **Histórico** — histórico de telemetria / registro de pacotes

O cabeçalho mostra o Veículo vinculado (se houver) como um chip — clique para ir para a página de detalhes desse veículo. Um menu suspenso **Ações** no cabeçalho oferece Editar / Visualizar no Google Maps / Excluir.

## Formulário de Criação / Edição

O formulário IoT (`+ Criar` ou _Editar_) tem quatro campos, todos obrigatórios:

- **Nome** — rótulo curto que você verá nas listas (ex.: `SCOOTER-014`). Texto livre
- **IMEI** — identificador único de hardware do dispositivo (usado para vincular um veículo e receber tráfego MQTT). Uma vez definido, trate como imutável — alterá-lo em um dispositivo implantado quebrará a telemetria até que a vinculação do veículo seja atualizada
- **Fornecedor** — string do fabricante (ex.: `omni`, `segway`). Determina qual conjunto de comandos o dispositivo entende — seja exato, a busca pelo fornecedor diferencia maiúsculas de minúsculas
- **Status** — `Ativo` (padrão) / `Inativo` (oculto no seletor para vinculação de veículo) / `Arquivado` (hardware aposentado)

Não há formulário embutido para vincular a um veículo aqui — essa função é responsabilidade do formulário de Criação / Edição de Veículo.

## Fluxos de trabalho típicos

- **Cadastrar um lote de 50 rastreadores** — Crie cada um (ou importe via upload CSV, se tiver) → selecione todos → _Gerar veículo_ com o modelo correto → pronto; cada IoT agora tem um veículo pareado em status `needs_investigation` pronto para QA
- **Encontrar uma unidade perdida no depósito** — Filtre por nome/IMEI → ação na linha _Testar conexão (Bip)_ ou Bip em massa → ande ouvindo
- **Aposentar um dispositivo quebrado** — Editar → definir Status = Arquivado (não Excluir — o registro de Atividades é preservado). Se um veículo estava vinculado, desvincule primeiro no formulário de edição do Veículo
- **Implantação de comando para todo fornecedor** (ex.: configuração de firmware) — Filtre por padrão de nome ou telemetria, selecione todos que correspondem → _Enviar comando_ → escolha o comando do fornecedor e deixe-o percorrer a lista com progresso
- **Investigar um veículo "fantasma"** (online mas perdido) — Visualizar localização → se o GPS estiver Inválido, tente Bip; se ainda silencioso, suspeite do SIM / bateria
- **Conferir telemetria contra eventos** — abra o [relatório de Eventos](../../analytics/reports/events.md) filtrado pelo veículo deste IoT para correlacionar estado do hardware com atividade na plataforma

## Dicas

- **IMEI é a chave de junção** em todos os lugares — vinculação de veículo, roteamento MQTT, tickets de suporte. Digite uma vez, copie para sempre
- **O campo Fornecedor é estrutural, não cosmético** — ele direciona o catálogo de comandos na aba Comandos. Escrever `omni` errado como `Omni` pode resultar em lista de comandos vazia
- **Online ≠ Ativo** — Online é um sinal de telemetria ao vivo; Status é uma flag administrativa. Um dispositivo Ativo pode estar Offline (bateria descarregada, sem GSM); um Arquivado ainda pode enviar pings até ser desligado
- **Enviar comando em massa usa o fornecedor da primeira linha** — se sua seleção misturar fornecedores, divida em lotes de fornecedor único ou terá uma lista de comandos confusa
- **Gerar veículo cria `needs_investigation` veículos de propósito** — eles precisam que um humano confirme se a vinculação está correta antes de entrar em operação. Etiquetar em massa durante a geração facilita a próxima rodada de QA
- **Não existe botão "forçar re-pareamento"** — se a telemetria parar após uma troca, verifique a vinculação Veículo → IoT (edição do Veículo) e o SIM / energia do dispositivo, não esta página
- **Dispositivos Arquivados continuam pesquisáveis** pelo IMEI — útil quando uma unidade antiga volta da manutenção e precisa ser reativada (mude para Ativo)
- **Último Sinal é a verificação de saúde mais rápida** — ordene decrescente para encontrar dispositivos obsoletos primeiro; qualquer coisa > 24h em uma linha Ativa merece atenção
