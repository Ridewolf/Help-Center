# Detalhes da Corrida

A página de detalhes da corrida (`/rides/:id`) é a bancada de trabalho para uma única viagem. Use-a para investigar reclamações, auditar cobranças, tomar ações do operador (pausar, reembolsar, arquivar) e revisar o registro completo de eventos.

Você geralmente chega aqui clicando em uma linha na [lista de Corridas](rides.md) ou a partir do perfil de um cliente.

Permissão necessária: **Corridas** (`i1j2k3`).

## Layout

De cima para baixo:

1. **Cabeçalho** — fatos principais + o botão _Ações_
2. **Cartões de visão geral** — duração, distância, custo, status
3. **Cartões de informações** — informações da corrida, detalhamento, resumo da tarifa
4. **Abas** — Detalhes (mapa da rota + linha do tempo) e Atividade (registro completo de eventos)

## Cabeçalho

A faixa superior identifica a corrida rapidamente:

- **Botão Voltar** (`←`) retorna à lista
- **ID da Corrida** com um ícone de _Copiar_
- **Indicador de status** (Ativo, Concluído, Cancelado, etc.)
- Links para **Cliente** e **Veículo**
- **Carimbos de data/hora de início → fim** e **custo principal**
- Botão **Ações** à direita — abre o diálogo de ações (descrito abaixo)

## Ações

Clique em **Ações** no cabeçalho para abrir um diálogo com todas as ações do operador disponíveis para esta corrida. As ações se desabilitam conforme o status da corrida e suas permissões, com uma dica explicando o motivo:

| Ação                  | Quando habilitada                      | Permissão       |
| --------------------- | ------------------------------------ | --------------- |
| **Pausar / Retomar**  | A corrida deve estar ativa para pausar ou retomar | `pause-unpause` |
| **Encerrar corrida**  | A corrida deve estar ativa para encerrar | `end-ride`      |
| **Ver rota no mapa**  | Sempre (vai para a aba do mapa)       | —               |
| **Reembolsar corrida**| A corrida deve estar concluída para reembolsar | refund-related  |
| **Enviar notificação**| Sempre (envia uma notificação push ao usuário) | notification    |
| **Arquivar corrida**  | Sempre                               | archive         |

Passe o mouse sobre uma ação desabilitada para ver o motivo pelo qual não está disponível (ex.: "A corrida deve estar concluída para reembolsar").

O diálogo de _Ações_ no cabeçalho é o **superconjunto** do que está disponível; o menu na linha da página de lista traz apenas as três mais comuns (Pausar / Retomar / Encerrar). Para reembolsos, visualização de rota, notificações push e arquivamento — vá para aqui.

## Cartões de visão geral

Uma linha com quatro pequenos cartões abaixo do cabeçalho mostra fatos rápidos:

- **Duração** — tempo total da corrida
- **Distância** — distância total percorrida
- **Custo** — custo total cobrado
- **Status** — status atual da corrida (espelha o indicador do cabeçalho, maior e mais destacado)

## Cartões de informações

Uma grade com três cartões fica abaixo da visão geral, mostrando os dados principais da corrida:

- **Informações da corrida** — veículo, cliente, tarifa, IDs, carimbos de data/hora
- **Detalhamento** — composição do custo minuto a minuto (taxa inicial, tempo, distância, modificadores, descontos)
- **Detalhes da tarifa** — o resumo da tarifa usado para esta corrida (para que você veja exatamente o que foi cobrado ao cliente, mesmo que a tarifa tenha mudado depois)

## Abas

Abaixo dos cartões, o detalhe alterna entre duas abas:

| Aba           | Conteúdo                                                                                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detalhes**  | Mapa da rota, linha do tempo de eventos significativos, cartões de informações completos                                                                   |
| **Atividade** | Registro cronológico de eventos — toda mudança de estado, sinal e ação do sistema vinculada a esta corrida — mais amplo que a linha do tempo de Detalhes (útil para depuração de IoT) |

### Mapa da rota

Dentro da aba Detalhes, o mapa da rota mostra o traçado GPS da corrida:

- **Marcadores de início / fim** com seus endereços
- **Polilinha** colorida pela velocidade (segmentos lentos vs. rápidos)
- **Sobreposições de zonas** se a corrida entrou em áreas restritas
- **Legenda** explicando a escala de cores
- **Zoom / pan** com mouse ou gestos de dois dedos

### Linha do tempo

Abaixo do mapa, uma linha do tempo vertical lista todos os eventos significativos da corrida:

- **Início da corrida** (com veículo destrancado)
- **Pausas / retomadas** (se houver)
- **Entradas / saídas de zona**
- **Avisos de velocidade**
- **Fim da corrida** (com bloqueio / comprovante de estacionamento, se houver)
- **Eventos de pagamento**

Use a linha do tempo para investigar disputas ("o usuário diz que foi cobrado após o fim da corrida") — cada evento tem carimbo de data/hora.

### Aba Atividade

A aba Atividade mostra o registro completo de eventos incluindo ações em nível de sistema — mais amplo que a linha do tempo de Detalhes. Use-a quando a linha do tempo simples não tiver detalhes suficientes (ex.: para depuração técnica de um problema de IoT).

## Fluxos típicos de trabalho

- **Investigar uma reclamação de cliente** — leia o detalhamento, depois o mapa da rota e a linha do tempo; a linha do tempo raramente mente
- **Auditar uma decisão de reembolso** — abra o cartão de detalhamento; os itens mostram exatamente o que o cliente pagou, depois clique em _Ações → Reembolsar corrida_
- **Pausar e ligar para o cliente** — _Ações → Pausar_ congela a corrida; _Ações → Enviar notificação_ avisa o cliente; _Retomar_ quando ele voltar
- **Encerrar uma corrida travada** — para corridas que nunca fecham (perda de conectividade, cliente deixou o veículo ligado), use _Ações → Encerrar corrida_ para forçar o fechamento — o sistema usará a última posição conhecida para o comprovante de estacionamento

## Dicas

- **Leia a dica de ferramenta da ação desabilitada** — botões desabilitados não estão quebrados; a dica informa em qual estado a corrida precisa estar
- **Copie o ID da corrida** do cabeçalho para colar em uma conversa de suporte ou em uma consulta no backend
- **Os detalhes da tarifa mostram a tarifa _como era_** — mesmo que a tarifa tenha sido editada depois, a captura é preservada para fins de auditoria
- **A caixa de diálogo de Ações é o menu completo** — não procure reembolso/arquivar na lista; eles ficam aqui
