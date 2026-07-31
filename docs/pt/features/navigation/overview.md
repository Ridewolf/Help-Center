# Navegação

O painel navega por três superfícies principais: a **barra lateral** à esquerda, a **barra superior** ao longo do topo e o **breadcrumb** dentro da barra superior. Eles se comportam de forma consistente em todas as páginas.

## Barra lateral

A barra lateral é sua navegação principal. Cada item é uma página única (Painel, Corridas, Veículos, Clientes, Suporte) ou um **grupo** que se expande em subitens (Pagamentos, Suporte, Análises, Configurações, Aplicativos).

### Expandir e recolher

- **Clique em um grupo** (ex.: _Suporte_) para expandi-lo; clique novamente para recolher.
- **Alterne a barra lateral inteira** com `⌘ B` (macOS) ou `Ctrl B` (Windows/Linux). O estado recolhido mostra apenas ícones — passe o mouse sobre um ícone para ver seu rótulo como dica.
- O estado da barra lateral persiste entre carregamentos de página (suportado por cookie).

### Estado ativo

A seção atual é destacada na cor de destaque (vermelho por padrão). Quando você está dentro de um grupo, o cabeçalho do grupo também permanece destacado para que você sempre saiba onde está.

### Contagens e badges

Alguns itens mostram um **badge** com um número — são contagens de não lidos/pendentes puxadas ao vivo das notificações:

- _Suporte → Bilhetes_ — bilhetes pendentes atribuídos a você
- _Suporte → Comprovantes de Estacionamento_ — comprovantes pendentes aguardando revisão
- _Corridas_, _Veículos_, _Clientes_ — contagens quando relevantes

### Permissões

Você vê apenas os itens que sua **função e permissões** permitem. Se uma seção está faltando para você e outro colega a tem — é uma restrição de permissão, não um erro. Pergunte a um administrador se você deveria ter acesso.

## Barra superior

A barra superior aparece em todas as páginas. No desktop, ela tem o breadcrumb à esquerda e cinco controles à direita.

### Breadcrumb (esquerda)

O breadcrumb é seu caminho de volta pela hierarquia:

`Início → Veículos → RW-001`

- **Clique em qualquer segmento** para voltar a esse nível (o último segmento é a página atual e não é clicável).
- O breadcrumb está sempre visível — é a forma mais segura de sair de uma página profunda.

### Controles (direita, desktop)

Na ordem, da esquerda para a direita:

| Ícone | O que faz                                                                             |
| ---- | ------------------------------------------------------------------------------------- |
| ✨   | **AI Chat** — abre um painel de chat com um assistente que responde perguntas do painel |
| ?    | **Suporte** — abre esta base de conhecimento em uma gaveta lateral, contextual à página atual |
| 🔔   | **Notificações** — eventos recentes do sistema e alertas (badge vermelho mostra contagem de não lidos) |
| 👤   | **Perfil** — configurações, senha, sair, controles de tema (seu avatar)               |

### Mobile

Em telas com largura menor que 769 px, a barra superior se recolhe:

- A barra lateral se recolhe em um gatilho hamburger no canto esquerdo
- O breadcrumb fica ao lado do hamburger e rola horizontalmente se for longo
- Os cinco controles viram quatro botões à direita (AI, Suporte, Notificações, Avatar) — mesmas ações, alvos de toque maiores

## Painel de perfil

Clicar no seu avatar abre um painel deslizante à direita com:

- **Perfil** — suas informações pessoais
- **Alterar senha**
- **Configurações** — preferências (idioma, tema, notificações)
- **Suporte** — vai para a página inicial do Suporte
- **Sair** (vermelho)
- Alternadores de tema/idioma/estilo de mapa na parte inferior

## Dicas

- **Passe o mouse sobre itens da barra lateral** quando recolhida — as dicas aparecem imediatamente, sem atraso
- **Use o breadcrumb** para sair de páginas profundas em vez do botão voltar do navegador — é mais rápido e evita recarregamentos
- **`⌘/Ctrl + B`** é uma forma rápida de ganhar mais espaço horizontal em páginas com muitos dados (tabelas, mapas)
- **Suporte (?)** na barra superior é **consciente da página** — tenta abrir o artigo mais relevante para onde você está; se não houver, recorre à busca
