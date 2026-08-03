# Veículo — Criar e Editar

Duas URLs compartilham o mesmo layout de formulário:

- **Criar** — `/vehicles/create` — registra uma nova unidade física
- **Editar** — `/vehicles/:id/edit` — atualiza os metadados de um veículo existente

Ambos são acessados a partir da [lista de Veículos](vehicles.md) (botão `+ Criar` no canto superior direito) ou do [detalhe do Veículo](vehicle-detail.md) (`Ações → Editar veículo`).

Permissões:

- **Criar** — `Veículos` (`k7m8n9`) + sub-permissão relacionada à criação
- **Editar** — `Veículos` (`k7m8n9`) + a sub-permissão `edit`

## Layout

A página se divide em duas colunas no desktop, empilha no mobile:

- **Esquerda (8/12)** — o próprio formulário, dentro de um cartão _Informações do Veículo_
- **Direita (4/12)** — a barra lateral **Guia de Campos** com ajuda contextual para o campo em foco, além de uma pré-visualização ao vivo do que você preencheu

## Campos

Cinco campos no total. Campos obrigatórios são marcados com um asterisco vermelho (`*`).

### 1. Etiqueta (obrigatório)

O código legível impresso no adesivo do veículo (ex.: _RW-001_).

- Deve ser único em toda a sua frota
- Texto livre — a convenção típica é _PREFIXO-NNN_ (prefixo da sua empresa + número sequencial)
- Clique em **Gerar** (ícone de brilho) para preencher automaticamente — o sistema lê o prefixo da sua empresa e as etiquetas existentes, calcula a próxima sequência e escreve no campo. Um spinner de carregamento aparece enquanto consulta.

### 2. Status (obrigatório)

O status inicial / atual do veículo. Doze opções — mesma lista do [filtro de status da lista de Veículos](vehicles.md#referência-de-status).

Valores iniciais comuns ao criar:

- **Não Pronto** — criado mas ainda não liberado para os riders (escolha padrão segura)
- **Disponível** — pronto para aluguel imediato (usar somente após verificação de IoT e estacionamento)
- **Armazenamento** — para estoque que ainda não está em serviço

Ao editar, altere o status com cuidado — isso pode tirar o veículo da rotação de aluguel ou colocá-lo de volta.

### 3. Dispositivo IoT (opcional)

O módulo IoT vinculado a este veículo (a caixa celular que controla o travamento/destravamento e reporta bateria/GPS).

- Dropdown pesquisável — digite para filtrar por IMEI ou etiqueta
- Opcional — você pode criar um veículo sem IoT agora e vinculá-lo depois (em _Editar_)
- Um dispositivo IoT só pode estar vinculado a um veículo por vez

Ao editar, trocar o dispositivo IoT é permitido, mas parece irreversível — o novo dispositivo começa a reportar sob este veículo, o antigo fica desvinculado. Use isso quando uma placa for fisicamente substituída.

### 4. Modelo do Veículo (opcional)

O registro do modelo (Configurações → Configurações do Veículo) que define as tarifas da unidade, configurações padrão e categoria.

- Dropdown pesquisável — digite para filtrar pela etiqueta do modelo
- Opcional na criação, recomendado definir assim que souber o modelo — tarifas e comportamentos vêm dele
- Alterar o modelo depois atualiza as tarifas ativas e regras de comportamento — confirme com operações antes de mudar em uma unidade ativa

### 5. Etiquetas (opcional)

Etiquetas aplicadas pelo operador específicas para este veículo.

- Multi-seleção — escolha uma ou mais
- Pesquisável
- São etiquetas _no nível do veículo_, separadas das etiquetas _no nível do modelo_ herdadas do Modelo do Veículo escolhido
- Corridas neste veículo herdarão essas etiquetas no nível do veículo no início da corrida (veja a [lista de Corridas](../trips/rides.md) para entender como funciona a herança de etiquetas)

## Barra lateral Guia de Campos

A coluna da direita é um **guia contextual**, não um duplicado do formulário:

- **Pré-visualização ao vivo** dos valores que você digitou/selecionou (para verificar antes de salvar)
- **Dica inline** que atualiza conforme você foca um campo — explica o que o campo significa, armadilhas comuns, padrões
- **Auto-campos** mostrados: etiqueta atual, etiqueta de status, etiqueta do dispositivo IoT, etiqueta do modelo, contagem de etiquetas

Use como um segundo par de olhos. Em tela larga fica visível enquanto você rola o formulário.

## Salvar / Voltar

- **Voltar** (`←`) — descarta alterações não salvas e retorna à página anterior (a lista, ou o detalhe no caso de edição)
- **Salvar** — valida o formulário e cria / atualiza o veículo. Um toast confirma o sucesso; erros nos campos são destacados abaixo do campo com mensagem vermelha

Se a validação falhar (etiqueta ausente, status ausente, etiqueta duplicada) a página permanece aberta com o campo problemático contornado em vermelho.

## Criar vs Editar — diferenças

| Aspecto            | Criar                               | Editar                                                    |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Etiqueta           | Vazio ou _Gerar_                   | Pré-preenchido com a etiqueta atual                        |
| Status             | Vazio (você deve escolher)         | Pré-preenchido com o status atual                          |
| Dispositivo IoT    | Vazio ou escolha entre dispositivos não vinculados | Pré-preenchido; trocar desvincula o anterior              |
| Modelo do Veículo  | Vazio                             | Pré-preenchido                                            |
| Etiquetas          | Vazio                             | Pré-preenchido com as etiquetas no nível do veículo atual |
| Após salvar        | Redireciona para o detalhe do novo veículo | Permanece no formulário / redireciona para o detalhe (dependendo do fluxo) |
| Entrada no registro de atividade | "Veículo criado por _nome do operador_" | "Veículo editado por _nome do operador_" com diferença a nível de campo |

Ambos os fluxos escrevem no [Registro de Ações](vehicle-detail.md#aba-atividade) do veículo.

## Fluxos típicos

- **Cadastrar um novo lote** — gerar etiqueta → status _Não pronto_ → vincular IoT → definir Modelo → salvar. Uma vez que a unidade esteja em campo e testada, editar para _Disponível_
- **Trocar uma placa IoT quebrada** — editar → desvincular / escolher novo IoT → salvar → aguardar o primeiro sinal (Último sinal no detalhe)
- **Reclassificar** — alterar Modelo ao migrar unidades entre frotas/categorias
- **Adicionar uma etiqueta temporária** — editar → Etiquetas → salvar (ex.: "Evento 2026-05", "Empréstimo")

## Dicas

- **Use Gerar** para etiquetas — mantém sua numeração organizada e evita duplicatas
- **Defina o Modelo cedo** — as tarifas vêm do modelo; um modelo não definido significa que as corridas neste veículo usarão regras de preço sem modelo
- **Não altere o Status para _Disponível_ até verificar fisicamente o IoT** — os usuários poderão desbloqueá-lo imediatamente
- **Observe a dica do Guia de Campo** quando tiver dúvidas sobre um campo — a ajuda inline está mais atualizada do que este artigo
- **O registro de atividades é sua rede de segurança** — cada salvamento é registrado com nome do operador e carimbo de data/hora na [detalhe do veículo](vehicle-detail.md#aba-atividade)
