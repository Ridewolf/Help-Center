# Conjuntos de FAQ

A página de Conjuntos de FAQ (`/settings/faq-sets`) é a **biblioteca de perguntas e respostas** exibida dentro dos aplicativos Ridewolf — principalmente o aplicativo móvel para o usuário, mas também nas interfaces para operadores. Cada conjunto é um pacote de entradas de P/R direcionado a um público específico (aplicativo do usuário, aplicativo do cliente, mecânico, administrador ou geral).

Juntamente com os [Guias rápidos](quick-guides.md) e os [Conjuntos de ícones](icon-sets.md), esta página faz parte da camada de conteúdo — o que um operador altera aqui é o que um usuário vê no seu telefone, sem necessidade de uma nova versão do aplicativo móvel.

Permissão necessária: **Conjuntos de FAQ** (verifique com o administrador).

## Onde isso aparece para o usuário

No aplicativo móvel do usuário, os Conjuntos de FAQ sustentam a seção de Ajuda / FAQ dentro do app. Cada conjunto com tipo **rider-app** e status `active` é carregado no aplicativo; as entradas marcadas como `visible` aparecem, ordenadas pelo campo `order`. Conjuntos com tipo `client-app`, `mechanic`, `admin`, `general` vão para os respectivos aplicativos / interfaces.

Um conjunto `draft` ou `archived` nunca é exibido — útil para preparar alterações antes da publicação.

## Filtros

| Filtro | Tipo         | Notas                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------ |
| Pesquisa | Texto         | Caixa de busca no cabeçalho — pesquisa título / descrição / slug           |
| Etiquetas   | Multi-seleção | Filtra pelos tags aplicados ao conjunto (onboarding, payments, technical, …)   |
| Status | Dropdown     | `Ativo` / `Rascunho` / `Arquivado` (ou `Todos`)                               |
| Tipo   | Dropdown     | `Aplicativo do cliente` / `Aplicativo do usuário` / `Mecânico` / `Administrador` / `Geral` (ou `Todos`) |

**Limpar tudo** reseta todos os filtros de uma vez.

## Colunas

| Coluna      | Conteúdo                                                             |
| ----------- | ------------------------------------------------------------------- |
| **Conjunto**     | Ícone + título; linha secundária mostra descrição ou slug              |
| **Tipo**    | Indicador de público — Aplicativo do cliente / Aplicativo do usuário / Mecânico / Administrador / Geral |
| **Etiquetas**    | Primeiras 3 etiquetas exibidas, com `+N` para excesso                               |
| **Itens**   | Número de campos de P/R no conjunto                                     |
| **Status**  | `Ativo` (verde) / `Rascunho` (cinza) / `Arquivado` (suave)              |
| **Atualizado** | Data relativa; passe o mouse para ver o carimbo completo + autor                    |

Clique em uma linha para abrir o diálogo **Visualizar** (prévia somente leitura). Clique no menu de três pontos para ações.

## Ações na linha

| Ação           | O que faz                                                          |
| ---------------- | --------------------------------------------------------------------- |
| **Visualizar detalhes** | Prévia somente leitura com todos os itens de P/R exibidos                        |
| **Editar**         | Abre o formulário (igual a Criar, preenchido)                     |
| **Duplicar**    | Clona o conjunto com sufixo `-copy` no slug e status resetado para `Rascunho`    |
| **Exportar**       | Baixa o conjunto como ZIP ou JSON                                       |
| **Arquivar**      | Move para `Arquivado` — oculto no aplicativo do usuário, mantido para histórico      |
| **Excluir**       | Remove permanentemente (destrutivo — só se realmente não precisar) |

A barra de ferramentas superior também tem **Importar** em massa (ZIP / JSON) e **Exportar** (ZIP / JSON da lista visível).

## Formulário de criação / edição

O diálogo do formulário tem três seletores principais e uma lista de campos de P/R:

- **Tipo** — obrigatório, define quem vê o conjunto (Aplicativo do cliente / Aplicativo do usuário / Mecânico / Administrador / Geral)
- **Status** — `Rascunho` (padrão para novo) / `Ativo` / `Arquivado`
- **Etiquetas** — multi-seleção, usado para filtrar e agrupar
- **Título** — obrigatório, exibido como nome do conjunto
- **Descrição** — opcional, linha secundária na lista
- **Campos** — as entradas de P/R. Cada campo tem:
  - **Rótulo** (a pergunta)
  - **Valor** (a resposta)
  - **Tipo** — `text` / `markdown` / `link` / `list`
  - Alternador **Visível** (oculta itens individuais sem excluir)
  - **Ordem** (arraste para reordenar)

O slug é derivado do título e usado na URL da API — altere via Editar se necessário.

## Fluxos típicos

- **Publicar uma nova FAQ para usuários** — `+ Criar conjunto` → Tipo = Aplicativo do usuário, Status = Rascunho → preencha título + descrição → adicione campos de P/R → salve → pré-visualize via Visualizar detalhes → Edite, altere Status para Ativo → aparece no aplicativo do usuário na próxima atualização
- **Preparar texto sazonal** — Duplique um conjunto existente → edite a cópia como Rascunho → agende a troca arquivando o conjunto antigo e ativando o novo de uma vez
- **Reverter uma resposta ruim** — abra o conjunto problemático → Editar → corrija o campo (ou desative o `Visível`) → salve; ou Arquive o conjunto inteiro e retorne a uma versão duplicada anterior
- **Importação em massa de um dump JSON** — no canto superior direito _Importar_ → escolha o arquivo → confirme a estrutura analisada → importe como Rascunho, depois revise e Ative

## Dicas

- **O Tipo controla quem vê o conteúdo** — não coloque texto para usuários em um conjunto `mechanic`, ele nunca chegará ao aplicativo do usuário
- **Rascunho é seu amigo** — novos conjuntos padrão para Rascunho para que o aplicativo do usuário não mostre conteúdo incompleto. Altere para Ativo somente após revisar tudo
- **Campos Markdown exibem formatação** — use-os para respostas que precisam de listas com marcadores ou negrito; escolha `text` quando quiser apenas texto simples
- **Etiquetas são compartilhadas com o filtro** — use um vocabulário consistente de tags (ex.: `onboarding`, `payments`, `troubleshooting`) para que a filtragem futura continue útil
- **Arquive em vez de Excluir** quando possível — conjuntos excluídos somem para sempre, conjuntos arquivados podem ser reativados e servem como histórico
