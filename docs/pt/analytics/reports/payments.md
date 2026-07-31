# Análises — Pagamentos

A página de análises de Pagamentos (`/analytics/payments`) é o seu **painel financeiro**: KPIs e gráficos sobre dinheiro entrando (recargas), dinheiro saindo (reembolsos), dinheiro sendo cobrado (débitos) e a saúde do seu sistema de pagamento.

Diferente do [Histórico de Pagamentos](../../operations/payments/payments.md), que é um registro por transação — esta página é **agregada** por um intervalo de datas para que você possa identificar tendências, vazamentos e anomalias.

Permissão necessária: **Visualizar Análises de Pagamentos** (`w7x8y9`).

## Intervalo de tempo

Uma **barra de intervalo de datas** fica no topo da página. Cada métrica e gráfico respeita esse intervalo:

- Escolha um pré-ajuste (Hoje, Últimos 7 / 30 / 90 dias, Este / Último mês) ou um intervalo personalizado
- O selo de comparação abaixo dos cartões de métrica lê "vs período anterior" — quando você escolhe _Últimos 7 dias_, a comparação é com os 7 dias anteriores a esse
- O intervalo é fixo para a sessão: navegue para outra página e volte, seu intervalo será preservado

## Seções

A página está organizada em **seis seções**, cada uma focada em um ângulo diferente dos pagamentos:

### 1. Fluxo

A visão geral — dinheiro entrando vs dinheiro saindo.

| KPI            | O que mede                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Recargas**   | Dinheiro creditado nas carteiras neste intervalo (manual + provedor)                                                     |
| **Reembolsos** | Dinheiro devolvido aos clientes; exibe um selo de _Taxa de reembolso_ (reembolsos / débitos)                              |
| **Débitos**    | Dinheiro cobrado dos clientes (corridas, multas). Inclui um **filtro de etiqueta** para você filtrar por uma etiqueta específica do cliente (ex.: _VIP_) |
| **Entrada líquida** | Recargas − Reembolsos; positivo = seu saldo em carteira está crescendo                                                |

### 2. Qualidade

Quão saudável é a integração com seu provedor de pagamento.

| KPI                 | O que mede                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Taxa de sucesso** | Transações concluídas / todas as tentadas — seu número principal de confiabilidade                                        |
| **Falhas**          | Contagem de transações falhadas no intervalo                                                                             |
| **Pendente**        | Contagem de transações ainda pendentes (cruzar com [Webhooks Pendentes](../../operations/payments/pending-webhooks.md))  |
| **Reembolsado**     | Contagem de débitos que foram reembolsados                                                                               |
| **Razões de falha** | Gráfico detalhando falhas por motivo (recusa / 3DS / rede / etc.)                                                       |

Um pico em _Falhas_ + um motivo específico dominando o gráfico = uma queda ou problema de integração para escalar.

### 3. Saldo

O estado dos fundos mantidos pelo operador (carteiras dos riders) no final do intervalo.

| KPI               | O que mostra                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Saldo**         | Soma de todos os saldos positivos — dinheiro que você está efetivamente segurando para os riders  |
| **Dívida**        | Soma de todos os saldos negativos — dinheiro que os riders devem a você                             |
| **Saldo médio**   | Saldo médio por cliente ativo                                                                       |
| **Usuários**      | Contagem de clientes com saldo diferente de zero                                                   |
| **Gráfico de faixas** | Histograma de clientes por tamanho de saldo (ex.: 0–10 / 10–50 / 50–100 / 100+)                   |

Use _Dívida_ como seu sinal de atraso de cobrança — dívida alta indica muitas multas ou débitos falhados que precisam de acompanhamento.

### 4. Padrões

Padrões comportamentais das recargas dos riders — útil para marketing / produto.

- **Histograma do tamanho da recarga** — como os riders distribuem suas recargas por valores. O modo do histograma (tamanho mais comum) é o que seus prompts devem usar como padrão
- **Recargas por hora** — quando no dia os riders recarregam. Picos geralmente coincidem com picos de corrida (deslocamento, noites de fim de semana)

### 5. Métodos

Uma tabela detalhada por **método / provedor de pagamento**.

- Colunas: Método (cartão / saldo / carteira / etc.), Valor total, Contagem, Transação média, Taxa de sucesso
- Útil para identificar provedores com desempenho inferior (um método com baixa taxa de sucesso é seu elo fraco)

### 6. Usuários

Visão de coorte de clientes — quem está pagando você.

| KPI               | O que mede                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Pagadores únicos** | Clientes distintos que pagaram no intervalo                                                   |
| **Pagadores novos**  | Clientes que pagaram pela primeira vez neste intervalo                                        |
| **Pagadores recorrentes** | Clientes que pagaram mais de uma vez neste intervalo                                      |
| **Principais pagadores** | Tabela dos clientes que mais pagaram com nome, valor, contagem de corridas, link para perfil |

## Fluxos típicos

- **Revisão semanal** — predefinição _Últimos 7 dias_ → percorra cada seção uma vez. Qualquer coisa fora da faixa de comparação (grande ▲ ou ▼) merece uma análise mais profunda
- **Análise pós-falha** — defina o intervalo de datas para o dia do incidente → seção Qualidade → gráfico de Motivos de falha → cruze com o [Histórico de Pagamentos](../../operations/payments/payments.md) para as transações reais
- **Análise detalhada de etiqueta** — cartão Débitos → filtro de Etiqueta → escolha uma etiqueta como _VIP_ → a métrica Débitos mostra apenas esse grupo; compare com o número total de débitos para uma rápida participação
- **Impulso de cobranças** — seção Saldo → _Dívida_ → se aumentou, investigue clientes individuais via a lista de Clientes filtrada por saldo negativo
- **Precificação de marketing** — Padrões → histograma de tamanho de recarga → defina sua recarga sugerida no app para o intervalo mais popular

## Dicas

- **A faixa de comparação é mais útil que o número absoluto** — o valor absoluto da receita depende do tamanho da empresa; a variação percentual indica se as coisas estão melhorando
- **Intervalo de datas fixo** — o último intervalo selecionado persiste na navegação; se um colega compartilhar uma URL com intervalo diferente, este prevalece
- **O filtro de etiqueta é aplicado apenas a Débitos** — para ver recargas por etiqueta, é preciso cruzar com a lista de Clientes
- **O gráfico de motivos de falha é seu placar de provedores** — o surgimento repentino de uma nova categoria geralmente indica mudança na configuração do provedor
- **Entrada líquida positiva ≠ lucro** — isso é saldo em carteira, não receita; não considera reembolsos que você possa emitir depois ou saldos não liquidados
- **Saldo médio × Usuários ≠ Saldo em carteira** — o saldo em carteira é a soma dos positivos; se muitos usuários estiverem em dívida, a média pode ser menor que Saldo em carteira / Usuários
