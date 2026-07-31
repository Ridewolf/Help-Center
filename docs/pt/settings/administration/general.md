# Geral

A página Geral (`/settings/general`) é o **painel de controle do sistema inteiro** — um local para definir os padrões que regem o Rider App, a frota, preços, corridas, notificações e configurações para desenvolvedores. Tudo aqui se aplica globalmente a toda a empresa; substituições por veículo ou por tarifa ficam em [Configurações do Veículo](../infrastructure/vehicle-settings.md) e [Tarifas de Veículo](../infrastructure/vehicle-tariffs.md).

> _Nota_: esta página é atualmente uma **tela apenas no front-end** — cada valor é mantido no estado local e o botão **Salvar** apenas mostra uma notificação de confirmação. Nenhum dado é enviado ao backend ainda. Considere-a como a especificação / interface de testes para a API que está por vir.

A rota `/settings/general-settings` é um **espaço reservado** separado, quase vazio, com uma única ilustração e título. A tela real de configuração é `/settings/general` (este artigo) — é onde vivem as seis abas.

Permissão necessária: nenhum `requiredPermissions` específico está definido no roteador — qualquer operador conectado pode abrir a página.

## Abas

A página tem seis abas no topo (desktop). No celular, as mesmas abas se transformam em um acordeão que apenas diz _Use o desktop para configuração completa_ — essas configurações são apenas para administradores por intenção.

| Aba           | Ícone       | O que cobre                                                                                           |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| App           | sliders     | Controle de atualização do app, visibilidade padrão dos módulos, flags de recursos, limites de taxa, padrões de veículo |
| Locale        | globe       | Idioma padrão, fuso horário, idiomas habilitados, formatos de data / hora / unidade, provedor de mapa + estilo de zona |
| Pricing       | dollar sign | Padrões de preços, modelos de tarifa, política de descontos/promoções, padrões de assinaturas        |
| Rides         | car         | Regras de reserva + corrida, pausa/parada automática, penalidades, processamento de pagamento        |
| Notifications | bell        | Alternância de canais (push / email / SMS) e modelos de mensagem para eventos do rider               |
| Advanced      | code        | Integrações, segurança, retenção de privacidade, páginas legais, flags para desenvolvedores, manutenção do sistema |

Um rodapé fixo com **Descartar** e **Salvar alterações** aparece na parte inferior somente depois que você realmente alterar um campo — a página usa `useFormState` para comparar com o instantâneo carregado.

## Seções por aba

### App

Dois cartões empilhados.

**Padrões do App**

- _Exigir atualização do app_ — interruptor + campo de texto para versão mínima (desabilitado até o interruptor estar ligado). Se ligado, o Rider App bloqueará usuários abaixo da versão.
- _Visibilidade padrão dos módulos_ — quatro interruptores (Marketing, Rebalance, Suporte, Análises) que predefinem quais módulos novos operadores veem.
- _Flags de recurso_ — quatro interruptores (Rastreamento ao vivo, Estatísticas avançadas, Multi-moeda, White-label).
- _Limite de taxa da API_ / _Limite de taxa da UI_ — campos numéricos (padrões 1000 / 100 req/min).

**Padrões do Veículo**

- _Conjunto de ícones padrão_ — dropdown pesquisável com nomes de conjuntos de ícones (atualmente quatro mocks fixos: Ícones Padrão / Conjunto Moderno / Minimalista / Colorido e Negrito; a lista real virá de [Conjuntos de ícones](../content/icon-sets.md)).
- _Limiares de bateria_ — dois campos numéricos (Baixo %, Crítico %). Validação ocorre ao Salvar: crítico deve ser menor que baixo ou você receberá um erro em toast.
- _Pesos da pontuação de saúde_ — três campos percentuais (sinal / erros / bateria). Validados para somar 100 ao Salvar.
- _Etiquetas automáticas_ — string separada por vírgulas de etiquetas aplicadas automaticamente a veículos novinhos em folha.

### Locale

- _Idioma padrão_ / _Fuso horário_ — seleção.
- _Idiomas habilitados_ — múltiplas tags; X para remover.
- _Início da semana_ — Segunda-feira / Domingo.
- _Formato de data_ — DD/MM/AAAA, MM/DD/AAAA, ISO, etc.
- _Formato de hora_ — 12h / 24h.
- _Unidade de temperatura_ — Celsius / Fahrenheit.
- _Unidade de distância_ — km / mi.
- _Moeda exibida_ — padrão EUR (TODO no código: carregar da API da empresa).
- _Arredondamento de preço_ — nenhum / mais próximo 0,05 / etc.

**Mapas** (cartão separado na mesma aba)

- _Provedor_ (padrão MapTiler) e _Estilo_ (claro / escuro / satélite).
- _Chave da API_ — campo de texto para a chave do provedor.
- _Zoom padrão_ + _Centro padrão_ — usados quando não há contexto GPS.
- _Estilo da zona_ — cor + largura do traço para polígonos de Estacionamento / Proibido / Baixa velocidade / Estacionamento pago. Seletores usam paleta de 12 cores.
- _Limite de baixa velocidade_ — numérico (km/h).

### Pricing

Quatro cartões: _Padrões de preços_, _Modelos de tarifa_, _Descontos & Promoções_, _Assinaturas_. Estes definem **valores padrão** — o preço real da corrida é substituído por veículo via [Tarifas de Veículo](../infrastructure/vehicle-tariffs.md).

- Padrões de preços: taxa de desbloqueio, preço/min, preço/km, espera paga, minutos grátis de reserva, desconto em dois níveis baseado na contagem de corridas.
- Modelos de tarifa: por período (minuto / hora / dia / semana / mês / ano) — preço, duração máxima, interruptor de estacionamento grátis, interruptor habilitado. Além de _permitir empilhamento_.
- Descontos & Promoções: % máximo de desconto, prefixo de promoção (padrão `WOLF`), dias padrão de validade e regras de empilhamento.
- Assinaturas: % padrão de desconto, dias de teste, renovação automática, permitir códigos promocionais.

### Rides

- Regras de Reserva + Corrida: minutos grátis de reserva, máximo de reservas ativas por cliente, saldo mínimo para iniciar, pausa automática + parada automática (cada um com habilitar + limite).
- Penalidades: dois tipos de penalidade (Fora da zona, Estacionamento incorreto) — cada um com valor da taxa e mensagem de aviso.
- _Guia rápido padrão_ — dropdown retirado de uma lista placeholder; será obtido de [Guias rápidos](../content/quick-guides.md).
- _Conjunto de FAQ padrão_ — dropdown obtido de [Conjuntos de FAQ](../content/faq-sets.md).
- Cartão de pagamentos: 3-D Secure, modo de captura (imediato / pré-autorização), valor de pré-autorização, duração da retenção (horas), política de reembolso, janela máxima de reembolso (dias).

### Notificações

- _Canais_ — três interruptores (Push / Email / SMS) — controlam quais canais estão disponíveis para o Rider App.
- _Modelos_ — título + texto do corpo para os três eventos principais: Corrida iniciada, Corrida concluída, Penalidade aplicada. Variáveis como `{{amount}}` / `{{reason}}` são substituídas pelo backend.
- Um botão **Notificação de teste** exibe um toast informativo (ainda sem envio real).

Para o pipeline de alertas **voltado para o operador**, veja [Alerts & Notifications](alerts-notifications.md) — esta aba aqui é para o lado do Rider App.

### Avançado

Cinco cartões.

- _Integrações_ — endpoint de webhook + segredo, ID do Google Analytics, DSN do Sentry, strings dos bots do Telegram e Slack. Um botão **Testar webhook** exibe um toast.
- _Segurança_ — interruptor para exigir 2FA, tempo limite da sessão (min), política de senha (comprimento mínimo + maiúsculas/números/especiais), chaves reCAPTCHA, lista de IPs permitidos, menu suspenso de restrições de exportação.
- _Privacidade_ — retenção de dados em dias (telemetria / mídia / logs), interruptor para anonimizar GPS, SLA de exportação e SLA de exclusão em dias.
- _Legal_ — Termos de Serviço + Política de Privacidade como áreas de texto Markdown, além de uma string de versão e data de publicação.
- _Desenvolvedor / Avançado_ — modo sandbox, nível de log, URLs dos endpoints de produção + staging, interruptores de experimento (roteamento AI, manutenção preditiva, precificação dinâmica).
- _Sistema / Manutenção_ — interruptor de modo de manutenção + texto do banner + interruptor de modo somente leitura.
- _Auditoria & Backups_ — botões _Criar backup_ e _Excluir todos os dados_ (ambos exibem toasts; o de exclusão diz que _requer confirmação do administrador_ — ainda não implementado).

## Fluxos de Trabalho

- **Bloquear uma nova versão** — Aba App → ativar _Exigir atualização do app_ → definir versão mínima → Salvar. Usuários em versões antigas recebem um prompt para atualizar.
- **Adicionar um idioma** — Aba Localidade → _Idiomas habilitados_ → escolher o chip do idioma → Salvar. As strings ainda precisam ser traduzidas via [Localization](localization.md).
- **Ajustar a UX da penalidade para o usuário** — Aba Corridas → ajustar taxa fora da zona + texto do aviso → Salvar.
- **Pausar a plataforma para manutenção** — Avançado → _Sistema / Manutenção_ → ativar o interruptor, editar o texto do banner, opcionalmente ativar modo somente leitura → Salvar.
- **Lançar um novo estilo de mapa** — Localidade → cartão _Mapas_ → escolher estilo → ajustar cores das zonas → Salvar (as mudanças se aplicam globalmente assim que a API estiver integrada).

## Dicas

- **Por enquanto, só front-end.** Salvar captura um instantâneo local, mas não acessa nenhum endpoint do backend — não confie nesta página para persistir nada até que a API esteja implementada.
- **Validação ocorre ao Salvar.** Limiares de bateria (crítico < baixo) e pesos do score de saúde (somam 100) são verificados ao pressionar Salvar, não durante a digitação — corrija o erro do toast e tente novamente.
- **Não confunda com `/settings/general-settings`.** Essa rota existe, mas só mostra um cartão placeholder vazio — abra `/settings/general` para a tela real.
- **Descartar é sua rede de segurança** — o rodapé só aparece quando há alterações não salvas; clique em _Descartar_ para reverter ao instantâneo carregado sem sair da página.
- **Mobile é propositalmente limitado.** Apenas o acordeão App está integrado; o resto só direciona para uma sessão desktop.
- **Configurações por veículo são melhores.** Tudo que você define em Preços / Corridas é um padrão; a tarifa real que o usuário paga vem da Tarifa de Veículo vinculada ao modelo — veja [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
