# Corridas — Lista

Uma **corrida** é uma única viagem feita por um cliente em um dos seus veículos. A lista de Corridas (`/rides`) é o registro mestre de todas as viagens — passadas, atuais e futuras — em toda a frota.

Abra uma linha para ver a [página de detalhes da Corrida](ride-detail.md) com rota, linha do tempo e todas as ações.

Permissão necessária: **Corridas** (`i1j2k3`).

## Como as corridas aparecem aqui

Você não cria corridas no painel — elas se originam do lado do cliente:

1. Um cliente **desbloqueia um veículo** no aplicativo móvel (Ridewolf rider app)
2. O backend abre um novo registro de corrida vinculado a esse veículo e cliente
3. A corrida aparece imediatamente nesta lista com status **Ativo**
4. Quando o cliente **trava / estaciona** o veículo, o backend encerra a corrida; o status muda para **Concluído** e o detalhamento final (distância, duração, preço) é calculado
5. Outros estados finais (`Cancelado`, etc.) vêm de regras do sistema ou ações do operador

Atualize ou revisite a página para obter o instantâneo mais recente — corridas ativas atualizam conforme o cliente se move.

## Ordem padrão

Por padrão, o backend retorna **primeiro as corridas ativas**, depois as corridas concluídas em ordem cronológica reversa (mais recentes primeiro). Aplique uma ordenação por coluna para substituir essa ordem padrão.

## Filtros

| Filtro    | Tipo          | Notas                                                                |
| --------- | ------------- | ------------------------------------------------------------------- |
| Pesquisa  | Texto         | Pesquisa nome do cliente, etiqueta do veículo, ID da corrida       |
| Intervalo | Calendário    | Seletor de início / fim; padrão é "todo o período"                |
| Status    | Dropdown      | `Ativo`, `Concluído`, `Cancelado`, etc.                            |
| Avaliação | Dropdown      | Filtra pela avaliação em estrelas deixada pelo passageiro (1–5, _Sem avaliação_) |
| Etiquetas | Multi-seleção | Filtra pelas etiquetas da corrida (herdadas do veículo — veja Colunas abaixo) |

Todos os filtros combinam com E. As etiquetas de filtro aparecem acima da tabela; a URL reflete o estado atual do filtro.

## Colunas

| Coluna  | Ordenável? | Conteúdo                                                            |
| ------- | ---------- | ------------------------------------------------------------------ |
| Cliente | —          | Avatar, nome, link para o perfil do cliente                         |
| Veículo | —          | Etiqueta, modelo, link para o veículo                              |
| Tarifa  | —          | Nome da tarifa aplicada à corrida                                  |
| Estatísticas | —      | Insígnias rápidas: distância, duração, custo total                 |
| Etiquetas | —         | Etiquetas herdadas do **veículo** no momento em que a corrida começou |
| Status  | ✓          | Indicador de status (Ativo, Concluído, Cancelado, etc.)            |
| Avaliação | ✓         | Avaliação em estrelas deixada pelo passageiro (ou "–" se nenhuma) |
| Criado  | ✓          | Data e hora em que a corrida começou; ordenação padrão = mais recente primeiro |

Ordene clicando em um cabeçalho ordenável. A ordenação escolhida faz parte da URL e **substitui** a ordem padrão descrita acima — não há um terceiro clique para "restaurar padrão", mas você pode limpar a ordenação editando a URL ou atualizando a página sem parâmetro de ordenação.

> **Etiquetas são herdadas do veículo.** Corridas não têm seu próprio editor de etiquetas — as etiquetas de uma corrida são um instantâneo das etiquetas que estavam no veículo quando a corrida começou. Edite as etiquetas do veículo depois e as corridas existentes mantêm seu instantâneo original; somente novas corridas adotam as novas etiquetas.

## Ações na linha

Cada linha tem um **menu de três pontos** no extremo direito. As ações disponíveis dependem do status da corrida e das suas permissões:

| Ação         | Permissão       | Quando habilitada                                               |
| ------------ | --------------- | -------------------------------------------------------------- |
| **Pausar**   | `pause-unpause` | Corrida está **Ativa** (não pausada, concluída ou cancelada)   |
| **Retomar**  | `pause-unpause` | Corrida está **Pausada**                                       |
| **Encerrar corrida** | `end-ride` | Corrida **não está** Concluída ou Cancelada                    |

Ações para as quais você não tem permissão são ocultadas. Ações desabilitadas (ex.: Encerrar em uma corrida já concluída) aparecem esmaecidas para que você ainda veja o que é possível no estado correto.

O conjunto completo de ações — reembolso, visualizar rota no mapa, enviar notificação, arquivar — está na **página de detalhes da corrida**. Clique na linha para acessá-las.

## Ações da página

No canto superior direito da página da lista:

- **Exportar** — baixe a lista atualmente filtrada como um arquivo (filtros e ordenação são respeitados)

## Fluxos típicos na lista

- **Acompanhar atividade ao vivo** — abra a página e permaneça nela; o topo da lista mostra corridas ativas
- **Encontrar corridas em uma zona ou intervalo de tempo** — combine intervalo de datas + status + etiquetas
- **Detectar anomalias** — filtre por `Status = Cancelado` ou `Avaliação ≤ 2` e procure padrões (mesmo veículo? mesma hora do dia?)
- **Parar uma corrida travada rapidamente** — sem sair da lista, abra o menu da linha e _Encerrar corrida_ (requer permissão)

## Dicas

- **A URL é compartilhável** — filtre a lista, copie a URL, envie para um colega — ele verá a mesma visualização
- **Insígnias de estatísticas na lista** são uma forma rápida de identificar corridas muito curtas ou longas antes de clicar
- **Não confie apenas na avaliação** — abra a página de detalhes para corridas com baixa avaliação; a avaliação é um entre muitos sinais
- **Permissões variam por empresa** — alguns operadores veem apenas corridas dos veículos que gerenciam; se uma corrida estiver faltando para você, consulte um administrador
