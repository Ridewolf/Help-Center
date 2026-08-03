# Regras de Veículos

A página Regras de Veículos (`/settings/vehicle-rules`) é o **catálogo de modelos de veículos** que o Ridewolf sabe operar — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_, e assim por diante. Cada linha aqui é um **modelo template**: um conjunto reutilizável de preços, limites técnicos, regras de comprovante fotográfico e etiquetas que são vinculados a [veículos](../../operations/fleet/vehicles.md) físicos individuais via o [formulário de veículo](../../operations/fleet/vehicle-create-edit.md).

Permissão necessária: **Regras de Veículos** (`e7f8g9`). Subpermissões controlam `create` / `edit` / `delete`.

## Modelo vs instância do veículo

Esta é a distinção mais importante nesta página:

- Um **Modelo de Veículo** (esta página) — uma definição. _"Todo Xiaomi M365 em nossa frota se comporta assim"_. Uma linha por marca/configuração.
- Um **Veículo** (a [lista de Veículos](../../operations/fleet/vehicles.md)) — uma unidade física com uma etiqueta adesiva como `RW-007`, vinculada a um dispositivo IoT, estacionada em algum lugar. Centenas desses apontam para um único modelo.

Quando você altera um modelo aqui, todo veículo vinculado a ele herda os novos padrões — tarifas tornam-se ativas, limites de velocidade são atualizados, requisitos de comprovante fotográfico entram em vigor. Trate esta página como uma **camada de política** que se espalha para muitas unidades ao mesmo tempo.

## Filtros

A barra de filtro superior tem três controles:

| Filtro      | Tipo     | Notas                                                                             |
| ----------- | -------- | -------------------------------------------------------------------------------- |
| **Pesquisar** | Texto    | Pesquisa o rótulo do modelo                                                      |
| **Status**  | Dropdown | `Todos` / `Ativo` / `Inativo` / `Arquivado`                                     |
| **Tipo**    | Dropdown | `Todos` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Car` / `E-Boat` |

Alterar qualquer filtro reinicia a paginação para a página 1 e recarrega do servidor.

## Colunas

| Coluna          | Ordenável? | Conteúdo                                                                                     |
| --------------- | ---------- | -------------------------------------------------------------------------------------------- |
| **Imagem**      | —          | Miniatura 64×64; exibe um ícone genérico de carro se nenhuma imagem for carregada             |
| **Nome**        | ✓          | O rótulo do modelo (ex.: _Xiaomi M365 Pro_)                                                  |
| **Tipo**        | ✓          | Etiqueta do tipo de veículo (e-scooter, e-bike, …)                                          |
| **Descrição**   | ✓          | Primeiros 36 caracteres da descrição em markdown, sem formatação                             |
| **Etiquetas**   | —          | Até 2 etiquetas + um chip `+N` para excesso — **clique para edição rápida** em um diálogo    |
| **Status**      | ✓          | Etiqueta colorida: Ativo (verde) / Inativo (cinza) / Arquivado (azul) — **clique para edição rápida** |
| **Criado**      | ✓          | Data de criação do modelo                                                                    |
| **Atualizado**  | ✓          | Data da última alteração                                                                     |

Cliques para edição rápida abrem um pequeno diálogo com apenas a seleção múltipla de etiquetas ou o dropdown de status — útil para alterar status em lote sem sair da lista.

## Ações da barra de ferramentas

Botões no canto superior direito (visibilidade depende das permissões):

| Botão            | Permissão | O que faz                                                                                                                  |
| ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Atualização automática** | —         | Atualiza a lista em intervalos regulares; alterna ligar/desligar; o ícone gira enquanto carrega                            |
| **Importar**      | `create`  | Seleciona um arquivo JSON (formato de exportação). Cada item vira uma chamada `create`; etiquetas e tarifas são removidas — reanexe manualmente depois |
| **Exportar**      | —         | Abre um diálogo para exportar a página atual / todas filtradas / páginas específicas como `vehicle-models-export.json`     |
| **+ Criar**       | `create`  | Vai para `/settings/vehicle-rules/create`                                                                                   |

## Ações da linha

Menu de três pontos por linha:

| Ação             | Permissão | O que faz                                                                                                                 |
| ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Visualizar detalhes** | —         | Abre o detalhe do modelo em `/settings/vehicle-rules/:id` (abas Geral / Técnico / Histórico)                              |
| **Editar**        | `edit`    | Abre o formulário de edição (`/settings/vehicle-rules/:id/edit`) com o conjunto completo de campos                         |
| **Excluir**       | `delete`  | Diálogo de confirmação destrutiva com atraso de 3 segundos antes do botão confirmar ativar. A linha do modelo desaparece da lista |

Clicar na linha em si (em qualquer lugar fora dos chips de edição rápida) vai para **Visualizar detalhes**.

## Formulário de Criar / Editar

`+ Criar` (`/settings/vehicle-rules/create`) e _Editar_ (`/settings/vehicle-rules/:id/edit`) compartilham o mesmo layout: um cartão de formulário à esquerda, uma barra lateral contextual **Guia de Campos** à direita com uma pré-visualização ao vivo do modelo.

O formulário é agrupado em seções — Criar mostra apenas os sete campos principais; Editar adiciona três subseções extras (Especificações Técnicas, Políticas Automáticas, Requisitos de Documentos) para configurações avançadas.

### Campos principais

| Campo            | Obrigatório | Notas                                                                                                                                   |
| ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Label**        | ✓           | Nome legível exibido em todos os lugares (ex.: _Xiaomi M365 Pro_). Texto livre                                                          |
| **Description**  | —           | Editor Markdown; usado no detalhe do modelo e em dicas para operadores                                                                 |
| **Vehicle Type** | ✓           | Um dos seguintes: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Define o ícone de condução e a lógica de categoria       |
| **Status**       | ✓           | Ativo / Inativo / Arquivado. Inativo remove o modelo do seletor de criação de veículo                                                    |
| **Image**        | —           | Arraste e solte ou clique para carregar. PNG/JPEG/JPG, máximo 10 MB. Exibido na miniatura da lista e no detalhe do Veículo               |
| **Tariffs**      | ✓           | Seleção múltipla de [Vehicle Tariffs](vehicle-tariffs.md). Todas as corridas deste modelo são tarifadas conforme essas tarifas          |
| **Tags**         | ✓           | Seleção múltipla de etiquetas no nível do modelo. Herdadas por todos os veículos deste modelo                                            |

### Especificações Técnicas (somente modo de edição)

| Campo                             | Notas                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| **Base speed limit (km/h)**       | Limite máximo imposto pelo firmware IoT em cada corrida                              |
| **Battery reserve (%)**           | Nível de carga abaixo do qual o veículo é considerado com bateria baixa               |
| **Range reserve (km)**            | Alcance estimado restante abaixo do qual a unidade é sinalizada para troca            |
| **Min / Max battery voltage (V)** | Limites para leituras válidas da bateria principal — qualquer valor fora sinaliza _Precisa de investigação_ |
| **Min / Max IoT voltage (V)**     | O mesmo, para a bateria do módulo IoT do rastreador                                    |

### Políticas Automáticas (somente modo de edição)

Alternar pacote: **Parada por bateria baixa**, **Parada por saldo baixo**, **Múltiplas corridas**, **Bloqueio automático**, além de **Reembolso automático** e **Desconto automático** com seus próprios limites (distância / tempo / valor).

### Requisitos de Documentos (somente modo de edição)

Define quais fotos / documentos o usuário deve enviar:

- **Comprovantes de início** — fotos do veículo no início da corrida (alternar + obrigatório + quantidade) e selfie do usuário
- **Comprovantes de estacionamento** — fotos do estacionamento no fim da corrida (alternar + obrigatório + quantidade)
- **Documentos extras** — carteira de motorista / passaporte / identidade / selfie / outros

Essas regras são lidas pelo Rider App ao iniciar / encerrar uma corrida em um veículo vinculado a este modelo.

## Relação com outras entidades

- **[Vehicle Tariffs](vehicle-tariffs.md)** — as linhas de preço que você seleciona no campo **Tariffs**. Um modelo sem tarifas não pode precificar uma corrida
- **[Vehicles](../../operations/fleet/vehicles.md)** — unidades físicas que apontam para este modelo via o campo _Vehicle Model_ do [formulário de veículo](../../operations/fleet/vehicle-create-edit.md). O modelo define a política; o veículo possui o IoT, etiqueta e localização
- **Tags** — etiquetas no nível do modelo herdadas por todos os veículos deste modelo, além das etiquetas no nível do veículo aplicadas diretamente na unidade. As corridas herdam ambas no início da corrida

## Fluxos típicos

- **Cadastrar um novo modelo** — `+ Create` → preencher Label / Type / Status / Image → escolher as tarifas aplicáveis → salvar → abrir o novo modelo na lista e clicar em _Editar_ para definir Especificações Técnicas e políticas
- **Desativar um modelo** — abrir o modelo → _Editar_ → definir Status = _Arquivado_ → salvar. Veículos existentes continuam funcionando; o modelo apenas não aparece mais no seletor de criação de veículo
- **Alterar tarifa em toda a frota** — editar o modelo → trocar tarifas → salvar. Todos os veículos deste modelo passam a tarifar conforme as novas tarifas na próxima corrida
- **Importação em massa após migração** — Exportar do ambiente de testes → Importar o arquivo JSON aqui → reatribuir tarifas e etiquetas manualmente em cada novo modelo (a importação remove essas referências de propósito)
- **Ajustar requisitos de fotos** — Editar → Requisitos de Documentos → alternar Comprovantes de início / estacionamento → salvar. O Rider App aplica as novas regras na próxima corrida iniciada

## Dicas

- **Defina as tarifas antes de ativar** — um modelo sem tarifas rejeitará solicitações de precificação de corrida
- **Use Inativo, não Excluir, para desativar** — Inativo oculta o modelo da criação de novos veículos, mas mantém o histórico intacto. Excluir é irreversível e bloqueado pelo atraso de confirmação de 3 segundos por um motivo
- **Imagem importa** — a miniatura da lista e os seletores de veículo do operador usam esta imagem. Recorte para um quadrado com fundo transparente para o visual mais limpo
- **Etiquetas aqui são no nível do modelo, não do veículo** — aplicar uma etiqueta aqui a coloca em todos os veículos deste modelo. Para etiquetas específicas da unidade, edite o veículo individualmente
- **Alertas das Especificações Técnicas** — reserva de bateria e limites de voltagem alimentam o gatilho _Precisa de investigação_; definir limites muito restritos sobrecarrega a fila de alertas
- **A barra lateral do Guia de Campo atualiza conforme você foca um campo** — leia-a na primeira vez que criar um modelo, ela está mais atualizada do que este artigo jamais estará
