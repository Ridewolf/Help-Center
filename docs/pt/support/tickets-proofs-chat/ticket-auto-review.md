# Revisão Automática de Bilhetes

A página de Revisão Automática de Bilhetes (`/support/tickets/auto-review`) é uma **interface de fila simplificada** para trabalhar com bilhetes pendentes um após o outro, sem voltar para a lista entre as decisões.

Assim como em [Park Proof Auto Review](park-proof-auto-review.md), "Automático" aqui significa **avanço automático**: após cada ação, a página carrega o próximo bilhete pendente para que você possa continuar moderando sem interromper o fluxo.

Acesse-a pelo botão **Revisão Automática** na [lista de Bilhetes](tickets.md).

Permissão necessária: **Bilhetes** (`a8b9c1`).

## Como funciona

1. A página carrega a **fila atual de bilhetes pendentes** ao ser aberta
2. Você vê o primeiro bilhete — foto da evidência, informações do bilhete e os botões de ação
3. Escolha uma ação (Resolver / Em Andamento / Aguardando Info / Ignorar / Duplicado) ou Pular
4. A página **avança automaticamente** para o próximo bilhete pendente
5. Repita até a fila ficar vazia
6. Quando vazia, a página muda para um **estado de espera** com uma contagem regressiva que verifica novos bilhetes

Sua posição é a própria fila pendente — fechar a aba e reabrir não perde o progresso, você apenas retoma no próximo bilhete pendente quando ele carregar.

## Layout

Três colunas em telas largas, empilhadas em telas estreitas:

| Coluna      | Largura | Conteúdo                                                               |
| ----------- | ------- | --------------------------------------------------------------------- |
| **Imagem**  | 5/12    | Foto da evidência com zoom + carimbo de data/hora                     |
| **Ações**   | 4/12    | Cinco botões para mudar status + Pular + Comentário                   |
| **Info**    | 3/12    | Cartão de informações do bilhete com status, tipo de reclamação, veículo, relator, datas |

Uma barra de progresso no topo mostra o quanto você avançou.

## Cabeçalho

- **Título** "Revisão Automática de Bilhetes"
- **Legenda** com progresso: `Revisando X de Y · T-12345`
- Botão **Pular** (canto superior direito) — passa o bilhete atual sem tomar decisão (bilhete permanece _Pendente_)
- **Seta de voltar** — retorna para a [lista de Bilhetes](tickets.md)

## Botões de ação

Cinco transições de status, mais Pular e um Comentário opcional:

| Botão           | Novo status     | Use quando                                                                 |
| ---------------- | -------------- | -------------------------------------------------------------------------- |
| **Resolver**     | _Resolvido_    | O problema foi resolvido (ou não era real) — fecha o bilhete              |
| **Em Andamento** | _Em andamento_ | O problema é real, você iniciou uma correção (tarefa de manutenção, acompanhamento) |
| **Aguardando Info** | _Aguardando info_ | Você precisa de mais informações do usuário antes de decidir — o usuário recebe uma notificação |
| **Ignorar**      | _Ignorado_     | Não é um problema real (relato de baixa qualidade, alvo errado, spam)     |
| **Duplicado**    | _Duplicado_    | Já existe outro bilhete para o mesmo veículo / problema                   |
| **Pular**        | (sem alteração) | Não decidir; passar para o próximo bilhete                                |
| **Comentário**   | (qualquer ação) | Nota opcional anexada à ação que você clicar                              |

Cada clique é confirmado imediatamente e avança para o próximo bilhete. Digite o **comentário primeiro** se quiser que ele seja anexado.

### Quando usar cada status de fechamento

- **Resolver** — o problema foi consertado (ou o relato foi um mal-entendido esclarecido ao verificar o veículo)
- **Ignorar** — o relato foi ruim / falso / fora do alvo; o usuário vê o status ignorado no app
- **Duplicado** — vincula ao original; o backend gerencia a cadeia para que a resolução de um feche todos

_Resolver_, _Ignorar_ e _Duplicado_ fecham o bilhete. _Em Andamento_ e _Aguardando Info_ mantêm o bilhete aberto em categorias diferentes.

## Coluna de informações

Um cartão **Informações do Bilhete** à direita mostra os dados estruturados por trás da foto:

- **Status** — pílula do status atual
- **Tipo de reclamação** — pílula colorida (dano mecânico, elétrico, bateria, etc.)
- **Veículo** — etiqueta e link
- **Relator** — nome (usuário) ou etiqueta (sistema / operador)
- **Localização** — endereço / coordenadas
- **Criado / atualizado** — carimbos de data/hora
- **SLA** — tempo restante (ou selo "atrasado")

Leia este cartão antes de decidir — ele conta toda a história sem sair da página.

## Estado de espera

Quando a fila esvazia, a página mostra a mesma tela de espera usada para Comprovantes de Estacionamento:

- Mensagem "Todos os bilhetes revisados"
- Um **temporizador de contagem regressiva** até a próxima verificação automática
- Botão **Verificar agora** para consultar imediatamente
- Botão **Sair** para voltar à lista

Se um novo bilhete chegar durante a espera, a página o carrega automaticamente.

## Quando usar Revisão Automática vs a lista

| Use a lista quando…                                           | Use Revisão Automática quando…                      |
| ------------------------------------------------------------ | -------------------------------------------------- |
| Você precisa filtrar por status, tipo de reclamação ou veículo | Você está processando a fila pendente sem filtro   |
| Você está investigando um veículo específico ou histórico do usuário | Você está focado em um bilhete por vez, em tela cheia |
| Você está auditando decisões passadas (Resolvido / Ignorado / etc.) | Você quer velocidade: ler → decidir → próximo      |
| Você precisa escalar para a equipe de manutenção             | Você está em modo de turno, trabalhando a fila de ponta a ponta |

## Fluxos de trabalho típicos

- **Início do turno** — abra Revisão Automática → trabalhe em cada bilhete pendente → termine na tela de espera
- **Triagem rápida** — leia a foto + tipo de reclamação + relator → se óbvio, _Resolver_ / _Ignorar_ com um comentário de uma linha; se não, _Em Trabalho_ e marque a equipe de manutenção no comentário
- **Aguardando usuário** — quando o relatório não está claro, _Aguardando Informações_ com uma pergunta no comentário; o usuário é notificado
- **Duplicar** — quando a busca revela um bilhete do mesmo veículo já aberto, _Duplicado_ para vincular a cadeia
- **Caso ambíguo** — _Pular_ e abrir da lista com contexto completo (histórico do veículo, corridas relacionadas, alertas IoT)

## Dicas

- **Digite o comentário primeiro** — mesma regra dos Comprovantes de Estacionamento: a ação é confirmada antes que comentários tardios sejam salvos
- **Pular ≠ decisão** — pular não fecha nada; o bilhete permanece na fila para o próximo operador
- **Resolver vs Ignorar não é o mesmo** — _Resolver_ significa "resolvemos o problema"; _Ignorar_ significa "isso não era um problema real"; o usuário vê a diferença no app
- **Tratamento de duplicados** — pesquise a lista pelo rótulo do veículo primeiro; se encontrar um bilhete principal, clique em Duplicado, caso contrário resolva o mais informativo e marque os demais como Duplicados
- **O temporizador SLA continua contando** durante a espera — se a fila estiver vazia mas a lista ainda tiver linhas atrasadas, essas linhas são filtradas da Revisão Automática (talvez por permissões, talvez por status); volte para a lista para vê-las
- **A Revisão Automática respeita a ordem dos bilhetes do backend** — os mais novos pendentes variam por implantação; trate a ordem da fila como autoritária
