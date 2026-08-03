# Notificações

As notificações exibem eventos ao vivo de todo o Painel — novos bilhetes, alertas de IoT, atividade de pagamento, problemas com veículos, mensagens do sistema. Elas chegam por uma conexão WebSocket, então as atualizações são em tempo real sem recarregar a página.

## Sino na barra superior

O **ícone de sino** na barra superior é seu ponto de entrada. Um distintivo vermelho mostra o número de notificações não lidas.

- Sem distintivo → nada não lido
- Distintivo numérico → essa quantidade não lida
- `99+` → mais de 99 não lidas

Clique no sino para abrir o **painel de Notificações** como uma aba lateral à direita.

## Dentro do painel

### Cabeçalho

- **Título** "Notificações"
- **Contagem de não lidas** mostrada como "N não lidas" ou "Tudo em dia" quando não há nenhuma
- **Atalho para Configurações** (ícone de engrenagem) abre a página global de configurações de notificações

### Alternar notificações do navegador

Se seu navegador suporta notificações do sistema, um botão de alternar aparece abaixo do cabeçalho:

- **Desligado** → notificações aparecem apenas dentro do Painel
- **Ligado** → o navegador exibe uma notificação do sistema quando algo novo chega, mesmo com a aba em segundo plano
- Na primeira vez que ativar, o navegador pede permissão

Se você negou a permissão antes, o botão de alternar fica desabilitado e um aviso amarelo aparece com instruções para reativá-lo nas configurações do site do navegador.

### Lista

As notificações são listadas da mais nova para a mais antiga. Cada item mostra:

- **Ícone da categoria** — um pequeno ícone colorido pela cor da prioridade (veja abaixo)
- **Título** — uma manchete curta
- **Corpo** — a descrição do evento
- **Tempo decorrido** — ex.: "há 2 min"
- **Clique** no item para ir à página relacionada (bilhete, veículo, pagamento, etc.)

### Estado vazio

Quando não há nada para mostrar, o painel exibe uma mensagem amigável e um botão para abrir a página de configurações.

## Categorias e prioridade

Cada notificação tem uma **categoria** (define o ícone) e uma **prioridade** (define a cor).

### Categorias

| Categoria    | Ícone           | Eventos típicos                              |
| ----------- | -------------- | ------------------------------------------- |
| Suporte     | 🔔 Sino        | Novos bilhetes, respostas a bilhetes        |
| Manutenção | 🔧 Chave inglesa | Tarefas de serviço atribuídas, gatilhos de automação |
| Veículo     | ✨ Brilhos      | Mudanças de status, anomalias                |
| Cliente      | 👥 Usuários     | Novos cadastros, sinalizações de conta       |
| Pagamento   | 💳 Cartão      | Transações, reembolsos, eventos de webhook  |
| IoT         | 🖥️ Cpu         | Dispositivo offline, bateria baixa, alertas de sensor |
| Sistema     | 🛎️ Campainha   | Mensagens do sistema, implantações           |
| Segurança   | 🛡️ EscudoAlerta | Eventos de autenticação, atividade suspeita  |

### Cores de prioridade

| Prioridade | Cor    | Uso                                               |
| -------- | ------ | ------------------------------------------------- |
| Crítico  | Vermelho | Requer ação imediata (falha de veículo, alerta de segurança) |
| Alto     | Laranja | Importante, mas não bloqueante                    |
| Médio    | Âmbar   | Atenção rotineira                                 |
| Baixo    | Azul    | Informativo                                       |

## Configurações (configuração avançada)

O painel do sino cobre o básico. Para configuração completa, abra **Configurações → Alertas e Notificações** (ou clique na engrenagem no cabeçalho do painel):

- **Sons** — escolha um som por prioridade, ou desligue os sons
- **Provedores** — encaminhe notificações para canais externos (Telegram, etc.) configurados por chat/destinatário
- **Filtragem** — quais categorias você quer receber
- **Agendas de silêncio** — horários silenciosos (onde suportado)

## Como funciona a permissão

Notificações do navegador precisam de uma permissão única concedida pelo navegador. O botão de alternar no painel dispara o prompt do navegador na primeira vez que você ativa.

- **Concedida** → o botão funciona; você recebe notificações do sistema enquanto o Painel estiver aberto em qualquer aba
- **Negada** → o botão fica travado desligado; você precisa alterar a permissão nas configurações do site do navegador, depois voltar e ativar
- **Não suportado** → alguns navegadores embutidos e versões antigas não exibem notificações do sistema; o botão fica oculto

Conceder permissão ao navegador não altera nada dentro do Painel — o painel interno funciona independentemente.

## Dicas

- **Use notificações do navegador em uma única aba** — abrir o Painel em várias abas pode multiplicar as notificações do sistema
- **Sons são locais** — eles tocam apenas na aba onde você está conectado; silencie-os em computadores compartilhados
- **Clique direto é o fluxo mais rápido** — clicar numa notificação leva você direto à página que a gerou; mais rápido que navegar manualmente
- **Painel desconectado** — se a conexão WebSocket cair, o ponto pequeno de status no avatar fica vermelho. As notificações retomam assim que a conexão volta; você não perde nada nesse meio tempo
- **Crítico primeiro** — quando muitas chegam ao mesmo tempo, escaneie as cores antes dos títulos: ícones vermelhos vão para o topo da sua fila
