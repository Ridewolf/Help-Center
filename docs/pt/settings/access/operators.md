# Operadores

A página de Operadores (`/settings/operators`) é o **diretório de funcionários** — todo empregado que tem acesso ao Painel. Cada operador tem uma função (veja [Funções](roles.md)), metadados opcionais de departamento / cargo, etiquetas para filtragem e um status (Ativo / Inativo).

Diferente dos [Clientes](../../operations/customers/clients.md) (seus clientes) — Operadores são a **equipe interna** que gerencia a plataforma.

Permissão necessária: **Operadores** (`t4u5v6`). Subpermissões controlam ações de edição.

## Como os operadores chegam aqui

Operadores são criados por você (um administrador) via o botão **+ Criar** — não há autoinscrição:

1. **+ Criar** abre o formulário do operador — nome, email, função, departamento / cargo / etiquetas opcionais
2. O novo operador recebe um email com instruções de login e uma senha temporária
3. Ele faz login, completa seu perfil (`/profile`) e pode começar a trabalhar conforme as permissões da sua função
4. Operadores inativos não podem fazer login — altere o status para inativo quando um funcionário sair

## Filtros

| Filtro | Tipo         | Notas                                                    |
| ------ | ------------ | -------------------------------------------------------- |
| Pesquisar | Texto         | Pesquisa por nome, email, cargo, departamento               |
| Status | Dropdown     | `Ativo` / `Inativo` (ou `Todos`)                         |
| Etiquetas   | Multi-seleção | Filtra por etiquetas aplicadas aos operadores (ex: "Turno da noite") |

## Colunas

| Coluna         | Ordenável? | Conteúdo                                                                 |
| -------------- | --------- | ----------------------------------------------------------------------- |
| **Usuário**       | ✓         | Avatar + nome + sobrenome + email; link para a página de detalhes do operador      |
| **Função**       | —         | Etiqueta da função do operador (link para [Funções](roles.md)) |
| **Departamento** | —         | Etiqueta opcional de departamento                                               |
| **Cargo**   | —         | Etiqueta opcional de cargo                                                 |
| **Etiquetas**       | —         | Etiquetas aplicadas ao operador                                            |
| **Status**     | ✓         | `Ativo` (verde) / `Inativo` (cinza)                                    |

## Ações na linha

Um menu de três pontos por linha. As ações disponíveis dependem das permissões:

| Ação           | Permissão | O que faz                                      |
| ---------------- | ---------- | ------------------------------------------------- |
| **Visualizar detalhes** | —          | Abre a página de detalhes do operador                   |
| **Editar**         | `edit`     | Abre o formulário de edição (nome, função, departamento, etc.) |

Não há **ação de Excluir** — os registros dos operadores são mantidos para fins de auditoria. Para impedir o login, altere o status do operador para _Inativo_ via Editar.

## Página de detalhes

Clicar em uma linha (ou _Visualizar detalhes_) abre a página de detalhes do operador com:

- Informações pessoais (nome, email, telefone, foto)
- Função + instantâneo das permissões
- Departamento / cargo / etiquetas
- Status
- Registro de atividades (eventos de login, mudanças de função)

Edite a partir daí ou pelo menu da linha — ambos levam ao mesmo formulário.

## Formulário de Criar / Editar

O **formulário do operador** (`+ Criar` ou _Editar_) é simples:

- **Nome / Sobrenome** (obrigatório)
- **Email** (obrigatório, único entre operadores)
- **Função** (obrigatório, dropdown das funções disponíveis — veja [Funções](roles.md))
- **Departamento / Cargo** (opcional)
- **Etiquetas** (multi-seleção opcional)
- **Status** (Ativo / Inativo)
- Apenas na criação: campo de **senha inicial** ou senha gerada automaticamente enviada por email ao operador

Salvar valida e registra no log de auditoria. Operadores recém-criados recebem automaticamente um email de boas-vindas.

## Fluxos típicos

- **Integração de novo funcionário** — `+ Criar` → preencher nome/email/função → Salvar → confirmar que recebeu o email de boas-vindas → pedir para fazer login e completar o perfil
- **Mudança de função após promoção** — Editar → alterar Função → Salvar (as novas permissões entram em vigor na próxima requisição do operador, não retroativamente)
- **Saída** — Editar → definir Status = Inativo → Salvar (o registro permanece para auditoria; login é bloqueado)
- **Planejamento de turnos por etiqueta** — aplicar etiquetas como "Turno da noite" → filtrar a lista por etiqueta para ver quem está escalado

## Dicas

- **Função é o campo mais poderoso** — seja cuidadoso ao alterá-la. Rebaixar de Admin para Suporte remove imediatamente o acesso de escrita
- **Inativo ≠ Excluído** — o histórico do operador é preservado; altere para Ativo para restaurar o acesso
- **A lista é ordenada por nome por padrão** — se tiver muitos operadores, pesquise por email ou departamento em vez de rolar
- **Etiquetas aqui são diferentes das etiquetas de clientes** — são específicas para operadores (ex: "Turno da noite", "Treinador") e não compartilham o mesmo namespace
- **Restrições de autoedição** — você não pode alterar sua própria função pelo menu da linha; use Perfil para mudanças pessoais
