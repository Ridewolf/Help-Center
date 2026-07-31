# Início do Painel

A página inicial (`/dashboard`) é sua visão geral diária. Ela mostra as principais métricas da frota para um dia escolhido, como elas se comparam à média móvel de 30 dias e a distribuição horária da atividade. Abra-a para obter o pulso das operações em uma única tela.

## Cabeçalho

No topo:

- **Saudação** — "Olá, _{seu nome}_! Bem-vindo ao painel da _{sua empresa}_!"
- **Legenda** — "Visão geral do desempenho da sua empresa"
- **Seletor de data** — mostra a qual dia pertencem as métricas

## Seletor de data

Por padrão, a página carrega os dados de **hoje**. O seletor de data permite navegar pelo histórico.

- **Hoje** — botão que retorna para o dia atual
- **Dia anterior** (‹) / **Próximo dia** (›) — avança ou retrocede um dia por vez
- **Ícone de calendário** — abre um popover para escolher uma data específica

A data selecionada é fixa para a sessão atual — mudar para outra página e voltar mantém sua seleção.

## Cartões de estatísticas (KPIs)

Oito cartões métricos dispostos em duas linhas. Cada cartão mostra:

- **Título** — o que está sendo medido (ex.: _Corridas_)
- **Valor** — o número para o dia selecionado
- **Descrição** — uma breve explicação ("Corridas concluídas", "Distância total", etc.)
- **Comparação** — variação em relação à média móvel de 30 dias, com seta para cima/baixo
- **Tooltip** — passe o mouse sobre o título para a definição completa

### Os oito cartões

| Cartão               | O que mostra                                   |
| -------------------- | ---------------------------------------------- |
| **Corridas**         | Número de corridas concluídas no dia selecionado |
| **Distância**        | Total de quilômetros percorridos em todas as corridas |
| **Duração**          | Tempo total de corrida em toda a frota         |
| **Receita**          | Receita total das corridas no dia selecionado  |
| **Recargas**         | Soma das recargas de carteira feitas pelos clientes nesse dia |
| **Preço médio**      | Preço médio por corrida                         |
| **Preço médio / km** | Preço médio por quilômetro                      |
| **Preço médio / min**| Preço médio por minuto                          |

A comparação é lida como "**vs média de 30 dias**":

- ↑ Verde — acima da média dos últimos 30 dias
- ↓ Vermelho — abaixo da média
- (sem seta) — muito próximo da média para indicar

## Cartão do tempo

Um widget de clima fica na grade dos cartões de estatísticas mostrando as condições na sua área de operação:

- **Temperatura atual** e condição (Claro, Nublado, Chuva, etc.)
- **Vento** e **precipitação**
- **Previsão de 3 dias** — os próximos dois dias mais amanhã
- Fonte da localização — _pelo GPS_ ou _pelo IP_ (o que estiver disponível)

Útil para prever demanda: chuva e vento frequentemente se correlacionam com o volume de corridas.

## Gráficos horários

Abaixo dos cartões de estatísticas, quatro gráficos de área mostram como a atividade se distribuiu pelas 24 horas do dia selecionado, agrupados em duas seções:

### Atividade

- **Corridas por hora** — número de corridas iniciadas em cada hora
- **Distância por hora** — total de quilômetros por hora
- **Duração por hora** — total de minutos de corrida por hora

### Receita

- **Receita por hora** — moeda ganha por hora

Cada gráfico mostra a curva do dia; passe o mouse sobre um ponto para ver o valor exato daquela hora.

## Carregamento e erros

- **Carregando** — os cartões de estatísticas mostram um estado esqueleto enquanto o endpoint de análises responde
- **Erro** — um pequeno banner aparece no topo com a mensagem "Falha ao carregar análises"; o restante da página permanece utilizável

## Permissões

A página inicial é protegida pela permissão **Visualizar Análises do Painel** (`q4r5t6`). Sem ela, você será redirecionado para outra página inicial ao entrar.

Se você tem acesso ao painel mas a página está vazia:

- Verifique a data selecionada — dias vazios são válidos (sem corridas)
- Verifique a rede — veja o banner "Falha ao carregar análises"
- Caso contrário, contate um administrador

## Dicas

- **Compare dias rapidamente** — use `‹` e `›` para navegar pelos dias recentes e observe como os KPIs mudam
- **Passe o mouse nos tooltips dos títulos das estatísticas** — cada cartão tem uma definição precisa; confie nela em vez de adivinhar o que "Preço médio / km" exclui
- **Use primeiro o selo de comparação** — a seta colorida indica de relance se o dia foi acima ou abaixo do normal, antes de ler o número absoluto
- **Gráficos horários revelam padrões** — picos de deslocamento matutino vs. vespertino, curvas de fim de semana, efeitos do clima; eles dizem mais que os totais
