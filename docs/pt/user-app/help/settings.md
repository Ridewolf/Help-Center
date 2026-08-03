# Rider App — Configurações

Configurações (`/settings`) contém todas as preferências do app voltadas para o usuário: notificações, o que o mapa exibe, controles de privacidade, idioma, tema e desempenho.

**Não há botão Salvar.** A tela mostra as configurações em cache instantaneamente, atualiza-as em segundo plano e envia cada alteração automaticamente pouco depois de feita. Um usuário que mudou algo e fechou a tela imediatamente quase certamente salvou a alteração — essa é a resposta para "minha alteração foi aplicada?".

Vários desses interruptores alteram o que o [Mapa](../riding/map.md) exibe, então esta é a primeira tela a visitar para "o mapa está lento" e "não consigo ver os níveis de bateria".

## Notificações

Cinco interruptores independentes:

- **Notificações de Corrida**
- **Notificações de Promoção**
- **Atualizações do App**
- **Notificações Push**
- **Notificações por Email** — um único interruptor; não há subopções por tipo sob ele

Na mesma área:

| Controle           | Notas                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| **Som**            | Interruptor                                                                  |
| **Volume do Som**  | Controle deslizante — aparece somente enquanto **Som** está ativado          |
| **Vibração**       | Interruptor                                                                  |
| **Configurações do Radar** | Um cartão que aparece apenas em versões do app onde as configurações do radar estão habilitadas |

## Mapa e exibição

Interruptores:

- **Mostrar Nível da Bateria**
- **Mostrar Veículos Promocionais**
- **Mostrar Preços**
- **Zoom Automático**
- **Mapa 3D** — tem efeito imediato no mapa
- **Animações Reduzidas**

Além de **Modo de Dados**, um seletor com as opções **balanceado**, **baixo** e **alto**. Ele controla a qualidade dos blocos do mapa e o quanto de detalhe o mapa exibe, e é **a primeira coisa a tentar quando um usuário relata que o mapa está lento ou pesado** — reduza para _baixo_ e ative também **Animações Reduzidas**.

**Mapas Offline** não está disponível atualmente no app.

## Controles de privacidade

- Interruptor **Compartilhamento de Geolocalização**
- Interruptor **Compartilhamento de Dados**
- **Política de Privacidade** — abre a URL externa que você configurou em [Minha Empresa](../../settings/administration/my-company.md); o link aparece somente quando uma URL está definida
- **Gerenciar Sessões** — abre a tela de dispositivos conectados (`/settings/sessions`), a mesma acessível pelo Perfil

A tela completa de diretrizes de privacidade e segurança é uma rota própria (`/privacy`). **A exclusão da conta não está aqui** — o fluxo funcional de exclusão está na tela de Perfil.

## Região e aparência

| Controle       | Opções                           | Notas                                                                                                     |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Idioma**     | **en**, **ru**, **ro**           | Aplica imediatamente, sem recarregar. Apenas esses três são oferecidos nesta tela                           |
| **Unidades**   | —                                | Um seletor de unidades não está disponível atualmente no app                                               |
| **Tema**       | Claro, Escuro, Sistema            | Aplica imediatamente                                                                                        |
| **Estilo do Mapa** | Automático, Claro, Escuro       | **Desabilitado e forçado para Automático sempre que o Tema está definido como Sistema.** Mude o Tema para Claro ou Escuro para desbloqueá-lo |

Apenas os três idiomas do app acima aparecem aqui, embora outros locais existam em outras partes do produto — veja [Localization](../../settings/administration/localization.md) para o lado do painel.

## Modo de Condução

**Modo de Condução não está disponível atualmente no app.** Um usuário perguntando onde está o controle do modo de condução não perdeu permissão — a seção não está no app, e não há configuração no painel que a adicione.

## FAQ

| O usuário pergunta…                   | Resposta                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| "Onde está o botão Salvar?"          | Não existe — as alterações salvam automaticamente                                            |
| "Onde está o Modo de Condução?"      | Não está disponível atualmente no app                                                        |
| "Por que o Estilo do Mapa está cinza?" | O **Tema** está definido como **Sistema**. Mude para Claro ou Escuro primeiro                 |
| "Por que meu idioma não está listado?" | Esta tela oferece apenas **en**, **ru** e **ro**                                            |
| "Onde está a configuração de Unidades?" | Não está disponível atualmente no app                                                        |
| "Onde está o interruptor de Mapas Offline?" | Não está disponível atualmente no app                                                        |
| "Como excluo minha conta?"            | Pela tela de Perfil, não pelas Configurações                                                 |
| "Como vejo meus dispositivos conectados?" | **Gerenciar Sessões** — aqui, ou pelo mesmo botão no Perfil                                 |
| "O mapa está lento"                   | **Modo de Dados → baixo**, depois ative **Animações Reduzidas**. Veja [Map](../riding/map.md#solução-de-problemas) |

## Dicas

- **O Modo de Dados é seu controle de desempenho.** Antes de culpar o telefone do usuário ou seus blocos, peça para eles tentarem o modo _baixo_.
- **"Não salvou" quase nunca é verdade.** Peça para reabrirem a tela — o valor estará lá.
- **Reclamações sobre o mapa geralmente estão aqui, não no mapa.** Percentuais de bateria ausentes, preços faltando e veículos promocionais ausentes são todas opções nesta tela.
- **O tema bloqueia o Estilo do Mapa.** Memorize essa combinação; caso contrário, será um problema semanal.
