# Alertas e Notificações

A página Alertas e Notificações (`/settings/alerts-notifications`) é o **console de alertas do operador** — como a plataforma informa a _equipe_ que algo precisa de atenção. Ela cobre os canais (push / in-app / email / SMS), os provedores externos (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), as regras que disparam alertas, os modelos de mensagem, as políticas de escalonamento, quem está inscrito e o registro de entrega.

Esta página trata de **alertas para a equipe que gerencia a plataforma**. Para o texto das notificações voltadas ao usuário (Corrida iniciada, Penalidade aplicada, etc.), veja a aba _Notifications_ em [General](general.md).

> _Nota_: esta página é atualmente um **protótipo apenas de front-end** — as configurações de canais, regras, inscrições e o registro de entrega são mantidos no estado local (ou inicializados a partir de `mockData.ts`). _Salvar alterações_ exibe uma notificação de confirmação, mas ainda não acessa nenhum endpoint do backend. A estrutura da página corresponde ao modelo real e é segura para uso como especificação para o trabalho da API.

Permissão necessária: nenhum `requiredPermissions` específico está definido na rota — qualquer operador autenticado pode acessá-la.

## Barra de ferramentas superior

O cabeçalho da página tem quatro botões:

| Ação         | O que faz                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Atualização automática | O widget compartilhado `AutoRefresh` — sem efeito aqui, presente para paridade com outras páginas                                  |
| Testar tudo  | Exibe uma notificação _"Testando tudo"_ — espaço reservado para "enviar um teste para todos os canais habilitados"         |
| Silenciar 1h | Notificação _"Silenciado por 1h"_ — espaço reservado para um silenciamento global de 1 hora                                |
| Manutenção  | Botão vermelho destrutivo — abre um AlertDialog pedindo confirmação; ao confirmar, exibe uma notificação que a manutenção está habilitada |

## Abas

Sete abas no topo. Cada uma é um subcomponente separado.

| Aba           | Propósito                                                                          |
| ------------- | ---------------------------------------------------------------------------------- |
| Canais        | Canais embutidos (push / in-app / email / SMS) + roteamento por severidade + resumos |
| Provedores    | Credenciais de provedores externos (Email / SMS / Telegram / Slack / Discord / Webhook) |
| Regras        | Regras de alerta por família de eventos                                           |
| Modelos       | Texto das notificações por família de evento × idioma                             |
| Políticas     | Cadeia de escalonamento, silenciamento automático, segurança do público, ocultação de PII |
| Inscrições    | Quem (função ou usuário) recebe quais famílias de eventos em quais canais         |
| Registros     | Registro de entrega somente leitura (entradas enviadas / confirmadas / falhadas)  |

### Canais

Três cartões empilhados.

**Canais embutidos**

- _Push_ — configuração completa (interruptor habilitar, limite de taxa, tentativas, horário silencioso de/para, botão de teste).
- _In-app_ — habilitado, limite de taxa, segundos para auto-descartar.
- _Email_ — condicionado pelo provedor de Email na aba Provedores. Habilitado, limite de taxa, tentativas.
- _SMS_ — condicionado pelo provedor de SMS. Habilitado, limite de taxa, tentativas, horário silencioso.

**Mapeamento de severidade** — três menus suspensos mapeando `info` → `inApp` (padrão), `warning` → `push`, `critical` → `push+email`. Estes são os canais usados quando uma regra tem essa severidade mas não especifica canais.

**Resumo (Digest)** — frequência (desligado / a cada hora / diário / semanal) + horário de envio (seletor HH:00).

### Provedores

Seis blocos de provedores, cada um com um interruptor de habilitar e credenciais.

- _Email_ — menu suspenso do tipo de provedor (SMTP / SendGrid / Mailgun), chave API ou credenciais SMTP (entrada mascarada), domínio remetente.
- _SMS_ — Account SID, token de autenticação (mascarado), número remetente — formato Twilio.
- _Telegram_ — token do bot (mascarado) + seletor de chat ID (uma lista fixa de três chats de demonstração: `@ridewolf_alerts`, `@support_team`, `@management`; o botão **Testar** é um espaço reservado).
- _Slack_ — URL do webhook + canal.
- _Discord_ — URL do webhook.
- _Webhook_ — URL genérico do webhook + segredo de assinatura.

Cada bloco de provedor exibe um selo _Habilitado_ ao lado do título quando seu interruptor está ligado. Botões _Testar_ exibem uma notificação.

### Regras

Uma tabela de regras de alerta. Colunas: Nome / Família de evento / Severidade / Canais / Status / Ações (menu de 3 pontos: Editar / Duplicar / Habilitar-Desabilitar / Excluir). Clique em **+ Criar regra** para abrir o Diálogo de Regra — escolha um nome, escopo (global / zona / função), uma ou mais famílias de eventos, severidade (info / aviso / crítico), canais e o indicador de habilitado.

Regras iniciais: _Falhas de pagamento_ (crítico, família pagamentos, push+email+telegram) e _Veículo offline_ (aviso, família veículos, push+email).

### Modelos

Escolha uma família de evento + idioma + canal, depois edite o título e o corpo. O corpo suporta espaços reservados (ex.: `{{ride.id}}`, `{{amount}}`) que o bloco **Visualizar** expande com um evento de exemplo. _Enviar teste_ exibe uma notificação de que um teste será enviado para o canal selecionado.

### Políticas

Quatro blocos:

- _Escalonamento crítico_ — menu suspenso da cadeia (ex.: push → email → telegram → SMS), tempo limite de confirmação em minutos, interruptor exigir recibo de leitura.
- _Silenciamento automático_ — silencia repetições: se o mesmo evento ocorrer _N_ vezes em _M_ minutos, silencia por _K_ minutos (três entradas numéricas). Uma string resumo abaixo reitera a regra.
- _Segurança do público_ — interruptor _Bloquear SMS fora do horário silencioso_ (sobrepõe os horários silenciosos por canal especificamente para SMS).
- _Ocultação de dados_ — interruptor _Ocultar PII em mensagens externas_; uma dica explica o que é mascarado (telefone, email, últimos 4 dígitos de cartões, etc.).

### Inscrições

Uma tabela de entradas de assinatura. Cada linha vincula um destino (uma Função ou um Usuário específico) a uma ou mais famílias de eventos e canais — por exemplo, _Função: Admin → sistema + pagamentos → push + email_. O botão **+ Criar** abre um diálogo de assinatura; o menu da linha tem Editar / Excluir.

Use Assinaturas para enviar alertas para pessoas que não correspondem a nenhum canal fixado em uma Regra — Regras definem _o que_ alertar, Assinaturas definem _quem_ recebe o alerta.

### Registros

Tabela somente leitura de tentativas de entrega. Colunas: Hora / Evento / Rota / Canal / Destinatário / Status (enviado / confirmado / falhou) / Latência. Clique em uma linha para abrir um toast de detalhes (espaço reservado para um painel de detalhes completo). Use isso para confirmar que um alerta realmente foi enviado ou para depurar um provedor com falha.

## Famílias de eventos

Regras, Modelos e Assinaturas usam a mesma lista fixa de famílias de eventos (definida em `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Essas correspondem aproximadamente aos domínios do Painel — escolha a família que corresponde ao tipo de evento sobre o qual deseja alertar.

## Fluxos de trabalho

- **Configurar alertas por email** — Aba Provedores → habilitar Email → escolher tipo de provedor → colar chave API → salvar → voltar para Canais → habilitar canal Email → pronto.
- **Receber aviso quando pagamentos falharem** — Aba Regras → editar _Falhas de pagamento_ → garantir que a severidade seja `critical` e que os canais incluam os que você realmente monitora → salvar.
- **Parar spam de SMS à noite** — Aba Políticas → habilitar _Bloquear SMS fora do horário silencioso_ → definir o horário silencioso por canal na aba Canais.
- **Enviar resumo diário em vez de notificações** — Aba Canais → cartão Digest → definir frequência para _diário_, horário para ex. 09:00.
- **Adicionar uma nova função de plantão** — Aba Assinaturas → + Criar → escolher a função → famílias de eventos → canais → salvar. Eles receberão alertas futuros correspondentes.
- **Depurar alerta ausente** — Aba Registros → procurar o evento por rota ou hora → se o status for `failed`, vá para Provedores para verificar credenciais; se `sent` mas o humano não viu, verifique Assinaturas / horário silencioso / estado de mudo.

## Dicas

- **Apenas front-end por enquanto.** Salvar mostra um toast, mas a API ainda não existe — trate esta página como a especificação, não como fonte definitiva.
- **Botões de teste são simulados.** _Testar tudo_, _Silenciar 1h_, _Testar_ por canal e a confirmação de _Manutenção_ apenas mostram toast — não enviam mensagens de teste nem silenciam nada.
- **Mapeamento de severidade é o fallback.** A lista de _Canais_ de uma Regra prevalece quando definida; só uma lista vazia/não definida recorre ao mapa de severidade.
- **Digest é separado dos alertas por evento.** Ativar digest não silencia alertas individuais — apenas adiciona o resumo periódico.
- **Assinaturas podem direcionar a um usuário**, não apenas a uma função. Use isso para escalonamentos pontuais (ex.: _o líder do turno da noite recebe todos os alertas `rides` por push_) sem criar uma função.
- **O layout móvel é intencionalmente somente leitura.** Todas as abas no móvel dizem _Use desktop para configuração completa_ — alertas são trabalho administrativo que precisa do desktop.
- **Redação de PII é importante para SMS/email.** Com ela desligada, o corpo do alerta pode vazar números de telefone ou finais de cartão para provedores externos — mantenha ativada a menos que tenha motivo específico.
