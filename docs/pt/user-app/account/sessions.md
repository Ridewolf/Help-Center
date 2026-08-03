# Sessões — Dispositivos Conectados à Conta

A tela **Sessões** (`/settings/sessions`) lista todos os locais onde a conta de um rider está atualmente conectada e permite que ele desconecte esses locais. É a tela a ser acessada sempre que um rider suspeitar que outra pessoa tem acesso à sua conta.

Dois pontos de entrada, ambos levando aqui:

- **Perfil → Gerenciar Sessões**
- **Configurações → Cartão Privacidade → Gerenciar Sessões**

## Como a lista está organizada

As sessões são **agrupadas por dispositivo** — navegador e versão, sistema operacional e versão, tipo de dispositivo, fabricante e modelo — para que o mesmo telefone apareça uma vez em vez de várias vezes.

Os grupos são ordenados deliberadamente:

1. O dispositivo atual do rider primeiro
2. Depois pelo status: **ativo**, depois **inativo**, depois **antigo**
3. Depois pela última atividade, do mais recente para o mais antigo

Cada grupo é expansível. Expandir revela cada sessão individual pertencente àquele dispositivo.

## Como ler um grupo de dispositivos

| O que você vê                      | Significado                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Etiqueta do dispositivo**       | Fabricante e modelo quando conhecidos, caso contrário o sistema operacional e sua versão   |
| Ícone do tipo de dispositivo      | Telefone, tablet ou monitor                                                                 |
| **Etiqueta do navegador**          | O navegador e versão por trás da sessão                                                    |
| **Distintivo de status da sessão**| Veja a tabela abaixo                                                                        |
| **Última atividade**               | Tempo relativo — "agora mesmo", N minutos / horas / dias atrás, e uma data absoluta se for mais de uma semana |
| **Contagem de sessões**            | Quantas sessões aquele dispositivo possui                                                  |
| **Localização**                   | Cidade, país e endereço IP                                                                 |
| **Criado em**                    | Quando aquela sessão foi iniciada                                                          |
| **Dispositivo Atual** / **Sessão Atual** | Distintivo destacado no dispositivo e sessão que o rider está usando no momento           |

### Distintivos de status

| Distintivo   | Significado                          |
| ------------ | ----------------------------------- |
| **ativo**    | Última atividade há menos de uma hora |
| **inativo**  | Última atividade há menos de 24 horas |
| **antigo**   | Última atividade há 24 horas ou mais  |

O distintivo mede **apenas a recência** — não indica se uma sessão ainda é válida. Um distintivo "antigo" não significa que a sessão expirou.

## Desconectando uma sessão

A sessão atual não possui controle de exclusão — por design, não pode ser removida desta lista. Qualquer outra sessão pode ser:

1. Expanda o grupo do dispositivo
2. Toque no ícone de **lixeira** na sessão
3. Confirme na caixa de diálogo

A lista é recarregada e a sessão desaparece.

## Ações em massa

| Ação                        | O que faz                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Desconectar Outras Sessões** | Desconecta todas as sessões exceto a do dispositivo que o rider está usando. Esta é a ação correta quando o rider suspeita que outra pessoa tem acesso |
| **Desconectar Todas as Sessões** | Desconecta tudo, **incluindo o dispositivo atual**, fazendo com que o rider volte para a tela de login e precise entrar novamente. Estilizado como destrutivo por esse motivo |
| **Revogar Dispositivo**      | Disponível em um grupo de dispositivo expandido que não seja o dispositivo atual — desconecta todas as sessões naquele dispositivo |

Enquanto uma solicitação de desconexão está em andamento, os botões ficam desabilitados. Uma falha exibe uma mensagem curta de erro; um sucesso exibe uma confirmação e recarrega a lista.

## Fluxos de trabalho típicos

- **O rider acha que outra pessoa está na conta dele** — **Desconectar Outras Sessões**, depois alterar a senha em **Perfil**. Note que uma alteração de senha bem-sucedida também desconecta o rider, que precisará entrar novamente depois ([Perfil](profile.md))
- **Um login esquecido em um telefone emprestado** — expanda o grupo daquele dispositivo, **Revogar Dispositivo**
- **Começar limpo em todos os lugares** — **Desconectar Todas as Sessões**, depois entrar novamente ([Entrando](registration-login.md))

## FAQ

- **Por que o rider não pode excluir a sessão atual?** Nenhum controle de exclusão é mostrado para ela. Para encerrar a sessão atual, use **Desconectar Todas as Sessões** ou o botão normal **Sair** no Perfil.
- **O que "ativo" realmente significa?** Atividade na última hora — nada mais.
- **Por que um telefone mostra várias sessões?** Sessões são criadas a cada login. A tela as agrupa sob um dispositivo e mostra a contagem.
- **O botão Gerenciar Sessões está desabilitado.** A conta tem uma exclusão pendente, o que desabilita o gerenciamento de sessões junto com a edição do perfil — veja [Perfil](profile.md).

## Relacionados

- [Perfil](profile.md) — alteração de senha, sair, exclusão de conta
- [Configurações](../help/settings.md) — o cartão Privacidade que também linka para aqui
- [Privacidade](privacy.md) — política de privacidade e diretrizes de segurança
