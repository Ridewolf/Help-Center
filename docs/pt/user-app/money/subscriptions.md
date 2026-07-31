# Rider App — Assinaturas e Códigos Promocionais

**Assinaturas e códigos promocionais não estão disponíveis atualmente no app.** Um usuário não pode comprar um plano, não pode resgatar um código promocional e não tem nada para cancelar.

Se você quiser dar um desconto a um usuário, faça isso pelo lado do painel — veja [Giving a rider a discount today](#como-dar-um-desconto-a-um-usuário-hoje).

## O que o usuário realmente vê

- O menu lateral no [Mapa](../riding/map.md#estrutura-de-navegação) **não tem entrada para Promoções nem para Assinaturas**.
- Um link `/subscriptions` não abre uma tela. Um usuário que digitar esse link, ou segui-lo, cairá na tela **Não Encontrado** do app. Isso é comportamento esperado, não um problema com a conta ou dispositivo dele.
- O link antigo `/promo` simplesmente redireciona para a [Carteira](wallet.md).
- Não existe **configuração no painel** que ative assinaturas ou códigos promocionais para sua empresa.

Não prometa a um usuário que um código funcionará "quando ativarmos", e não mencione nomes de planos ou preços — nenhum está em vigor.

## Como dar um desconto a um usuário hoje

Três mecanismos estão disponíveis, todos do lado do operador:

| Mecanismo                 | Onde                                                                          | Indicado para                                                |
| ------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Níveis de desconto na tarifa** | [Tarifas de Veículo](../../settings/infrastructure/vehicle-tariffs.md)       | Tornar corridas mais longas progressivamente mais baratas para todos |
| **Uma tarifa separada mais etiquetas** | [Tarifas de Veículo](../../settings/infrastructure/vehicle-tariffs.md) + [Etiquetas](../../settings/infrastructure/tags.md) | Preços mais baratos para um grupo definido (corporativo, equipe, VIP) |
| **Crédito manual no saldo** | [Detalhe do Cliente](../../operations/customers/client-detail.md#ações) → **Recarregar saldo** | Compensação pontual após uma reclamação ou corrida falhada   |

Para uma compensação pontual, o crédito manual no saldo é o mais rápido e deixa um registro no log de atividades do cliente. Para algo recorrente, incorpore isso em uma tarifa.

## FAQ

| Pergunta                                        | Resposta                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Como compro uma assinatura?"                  | Não disponível atualmente no app                                                                              |
| "A página de assinaturas mostra Não Encontrado" | Correto e esperado                                                                                            |
| "Podemos ativar assinaturas para nossa empresa?" | Não — não há configuração no painel para isso                                                                 |
| "Meu código promocional não funciona"           | Códigos promocionais não estão disponíveis atualmente no app                                                  |
| "Escanear um código QR promocional não faz nada" | Mesmo — não disponível atualmente                                                                             |
| "Como cancelo meu plano?"                        | Não há plano para cancelar                                                                                     |
| "Qual preço se aplica a mim então?"             | A tarifa vinculada ao veículo que está sendo usado. Veja [Tarifas de Veículo](../../settings/infrastructure/vehicle-tariffs.md) e o [detalhamento do custo da corrida](../riding/rides.md#detalhamento-de-custos) |

## Dicas

- **Diga "não disponível atualmente", depois diga o que você _pode_ fazer.** Um usuário perguntando sobre códigos promocionais geralmente quer um desconto; um crédito manual no saldo responde à pergunta real.
- **Mantenha a lógica de desconto nas tarifas.** Tudo que você definir ali se aplica consistentemente e aparece corretamente no detalhamento do custo da corrida do usuário.
- **Fique atento a códigos promocionais de terceiros.** Se usuários chegam com códigos de uma campanha, certifique-se de que o marketing saiba que o app não pode resgatá-los.
