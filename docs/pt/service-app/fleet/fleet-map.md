# Mapa da Frota e Consulta de Veículo por QR

O mapa da frota (`/battery-swap`) é a tela inicial do Service App após o login: um mapa em tela cheia da sua frota com uma linha de botões de ação flutuantes na parte inferior. Todo trabalho de campo começa aqui — encontre o veículo e depois abra-o.

Abrir um veículo a partir desta tela leva você para a [página do Veículo](vehicle-controls.md), onde ficam os controles. Para o menu e configurações do app, veja a [visão geral do Service app](../basics/overview.md).

## Como ler o mapa

Cada veículo é um marcador no mapa. Por trás de cada marcador, o app mantém os valores que você precisa no campo:

- Etiqueta e status
- Percentual da bateria do veículo
- Percentual da bateria do rastreador
- Posição, direção e velocidade em km/h
- Travado ou destravado
- Qualidade do sinal móvel, como um valor de 0 a 36
- Status do GPS e se o rastreador está online
- IMEI do rastreador

Toque em um marcador para abrir esse veículo.

### Visualização em lista

Uma lista em tela cheia desliza sobre o mapa e mostra todos os veículos que correspondem aos filtros atuais. Seu próprio cabeçalho carrega os botões para voltar ao mapa e abrir os filtros, e a linha de botões de ação inferior fica oculta enquanto a lista está aberta.

Tocar em uma linha abre a mesma página do veículo que tocar no marcador desse veículo — use a visualização que for mais rápida para o trabalho.

## Filtrando veículos

Os filtros ficam em uma folha de filtro, e **eles são salvos no seu dispositivo** — eles permanecem mesmo após fechar e reabrir o app. Esta é a razão mais comum para um veículo "desaparecer": um conjunto de filtros aplicado ontem ainda está ativo hoje.

Os controles, em ordem:

| Controle             | O que faz                                                                              |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Status chips**     | Filtra por status; as chips são coloridas para combinar com os pontos de status no mapa ao vivo |
| **Battery range**    | Um controle deslizante de 0–100%                                                      |
| **Vehicle type**     | Um carrossel de tipos — mostrado apenas quando sua frota tem mais de um tipo de veículo |
| **Last signal**      | Predefinições: qualquer, 1h, 6h, 24h, 7d — oculta veículos offline por mais tempo que o intervalo escolhido |
| **Tags**             | Tags públicas primeiro em ordem alfabética, depois tags privadas com ícone de cadeado  |
| **Search**           | Texto livre, correspondendo a etiqueta, VIN ou IMEI                                  |

Dois comportamentos para lembrar:

- **Múltiplas tags usam lógica E** — um veículo deve ter *todas* as tags selecionadas para permanecer nos resultados.
- **Tags carregam silenciosamente.** Se a lista de tags não puder ser carregada, as chips simplesmente não aparecem e nenhum erro é mostrado. Feche e reabra a folha para tentar novamente.

Cores de status de baixo contraste (como carregando e descarregado) têm texto da chip mais escuro no modo claro para manter a legibilidade; o modo escuro mantém a cor brilhante.

A folha sempre reabre com seus filtros salvos já aplicados.

## Abrindo um veículo por código QR

1. Toque no botão de ação **scanner**.
2. Aponte a câmera para o código QR do veículo. Códigos que já identificam o veículo o abrem imediatamente; qualquer outro é consultado por etiqueta, VIN ou IMEI. Quando vários veículos correspondem, vence a correspondência exata da etiqueta.
3. O app abre a página desse veículo.

No [modo em lote](../operations/batch-mode.md), a mesma leitura adiciona o veículo à fila em vez de abri-lo.

### Quando o código não escanear

Use a entrada manual como alternativa: digite a **etiqueta**, **VIN** ou **IMEI** no modal. Ele usa exatamente a mesma consulta, então qualquer coisa que o scanner poderia abrir, a digitação também abrirá.

Um código não reconhecido mostra um erro de código inválido. O scanner também fecha sozinho após um tempo se nada for escaneado — basta tocar nele novamente.

## Gaveta de bilhetes e legenda

- O botão de ação **tickets** abre uma gaveta de bilhetes de suporte abertos com contagens. É um atalho de campo para ver o que os riders reportaram, separado da fila completa de suporte descrita em [Back-office tools](../tools/back-office-tools.md#suporte--bilhetes).
- O modal **legend** explica as formas dos marcadores e a codificação de cores de status usada no mapa. Abra-o quando uma cor for desconhecida em vez de adivinhar.

## Preferências do mapa

Um controle no **canto superior direito do mapa** — não na gaveta de **Configurações** do app — abre as preferências do mapa. Ele cobre:

- Estilo do marcador (ícone, ponto, automático) e tamanho do marcador
- Sobreposições: percentual da bateria, etiquetas, anéis de status, alarmes, bilhetes
- Agrupamento
- Zonas
- Sua própria localização
- Movimento suave
- Bloqueio de tela (mantém a tela acordada enquanto você trabalha)
- Taxa de atualização

Altere estes quando o mapa estiver muito carregado para ler: desligue as sobreposições para uma imagem mais limpa, ou ligue o agrupamento em uma área densa.

## Problemas comuns

| Sintoma                                    | O que fazer                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Um veículo que você espera está ausente    | Um filtro salvo ainda está aplicado — verifique os chips de status, o intervalo da bateria e especialmente a janela do último sinal |
| Nenhum carrossel de tipo de veículo nos filtros | Sua frota tem apenas um tipo de veículo; isso é normal                                           |
| Nenhum chip de etiqueta                      | A lista de etiquetas não carregou. Feche e reabra a folha de filtro para tentar novamente       |
| Uma combinação de etiquetas não retorna nada | As etiquetas são combinadas com E — remova uma etiqueta                                        |
| Um código escaneado não é reconhecido       | Confirme que o código pertence a um veículo da sua empresa, então use a entrada manual com etiqueta, VIN ou IMEI |
| O scanner fecha sozinho                      | Ele expira após um período de inatividade — reabra-o                                          |

## Dicas

- **Limpe seus filtros no início do turno.** Eles persistem, e uma janela de último sinal desatualizada oculta exatamente os veículos que você foi enviado para encontrar.
- **Use os predefinidos de último sinal para caçar rastreadores inativos** — defina `7d` e procure o que está silencioso.
- **A busca aceita IMEI**, então um adesivo com apenas o número do rastreador ainda é suficiente para abrir um veículo.
- **A entrada manual não é uma regressão** — ela resolve da mesma forma que o scanner, então use-a assim que um código parecer danificado.
