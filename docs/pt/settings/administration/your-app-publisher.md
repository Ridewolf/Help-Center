# Seu App: Publicador e Envio

As duas etapas finais do [assistente de marca branca do Seu App](your-app.md) (`/settings/your-app`): escolher **quais contas de desenvolvedor publicam o app**, fornecer as credenciais da loja se forem suas, e enviar para provisionamento.

## Escolha do publicador

Uma seleção por botão de opção com duas opções:

- **Ridewolf** (padrão) — o app é publicado através das próprias contas de desenvolvedor da Ridewolf. **Nenhuma credencial da loja é necessária de você.**
- **Suas próprias contas** — o app é publicado através das suas próprias contas de desenvolvedor Apple e Google, o que requer as credenciais abaixo.

## Credenciais de acesso à loja (apenas para contas próprias)

**Apple — todos obrigatórios:**

- Apple ID
- Team ID
- App Store Connect API **Key ID** e **Issuer ID**
- App Store Connect API **chave privada** (o conteúdo do arquivo `.p8`)
- Número D-U-N-S

**Google:**

- Email da conta de serviço
- JSON da conta de serviço
- Email do Play Console

Essas credenciais são sensíveis — são enviadas para provisionamento e **não são armazenadas no rascunho local do navegador**.

## Declarações manuais

Duas caixas de seleção que você marca para confirmar que o acesso foi realmente concedido:

- **Acesso ao App Store Connect concedido** — o Apple ID foi adicionado ao App Store Connect
- **Acesso ao Play Console concedido** — as permissões do Play Console foram configuradas

Estas são **auto-declaradas e não verificadas automaticamente**. Marcá-las sem conceder as permissões reais não será detectado aqui — aparecerá depois como uma falha no provisionamento.

## Etapa de revisão

Um resumo somente leitura de todas as etapas anteriores, com **selos de validação por regra** (por exemplo _Recursos necessários_ ou _Legal completo_) mostrados como aprovados ou reprovados, e **links de edição no local** para a etapa específica que precisa de atenção. Todas as verificações devem passar antes que o botão **Enviar** fique disponível.

## Envio

Enviar inicia o pipeline de provisionamento e move o status por **rascunho → provisionamento → em revisão → produção**, ou para **rejeitado**.

- Enquanto o status for `provisioning`, `in-review` ou `production`, a página é **somente leitura** e os links da loja (TestFlight, teste interno do Play, App Store, Play Store) aparecem conforme o pipeline os preenche.
- Um status **rejeitado** torna o assistente editável novamente para que você possa corrigir e reenviar.

## Perguntas comuns

- **Enviar está indisponível.** Um ou mais selos de validação na etapa de Revisão ainda estão falhando — use os links de edição para ir até a etapa com problema.
- **Os campos da Apple/Google não aparecem.** Eles só aparecem quando o publicador está definido para suas próprias contas.
- **Preciso mudar algo após enviar.** Você não pode enquanto o status for `provisioning`, `in-review` ou `production`. Se o app for rejeitado, o assistente fica editável novamente — `draft` e `rejected` são os dois estados editáveis.
- **O provisionamento falhou mesmo eu tendo marcado as declarações.** Essas são declarações manuais — verifique novamente se o Apple ID realmente tem acesso ao App Store Connect e se a conta de serviço realmente tem permissões no Play Console.
