# Detalhes do Cliente

A página de detalhes do cliente (`/clients/:id`) é a bancada de trabalho para um único cliente. Use-a para revisar informações pessoais, realizar ações no saldo (recarga, multa), bloquear / desbloquear, enviar mensagens e auditar o histórico de corridas e a atividade da conta do cliente.

Você geralmente chega aqui clicando em uma linha na [lista de Clientes](clients.md) ou a partir da página de detalhes de uma corrida (o link do cliente no cabeçalho).

Permissão necessária: **Clientes** (`e4f5h6`). Ações específicas exigem subpermissões (indicadas abaixo).

## Layout

De cima para baixo:

1. **Cabeçalho** — voltar, nome, status, botão _Ações_
2. **Cartões de visão geral** — saldo, corridas, avaliação, status (4 blocos de KPI)
3. **Abas** — Detalhes / Atividade / Histórico

## Cabeçalho

A faixa superior identifica o cliente:

- **Botão Voltar** (`←`) retorna para a lista
- **Nome** (nome + sobrenome) e **indicador de status** (Ativo / Bloqueado / Congelado / Registrando)
- Botão **Ações** à direita — abre o diálogo de ações

## Ações

Clicar em **Ações** abre um diálogo modal com todas as ações do operador disponíveis para este cliente. Cada uma é controlada por permissão:

| Ação                | Permissão          | O que faz                                                                 |
| ------------------- | ------------------ | ------------------------------------------------------------------------ |
| **Recarregar saldo** | `topup-manual`     | Abre o diálogo de saldo — credita dinheiro na carteira do cliente        |
| **Aplicar multa**    | `fine`             | Abre o diálogo de multa — debita dinheiro da carteira (danos, estacionamento, etc.) |
| **Enviar push**      | —                  | Abre um diálogo para enviar uma notificação push para o app do cliente   |
| **Bloquear / Desbloquear** | `block` / `unblock` | Alterna o status de bloqueado do cliente com motivo opcional             |
| **Editar cliente**   | `edit`             | Abre o [formulário de edição](client-create-edit.md)                     |
| **Excluir cliente**  | `delete`           | Exclusão suave com diálogo de confirmação (item destrutivo em vermelho)  |

Ações para as quais você não tem permissão são ocultadas.

## Cartões de visão geral

Uma linha com quatro cartões abaixo do cabeçalho resume o cliente rapidamente:

| Cartão       | O que mostra                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------- |
| **Saldo**    | Saldo da carteira na moeda da empresa (vermelho se negativo)                                |
| **Corridas** | Contagem total de corridas ao longo da vida                                                 |
| **Avaliação**| Avaliação média que os riders deram para este cliente                                       |
| **Status**   | Status atual com uma legenda de uma linha ("Ativo / Bloqueado / Congelado / Registrando")  |

## Abas

Três abas:

| Aba          | Conteúdo                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| **Detalhes** | Informações pessoais (nome, email, telefone, status, saldo, etiquetas) e o painel **Dispositivos** (dispositivos conectados) |
| **Atividade**| Ações do operador e do sistema nesta conta do cliente (mudanças de status, edições de saldo, etc.)         |
| **Histórico**| Histórico de corridas do cliente — uma fatia focada da lista global de Corridas, filtrada para este cliente |

### Aba Detalhes

A visão mais detalhada do estado da conta do cliente. Duas áreas:

**Informações pessoais (grade):**

- Nome
- Sobrenome
- Email (indicador de status verificado)
- Telefone (indicador de status verificado)
- Status (com o indicador de status)
- Saldo (formatado na moeda da empresa)
- Etiquetas (os chips aplicados a este cliente)

**Painel de dispositivos:**

Lista todos os dispositivos que fizeram login no Rider App com esta conta, com timestamps da última visualização e a opção de enviar um push (quando permitido) ou desconectar um dispositivo. Útil para investigações de segurança e casos de suporte "Não consigo entrar".

### Aba Atividade

O **registro de atividade** cronológico para este cliente: toda ação do operador (recarga, multa, mudança de status, edição, envio de SMS/email/push) e todo evento do sistema (marcos de registro, mudanças de status de verificação, ajustes de saldo por reembolsos).

Útil para conformidade, resolução de disputas e responsabilidade.

### Aba Histórico

O **histórico de corridas** do cliente em forma de tabela — mesmo formato de linha da lista global de Corridas, pré-filtrada para este cliente. Clique em qualquer linha para abrir o detalhe da corrida.

Esta aba é seu ponto de partida para casos "o cliente diz que a corrida X estava errada".

## Fluxos típicos

- **Cliente diz que o saldo está errado** — abra Detalhes (saldo atual), depois Atividade (procure a última alteração de saldo), depois Histórico (verifique a corrida que gerou o débito). Se algo estava errado, _Ações → Recarregar saldo_ com um motivo
- **Cliente reporta telefone perdido** — Detalhes → Dispositivos → desconecte o dispositivo perdido (quando suportado); opcionalmente bloqueie a carteira via _Ações → Bloquear cliente_ até que ele recupere o acesso
- **Fraude ou abuso** — Atividade para a linha do tempo, Histórico para as corridas suspeitas; depois _Ações → Bloquear cliente_ com um motivo; o motivo é salvo no registro de atividade
- **Reembolso de boa vontade** — _Ações → Recarregar saldo_ com uma descrição como "Reembolso de boa vontade — bilhete #12345"; a descrição fica visível na Atividade para auditoria
- **Contato de boas-vindas / onboarding** — _Ações → Enviar push_ com uma mensagem de boas-vindas; verifique Dispositivos primeiro para garantir que ele tenha uma sessão ativa

## Dicas

- **Observe o cartão de Status** — mesmo que tudo pareça normal, um status _Bloqueado_ ou _Congelado_ explica por que o cliente não pode usar o serviço
- **O painel Dispositivos é seu ponto de partida para depuração** — a maioria dos casos de "Não consigo fazer login" se deve a uma sessão de dispositivo expirada
- **As recargas e descrições de multas aparecem na Atividade** — escreva algo que os operadores possam pesquisar depois ("bilhete #X", "reembolso da corrida Y") em vez de apenas um número
- **Editar é para metadados** — nome, email, telefone — não para saldo. Use os diálogos dedicados de saldo (com registro de auditoria) para operações financeiras
- **Avaliação é a avaliação do _motorista_ sobre o cliente** — avaliação baixa cruzada com picos de comprovantes de estacionamento / bilhetes geralmente indica um passageiro problemático
- **A URL contém o ID do cliente** — cole-a em uma conversa de suporte para compartilhar o perfil exato
