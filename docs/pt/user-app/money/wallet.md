# Rider App — Carteira e Recargas

A Carteira (`/wallet`) é a tela de dinheiro do rider, aberta a partir da linha do saldo da carteira no menu lateral. Ela mostra o saldo atual, bônus, o ponto de entrada para recarga, o interruptor de recarga automática e o caminho para os cartões salvos.

Tudo sobre os próprios cartões — adicionar, remover, escolher um padrão e as três formas como uma recarga pode ser concluída — está em [Payment Methods](payment-methods.md). Recargas passadas, reembolsos, débitos e bônus ficam em [History](history.md).

## O que há na tela

| Elemento                      | O que é                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Saldo Real**                | O saldo disponível para o rider gastar. O ícone de atualizar ao lado relê o saldo do servidor                    |
| **Bônus**                    | Um saldo de bônus separado, mostrado apenas onde os bônus estão habilitados                                      |
| **Valores pré-definidos para Recarga** | Quatro botões: **50**, **100**, **200**, **400**. Não há campo para valor personalizado nesta tela               |
| **Recarga Automática**        | Um único interruptor, com descrição do seu próprio limite e valor                                               |
| **Gerenciar Métodos de Pagamento** | Abre [Payment Methods](payment-methods.md) (`/wallet/payment-methods`)                                          |

Se um rider insistir que o saldo está errado ou desatualizado, **faça-o tocar no ícone de atualizar primeiro** — isso limpa o valor em cache e lê o valor ao vivo. Isso resolve a maioria dos relatos de "minha recarga não aparece".

## Como um rider faz uma recarga

1. Abra a Carteira.
2. Escolha um dos valores pré-definidos — 50, 100, 200 ou 400.
3. Confirme a recarga.

O que acontece a seguir depende inteiramente do provedor de pagamento em uso, e há exatamente **três** possibilidades:

| Fluxo do provedor               | O que o rider experimenta                                                                   | Sai do app?    |
| ------------------------------- | ------------------------------------------------------------------------------------------- | -------------- |
| **Confirmação dentro do app** (Stripe) | O pagamento é confirmado dentro do app usando um cartão salvo                              | Não            |
| **Redirecionamento** (MAIB e similares) | Um navegador externo abre, o rider paga na página do banco, o app espera a confirmação      | Sim            |
| **Checkout por QR** (MIA e similares)   | Um checkout por QR / app bancário com contagem regressiva, o app espera a confirmação       | Sim            |

**Apenas o fluxo de confirmação dentro do app é concluído sem sair do app.** Para os fluxos de redirecionamento e QR, nunca diga ao rider que o dinheiro chega instantaneamente — ele precisa terminar o pagamento externamente primeiro. Instruções passo a passo para os três estão em [Payment Methods](payment-methods.md#recarga--os-três-fluxos).

## O que acontece logo após uma recarga

O saldo é atualizado imediatamente no app, depois o app confirma com o servidor, tentando várias vezes com atrasos crescentes (cerca de meio segundo, depois 1, 2, 4 e 8 segundos). Se nenhuma confirmação chegar, o saldo exibido é **revertido** ao valor original.

Então, um saldo que apareceu brevemente e depois desapareceu significa uma coisa: **o pagamento nunca foi confirmado.** Verifique a lista de recargas pendentes na tela de [Payment Methods](payment-methods.md#recargas-pendentes).

## Recarga Automática

- Um interruptor, com uma caixa de confirmação quando o rider o ativa.
- Está **desabilitado** onde o provedor atual não pode confirmar pagamentos dentro do app. Por isso, um rider com provedor só de redirecionamento ou só de QR não pode ativá-lo.
- O limite e o valor são descritos na própria tela. Leia-os na tela — não cite números de memória e não informe limites que a tela não mostra.

## Onde fica o histórico de pagamentos

Não aqui. Recargas, reembolsos, débitos e bônus estão todos listados na aba **Pagamentos** de [History](history.md#aba-pagamentos), com valores e cores de status. Seu próprio livro-razão do lado do operador está em [Payments — History](../../operations/payments/payments.md).

## Solução de problemas

| O passageiro diz…                       | O que verificar                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Meu saldo está errado / desatualizado" | Toque no ícone de atualizar ao lado de **Saldo Real**                                                                                     |
| "Pagamento recusado"                   | Recusa do cartão ou do banco. O código de falha está no registro de pagamento em [Histórico → Pagamentos](history.md#aba-pagamentos)          |
| "Fundos insuficientes"                 | O saldo está abaixo do necessário para a ação. Recarregue primeiro — e note que iniciar uma corrida tem seu próprio [saldo mínimo para iniciar](../riding/rides.md#por-que-um-passageiro-não-pode-iniciar-uma-corrida) para passageiros sem cartão |
| "Não consigo ativar a recarga automática" | O provedor ativo não pode confirmar pagamentos dentro do app                                                                              |
| "Minha recarga não apareceu"           | Verifique a lista de recargas pendentes em [Métodos de Pagamento](payment-methods.md#recargas-pendentes). Um pagamento por redirecionamento ou QR que nunca foi finalizado fica lá e pode ser cancelado |
| "Quando meu reembolso vai chegar?"    | Não prometa um número de dias — o app não define prazo para reembolso. Pagamentos reembolsados aparecem na aba Pagamentos com status reembolsado |

## Dicas

- **Atualize antes de investigar.** Metade dos chamados "o dinheiro sumiu" são por saldo em cache.
- **Conheça o fluxo do seu provedor antes de responder.** "Instantâneo" é só para confirmação dentro do app; os outros dois precisam que o passageiro finalize no banco.
- **Um saldo desaparecido é um pagamento não confirmado**, não perdido. Vá direto para as recargas pendentes.
- **Vincular um cartão remove completamente a barreira do saldo para corrida** — para passageiros que recarregam constantemente em pequenas quantias, essa é a melhor recomendação.
