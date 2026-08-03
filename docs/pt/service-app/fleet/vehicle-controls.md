# Página do Veículo — Controles, Bilhetes, Falhas e Alertas

A página do veículo (`/vehicle/:id`) é a superfície de trabalho do operador de campo para um único veículo: telemetria ao vivo no topo, botões de ação no meio e três filas de itens para resolver. Você chega aqui tocando em um marcador ou em uma linha da lista no [mapa da frota](fleet-map.md), escaneando um código QR ou tocando em uma linha no [modo em lote](../operations/batch-mode.md).

## O que a página mostra para cada tipo de veículo

Quando a página abre, ela carrega o veículo e depois seu modelo:

- **Patinetes e bicicletas** recebem a página completa de controle descrita aqui.
- **Carros** recebem uma página apenas de status, sem controles remotos.

Se as informações do modelo não puderem ser carregadas, a página ainda abre — ela recua para o layout de patinete em vez de deixar você preso em um carregador. Se o próprio veículo não puder ser carregado, você verá uma tela de erro com um botão de voltar.

## Abas

Quatro abas com um indicador deslizante:

| Aba          | Conteúdo                                        |
| ------------ | ----------------------------------------------- |
| **Patinete** | Telemetria ao vivo e os botões de ação          |
| **Bilhetes** | Bilhetes de suporte abertos reportados pelos riders |
| **Falhas**   | Erros reportados pelo rastreador                |
| **Alertas**  | Avisos reportados pelo rastreador               |

## Aba Patinete — telemetria

No topo fica um selo de bloqueio (**verde** = bloqueado, **âmbar** = desbloqueado) e o selo de status do veículo, seguido por estas linhas:

| Linha               | Como ler                                                                                |
| ------------------- | --------------------------------------------------------------------------------------- |
| **QR / etiqueta**   | O código no adesivo do veículo                                                         |
| **Rede**            | Qualidade do sinal móvel como fração de 36 quando online, ou o tempo desde o último sinal quando offline |
| **Bateria**         | Percentual da bateria do veículo — vermelho em 10% ou menos, laranja em 20% ou menos, âmbar em 40% ou menos, verde acima de 40% |
| **Voltagem do rastreador** | A bateria do rastreador, em volts com duas casas decimais — vermelho abaixo de 3,6 V, verde em 3,6 V ou mais |
| **GPS**             | **Fixado** ou **Não fixado**                                                           |

**Voltagem do rastreador** é o valor que os operadores mais frequentemente interpretam errado. É a bateria do rastreador, não do veículo: uma leitura vermelha ali significa que o rastreador está prestes a desligar mesmo que a bateria principal pareça perfeitamente saudável. Marque esses veículos para recolhimento antes que parem de reportar completamente.

## Aba Patinete — os cinco botões de ação

Cada ação pede confirmação antes de ser enviada e dá um pulso háptico quando é disparada.

### 1. Status

Abre uma folha com nove status, cada um com um ícone e uma descrição curta, e uma marca de seleção no atual:

- Disponível
- Descarregado
- Carregando
- Precisa de Investigação
- Manutenção
- Não Pronto
- Transporte
- Armazenamento
- Roubado

Escolher **Carregando** também executa a sequência completa de [troca de bateria](../operations/battery-swap.md) — espere que o veículo destrave, espere, e trave novamente. Não é apenas uma mudança de etiqueta.

### 2. Modo de Corrida (bloquear / desbloquear)

- **Desbloquear** envia o comando de desbloqueio, eleva o limite de velocidade para 25 km/h, liga o motor e inicia o rastreamento da corrida.
- **Bloquear** para o rastreamento, desliga o motor, restaura o limite de velocidade de 6 km/h para estacionamento e bloqueia o veículo.

Sempre confirme que o selo de bloqueio fica verde antes de se afastar.

### 3. Bip

Emite um bip localizador único, com notificação de sucesso ou erro. Use para localizar um veículo que está próximo mas fora de vista — ou use o [Find Scooter](../operations/finder.md) para uma busca guiada.

### 4. Troca de Bateria

Inicia a sequência temporizada de troca e mostra a contagem regressiva no botão. Veja [Troca de bateria](../operations/battery-swap.md) para o fluxo completo.

### 5. Comandos

Abre uma folha de comandos suportados pelo rastreador daquele veículo, agrupados por categoria. Alguns comandos exigem que você digite um valor antes de enviar.

## Aba Bilhetes

Lista os bilhetes de suporte abertos que os riders registraram contra este veículo. Cada linha mostra:

- Um ícone de raio para problema elétrico, ou uma chave inglesa para qualquer outro
- Um selo de status violeta
- A descrição, limitada a duas linhas
- O tipo de reclamação
- Há quanto tempo foi criado

Linhas com prioridade crítica e alta também exibem um selo de prioridade vermelho — faça esses primeiro.

Tocar em uma linha abre o bilhete em um modal, o mesmo que a gaveta de bilhetes do mapa da frota usa.

**Resolver Todos** pede confirmação, depois fecha todos os bilhetes abertos do veículo. Bilhetes fechados desaparecem da lista imediatamente, e você recebe "X bilhete(s) resolvido(s)" ou, quando alguns não puderam ser fechados, "Resolvidos X, falharam Y". O botão fica desabilitado enquanto um fechamento está em andamento e quando não há bilhetes abertos.

Quando a aba está vazia, aparece "Sem bilhetes abertos para este veículo".

## Aba Falhas

Falhas são eventos de erro que o próprio rastreador gerou. Ruídos e entradas sem erro são filtrados, e a falha mais recente aparece primeiro.

- **Falhas ativas** — ainda não processadas e dentro da janela de alarme — têm borda e fundo vermelhos.
- **Falhas processadas** ficam cinzas e ganham um selo **Resolvido**.

Cada linha mostra um ícone para o tipo de falha (um triângulo genérico de aviso quando o tipo não tem ícone específico), o título da falha e há quanto tempo ocorreu.

**Limpar tudo** pede confirmação, depois marca cada falha ativa processada uma a uma, com uma breve pausa entre elas — limpar uma lista longa não é instantâneo de propósito, então aguarde um momento. A lista é atualizada conforme avança, e quando não resta nada não processado, o veículo sai da lista de alarmes do app. Você verá "X falha(s) limpa(s)" ou "Limpou X, falhou Y". O botão fica desabilitado quando não há falhas ativas.

Estado vazio: "Nenhuma falha registrada".

## Aba Alertas

Idêntica em estrutura e no comportamento de **Limpar tudo** ao de Falhas, mas para avisos em vez de erros. Estado vazio: "Nenhum alerta registrado".

A distinção prática:

- **Falhas** — erros detectados pelo rastreador
- **Alertas** — avisos detectados pelo rastreador
- **Bilhetes** — reclamações feitas pelos riders

As três são filas separadas; limpar uma não limpa as outras.

## Problemas comuns

| Sintoma                                          | O que significa                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Um botão de ação não faz nada ou está desabilitado | Outra ação ainda está em andamento — aguarde sua notificação                      |
| Uma aba está vazia                               | Realmente não há nada aberto para este veículo; uma falha exibe um erro em vez de um estado vazio |
| Nenhum controle remoto disponível                | O veículo é um carro, que recebe a página apenas de status                        |
| **Rede** mostra um horário em vez de uma fração | O rastreador está offline e você está vendo o tempo desde seu último sinal        |
| **Limpar tudo** parece travado                   | Ele processa falhas uma a uma de propósito; deixe terminar                        |
| Uma falha limpa volta a aparecer como ativa      | O rastreador a detectou novamente dentro da janela de alarme — o problema subjacente ainda existe |

## Dicas

- **Analise a telemetria de cima para baixo** antes de mexer em um controle: bloqueio de badge, rede, bateria, voltagem do rastreador, GPS informa em cinco segundos se o veículo está utilizável ou é para recolher.
- **Resolver tudo é por veículo**, então é seguro usar depois de consertar fisicamente o que os bilhetes descrevem.
- **Limpe as falhas somente após o conserto**, não antes — uma falha que reaparece é uma evidência útil.
- **Uma voltagem vermelha do rastreador junto com uma bateria saudável** é a assinatura clássica de "veículo prestes a desaparecer do mapa".
