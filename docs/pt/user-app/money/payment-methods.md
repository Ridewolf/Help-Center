# Rider App — Métodos de Pagamento e Fluxos de Recarga

Tudo sobre como um usuário paga: a lista de cartões salvos, adicionar um cartão e as três formas diferentes de completar uma recarga dependendo do provedor de pagamento em uso.

| Tela                 | Rota                         | Acessada a partir de                      |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Gerenciar Métodos de Pagamento | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Gerenciar Métodos de Pagamento** |
| Adicionar um cartão   | `/wallet/add-payment-method` | **Adicionar Cartão** na tela acima        |
| Recarga por redirecionamento | `/wallet/topup-redirect`     | Confirmando uma recarga em provedor de redirecionamento |
| Recarga por QR       | `/wallet/topup-qr`           | Confirmando uma recarga em provedor de QR |


Duas das reclamações mais comuns dos usuários são respondidas nesta página: _"não há botão Adicionar Cartão"_ e _"meu pagamento está preso como pendente"_.

## Gerenciar Métodos de Pagamento

Um **seletor de provedor** fica no topo, e o restante da tela se adapta ao que aquele provedor suporta:

- Se o provedor **não suporta cartões salvos**, nenhuma lista de cartões é exibida — aparece uma mensagem de estado vazio.
- Se o provedor **não suporta salvar novos cartões**, o botão **Adicionar Cartão** fica completamente oculto. Essa é a resposta quando um usuário pergunta por que não pode adicionar um cartão.

Cada método salvo mostra seu tipo (cartão ou uma carteira como Apple Pay / Google Pay), marca, últimos quatro dígitos, mês e ano de validade, e se é o padrão. A lista carrega 10 por vez com rolagem infinita.

**Definir como padrão** e **Remover** pedem confirmação e então recarregam a lista.

### Recargas Pendentes

Abaixo dos cartões há uma lista de **Recargas Pendentes**, construída a partir dos registros de pagamento do usuário: valor, moeda, data, status e provedor. Mostra as **duas mais recentes** por padrão, com um botão **Mostrar tudo** para expandir.

Essa lista é onde fica um pagamento por redirecionamento ou QR não finalizado. Um usuário cujo dinheiro "não foi para lugar nenhum" quase sempre tem um registro aqui que nunca completou — e pode ser cancelado daqui.

Um acordeão **Como recarregar** na mesma tela dá instruções específicas para o provedor selecionado.

## Adicionando um cartão

1. Abra **Wallet → Gerenciar Métodos de Pagamento → Adicionar Cartão**.
2. **Nome do Titular** é preenchido automaticamente a partir do perfil do usuário (nome e sobrenome).
3. O número do cartão, validade e CVC são inseridos no **quadro seguro do provedor de pagamento**, não nos campos do app. O quadro carrega quando a tela abre.
4. O botão **Enviar fica bloqueado** até que duas condições sejam verdadeiras: o quadro seguro terminou de carregar e reporta todos os campos completos sem erros de validação. Um botão Enviar que não ativa quase sempre é por uma dessas duas razões.
5. Alternativamente, o usuário pode usar o botão da carteira **Apple Pay / Google Pay** em vez de digitar um cartão.
6. Em caso de sucesso, a lista de cartões é atualizada e a tela retorna para Gerenciar Métodos de Pagamento.

Um diálogo de informações de segurança na tela explica que o provedor de pagamento lida com os dados do cartão e o app nunca armazena o número completo do cartão. Isso é preciso e vale a pena citar para um usuário nervoso.

## Recarga — os três fluxos

O usuário sempre começa da mesma forma — **Wallet → escolher um valor pré-definido → confirmar** — e então o fluxo que será executado é decidido automaticamente pelo provedor.

### 1. Confirmação dentro do app (Stripe)

O pagamento é confirmado dentro do app contra um cartão salvo. Sem navegador, sem etapa externa. Este é o único fluxo que se comporta como uma recarga instantânea, e o único em que o **Auto Top-Up** pode ser ativado.

### 2. Provedores por redirecionamento (MAIB e similares)

1. O usuário confirma o valor.
2. O app **abre automaticamente a página de pagamento do provedor** no navegador do sistema ou no navegador embutido.
3. O usuário paga nessa página.
4. Enquanto isso, o app verifica o status do pagamento a cada **5 segundos**.
5. O usuário também pode tocar em **Já Paguei** para forçar uma verificação imediata.
6. Um pagamento que não foi concluído pode ser **cancelado** na tela — isso limpa o pagamento pendente e retorna para a Wallet.

### 3. Provedores por QR (MIA e similares)

1. A tela mostra uma **contagem regressiva MM:SS** até o vencimento do checkout.
2. **Abrir no App do Banco** abre o checkout — nativamente, em navegador externo ou em janela de navegador embutido.
3. **Copiar Link** coloca o link do checkout na área de transferência, para que o usuário possa finalizar em outro dispositivo.
4. Quando a contagem regressiva termina, o botão Abrir é desativado e um selo **Link Expirado** aparece. **O checkout expirado não pode ser reativado** — o usuário inicia uma nova recarga.
5. A verificação de status, o botão **Já Paguei** e o cancelamento funcionam exatamente como no fluxo de redirecionamento.

## Solução de Problemas

| O passageiro diz…                    | O que é                                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Como faço para recarregar?"       | Carteira → escolha um valor pré-definido → então siga um dos três fluxos que o provedor usa. Apenas a confirmação dentro do app termina sem sair dele |
| "Não tem botão Adicionar Cartão"   | O provedor ativo não suporta salvar novos cartões                                                                                                   |
| "Nenhum cartão está listado"        | O provedor ativo não suporta cartões salvos                                                                                                         |
| "O formulário do cartão não envia" | O quadro seguro do cartão não terminou de carregar, ou ainda indica um campo incompleto ou inválido                                                |
| "Meu pagamento está pendente"       | Toque em **Já Paguei** para verificar novamente. Se ainda não resolver, cancele em **Recargas Pendentes** e tente novamente. Um registro pendente também pode precisar de reconciliação pelo operador — veja [Webhooks Pendentes](../../operations/payments/pending-webhooks.md). **Não prometa um tempo de resolução** |
| "O link do QR expirou"              | Inicie uma recarga nova; a expirada não pode ser reaberta                                                                                           |
| "Pagamento recusado"                | Recusa do banco. O código de falha está no registro de pagamento em [Histórico → Pagamentos](history.md#aba-pagamentos)                              |
| "Quais são os limites de recarga automática?" | Não informe limites — nenhum está definido no app. Leia o que a própria tela da Carteira diz                                                     |

## Dicas

- **O provedor decide a tela.** Antes de responder qualquer pergunta "por que não posso…", verifique qual provedor o passageiro está usando — metade dos botões ausentes são capacidades do provedor, não falhas.
- **Recargas Pendentes é o primeiro lugar para olhar** em qualquer questão de dinheiro que não seja cartão recusado.
- **Cancele, depois tente novamente.** Um pagamento pendente travado bloqueia mais o modelo mental do passageiro do que a conta dele; cancelar e começar de novo geralmente é mais rápido do que esperar.
- **Cite o diálogo de segurança, não sua própria garantia.** Ele diz exatamente o que é certo sobre quem armazena os dados do cartão.
- **Adicionar um cartão faz mais do que habilitar recargas** — também remove o limite mínimo de saldo inicial para corridas e faz o botão **Escanear** aparecer. Veja [Mapa](../riding/map.md#a-barra-inferior-é-condicional).
