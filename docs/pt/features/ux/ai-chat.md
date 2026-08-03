# Chat de IA

O painel vem com um **assistente de IA** que entende o produto, pode ler dados ao vivo das telas em que você está e — com sua permissão — pode executar ações em seu nome. Trate-o como um colega sentado ao seu lado: faça uma pergunta, peça para fazer algo ou peça para explicar o que você está vendo.

## Abrindo o painel

Clique no **ícone de brilho** (✨) na barra superior. O chat abre como um painel lateral à direita.

- Se um pequeno distintivo de estrela `*` estiver brilhando no ícone, a IA produziu uma nova resposta desde a última vez que você olhou o painel.
- O painel também abre com `⌘ + K` / `Ctrl + K` na maioria das páginas (onde o atalho está configurado).

## O que ele pode fazer

Cinco categorias de capacidade, em ordem crescente de poder:

| Capacidade        | Exemplos                                                                    |
| ----------------- | ---------------------------------------------------------------------------- |
| **Explicar**      | "O que significa este status?", "Como crio uma tarifa?"                   |
| **Pesquisar**     | "Quantos veículos ativos na Zona A?", "Mostre os pagamentos falhados de ontem" |
| **Navegar**       | "Abra a página de corridas filtrada para hoje", "Leve-me ao veículo RW-001" |
| **Preencher formulários** | "Crie uma nova etiqueta chamada 'VIP' com cor vermelha e aplique ao cliente X" |
| **Modificar dados**| "Bloquear veículo RW-001", "Reembolsar pagamento #12345", "Enviar push para todos na Zona A" |

A IA usa as **mesmas APIs e as mesmas permissões** que você tem. Se você não pode executar uma ação manualmente, a IA também não pode fazê-lo em seu nome. Esta é a fronteira de segurança — não existe modo "superusuário IA".

## Dentro do painel

### Cabeçalho

- **Brilho + título** "Chat de IA"
- **Distintivo com nome do agente** à direita (a pílula verde com brilho) mostra qual agente está ativo — clique para abrir as configurações e trocar de agente
- **Distintivo de contexto** aparece abaixo da descrição assim que a conversa tem mensagens — mostra o quanto a janela de memória da IA está cheia (ex: "12 mensagens · 35% de contexto")

### Bolha de execução ao vivo

Quando a IA está trabalhando em algo com múltiplas etapas (pesquisando dados, abrindo páginas, chamando ferramentas), uma **bolha de status ao vivo** aparece mostrando cada passo em tempo real:

- _Pesquisando veículos…_
- _Abrindo /vehicles…_
- _Preenchendo formulário: Status = Ativo…_
- _Enviando…_

Você pode ler o que está acontecendo conforme ocorre e parar cedo se estiver indo para o caminho errado.

### Conversa

A conversa flui como um chat: mensagens do usuário à direita, respostas da IA à esquerda, renderizadas em markdown (listas, tabelas, código, links funcionam). Execuções de ferramentas podem ser expandidas para ver argumentos e respostas exatas — útil para verificar o que foi feito.

### Entrada

- **Digite uma mensagem** e pressione `Enter` para enviar; `Shift + Enter` para nova linha
- A entrada cresce conforme você digita
- Arquivos / imagens coladas não são suportados no chat atual

## Confirmando modificações

Para ações potencialmente destrutivas (excluir, reembolsar, mudar status, operações em massa), a IA mostra uma **confirmação inline** em vez de executar imediatamente:

- Um resumo do que está prestes a acontecer ("Reembolsar pagamento #12345 — $42,50 para John Doe")
- Botões **Confirmar** / **Cancelar**
- Nada acontece até você confirmar

Leia o resumo cuidadosamente — essa é a única verificação de segurança entre o entendimento da IA e seus dados.

## Configurações

Clique no **distintivo com nome do agente** no cabeçalho para abrir o diálogo de configurações:

- **Seleção de agente** — escolha a persona do agente (agentes diferentes são ajustados para tarefas diferentes: frota, suporte, análises)
- **Modelo** — escolha o LLM subjacente (quando múltiplos estão disponíveis)
- **Ferramentas permitidas** — desative ferramentas seletivamente (ex: bloquear modificações se quiser só perguntas e respostas)
- **Histórico da conversa** — limpar, exportar

## Janela de contexto

A IA tem uma memória finita da conversa atual. Conforme você conversa, o contexto vai enchendo; você verá isso como uma porcentagem no distintivo do cabeçalho.

- **Abaixo de 70%** — bastante espaço
- **70–90%** — ficando cheio; considere iniciar uma nova conversa para um tópico não relacionado
- **Acima de 90%** — mensagens antigas podem ser resumidas para abrir espaço; a IA pode esquecer detalhes iniciais

Começar uma conversa nova para uma tarefa nova é barato e mantém a IA afiada.

## Dicas

- **Seja específico** — "Bloquear RW-001" é melhor que "bloqueie aquela scooter que falamos"
- **Verifique antes de confirmar modificações** — leia o resumo no cartão de confirmação. A IA às vezes infere uma entidade que você não quis
- **Pergunte "o que você pode fazer aqui?"** em qualquer página — a IA sabe quais ferramentas são relevantes para a tela atual
- **Use para explicar dados desconhecidos** — cole um código de status ou rótulo da tela e pergunte "o que isso significa?"
- **Permissões ainda valem** — se a IA disser "não posso fazer isso", quase sempre é falta de permissão, não falta de recurso
- **Dados sensíveis** — trate o chat como a tela de um colega. Não cole senhas, números de cartão ou dados que você não quer que sejam registrados
- **Desconexões** — se a IA parar no meio da execução, role para cima para encontrar a última bolha de execução ao vivo; ela diz exatamente onde parou
