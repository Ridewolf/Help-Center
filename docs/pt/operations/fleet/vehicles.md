# Veículos — Lista

A lista de Veículos (`/vehicles`) é o inventário de toda a sua frota — cada patinete, bicicleta ou outra unidade, com seu estado atual, localização, bateria, conexão IoT, etiquetas e zona. Esta é a página mais usada no Painel: você começa aqui para quase qualquer operação da frota.

Para trabalho por veículo (status completo, histórico, comandos IoT, reprodução de rota) abra a [página de detalhes do Veículo](vehicle-detail.md).

Permissão necessária: **Veículos** (`k7m8n9`).

## Como os veículos chegam aqui

Os veículos não aparecem sozinhos — eles são criados e mantidos por você:

1. O operador **cria um veículo** via o botão _Criar_ (define etiqueta, modelo, dispositivo IoT, estado inicial)
2. O veículo é registrado contra um dispositivo IoT; esse dispositivo começa a reportar **bateria, estado da trava, último sinal, coordenadas GPS** continuamente
3. Assim que o dispositivo IoT envia seu primeiro heartbeat, a linha nesta lista se preenche com dados ao vivo — porcentagem da bateria, tempo do sinal, indicador da trava
4. Operadores (e ações em massa) **atualizam status, etiquetas, zona, configurações** durante a vida útil do veículo
5. Quando o veículo é aposentado, você altera seu status para _Armazenamento_ / _Manutenção_ / etc., ou o exclui

A lista é atualizada quando você recarrega ou altera filtros; atualizações IoT ao vivo enviadas pelo backend também podem atualizar linhas no lugar.

## Modos de visualização — Tabela vs Mapa

A página tem duas visualizações, alternáveis por um controle no topo:

- **Tabela** — a grade completa de dados com todos os filtros, ordenação e seleção em massa
- **Mapa** — a mesma frota projetada em um mapa da sua área de operação; veículos são pinos coloridos por status com distintivos de bateria

Filtros se aplicam a ambas as visualizações. A visualização Mapa é ótima para identificar aglomerados, lacunas e oportunidades de reequilíbrio; Tabela é o que você usa para trabalhar com dados.

## Filtros

| Filtro   | Tipo            | Notas                                                                       |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Pesquisa | Texto em largura total | Pesquisa etiqueta do veículo, ID, serial IoT — a entrada de texto é **debounced ~300ms** |
| Odômetro | Dropdown        | Faixas de distância total: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Status   | Dropdown        | Filtra pelo status do veículo (veja referência de status abaixo)            |
| Etiquetas| Multi-seleção   | Filtra pelas etiquetas aplicadas ao veículo                                 |

Todos os filtros são combinados com E. As etiquetas de filtro aparecem acima da tabela; a URL é atualizada conforme você avança.

## Colunas

| Coluna          | Ordenável? | Conteúdo                                                                                   |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Saúde**       | —         | Indicadores compactos de saúde IoT (periféricos) — pequenos ícones resumindo o status dos subsistemas IoT |
| **Código**      | ✓         | Etiqueta do veículo (o código legível no adesivo), com link para o detalhe do veículo     |
| **Status**      | ✓         | Pílula de status (Disponível, Em uso, Carregando, etc. — veja referência abaixo)          |
| **Modelo**      | —         | Nome do modelo e miniatura (ex: Xiaomi M365)                                              |
| **Trava**       | —         | Ícone de trava — fechado (travado) / aberto (destravado) baseado no último relatório IoT  |
| **Bateria**     | ✓         | Porcentagem da bateria com barra colorida (verde ≥ 60%, âmbar 30–60%, vermelho < 30%)     |
| **Etiquetas**   | —         | Etiquetas aplicadas a este veículo (operadores podem editar)                             |
| **Zona**        | —         | Zona em que o veículo está atualmente, ou "Fora da zona"                               |
| **Última corrida** | ✓       | Data / hora em que o veículo foi desbloqueado pela última vez para uma corrida           |
| **Último sinal**| ✓         | Quando o dispositivo IoT reportou pela última vez (sinal antigo = dispositivo provavelmente offline) |

Colunas ordenáveis marcadas com ✓ — clique no cabeçalho. A ordenação é refletida na URL.

## Referência de status

Cada veículo está em exatamente um status. O status determina o comportamento (se os riders podem alugá-lo, se alertas IoT disparam, etc.):

| Status                  | Significado                                            |
| ----------------------- | ------------------------------------------------------ |
| **Disponível**          | Ocioso, alugável, estacionado corretamente             |
| **Em uso**              | Atualmente em uma corrida                              |
| **Carregando**          | Em uma estação de carregamento                         |
| **Descarregado**        | Bateria muito baixa para ser alugada                   |
| **Precisa de investigação** | Marcado pelo sistema ou operador — requer revisão manual |
| **Manutenção**          | Na oficina / fora da frota para reparo                  |
| **Não pronto**          | Criado mas ainda não liberado para riders               |
| **Reservado**           | Reservado para um rider/reserva específica              |
| **Transporte**          | Sendo movido (reequilíbrio, recolhimento do campo)     |
| **Armazenamento**       | Em armazenamento de longo prazo, fora de operações     |
| **Roubado**             | Reportado como roubado / não localizado                 |
| **Alerta**              | Alerta crítico do IoT ou sistema                        |

## Ações na linha

Cada linha tem um **menu de três pontos** no extremo direito. As ações disponíveis dependem das suas permissões:

| Ação                   | Permissão            | O que faz                                                            |
| ----------------------- | --------------------- | --------------------------------------------------------------------- |
| **Visualizar detalhes** | —                     | Abre a [página de detalhes do veículo](vehicle-detail.md)            |
| **Visualizar histórico de rotas** | `coordinates-history` | Abre uma visualização no mapa reproduzindo a trilha GPS recente do veículo |
| **Abrir no Google Maps**| —                     | Abre as últimas coordenadas conhecidas do veículo no Google Maps (nova aba) |
| **Editar**              | `edit`                | Abre o formulário de edição                                          |
| **Alterar status**      | `edit`                | Abre um pequeno diálogo para alterar o status sem sair da lista     |
| **Excluir**             | `delete`              | Exclui o veículo de forma suave (com diálogo de confirmação)        |

Ações para as quais você não tem permissão são ocultadas.

## Ações em massa

Selecione um ou mais veículos com as caixas de seleção à esquerda de cada linha. Uma **barra de ações em massa** aparece no topo com a contagem selecionada e as ações:

| Ação em massa        | Permissão    | O que faz                                                        |
| -------------------- | ------------ | ---------------------------------------------------------------- |
| **Alterar status**   | `bulk-update` | Abre um diálogo e aplica um único status a todos os veículos selecionados |
| **Alterar tags**     | `bulk-update` | Adiciona ou remove tags em toda a seleção                       |
| **Alterar configurações** | `bulk-update` | Aplica configurações do veículo (ex: velocidade máxima, alarmes) a todos os selecionados |
| **Enviar comando**   | `iot-command` | Envia um comando IoT (travar, destravar, ligar/desligar alarme, reiniciar) para todos |
| **QR em lote**       | —            | Gera uma folha de códigos QR imprimível para os veículos selecionados |
| **Excluir selecionados** | `delete`      | Exclui suavemente todos os veículos selecionados (com diálogo de confirmação) |

## Ações da página (canto superior direito)

- **+ Criar** — abre o [formulário de criação de Veículo](vehicle-create-edit.md) (artigo separado)
- **Exportar** — baixa a lista filtrada atual como um arquivo (respeitando filtros e ordenação)
- **QR em lote** (também disponível como ação em massa) — abre o assistente de lote QR para gerar códigos imprimíveis

## Visualização no mapa

Ao alternar para a visualização no Mapa:

- Veículos aparecem como **pinos** coloridos por status (verde = Disponível, azul = Em uso, etc.)
- Um pequeno **ícone de bateria** fica ao lado de cada pino
- Clique em um pino para abrir um popover com o rótulo do veículo, status, bateria e um link _Visualizar detalhes_
- **Filtros ainda se aplicam** — filtre por status, tags, etc. e o mapa atualiza
- Panorâmica / zoom com mouse ou gestos de dois dedos

O mapa é alimentado pelos mesmos dados da tabela — é uma lente diferente, não um conjunto de dados diferente.

## Fluxos de trabalho típicos

- **Rebalanceamento em massa** — filtre por `Status = Descarregado` + zona, selecione todos, _Enviar comando → Travar_ (ou _Alterar status → Transporte_) antes da coleta
- **Encontrar um veículo travado** — ordene por _Último sinal_ ascendente para ver os sinais mais antigos no topo
- **Detectar baterias fracas antes que sejam um problema** — ordene por _Bateria_ ascendente; o fundo da frota é sua fila de manutenção futura
- **Auditar uma tag** — filtre por tag e revise as linhas
- **Preparação da equipe de campo** — filtre para os alvos do dia, _QR em lote_ para imprimir etiquetas para novas unidades

## Dicas

- **A busca é com debounce** — pause a digitação para o servidor responder uma vez
- **URL = a visualização** — copie e compartilhe links filtrados com colegas
- **Coluna de saúde de relance** — os pequenos ícones resumem subsistemas IoT; passe o mouse sobre qualquer ícone para ver o que representa (ex: sinal celular, estado da trava, leitura do sensor)
- **Cor da bateria é seu código rápido** — uma barra vermelha na lista = precisa de carregador ou coleta em breve
- **Indicador de trava é o último relatório IoT** — pode estar alguns segundos atrasado; use _Enviar comando → Travar_ se precisar garantir o estado no dispositivo
