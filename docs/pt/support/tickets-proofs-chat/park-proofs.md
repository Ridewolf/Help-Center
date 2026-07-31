# Comprovantes de Estacionamento — Lista

A lista de Comprovantes de Estacionamento (`/support/park-proofs`) é a fila de moderação para fotos que os usuários tiram do seu veículo em momentos-chave de uma corrida. Essas fotos provam que o usuário estacionou corretamente (ou não), e o trabalho da sua equipe aqui é **aprovar fotos boas, advertir ou penalizar as ruins**.

Para revisão por foto (a tela de moderação com imagem grande), veja [Park Proof Review](park-proof-review.md). Para as regras de automação que lidam com casos óbvios sem sua intervenção, veja [Auto Review](park-proof-auto-review.md).

Permissão necessária: **Comprovantes de Estacionamento** (`d5e6f7`). Algumas ações na linha exigem subpermissões adicionais.

## Como os comprovantes chegam aqui

O aplicativo móvel do usuário solicita que ele tire uma foto em três momentos:

1. **Início** — quando desbloqueia o veículo (comprova que a unidade estava em bom estado ao pegá-la)
2. **Estacionamento** — durante uma pausa no meio da corrida (comprova que estacionou legalmente durante a parada)
3. **Fim** — quando termina a corrida (o **principal** — comprova que deixou o veículo estacionado corretamente)

A foto é enviada com metadados de GPS e postada nesta fila com status **Pendente**. A Revisão Automática pode alterar para _Aprovado_ (foto boa) sem intervenção do operador; qualquer coisa que a Revisão Automática não tenha certeza cai aqui para revisão humana.

## Filtros

| Filtro     | Tipo     | Notas                                                               |
| ---------- | -------- | ------------------------------------------------------------------- |
| Pesquisa   | Texto    | Pesquisa por nome do cliente, etiqueta do veículo, ID da corrida   |
| Intervalo | Calendário | Seletor de data inicial/final; padrão é "todo o período"          |
| Status     | Dropdown | `Pendente` / `Aprovado` / `Aviso` / `Multado` / `Bloqueado` (ou `Todos`) |
| Tipo       | Dropdown | `Início` / `Estacionamento` / `Fim` (ou `Todos`)                    |

Use `Status = Pendente` como seu filtro diário de monitoramento — é a fila de moderação.

## Colunas

| Coluna      | Ordenável? | Conteúdo                                                   |
| ----------- | ---------- | ---------------------------------------------------------- |
| **Imagem**  | —          | Miniatura da foto (clique para abrir a página de revisão) |
| **Usuário** | —          | Nome e avatar do cliente; clique para abrir o perfil do cliente |
| **Veículo** | —          | Etiqueta e modelo do veículo; clique para abrir o detalhe do veículo |
| **Corrida** | —          | ID da corrida; clique para abrir o detalhe da corrida      |
| **Tipo**    | ✓          | Fase da corrida (`Início` / `Estacionamento` / `Fim`)      |
| **Status**  | ✓          | Indicador de status (veja referência abaixo)               |
| **Data**    | ✓          | Quando a foto foi tirada; ordenação padrão = mais recente primeiro |

## Referência de status

| Status       | Cor    | Significado                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------ |
| **Pendente** | Amarelo| Aguardando moderação (sua ou da Revisão Automática)                            |
| **Aprovado** | Verde  | Foto está boa — usuário estacionou corretamente                               |
| **Aviso**    | Laranja| Foto não está ótima — usuário recebe aviso, mas sem multa ainda               |
| **Multado**  | Vermelho| Foto está ruim — usuário foi multado (ou o sistema marcou como candidato a multa) |
| **Bloqueado**| Cinza  | Usuário foi bloqueado por causa deste comprovante (violação grave/repetida)   |

Status definidos com ações na linha e na página de revisão são registrados tanto no registro do comprovante quanto no [Registro de Ações](../../operations/customers/client-detail.md#aba-atividade) do cliente.

## Ações na linha

Cada linha tem um **menu de três pontos** à direita. As ações disponíveis dependem das permissões:

| Ação          | Permissão     | O que faz                                                                                                  |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| **Visualizar**| `view-detail` | Abre a [página de revisão](park-proof-review.md) com a imagem completa e contexto                          |
| **Aprovar**   | `review`      | Marca o comprovante como _Aprovado_ (sem multa, sem aviso) — típico para fotos boas                        |
| **Advertir**  | `review`      | Marca como _Aviso_ — o usuário é notificado, mas não multado                                              |
| **Abrir corrida** | —          | Vai para a página de detalhes da corrida relacionada (mapa da rota, linha do tempo, etc.)                   |

Ações para as quais você não tem permissão são ocultadas.

O conjunto completo de ações (Multar, Bloquear usuário, Criar tarefa de manutenção, Pedir para reestacionar) está na **página de revisão** — vá lá para qualquer coisa além de uma aprovação/advertência rápida.

## Ações da página (canto superior direito)

- **Revisão Automática** — abre a [página de Configurações da Revisão Automática](park-proof-auto-review.md) para configurar regras que aprovam automaticamente fotos boas óbvias e sinalizam automaticamente fotos ruins óbvias (isso esvazia a fila Pendente para que você revise apenas casos limite)

## Fluxos típicos

- **Fila diária de moderação** — `Status = Pendente` → ordenar por data do mais antigo → revisar cada um, _Visualizar_ para contexto, _Aprovar_ / _Advertir_ conforme o que você vê
- **Investigar uma reclamação** — pesquisar por ID da corrida ou cliente → encontrar o comprovante → _Visualizar_ → conferir a foto contra a alegação do usuário
- **Encontrar reincidentes** — pesquisar por nome do cliente → analisar vários comprovantes para ver um padrão (o registro de atividades do perfil do usuário contará a mesma história)
- **Somente fim da corrida** — `Tipo = Fim` → revisar apenas as fotos do fim da corrida (as mais importantes; fotos de estacionamento no meio da corrida geralmente estão ok)
- **Auditar Revisão Automática** — filtrar `Status = Aprovado` do último dia → verificar uma amostra para garantir que as regras estão funcionando corretamente

## Dicas

- **A miniatura é suficiente para a maioria das chamadas** — claramente dentro de uma zona, enquadrada corretamente, sem obstruções — _Aprovar_ sem abrir. Salve _Visualizar_ para fotos ambíguas
- **Abrir corrida** é seu atalho para o contexto — se o passageiro afirma que estacionou legalmente, o mapa da corrida mostra onde ele realmente terminou
- **Os status são persistentes** — uma vez que você define _Aprovado_, o passageiro para de receber lembretes para esse comprovante. Não aprove uma foto ruim para "limpar a fila" ou você perde a capacidade de acompanhar
- **Aviso é seu "intermediário"** — use quando a foto estiver ruim, mas não maliciosa (o passageiro estava com pressa, o tempo estava ruim, etc.). Avisos repetidos escalam para multas via regras de Revisão Automática
- **Use a Revisão Automática agressivamente** — a fila cresce rápido; quanto mais fotos obviamente boas a Revisão Automática aprovar sozinha, mais energia você terá para as realmente ambíguas
- **A URL é compartilhável** — copie uma visualização filtrada (ex.: _comprovantes multados de ontem_) e envie para um colega para verificação pontual
