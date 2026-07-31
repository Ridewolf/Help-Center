# Automação de Manutenção

A página de Automação de Manutenção (`/maintenance/automation`) é onde **as regras que disparam trabalhos de manutenção automaticamente** ficarão — "a cada 500 km, criar uma tarefa de inspeção", "quando um evento de bateria ocorrer, pedir peças". Ela compartilha o **Painel de Insights de Manutenção** com [Tarefas de Manutenção](tasks.md) e [Inventário e Peças](inventory.md).

Encontre-a na barra lateral em **Manutenção → Automação**.

> **Aviso: automação em breve.** O botão **Habilitar regras de automação** está desativado, com uma explicação exibida diretamente na interface, e ainda não é possível criar regras. Os números de automação do Painel de Insights (regras ativas, disparadas hoje, taxa de sucesso) são a parte ativa da página.

## Como uma regra é estruturada

Uma regra combina **um gatilho com uma ação**:

- **Tipo de gatilho** — `mileage`, `time`, `event` ou `schedule`, mais seus parâmetros
- **Tipo de ação** — `create_task`, `send_notification`, `order_parts` ou `schedule_service`, mais sua configuração
- **Nome**, **descrição**, **status** (`active` / `inactive` / `paused`)
- **Aplica-se a** — quais veículos ou grupos a regra cobre
- **Condições** — critérios extras que o gatilho deve satisfazer
- Registro de execução: **contagem de execuções**, **última execução**, **histórico de execuções**

## Fluxo planejado para criação

A criação de regras será um assistente de três etapas:

1. **Gatilho** — nome, descrição, tipo de gatilho e seus parâmetros
2. **Ação** — escolha o tipo de ação
3. **Revisão** — a regra é exibida como uma frase em linguagem simples, _"Quando {gatilho}, {ação}"_, para você conferir antes de salvar

## Perguntas comuns

- **O botão de habilitar não funciona — permissões?** Não. Ele está desativado para todos enquanto o recurso está sendo finalizado; a interface informa isso diretamente.
- **O que a medição da taxa de sucesso representa?** A proporção de execuções da regra que foram concluídas com sucesso no período fixo de 30 dias do Painel de Insights.
- **Posso expressar "bateria abaixo de 20% E com mais de um ano"?** As regras possuem uma lista de condições no modelo, mas o editor de condições ainda não está disponível.

## Dicas

- **Pense agora em pares gatilho → ação** — anotar as regras que você deseja ("a cada 30 dias → agendar serviço", "evento de falha IoT → criar tarefa") torna trivial ativar a automação quando for lançada.
- **Observe "disparadas hoje" quando estiver ativo** — uma regra que dispara muito mais do que o esperado está mal configurada; pause-a (status `paused`) em vez de excluí-la.
