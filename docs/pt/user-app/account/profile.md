# Perfil — Detalhes da Conta, Senha e Exclusão

A tela **Perfil** (`/profile`) é a tela da própria conta do usuário: o que o operador sabe sobre ele, além de todas as ações em nível de conta — foto, nome, senha, sessões, sair e exclusão.

É aqui também que a exclusão da conta realmente acontece. O botão na tela de Privacidade não é o que deve ser usado — veja [Privacy](privacy.md).

## O que a tela mostra

| Campo              | Editável? | Observações                                        |
| ------------------ | --------- | ------------------------------------------------- |
| **Foto**           | Sim       | Avatar 96 × 96 com sobreposição de câmera para alterar |
| **Nome Completo**  | Sim       | Exibido aqui, editado na folha de edição          |
| Distintivo de status | Não       | Leia o rótulo conforme exibido                      |
| **Email**          | Não       | Apenas exibição                                    |
| **Telefone**       | Não       | Apenas exibição                                    |
| **Status da Conta**| Não       | Apenas exibição                                    |
| **Membro Desde**   | Não       | Data de criação da conta                           |

A data de nascimento **não** está nesta tela. Ela é coletada durante o onboarding, mas não é exibida nem editável aqui, portanto não envie um usuário para cá para alterá-la.

## Editando o nome

1. Toque no ícone de **lápis**
2. A folha de edição abre com **Nome** e **Sobrenome** — e nada mais. Ambos são obrigatórios
3. Salve

Email e telefone não são editáveis aqui, e não há fluxo no app para alterar nenhum dos dois. Se um usuário precisar de um email ou telefone diferente, sua equipe deve gerenciar isso pelo painel — veja [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Um detalhe: um usuário que entrou com Apple ou Google pode ser solicitado a digitar seu nome real, porque o nome retornado por esses serviços nem sempre é utilizável.

## Alterando a foto

Tocar no avatar abre a folha de foto com três fontes:

- **Tirar Foto** — a câmera do telefone
- **Escolher da Galeria**
- **Escolher Arquivo**

Limites: **JPEG, JPG, PNG ou WEBP, no máximo 10 MB**. Não há etapa de corte — a foto é usada como foi tirada, então avise os usuários para enquadrar antes de enviar. Após o upload, a nova foto substitui a antiga em todo o app.

## Alterando a senha

A folha **Alterar Senha** pede três campos:

| Campo                | Regra                                   |
| -------------------- | --------------------------------------- |
| **Senha Atual**      | Obrigatório                            |
| **Nova Senha**       | Deve satisfazer as regras de senha mostradas |
| **Confirmar Senha**  | Deve coincidir com a nova senha         |

Avise o usuário antes de começar: **uma alteração de senha bem-sucedida encerra a sessão** e o leva de volta à tela de login com uma mensagem de confirmação. Isso é comportamento esperado, não um erro — ele simplesmente faz login novamente com a nova senha.

Uma senha atual incorreta mostra um erro inline nesse campo. Qualquer outra falha aparece como uma mensagem curta no topo da tela.

## Gerenciando sessões

**Gerenciar Sessões** abre `/settings/sessions`, a lista de todos os dispositivos conectados à conta. Veja [Sessions](sessions.md) para a lista de dispositivos e as ações de sair em todos os lugares.

## Saindo

O botão **Sair** encerra a sessão neste dispositivo e retorna o usuário ao início do app. Não afeta outros dispositivos — use [Sessions](sessions.md) para isso.

## Excluindo a conta — o fluxo funcional

1. **Excluir Conta** aparece apenas quando não há exclusão pendente
2. Tocar nele abre um diálogo de confirmação
3. Na confirmação, a exclusão é agendada
4. O botão é substituído por uma caixa pendente: um ícone de relógio, **Agendado para {date}**, e um botão **Cancelar** enquanto o cancelamento ainda for permitido

Para cancelar, o usuário toca em **Cancelar**, confirma no diálogo, e o botão normal **Excluir Conta** volta.

Não há requisito de saldo neste fluxo — um usuário com dinheiro na carteira ainda pode agendar uma exclusão, então lembre-o de gastar ou resgatar o saldo primeiro, se isso for importante. Veja [Wallet](../money/wallet.md).

## Enquanto uma exclusão está pendente

Edição do perfil, alteração de senha, upload de foto e gerenciamento de sessões estão **todos desabilitados** enquanto uma exclusão está agendada.

Esta é a resposta sempre que um usuário relata que os botões na tela Perfil estão desativados: ele tem uma exclusão agendada. Cancelá-la restaura tudo.

## FAQ

- **Por que o usuário não pode editar o email ou telefone aqui?** A folha de edição contém apenas nome e sobrenome; ambos os campos de contato são apenas para exibição e não há fluxo no app para alteração.
- **Por que todos os botões estão desabilitados?** Uma exclusão de conta está pendente. Cancele-a.
- **O usuário foi desconectado logo após alterar a senha.** Esperado — uma alteração de senha bem-sucedida força um novo login.
- **O que significam os valores de status?** Leia o rótulo **Status da Conta** conforme exibido; não o mapeie para uma lista fixa de valores.
- **Um usuário pergunta sobre solicitar exclusão da conta pela tela de Privacidade.** A tela de Privacidade não tem botão de exclusão — é apenas informativa. Use **Perfil → Excluir Conta** — veja [Privacy](privacy.md).

## Relacionados

- [Sessions](sessions.md) — dispositivos conectados à conta
- [Settings](../help/settings.md) — notificações, idioma, tema, exibição do mapa
- [Privacy](privacy.md) — política de privacidade e diretrizes de segurança
- [Signing in](registration-login.md) — redefinição de senha para usuários que nunca definiram uma
