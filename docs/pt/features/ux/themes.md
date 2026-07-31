# Temas

O painel possui três configurações independentes de aparência:

- **Modo** — claro, escuro ou seguir o sistema operacional
- **Cor** — a cor de destaque usada para botões, links, badges e estados ativos
- **Estilo do mapa** — os blocos base do mapa (escolha separada para modo claro e escuro)

Os três ficam na **Ficha de perfil** na parte inferior — clique no seu avatar na barra superior para abri-la.

## Modo (claro / escuro / sistema)

Alterne entre três modos:

| Ícone      | Modo   | Comportamento                                                  |
| ---------- | ------ | -------------------------------------------------------------- |
| 🖥️ Monitor | Sistema | Segue a preferência do seu SO; troca automaticamente ao mudar o SO |
| ☀️ Sol     | Claro  | Sempre claro, ignora o SO                                      |
| 🌙 Lua     | Escuro | Sempre escuro, ignora o SO                                     |

O modo **Sistema** é o padrão. Se você alterar o tema do SO (ex.: modo escuro agendado no macOS ao pôr do sol), o painel muda imediatamente — sem recarregar.

## Cor

A cor de destaque define botões, links, badges, anéis de foco e o item ativo da barra lateral. Doze paletas pré-definidas estão disponíveis:

| Cor    | Visualização |
| ------ | ------------ |
| Preto  | ⚫           |
| Vermelho | 🔴         |
| Rosa   | 🌹           |
| Rosa claro | 🩷        |
| Laranja | 🟠          |
| Amarelo | 🟡          |
| Verde  | 🟢           |
| Verde azulado | 🟢      |
| Ciano  | 🔵           |
| Azul   | 🔵           |
| Índigo | 🟣           |
| Roxo   | 🟣           |

Escolha a que achar mais fácil de ler no modo selecionado (algumas cores ficam melhores no claro, outras no escuro).

## Estilo do mapa

Páginas que exibem mapas (Mapa ao vivo, detalhe do Veículo, editor de Zona, rota da Corrida, etc.) usam um estilo base de mapa que você pode escolher independentemente. O painel mantém **duas preferências separadas de estilo de mapa** — uma para modo claro, outra para modo escuro — para que o mapa combine com o restante da interface ao alternar modos.

- Trocar o modo (claro ↔ escuro) troca automaticamente para o estilo de mapa escolhido para aquele modo
- Estilos disponíveis dependem do seu provedor de mapas (MapTiler ou alternativa); normalmente: Streets, Satellite, Light, Dark, Outdoors

## Onde ficam as preferências

As três configurações são armazenadas no **localStorage** do seu navegador sob estas chaves:

| Configuração      | Chave de armazenamento |
| ----------------- | ---------------------- |
| Modo              | `app-dark-mode`        |
| Cor               | `app-theme`            |
| Estilo do mapa (claro) | `app-map-style-light` |
| Estilo do mapa (escuro) | `app-map-style-dark`  |

Isso significa:

- **Por dispositivo, por navegador** — máquina diferente = preferências diferentes
- **Não sincronizado** com sua conta — colegas usando a mesma conta veem seu próprio tema
- **Limpo ao usar "Limpar dados de navegação"** para este site
- Janelas **Anônimas** começam com os padrões

## Dicas

- **Comece com o modo Sistema** — deixe o agendamento do SO decidir por você; mude para Claro/Escuro só se preferir diferente do SO
- **Combine o estilo do mapa com o modo** — Satellite é difícil de ler no modo escuro; prefira um estilo "Dark" ou "Streets Dark"
- **A cor afeta o contraste** — Amarelo ou Ciano em fundo claro podem ser difíceis de ler; se os botões parecerem "finos", tente um destaque mais escuro (Vermelho, Azul, Índigo)
- **Um tema não é uma permissão** — cada operador pode escolher o seu; colegas não verão suas alterações
