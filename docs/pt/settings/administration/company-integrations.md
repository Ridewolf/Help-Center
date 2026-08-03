# Pagamentos e Integrações

As abas **Pagamentos** e **Integrações** da página [Minha Empresa](my-company.md) (`/settings/my-company`, **modo Avançado**) são onde ficam as credenciais de terceiros: as plataformas de pagamento que cobram seus riders e as integrações de serviço que alimentam logins, mensagens e o assistente de IA.

No modo Avançado, Minha Empresa tem quatro abas — Perfil, Configuração do App, **Pagamentos**, **Integrações**. Este artigo cobre as duas últimas.

## Aba Pagamentos

1. **Selecione a moeda da empresa** — é aqui que a moeda (e seu símbolo derivado) é editada, **não na aba Perfil**. O menu suspenso oferece 16 códigos: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configure um cartão por provedor de pagamento** — **maib**, **mia**, **Stripe**.
3. Cada cartão tem um botão de alternância **habilitado**, seus próprios campos de credenciais e uma caixa de seleção **padrão**.

Exatamente **um provedor atua como padrão** para novas cobranças, e deve ser um dos provedores habilitados/suportados.

## Aba Integrações

Cinco cartões, cada um com seu próprio botão de alternância habilitado e credenciais:

| Cartão       | Credenciais                                       | Fornece                      |
| ------------ | ------------------------------------------------ | ---------------------------- |
| **Telegram** | token do bot, nome de usuário do bot             | Login / mensagens do Telegram |
| **WhatsApp** | ID da conta comercial, ID do número de telefone, token de acesso | Login / mensagens do WhatsApp |
| **Google**   | ID do cliente, segredo do cliente                 | Login do Google para riders   |
| **Apple**    | ID do cliente, ID da equipe, ID da chave, chave privada | Login da Apple para riders    |
| **OpenAI**   | chave da API                                      | Assistente de IA do Dashboard |

## Cada cartão salva individualmente

Cada cartão de provedor de pagamento e integração **salva individualmente** — nenhum deles faz parte do salvamento geral da página. Salvar a aba Perfil ou Configuração do App não salva esses cartões, e vice-versa. **Salve cada cartão que você alterou.**

## Relação com os métodos de login do rider

Os métodos de autenticação da aba Configuração do App para Google, Apple, Telegram e WhatsApp só funcionam depois que o **cartão correspondente em Integrações estiver habilitado e configurado**. Configure a integração primeiro, depois habilite o método de login.

## Segredos

- Os campos secretos são **mascarados visualmente** de forma que também impede que gerenciadores de senha do navegador tentem capturá-los ou preenchê-los automaticamente.
- **Ao rotacionar um segredo, digite o valor completo deliberadamente** em vez de confiar no espaço reservado mascarado.

## Telegram: duas configurações diferentes

Separado do cartão Telegram em Integrações, existe um fluxo de **descoberta do bot OTP do Telegram**: insira um token do bot, clique em **Verificar Conversas** e escolha uma conversa no menu suspenso preenchido. Esse fluxo serve para entrega de senha única e é uma **configuração diferente** do cartão Telegram em Integrações — configurar um não configura o outro.

## Perguntas comuns

- **Eu alterei uma credencial, mas nada mudou.** Cada cartão salva individualmente — confirme que você salvou aquele cartão específico, não apenas a página.
- **O login social não está disponível para os riders.** O cartão do provedor deve estar habilitado e configurado aqui antes que o método de login correspondente em Configuração do App funcione.
- **Não consigo selecionar um provedor de pagamento padrão.** O padrão só pode ser escolhido entre os provedores que estão realmente configurados como suportados.
- **Onde está o campo da moeda?** Nesta aba Pagamentos — não na aba Perfil.
- **"Verificar Conversas" falha com um token válido.** Considere isso primeiro como um problema de ambiente/conectividade em vez de assumir que o token está errado.
