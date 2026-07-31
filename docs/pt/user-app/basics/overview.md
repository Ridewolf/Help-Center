# Aplicativo do Usuário — Visão Geral

O aplicativo do usuário (o Rider App) é o app móvel que seus clientes usam para encontrar e usar veículos compartilhados, manter o saldo da carteira carregado, revisar corridas passadas e contatar sua equipe de suporte.

Este artigo é o mapa desse app: o que ele faz, onde cada tela está localizada e qual guia responde a qual pergunta. Use-o como ponto de partida quando um usuário entrar em contato e você precisar do nome exato da tela e dos passos precisos.

Para um passo a passo para o usuário no primeiro lançamento, veja [Getting started](getting-started.md). Para o app da equipe de campo, veja [Service app — Overview](../../service-app/basics/overview.md).

## O que o app pode fazer

- Mapa de veículos ao vivo como tela inicial
- Saldo da carteira com vários provedores de recarga
- Histórico de corridas com detalhamento de custo por corrida e mapa da rota
- Chat ao vivo com suporte, além dos canais de contato que você habilitar
- Vários idiomas de interface, temas claro e escuro
- Gerenciamento de sessão por dispositivo

## Como os usuários navegam pelo app

O **mapa** é a tela inicial. Todo o resto abre a partir do **menu lateral**, que o usuário puxa a partir do mapa — essa gaveta é a única estrutura de navegação do app. Não há barra de abas inferior em nenhum lugar do app, então nunca envie um usuário procurando por uma.

Mensagens de chat do operador também podem conter links do app que levam o usuário diretamente a uma tela (por exemplo, a tela de Privacidade).

## Respostas rápidas por tarefa

### Conta, login e configuração

| Pergunta do usuário                         | Onde está a resposta                                               |
| ------------------------------------------- | ------------------------------------------------------------------- |
| Como faço para entrar?                      | [Signing in](../account/registration-login.md) — os métodos disponíveis vêm das configurações da sua empresa, então a tela de login não é a mesma para todos os operadores |
| Esqueci minha senha                         | [Signing in](../account/registration-login.md)                      |
| Abri o app a partir de um bot do Telegram ou Viber | [Signing in](../account/registration-login.md)                    |
| O que acontece logo após o primeiro login? | [Onboarding and verification](../account/onboarding-verification.md) |
| Quais documentos são solicitados?           | [Onboarding and verification](../account/onboarding-verification.md) |
| Por que minha conta está bloqueada?         | [Onboarding and verification](../account/onboarding-verification.md) — a tela **Account Blocked** |
| Primeiro tour pelo app                      | [Getting started](getting-started.md)                               |

### Encontrar um veículo e usar

| Pergunta do usuário                                          | Onde está a resposta                    |
| ------------------------------------------------------------ | -------------------------------------- |
| Como encontro e seleciono um veículo? Como funciona o preço da reserva? | [Map](../riding/map.md)  |
| Como começo, pauso e termino uma corrida?                   | [Rides](../riding/rides.md)            |
| Por que não consigo começar uma corrida?                     | [Rides](../riding/rides.md) — cobre botão **Scan** ausente, saldo mínimo para iniciar, permissão de localização, estar muito longe do veículo, cooldown de reserva e fotos de início não concluídas |
| E a foto do estacionamento no final?                        | [Rides](../riding/rides.md) — incluindo o diálogo fora da zona de estacionamento |
| Do que é composto o custo da minha corrida?                 | [Rides](../riding/rides.md) e [History](../money/history.md) |

### Dinheiro e pagamentos

| Pergunta do usuário                        | Onde está a resposta                                              |
| ----------------------------------------- | ---------------------------------------------------------------- |
| Como faço para recarregar?                | [Wallet](../money/wallet.md) para o ponto de entrada, [Payment methods](../money/payment-methods.md) para o passo a passo completo de cada fluxo de recarga |
| Como adiciono um cartão?                   | [Payment methods](../money/payment-methods.md)                    |
| Quais provedores existem e como eles diferem? | [Payment methods](../money/payment-methods.md)            |
| Minha recarga está pendente / quero cancelá-la | [Payment methods](../money/payment-methods.md)         |
| Como funciona a recarga automática?       | [Wallet](../money/wallet.md)                                      |

### Histórico, recibos e estatísticas

| Pergunta do usuário                                    | Onde está a resposta                                        |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Onde estão minhas corridas e pagamentos passados?     | [History](../money/history.md) — duas abas, cada uma paginada  |
| Preciso de um recibo, mapa da rota e detalhamento de custo de uma corrida | [History](../money/history.md) — detalhe da corrida       |
| Quais são meus totais?                                 | [History](../money/history.md). A tela **Analytics** não está disponível atualmente no app — veja [Analytics](../money/analytics.md) |

### Perfil, configurações e segurança

| Pergunta do Rider                             | Onde está a resposta                                     |
| ---------------------------------------------- | ------------------------------------------------------- |
| Como faço para mudar meu nome, foto ou senha? | [Perfil](../account/profile.md)                         |
| Como faço para excluir minha conta?            | [Perfil](../account/profile.md) — este é o fluxo correto. [Privacidade](../account/privacy.md) explica por que o botão na tela de Privacidade não é o indicado |
| Notificações, idioma, tema, exibição do mapa   | [Configurações](../help/settings.md)                    |
| Em quais dispositivos estou conectado?          | [Sessões](../account/sessions.md)                       |
| Onde está a política de privacidade / orientações de segurança? | [Privacidade](../account/privacy.md)                    |

### Ajuda

| Pergunta do Rider                      | Onde está a resposta                     |
| ------------------------------------- | --------------------------------------- |
| Como entro em contato com o suporte? | [Suporte](../help/support.md)           |
| Assinaturas ou código promocional     | [Assinaturas](../money/subscriptions.md) — atualmente não disponível no app |

## Referência de tela

| Tela                | Rota                        | O que é                                                    |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| **Mapa**            | `/map`                      | Tela inicial — encontrar e selecionar um veículo           |
| **Carteira**        | `/wallet`                   | Saldo, bônus, recarga, recarga automática                  |
| **Métodos de pagamento** | `/wallet/payment-methods`   | Cartões salvos e recargas pendentes                         |
| **Histórico**       | `/history`                  | Abas **Corridas** e **Pagamentos**; toque em uma corrida para detalhes |
| **Perfil**          | `/profile`                  | Informações da conta, foto, senha, exclusão da conta       |
| **Configurações**   | `/settings`                 | Notificações, exibição do mapa, idioma, tema               |
| **Sessões**         | `/settings/sessions`        | Todos os dispositivos conectados à conta                   |
| **Privacidade**     | `/privacy`                  | Política de privacidade e orientações de segurança         |
| **Suporte**         | `/support`                  | Abas **FAQ** e **Contato**, além de chat ao vivo          |

## Atualmente não disponível no app

Não prometa estes recursos a um rider — eles não estão disponíveis no app atualmente:

- **Assinaturas** e **códigos promocionais** — a tela não pode ser aberta
- **Análises** — envie os riders para **Histórico** para ver totais
- **Upload de documentos durante o onboarding** — nunca informe ao rider que seu documento foi recebido
- **Modo de Condução**, **Unidades**, **Mapas Offline**, **códigos de convite**, **Baixar meus dados** e o botão **Solicitar Exclusão de Conta** na tela de Privacidade

A exclusão da conta em si funciona — a partir de **Perfil**, veja [Perfil](../account/profile.md).

## O que as configurações da sua empresa alteram

Várias partes do app diferem entre operadores porque você as configura no painel, em **Configurações → Minha Empresa → App**:

- **Métodos de autenticação** — quais abas o rider vê na tela de login
- **Passos extras no cadastro** — se o onboarding solicita documentos adicionais
- **Canais de suporte** — quais canais de contato aparecem nas telas de Suporte e Conta Bloqueada
- **Legal e conformidade** — os links para Termos de Serviço e Política de Privacidade exibidos no app

Veja [Minha Empresa](../../settings/administration/my-company.md) para o lado do operador dessas configurações.
