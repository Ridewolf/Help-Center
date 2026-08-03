# Detalhes do Bilhete

A página de detalhes do bilhete (`/support/tickets/:id`) é onde você investiga um bilhete de suporte. Ela abre como um modal grande sobre a [lista de Bilhetes](tickets.md) — a URL muda para que o bilhete possa ser compartilhado / acessado diretamente.

Você geralmente chega aqui clicando em uma linha da lista ou colando uma URL direta no navegador.

Permissão necessária: **Bilhetes** (`a8b9c1`). Algumas ações exigem subpermissões adicionais (`edit`, `delete`).

## Como se relaciona com outras visualizações de bilhetes

| Visualização                                                               | Para que serve                                                                 |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Lista de Bilhetes](tickets.md)                  | A fila completa — pesquisar, filtrar, ordenar                                  |
| [Revisão Automática de Bilhetes](ticket-auto-review.md) | Modo simplificado — um bilhete pendente por vez, triagem rápida via teclado    |
| **Detalhes do bilhete (esta página)**                                      | Análise detalhada de um bilhete — imagem completa, descrição completa, contexto, editar / excluir |

## Layout

O modal é empilhado de cima para baixo:

1. **Cabeçalho** — título (rótulo do bilhete), linha de descrição ("Bilhete #ID"), fechar (X)
2. **Seção de imagem** — foto de evidência do usuário (grande, clique para abrir)
3. **Cartão de detalhes do bilhete** — status, tipo de reclamação, descrição, comentário
4. **Cartão de veículo e localização** — veículo, IMEI, coordenadas de localização, zona, relator
5. **Rodapé** — botões _Fechar_ e _Editar_

## Cabeçalho

A faixa superior identifica o bilhete:

- Um **ícone de círculo de alerta** ao lado do rótulo do bilhete (ex.: o rótulo do veículo ou um nome gerado para o bilhete)
- Uma **linha de descrição** mostrando o ID do bilhete
- O fechamento do diálogo (×) no canto superior direito — também fecha com Esc ou clicando fora

Fechar o diálogo remove o `/:id` da URL para que o histórico de voltar / avançar corresponda ao que você vê.

## Seção de imagem

A foto completa da evidência enviada pelo usuário, grande o suficiente para inspeção rápida:

- **Clique na imagem** (ou no botão _Visualizar em tamanho real_ que aparece ao passar o mouse) — abre a foto em resolução original em uma nova aba
- **Ao passar o mouse** — aparece uma sobreposição escurecida + o botão _Visualizar em tamanho real_
- Se a imagem não carregar, um espaço reservado aparece em seu lugar
- Se o bilhete não tiver imagem (raro, ex.: bilhetes iniciados pelo operador), a seção fica oculta

A miniatura na lista é uma versão pequena; esta é a imagem completa pronta para moderação.

## Cartão de detalhes do bilhete

Cartão esquerdo da grade de dois cartões. Campos:

| Campo              | O que mostra                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Status**         | O indicador de status (Pendente, Em andamento, Resolvido, Ignorado, Duplicado, etc.) — mesma paleta de cores da lista              |
| **Tipo de reclamação** | O indicador do tipo de reclamação — mesma codificação de cores da lista (vermelho Dano mecânico, amarelo Limpeza, etc.)           |
| **Descrição**      | A descrição em texto livre do usuário, renderizada em markdown (quebras de linha respeitadas, links automáticos) — vazio se o usuário não preencher |
| **Comentário**     | Comentário / notas internas do operador sobre o bilhete — vazio até que um operador adicione um                                    |

Veja [Lista de Bilhetes → Referência de status / Tipos de reclamação](tickets.md) para o significado completo de cada cor de indicador.

## Cartão de veículo e localização

Cartão direito da grade. Campos:

| Campo        | O que mostra                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Veículo**  | Rótulo do veículo (com ícone de carro) e o IMEI vinculado do dispositivo IoT              |
| **Localização** | Latitude / longitude onde o problema foi reportado (6 casas decimais, com ícone de alfinete) |
| **Zona**     | A [zona](../../settings/infrastructure/zones.md) onde a localização está, se houver       |
| **Relator**  | O usuário / sistema / operador que abriu o bilhete, com seu email                         |

Use essas referências cruzadas para sair para o contexto: clique no veículo para abrir o [detalhe do veículo](../../operations/fleet/vehicle-detail.md), clique no relator para abrir seu [perfil do cliente](../../operations/customers/client-detail.md), ou copie as coordenadas para uma ferramenta de mapas para confirmar a localização.

## Ações (rodapé)

A página de detalhes expõe um conjunto de ações **deliberadamente pequeno** — a maioria dos fluxos de trabalho de bilhetes acontece na lista ou em entidades relacionadas (veículo, cliente). O que há aqui:

| Botão      | O que faz                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Fechar** | Fecha o modal (remove `/:id` da URL)                                                                                                                          |
| **Editar** | Abre o bilhete no modo de edição. Nota: na versão atual, o manipulador de Editar mostra uma notificação "Edição não implementada" — está conectado, mas o formulário ainda não foi lançado |

### O que está na lista mas não aqui

O menu da linha da lista tem duas ações extras que não aparecem na página de detalhes:

| Ação       | Onde fica        | Por quê                                                                                                                          |
| ---------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Editar** | Linha da lista + detalhe | Mesmo Editar (atualmente um espaço reservado)                                                                                   |
| **Excluir**| Menu da linha da lista | Excluir é uma ação apenas na linha (com diálogo de confirmação). Para excluir no detalhe, feche o modal primeiro e depois use o menu da linha |

### O que há na página de lista

O cabeçalho da página de lista tem _Revisão Automática_ que leva para a fila simplificada — não há botão equivalente no detalhe porque você já está focado em um único bilhete.

## Ações com feature flag (não na versão atual)

O código tem espaços reservados para um conjunto mais rico de ações de bilhetes que estão **comentadas** nesta versão:

- **Atribuir** — atribuir o bilhete a um operador
- **Bloquear veículo** — tirar o veículo de serviço com um clique
- **Criar tarefa de manutenção** — abrir uma tarefa de manutenção pré-preenchida com os dados deste bilhete
- **Creditar usuário** — emitir um crédito na carteira para o relator
- **Responder** — enviar uma resposta modelo para o passageiro
- **Mesclar duplicado** — vincular este bilhete a um bilhete principal

Se sua implantação tiver essas ativadas, elas aparecem no menu da linha / no dropdown _Ações_ do cabeçalho — não no corpo do modal. Verifique com seu administrador se espera vê-las e não as vê.

## Fluxos típicos

- **Triagem por foto** — abrir o bilhete → olhar a imagem → se o dano for real, copiar a etiqueta do veículo → fechar o modal → abrir o detalhe do veículo para bloqueá-lo / criar uma tarefa de manutenção
- **Resolver um relatório de baixa qualidade** — abrir o bilhete → confirmar que a foto é lixo → fechar → usar o menu da linha da lista para excluir (com confirmação)
- **Investigar o histórico de um veículo** — abrir um bilhete → clicar no veículo → ver o histórico completo de alertas + corridas do veículo → voltar ao bilhete para adicionar um comentário
- **Verificar a reclamação do passageiro vs a viagem** — abrir o bilhete → copiar o relator → abrir o detalhe do cliente → checar as corridas recentes para contexto
- **Compartilhar um bilhete com um colega** — a URL contém o id do bilhete (`/support/tickets/:id`) para que você possa colar no chat e o destinatário abrir o mesmo modal

## Dicas

- **A URL é seu favorito** — copiar a URL com `:id` e colar depois leva direto ao mesmo bilhete, mesmo em outra sessão
- **Esc para fechar** — o modal suporta Esc, clique fora e o X — os três removem o id da URL
- **Clique na imagem uma vez para ver o original** — a miniatura é comprimida; o original é o que o passageiro realmente enviou
- **Referencie o IMEI** — se um veículo é frequentemente multado, geralmente é o IoT falhando, não o chassi. O IMEI é seu link para o registro de [configurações IoT](../../settings/infrastructure/iot.md)
- **Comentário é só interno** — os passageiros não veem; use livremente para notas entre operadores no bilhete
- **Editar ainda não está disponível** — clicar em _Editar_ hoje mostra uma notificação. Se precisar mudar um status, faça pelas ações na lista ou pela Revisão Automática
