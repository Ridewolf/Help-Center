# Rider App — Mapa, Reservas e Escaneamento

O mapa (`/map`) é a tela inicial do rider app e o último passo do onboarding. Ele mostra três coisas: a posição do próprio usuário, os veículos disponíveis ao redor e as zonas que você desenhou para sua área de operação.

A equipe de suporte passa mais tempo nesta tela do que em qualquer outra, porque a reclamação mais comum dos riders — _"não há como iniciar uma corrida"_ — quase sempre é respondida aqui, em [A barra inferior é condicional](#a-barra-inferior-é-condicional).

Para a corrida em si (portões de início, pausa, término, comprovantes fotográficos) veja [Rides](rides.md). Para o lado do operador das zonas, veja [Zones](../../settings/infrastructure/zones.md).

## Estrutura de navegação

O botão **Menu** abre a gaveta lateral — a única navegação do app. Não há barra de abas inferior. A gaveta contém:

| Entrada da gaveta       | Abre                                         |
| ----------------------- | -------------------------------------------- |
| Linha do saldo da carteira | [Wallet](../money/wallet.md)                |
| **Histórico**           | [History](../money/history.md)                |
| **Suporte**             | [Support](../help/support.md)                 |
| **Privacidade**         | A tela de diretrizes de privacidade e segurança |
| **Configurações**       | [Settings](../help/settings.md)               |
| **Perfil**              | A tela de perfil do rider                      |

Promoções e Assinaturas não estão disponíveis atualmente no app, e a gaveta não tem entradas para elas — veja [Subscriptions & Promo Codes](../money/subscriptions.md).

## Controles na tela

**Controles superiores**

- **Menu** — abre a gaveta lateral descrita acima
- **Como andar** — abre a folha de ajuda para uso do app (o conteúdo de orientação no app é gerenciado via [Quick Guides](../../settings/content/quick-guides.md))
- **Minha localização** — recentra o mapa na posição do rider

**Barra inferior**

| Botão          | Quando aparece                                                                                   | O que faz                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Corrida em grupo** | Com a barra inferior                                                                           | Abre o fluxo de corrida em grupo                                                      |
| **Escanear**   | Com a barra inferior                                                                           | Abre o scanner de QR (`/ride/start`), com uma folha para entrada manual do código do veículo como alternativa |
| **Filtros**    | Apenas quando o rider tem tags privadas de veículo para filtrar, e não está em uma corrida ou reserva | Filtra os marcadores por essas tags                                                  |

### A barra inferior é condicional

A barra inferior é exibida **somente quando o rider tem acesso ao pagamento da corrida** — ou seja, um cartão vinculado, ou um provedor de pagamento que não suporta cartões salvos.

Um rider **sem cartão vinculado em um provedor que suporta cartões salvos não vê a barra inferior**, e portanto não vê o botão **Escanear** nem o botão **Corrida em grupo**. Isso é proposital e é a causa mais comum do "o app não me deixa iniciar uma corrida".

A solução: envie-o para **Wallet → Gerenciar Métodos de Pagamento → Adicionar Cartão**. Veja [Payment Methods](../money/payment-methods.md).

Se o botão **Filtros** estiver ausente, o rider simplesmente não tem tags privadas de veículo — ou já está em uma corrida ou reserva ativa.

## Encontrando um veículo

1. A posição do rider aparece assim que a permissão de localização é concedida. Ela é solicitada durante o onboarding e pode ser concedida novamente nas configurações do sistema do dispositivo.
2. Veículos disponíveis aparecem como marcadores.
3. Tocar em um marcador abre a folha de detalhes do veículo — planos tarifários mais **Iniciar** e **Reservar**.
4. Panorâmica, zoom com pinça e o controle **Minha localização** funcionam como esperado.

### O que um marcador mostra depende em parte da escolha do rider

Esses alternadores em [Settings](../help/settings.md) mudam o que o mapa desenha:

- **Mostrar nível da bateria**
- **Mostrar veículos promocionais**
- **Mostrar preços**
- **Zoom automático**
- **Mapa 3D**

Zonas bônus no mapa e o banner de veículo com desconto dentro da folha do veículo não estão disponíveis atualmente no app.

## Zonas

As zonas governam onde um veículo pode ser usado e onde uma corrida pode ser encerrada. Tocar em uma zona abre a folha de informações da zona.

O que uma zona específica faz — área restrita, área sem estacionamento, limite de velocidade, sobretaxa — depende inteiramente de como você a configurou em [Zones](../../settings/infrastructure/zones.md). Não há código de cores universal para informar ao rider; descreva sua própria configuração.

A regra de zona que os riders mais encontram é estacionamento: **encerrar uma corrida fora de uma zona de estacionamento permitida é rejeitado**, e o app abre um diálogo dedicado oferecendo mostrar as zonas no mapa. Esse fluxo está documentado em [Rides](rides.md#fora-da-zona-de-estacionamento).

## Reservando um veículo

**Reservar** é uma retenção real com um temporizador real, e o preço é baseado na tarifa anexada ao veículo:

1. O rider toca em um marcador, depois em **Reservar** na folha do veículo.
2. A janela gratuita é o **Tempo de reserva** da tarifa em minutos. Enquanto ela estiver ativa, o cartão de reserva conta **para baixo**.
3. Quando a janela gratuita expira, a retenção vira uma **retenção paga**: o cartão passa a contar **para cima**, e o **Preço da reserva paga** por minuto da tarifa é aplicado.
4. A parte paga da retenção aparece então como uma linha separada no detalhamento do custo da corrida finalizada.

Notas importantes para saber antes de responder a um rider:

- **Nunca presuma "alguns minutos".** Algumas tarifas oferecem janelas longas de gratuidade — 12 ou 24 horas. Leia o valor real da tarifa em [Tarifas de Veículo](../../settings/infrastructure/vehicle-tariffs.md).
- Se a tarifa deixar o campo **Tempo de reserva** em branco, o app usará uma janela curta de 3 minutos. Se deixar o campo **Preço da reserva paga** em branco, será aplicada uma pequena tarifa padrão por minuto — defina ambos explicitamente para que os riders vejam seus valores.
- Uma reserva está em um destes estados: _pendente_, _ativa_, _expirada_, _reservada_ ou _pausada_.
- Reservar **exige permissão de localização concedida**, e ainda pode ser recusada porque o rider está muito longe do veículo ou porque há um cooldown de reserva ativo para aquele veículo. Cada recusa exibe seu próprio diálogo — veja [Corridas](rides.md#por-que-um-passageiro-não-pode-iniciar-uma-corrida).

## Solução de Problemas

| O rider diz…                      | O que verificar                                                                                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Não vejo veículos"             | Permissão de localização concedida? Depois: o rider está dentro de uma área que você realmente atende?                                                                |
| "Não há botão de Escanear"      | Nenhum cartão vinculado em um provedor que suporte cartões salvos. Adicione um cartão em [Métodos de Pagamento](../money/payment-methods.md)                           |
| "Não há botão de Filtros"       | O rider não tem etiquetas privadas de veículo, ou já está em uma corrida ou em espera                                                                                   |
| "O mapa não carrega"             | Primeiro verifique a conectividade, depois **Configurações → Modo de Dados** (_balanceado_ / _baixo_ / _alto_), que controla a qualidade dos tiles do mapa e o nível de detalhe carregado |
| "O mapa está lento / pesado"    | Igual: reduza o **Modo de Dados** para _baixo_ e ative **Animações Reduzidas** em [Configurações](../help/settings.md)                                                  |
| "Não consigo iniciar uma corrida" | Siga as etapas em [Corridas](rides.md#por-que-um-passageiro-não-pode-iniciar-uma-corrida) na ordem — barra inferior, plano e pagamento, saldo mínimo para iniciar, localização, distância, cooldown, comprovantes |

## Dicas

- **Verifique a barra inferior antes de qualquer outra coisa.** Peça ao rider para enviar uma captura de tela do mapa; a ausência da barra inferior diagnostica o problema instantaneamente.
- **Permissão de localização é a segunda pergunta, sempre.** Sem posição não há reserva e, na maioria dos casos, não há início.
- **Zonas significam apenas o que você definiu.** Antes de dizer a um rider "você não pode estacionar aí", abra a zona no Painel e leia sua configuração real.
- **Janelas longas de reserva gratuita surpreendem a todos**, inclusive sua própria equipe. Conheça o **Tempo de reserva** da sua tarifa antes de explicar uma cobrança por espera.
