# Conversas

A página de Conversas (`/support/conversations`) é o **mensageiro do operador** — uma interface de chat em tempo real entre sua equipe de suporte e seus usuários. Cada conversa pertence a um cliente e contém todo o histórico de mensagens, as ações da sua equipe e as mudanças de status.

Permissão necessária: **Conversas** (`x2y3z4`).

## Como as conversas aparecem aqui

As conversas chegam por alguns fluxos:

1. **Usuário abre um chat** no aplicativo móvel — cria uma conversa _Nova_, fica na fila _Aguardando_
2. **Operador inicia** — _+ Novo_ na barra lateral permite iniciar um chat com um cliente específico (ex: para acompanhamento de uma multa ou verificação de fraude)
3. **Reaberto** — conversas fechadas podem ser reabertas (pelo usuário ou operador) e voltam ao topo da lista

A lista é **ao vivo** — novas conversas e mensagens entram via WebSocket sem precisar atualizar.

## Layout

A página tem duas áreas principais. O layout se adapta ao tamanho da tela:

- **Desktop** — visualização dividida, barra lateral à esquerda (30%) e conteúdo do chat à direita (70%), com uma alça para arrastar
- **Mobile** — uma área por vez: a lista da barra lateral, ou o chat aberto (seta de voltar retorna à lista)

## Barra lateral (esquerda)

A fila de conversas e filtros:

- **+ Novo** — abre um diálogo para buscar um cliente e iniciar uma conversa nova (status _Aguardando_)
- **Pesquisar** — busca por texto no nome do cliente, ID, última mensagem
- **Filtros de status** — pílulas com contadores: `Todos` / `Novos` / `Aguardando` / `Ativos` / `Atrasados` / `Fechados`
- **Cartões de conversa** — cada um mostra: avatar, nome do cliente, prévia da última mensagem, pílula de status, carimbo de data/hora, badge de não lido. Clique para abrir
- **Carregar mais** — paginação conforme você rola

A ordenação padrão coloca não respondidos (Aguardando / Ativos com não lidos) no topo — os chats mais urgentes estão sempre à vista.

### Referência de status

| Status      | Significado                                                |
| ----------- | ---------------------------------------------------------- |
| **Novo**    | Acabou de abrir, ninguém leu ainda                         |
| **Aguardando** | Não atribuído, na fila para qualquer operador atender     |
| **Ativo**   | Atribuído a um operador, conversa em andamento             |
| **Atrasado**| Operador colocou em espera (aguardando info, acompanhamento)|
| **Fechado** | Resolvido e fechado                                        |

## Conteúdo do chat (direita)

Quando você seleciona uma conversa, a coluna da direita mostra:

### Cabeçalho do chat

- **Seta de voltar** (somente mobile) — retorna à lista da barra lateral
- **Título** — nome do cliente com a pílula de status da conversa
- **Abrir info** — abre a [barra lateral de Informações do Usuário](#painéis-de-informação) com o contexto completo do cliente
- Botões **Atrasar / Transferir / Fechar** dependendo do status

### Janela do chat

- **Balões de mensagem** — mensagens do operador à direita (cor de destaque), mensagens do usuário à esquerda; com carimbos de data/hora e indicadores de leitura
- **Indicador de digitação** — mostra quando o usuário está digitando
- Botão **Carregar mensagens antigas** no topo — busca mensagens anteriores sob demanda
- Botão **Para mensagens novas** — atalho para rolar até o fim quando você rolou para cima
- **Ações da mensagem** ao passar o mouse — Editar / Excluir nas suas próprias mensagens

### Respostas prontas

Uma linha acima do campo de entrada mostra modelos de resposta rápida agrupados por categoria. Clique em um para inserir o texto no campo — você pode editar antes de enviar.

### Rodapé do chat

O que aparece no rodapé depende do **status** da conversa e da atribuição:

- **Ativo + atribuído a você** → **Campo de mensagem** com menu de anexos (texto + imagem / arquivo)
- **Qualquer outro** → barra de **Ações da Conversa** com os botões relevantes ao estado atual

## Ações da conversa (por status)

O rodapé mostra os botões certos para o status atual. Ações comuns:

| Ação          | Disponível quando…                  | O que faz                                            |
| ------------- | ---------------------------------- | ---------------------------------------------------- |
| **Aceitar**   | Aguardando / Novo (você ainda não é dono) | Atribui a conversa a você e muda para _Ativo_       |
| **Assumir**   | Ativo (outro operador é dono)      | Reatribui para você                                  |
| **Devolver**  | Ativo (atribuído a você)            | Libera a conversa de volta para _Aguardando_         |
| **Atrasar**   | Ativo                             | Coloca a conversa em espera → _Atrasado_             |
| **Reabrir**   | Fechado                           | Traz de volta para _Ativo_                            |
| **Fechar**    | Ativo                             | Marca a conversa como resolvida → _Fechado_          |
| **Excluir**   | Permissão restrita                 | Exclui a conversa suavemente (estilo admin)          |
| **Novo**      | Sempre                           | Inicia uma conversa nova com o mesmo cliente          |

Você está protegido contra agir em um chat que não é seu — você verá um botão _Assumir_ em vez do campo de mensagem quando o chat estiver atribuído a outra pessoa.

## Painéis de informação

Dois painéis deslizantes abrem a partir das ações da janela do chat:

- **Barra lateral de Informações do Usuário** — contexto rápido para o operador atribuído (você) e a atividade recente do usuário neste chat
- **Ficha de Informações do Cliente** — o perfil completo do cliente (saldo, status, etiquetas, corridas recentes) sem sair do chat — útil para decisões rápidas

## Estado vazio (desktop)

Quando nenhum chat está selecionado no desktop, o painel da direita mostra uma ilustração de estado vazio com uma dica para escolher uma conversa. No mobile o painel da direita não existe até você selecionar uma — a lista da barra lateral ocupa a tela.

## Fluxos típicos

- **Atender um chat aguardando** — `Status = Waiting` → clique no cartão superior → _Aceitar_ → comece a conversar
- **Assumir uma conversa de um colega** — abra o chat (você verá que está com outra pessoa) → _Assumir_ (use com moderação; interrompe a continuidade do rider)
- **Esfriar uma conversa lenta** — quando o rider para de responder, _Adiar_ para removê-la da sua fila ativa; ela retorna à sua caixa de entrada quando ele responder
- **Encerrar** — problema resolvido → _Fechar_ com uma resposta rápida padrão ("Tudo certo, boa corrida!")
- **Obtenha o contexto do rider rapidamente** — _Abrir info_ no cabeçalho → veja saldo / corridas recentes / etiquetas antes de responder a uma dúvida de cobrança
- **Use respostas padrão** — para respostas repetitivas (política de reembolso, processo de item perdido), escolha um modelo e personalize

## Dicas

- **Ao vivo por padrão** — novas mensagens aparecem sem precisar atualizar; o contador de notificações atualiza automaticamente
- **Não respondidos primeiro** — a ordenação mantém chats urgentes no topo; confie na ordem da lista
- **Respostas padrão são modelos, não scripts** — sempre personalize a saudação e a frase de encerramento; riders percebem quando recebem respostas prontas
- **Assuma com cuidado** — o rider não vê o estado do operador. Trocar no meio da conversa pode parecer estranho; assuma só quando o operador atual estiver claramente indisponível (offline, fora do turno)
- **Adiar > Fechar em casos incertos** — se achar que o problema pode voltar, _Adiar_ mantém o tópico vinculado; _Fechar_ faz o rider abrir uma nova conversa se quiser continuar
- **Edite apenas suas próprias mensagens** — e corrija só erros pequenos; reescrever uma mensagem antiga depois que o rider leu pode prejudicar a confiança
- **A URL tem o ID da conversa** — cole-a em um ticket ou nota de escalonamento para que o próximo operador acesse direto
