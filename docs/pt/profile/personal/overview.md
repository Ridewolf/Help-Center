# Seu perfil

O **Perfil** é _sua_ conta dentro do Ridewolf — o operador que está conectado agora. Aqui você pode alterar seu nome, foto, senha, tema, sons de notificação e revisar onde está conectado. Se sua conta de operador também estiver vinculada a uma conta de cliente nos apps Rider, você pode alternar para a visualização de cliente da mesma conta.

Quatro rotas compartilham este artigo, todas acessíveis pelo avatar na barra superior:

| Rota                | O que é                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — redireciona automaticamente para a visualização de operador ou cliente conforme sua conta |
| `/profile/operator` | Visualização do operador de si mesmo (padrão para equipe)                                        |
| `/profile/customer` | Visualização do cliente (apenas se sua conta também estiver vinculada a um cliente rider)         |
| `/profile/legacy`   | Visualização legada de página única — mesmos dados dispostos em um único formulário longo (fallback para as visualizações redesenhadas) |

Esta é a visualização de **autoatendimento**. Para gerenciar _outros_ operadores (seus colegas), use [Operadores](../../settings/access/operators.md) em vez disso.

Sem restrição de permissão — todo usuário conectado pode abrir seu próprio perfil.

## Como `/profile` decide para onde enviar você

Acessar `/profile` diretamente nunca carrega uma página — ele redireciona imediatamente:

1. Lê `lastPersona` do localStorage do seu navegador (definido na última vez que você usou o seletor de persona no cabeçalho principal)
2. Se `lastPersona = customer` e sua conta tem um cliente vinculado → `/profile/customer`
3. Se `lastPersona = operator` → `/profile/operator`
4. Caso contrário: operador se você tem conta de operador, cliente apenas se não tiver
5. Fallback padrão: `/profile/operator`

Você vê um spinner com "Redirecionando..." pelo breve momento entre o acesso e o redirecionamento.

## O cabeçalho principal (compartilhado entre visualizações de operador + cliente)

Um cabeçalho fixo fica no topo de `/profile/operator` e `/profile/customer`. Ele mostra:

- **Avatar** com sobreposição de câmera ao passar o mouse — clique para abrir o diálogo de **Carregar Avatar**
- **Nome** (clique para copiar) e **email** (clique para copiar) — ambos têm dicas de ferramenta para copiar para a área de transferência
- **Distintivos** — seu status (`Ativo` / `Inativo`), `Verificado` e `Cliente` se estiver na visualização de cliente
- **KPIs rápidos** — quatro pequenos blocos, conteúdo depende da persona (veja abaixo)
- **Seletor de persona** — dois botões (`Operador` / `Cliente`). O botão Cliente fica desabilitado com dica de ferramenta quando sua conta não tem cliente vinculado
- **Ações** — botão `Editar`, mais um menu de três pontos com _Copiar ID do Usuário_, _Copiar Email_, _Abrir como JSON_ (exporta seu registro de usuário em uma nova aba) e _Sair_

Alternar persona por esses botões persiste sua escolha em `lastPersona` no localStorage para que da próxima vez `/profile` saiba para onde enviar você.

## `/profile/operator` — três abas

A visualização do operador organiza tudo em três abas. O hash da URL (`#overview`, `#security`, `#preferences`) reflete a aba ativa, para que você possa criar links profundos para uma aba.

### Aba Visão Geral

Dois cartões lado a lado: **Org & Função** (esquerda) e **Atividade** (direita).

O cartão **Org & Função** mostra, em formulário somente leitura:

| Campo          | Origem                                                                |
| -------------- | --------------------------------------------------------------------- |
| **ID do Usuário**    | Seu ID de operador — truncado para 8 caracteres com ícone para copiar |
| **Equipes**      | Etiquetas de tags atribuídas a você (resolvidas do cache de tags)             |
| **Email**      | O email da sua conta                                                    |
| **Status**     | Distintivo `Ativo` / `Inativo`                                           |
| **Função**       | Etiqueta da função, com contagem de permissões entre parênteses                     |
| **Departamento** | Do perfil da sua organização                                        |
| **Cargo**   | Do perfil da sua organização                                        |
| **Localização**   | Cidade e fuso horário, quando definidos                                           |
| **2FA**        | `Habilitado` (verde) ou `Desabilitado` (cinza) — mostrado apenas quando conhecido        |

Este cartão é **somente leitura** na visualização do operador. Para alterar qualquer um desses campos (função, departamento, cargo, tags), um administrador deve editar seu registro em [Operadores](../../settings/access/operators.md) — você não pode se promover.

O cartão **Atividade** mostra suas últimas cinco ações, extraídas de `/activity/operator/{id}`:

- Ponto colorido (verde = Criado, azul = Atualizado, laranja = Excluído, primário = outro)
- Distintivo de categoria ("Criado" / "Atualizado" / "Excluído" / "Segurança")
- Descrição ("Veículo #ABC atualizado", etc.)
- Tempo relativo ("há 2 horas")
- Ator — geralmente "por você mesmo", "pelo Sistema" para mudanças automáticas

Se o feed de atividade estiver vazio, o cartão exibe sua **sessões recentes de login** como eventos de Segurança. Um botão "Ver tudo" na parte inferior alterna para a aba Segurança onde a lista completa de sessões está.

Os KPIs acima dos cartões mostram `{n} actions · {m} changes in 30d`.

### Aba Segurança

Dois cartões empilhados: **Gerenciamento de senha** e **Sessões ativas**.

**Gerenciamento de senha** permite que você altere sua própria senha por meio de um diálogo. Abra-o pelo botão _Alterar_ ao lado de "Senha atual".

O diálogo tem três campos:

| Campo                | Validação                                          |
| -------------------- | --------------------------------------------------- |
| Senha atual     | Obrigatório; mínimo 8 caracteres                           |
| Nova senha         | Obrigatório; mínimo 8 caracteres; deve ser diferente da atual |
| Confirmar nova senha | Obrigatório; mínimo 8 caracteres; deve ser igual à nova senha  |

O botão de envio permanece desabilitado até que os três campos estejam válidos. Erros inline aparecem em vermelho abaixo de cada campo enquanto você digita. Em caso de sucesso, você recebe uma notificação e o diálogo fecha; o formulário é limpo.

Abaixo da seção de senha, uma pequena tabela de **histórico de senhas** lista os últimos três eventos de alteração com data, ação e motivo. (Atualmente, este é um espaço reservado estático — o backend ainda não expõe um endpoint de histórico de senhas.)

**Sessões ativas** são exibidas pelo gerenciador compartilhado de sessões. As sessões são **agrupadas por impressão digital do dispositivo** (navegador + SO + tipo de dispositivo + fabricante + modelo), então várias abas no mesmo laptop se agrupam em um só grupo.

Cada cabeçalho de grupo mostra:

- Um ícone do dispositivo (Monitor / Smartphone / Laptop baseado em `deviceType`)
- Rótulo do dispositivo — fabricante + modelo, ou SO + versão, ou tipo de dispositivo
- Rótulo do navegador
- Um distintivo de status: `active` (última atividade em menos de 1h, verde), `inactive` (menos de 24h, cinza), `old` (mais de 24h, desativado), ou `Este dispositivo` (a sessão atual, contorno azul)
- Hora da última atividade (relativa)
- Contagem de sessões no grupo

Clique no cabeçalho do grupo para expandi-lo e ver cada sessão individual dentro, cada uma com país e IP da consulta de localização, data de login e um ícone de lixeira para revogar essa sessão. O grupo também pode ser revogado como um todo via o botão "Sair deste dispositivo" na parte inferior da lista expandida (a sessão atual é sempre preservada).

Um botão **Sair de outras sessões** no topo revoga _todas_ as outras sessões de uma vez. O dispositivo atual nunca é afetado. A contagem inclui todas as sessões não atuais em todos os dispositivos.

### Aba Preferências

Dois cartões: **Tema e estilo do mapa** e **Sons de notificação**.

O primeiro cartão incorpora o seletor compartilhado de tema e o seletor de estilo de mapa — os mesmos widgets da folha de perfil flutuante. Veja [Themes](../../features/ux/themes.md) para a descrição completa dos modos, cores de destaque e estilos de mapa.

O segundo cartão incorpora as configurações de sons de notificação — sons por tipo de toast, som por notificação e controles independentes de volume para toasts e notificações. Veja [Notifications](../../features/ux/notifications.md) para o seletor completo.

Tudo nesta aba grava no **localStorage** do seu navegador, não no servidor. Isso significa que as preferências são por dispositivo e por navegador — elas não acompanham você quando faz login em outra máquina.

## `/profile/customer` — visão do lado do cliente

Se sua conta de operador estiver **também** vinculada a uma conta de cliente (rider) na mesma instalação Ridewolf, você pode alternar de persona para ver como você aparece do lado do cliente. O botão de persona no cabeçalho principal leva você aqui.

### Quando você não tem uma conta de cliente

Você vê um cartão de estado vazio tracejado com:

- Um ícone e o título "Vincule seu perfil de cliente"
- Uma descrição
- Dois botões — **Criar Conta de Cliente** e **Vincular Existente** (ambos atualmente mostram toasts "Em breve"; ainda sem backend)
- Um alerta de verificação
- Um link "Continuar como Operador" de volta para `/profile/operator`

### Quando você tem uma conta de cliente

Duas abas: **Visão geral** e **Corridas**.

Os KPIs principais mudam para números relevantes ao cliente: **Saldo** (moeda formatada), **Total de Corridas**, **Avaliação** (1 decimal), **Bônus** (pontos).

A **aba Visão geral** mostra:

- Cartão **Carteira** — saldo atual, pontos de bônus opcionais (somente se > 0), e o método de pagamento vinculado (marca + últimos 4 dígitos + mês/ano de validade + tipo de provedor) se existir
- Cartão **Estatísticas de Corridas** — três blocos: Total de Corridas, Avaliação com uma estrela (e um sub-rótulo "{n} avaliados"), Pontos de Bônus
- Barra lateral **Informações da Conta** — ID do Cliente (monoespaçado, truncado), Provedor, Criado (relativo), Última Atividade (relativo, quando presente), Última Corrida (relativo, quando presente)
- Cartão **Dispositivos** — seus dispositivos de cliente registrados (iOS / Android / Web) exibidos pelo compartilhado `ClientDevicesList`
- Links rápidos **Segurança e suporte** — FAQ, Contatar Suporte, Reportar Problema (botões espaço reservado)

A **aba Corridas** lista suas últimas 20 corridas (mais recentes primeiro), com:

- ID da Corrida (monoespaçado) e hora de criação (relativa)
- Distintivo de status (`completed` sólido, `active` secundário, outros contorno)
- Distância (km), duração (minutos ou `Hh Mm`), rótulo do veículo
- Preço (moeda formatada)
- Linha de estrelas para avaliação, quando presente

Usa um contêiner rolável com altura fixa de 500px e um estado de carregamento com 4 esqueletos. Estado vazio mostra um ícone de mapa e "Nenhuma corrida ainda".

**Não há formulário de edição aqui** — este é um espelho somente leitura do que aparece no seu Rider App. O botão Editar no cabeçalho principal atualmente exibe um toast "Em breve".

## `/profile/legacy` — fallback de página única

`/profile/legacy` é o **perfil antigo de uma página**, mantido para fallback e links diretos. Ele reúne quase tudo em uma página rolável em vez de abas:

- Um cartão de cabeçalho de perfil com avatar, nome, email, distintivo de status e botões Editar / Salvar / Cancelar
- Cartão **Informações Pessoais** — Nome, Sobrenome editáveis (campos de texto ao editar); Email somente leitura e Telefone editável
- Cartão **Informações da Conta** — ID do Usuário somente leitura (truncado + copiar), Email, Status (valor bruto)
- Cartão **Aparência** — seletor de tema e seletor de estilo de mapa (mesmos widgets da aba Preferências)
- Cartão **Notificações e Sons**
- Cartão **Segurança** — linha de senha com botão Alterar (não abre o diálogo atualmente)
- Um rodapé mostrando a versão do app (`CF_PAGES_COMMIT_SHA` primeiros 7 caracteres, ou `DEVELOPMENT_KIT` localmente)

Duas ressalvas importantes:

- A ação **Salvar** atualmente exibe um toast "Recurso ainda não disponível" — o backend não tem endpoint `PATCH /operators/me`, então edições em Nome, Sobrenome e Telefone não persistem de fato
- Upload de foto foi removido desta visualização; use o `/profile/operator` redesenhado e clique no seu avatar para abrir o diálogo de upload

Prefira `/profile/operator` para uso diário. Mantenha esta URL nos favoritos apenas se uma correção futura para a visualização redesenhada exigir fallback aqui.

## Diálogo de upload de avatar

Abre a partir do cabeçalho principal (clique no seu avatar) nas visualizações redesenhadas.

Aceita:

- Tipos de arquivo: apenas `image/png`, `image/jpeg`, `image/jpg` — qualquer outro tipo gera um erro de "Tipo de arquivo"
- Tamanho máximo do arquivo: **10 MB** — arquivos maiores geram um erro de "Tamanho do arquivo"
- Arraste e solte ou clique para escolher

O diálogo mostra uma prévia, o nome do arquivo e uma barra de progresso durante o upload. A sequência de upload é:

1. `POST` do arquivo → retorna um `avatarUrl`
2. `PATCH /me` com `{ photo: avatarUrl }` → retorna o registro de usuário atualizado
3. A loja de usuários atualiza com o novo campo `photo`; o novo avatar aparece imediatamente em todos os locais onde é referenciado

Notificações confirmam sucesso ou falha. Em caso de sucesso, o diálogo se fecha automaticamente.

## Referência de campos (em todas as rotas)

Uma lista consolidada do que é editável, onde e como é validado:

| Campo                         | Editável em                   | Validação                                                          |
| ----------------------------- | ----------------------------- | ----------------------------------------------------------------- |
| Avatar / foto                 | Operador                     | PNG/JPG/JPEG, máximo 10 MB                                         |
| Nome                         | Legado (quebrado — sem backend) | Nenhuma validação no cliente                                      |
| Sobrenome                    | Legado (quebrado — sem backend) | Nenhuma validação no cliente                                      |
| Telefone                     | Legado (quebrado — sem backend) | Nenhuma validação no cliente                                      |
| Senha atual                  | Operador → Segurança          | Obrigatório, ≥ 8 caracteres                                        |
| Nova senha                  | Operador → Segurança          | Obrigatório, ≥ 8 caracteres, deve ser diferente da atual           |
| Confirmar senha             | Operador → Segurança          | Obrigatório, deve coincidir com a nova senha                       |
| Modo do tema                | Operador → Preferências, Legado | Apenas localStorage                                               |
| Cor do tema                 | Operador → Preferências, Legado | Apenas localStorage                                               |
| Estilo do mapa             | Operador → Preferências, Legado | Apenas localStorage                                               |
| Configuração de som de notificação | Operador → Preferências, Legado | Apenas localStorage                                               |
| Função / Departamento / Cargo / Etiquetas | _Não aqui_                   | Editado por um administrador via [Operadores](../../settings/access/operators.md) |

## Fluxos típicos

- **Redefinir sua própria senha** — `/profile/operator` → aba Segurança → Alterar → preencha os três campos → Enviar. O diálogo fecha e você permanece conectado
- **Sair de um computador público que esqueceu** — aba Segurança → expanda o grupo de dispositivos → ícone de lixeira naquela sessão, ou "Sair deste dispositivo" para todas as sessões nele. Sua sessão atual está sempre protegida
- **Atividade suspeita** — aba Segurança → "Sair de outras sessões" no topo revoga todas as sessões não atuais com um clique
- **Alterar seu avatar** — clique no avatar no cabeçalho principal → solte um PNG/JPG de até 10 MB → Carregar
- **Mudar o painel para modo escuro** — aba Preferências → Modo do tema = Escuro (ou defina Sistema e deixe o SO decidir)
- **Favoritar uma aba** — cada aba tem um hash (`#overview`, `#security`, `#preferences`); copie a URL com o hash e use como link direto
- **Ver-se como cliente** — se sua conta estiver vinculada, clique no botão Cliente no cabeçalho principal → veja sua visão no Rider App (saldo, corridas, dispositivos). Volte da mesma forma

## Dicas

- **O que você pode editar aqui é limitado** — sua função, departamento, cargo, etiquetas e email são todos gerenciados na página [Operadores](../../settings/access/operators.md) por um administrador. Perfil é apenas para seu próprio avatar, senha, sessões e preferências
- **Preferências são locais** — temas e sons de notificação ficam no localStorage, não no servidor. Limpe os dados do navegador e eles serão resetados; mude de máquina e não acompanham
- **O hash decide a aba** — `/profile/operator#security` abre direto na Segurança. Use isso em links de chat para que um colega veja a mesma visão que você
- **O botão Salvar da visualização legada é atualmente um beco sem saída** — até que `PATCH /operators/me` seja implementado, use a visualização redesenhada do operador para tudo; para mudanças de nome, peça a um administrador
- **Sessões são agrupadas por dispositivo** — se você vir uma entrada cobrindo várias abas, isso é esperado. Expanda para ver sessões individuais
- **A persona de cliente depende dos dados** — mesmo que o botão esteja visível, ele não faz nada útil a menos que sua conta tenha um registro `client` anexado. Se não tiver, ignore o botão Cliente e permaneça em `/profile/operator`
