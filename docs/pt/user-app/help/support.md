# Rider App — Suporte, FAQ e Chat ao Vivo

Suporte (`/support`) é onde o usuário busca ajuda. Possui duas abas — **FAQ** e **Contato** — e o chat ao vivo abre em uma tela própria (`/support/messenger`).

Duas coisas para saber antes de responder qualquer pergunta sobre suporte:

- **Cada canal de contato é configurável por você.** Não existe um email, telefone ou horário de atendimento global da Ridewolf no app — nunca informe um desses.
- **O app tem um chat, não um formulário de ticket.** Usuários não recebem números de ticket. A visão da sua equipe sobre as mesmas conversas está em [Conversas](../../support/tickets-proofs-chat/conversations.md); [Bilhetes](../../support/tickets-proofs-chat/tickets.md) é um conceito do lado do operador.

## Aba FAQ

Seções em acordeão construídas a partir do seu conteúdo publicado de perguntas e respostas, além de itens do **Guia de Corrida** divididos em grupos **Antes de Começar** e **Antes de Terminar**.

Você controla tudo isso sem precisar lançar uma atualização do app:

- Perguntas e respostas — [Conjuntos de FAQ](../../settings/content/faq-sets.md)
- Guias do Guia de Corrida — [Guias rápidos](../../settings/content/quick-guides.md)

Itens individuais do FAQ são **linkáveis diretamente**: um link para um item específico abre o Suporte com esse item já expandido e rolado para a visualização. Essa é a forma correta de enviar um usuário direto para uma resposta em vez de "olhar no FAQ".

## Aba Contato

Cada canal aqui é exibido somente quando você o habilita em [Minha Empresa → Seu App → canais de suporte](../../settings/administration/my-company.md).

| Canal         | O que faz                                                          |
| ------------- | ------------------------------------------------------------------- |
| **Chat ao Vivo** | Abre o mensageiro (`/support/messenger`)                          |
| **Email**     | Abre o app de email do usuário com seu endereço                    |
| **Website**   | Abre sua URL configurada no navegador dentro do app                |
| **Telegram**  | Abre seu contato do Telegram externamente                          |
| **WhatsApp**  | Abre seu contato do WhatsApp externamente                          |
| **Telefone**  | Inicia uma chamada para o número configurado                       |

Se **nenhum** estiver habilitado, a aba mostra uma ilustração de sem contatos. Um usuário que relata "não há como contatar o suporte" quase sempre está em uma empresa com todos os canais desativados — verifique sua própria configuração antes de procurar em outro lugar.

## Chat ao vivo

O mensageiro é baseado em conversas:

- O usuário vê sua **lista de conversas**, cada uma com um status, o operador designado, a última mensagem e seu horário, e uma contagem de não lidas.
- **Novo Chat** é oferecido **somente quando o usuário não tem conversa aberta.** Um usuário com um tópico aberto não vê como iniciar um segundo — por design. Ele continua o tópico existente.
- Abrir uma conversa carrega seu histórico de mensagens, 50 mensagens por vez, buscando mensagens mais antigas conforme o usuário rola para cima.

| Status da conversa | Significado                          |
| ------------------- | ------------------------------------ |
| **Novo**            | Acabou de abrir, ainda não atendido  |
| **Aguardando**      | Aguardando sua equipe                 |
| **Ativo**           | Sendo atendido                       |
| **Atrasado**        | Adiado                              |
| **Fechado**         | Fechado por um operador              |

**Tipos de mensagem que o app exibe:** texto, imagem, arquivo, localização, contato, corrida, link do app e mensagens do sistema.

**Ícones de status da mensagem:** enviando, enviado, entregue, lido e falhou.

### Enviando uma mensagem

Um usuário pode anexar:

- Até **5 imagens por mensagem**
- Um **pino de localização** (latitude, longitude e um rótulo)
- Um **arquivo**

Uma mensagem enviada aparece imediatamente como _enviando_, depois atualiza para seu status real conforme o servidor confirma. A mesma conexão ao vivo envia atualizações de nova mensagem e leitura, avisos de conversa fechada e conversa designada, e o indicador "_{nome} está digitando…_".

Após uma perda de conexão, o app recarrega a lista de conversas e o chat aberto, removendo duplicatas por mensagem — assim, um usuário que ficou offline não verá a mesma mensagem duas vezes.

Quando um operador **fecha** a conversa, a entrada do usuário é desabilitada e um aviso de "conversa fechada" a substitui.

## Solução de problemas

| O usuário diz…                           | O que é                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "Não há opções de contato"               | Nenhum canal está habilitado para sua empresa — corrija em [Minha Empresa](../../settings/administration/my-company.md)  |
| "Não vejo o botão Novo Chat"             | O usuário já tem uma conversa aberta; ele deve continuar esse tópico                                         |
| "Não consigo digitar mais"                | Um operador fechou a conversa. Uma nova pode ser iniciada quando não houver tópicos abertos                   |
| "Minha mensagem aparece como falhada"    | Ela nunca saiu do dispositivo — tente enviar novamente                                                      |
| "Minhas mensagens duplicaram após reconectar" | Não duplicaram; o recarregamento remove duplicatas. Peça uma captura de tela se insistirem                   |
| "Quão rápido vocês respondem?"            | Nenhum tempo de resposta é definido no app. **Não prometa um** — informe seu próprio compromisso de serviço publicado |
| "Onde reporto uma emergência?"            | Pelos canais que você habilitou. O app não define nenhum número de emergência, e nenhum número de emergência deve ser informado |

## Dicas

- **Audite sua aba Contato.** Abra o Rider App você mesmo após qualquer alteração em Minha Empresa — uma aba Contato totalmente vazia é invisível para você e irritante para os riders.
- **Use links diretos para respostas de FAQ** nas respostas do chat em vez de digitá-las novamente. Isso ensina aos riders onde a resposta está.
- **Uma conversa aberta por vez** é a regra. Quando um rider precisar levantar algo não relacionado, feche o tópico antigo primeiro.
- **Mantenha os Conjuntos de FAQ e Guias rápidos atualizados** — cada pergunta que eles respondem é um chat que você nunca terá.
- **Fechar uma conversa encerra a capacidade do rider de responder.** Certifique-se de que a resposta está completa antes de fechar.
