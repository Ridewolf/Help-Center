# Registros de Erro

Registros de Erro (`/error-logs`) é uma **ferramenta interna de diagnóstico** que lista erros reportados pelo painel e pelo aplicativo móvel do rider — exceções JavaScript e chamadas de API falhadas — com o rastreamento de pilha, o contexto da requisição e, quando disponível, uma captura de tela e um mapa do local onde o usuário estava.

Use quando alguém reportar _"o app travou"_ ou _"disse que algo deu errado"_ e você precisar do erro real por trás disso.

## Onde encontrar

- `/error-logs` — a lista
- `/error-logs/:id` — um erro único

Não há **entrada na barra lateral**. Você acessa digitando a URL diretamente — é uma ferramenta de diagnóstico para engenheiros e administradores, não parte da navegação normal do operador (como [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), é uma superfície não listada).

**Acesso:** a página precisa de uma chave de API de relatório de erros configurada para seu ambiente, além da sua sessão normal de login. Se a página não retornar nada, a primeira coisa a verificar é a ausência da chave para esse ambiente — pergunte ao seu administrador.

## Visualização da lista

- Lista paginada, começando na página 1 com 100 linhas por página; o controle de paginação ajusta o tamanho da página a partir daí.
- Um dropdown **fonte** filtra de onde o erro veio: **painel** ou **app**.
- Um controle de **atualizar** fica no cabeçalho. A atualização automática está **desligada por padrão**; você pode escolher um intervalo de 10 segundos, ou 1 / 5 / 15 / 30 minutos. A sondagem pausa enquanto a aba está oculta e retoma quando você volta, para que uma aba em segundo plano não continue sondando.

Fonte mais página/limite são os únicos filtros — não há filtro por usuário, email ou intervalo de tempo.

## Interpretando o distintivo

Cada linha carrega um distintivo que é seu **sinal de triagem mais rápido**:

- Um **número** (status HTTP) → a linha é uma **chamada de API falhada**; o problema aponta para o backend ou a requisição.
- Uma **palavra** → a linha é do lado do cliente; o tipo é estimado a partir do texto da mensagem: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (login, autenticação), **Network** (rede, fetch, timeout), **Cancelled**, ou o genérico **Error**.

Trate os distintivos de palavra como uma heurística aproximada sobre a string da mensagem, não uma classificação enviada pelo relator.

## Visualização detalhada

A página de erro único exibe:

- os metadados do erro e o **rastreamento de pilha**
- a **URL** onde ocorreu, e o **user agent** (analisado em navegador, SO, dispositivo, hardware e informações de tela)
- uma **captura de tela**, embutida, quando anexada ao relatório
- um **mini mapa** com um marcador vermelho, quando coordenadas válidas foram capturadas — isso torna visíveis bugs específicos de localização, como uma borda de zona ou uma má fixação de GPS

Os carimbos de data/hora são mostrados no formato tempo atrás.

## Referência de campos

- **id** — identificador do erro
- **source** — `dashboard` ou `app`
- **message** / **stack** — o erro e seu rastreamento de pilha
- **url** — a página ou endpoint onde ocorreu
- **userAgent** — o user agent bruto; é analisado para informações do dispositivo, e é também de onde vêm as coordenadas do mapa
- **metadata** — o contexto estruturado: a requisição (método, endpoint, corpo) e resposta (status, corpo) para erros de API; id do usuário / email / função quando o relatório identificou um usuário; versões do painel e app, runtime, plataforma; a captura de tela; e contexto WebSocket (código de fechamento / motivo, tentativa de reconexão) quando o erro veio de um socket
- **clientTimestamp** — retirado do relógio do dispositivo, pode estar errado
- **createdAt** — o carimbo de data/hora do servidor; **o confiável para ordenação**

Nem todo relatório identifica um usuário — o email pode estar vazio.

## Perguntas comuns

- **A página está vazia ou não autorizada.** Verifique se a chave de relatório de erros está configurada para este ambiente e se você está logado. Pergunte ao seu administrador.
- **Não encontro no menu.** Não há entrada de navegação — acesse `/error-logs` diretamente.
- **Nenhuma captura de tela exibida.** Esse relatório não tinha uma; nem todo erro tem.
- **Nenhum mapa exibido.** Nenhuma coordenada válida foi capturada para esse relatório.
- **Carimbos de data/hora discordam.** Compare `createdAt` (servidor) com `clientTimestamp` (relógio do dispositivo) — um relógio do dispositivo fora de sincronia explica a diferença.
- **Preciso dos erros de um usuário.** Não há filtro por usuário ou email; filtre por fonte e navegue pela lista.
- **A lista parece desatualizada.** A atualização automática está desligada por padrão — escolha um intervalo no controle de atualização, e lembre-se que a sondagem pausa enquanto a aba está em segundo plano.
- **Um distintivo diz "Runtime" mas eu esperava um código de status.** Essa linha não tinha contexto de requisição/resposta, então o distintivo usou uma estimativa do tipo a partir do texto da mensagem.
