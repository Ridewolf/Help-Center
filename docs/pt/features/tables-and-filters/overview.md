# Tabelas e Filtros

Quase todas as páginas de lista no Painel (Veículos, Corridas, Clientes, Pagamentos, Bilhetes de Suporte, Comprovantes de Estacionamento, Conversas, Análises, Operadores, etc.) compartilham a mesma estrutura. Uma vez que você conhece o padrão, todas as páginas de lista funcionam da mesma forma.

## Anatomia de uma página de lista

De cima para baixo:

1. **Cabeçalho da página** — título, ações no nível da página (ex.: _Criar_, _Exportar_)
2. **Barra de pesquisa** — busca por texto completo em vários campos
3. **Linha de filtros** — menus suspensos e pílulas para refinar resultados
4. **Pílulas de filtro ativo** — pílulas removíveis mostrando os filtros aplicados
5. **Barra de ações em massa** — aparece quando uma ou mais linhas são selecionadas
6. **Tabela** — colunas ordenáveis, ações da linha à direita
7. **Paginação** — canto inferior direito

## Pesquisa

A barra de pesquisa busca nos campos mais relevantes para aquela página (ex.: etiqueta, ID, nome do proprietário).

- **Digite para pesquisar** — os resultados são filtrados conforme você digita, com um pequeno atraso para evitar sobrecarregar o servidor
- **Limpar** — clique no × no campo ou pressione `Esc`
- A pesquisa é executada **no servidor** em todo o conjunto de dados, não apenas na página atual

## Filtros

Filtros restringem o conjunto de resultados sem usar pesquisa por texto. Cada filtro é um menu suspenso (seleção única ou múltipla, dependendo do campo).

- **Aplicar ao alterar** — os filtros são aplicados instantaneamente, sem botão Aplicar
- **Múltiplos filtros combinam com E** — quanto mais filtros, mais restrito o resultado
- **Pílulas de filtro ativo** aparecem acima da tabela; clique no × de uma pílula para remover apenas aquele filtro
- **Limpar tudo** — quando muitos filtros estão aplicados, um botão _Limpar tudo_ aparece ao lado das pílulas

Tipos comuns de filtro:

| Tipo         | Comportamento                                                  |
| ------------ | -------------------------------------------------------------- |
| Status       | Menu suspenso de seleção única                                 |
| Tipo / Modelo| Menu suspenso de seleção única                                 |
| Etiquetas    | Seleção múltipla com pílulas dentro do menu suspenso          |
| Intervalo de datas | Widget de calendário (de / até)                            |
| Intervalo numérico | Entradas numéricas de de / até (ex.: bateria 0–30%)        |
| Pesquisa por ID | Texto livre dentro de uma pílula de filtro (separado da pesquisa principal) |

## Ordenação

- **Clique no cabeçalho da coluna** — ordena em ordem crescente
- **Clique novamente** — ordena em ordem decrescente
- **Clique uma terceira vez** — limpa a ordenação (volta à ordem padrão)
- Um **ícone de seta** (↑ / ↓) aparece ao lado do nome da coluna quando é a ordenação ativa

Nem toda coluna é ordenável. Colunas ordenáveis mostram um estado sutil ao passar o mouse no cabeçalho; as não ordenáveis não mostram.

## Paginação

No canto inferior direito da tabela:

- **Números das páginas** — clique em um número para ir até ele
- **Setas Anterior / Próximo** nas laterais
- **Seletor de tamanho da página** — menu suspenso (tipicamente 10 / 20 / 50 / 100 linhas por página)

A paginação é feita no servidor. Seus filtros e pesquisa se aplicam ao **conjunto inteiro de dados**, não apenas à página que você está vendo — a página 3 dos resultados filtrados ainda está filtrada.

## Ações na linha

Cada linha tem um **menu de três pontos** no extremo direito. O menu abre um dropdown com ações específicas da linha:

- **Visualizar** — abre a página de detalhes
- **Editar** — abre o formulário de edição
- **Excluir** — remove o registro (com diálogo de confirmação)
- **Ações específicas da página** — ex.: _Enviar push_ em clientes, _Desbloquear_ em veículos, _Reembolsar_ em pagamentos, _Atribuir_ em bilhetes

As ações que você vê dependem das suas **permissões** — ações para as quais você não tem permissão ficam ocultas.

## Seleção múltipla e ações em massa

Nas páginas que suportam (Clientes, Veículos, etc.):

1. **Selecionar linhas** — clique na caixa de seleção à esquerda de cada linha
2. **Selecionar tudo nesta página** — clique na caixa de seleção no cabeçalho da coluna
3. Aparece uma **barra de ações em massa** no topo mostrando a contagem selecionada e as ações em massa disponíveis
4. **Escolha uma ação** — ela é aplicada a todas as linhas selecionadas
5. **Limpar seleção** — × na barra de ações em massa, ou desmarque a caixa no cabeçalho

Ações em massa comuns:

- Adicionar ou remover etiquetas
- Enviar notificação push
- Aplicar multa ou recarregar saldo (clientes)
- Alterar status

## Estados vazio e de carregamento

- **Carregando** — linhas esqueleto aparecem brevemente enquanto os dados carregam
- **Sem resultados** — um espaço amigável ("Nenhum resultado correspondente") com um botão _Limpar filtros_ quando filtros estão ativos
- **Erro de rede** — estado de erro com botão _Tentar novamente_ (mais comum em conexões instáveis)

## Dicas

- **Espere o debounce** — após digitar na pesquisa, espere uma fração de segundo antes de clicar — o servidor dispara uma vez quando você para de digitar
- **Compartilhe visualizações filtradas** — pesquisa, filtros, ordenação e página são refletidos na URL. Copie a URL e envie para um colega; ele verá exatamente a mesma visualização
- **Voltar/avançar do navegador** funciona como esperado — ele navega pelas suas alterações de filtro
- **Combine pesquisa + filtros** — a pesquisa é uma camada de texto livre sobre os filtros. Use filtros para restringir por status/tipo, depois pesquise por nome dentro desse subconjunto
- **Aumente o tamanho da página** para 100 quando quiser escanear muitos registros visualmente em vez de clicar pelas páginas
- **Permissões são o filtro silencioso** — se um colega vê linhas que você não vê, quase sempre é uma diferença de permissões, não um bug
