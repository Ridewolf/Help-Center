# Webhooks Pendentes

A página Webhooks Pendentes (`/payments/pending-webhooks`) lista transações de pagamento que estão presas em **Pendente** porque a confirmação do webhook do provedor de pagamento ainda não chegou.

Cada linha é um pagamento que enviamos a um provedor, mas para o qual não recebemos um retorno final de status. Use esta página como sua **fila de pagamentos presos**: verifique linhas antigas, identifique o provedor que está atrasado e escale.

Permissão necessária: **Pagamentos** (`m1n2p3`).

## O que você está vendo

Quando um cliente paga:

1. O painel envia uma solicitação de pagamento a um **provedor** (Stripe, gateway, etc.) — um _Payment Intent_ é criado
2. O provedor processa a transação assincronamente e envia um **webhook** de volta com o status final (`succeeded`, `failed`, etc.)
3. O painel recebe o webhook e altera o status do [pagamento](payments.md) de _Pendente_ para _Concluído_ / _Falhou_

As linhas em **Webhooks Pendentes** são o passo 2 pendente — o provedor foi contatado, mas nunca respondeu. Na maioria das vezes o webhook chega em segundos, ocasionalmente em minutos. Qualquer coisa com mais de ~30 minutos é suspeita; qualquer coisa com mais de 2 horas está quase certamente com problema no lado do provedor ou no nosso receptor de webhook.

## Filtros

| Filtro          | Tipo   | Notas                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------- |
| **Provedor**    | Texto  | Pesquise pelo nome do provedor (ex.: `stripe`)                                   |
| **Mais antigo que** | Seleção | `Todos` / `5` / `15` / `30` / `60` / `120` minutos — mostra apenas linhas mais antigas que este valor |

Use _Mais antigo que 30 min_ ou _60 min_ como seu filtro diário de monitoramento — pendentes recentes são ruído.

## Colunas

| Coluna               | Ordenável? | Conteúdo                                                              |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| **Criado em**        | ✓          | Quando o payment intent foi criado                                   |
| **Idade**            | ✓          | Minutos desde a criação — codificado por cores (veja abaixo)         |
| **Provedor**         | —          | O provedor de pagamento para o qual o intent foi enviado            |
| **ID do Payment Intent** | —       | O ID do provedor para este intent — copie este ao escalar           |
| **Status**           | —          | Status do lado do provedor (bruto) — geralmente `requires_action` / `processing` |
| **ID do Pedido**     | —          | Nosso ID interno de pedido/pagamento                                 |

### Codificação de cores da Idade

A coluna **Idade** muda de cor conforme envelhece, para que você possa escanear e fazer triagem rapidamente:

| Idade           | Cor    | O que fazer                                    |
| --------------- | ------ | ---------------------------------------------- |
| **< 30 min**    | Cinza  | Normal; ignore                                 |
| **30–120 min**  | Amarelo| Vale a pena olhar; verifique o painel do provedor |
| **> 120 min**   | Vermelho| Quase certamente com problema — escale           |

## Ações na linha

Um pequeno menu de ações à direita de cada linha:

| Ação            | O que faz                                               |
| --------------- | -------------------------------------------------------- |
| **Visualizar cliente** | Abre o perfil do cliente vinculado a este payment intent |

(A ação _Visualizar detalhes do pagamento_ está no código, mas temporariamente desativada porque a página de detalhes do pagamento foi removida — voltará depois.)

## Fluxos típicos

- **Monitoramento diário** — defina _Mais antigo que = 30 min_ → a página deve estar vazia na maior parte do tempo → se não, verifique a coluna do provedor
- **Falha em um único provedor** — veja muitas linhas do mesmo provedor ficarem amarelas/vermelhas simultaneamente → verifique a página de status do provedor → contate o suporte deles com alguns _Payment Intent IDs_ da tabela
- **Problema com um único cliente** — uma ou duas linhas antigas → _Visualizar cliente_ → verifique a [Atividade / Pagamentos](../customers/client-detail.md) do cliente → peça para tentar novamente ou usar outro método
- **Problema no receptor de webhook** — muitos provedores ficam vermelhos ao mesmo tempo sem falha no lado do provedor → o problema está no nosso receptor de webhook, não no provedor; escale para a equipe de engenharia

## Quando uma linha desaparece

Uma linha sai desta página quando o webhook chega — o status do pagamento muda para _Concluído_ ou _Falhou_ na lista principal de [Pagamentos](payments.md). A linha nunca "expira" sozinha; somente um webhook a remove.

Se você tem **pendentes presos com mais de um dia** que não desaparecem, isso é um bug para escalar — o painel do operador não tem botão manual de "forçar conclusão" por razões de segurança (uma conclusão manual incorreta cria uma confusão contábil difícil de desfazer).

## Dicas

- **Copie o ID do Payment Intent** ao escalar para um provedor — é o único ID que eles reconhecem
- **Ordenar por idade** (mais novo primeiro → mais velho primeiro) dá uma fila de triagem: o topo da lista ordenada é seu trabalho urgente
- **Página vazia é o objetivo** — Webhooks Pendentes devem estar vazios (ou quase vazios) durante um dia normal; trate qualquer linha como trabalho a fazer
- **Busca por provedor é flexível** — correspondências parciais funcionam (`stri` corresponde a `stripe`)
- **A página não atualiza automaticamente** — use o botão de atualizar ou recarregue a página ao fazer triagem ativa
