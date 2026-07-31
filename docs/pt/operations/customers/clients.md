# Clientes — Lista

A lista de Clientes (`/clients`) é seu banco de dados de clientes: toda pessoa que registrou uma conta no seu serviço, com seu saldo, etiquetas, resumo do histórico de corridas e canais de contato.

Para trabalho por cliente (histórico completo, ações de saldo, dispositivos, comentários) abra a [página de detalhes do Cliente](client-detail.md).

Permissão necessária: **Clientes** (`e4f5h6`). Subpermissões adicionais controlam ações específicas por linha e em massa.

## Como os clientes aparecem aqui

Você normalmente não cria clientes no painel — eles se cadastram pelo aplicativo móvel do rider:

1. Uma pessoa instala o **Ridewolf rider app** e se registra (telefone ou email)
2. O backend cria um registro de cliente; a linha aparece aqui com status **Registrando** enquanto a verificação (SMS, ID, método de pagamento) está em andamento
3. Após a verificação, o status muda para **Ativo** — o cliente pode fazer corridas
4. Operadores podem criar clientes manualmente (ex.: para contas VIP ou de teste) via `+ Criar` — coberto no artigo _Criar_

A lista é atualizada ao recarregar ou alterar filtros.

## Filtros

| Filtro     | Tipo         | Notas                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Pesquisar  | Texto        | Pesquisa por nome, telefone, email, ID do cliente          |
| Intervalo | Calendário   | Filtra por **data de registro**; de / até                   |
| Status     | Dropdown     | `Ativo` / `Bloqueado` / `Congelado` / `Registrando` (ou `Todos`) |
| Etiquetas  | Multi-seleção| Filtra por etiquetas aplicadas ao cliente                   |

Todos os filtros são combinados com E. As etiquetas de filtro aparecem acima da tabela; a URL reflete o estado atual.

## Colunas

| Coluna        | Ordenável? | Conteúdo                                                                       |
| ------------- | --------- | ----------------------------------------------------------------------------- |
| **Cliente**   | ✓         | Avatar + nome + sobrenome + telefone ou email; link para o detalhe do cliente |
| **Canais**    | —         | Ícones dos canais de contato verificados pelo cliente (telefone, email, social) |
| **Saldo**     | ✓         | Saldo da carteira na moeda da empresa, em vermelho quando negativo            |
| **Etiquetas** | —         | Etiquetas aplicadas a este cliente                                           |
| **Status**    | ✓         | Indicador de status (veja referência abaixo)                                |
| **Avaliação** | ✓         | Avaliação média que riders deram a este cliente (avaliação do motorista)      |
| **Corridas**  | ✓         | Contagem total de corridas                                                    |
| **Última corrida** | ✓     | Data da última corrida do cliente                                            |
| **Pagamento** | —         | Ícone do método de pagamento padrão (cartão, carteira, etc.)                 |

Ordene clicando no cabeçalho ordenável. A ordenação faz parte da URL.

## Referência de status

| Status          | Significado                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| **Ativo**       | Totalmente verificado, pode fazer corridas, pode ser cobrado                       |
| **Bloqueado**   | Não pode fazer corridas; bloqueio iniciado pelo operador (fraude, abuso, dívida) ou pelo sistema |
| **Congelado**   | Conta pausada (ex.: enquanto uma disputa é investigada, ou a pedido do cliente)   |
| **Registrando** | Cadastro em andamento — telefone / email / ID / método de pagamento ainda não verificados |

## Ações por linha

Cada linha tem um **menu de três pontos** à direita. Ações disponíveis dependem das suas permissões:

| Ação                | Permissão           | O que faz                                                                        |
| ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| **Visualizar perfil** | —                 | Abre a [página de detalhes do cliente](client-detail.md)                        |
| **Histórico de corridas** | —              | Abre a visão das corridas do cliente (uma fatia focada da lista global de corridas) |
| **Enviar SMS**      | —                   | Abre um diálogo para enviar SMS para o telefone verificado do cliente            |
| **Enviar email**    | —                   | Abre um diálogo para enviar email para o endereço verificado do cliente          |
| **Enviar push**     | —                   | Abre um diálogo para enviar notificação push para o app do cliente               |
| **Recarregar saldo**| `topup-manual`      | Abre o diálogo de saldo — credita dinheiro na carteira do cliente                |
| **Aplicar multa**   | `fine`              | Abre o diálogo de multa — debita dinheiro da carteira (por dano, estacionamento, etc.) |
| **Bloquear / Desbloquear** | `block` / `unblock` | Abre o diálogo de bloqueio — alterna o status bloqueado do cliente com motivo opcional |
| **Editar**          | `edit`              | Abre o [formulário de edição](client-create-edit.md)                            |
| **Excluir**         | `delete`            | Exclui suavemente o registro do cliente (com confirmação; item destrutivo em vermelho) |

Ações para as quais você não tem permissão são ocultadas no menu.

## Ações em massa

Selecione um ou mais clientes com as caixas de seleção à esquerda. Uma **barra de ações em massa** aparece no topo com a contagem selecionada e as ações:

| Ação em massa     | Permissão           | O que faz                                                               |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| **Adicionar saldo** | `topup-manual`      | Credita um valor único em todas as carteiras selecionadas (com confirmação) |
| **Cobrar valor**   | `fine`              | Debita um valor único de todas as carteiras selecionadas (ex.: multa geral) |
| **Alterar status** | `block` / `unblock` | Define o mesmo status para todos os clientes selecionados (Ativo / Bloqueado / Congelado) |
| **Enviar push**    | —                   | Envia uma notificação push para todos os clientes selecionados de uma vez |

Os diálogos em massa guiam você pelo valor / mensagem / status, depois aplicam a todos os itens selecionados em uma única operação com confirmação final.

## Ações da página (canto superior direito)

- **+ Criar** — abre o [formulário de criação de cliente](client-create-edit.md) (artigo separado)

## Fluxos típicos

- **Investigar uma reclamação de pagamento** — pesquise por telefone ou email → abra o detalhe → verifique saldo e histórico de corridas
- **Recarregar carteira a pedido do operador** — encontre o cliente, _Adicionar saldo_ no menu da linha, preencha o valor, confirme
- **Bloquear um fraudador** — pesquise o cliente → _Bloquear / Desbloquear_ → defina como Bloqueado com motivo; o status muda para _Bloqueado_, sem mais corridas
- **Enviar SMS de interrupção** — filtre por etiqueta de zona → _Selecionar tudo_ → _Enviar push_ (ou use Marketing → SMS para transmissões não urgentes)
- **Auditar os detentores de uma etiqueta** — filtre por uma etiqueta, verifique saldo e contagem de corridas para identificar anomalias

## Dicas

- **O status é o guardião silencioso** — clientes em _Registrando_ / _Congelado_ / _Bloqueado_ não podem iniciar corridas; não espere vê-los na lista de Corridas
- **Ícones de canais indicam o que está verificado** — a ausência do ícone de email significa que SMS é seu único canal de saída para esse cliente
- **Avaliação é a nota do passageiro para o cliente** (não da corrida) — notas baixas geralmente indicam problemas de estacionamento ou comportamento rude; confira com comprovantes de estacionamento e bilhetes
- **Saldo ficando vermelho** = carteira negativa. O cliente não pode iniciar novas corridas até recarregar ou receber reembolso
- **Permissões são em camadas** — você pode conseguir _Enviar SMS_ mas não _Adicionar saldo_ para o mesmo cliente; o menu mostra o que você pode fazer
- **A URL é compartilhável** — copie uma visualização filtrada (ex.: _Clientes Bloqueados com corridas > 0_) e envie para um colega
