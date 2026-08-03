# Confirmações de Missões

Missões são **tarefas gamificadas que a plataforma pede aos riders para fazerem em troca de uma recompensa** — e as Confirmações de Missão (`/support/quest-confirmations`) são onde um operador revisa as evidências enviadas pelo rider e decide se paga a recompensa.

Os quatro tipos de missão são:

- **battery** — uma tarefa relacionada à bateria
- **lost** — devolução de um item perdido
- **clean** — limpeza de um veículo
- **parking** — uma tarefa de estacionamento

> **Aviso: esta página é uma prévia.** As decisões tomadas aqui **não são registradas atualmente e nenhuma recompensa é paga** — o fluxo de revisão está visível antes da funcionalidade ser totalmente implementada. Não informe ao rider que sua missão foi paga com base nesta tela.

## Onde encontrar

Não há **entrada na barra lateral** — o grupo Suporte na barra lateral contém apenas Comprovantes de Estacionamento, Bilhetes e Conversas. Acesse a página digitando `/support/quest-confirmations` diretamente.

A página está disponível **apenas no modo Avançado**; é bloqueada no modo Fácil (Lite). Trate-a como uma interface para usuários avançados não listada, e não como parte da navegação normal do operador — da mesma forma que [Error Logs](../../apps/tools/error-logs.md).

A lista e o detalhe estão na mesma página: selecionar uma submissão expande um **painel de detalhes no local** em vez de navegar para outra página. Use **Voltar para a Lista** no cabeçalho do painel para retornar.

## Visualização da lista

| Filtro         | Opções                                |
| -------------- | -------------------------------------- |
| **Status**     | Todos / Pendente / Aprovado / Rejeitado    |
| **Tipo de missão** | Todos / Battery / Lost / Clean / Parking |
| **Pesquisar**     | Por usuário, missão ou veículo              |
| **Limpar**      | Reseta todos os filtros                     |

Um resumo de estatísticas acima da lista mostra a **contagem pendente**, quantos foram **aprovados hoje**, **rejeitados hoje** e o **tempo médio de revisão** em minutos.

## Revisando uma submissão

1. Clique em uma linha da submissão para expandir seu painel de detalhes.
2. Leia as evidências:
   - a **grade de fotos**
   - um **badge QR**, se o rider escaneou o código do veículo
   - um **badge GPS** com a precisão em metros, se a localização foi capturada
   - o **comentário** do rider, se ele deixou um
3. Decida:
   - **Aprovar e Pagar Recompensa** aplica a aprovação diretamente — **não há diálogo de confirmação**, então clique com cuidado.
   - **Rejeitar Submissão** revela um dropdown de motivo de rejeição (**obrigatório**) mais um comentário opcional; então pressione **Confirmar Rejeição**.

Somente submissões **pendentes** podem ser revisadas. Submissões já decididas mostram um botão **Visualizar** em vez de Revisar.

Motivos de rejeição: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## O que uma submissão contém

- **Hora** em que chegou, o **usuário**, a **missão** reivindicada e o **veículo** envolvido
- **Flag QR** — se o rider escaneou o código QR do veículo
- **Fotos** — cada uma rotulada com o que mostra
- **GPS** — latitude/longitude com um rótulo, mais a precisão em metros (um valor alto significa que a posição é imprecisa)
- **Recompensa** — texto livre descrevendo o pagamento, por exemplo, uma corrida grátis até um valor definido
- **Comentário do usuário** — nota opcional do rider
- **Revisado por / em** e um **comentário de rejeição** opcional após decisão

## Perguntas comuns

- **Aprovar realmente paga a recompensa?** Não hoje — a página é uma prévia e as decisões não são registradas.
- **Por que não há etapa de confirmação na aprovação?** Aprovar e Pagar Recompensa é uma ação direta na implementação atual. Clique com cuidado.
- **Uma submissão não tem badge QR ou GPS — isso é fraude?** Ambos os sinais são opcionais. Considere-os junto com as fotos, em vez de tratar a ausência de um badge como prova de algo.
- **O valor da precisão do GPS é enorme — o que isso significa?** O dispositivo reportou uma posição imprecisa; a localização é apenas uma indicação aproximada.
- **Posso reabrir uma submissão decidida?** Não — submissões aprovadas e rejeitadas oferecem apenas Visualizar.
- **Não consigo encontrar no menu.** Não há entrada no menu; digite a URL diretamente, no modo Avançado.
