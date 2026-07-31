# Revisão de Comprovante de Estacionamento

A página de revisão (`/support/park-proofs/:id/review`) é onde você modera uma foto de comprovante de estacionamento em detalhes. A imagem completa, todo o contexto relacionado (cliente / corrida / veículo) e o menu completo de ações estão aqui.

Você geralmente chega aqui clicando na miniatura (ou _Visualizar_ no menu da linha) na [lista de Comprovantes de Estacionamento](park-proofs.md).

Permissão necessária: **Comprovantes de Estacionamento** (`d5e6f7`) + subpermissão `review` para as ações de moderação.

## Layout

A página é dividida em três colunas em telas largas, empilhadas em telas mais estreitas:

| Coluna         | Largura | Conteúdo                                           |
| -------------- | ------- | ------------------------------------------------- |
| **Imagem**     | 5/12    | A foto em tamanho real com zoom e panorâmica      |
| **Ações**      | 4/12    | Botões de moderação, comentário opcional, Excluir admin |
| **Cartões de info** | 3/12 | Cliente, Corrida, Veículo, detalhes do comprovante |

## Imagem (coluna esquerda)

Um **visualizador de imagem com zoom** com a foto em resolução total:

- **Clique + arraste** para mover quando estiver com zoom
- **Roda do mouse** (ou pinça no celular) para dar zoom
- **Clique duplo** para resetar o zoom

Procure por:

- O veículo inteiro enquadrado (não só uma roda)
- Uma vaga de estacionamento legal (não bloqueando pedestres, não em zona proibida)
- O descanso lateral abaixado, veículo em pé
- Qualquer coisa que contradiga a história do usuário se houver disputa

## Ações (coluna do meio)

Os quatro botões de moderação empilham verticalmente, em ordem de severidade:

| Botão                | Efeito no status | Use quando                                                              |
| --------------------- | ---------------- | ----------------------------------------------------------------------- |
| **Aprovar**           | _Aprovado_       | Foto está boa — usuário estacionou corretamente                         |
| **Avisar**            | _Aviso_          | Foto não está ótima mas não suficiente para multa — usuário recebe notificação |
| **Rejeitar com multa**| _Multado_        | Foto está ruim — aplica multa do valor que você inserir abaixo do botão |
| **Bloquear**          | _Bloqueado_      | Violação grave / repetida — bloqueia o usuário para futuras corridas    |

Cada ação requer a subpermissão `review`. Ações que você não pode executar são ocultadas ou desabilitadas.

### Valor da multa

O botão **Rejeitar com multa** tem um campo numérico logo abaixo para o **valor da multa** na moeda da empresa. A multa é debitada da carteira do cliente (ou do método de pagamento padrão do cliente, dependendo da configuração). O valor é obrigatório ao clicar em _Rejeitar com multa_ — caso contrário, o botão fica desabilitado.

### Comentário

Uma área de texto **Comentário** fica abaixo dos botões de ação. O que você digitar é anexado à ação e salvo em:

- O registro do comprovante (para auditorias futuras)
- O [Registro de Atividades do cliente](../../operations/customers/client-detail.md#aba-atividade) (para que qualquer pessoa investigando o cliente depois veja sua nota)
- A notificação no app do usuário (dependendo da ação — eles veem o contexto do motivo do aviso / multa)

Escreva o comentário **antes** de clicar na ação — ele é enviado junto com a ação, não depois. Seja específico: "patinete bloqueando calçada, foto tirada às 22:14" é melhor que "estacionamento ruim".

### Excluir (admin)

Um botão **Excluir** na parte inferior (visível apenas com permissão de admin) remove o registro do comprovante completamente. Use para:

- Fotos de teste / uploads de spam
- Uploads duplicados (mesma corrida, várias fotos idênticas)
- Fotos enviadas para a corrida errada (erro de dados)

Não use Excluir em vez de Aprovar / Rejeitar — Excluir serve para _remover o registro do sistema_, não para decisões de moderação.

## Cartões de info (coluna direita)

Três cartões de "entidade relacionada" mais um cartão de detalhes empilham verticalmente:

- **Cliente** — nome, telefone, email, status, links para a [página de detalhes do cliente](../../operations/customers/client-detail.md)
- **Corrida** — ID da corrida, horários de início/fim, distância, custo; link para a [página de detalhes da corrida](../../operations/trips/ride-detail.md)
- **Veículo** — etiqueta, modelo, status; link para a [página de detalhes do veículo](../../operations/fleet/vehicle-detail.md)
- **Detalhes do Comprovante de Estacionamento** — tipo (início/estacionamento/fim), criado em, coordenadas GPS, qualquer veredito de auto-revisão já aplicado

Use esses cartões para **construir contexto rapidamente**:

- Este cliente é um infrator pela primeira vez ou reincidente? — abra Cliente → Atividade
- Eles terminaram a corrida no local da foto? — abra Corrida → mapa da rota
- Este veículo costuma estacionar mal? — abra Veículo → comprovantes recentes

## Fluxos típicos

- **Aprovação rápida** — imagem claramente boa → deixe o comentário vazio → _Aprovar_ → volte para a fila
- **Aviso com contexto** — imagem ruim mas leve → digite uma nota de uma frase → _Avisar_ → usuário recebe um aviso leve
- **Multa após consideração** — imagem claramente ruim → verifique o cartão Cliente para reincidências → digite uma nota explicando a multa → insira o valor → _Rejeitar com multa_
- **Escalar para bloqueio** — imagem é a terceira infração → verifique Cliente → Atividade para avisos anteriores → digite uma nota → _Bloquear_
- **Auditar decisão anterior** — abra o comprovante → leia o campo Comentário no registro de atividades para ver o que o operador anterior escreveu

## Dicas

- **Dê zoom antes de decidir** — cavaletes, placas de estacionamento e caminhos para pedestres são fáceis de perder na miniatura
- **Digite o comentário primeiro** — uma vez que você clica em uma ação, ela é enviada; se digitar o comentário depois, você já moderou sem contexto
- **Aprovar > Avisar > Multar > Bloquear** é uma escalada unidirecional — não pule direto para Bloquear na primeira infração
- **O comentário é público** (para sua equipe e o passageiro) — mantenha-o factual; sem jargões internos, sem opiniões sobre o cliente
- **Excluir é irreversível** — uma vez que um comprovante é excluído, não pode ser recuperado; use _Rejeitar_ se quiser manter um registro da foto ruim
- **A imagem é a verdade** — quando o passageiro contesta uma multa, a foto original + seu comentário + a linha do tempo formam o processo
