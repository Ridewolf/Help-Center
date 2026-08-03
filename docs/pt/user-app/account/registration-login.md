# Entrando — Códigos, Senhas e Login pelo Messenger

Tudo o que um usuário passa antes de chegar ao mapa: escolher um método de login, confirmar um código único, preencher um perfil mínimo, recuperar uma senha ou chegar por um bot do Telegram ou Viber.

Use este artigo quando um usuário não conseguir entrar no app. O que acontece *depois* do primeiro login bem-sucedido está coberto em [Onboarding and verification](onboarding-verification.md).

## Quais métodos de login o usuário vê

As abas na tela de login (`/auth/login`) são construídas a partir dos **Métodos de Autenticação** que você habilita em **Configurações → Minha Empresa → App**. Nem todo usuário vê todos os métodos. Os métodos possíveis são:

- Código único por **telefone**
- Código único por **email**
- Código único pelo **WhatsApp**
- **Email e senha**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Se um usuário disser que um método está faltando, ele não está habilitado para aquele operador. Ative-o em [Minha Empresa](../../settings/administration/my-company.md) — não há nada que o usuário possa fazer do lado dele.

## Campos em cada aba

| Aba                      | Campos                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefone**             | Número de telefone (pelo menos 6 caracteres) mais uma escolha de entrega — enviar o código por **telefone** ou por **WhatsApp** |
| **Email**                | Endereço de email                                                                              |
| **Senha** — entrar       | Email e senha                                                                                  |
| **Senha** — cadastrar    | **Nome** (obrigatório, pelo menos 2 caracteres), **Sobrenome** (opcional), email, senha       |

Telefone e WhatsApp são **rotas de entrega separadas**. Um usuário esperando um SMS enquanto a escolha de entrega está em WhatsApp vai esperar para sempre.

Os botões **Google** e **Apple** aparecem quando esses métodos estão habilitados. Se um usuário sair da folha do provedor, nada acontece e nenhum erro é mostrado — isso é esperado, ele simplesmente cancelou.

## Usuário novo ou usuário retornando

Antes de enviar um código, o app verifica se o contato pertence a uma conta existente.

- **Usuário retornando** — o código é enviado imediatamente
- **Usuário novo** — um diálogo curto de registro aparece primeiro e coleta **Nome**, **Sobrenome** e o contato que ainda falta: um email quando o código vai para um telefone, um telefone quando o código vai para um email

## A verificação de segurança

Um CAPTCHA precisa carregar na tela de login antes que um código único possa ser solicitado. Se não carregar — rede bloqueada, motor de navegador muito antigo, bloqueador de anúncios no navegador do app — o pedido do código não pode ser enviado. Peça para o usuário reabrir o app em uma conexão normal.

## Digitando o código único — `/auth/otp`

1. O usuário digita o código — exatamente **6 dígitos**, apenas dígitos
2. **Reenviar** fica disponível quando a contagem regressiva na tela chega a zero
3. No canal de telefone, telefones suportados preenchem o código automaticamente e o enviam

O que acontece a seguir:

- Um **usuário novo** continua para a tela **Completar Perfil**
- Um **usuário retornando** entra direto no app

## Completar Perfil — `/auth/complete-profile`

Mostrado apenas para usuários novos. Solicita:

- **Nome** — obrigatório, pelo menos 2 caracteres
- **Sobrenome** — opcional
- O contato que ainda falta — um email se o código veio por telefone, um telefone se o código veio por email

Valores já coletados são preenchidos automaticamente, e o formulário se envia quando tanto o nome quanto o contato já estão presentes. Um botão **Pular** está disponível.

Se o número de telefone de um usuário estiver faltando depois, peça para ele verificar a tela **Perfil** em vez de assumir que esta etapa salvou — veja [Profile](profile.md).

## Usuários que nunca escolheram uma senha

Um usuário que criou a conta pelo onboarding nunca foi solicitado a escolher uma senha. Se depois quiser entrar na aba **Senha**, deve definir uma senha primeiro pelo **Esqueci a senha**. Não diga para o usuário "tentar a senha que costuma usar".

## Esqueci a senha — `/auth/forgot-password`

Um campo: o email da conta. Após enviar, a tela mostra um de três resultados, que significam coisas diferentes:

| O que o usuário vê    | Significado                                   |
| --------------------- | --------------------------------------------- |
| **Mensagem verde**    | O email de redefinição foi solicitado com sucesso |
| **Contagem âmbar**    | Muitas tentativas deste dispositivo — aguarde o timer terminar |
| **Erro vermelho**     | A solicitação falhou — tente novamente          |

A contagem âmbar é mantida no próprio dispositivo do usuário, então não o acompanha para outro telefone.

## Redefinir senha — `/auth/reset-password`

O usuário deve abrir esta tela pelo link no email de redefinição. Abrir sem um link válido o envia de volta para **Esqueci a senha** com um aviso de "link expirado" — solicite um email novo.

Na tela, o usuário digita uma nova senha e uma confirmação. As regras da senha são mostradas ao vivo enquanto digita, e os dois campos devem coincidir antes que o formulário possa ser enviado.

## Login pelo Messenger (Telegram / Viber) — `/auth/messenger-callback`

Quando um usuário começa pelo seu bot do Telegram ou Viber, o link do bot abre uma página ponte, que abre o app, que faz o login do usuário e o leva para dentro do app.

Duas falhas têm suas próprias mensagens:

- **Conta bloqueada** — o usuário é levado para a tela **Conta Bloqueada**, veja [Onboarding and verification](onboarding-verification.md)
- **Acesso do usuário necessário** — a conta existe, mas não é uma conta de usuário nesta operadora

Qualquer outra coisa exibe uma mensagem genérica de "login inválido"; peça ao usuário para começar novamente pelo bot com um link novo.

## Limites de taxa

Os limites para códigos únicos são definidos pelo servidor, não pelo app. A tela mostra uma contagem regressiva baseada na espera que o servidor retornou. **Leia a contagem regressiva para o usuário — nunca informe um número fixo de minutos**, pois não é fixo.

## Solução de problemas

| Sintoma                          | O que significa e o que fazer                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Um método de login está ausente  | Ele não está habilitado em seus **Métodos de Autenticação**. Habilite em [Minha Empresa](../../settings/administration/my-company.md) |
| O código nunca chegou            | Aguarde a contagem regressiva, então **Reenviar**. Verifique se a escolha de entrega na aba **Telefone** é a que o usuário espera — telefone e WhatsApp são rotas separadas |
| "Muitas tentativas"             | Leia a contagem regressiva na tela; o tempo de espera veio do servidor                            |
| O pedido do código não é enviado | O CAPTCHA na tela de login provavelmente não carregou                                            |
| O usuário não sabe a senha       | Provavelmente nunca definiu uma. Envie-o para **Esqueci a senha**                                |
| O link de redefinição expirou    | O usuário é redirecionado para **Esqueci a senha**; solicite um link novo                        |
| Tela **Conta Bloqueada**         | Veja a seção de conta bloqueada em [Onboarding and verification](onboarding-verification.md)     |
| Logado, mas nada carrega         | Verifique [Sessões](sessions.md) — se a conta tem exclusão pendente, partes do app são restritas; veja [Perfil](profile.md) |
