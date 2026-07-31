# Localização

A página de Localização (`/settings/localization`) é a **bancada de trabalho de tradução** — uma biblioteca de _Coleções_ (grupos de chaves de tradução relacionadas) que você edita, importa, exporta e publica. Cada coleção tem um namespace (ex.: `ui`, `auth`, `rides`), uma língua base (sempre `en`), um conjunto de línguas-alvo e uma lista de chaves com valores por idioma.

> _Nota_: esta página é atualmente um **protótipo apenas no front-end** — as coleções são carregadas a partir de `mockData.ts` e mantidas no estado local. _Salvar_ e _Publicar_ exibem notificações de confirmação, mas ainda não existe endpoint no backend. A página é segura para uso como especificação da API; nada que você fizer aqui será persistido.

Permissão necessária: nenhum `requiredPermissions` específico está definido na rota — qualquer operador autenticado pode acessá-la.

## Layout da página

Uma única linha de cabeçalho com o título da página, uma caixa de pesquisa, um menu suspenso _Importar / Exportar_ e um botão _+ Criar coleção_ — seguido por um cartão de Filtros e a tabela de Coleções.

Dados de referência (atualmente codificados em `Localization.vue`):

- Línguas: `en`, `ro`, `ru`, `de`, `fr`, `es` (base + 5 alvos)
- Namespaces: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tags: `core`, `beta`, `promo`, `legacy`

## Filtros

Um cartão de Filtros fica acima da tabela.

| Filtro    | Tipo           | Notas                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Língua   | Dropdown       | Filtra coleções que incluem esta língua. Padrão `ro`                         |
| Namespace | Dropdown       | Um dos namespaces da lista (ou vazio para todos)                            |
| Status    | Dropdown       | `all`, `active`, `draft`, `archived`                                         |
| Tags      | Chips de alternância | Chips de múltipla seleção — a coleção deve conter _todas_ as tags marcadas para passar |
| Pesquisa  | Texto (barra de ferramentas) | Com debounce de 300 ms — corresponde a nome, descrição, namespace          |

Um botão _Limpar_ no cartão de Filtros reseta todos os quatro filtros.

## Tabela de coleções

| Coluna     | Ordenável? | Conteúdo                                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Coleção    | —         | Nome + descrição de 1 linha                                                                                           |
| Namespace  | —         | Distintivo com a string do namespace                                                                                  |
| Línguas   | —         | Distintivo por língua. A língua base recebe a variante primária; os alvos são secundários. Ao passar o mouse mostra _base_ vs _alvo_ |
| Chaves     | —         | Contagem total de chaves. Ao passar o mouse mostra detalhamento por flag (_faltando_, _alterado_, _obsoleto_)           |
| Status     | —         | Distintivo — `active` / `draft` / `archived`                                                                           |
| Atualizado | —         | Data relativa. Ao passar o mouse mostra o autor                                                                         |
| Ações      | —         | Menu de três pontos por linha                                                                                           |

Paginação na parte inferior: _Anterior / Próximo_, contagem total e seletor por página (10 / 20 / 50).

### Ações da linha

| Ação      | O que faz                                                                      |
| --------- | ------------------------------------------------------------------------------- |
| Visualizar| Abre o diálogo da Coleção em modo de _visualização_ somente leitura             |
| Editar    | Abre o diálogo da Coleção em modo _edição_                                     |
| Duplicar  | Clona a coleção com o sufixo " (Copy)" no topo da lista                      |
| Importar  | Abre o diálogo da Coleção focado na aba _Importar / Exportar_ em modo de importação |
| Exportar  | Notificação — espaço reservado para baixar a coleção no formato escolhido      |
| Arquivar  | Altera o status para `archived` (a linha permanece — filtre Status para ver os arquivados) |
| Excluir   | Remove a linha da lista local                                                  |

## Criar / Editar / Visualizar — o diálogo da Coleção

Abre a partir de + Criar ou qualquer ação da linha. Quatro abas dentro do diálogo.

### Aba Visão Geral

Edite os metadados da coleção.

- _Nome_ (obrigatório) — nome exibido (ex.: "Rótulos da UI").
- _Namespace_ — seletor com campo de busca.
- _Descrição_ — breve texto.
- _Língua base_ — somente leitura, sempre `en`.
- _Línguas-alvo_ — chips alternáveis entre as cinco opções não inglesas. A base + alvos juntos formam o conjunto de colunas de idioma na aba Chaves.
- _Status_ — `active` / `draft` / `archived`.
- _Tags_ — chips alternáveis da lista de tags.

### Aba Chaves

A grade real de tradução.

- Barra de ferramentas: uma caixa de pesquisa (corresponde ao nome da chave e a qualquer valor), um filtro de status (ex.: _Apenas faltando_), um seletor de idioma (qual coluna alvo está destacada como foco de edição).
- Ações em massa quando chaves estão selecionadas: _Definir status_, _Limpar valores_, _Exportar selecionadas_, _Excluir_.
- Ações por linha: duplicar chave, excluir chave, copiar do inglês (preenche o alvo atual com o valor EN), validar espaços reservados (verifica se elementos como `{{name}}` em EN são preservados no alvo).
- Cada linha carrega flags opcionais exibidas como distintivos:

| Flag       | Significado                                                   |
| ---------- | ------------------------------------------------------------- |
| `new`      | Chave adicionada recentemente — precisa de revisão humana    |
| `changed`  | Valor EN alterado desde a última tradução — alvos podem estar desatualizados |
| `missing`  | Valor vazio em pelo menos um idioma alvo                      |
| `obsolete` | Chave não usada mais no código — seguro para excluir          |

- _Adicionar chave_ e _Localizar e substituir_ abrem mini-diálogos dedicados.
- Alternar _Salvar automaticamente_ — quando ativado, edições em um valor são imediatamente aplicadas ao estado local.

### Aba Importar / Exportar

Importar:

- _Formato_ — JSON / CSV / XLSX.
- _Modo_ — substituir valores existentes / mesclar / anexar.
- Interruptor _Manter chaves desconhecidas_ — quando desligado, chaves não presentes no arquivo importado são marcadas como `obsolete`.
- _Simular_ — execução simulada que informa o que mudaria (sem gravações).
- _Aplicar_ — confirma a importação. Barra de progresso aparece durante a execução.

Exportar:

- _Formato_ — JSON / CSV / XLSX.
- _Escopo_ — todas as chaves / chaves filtradas / chaves selecionadas.
- _Baixar_ — ação de espaço reservado (notificação por enquanto).

### Aba Publicar

- Um bloco resumo: _N chaves no total / M alteradas / K faltando_.
- Uma lista de chaves alteradas com valores antes / depois.
- Uma lista de avisos (ex.: incompatibilidade de placeholder, alvo faltando).
- _Salvar rascunho_ — persiste a cópia de trabalho como rascunho (`status = draft`).
- _Publicar_ — promove o rascunho para `active` e exibe uma notificação.

## Barra de ferramentas superior — menu Importar / Exportar

Dois atalhos globais no cabeçalho da página (separados das ações por coleção):

- _Importar coleções_ — abre o diálogo de importação no nível da página (importação em massa de múltiplas coleções de uma vez).
- _Exportar tudo_ — atalho para exportar todas as coleções em um único pacote (notificação por enquanto).

## Alterações não salvas e proteção de navegação

Existe uma flag global de "alterações não salvas" (`hasUnsavedGlobal`) — quando ativada, um rodapé fixo com _Descartar_ / _Salvar_ aparece. A página também instala um guarda `router.beforeEach`: tentar navegar com alterações não salvas dispara um diálogo nativo de _confirmação_ do navegador.

## Fluxos de trabalho

- **Traduzir uma nova chave em romeno** — Escolha a coleção na tabela → Editar → Aba Chaves → defina o seletor de idioma para `ro` → encontre a chave (ou _Adicionar chave_) → preencha o valor → _Salvar_ (ou deixe o Salvar automaticamente ligado).
- **Auditar o que falta em francês** — Editar uma coleção → Aba Chaves → filtro de status _Apenas faltando_ → idioma _fr_. Use _Copiar do Inglês_ como fallback rápido, ou _Validar placeholders_ antes de publicar.
- **Atualização em massa a partir de um XLSX** — Editar coleção → Aba Importar / Exportar → escolha XLSX, modo _Mesclar_, _Simular_ primeiro → revise a diferença → _Aplicar_.
- **Promover strings de rascunho para produção** — Editar coleção → Aba Publicar → confirme a lista de chaves alteradas, corrija avisos → _Publicar_.
- **Criar uma variante para um novo mercado** — Duplicar a coleção → renomear → adicionar o novo idioma em _Idiomas alvo_ → traduzir.
- **Arquivar um conjunto obsoleto** — Menu da linha → Arquivar. A coleção permanece na tabela mas muda para status `archived`; filtre por Status para encontrá-la depois.

## Dicas

- **Apenas front-end por enquanto.** Nada aqui atinge o backend ainda — `Salvar`, `Publicar`, `Exportar`, `Excluir`, `Arquivar` são todas mutações do estado local + notificações. Não confie para strings de produção reais até a API estar disponível.
- **Idioma base é fixo.** `en` é sempre o base — coleções não inglesas devem ser criadas como idiomas alvo de uma coleção base em inglês, não independentes.
- **Tags usam lógica E.** Filtrar por duas tags significa que a coleção deve conter _ambas_ as tags. Para buscar por qualquer uma, limpe uma das tags.
- **O guarda de navegação é global.** Mesmo quando só um diálogo está sujo, sair da página pede confirmação — salve ou descarte explicitamente para evitar o aviso.
- **Validação de placeholder é sua amiga** — executá-la antes de Publicar captura erros do tipo "perdemos o `{{name}}` na tradução" que quebram a string renderizada em tempo de execução.
- **Não confunda com a aba Locale em [General](general.md)** — essa aba define padrões (quais idiomas estão _habilitados_, formatos de data / hora / unidade). Esta página é onde as strings traduzidas realmente vivem.
- **Os dados de referência são mock.** Idiomas, namespaces e tags são atualmente codificados — quando o backend estiver disponível, espere que venham da API e possivelmente sejam editáveis.
