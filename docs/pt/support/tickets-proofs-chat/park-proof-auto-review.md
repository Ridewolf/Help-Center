# Revisão Automática de Comprovantes de Estacionamento

A página de Revisão Automática (`/support/park-proofs/auto-review`) é uma **interface de fila simplificada** para processar comprovantes de estacionamento pendentes um após o outro, sem precisar voltar para a lista entre as decisões.

Apesar do nome "Automático", as decisões de moderação ainda são suas — _automático_ aqui significa **avanço automático**: após cada ação, a página carrega automaticamente o próximo comprovante pendente para que você possa continuar moderando sem clicar para voltar à lista.

Acesse-a pelo botão **Revisão Automática** na [lista de Comprovantes de Estacionamento](park-proofs.md).

Permissão necessária: **Comprovantes de Estacionamento** (`d5e6f7`) + subpermissão `review`.

## Como funciona

1. A página carrega a **fila pendente atual** ao ser aberta
2. Você vê o primeiro comprovante — mesma imagem + mesmos botões de ação da [página de revisão](park-proof-review.md) regular
3. Escolha uma ação (Aprovar / Avisar / Rejeitar com multa / Bloquear) ou Pular
4. A página **avança automaticamente** para o próximo comprovante pendente
5. Repita até a fila ficar vazia
6. Quando vazia, a página muda para um **estado de espera** — ela faz polling para novos comprovantes em intervalos e os carrega automaticamente

Você não perde seu lugar por engano: se fechar a aba e voltar, a fila é reconstruída a partir do que ainda está pendente.

## Layout

Duas colunas iguais em telas largas, empilhadas em telas estreitas:

| Coluna      | Largura | Conteúdo                                                      |
| ----------- | ------- | ------------------------------------------------------------- |
| **Imagem**  | 6/12    | Foto com zoom + carimbo de data/hora abaixo                   |
| **Ações**   | 6/12    | Mesmos botões Aprovar / Avisar / Rejeitar+multa / Bloquear / Comentário |

Uma barra de progresso no topo mostra o quanto você avançou na fila.

## Cabeçalho

- **Título** "Revisão Automática de Comprovantes de Estacionamento"
- **Legenda** com progresso: `Revisando X de Y · PP-12345`
- botão **Pular** (canto superior direito) — passa o comprovante atual sem decisão e vai para o próximo (o comprovante permanece _Pendente_)
- **Seta de voltar** — retorna para a [lista de Comprovantes de Estacionamento](park-proofs.md)

A **barra de progresso** abaixo do cabeçalho se preenche conforme você trabalha — com um pequeno efeito de brilho na parte preenchida.

## Botões de ação

Idênticos à [página de revisão de um único comprovante](park-proof-review.md):

| Botão                | Efeito                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Aprovar**          | Marca como _Aprovado_ → avanço automático                        |
| **Avisar**           | Marca como _Aviso_ + envia notificação ao rider → avanço automático |
| **Rejeitar com multa**| Marca como _Multado_ com o valor da multa no campo → avanço automático |
| **Bloquear**         | Marca como _Bloqueado_ (o rider, não o comprovante) → avanço automático |
| **Pular**            | Não decide; vai para o próximo comprovante (este fica _Pendente_) |
| **Comentário**       | Área de texto opcional — anexa ao ação que você clicar           |

Após qualquer decisão, o próximo comprovante desliza para dentro. Não há "Desfazer" — uma vez clicado, a ação é confirmada.

## Estado de espera

Quando a fila acaba, a página mostra uma **tela de espera** em vez de um cartão de Ações vazio:

- Mensagem "Todos os comprovantes revisados"
- Um **contador regressivo** até a próxima atualização automática (geralmente alguns minutos)
- Botão **Verificar agora** para pular a contagem e fazer polling imediatamente
- Botão **Sair** para voltar à lista

Se um novo comprovante chegar durante a espera (rider acabou de terminar uma corrida), a página o carrega automaticamente e retoma seu ritmo de moderação.

## Quando usar Revisão Automática vs a lista

| Use a lista (`/support/park-proofs`) quando…              | Use Revisão Automática quando…                       |
| -------------------------------------------------------- | --------------------------------------------------- |
| Você está verificando clientes ou corridas específicas   | Você está eliminando um acúmulo genérico de comprovantes pendentes |
| Você só precisa de uma aprovação rápida pelo menu da linha | Você quer cada foto em tamanho real na sua frente   |
| Você está auditando decisões passadas (Aprovado / Multado / etc.) | Você está focado na fila _Pendente_ agora           |
| Você quer filtrar por intervalo de datas, tipo ou cliente | Você quer velocidade: imagem → ação → próximo       |

Revisão Automática é a ferramenta para **estado de fluxo** — abra-a no início do seu turno de moderação e não saia até a fila estar vazia.

## Fluxos típicos

- **Início do turno** — abra Revisão Automática → processe todos os comprovantes pendentes → termine na tela de espera → faça uma pausa
- **Rajada rápida** — abra por 10 minutos, limpe o que puder, _Sair_ para voltar à lista quando algo mais precisar da sua atenção
- **Caso ambíguo no meio do fluxo** — quando precisar de contexto extra (mapa completo da corrida, histórico do cliente), clique nos links das entidades relacionadas na revisão regular (não mostrados aqui); talvez queira _Pular_ o comprovante e voltar a ele pela lista

## Dicas

- **Digite o comentário primeiro** — mesma regra da página de revisão regular: clicar uma ação confirma antes que você possa salvar um comentário tardio
- **Pular é seu amigo** para casos ambíguos — não multar porque você "quase tem certeza"; pule e revise pela lista com contexto completo (histórico do cliente, mapa da corrida)
- **Avanço automático é rápido** — não se apresse; se errar no Rejeitar com multa, a carteira do rider é debitada em segundos
- **A tela de espera é saudável** — uma fila vazia significa que sua equipe está acompanhando. Afaste-se do teclado quando a vir
- **Sem filtros aqui** — Revisão Automática percorre a fila pendente sem filtro na ordem de chegada; use a [lista](park-proofs.md) se precisar segmentar um subconjunto
- **Fechar a aba é seguro** — seu lugar é a própria fila _Pendente_; você pode retomar de onde a fila estiver sempre que reabrir
