# Cliente — Criar e Editar

Duas URLs:

- **Criar** — `/clients/create` — registrar manualmente um novo cliente (raro; a maioria dos clientes se cadastra sozinha)
- **Editar** — `/clients/:id/edit` — atualizar os dados pessoais e status de um cliente existente

Ambas são acessadas a partir da [lista de Clientes](clients.md) (botão `+ Criar` no canto superior direito) ou da [página de detalhes do Cliente](client-detail.md) (_Ações → Editar cliente_).

Permissões:

- **Criar** — `Clients` (`e4f5h6`) + uma sub-permissão relacionada à criação
- **Editar** — `Clients` (`e4f5h6`) + a sub-permissão `edit`

## Quando usar

A maioria dos seus clientes **se cadastra sozinha** pelo aplicativo móvel Rider App — raramente você precisará criá-los no Painel.

A criação manual é para:

- **Contas de teste** — QA interno, usuários de demonstração
- **VIP / corporativo** — contas que precisam existir antes do cliente baixar o app
- **Onboarding conduzido pelo operador** — eventos / parcerias onde a equipe registra em nome do cliente

Para todo o resto, deixe o app cuidar do cadastro e use **Editar** quando precisar corrigir informações de contato ou alterar o status.

## Layout

Um único cartão com um formulário vertical, sem barra lateral Field Guide (diferente do formulário de Veículo).

## Campos — Criar

Sete campos no total. Todos obrigatórios.

| Campo               | Validação                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Nome**            | 1–100 caracteres                                                                                                       |
| **Sobrenome**       | 1–100 caracteres                                                                                                       |
| **Email**           | Formato padrão de email (`name@domain.tld`); deve ser único entre os clientes                                          |
| **Telefone**        | Formato internacional começando com `+` (ex.: `+373 60 123 456`); apenas dígitos, espaços, traços e parênteses         |
| **Senha**           | **Pelo menos 12 caracteres**, deve conter **uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial** |
| **Confirmar senha** | Deve coincidir exatamente com a senha                                                                                  |
| **Status**          | Status inicial: `Ativo` / `Inativo` / `Bloqueado` / `Congelado` / `Registrando` (padrão _Ativo_)                      |

A validação ocorre ao salvar e inline ao sair do campo. Erros aparecem em vermelho abaixo do campo.

### Regras para senha

A exigência para senha é o campo mais rigoroso. O Painel rejeita qualquer senha que não cumpra todas as quatro regras:

- ≥ 12 caracteres
- ≥ 1 letra maiúscula (A–Z)
- ≥ 1 letra minúscula (a–z)
- ≥ 1 dígito (0–9)
- ≥ 1 caractere especial (ex.: `!@#$%^&*`)

Após salvar, o cliente usará essa senha (mais o telefone ou email) para entrar no Rider App. Informe a senha por um canal verificado — nunca cole senhas em chats que não sejam criptografados de ponta a ponta.

### Status (na criação)

| Valor           | Uso                                                                                   |
| --------------- | ------------------------------------------------------------------------------------- |
| **Ativo**       | Padrão — o cliente pode usar o serviço imediatamente                                  |
| **Inativo**     | Criado mas ainda não liberado (você mudará para Ativo depois)                         |
| **Bloqueado**   | Pré-bloqueado (raro — geralmente usado ao recriar conta após incidente de fraude)    |
| **Congelado**   | Conta pausada                                                                         |
| **Registrando** | Cadastro ainda em andamento (usar somente ao integrar com fluxo externo)             |

## Campos — Editar

Editar oculta os campos de senha (as senhas são redefinidas em outro lugar) e adiciona **Etiquetas**.

| Campo          | Observações                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| **Nome**       | Preenchido automaticamente, mesma validação que Criar                       |
| **Sobrenome**  | Preenchido automaticamente, mesma validação que Criar                       |
| **Email**      | Preenchido; alterar pode quebrar o login do cliente até que ele revalide     |
| **Telefone**   | Preenchido; mesma ressalva do Email                                        |
| **Etiquetas**  | Multi-seleção; rótulos aplicados pelo operador para agrupamento e filtro   |
| **Status**    | Preenchido com o status atual; mesmo enumeração                             |

## Salvar / Cancelar

- **Cancelar** (ou seta de voltar) — descarta alterações não salvas e retorna à página anterior
- **Salvar** — valida o formulário e cria / atualiza o cliente. Confirmação aparece em toast; erros em campos são destacados em vermelho

Se a validação falhar (campo faltando, regras de senha, email duplicado, formato de telefone), a página permanece aberta com o campo problemático destacado.

## Criar vs Editar — diferenças

| Aspecto           | Criar                                                   | Editar                                               |
| ----------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| Campos de senha   | Presentes e obrigatórios                                | Ocultos                                              |
| Etiquetas         | Não no formulário (definidas depois via Editar ou lista/detalhe) | Presentes                                            |
| Status            | Vazio → padrão _Ativo_                                  | Pré-preenchido com o status atual                    |
| Email / Telefone  | Vazio                                                   | Pré-preenchido — alterar pode forçar nova verificação |
| Após salvar       | Redirecionar para o detalhe do novo cliente             | Redirecionar de volta para o detalhe do cliente     |
| Entrada no registro de atividade | "Cliente criado por _nome do operador_"             | "Cliente editado por _nome do operador_" com diferença nos campos |


Ambos os fluxos escrevem no [Registro de Ações](client-detail.md#aba-atividade) do cliente.

## Fluxos típicos

- **Criar um VIP** — `+ Criar` na lista → preencher nome, email real, telefone real, senha forte, status _Ativo_ → salvar → notificar o rider com as credenciais
- **Corrigir um erro de digitação** — linha da lista → menu da linha → _Editar_ → corrigir o campo → salvar (a alteração aparece no Registro de Ações com a diferença)
- **Cadastrar um lote corporativo** — criar via script pela API (este formulário é para casos únicos); use Editar depois para aplicar etiquetas específicas da empresa
- **Alterar telefone após troca de dispositivo** — Editar → atualizar Telefone → salvar → o cliente precisará revalidar no próximo login (dependendo das regras do backend)

## Dicas

- **Formato do telefone importa** — deve começar com `+` e o código do país; o formato é obrigatório e o validador rejeitará entradas malformadas
- **Escolher uma senha forte** — para criações únicas pelo operador, use uma frase longa ("rideTheWolf2026!RW") que satisfaça todas as regras de uma vez; registre-a no seu gerenciador de senhas, não no chat
- **Unicidade do email** — email duplicado é a falha mais comum ao Criar; verifique a lista primeiro pesquisando o email
- **Não altere Email / Telefone casualmente em clientes existentes** — os fluxos de verificação dependem deles; coordene com o cliente antes de salvar
- **Etiquetas pertencem aqui, não na linha** — você também pode adicionar/remover etiquetas pela ação em massa na lista, mas o formulário de edição é o local correto para mudanças pontuais
- **Mudanças de status têm peso de auditoria** — mudar _Ativo → Bloqueado_ por este formulário é registrado da mesma forma que a ação dedicada _Ações → Bloquear cliente_ — ambos são válidos
