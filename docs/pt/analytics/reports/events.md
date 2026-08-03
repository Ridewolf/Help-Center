# Análises — Eventos Recentes

A página de análises de Eventos (`/analytics/events`) é seu **painel de incidentes**: todo evento notável do sistema, veículo, usuário e zona em um período escolhido, com contadores de KPI, padrões ao longo do tempo e um feed pesquisável na parte inferior.

Diferente do [Painel de Notificações](../../features/ux/notifications.md) (em tempo real, por evento) — esta página é **agregada e histórica**, útil para identificar tendências e fazer revisões pós-incidente.

Permissão necessária: **Visualizar Eventos Recentes** (`s1t2u3`).

## Intervalo de tempo e filtros

Uma **barra de intervalo de datas** fica no topo — todas as métricas e gráficos respeitam esse intervalo. Quatro filtros extras restringem a visualização:

| Filtro          | Opções                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Gravidade**   | `critical` / `warning` / `info` (seleção múltipla)                     |
| **Tipo**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Tipo de fonte** | `vehicle` / `user` / `zone` / `system`                                |
| **Status**      | `open` / `resolved` / `dismissed`                                       |

Todos os filtros combinam com E (AND). A URL reflete todas as configurações — compartilhe um link e seu colega verá exatamente a mesma fatia.

## Seções

A página tem **cinco seções**:

### 1. Resumo

Quatro cartões métricos resumem as contagens de eventos:

| KPI          | O que mostra                                               |
| ------------ | ----------------------------------------------------------- |
| **Total**    | Total de eventos no intervalo                               |
| **Crítico**  | Contagem com `severity = critical` — o número que deve ser observado  |
| **Aviso**    | Contagem com `severity = warning`                           |
| **Info**     | Contagem com `severity = info` — geralmente ruído, a menos que haja um pico |

Cada cartão exibe um distintivo de comparação "vs período anterior".

### 2. Por Tipo

Um gráfico que detalha os eventos por **tipo**:

- **Erro** — falhas do sistema / integração
- **Offline** — dispositivos IoT ficando offline
- **Bateria** — alarmes de bateria baixa / descarregada / anomalia
- **Pagamento** — recusas, problemas no gateway
- **Suporte** — picos em tickets / chats
- **Manutenção** — eventos relacionados a serviço

Picos em um único tipo geralmente são seu ponto de partida para uma investigação.

### 3. Padrões

Dois gráficos de séries temporais:

- **Por Dia** — eventos por dia no intervalo (visualiza ciclos semanais)
- **Por Hora** — eventos por hora do dia no intervalo todo (visualiza picos diários)

### 4. Principais Fontes

Uma lista das **principais fontes** geradoras de eventos — geralmente veículos individuais ou zonas com muitos eventos desproporcionais.

Cada entrada inclui a fonte (com link para sua página de detalhes), a contagem de eventos e a gravidade / tipo dominante.

Aqui você encontra o **veículo que tem disparado alarmes a semana toda** ou a **zona com problemas de bateria**.

### 5. Feed

Um feed rolável de eventos individuais que correspondem aos filtros atuais. Cada linha mostra:

- Ícone de gravidade (colorido)
- Tipo de evento + etiqueta da fonte
- Descrição curta
- Carimbo de data/hora
- Indicador de status

Clique em um item do feed para navegar até a entidade relacionada (veículo, cliente, corrida, bilhete) quando aplicável.

## Fluxos de trabalho típicos

- **Revisão matinal diária** — predefinição _Últimas 24h_ → Gravidade = Crítico → escanear; tudo em vermelho recebe atenção antes de abrir o restante do painel
- **Triagem das principais fontes** — seção Principais Fontes → clique em um veículo que continua aparecendo → corrigir ou escalar na fonte
- **Detecção de padrões** — gráficos de padrões; um dia ou hora incomum indica que algo mudou (implantação, clima, queda)
- **Revisão pós-incidente** — escolha o dia → gravidade = crítico → cruze o Feed com a aba Alertas do [Veículo](../../operations/fleet/vehicle-detail.md) ou a seção Qualidade das [análises de Pagamentos](payments.md) dependendo do tipo
- **Passagem de limpeza** — Status = Aberto → resolver em massa itens obsoletos (você faz isso nas páginas da fonte, não aqui, mas os encontra aqui)

## Dicas

- **Crítico primeiro** — comece com `severity = critical`; avisos e info geralmente se resolvem sozinhos
- **Tipo é seu detetive** — uma vez que tenha um pico, filtre pelo tipo dominante para reduzir o ruído
- **Principais fontes são ouro** — um veículo no topo da lista de fontes normalmente explica 30-50% de todos os eventos
- **Agregações vs dados brutos** — esta página agrega; para as transações / alertas reais vá para a página do domínio da fonte
- **Filtros fixos** — suas configurações sobrevivem à navegação; limpe-os ao passar a URL para outra pessoa
- **Status `open` ≠ alarme IoT não resolvido** — Status aqui é o status do _registro do evento_; o alarme subjacente pode ter sido limpo no dispositivo enquanto o evento ainda está aberto no sistema
