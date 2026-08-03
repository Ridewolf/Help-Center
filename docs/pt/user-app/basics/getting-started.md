# Começando — Noções Básicas do Aplicativo do Usuário

Este é o guia para um novo usuário: desde a instalação do app até a primeira corrida. Também lista as regras que decidem se uma corrida pode começar, para que sua equipe de suporte possa responder "por que não posso andar?" sem precisar adivinhar.

Para o mapa em tela cheia do app, veja [Overview](overview.md).

## O que um usuário pode fazer

- Encontrar veículos compartilhados próximos no mapa, escanear ou tocar em um, e usá-lo
- Manter um saldo na carteira e recarregá-lo pelo app
- Revisar corridas e pagamentos passados, com detalhamento do custo por corrida
- Contatar o suporte pelos canais que você habilitar, ou pelo chat ao vivo
- Gerenciar a conta: nome, foto, senha, dispositivos conectados

Assinaturas e códigos promocionais não estão disponíveis no app atualmente — veja [Subscriptions](../money/subscriptions.md).

## Antes de começar

- O usuário precisa do app do seu operador instalado no celular
- O usuário precisa de um dos métodos de login que você habilitou em **Configurações → Minha Empresa → App → Métodos de Autenticação** (veja [Minha Empresa](../../settings/administration/my-company.md))
- Não é necessário cartão ou configuração de pagamento para criar uma conta — isso vem depois, na **Carteira**

## Configuração inicial

### 1. Entrar

Não há um fluxo único fixo de login. A tela de login mostra uma aba para cada método que você habilitou, e os métodos possíveis são código único por telefone, código único por email, código WhatsApp, email e senha, Google, Apple, Telegram e Viber.

Descreva para o usuário como "entrar com um dos métodos que seu operador oferece" — não como "digite seu número de telefone e aguarde um SMS". Os campos por aba e as etapas de entrada do código estão em [Signing in](../account/registration-login.md).

### 2. Completar o onboarding

Um novo usuário passa pelo onboarding antes de chegar ao mapa. Algumas etapas são condicionais, então dois usuários em operadores diferentes podem ver um número diferente de telas. A ordem é:

1. **Sobre mim** — um passo a passo em três etapas: uma foto opcional, depois nome e data de nascimento, depois detalhes de contato mais uma caixa de consentimento para marketing. **Esta é a etapa que realmente cria a conta.**
2. **Carteira de motorista** — somente quando habilitado nas configurações da sua empresa (por padrão não é)
3. **Passaporte** — somente quando habilitado da mesma forma
4. **Permissões** — notificações, localização, câmera
5. **Parabéns** — depois vai para o mapa

Configuração de cartão ou pagamento **não** faz parte do onboarding. O usuário adiciona um método de pagamento depois, na tela **Carteira**, quando quiser recarregar.

Duas coisas para saber antes de orientar um usuário no onboarding: as etapas de documentos não podem ser concluídas (upload de documentos não está disponível no app atualmente), e após conceder permissões os botões **Continuar** e **Pular** atualmente retornam ao passo **Sobre mim** em vez de avançar. Detalhes completos: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Começar a usar

O onboarding termina no mapa. A partir daí o usuário seleciona um veículo ([Map](../riding/map.md)) e inicia uma corrida ([Rides](../riding/rides.md)).

## As seções do app

| Seção              | Rota                      | O que o usuário faz lá                                      |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Mapa**            | `/map`                    | Tela inicial — encontrar e selecionar um veículo            |
| **Carteira**        | `/wallet`                 | Saldo, bônus, recarga, recarga automática                   |
| **Métodos de pagamento** | `/wallet/payment-methods` | Cartões salvos, recargas pendentes                          |
| **Histórico**       | `/history`                | Abas **Corridas** e **Pagamentos**; toque numa corrida para detalhes, mapa da rota e detalhamento de custo |
| **Perfil**          | `/profile`                | Informações da conta, foto, senha, exclusão da conta        |
| **Configurações**   | `/settings`               | Notificações, exibição do mapa, idioma, tema                |
| **Sessões**         | `/settings/sessions`      | Todos os dispositivos conectados                            |
| **Privacidade**     | `/privacy`                | Política de privacidade e diretrizes de segurança          |
| **Suporte**         | `/support`                | Abas **FAQ** e **Contato**, além de chat ao vivo           |

Todas essas abrem pelo **menu lateral** no mapa. Não há barra de abas inferior no app.

## As regras que regem uma corrida

Estas são reais e baseadas na sua configuração. Consulte os valores no Painel em vez de citar um número de memória.

| Regra                           | Origem                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Saldo mínimo para começar**   | Saldo mínimo para início da tarifa, aplicado apenas a usuários sem cartão vinculado. Quando a tarifa não define, a regra é simplesmente "saldo acima de zero". Veja o valor na tarifa — veja [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Onde a corrida pode terminar** | Suas zonas. Terminar fora de uma zona de estacionamento permitida é rejeitado e o app mostra um diálogo dedicado — veja [Zones](../../settings/infrastructure/zones.md) |
| **Fotos antes e depois da corrida** | Configurações da sua empresa: fotos do veículo e selfie no início da corrida, e fotos do estacionamento no fim da corrida. Cada uma pode ser habilitada, marcada como obrigatória e ter uma quantidade de fotos. Por padrão todas estão habilitadas, com uma foto e não obrigatórias |

Uma regra extra de fotos para lembrar: quando a selfie no início da corrida está habilitada, retomar uma corrida pausada também pede uma selfie, e **essa não pode ser pulada**.

Passo a passo para tudo o que foi mencionado: [Rides](../riding/rides.md).

## Antes de aconselhar um passageiro

- **Vale a pena ativar as notificações** — os botões de notificação de corrida e promoção em [Configurações](../help/settings.md) são reais e funcionam
- **Os totais ficam no Histórico**, não em uma tela de Análises
- **O upload de documentos não está disponível no app atualmente** — nunca informe a um passageiro que um documento foi recebido ou está em análise
- **Assinaturas e códigos promocionais não estão disponíveis no app atualmente**

## Próximos passos

- [Entrar](../account/registration-login.md) — todos os métodos de login, campo a campo
- [Integração e verificação](../account/onboarding-verification.md) — o que cada etapa de integração solicita
- [Carteira](../money/wallet.md) — primeiro recarregamento
- [Suporte](../help/support.md) — como os passageiros entram em contato com sua equipe
