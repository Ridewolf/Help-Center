# Aplicativo de Serviço — Visão Geral, Login e Navegação

O Aplicativo de Serviço é o app da Ridewolf para operadores de campo — o que um técnico carrega na rua para trocar baterias, desbloquear patinetes, resolver falhas e fechar bilhetes. É um produto separado do Rider App e do Painel do operador: possui seu próprio login e sua própria navegação.

Após o login, o app abre diretamente no mapa da frota (`/battery-swap`) em vez de um painel inicial, porque no campo o mapa é o ponto de partida para todo trabalho.

Para onde ir a seguir:

- [Mapa da frota e busca por QR](../fleet/fleet-map.md) — encontre um veículo
- [Página do veículo](../fleet/vehicle-controls.md) — controles, bilhetes, falhas, alertas
- [Troca de bateria](../operations/battery-swap.md) — a sequência cronometrada de troca
- [Encontrar Patinete](../operations/finder.md) — radar Bluetooth para os últimos metros
- [Modo em lote](../operations/batch-mode.md) — uma fila de veículos para trabalhar
- [Ferramentas de back-office](../tools/back-office-tools.md) — repetição, análises, filas de suporte

## Login

A tela de login (`/login`) é exibida apenas para operadores desconectados — se você já estiver logado, o app leva você direto ao mapa da frota.

1. Insira seu **email de trabalho**. Deve ser um endereço completo (com arroba e ponto), caso contrário o campo é rejeitado antes de enviar qualquer coisa.
2. Insira sua **senha** — pelo menos 6 caracteres.
3. Envie. Apenas contas de operador funcionam aqui; credenciais de rider são rejeitadas.
4. Seu perfil é carregado (nome, função, cargo, departamento, empresa, permissões) e o app abre o mapa da frota.

### Login com Google e Apple

Os botões **Google** e **Apple** aparecem somente quando esse método de login está habilitado para sua instalação. A ausência do botão não é uma configuração por operador — ninguém na sua empresa o verá.

- **No app** — tocar no botão abre a página do provedor no navegador do seu telefone, e o app espera o navegador devolver o login. A espera expira após 5 minutos (com um curto período de tolerância quando o app volta ao primeiro plano). Se o app foi fechado enquanto o navegador estava aberto, uma inicialização fria ainda conclui o login.
- **No navegador** — o login do Google abre em uma janela popup.

De qualquer forma, o restante do fluxo é igual ao login por senha.

## A gaveta de navegação

Toda tela tem um botão de menu que abre a gaveta de navegação — um painel que desliza da esquerda. Conteúdo, de cima para baixo:

| Item                | Abre                  | Notas                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| **Seu perfil**      | `/profile`            | Avatar, nome e email                               |
| **Driver App**      | `/battery-swap`       | O mapa da frota — "Gerencie sua frota em movimento" |
| **Repetição**       | `/replay-player`      | Repetir o dia de um veículo                         |
| **Encontrar Patinete** | `/finder`           | "Localize um patinete via Bluetooth"              |
| **Rebalanceamento** | `/rebalancing`        | Apenas para proprietário, desabilitado, mostra um selo **Em breve** |
| **Suporte**         | `/support/tickets`    | Apenas para proprietário                            |
| **Conversas**       | `/support/dialogs`    | Apenas para proprietário                            |
| **Comprovantes de Estacionamento** | `/support/park-proofs` | Apenas para proprietário                            |
| **Análises**        | `/analytics`          | Apenas para proprietário                            |

Três controles adicionais ficam fixos em um rodapé abaixo da lista rolável:

- **Configurações** — abre a gaveta de Configurações do App (veja abaixo)
- **Preferências do mapa** — abre a folha de configurações do mapa, descrita em [Mapa da frota](../fleet/fleet-map.md#preferências-do-mapa)
- **Sair** — estilizado em vermelho

Duas peculiaridades de rótulo valem a pena memorizar, pois causam a maioria das dúvidas "Não consigo encontrar": o mapa da frota está listado como **Driver App**, não "Troca de Bateria", e o radar Bluetooth está listado como **Encontrar Patinete**, não "Finder". Cada item também traz uma descrição de uma linha abaixo do rótulo.

Os oito itens de navegação formam uma lista única, não grupos aninhados — **Suporte**, **Conversas** e **Comprovantes de Estacionamento** são pares mesmo que suas rotas fiquem todas sob `/support`. O item correspondente à sua tela atual recebe um fundo de destaque.

Duas regras explicam a maioria dos relatos "o menu está diferente no meu telefone":

- **Itens apenas para proprietário são totalmente ocultos** para outros operadores — eles não ficam cinza, então não há nada para tocar nem perguntar.
- **Itens desabilitados mostram um selo Em breve** onde normalmente haveria um chevron.

## Página de perfil

Abra `/profile` pelo botão de perfil na gaveta.

- **Cabeçalho** — um avatar grande (suas iniciais quando não há foto) com um botão de câmera para enviar uma. Apenas imagens, máximo 5 MB. Um selo de status fica ao lado, além de um selo de proprietário para proprietários.
- **Conta** — função, departamento, cargo, telefone, número de permissões, data de associação e seu ID do usuário com um botão de copiar (útil quando o suporte pedir).
- **Espaços de trabalho** — se você pertence a mais de uma empresa, alterne aqui. O app recarrega sob a empresa escolhida.
- **Segurança** — **Bloqueio do App**, **Alterar PIN**, **Alterar Senha**, **Sessões Ativas**.
- **Mais** — **Aparência e Idioma**, que abre a mesma gaveta de Configurações do App que o item **Configurações** da gaveta principal.
- **Sair** na parte inferior.

### Bloqueio do App

O **Bloqueio do App** está disponível apenas no app instalado, portanto a seção não aparece no navegador. Ativá-lo executa um assistente curto que cadastra um PIN e a biometria do seu dispositivo. Uma vez cadastrado, use **Alterar PIN** para trocar o código.

### Alterar Senha

1. Abra **Alterar Senha** na seção Segurança.
2. Digite sua senha atual, depois a nova duas vezes.
3. Envie.

Todos os três campos exigem pelo menos 8 caracteres, a nova senha deve ser diferente da atual e a confirmação deve coincidir. O diálogo limpa seus campos e erros toda vez que é aberto e fechado, para que nada que você digitou fique em um telefone compartilhado.

### Sessões Ativas

As sessões são agrupadas por navegador, sistema operacional e fabricante do dispositivo. Cada grupo mostra:

- Um distintivo de contagem
- A localização (país e endereço IP)
- Há quanto tempo esteve ativo pela última vez
- Um distintivo de **dispositivo atual** no que você está usando

**Revogar** está disponível em todos os grupos, exceto no dispositivo atual. **Sair de outros dispositivos** revoga todas as outras sessões de uma vez — a resposta mais rápida quando um telefone é perdido.

## Painel de Configurações do App

Uma folha inferior, aberta a partir do item **Configurações** da gaveta ou do botão **Aparência e Idioma** na página de perfil. Todo controle se aplica imediatamente; não há botão Salvar.

| Configuração     | Opções                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Tema**         | Claro, Escuro, Sistema                                     |
| **Estilo do Mapa** | Padrão, Rua, Satélite, 3D, Navegação, Plano               |
| **Mapas Offline** | Baixar o mapa ao redor da sua localização atual para uso offline |
| **Idioma**       | Automático, English, Română, Russian                       |
| **Meu Marcador** | Uma grade de 6 ícones para como sua própria posição é desenhada |

**Mapas Offline** baixa uma região ao redor de onde você está agora e a mantém em cache. Enquanto isso ocorre, você vê um contador de blocos baixados e um botão **Cancelar**. Desativar a configuração cancela qualquer download em andamento e limpa a região em cache.

A aparência do mapa para veículos (marcadores, sobreposições, agrupamento, taxa de atualização) está na folha separada de **Preferências do Mapa** — veja [Fleet map](../fleet/fleet-map.md#preferências-do-mapa).

## Saindo da conta

**Sair** está na gaveta de navegação e novamente na parte inferior da página de perfil. Desativa o Bloqueio do App, encerra sua sessão e retorna para a tela de login com sua sessão limpa do dispositivo.

## Problemas comuns

| Sintoma                                         | Causa                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Ausência do botão **Google** ou **Apple**       | Esse método de login não está habilitado para sua instalação           |
| Um item de menu que um colega tem está faltando para você | É apenas para o proprietário                                            |
| Um item não abre e mostra **Em breve**            | Está deliberadamente desativado por enquanto                            |
| Sem seção **Bloqueio do App** na página de perfil | Você está usando a versão do navegador; o Bloqueio do App precisa do app instalado |
| Login rejeitado antes de qualquer carregamento    | O formato do email ou a senha de 6 caracteres mínimos falharam no dispositivo |
| Rótulos do menu não correspondem ao esperado      | O mapa da frota é o **Driver App**; o radar Bluetooth é o **Find Scooter** |
