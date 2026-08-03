# Seu App (Marca Branca)

A página Seu App (`/settings/your-app`) é um **assistente que coleta tudo o que é necessário para construir e publicar um app de rider com sua própria identidade** — nome do app, domínio, ativos da marca, texto da listagem na loja, capturas de tela e links legais. Uma pré-visualização ao vivo do dispositivo ao lado do formulário mostra suas escolhas em telas simuladas de iPhone e Android enquanto você digita.

Encontre-a na barra lateral em **Configurações → Seu App**.

O assistente tem oito etapas: **Identidade → Domínio → Ativos → Listagem → Capturas → Legal → Publicador → Revisão**. Este artigo cobre as seis primeiras; Publicador e Revisão são abordados em [Your App: Publisher & Submission](your-app-publisher.md).

## Ciclo de vida do status

Um cartão de status no topo mostra em que estágio seu app está, com versão e carimbos de data/hora:

**rascunho → provisionamento → em revisão → produção**, ou **rejeitado**.

- O assistente é **editável** enquanto o status for `draft` ou `rejected` — uma rejeição reabre o formulário para que você possa corrigir o que a loja contestou.
- Ele é **somente leitura** enquanto o pipeline controla o app: `provisioning`, `in-review` e `production`. Nesses estados, a página é um resumo, e os links da loja — **TestFlight, Play internal testing, App Store, Play Store** — aparecem conforme ficam disponíveis.

## Etapa Identidade

- **Nome do app** (obrigatório) — ele **gera automaticamente o bundle id do iOS, o bundle id do Android e o subdomínio**, então escolha com cuidado.
- **Substituição do bundle** — um botão que libera a entrada manual dos bundle ids do iOS e Android caso os gerados não sejam adequados.
- **Cor do ícone** — um valor hexadecimal usado para a moldura do ícone do app e o fundo da tela de abertura.

## Etapa Domínio

- **Tipo de domínio** — uma escolha por rádio entre **subdomínio** (derivado do nome do app) e **personalizado**.
- **Domínio personalizado** — um campo de texto que aparece somente quando o tipo é `custom`.

## Etapa Ativos

- Botão **Monocromático** — decide se um conjunto de arte serve para ambos os temas.
- **Símbolo** e **logotipo** — sempre obrigatórios.
- **Símbolo / logotipo para tema escuro** — exibidos apenas quando Monocromático está desativado, ou seja, quando você fornece artes separadas para claro e escuro.

A área de envio aceita arrastar e soltar ou uma URL colada. Upload binário direto ainda não está disponível — na prática, forneça cada ativo como uma URL por enquanto.

## Etapa Listagem

Texto da listagem na loja, com limites de caracteres aplicados pelos campos:

| Campo                 | Limite                                      |
| --------------------- | ------------------------------------------- |
| **Legenda**           | 30 caracteres                               |
| **Descrição curta**   | 80 caracteres                               |
| **Texto promocional** | 170 caracteres (texto promocional da App Store) |
| **Palavras-chave**    | 100 caracteres, separados por vírgula       |
| **Descrição completa**| 4000 caracteres                             |

- **Categoria** — viagem, navegação, esporte, estilo de vida, saúde e fitness, ou negócios.
- **Idiomas da loja** — escolha entre os locais suportados. O **primeiro idioma selecionado é a base**; cada idioma adicional recebe sua própria aba com substituições por idioma para legenda, descrições, texto promocional e palavras-chave. Campos deixados vazios em uma substituição retornam à tradução automática do idioma base.

## Etapa Capturas

Seis variantes fixas de captura de tela, cada uma precisando de um **título** e um **subtítulo**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. A pré-visualização ao vivo do dispositivo na coluna da direita as renderiza com seus ativos da marca, atualizando conforme você digita.

## Etapa Legal

Política de privacidade, termos de serviço, URL de suporte, email de suporte, telefone de suporte e URL de marketing. Estes são **pré-preenchidos a partir do perfil [Minha Empresa](my-company.md)** sempre que um valor existir lá — completar Minha Empresa primeiro economiza trabalho.

## Perguntas comuns

- **Os bundle ids parecem errados.** Eles são derivados do nome do app — ative a substituição do bundle para defini-los explicitamente.
- **Os campos de ativos para variante escura estão faltando.** Eles aparecem apenas quando Monocromático está desativado.
- **Não consigo mais editar nada.** O status está em `provisioning`, `in-review` ou `production` — o pipeline controla o app nesses estados. A edição reabre automaticamente se a submissão for rejeitada.
- **O texto da legenda está sendo cortado.** O limite é 30 caracteres — menor do que você pode esperar.
- **O campo de domínio personalizado não está visível.** Defina o tipo de domínio para `custom` primeiro.
- **A página mostra um aviso de "rascunho local".** Suas edições estão sendo mantidas apenas neste navegador e ainda não foram sincronizadas — não presuma que elas persistirão automaticamente; verifique o formulário novamente quando o aviso desaparecer.
