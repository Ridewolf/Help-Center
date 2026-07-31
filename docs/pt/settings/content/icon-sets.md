# Conjuntos de Ícones

A página Conjuntos de Ícones (`/settings/icon-sets`) é a **biblioteca de ícones de mapa** que o aplicativo móvel Ridewolf rider usa para renderizar veículos. Cada conjunto está vinculado a um tipo de veículo (e-scooter, e-bike, cargo e-bike, e-moped, e-car, e-boat) e fornece três categorias de ícones SVG: **Selecionado**, **Não selecionado** e **Desconto**.

Esta é uma infraestrutura de conteúdo — os operadores fazem upload dos SVGs aqui, o aplicativo rider escolhe o ícone correto com base no tipo de veículo, nível da bateria e se o rider tocou no veículo no mapa. Nenhuma atualização do aplicativo móvel é necessária para trocar a arte.

Juntamente com [FAQ Sets](faq-sets.md) e [Quick Guides](quick-guides.md), esta é a camada de conteúdo do Painel.

Permissão necessária: **Conjuntos de Ícones** (verifique com o administrador).

## Onde isso aparece para o rider

No mapa do aplicativo rider, cada marcador de veículo usa um ícone do conjunto ativo para seu tipo de veículo:

- Ícones **Não selecionados** são usados para marcadores que o rider não tocou — seis níveis de bateria (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) para que o marcador reflita a carga atual
- Ícones **Selecionados** substituem o marcador quando o rider toca nele — mesmos seis níveis de bateria, estilo diferente
- Ícones de **Desconto** (5%, 15%, 25%, 35%, 45%, 55% por padrão) são sobrepostos no marcador quando o veículo tem preço promocional

Um conjunto por tipo de veículo pode ser marcado como **padrão** — esse é o que o aplicativo carrega quando nada mais está configurado.

## Filtros

| Filtro          | Tipo     | Notas                                                                                                            |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Pesquisa       | Texto    | Caixa de busca no cabeçalho — pesquisa por título / slug                                                         |
| Tipo de veículo| Dropdown | `E-scooter` / `E-bike` / `Cargo e-bike` / `E-moped` / `E-car` / `E-boat` (ou `Todos`)                            |
| Cobertura por estado | Dropdown | Filtra pelo que está preenchido: `Somente selecionados` / `Somente não selecionados` / `Somente desconto` / `Cobertura total` (ou `Todos`) |
| Status         | Dropdown | `Ativo` / `Rascunho` / `Incompleto` / `Arquivado` (ou `Todos`)                                                  |
| Tags           | Combobox | Filtro de tags livre (entrada mostrada mas atualmente desabilitada — em breve)                                   |

**Limpar tudo** reseta todos os filtros.

## Colunas

| Coluna                 | Conteúdo                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Conjunto**           | Ícone do pacote + título; linha secundária mostra slug                  |
| **Tipo de veículo**    | Etiqueta (E-scooter, E-bike, etc.)                                     |
| **Ícones selecionados**| Cobertura como `6/6` (quantos níveis de bateria foram carregados)       |
| **Ícones não selecionados** | Mesma cobertura `n/6` para variantes não selecionadas               |
| **Ícones de desconto** | Primeiros 3 percentuais de desconto como chips (`5%`, `15%`, `25%`), `+N` excedente |
| **Tags**               | Primeiras 2 tags como chips com `+N` excedente                         |
| **Atualizado**         | Data da última atualização                                             |
| **Status**             | `Ativo` / `Rascunho` / `Incompleto` / `Arquivado`                      |

`Incompleto` significa que o conjunto está faltando ícones para uma das três categorias — o aplicativo rider usa o padrão para esse tipo de veículo até que o upload seja concluído.

Clique em uma linha para abrir o **Diálogo de Detalhes** — uma pré-visualização visual de cada ícone no conjunto. Clique no menu de três pontos para ações.

## Ações na linha

| Ação               | O que faz                                                                        |
| ------------------ | -------------------------------------------------------------------------------- |
| **Visualizar detalhes** | Abre o diálogo de detalhes com pré-visualizações de todos os SVGs carregados  |
| **Editar**         | Abre o formulário com várias abas (Detalhes / Selecionados / Não selecionados / Descontos / Pré-visualização) |
| **Duplicar**       | Clona o conjunto como Rascunho                                                  |
| **Definir como padrão** | Marca este conjunto como padrão para seu tipo de veículo — o aplicativo rider o carregará |
| **Baixar**         | Baixa o conjunto como um ZIP com todos os SVGs                                  |
| **Arquivar**       | Move para `Arquivado` — mantido para histórico, não usado pelo aplicativo       |
| **Excluir**        | Remove permanentemente                                                          |

Os botões **Importar** (ZIP / JSON) e **Exportar** (ZIP / JSON) na barra superior funcionam em lote.

## Formulário de criação / edição

O formulário é um diálogo com cinco abas:

1. **Detalhes** — título (obrigatório), slug (derivado automaticamente), tipo de veículo (obrigatório), tags, status
2. **Selecionados** — upload de 6 SVGs, um para cada nível de bateria (`bat10` → `bat100`)
3. **Não selecionados** — mesmos 6 slots, para o estado do mapa não selecionado
4. **Descontos** — um SVG por percentual de desconto. Presets padrão são `5, 15, 25, 35, 45, 55` mas você pode adicionar/remover linhas
5. **Pré-visualização** — verificação visual de sanidade de todo o conjunto antes de salvar

Um conjunto com slots vazios em qualquer aba é salvo como `Incompleto`.

## Fluxos de trabalho típicos

- **Atualize os pins das e-scooters para uma nova marca** — Duplique o padrão atual → carregue novos SVGs em todas as três abas → salve como Rascunho → visualize → Defina como padrão → o Rider App atualizará na próxima atualização
- **Realize um teste A/B nos ícones** — mantenha o conjunto antigo Ativo e não padrão, crie um novo conjunto como Ativo + padrão para um tipo de veículo → reverta definindo o antigo como padrão se necessário
- **Arte de desconto para feriados** — abra o conjunto ativo → Editar → aba Descontos → carregue SVGs temáticos para as porcentagens atualmente em uso → salve
- **Importação em massa de um ZIP de designer** — no canto superior direito _Importar_ → ZIP → confirme o mapeamento do arquivo → revise na Visualização → Ativar

## Dicas

- **Um padrão por tipo de veículo** — definir um novo padrão automaticamente desativa o anterior. O selo de Status não precisa estar `Ativo` para um conjunto ser padrão, mas deveria estar
- **Níveis de bateria são fixos** — `bat10/25/40/55/90/100` são os únicos níveis que o app entende; o app escolhe o mais próximo com base na carga atual do veículo
- **Apenas SVGs** — uploads esperam arquivos SVG; PNGs não escalam bem em telas retina
- **`Incomplete` é uma proteção útil** — indica que o Rider App está usando o padrão, para que você nunca envie acidentalmente um conjunto meio carregado
- **Arquive antes de excluir** — conjuntos arquivados permanecem pesquisáveis caso queira reverter
