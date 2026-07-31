# Detalhes do Veículo

A página de detalhes do veículo (`/vehicles/:id`) é a bancada de trabalho para uma única unidade. Use-a para ver dados IoT ao vivo, enviar comandos, revisar o histórico de corridas, investigar alertas e executar ações do operador (editar, alterar localização, marcar para manutenção, gerar QR, excluir).

Você geralmente chega aqui clicando em uma linha na [lista de Veículos](vehicles.md).

Permissão necessária: **Veículos** (`k7m8n9`). Algumas abas e ações precisam de permissões adicionais (indicadas abaixo).

## Layout

De cima para baixo:

1. **Cabeçalho** — voltar, etiqueta, status, botão _Ações_
2. **Cartões de visão geral** — bateria, último sinal, resumo da saúde IoT, modelo, etc.
3. **Cartão de localização** — um pequeno mapa mostrando o pin GPS atual
4. **Abas** — Detalhes / Corridas / Atividade / Alertas / Comandos

## Cabeçalho

A faixa superior identifica o veículo:

- **Botão Voltar** (`←`) retorna para a lista
- **Etiqueta do veículo** (ex: _RW-001_) e **pílula de status** (Disponível, Em uso, etc.)
- Botão **Ações** à direita — abre o diálogo de ações

## Ações

Clicar em **Ações** abre um diálogo modal com todas as ações do operador disponíveis para este veículo. Algumas são restritas por permissão:

| Ação                     | Permissão | O que faz                                                                                                                             |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Editar veículo**       | `edit`     | Abre o [formulário de edição](vehicle-create-edit.md)                                                                                  |
| **Ver histórico de rota**| —          | Abre um diálogo de coordenadas com a trilha GPS recente                                                                                 |
| **Marcar para manutenção**| —         | Define rapidamente o status para _Manutenção_                                                                                          |
| **Alterar localização**  | —          | Abre um diálogo de mapa para atualizar manualmente as coordenadas GPS (usado quando o dispositivo IoT está silencioso e o operador sabe onde o veículo está) |
| **Gerar código QR**      | —          | Abre o gerador de QR para este veículo único (etiqueta para impressão)                                                                  |
| **Excluir veículo**      | `delete`   | Exclusão suave com diálogo de confirmação                                                                                              |

Ações para as quais você não tem permissão são ocultadas no diálogo.

## Cartões de visão geral

Uma grade de pequenos cartões sob o cabeçalho resume o veículo rapidamente:

- **Bateria** — porcentagem da bateria da scooter (e bateria da placa IoT se reportada separadamente)
- **Último sinal** — quando o dispositivo IoT reportou pela última vez, com uma pílula de status (Online / Offline / Obsoleto)
- **Trava** — travado / destravado
- **Modelo** — nome do modelo, status, imagem
- **GSM / GPS** — status de validade celular e GPS
- **Modo de velocidade** — modo atual de condução (eco, normal, esportivo, etc., se o modelo suportar)
- **Voltagem** — voltagem da placa IoT (campo de engenharia)

## Cartão de localização

Um pequeno mapa mostra o veículo como um único pin na última coordenada GPS conhecida, com zoom padrão ajustado ao pin. Use para uma rápida "onde está agora?" sem abrir o histórico de rota.

## Abas

O detalhe alterna entre até cinco abas (algumas restritas por permissão):

| Aba           | Permissão    | Conteúdo                                                                        |
| ------------- | ------------ | --------------------------------------------------------------------------------|
| **Detalhes**  | —            | Dados completos do veículo — campos IoT, modelo + tarifas, etiquetas, zonas, GSM/GPS, modo de velocidade |
| **Corridas**  | view-rides   | Corridas recentes neste veículo (uma fatia focada da lista global de Corridas)   |
| **Atividade** | —            | Registro de atividade focado neste veículo (ações do operador e do sistema)      |
| **Alertas**   | —            | Erros e alarmes IoT agrupados com paginação (histórico do "o que deu errado")   |
| **Comandos**  | `iot-command`| Enviar comandos IoT diretamente para o dispositivo (travar, destravar, alarme, reiniciar, etc.) |

### Aba Detalhes

A aba padrão e a visão mais profunda do estado do veículo:

- **Painel IoT** — bateria, voltagem, trava, sinal GSM, validade GPS, último sinal, modo de velocidade
- **Painel Modelo** — nome e imagem do modelo, status, etiquetas herdadas do modelo
- **Painel Tarifas** — tarifas atribuídas ao modelo do veículo (regulam o preço da corrida)
- **Painel Etiquetas** — etiquetas aplicadas a este veículo específico (editáveis pelo operador via _Editar_)
- **Painel Zonas** — zonas às quais o veículo pertence atualmente

Se os dados IoT falharem ao carregar, um banner de erro aparece nesta aba; o restante da página continua funcionando.

### Aba Corridas

Lista as corridas recentes feitas neste veículo — mesmo formato de linha da lista global de Corridas, filtrado para este veículo. Clique em qualquer linha para abrir o detalhe da corrida.

Esta aba fica oculta a menos que você tenha permissão `view-rides` neste veículo.

### Aba Atividade

Um **registro de atividade** cronológico para este veículo: toda ação do operador (editado, status alterado, excluído, etiquetas atualizadas) e todo evento do sistema (transições de status por gatilhos IoT, execuções de automação).

Útil para conformidade, responsabilidade e depuração de mudanças inesperadas de estado.

### Aba Alertas

**Alertas e erros IoT** agrupados gerados pelo dispositivo, com paginação. Cada entrada inclui:

- Código e título legível
- Primeira / última vez visto
- Frequência (quantas vezes este código foi gerado)
- Status (ativo / resolvido)

Um botão _Limpar_ (onde suportado) permite marcar um grupo como resolvido. A paginação permite navegar pelos alertas históricos.

### Aba Comandos

**Comandos IoT** diretos para o dispositivo, agrupados por categoria (ex.: _Travar e destravar_, _Alarme_, _Luzes_, _Sistema_). Permissão controlada por `iot-command`.

- Escolha um comando e clique em _Enviar_
- O comando é enviado para o dispositivo IoT; o tempo de resposta depende do sinal celular
- O histórico recente de comandos aparece abaixo com status (enviado / entregue / falhou)

Use isso quando precisar fazer algo que o caminho em massa _Enviar comando_ não cobre — diagnósticos, reinicializações pontuais, destravamentos manuais para casos de suporte.

## Fluxos de trabalho típicos

- **Investigar uma reclamação** — abra Atividade para ver quais operadores / sistemas interagiram com este veículo hoje; depois Alertas para erros IoT; depois Corridas para a viagem em questão
- **Forçar travamento ou destravamento** — Aba Comandos → _Enviar Travar_ ou _Enviar Destravar_ (requer `iot-command`)
- **Retirar uma unidade para manutenção** — _Ações → Marcar para manutenção_ (define status); envie a equipe de campo
- **Corrigir GPS manualmente** — _Ações → Alterar localização_ (quando o dispositivo IoT está silencioso e você sabe onde ele está)
- **Imprimir um adesivo novo** — _Ações → Gerar código QR_

## Dicas

- **Fique de olho na aba Alertas** — códigos frequentes são avisos precoces de problemas de hardware; resolva antes que se tornem incidentes
- **Atividade é seu registro de auditoria** — toda alteração feita por operador é registrada aqui com nome e data/hora
- **Comandos são enviados em modo unidirecional e sem confirmação via celular** — se não receber resposta em um minuto, o dispositivo pode estar offline; verifique Último sinal na visão geral antes de tentar novamente
- **Tags e tarifas vêm de dois lugares** — tags no nível do veículo (painel Etiquetas, editável em Editar) substituem / complementam tags do modelo (somente leitura aqui, configuradas em Configurações do Veículo)
- **O cartão do Mapa mostra apenas o último ponto** — para o histórico use _Ações → Visualizar histórico de rota_
