# Funções

A página de Funções (`/settings/roles`) é onde você define **o que os operadores podem fazer** no Painel. Uma função é um conjunto nomeado de permissões; cada operador tem exatamente uma função; as permissões decidem quais páginas eles veem e quais ações podem realizar.

Use esta página junto com [Operators](operators.md) — Operators atribui funções às pessoas, Funções define o que cada função pode realmente fazer.

Permissão necessária: **Funções** (`d4e5f6`).

## Como as permissões funcionam

Cada página e ação no Painel está protegida por um **ID de permissão** (ex.: `k7m8n9` para Veículos, `e4f5h6` para Clientes). Uma função é essencialmente uma lista de verificação desses IDs de permissão:

- Um operador pode ver uma página somente se sua função tiver a permissão da página
- Uma ação na linha (Editar, Excluir, etc.) fica oculta quando a função não tem a sub-permissão correspondente
- As permissões são avaliadas **a cada requisição** — altere uma função e o operador verá a mudança no próximo carregamento da página (ou antes)

Não há **herança** entre funções — cada função é independente. Funções com maior confiança simplesmente têm uma lista maior de permissões.

## Funções padrão vs personalizadas

As funções vêm em dois tipos:

| Tipo         | Editável | Propósito                                                               |
| ------------ | -------- | ----------------------------------------------------------------------- |
| **Padrão**   | Não      | Vêm com a plataforma (ex.: Proprietário, Admin). Garante uma base segura |
| **Personalizada** | Sim      | Criada por você — adapta-se à estrutura da sua equipe                  |

As funções padrão **Proprietário / Admin** não podem ser editadas nem excluídas — são a rede de segurança. Funções personalizadas são onde você ajusta permissões para corresponder às responsabilidades reais.

## Filtros

| Filtro  | Tipo      | Notas                                |
| ------- | --------- | ----------------------------------- |
| Pesquisa| Texto     | Pesquisa nome e descrição da função |
| Status  | Dropdown  | `Ativo` / `Inativo` (ou `Todos`)    |

## Colunas

| Coluna          | Ordenável? | Conteúdo                                                                    |
| --------------- | ---------- | --------------------------------------------------------------------------- |
| **Nome da função** | ✓          | O rótulo da função                                                          |
| **Descrição**   | —          | Texto curto explicando para que serve a função                              |
| **Tipo**        | —          | Etiqueta Padrão / Personalizada                                              |
| **Permissões**  | —          | Contagem de permissões concedidas (ex.: "23 / 84")                         |
| **Pontuação de confiança** | ✓          | Valor numérico indicando o poder da função (maior = mais poderosa)          |
| **Criado em**   | ✓          | Data de criação da função                                                    |

### Pontuação de confiança

A pontuação de confiança é uma medida numérica aproximada de "quão perigoso é o conjunto de permissões desta função" — usada para ordenação e indicações visuais. Uma função com permissão para excluir + atualização em massa + gerenciamento de permissões tem uma pontuação maior que uma função somente leitura. Não há escala fixa; trate como uma medida relativa dentro da sua lista de funções.

## Ações na linha

Um menu de três pontos por linha.

| Ação             | Permissão | O que faz                                                                                      |
| ---------------- | --------- | --------------------------------------------------------------------------------------------- |
| **Visualizar detalhes** | —         | Abre a página de detalhes da função com a lista completa de permissões                        |
| **Editar**       | `edit`    | Abre o formulário de edição (desabilitado com aviso para funções Padrão)                      |
| **Excluir**      | `delete`  | Exclui a função suavemente (com confirmação; apenas para funções Personalizadas; somente se nenhum operador a estiver usando) |

Se uma função estiver em uso, o sistema recusará a exclusão e informará quantos operadores ainda a possuem — reatribua-os primeiro.

## Formulário de criação / edição

O formulário da função exibe todas as permissões agrupadas por domínio (Operações, Suporte, Análises, Configurações, etc.) com caixas de seleção.

Campos principais:

- **Nome** (obrigatório, único)
- **Descrição** (opcional, mas recomendada)
- **Status** (Ativo / Inativo)
- **Árvore de permissões** — permissões de página e sub-permissões, agrupadas por domínio

Quando você desativa a permissão de uma página de nível superior, todas as suas sub-permissões são desativadas (o operador perde a página completamente). Ativar a permissão da página concede visualização por padrão — você então opta individualmente por _criar_, _editar_, _excluir_, etc. as sub-permissões.

Um pequeno indicador de **Pontuação de confiança** atualiza conforme você marca as caixas — útil para conferir com funções similares.

## Página de detalhes da função

Clicar em uma linha abre a página de detalhes da função mostrando:

- Nome, descrição, tipo, status
- Pontuação de confiança
- Lista completa de permissões (somente leitura, agrupada por domínio)
- Registro de atividade: quando a função foi criada, última edição, por quem
- Lista de operadores atualmente atribuídos (com links para seus perfis)

## Fluxos de trabalho típicos

- **Definir uma nova equipe** — `+ Criar` → nome (ex.: "Líder de equipe de campo") → marque as permissões necessárias → Salvar → atribua a função aos [operadores](operators.md) relevantes
- **Ajustar uma função existente** — encontre a função na lista → Editar → desmarque permissões que não deseja mais → Salvar (operadores com essa função perdem acesso na próxima requisição)
- **Promover um membro da equipe** — vá para [Operators](operators.md) → Editar → alterar Função → Salvar (não feito nesta página)
- **Auditar quem pode excluir veículos** — abra esta lista → ordene por Pontuação de confiança → revise as sub-permissões Editar / Excluir em Veículos de cada função
- **Desativar uma função** — certifique-se que nenhum operador a possui ([Operators](operators.md) filtro por função) → Excluir

## Dicas

- **Menos é mais** — comece com visualização apenas e adicione ações específicas; resista à tentação de copiar uma função superior e depois cortar
- **Teste por personificação** (onde suportado) — antes de implantar uma função, faça login como um operador de teste com essa função e experimente os fluxos de trabalho
- **Funções padrão são seu recurso de segurança** — Proprietário / Admin sempre existem; se você se trancar acidentalmente fora de uma função Personalizada, um Admin pode restaurar o acesso
- **Pontuação de confiança é uma dica, não uma regra** — duas funções com a mesma pontuação de confiança podem fazer coisas muito diferentes; sempre verifique a árvore real de permissões
- **Permissões são avaliadas no servidor** — desativá-las na função não remove a sessão atual do operador, mas a próxima solicitação será negada
- **Documente cada função Personalizada** no campo Descrição — seis meses depois, "Gerente de Frota (leitura + edição, sem exclusão)" é uma salvação
