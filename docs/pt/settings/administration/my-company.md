# Minha Empresa

A página **Minha Empresa** (`/settings/my-company`) é a sua identidade como operador: os dados legais da empresa que gerencia a frota, sua marca e a configuração que o Rider App lê — a cidade padrão do mapa, métodos de login, canais de suporte e links legais.

A página é visível apenas para operadores que possuem **ambas** as permissões view-company e edit-company — sem direitos de edição, ela fica totalmente oculta em vez de ser exibida somente para leitura.

Como o restante do Painel, Minha Empresa se adapta ao modo de interface em que você está:

- **Modo fácil** (rotulado _Lite_ no seletor de modo de interface) — um resumo somente leitura do essencial mais um **assistente guiado de cinco etapas** para editá-lo.
- **Modo avançado** — quatro abas: **Perfil** (rotulada _Empresa_ na faixa de abas), **Configuração do App** (rotulada _App_), **Pagamentos** e **Integrações**.

Mudar do modo Fácil para o Avançado pede confirmação e então recarrega a página; o Painel lembra o modo que você escolheu.

## Modo fácil

O modo fácil mostra o essencial de relance — o logo, detalhes de contato (email, telefone, site, endereço) e quaisquer canais públicos de suporte atualmente habilitados — além de uma visão geral somente leitura **Mais detalhes** de todo o resto: dados da entidade legal, marca do app, provedores de pagamento e integrações conectadas, e os links legais.

Duas ações estão disponíveis:

- **Editar detalhes** abre o assistente guiado (abaixo).
- **Mudar para Avançado para pagamentos e integrações** — as chaves dos provedores de pagamento e credenciais de integração são configuradas somente no modo Avançado; este botão leva você até lá (confirme → a página recarrega).

### O assistente de cinco etapas

**Editar detalhes** guia você pelo essencial uma etapa de cada vez e salva tudo com um único comando no final:

1. **Nome e logo** — o nome exibido da empresa (obrigatório) e o logo.
2. **Detalhes de contato** — email, telefone, site.
3. **Endereço** — país, cidade, endereço, CEP.
4. **Canais de suporte** — os canais públicos de contato que os riders veem no app.
5. **Revisão** — um resumo de cada campo com atalhos de edição por linha; **Confirmar e salvar** grava todo o conjunto de uma vez.

## Modo avançado

Quatro abas. Um rodapé fixo com **Descartar** e **Salvar alterações** aparece na parte inferior somente quando algo foi realmente modificado — se você não vê o botão Salvar, nada foi alterado ainda.

### Aba Perfil (_Empresa_)

A própria entidade legal, em cinco cartões:

- **Identidade** — _Nome legal_ (obrigatório), _Rótulo_ (um nome curto para exibição; opcional aqui, embora o assistente do modo Fácil o exija), _Número de registro_ (obrigatório) e _ID fiscal_ (opcional, com uma dica explicando que o formato depende da jurisdição).
- **Localização** — _País_, _Cidade_, _Endereço_ e _CEP_ (todos obrigatórios).
- **Contato** — _Email_ (obrigatório), _Telefone_ e _Site_ (opcionais).
- **Conectividade do rastreador** — somente leitura: o _Domínio_ e _Porta_ atribuídos à sua empresa, a string pronta de _Endpoint_ (um clique para selecioná-la), e instruções passo a passo para apontar um rastreador de veículo para ele. Os dispositivos em si são gerenciados na página [Tracker](../infrastructure/iot.md).
- **Conteúdo** — _Descrição_ (um texto curto) e _Sobre_ (um texto mais longo), ambos em Markdown com pré-visualização ao vivo.

**A moeda não está nesta aba.** A moeda da empresa (e seu símbolo derivado) é o primeiro passo da aba **Pagamentos** — veja [Payments & Integrations](company-integrations.md).

### Aba Configuração do App (_App_)

Tudo o que o Rider App lê, de cima a baixo:

- **Identidade da marca e cores** — o nome do app, nome curto, logo e as cores do tema/acento (valores hexadecimais). O logo é definido como uma URL com pré-visualização embutida; upload direto de arquivo ainda não está disponível.
- **Visualização padrão do mapa** — clique no mapa interativo para definir a cidade padrão do Rider App; latitude, longitude e zoom são salvos, e o clique é geocodificado reversamente para um nome de cidade.
- **Métodos de autenticação** — alternadores para _Phone OTP_, _Email OTP_, _Email & password_, _Google_, _Apple_, _Telegram_ e _WhatsApp_. Os métodos sociais só funcionam depois que o cartão correspondente na aba **Integrações** foi configurado e habilitado — veja [Payments & Integrations](company-integrations.md).
- **Passos extras de cadastro** — etapas adicionais de registro, cada uma com um ID, uma posição e um interruptor _Obrigatório_; **Adicionar etapa** acrescenta uma nova linha.
- **Comunicações** — o interruptor _Chat ao vivo_ e o **bot OTP do Telegram**: cole um token de bot, clique em **Verificar conversas** e escolha a conversa que o bot deve usar no menu suspenso. Esta é uma configuração diferente do cartão do Telegram na aba Integrações — configurar um não configura o outro.
- **Canais de suporte** — _Email_, _Telefone_, _Site_, _Telegram_ e _WhatsApp_, cada um com um interruptor de habilitação e um valor; somente canais habilitados são mostrados aos riders.
- **Legal e conformidade** — os URLs de _Termos de Serviço_, _Política de Privacidade_ e _Licenças_ exibidos no app.

### Abas Pagamentos e Integrações

Gateways de pagamento (moeda, os cartões dos provedores maib / mia / Stripe, o provedor padrão) e integrações de serviço (Telegram, WhatsApp, Google, Apple, OpenAI) têm seu próprio artigo: **[Payments & Integrations](company-integrations.md)**. O ponto principal a lembrar: esses cartões **salvam individualmente**, separadamente do rodapé Salvar alterações desta página.

## Fluxos de trabalho

- **Corrija um número de telefone ou endereço rapidamente** — Modo fácil → **Editar detalhes** → vá para a etapa → **Revisar** → **Confirmar e salvar**.
- **Atualize o endereço registrado (Avançado)** — Aba Perfil → cartão Localização → edite os campos → **Salvar Alterações**.
- **Reformule a marca do rider app** — Aba Configuração do App → Identidade da marca → atualize o nome, cores e URL do logo → **Salvar Alterações**.
- **Mude a cidade padrão do mapa** — Aba Configuração do App → Visualização padrão do mapa → clique na nova localização → **Salvar Alterações**.
- **Permita que riders façam login com Google** — configure e habilite primeiro o cartão Google na aba Integrações, depois habilite _Google_ em Métodos de autenticação → **Salvar Alterações**.
- **Adicione uma etapa obrigatória de upload de ID no cadastro** — Aba Configuração do App → Etapas extras de cadastro → **Adicionar Etapa** → defina o ID e a posição, ative _Obrigatório_ → **Salvar Alterações**.
- **Associe um rastreador à sua empresa** — Aba Perfil → Conectividade do rastreador → copie a string _Endpoint_ para a configuração do dispositivo.
- **Publique documentos legais atualizados** — Aba Configuração do App → Legal e conformidade → cole as novas URLs públicas → **Salvar Alterações**.

## Perguntas comuns

- **Não consigo encontrar a página.** Ela requer permissão para visualizar e editar a empresa — consulte seu administrador.
- **Não há botão Salvar no modo Avançado.** O rodapé aparece somente após alguma alteração.
- **Onde está a moeda?** Na aba **Pagamentos**, não na aba Perfil — veja [Payments & Integrations](company-integrations.md).
- **Um método de login social não funciona para riders.** Configure e habilite primeiro o cartão correspondente em Integrações, depois habilite o método de autenticação.
- **O logo não carrega.** Atualmente só é possível fornecer uma URL; o upload direto de arquivo virá depois.
- **Clicar no mapa não preenche o nome da cidade.** As coordenadas e o zoom ainda são salvos — o nome da cidade vem da geocodificação reversa e pode ocasionalmente não estar disponível.
- **Onde estão os requisitos para fotos da corrida?** Não aqui — os comprovantes de início/fim de corrida são configurados por modelo de veículo em [Vehicle settings](../infrastructure/vehicle-settings.md).
