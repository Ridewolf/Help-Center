# Bilhetes — Lista

A lista de Bilhetes (`/support/tickets`) é a fila de suporte para problemas relatados sobre um veículo — danos mecânicos, falhas elétricas, peças quebradas, preocupações de segurança, etc. Cada bilhete está vinculado a um veículo específico e contém uma foto, o relator, o tipo de reclamação, um temporizador SLA e um status.

Para investigação por bilhete (conversa completa, evidências, ações de resolução) veja a **página de detalhes do bilhete** (abra clicando em uma linha).

Para a interface de fila simplificada, veja [Ticket Auto Review](ticket-auto-review.md).

Permissão necessária: **Bilhetes** (`a8b9c1`).

## Como os bilhetes aparecem aqui

Os bilhetes são criados a partir de algumas fontes:

1. **Relato do Rider** — o app móvel do rider tem um fluxo de "reportar um problema"; os riders escolhem um tipo de reclamação, tiram uma foto, deixam uma nota
2. **Iniciado pelo operador** — um operador abre um bilhete para um veículo que percebeu ter um problema (raro; geralmente o fluxo de [tarefas de manutenção](../../operations/fleet/vehicle-detail.md) é preferido)
3. **Sinalizado pelo sistema** — regras de IoT ou análises podem gerar bilhetes automaticamente (ex: anomalia na bateria)

Cada novo bilhete chega a esta lista com um status (tipicamente _Pendente_) e inicia seu temporizador SLA.

## Filtros

| Filtro         | Tipo     | Notas                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Pesquisar      | Texto    | Pesquisa ID do bilhete, etiqueta do veículo, relator, localização                          |
| Status         | Dropdown | Lista gerada pelo backend (`Pendente`, `Em andamento`, `Resolvido`, `Ignorado`, `Duplicado`, etc.) |
| Tipo de reclamação | Dropdown | 7 tipos — veja referência abaixo                                                          |

Os filtros combinam com E. As tags aparecem acima da tabela; a URL reflete o estado atual.

## Colunas

| Coluna       | Ordenável? | Conteúdo                                                        |
| ------------ | ---------- | -------------------------------------------------------------- |
| **Foto**    | —          | Miniatura da foto de evidência do rider (clique para ampliar)  |
| **Veículo**  | —          | Etiqueta e modelo do veículo; clique para abrir o detalhe do veículo |
| **SLA**      | —          | Tempo restante até o prazo do SLA (fica vermelho quando atrasado) |
| **Localização** | —        | Onde o problema foi reportado — coordenadas e/ou endereço      |
| **Relator**  | —          | Quem reportou o problema (nome do rider ou etiqueta do sistema/operador) |
| **Status**   | —          | Indicador de status com cor (veja referência abaixo)            |
| **Datas**    | —          | Data de criação / data da última atualização                     |

## Tipos de reclamação

Sete tipos ajudam a triagem dos bilhetes de relance. Cada um é codificado por cor:

| Tipo                  | Cor do distintivo | O que geralmente significa                              |
| --------------------- | ----------------- | ------------------------------------------------------- |
| **Dano mecânico**     | Destrutivo (vermelho) | Acidente, quadro quebrado, componentes tortos          |
| **Problema elétrico** | Aviso (amarelo)   | Problemas no acelerador, luzes, sensores                |
| **Problema na bateria** | Padrão (azul)   | Não carrega, descarrega mais rápido que o esperado      |
| **Peças quebradas**   | Destrutivo (vermelho) | Descanso ausente, refletor faltando, freios danificados |
| **Preocupação de segurança** | Destrutivo (vermelho) | Qualquer coisa que torne o veículo inseguro para uso    |
| **Limpeza**           | Aviso (amarelo)   | Sujo, cheiro, superfícies pegajosas — urgência menor    |
| **Outro**             | Contorno          | Não se encaixa nas categorias acima — leia a descrição  |

Categorias vermelhas normalmente indicam que o veículo deve ser retirado de serviço imediatamente; amarelo/azul geralmente podem aguardar uma janela de serviço.

## Referência de status

A lista de status é obtida do backend, podendo variar ligeiramente por implantação. Status típicos:

| Status          | Variante          | Significado                                                    |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Pendente**    | Secundário (cinza) | Apenas reportado, ninguém trabalhou ainda                      |
| **Em andamento**| Padrão (azul)     | Atribuído a um operador ou tarefa de manutenção criada         |
| **Resolvido**   | Sucesso (verde)   | Problema resolvido; bilhete fechado                            |
| **Rejeitado**   | Destrutivo (vermelho) | Operador determinou que não é um problema real               |
| **Cancelado**   | Destrutivo (vermelho) | Fechado sem resolução (frequente para relatos de baixa qualidade) |
| **Arquivado**   | Contorno          | Antigo / histórico                                            |
| **Duplicado**   | (fechado)         | Vinculado a um bilhete anterior no mesmo veículo               |

Status contendo _resolvido_, _ignorado_ ou _duplicado_ são considerados **fechados** — não contam mais na fila aberta.

## Severidade

Internamente, os bilhetes carregam uma severidade (`critical`, `high`, `medium`, `low`) derivada do tipo de reclamação e de qualquer entrada do operador/sistema. A página da lista mostra a severidade através da **cor do tipo de reclamação** e da **cor do temporizador SLA** — SLA atrasado em um bilhete crítico é sua prioridade máxima.

## Ações na linha

Cada linha tem um **menu de três pontos** com um único item ativo:

| Ação             | O que faz                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| **Visualizar detalhes** | Abre a página de detalhes do bilhete (conversa completa + evidências + ações de resolução) |

O conjunto completo de ações do operador (Atribuir, Bloquear veículo, Criar tarefa de manutenção, Creditar usuário, Responder, Mesclar duplicatas) está disponível na **página de detalhes do bilhete** e é ativado/desativado por feature flag em cada implantação. A função da lista é ser uma fila de triagem, não um console de resolução.

## Ações da página

- **Revisão Automática** — abre a [fila de Revisão Automática de Bilhetes](ticket-auto-review.md) — revisão simplificada de um bilhete por vez

## Fluxos de trabalho típicos

- **Triagem diária** — filtrar `Status = Pendente` → ordenar por SLA (mais antigo primeiro, prazo mais próximo no topo) → percorrer, abrir cada bilhete no detalhe, decidir e agir
- **Triagem apenas crítica** — filtrar `Tipo de Reclamação = Dano mecânico / Preocupação de segurança` → estes são os bilhetes para retirada de serviço
- **Verificação do histórico do veículo** — buscar pela etiqueta do veículo → ver todos os bilhetes já abertos para essa unidade → útil antes de enviá-lo novamente após um reparo
- **Alarme de SLA** — ordenar por SLA → bilhetes no topo da lista estão atrasados → escalar imediatamente

## Dicas

- **A foto é seu primeiro sinal** — mesmo antes de abrir o bilhete, a miniatura indica se é um relatório real de dano ou uma submissão de baixa qualidade
- **SLA vermelho == agir agora** — quando o SLA fica vermelho, você já perdeu o prazo contratual; esta é sua fila reativa
- **Referencie com o veículo** — clique na coluna do veículo → abra a aba Alertas do veículo → problemas de IoT e relatórios de operadores frequentemente se sobrepõem
- **Cuidado com duplicatas** — vários usuários frequentemente relatam a mesma scooter quebrada em poucas horas; use Busca de Veículo para identificá-las antes de resolver
- **A URL é compartilhável** — copie uma visualização filtrada (ex.: _bilhetes pendentes de dano mecânico_) e envie para a equipe de manutenção
