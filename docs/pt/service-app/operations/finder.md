# Encontrar Scooter — Localizando um Veículo via Bluetooth

**Encontrar Scooter** (`/finder`) é para os últimos 30 metros: o GPS indica que a scooter está aqui, mas ela não está visível. Em vez de coordenadas, o localizador guia você pelo nível do sinal Bluetooth — exatamente o que você precisa quando o GPS perde precisão.

A tela é listada como **Encontrar Scooter** no [menu de navegação](../basics/overview.md#a-gaveta-de-navegação).

O fluxo tem quatro etapas: **escolher um veículo → pré-verificação → navegação → radar**.

## 1. Escolher um veículo e pré-verificação

1. Abra **Encontrar Scooter**. O seletor lista seus veículos ordenados por etiqueta.
2. Toque no veículo que você está procurando. A pré-verificação é executada imediatamente.

A pré-verificação busca uma cópia atualizada daquele veículo (nunca uma em cache) e verifica se ele tem uma última posição utilizável e se seu rastreador está online.

**Um rastreador offline não bloqueia você.** Você recebe uma dica: a última localização conhecida pode estar desatualizada, mas o Bluetooth ainda pode encontrar a scooter quando você estiver perto. Esse é o objetivo da funcionalidade — trate o aviso de offline como informação, não como um impasse.

## 2. Iniciar a busca e permissões

Toque em **Iniciar Busca**. Esse único toque solicita acesso à bússola e então inicia o rastreamento de localização, a bússola e a varredura Bluetooth simultaneamente.

A solicitação da bússola precisa vir de um toque real — então, se você dispensar um pedido de permissão por acidente, volte ao seletor e comece novamente com um toque novo em vez de esperar na tela.

Encontrar Scooter precisa das permissões de localização, movimento e Bluetooth. Se nada acontecer após **Iniciar Busca**, uma dessas três permissões foi negada.

## 3. Etapa de navegação

O mapa mostra:

- Uma linha de rota de você até o veículo
- Um rótulo de distância, em metros ou quilômetros
- Uma agulha da bússola apontando para o veículo

O Bluetooth já está escaneando durante esta etapa, silenciosamente, enquanto você anda — não é necessário ativar nada.

## 4. Etapa do radar

O aplicativo muda automaticamente para o radar no momento em que a scooter é detectada via Bluetooth pela primeira vez, e mostra uma notificação "Scooter detectada". Você nunca muda de etapa manualmente.

O radar mostra o sinal Bluetooth como um gradiente do quente para o frio — **frio é longe, quente é perto** — além do rumo da bússola e da distância.

**Leia o radar pelo movimento, não pelo valor absoluto.** Caminhe alguns passos e observe se o gradiente esquenta; se esfriar, vire-se. Quando a leitura da bússola estiver instável, a tela indica para você andar em um 8 para calibrá-la.

O indicador de sinal fica frio após cerca de 4 segundos sem um novo sinal Bluetooth, o que é normal ao se mover atrás de obstáculos. Depois que a scooter é detectada uma vez, o radar permanece disponível pelo resto da busca.

## Beep

O botão **Beep** emite o localizador do veículo. Há um intervalo de 10 segundos entre os beeps, durante o qual o botão fica desabilitado e mostra uma contagem regressiva.

Esse limite é intencional: toque uma vez e escute enquanto continua se movendo. Beeps repetidos parados não trazem informação nova.

## Problemas comuns

| Sintoma                                    | O que fazer                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| A scooter nunca é detectada                | O alcance do Bluetooth é curto — ande pela área em vez de ficar parado. O último ponto GPS pode estar desatualizado se o rastreador estiver offline |
| O radar nunca aparece                      | A scooter nunca foi vista via Bluetooth; o radar precisa desse primeiro sinal                      |
| O radar de repente fica frio               | A detecção some após alguns segundos sem sinal — continue andando, ele vai captar novamente        |
| A bússola gira ou aponta para o lado errado| Calibre andando em um 8 e afaste-se de grades de metal e carros estacionados                       |
| O **Beep** está desabilitado               | O intervalo de 10 segundos está em andamento                                                      |
| Nada acontece após **Iniciar Busca**       | Uma permissão de localização, movimento ou Bluetooth foi negada — permita e comece novamente no seletor |

## Dicas

- **Use primeiro a última corrida e telemetria do veículo.** Abra a [página do veículo](../fleet/vehicle-controls.md) para verificar se o rastreador está reportando antes de gastar vinte minutos no local.
- **Ande em linha reta, não em círculo.** Dois ou três trechos retos de 10 metros dizem mais sobre a direção do que girar devagar.
- **Combine beep e radar** — o radar indica a direção, o beep confirma qual das três scooters à sua frente é.
- **Reporte o que encontrar.** Se o veículo não estiver lá, altere seu status na página do veículo (por exemplo, **Precisa de investigação** ou **Roubado**) enquanto ainda estiver no local.
