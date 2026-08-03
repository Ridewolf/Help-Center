# Detalhe do Comprovante de Estacionamento

A página de detalhe do comprovante de estacionamento (`/support/park-proofs/:id`) é onde você inspeciona um comprovante em profundidade e — se ainda estiver pendente — modera-o. Ela abre como um grande diálogo sobre a [lista de Comprovantes de Estacionamento](park-proofs.md); a URL muda para que o comprovante possa ser compartilhado / acessado diretamente.

Você geralmente chega aqui clicando em _Visualizar_ em uma linha, clicando em uma miniatura na visualização em galeria, ou colando uma URL direta.

Permissão necessária: **Comprovantes de Estacionamento** (`d5e6f7`). A sub-permissão `review` habilita as ações de moderação, `delete` habilita o botão Excluir.

## Como se relaciona com a página de revisão

Ambas `/support/park-proofs/:id` (esta página) e `/support/park-proofs/:id/review` existem — elas parecem similares mas servem a propósitos diferentes:

| Superfície                                                                         | O que é                                                                                                                                    |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detalhe do Comprovante de Estacionamento (esta página)**                        | Um **diálogo** aberto a partir da lista — imagem completa com zoom, contexto completo, conjunto completo de ações. Visualização de registro único. URL `/support/park-proofs/:id` |
| [Revisão do Comprovante de Estacionamento](park-proof-review.md)                   | Uma **página em tela cheia** (`/:id/review`) — a superfície dedicada para revisão de um comprovante                                        |
| [Revisão Automática do Comprovante de Estacionamento](park-proof-auto-review.md)   | **Modo simplificado** — fila automática de comprovantes pendentes, um de cada vez                                                        |

No dia a dia: use **Revisão Automática** para limpar a fila, o **diálogo de detalhe** (esta página) para inspeção pontual a partir da lista, e a **página de revisão** para o fluxo dedicado do revisor.

## Layout

O diálogo é dividido em duas colunas em telas largas, empilhado em telas estreitas:

| Coluna           | Largura | Conteúdo                                                                                              |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| **Imagem (esquerda)** | 3/5     | A foto em resolução total com zoom, em fundo preto                                                  |
| **Informações (direita)** | 2/5     | Cabeçalho (título + badges de status / tipo), contexto (cliente / corrida / veículo), grade de detalhes, ações de revisão |

## Imagem (coluna esquerda)

Um visualizador de imagem grande com a foto em resolução total sobre fundo preto:

- **Clique na imagem** para alternar o zoom (1× → 2× → 3× → 4× → volta para 1×)
- **Roda do mouse** para aumentar ou diminuir o zoom em passos de 0,5×
- O cursor alterna entre zoom-in / zoom-out dependendo do estado
- Um **badge de % de zoom** aparece no canto superior esquerdo sempre que o zoom estiver acima de 1×

Quatro botões aparecem no canto inferior direito ao passar o mouse (semi-transparentes sobre o fundo preto):

| Botão               | O que faz                                                                    |
| -------------------- | ----------------------------------------------------------------------------- |
| **Aumentar zoom**    | Passo de zoom +0,5× (limitado a 4× máximo)                                   |
| **Diminuir zoom**    | Passo de zoom -0,5× (até 1× mínimo)                                          |
| **Minimizar**        | Reseta o zoom para 1×                                                        |
| **Abrir em nova aba** | Abre a imagem em resolução original em uma nova aba do navegador para inspeção mais detalhada |

Procure os mesmos sinais que na [página de revisão](park-proof-review.md): veículo inteiro no quadro, local de estacionamento legal, descanso lateral abaixado, qualquer coisa que contradiga a alegação do usuário.

## Cabeçalho (topo da coluna direita)

A faixa do cabeçalho identifica o comprovante:

- **Título** _"Revisar Comprovante de Estacionamento"_ com uma breve descrição abaixo
- Dois **badges** empilhados à direita:
  - **Badge de status** — colorido para combinar com o status (amarelo Pendente, verde Aprovado, laranja Aviso, vermelho Rejeitado, escuro Bloqueado)
  - **Badge de tipo** — pílula contornada mostrando _Início_ / _Estacionamento_ / _Fim_

## Seção de contexto

Três linhas com links para entidades relacionadas. Cada uma é um router-link (clique para abrir a página de detalhe relacionada na mesma janela):

| Linha         | Mostra                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Cliente**   | Nome do cliente (linkado para o [detalhe do cliente](../../operations/customers/client-detail.md)), email + telefone (clique para copiar) |
| **Corrida**   | Nome / id da corrida linkado para o [detalhe da corrida](../../operations/trips/ride-detail.md)                      |
| **Veículo**   | Etiqueta do veículo linkada para o [detalhe do veículo](../../operations/fleet/vehicle-detail.md), tipo do veículo abaixo |

Use essas referências cruzadas para construir o contexto rapidamente — este cliente já violou antes, ele realmente terminou a corrida aqui, este veículo foi sinalizado frequentemente.

## Seção de detalhes

Uma grade de chave/valor em duas colunas abaixo do contexto. Os campos que aparecem dependem do estado do comprovante:

| Campo               | Quando exibido             | O que mostra                                                                                                                                                                                                                                  |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Criado**          | Sempre                     | Quando o app do rider enviou a foto                                                                                                                                                                                                           |
| **Revisado em**     | Apenas após revisão        | Quando um operador (ou Revisão Automática) tomou a decisão                                                                                                                                                                                    |
| **Duração da revisão** | Apenas após revisão      | Tempo entre Criado → Revisado (ex.: "2h 14m") — útil para medir SLA em relação ao comprovante                                                                                                                                                |
| **Revisado por**    | Apenas após revisão do operador | O operador que revisou. Linkado ao [perfil do operador](../../settings/access/operators.md). Se o operador não puder ser resolvido (404, sem permissão), o id aparece como link clicável — a página do perfil gerencia sua própria autenticação |
| **Localização**     | Quando a corrida tem coordenadas | Lat / lng do início da corrida (para comprovantes de _Início_) ou fim (para comprovantes de _Estacionamento_/_Fim_), com 6 casas decimais                                                                                                      |

Se o comprovante foi rejeitado com multa, um alerta vermelho _Multa_ é exibido abaixo dos detalhes com o valor da multa na moeda da empresa.

Se existir um comentário ou motivo de rejeição anterior, ele aparece como uma seção _Comentário_ abaixo.

## Ações de revisão (apenas pendentes)

Se o status do comprovante for **Pendente**, um seletor de ação aparece na parte inferior da coluna direita. O diálogo de detalhes suporta **cinco** ações de moderação (uma a mais que a página dedicada de revisão):

| Ação                     | Efeito no status | Campos extras         | Quando usar                                                                         |
| ------------------------ | ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Aprovar**              | _Aprovado_       | —                     | Foto claramente boa — sem necessidade de comentário                                 |
| **Aprovar com comentário** | _Aprovado_     | Comentário obrigatório | Foto é boa, mas deseja registrar uma nota (caso raro, referência futura, treinamento ML) |
| **Avisar**               | _Aviso_          | Comentário recomendado | Foto não é ideal — rider recebe notificação leve, sem multa                         |
| **Rejeitar**             | _Rejeitado_      | Comentário + valor da multa | Foto ruim — multa aplicada. Multa debitada da carteira ao enviar                    |
| **Bloquear**             | _Bloqueado_      | Comentário obrigatório | Infração grave / repetida — bloqueia o rider de futuras corridas                    |

Cada ação aparece como um cartão de rádio clicável com descrição; ao selecionar, os campos condicionais aparecem (área de texto para comentário e/ou campo para valor da multa). O botão principal de envio adota a cor da ação (verde / amarelo / vermelho / escuro).

Após enviar, o diálogo fecha, uma notificação confirma a ação e a lista é atualizada.

### O que é diferente da página de revisão

A página dedicada de [revisão](park-proof-review.md) (`/:id/review`) mostra **quatro** ações como botões empilhados. Este diálogo mostra **cinco** ações como cartões de rádio — a extra é _Aprovar com comentário_, útil para registrar contexto numa decisão positiva sem escalar para aviso.

## Comprovantes fechados (já revisados)

Se o comprovante já foi revisado (Aprovado / Aviso / Rejeitado / Bloqueado), a seção de ações fica oculta — o diálogo vira somente leitura. Você ainda vê todo o contexto (imagem, cliente / corrida / veículo, detalhes, multa, comentário, quem revisou e quando), e ainda pode:

- **Excluir** o registro (com permissão `delete`) — apenas para uploads de spam / teste / corrida errada
- **Fechar** o diálogo

Para alterar uma decisão depois do fato, fale com seu administrador — o fluxo padrão não permite reavaliação pela interface.

## Rodapé

| Botão             | Quando visível                                  | O que faz                                                                                                                        |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Excluir**       | Sempre, se você tiver a sub-permissão `delete` | Remove o registro do comprovante completamente (com confirmação). Use apenas para uploads de teste / spam / corrida errada — não como escolha de moderação |
| **Cancelar**      | Apenas pendente                                 | Fecha o diálogo sem enviar                                                                                                       |
| **Enviar ação**   | Apenas pendente, após escolher uma ação         | Envia a ação selecionada (cor combinada com a ação)                                                                              |
| **Fechar**        | Comprovantes revisados                          | Fecha o diálogo                                                                                                                  |

Fechar o diálogo (Cancelar / Fechar / Esc / clique na sobreposição) remove `/:id` da URL para que o histórico de voltar / avançar corresponda ao que você vê.

## Fluxos de trabalho típicos

- **Investigar um comprovante da lista** — encontre o comprovante na lista (filtrar / pesquisar), clique na linha → o diálogo de detalhes abre → role pelo contexto → decida
- **Análise aprofundada de um comprovante multado** — pesquise pelo cliente → abra um dos comprovantes rejeitados → verifique o Revisado por + comentário para ver quem decidiu e por quê → use isso para resolução de disputas
- **Aprovação rápida a partir de um link direto** — receba uma URL de um colega → clique → o diálogo abre → dê zoom na foto → Aprovar / Aprovar com comentário
- **Verificar histórico do veículo** — abra um comprovante → clique no veículo → veja se o mesmo veículo continua recebendo fotos ruins de estacionamento → isso indica um problema de posicionamento / sinalização, não do usuário
- **Auditar decisões de um revisor** — filtre a lista pelo Status `Aprovado` → clique nos comprovantes para ver Revisado por + comentário → calibre os padrões da equipe

## Dicas

- **Zoom com roda do mouse é rápido** — você não precisa do botão — basta girar a roda sobre a imagem
- **A imagem abre em uma nova aba em resolução total** — quando o zoom dentro do diálogo não for suficiente (ex: ler uma placa do tamanho de uma placa de carro), abra externamente
- **"Aprovar com comentário" é melhor que aprovação silenciosa** para casos limite — deixe uma nota de uma linha que o próximo revisor (ou você em três meses) agradecerá
- **Bloquear é definitivo** — usuários podem ser desbloqueados via o [detalhe do cliente](../../operations/customers/client-detail.md) mas para qualquer comprovante, _Bloquear_ é a escalada máxima. Não use na primeira infração
- **Excluir vs Rejeitar** — Rejeitar deixa um registro de moderação (e multa o usuário); Excluir apaga o comprovante completamente. Se quiser um registro, nunca exclua
- **A URL é compartilhável** — `/support/park-proofs/:id` leva direto aqui, sem navegação pela lista
- **Comprovantes fechados são somente leitura** — se você abriu um comprovante revisado esperando agir, é por isso que os botões sumiram
