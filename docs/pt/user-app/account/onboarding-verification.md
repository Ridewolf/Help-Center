# Integração e Verificação do Rider

A integração é o conjunto de telas que um rider novato passa após seu primeiro login bem-sucedido, antes de chegar ao mapa. Algumas etapas são condicionais, então o número de telas varia entre operadores.

Leia isto antes de responder qualquer pergunta sobre verificação do rider ou envio de documentos — a resposta honesta muitas vezes não é a que o rider espera.

O próprio login é abordado em [Signing in](registration-login.md).

## A ordem das etapas

| # | Etapa                | Rota                         | Quando aparece                                                           |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Código de convite**| `/onboarding/invite`         | Atualmente não disponível no app — riders vão direto para **Sobre mim** |
| 2 | **Sobre mim**        | `/onboarding/about-me`       | Sempre. **É aqui que a conta é criada**                                 |
| 3 | **Carteira de motorista** | `/onboarding/driver-license` | Apenas quando habilitado nas configurações da sua empresa (por padrão não é) |
| 4 | **Passaporte**       | `/onboarding/passport`       | Apenas quando habilitado da mesma forma                                 |
| 5 | **Permissões**       | `/onboarding/permissions`    | Sempre                                                                   |
| 6 | **Parabéns**         | `/onboarding/congratulations`| Sempre, depois segue para `/map`                                        |

Note a ordem: registro e dados pessoais vêm **antes** dos documentos, e permissões vêm **depois** deles — não o contrário.

## Sobre mim — a etapa que cria a conta

Um passo a passo de três etapas:

1. **Foto** — opcional, pode ser pulada
2. **Nome e data de nascimento** — **Nome** obrigatório; **Sobrenome** e **Nome do meio** opcionais; **Data de nascimento** obrigatória, e não pode ser posterior a hoje
3. **Contato** — **Email** opcional; telefone inserido via seletor de prefixo do país e validado como número internacional; a caixa de consentimento para marketing é **obrigatória** para continuar

Ao enviar, a conta é criada. Se uma foto foi escolhida, ela é carregada logo em seguida — falha no upload da foto **não** interrompe o registro, a conta ainda é criada.

A próxima tela depende das configurações da sua empresa: **Carteira de motorista** se habilitada, caso contrário **Passaporte** se habilitado, caso contrário direto para **Permissões**.

### "Qual é a minha senha?"

Um rider que se registrou aqui nunca foi solicitado a escolher uma senha. Se quiser usar depois a aba de login com email e senha, precisa definir uma senha primeiro via **Esqueci a senha** — veja [Signing in](registration-login.md).

## Carteira de motorista e passaporte

Cada uma dessas telas é um passo a passo de três etapas — foto da frente, foto do verso, depois uma selfie segurando o documento — e cada etapa aceita captura pela câmera ou foto da galeria. O botão **Enviar** fica bloqueado até que as três imagens existam; o rider vê uma mensagem "todas as fotos são obrigatórias" até então, e a etapa não pode ser pulada.

**O envio de documentos não está disponível no app atualmente.** Enviar mostra um erro e mantém o rider na mesma etapa. Não há tentativa que funcione, e nenhuma imagem de documento chega aos seus sistemas.

O que isso significa na prática:

- Nunca diga a um rider (ou colega) que um documento foi recebido, está sendo revisado ou está armazenado — nada foi enviado
- Um rider preso nessa tela não está fazendo nada errado: não é problema de qualidade da foto, da câmera ou da rede
- Qualquer verificação real de identidade deve ser feita pela sua equipe fora do app
- Se as configurações da sua empresa habilitam essas etapas, riders no seu operador não podem concluir a integração por elas. Desative as etapas extras em **Configurações → Minha Empresa → App → Etapas Extras de Cadastro** ([Minha Empresa](../../settings/administration/my-company.md)) a menos que tenha motivo para mantê-las

## Permissões

A tela solicita três permissões: **notificações**, **localização** e **câmera**. O botão **Continuar** só fica disponível quando as três forem concedidas.

**Problema conhecido:** tanto **Continuar** quanto **Pular** atualmente levam o rider de volta para a etapa **Sobre mim** em vez de avançar para **Parabéns**. Um rider que acabou de conceder as três permissões pode se ver de volta ao início do passo a passo de dados pessoais. Este é um problema conhecido no app, não um erro do rider — informe isso em vez de enrolar o rider.

A permissão de localização é importante além da integração: sem ela, uma corrida não pode ser iniciada. Veja [Rides](../riding/rides.md).

## Parabéns

Uma tela apenas para exibição. Ela limpa os dados da integração, mostra um aviso "conta em revisão" e oferece **Continuar**, que abre o mapa.

O aviso não informa quanto tempo a revisão leva, e você também não deve — não há tempo de resposta publicado. E como nenhum documento foi enviado, ainda não há nada na fila de revisão.

## Conta Bloqueada — `/onboarding/account-blocked`

Exibida quando a conta do rider é reportada como bloqueada. É uma tela apenas para exibição listando os possíveis motivos:

- Violação dos termos
- Fraude
- Falhas repetidas de pagamento
- Comportamento suspeito
- Preocupações de segurança

Abaixo dos motivos, um acordeão **Contatar suporte** é montado a partir dos mesmos **Canais de suporte** que você configura para a tela de Suporte — telefone, email, Telegram, WhatsApp e site, cada um ativado independentemente — então quais canais aparecem depende da sua configuração. Um botão **Voltar para Login** é fornecido.

Não há fluxo de apelação dentro do aplicativo. O único caminho para o usuário é entrar em contato com sua equipe por um desses canais. Do seu lado, revise e desbloqueie o cliente no **Painel** — veja [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Como funciona a verificação do usuário?** Não dentro do aplicativo. A conta é criada em **Sobre mim**; as etapas de documentos não podem ser concluídas porque o upload de documentos não está disponível no aplicativo atualmente. Realize as verificações de identidade fora do aplicativo.
- **Por que um usuário vê a etapa do passaporte e outro não?** As etapas de documentos são por operador, definidas em **Signup Extra Steps**.
- **Um usuário está travado na tela da carteira de motorista ou passaporte.** Esperado. O envio sempre falha ali — não é corrigível pelo usuário.
- **O usuário pode pular a etapa do documento?** Não. As três imagens são obrigatórias antes do envio, e o envio então falha.
- **Quanto tempo leva a revisão?** O aplicativo não informa, então não informe uma duração.
- **O usuário diz que a qualidade da foto foi rejeitada.** O aplicativo não avalia a qualidade da imagem. O que ele viu foi o erro de upload.
- **Qual etapa realmente cria a conta?** **Sobre mim**, etapa 3, no envio.
- **A tela do código de convite nunca aparece.** Códigos de convite não estão disponíveis no aplicativo atualmente.

## Relacionados

- [Getting started](../basics/getting-started.md) — a versão resumida deste fluxo
- [Signing in](registration-login.md) — métodos de login, códigos, redefinição de senha
- [Profile](profile.md) — o que o usuário pode alterar depois
- [Support](../help/support.md) — os canais mostrados na tela Conta Bloqueada
