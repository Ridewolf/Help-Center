# Pagamentos — Histórico

A página de Pagamentos (`/payments`) é o registro de todas as transações monetárias que afetaram a conta de um cliente: cobranças de corrida, recargas de carteira, reembolsos, multas. Use-a para investigar uma cobrança, emitir um reembolso ou auditar o fluxo de dinheiro em um intervalo de datas.

Para eventos de webhook não processados de provedores de pagamento, veja [Pending Webhooks](pending-webhooks.md).

Permissão necessária: **Pagamentos** (`m1n2p3`). Algumas ações nas linhas requerem subpermissões adicionais.

## O que está aqui

Cada linha representa uma única transação de pagamento:

| Tipo       | O que é                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| **Recarga**| Dinheiro adicionado à carteira do cliente (crédito manual do operador ou recarga por cartão) |
| **Débito** | Dinheiro retirado do cliente (cobrança de corrida ou multa)             |
| **Reembolso** | Dinheiro devolvido ao cliente (estorno de um débito anterior)         |

Cada transação tem um **método/provedor** — o canal pelo qual foi processada:

- **Provedores de cartão** (Stripe, etc.) — dinheiro real em um cartão de pagamento
- **Saldo** — carteira interna (não é um provedor de pagamento; apenas um débito/crédito contra o saldo do cliente)
- **Outros gateways** dependendo das suas integrações

A distinção entre _provedor de cartão_ e _saldo_ é importante para reembolsos — veja _Ações na linha → Reembolso_ abaixo.

## Filtros

| Filtro     | Tipo     | Notas                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| Pesquisa   | Texto    | Pesquisa por nome do cliente, ID do pagamento, ID da corrida / multa relacionada |
| Intervalo de datas | Calendário | Seletor de início/fim; padrão é "todo o período"          |
| Tipo       | Dropdown | `Recarga` / `Débito` / `Reembolso` (ou `Todos`)            |
| Status     | Dropdown | `Pendente` / `Concluído` / `Falhou` / `Reembolsado` (ou `Todos`) |

Os filtros são aplicados no servidor e combinam com AND.

## Colunas

| Coluna     | Ordenável? | Conteúdo                                                            |
| ---------- | ---------- | ------------------------------------------------------------------ |
| **Data**   | ✓          | Quando a transação foi criada; ordenação padrão = mais recente primeiro |
| **Cliente**| —          | Nome e avatar do cliente; link para o detalhe do cliente          |
| **Origem** | —          | Tipo de transação (Recarga / Débito / Reembolso), com etiqueta colorida |
| **Valor**  | ✓          | Quantia em dinheiro na moeda da empresa, com sinal (+/−) e cor     |
| **Método** | —          | Método/provedor de pagamento (cartão, saldo, nome do gateway)     |
| **Status** | ✓          | Indicador de status (veja referência abaixo)                      |

Ordene clicando no cabeçalho ordenável. A ordenação escolhida faz parte da URL.

## Referência de status

| Status        | Significado                                                                |
| ------------- | -------------------------------------------------------------------------- |
| **Pendente**  | Enviado ao provedor; aguardando confirmação via webhook                    |
| **Concluído** | Provedor confirmou sucesso; dinheiro transferido                           |
| **Falhou**    | Provedor rejeitou a transação (recusa do cartão, erro de rede, verificação antifraude) |
| **Reembolsado** | Um débito bem-sucedido que foi posteriormente estornado por um reembolso  |

## Ações na linha

Cada linha tem um **menu de três pontos** à direita. As ações disponíveis dependem do tipo de pagamento, status e suas permissões:

| Ação            | Quando habilitada                      | Permissão                                               |
| --------------- | ------------------------------------ | ------------------------------------------------------- |
| **Visualizar cliente** | Sempre (vai para o perfil do cliente) | —                                                       |
| **Reembolsar**  | Veja "Roteamento de reembolso" abaixo | `refund` / `topup-manual` / `fine` (dependendo da rota) |

### Roteamento de reembolso

O painel oculta os detalhes do provedor, mas a ação _Reembolsar_ é inteligente o suficiente para escolher o caminho correto:

- **Débito baseado em provedor** (cartão, gateway) → chama o endpoint de reembolso do provedor → dinheiro volta para o cartão
- **Débito de saldo** (carteira) → sem provedor envolvido — abre o diálogo **Recarregar saldo** para creditar a carteira (requer `topup-manual`)
- **Recarga de saldo** (crédito manual do operador) → não pode ser revertida via provedor — abre o diálogo **Emitir multa** para debitar o mesmo valor (requer `fine`)

Reembolso está **desabilitado** quando:

- A linha é ela mesma um reembolso (reembolsar um reembolso não faz sentido)
- O status não é _Concluído_ (não é possível reembolsar transações pendentes / falhadas)
- A transação já foi revertida (o painel rastreia isso e bloqueia cliques duplicados)
- Você não tem a subpermissão correta para o caminho de roteamento

## Por que os pagamentos aparecem aqui (e o que os cria)

Pagamentos **não** são criados nesta página — eles se originam de outros fluxos:

1. **O Rider faz uma corrida** → fim da corrida → backend cria uma transação _Débito_ → se for bem-sucedida, o status muda para _Concluído_ e o dinheiro é retirado da carteira ou cartão
2. **O Rider recarrega a carteira no app** → chamada ao provedor → backend cria uma transação _Recarga_ → status muda para _Concluído_ na confirmação do webhook
3. **O operador credita uma carteira** via _Recarregar saldo_ em um cliente → backend cria uma _Recarga_ com método _saldo_ e imediatamente _Concluído_
4. **O operador emite uma multa** → backend cria um _Débito_ com método _saldo_, imediatamente _Concluído_
5. **Reembolso** a partir desta lista → backend cria uma transação _Reembolso_; a original é marcada como _Reembolsado_

A transação original nunca desaparece — toda ação é auditável.

## Fluxos de trabalho típicos

- **Investigar uma cobrança** — pesquise por ID do cliente / corrida / pagamento → verifique o Status (Concluído = dinheiro recebido, Falhou = sem dinheiro) e o Método
- **Reembolsar uma corrida** — encontre a linha de _Débito_ para a corrida → menu da linha → _Reembolsar_ → confirme → uma linha _Reembolso_ pareada aparece, a original muda para _Reembolsado_
- **Auditar o dia** — defina o intervalo de Data = hoje → filtre Status = Concluído → confira os totais
- **Encontrar falhas para tentar novamente** — filtre Status = Falhou → contate os clientes para tentar novamente / método alternativo
- **Conciliar com o provedor** — intervalo de Data + Tipo = Recarga/Débito + Método = provedor do cartão → exporte e confira com o extrato do provedor

## Dicas

- **Pendente não é falha** — transações pendentes aguardam o webhook do provedor; verifique [Webhooks Pendentes](pending-webhooks.md) se uma linha ficar Pendente por muito tempo
- **Transações de saldo não podem ser reembolsadas por cartão** — o sistema direciona para o diálogo correto; não tente criar transações compensatórias manualmente
- **O original permanece após o reembolso** — reembolsos adicionam uma linha pareada, não excluem o débito; ambas as linhas ficam no histórico para auditoria
- **O sinal do valor indica a direção** — `+` (verde) é dinheiro para o cliente; `−` (vermelho/escuro) é dinheiro do cliente
- **Nomes dos provedores são importantes para suporte** — ao escalar para seu provedor de pagamento, copie o ID do pagamento e o nome do provedor da coluna Método
- **A URL pode ser compartilhada** — copie uma visualização filtrada (ex.: _débito de cartão falhado de ontem_) e envie para finanças ou fraude
