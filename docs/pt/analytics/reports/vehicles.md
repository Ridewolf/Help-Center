# Análises — Veículos

A página de análises de Veículos (`/analytics/vehicles`) é o **painel de saúde da frota**: quantos veículos você tem, como estão performando, estado da bateria, problemas e quebras por tipo e zona.

Diferente da [lista de Veículos](../../operations/fleet/vehicles.md) — que é a visão operacional por unidade; esta são **métricas agregadas da frota** ao longo de um período escolhido.

## Período de tempo

Uma **barra de intervalo de datas** fica no topo. Os gráficos de tendência usam o intervalo completo; as contagens de visão geral/status refletem o **estado atual** (final do intervalo).

## Seções

Sete seções, de cima para baixo:

### 1. Visão geral

Composição da frota em alto nível.

| KPI               | O que mostra                                                      |
| ----------------- | ------------------------------------------------------------------ |
| **Total**         | Todos os veículos registrados                                      |
| **Ativo**         | Disponível para os riders alugarem agora                           |
| **Ocioso**        | Parado, sem uso (pode ser Disponível ou baixa utilização)          |
| **Fora de serviço** | Em Manutenção / Armazenamento / Não pronto — não gerando receita  |
| **Perdido / Roubado** | Status = Roubado, ou fora da rede por mais que o limite           |

Use esta seção como seu resumo principal da frota.

### 2. Desempenho

Quão bem sua frota está **gerando receita** para você.

| KPI                   | O que mostra                                              |
| --------------------- | ---------------------------------------------------------- |
| **Veículos geradores** | Veículos que completaram pelo menos uma corrida no período |
| **Veículos dormentes** | Veículos ativos sem corridas (desperdício)                |
| **Corridas por veículo** | Média de corridas por veículo no intervalo                |
| **Utilização**         | Horas alugadas / horas disponíveis (referência do setor: 5-15%) |

Dormentes entre Ativos é o pior tipo — custando despesas operacionais sem produzir nada.

### 3. Bateria

Saúde da bateria em toda a frota.

| KPI / Gráfico    | O que mostra                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| **Nível médio**  | Média da % de bateria em todos os veículos agora                                |
| **Crítico**      | Contagem abaixo do limite crítico (10-20%)                                     |
| **Tendência média** | Média da bateria no intervalo — caindo = trocas não estão acompanhando        |
| **Distribuição** | Histograma de veículos por faixa de bateria (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Trocas**       | Contagem de operações de troca de bateria no intervalo                          |

Se o Nível médio está caindo enquanto o Crítico está subindo, a equipe de campo está atrasada — agende mais trocas.

### 4. Problemas

Alertas e problemas operacionais registrados contra a frota.

| KPI             | O que mostra                                                  |
| --------------- | -------------------------------------------------------------- |
| **Alertas**     | Total de alertas registrados no intervalo                      |
| **Tipos de alerta** | Distribuição por tipo (bateria / conectividade / mecânico / etc.) |
| **Crítico**     | Alertas de severidade crítica                                  |
| **Manutenção** | Veículos atualmente em status de Manutenção                   |
| **Offline**    | Veículos cujo IoT não reporta há mais que o limite            |

Combine esta seção com as análises de [Eventos Recentes](events.md) para a visão por evento.

### 5. Tendências

Gráfico(s) de série temporal mostrando como a contagem de **Ativos** mudou no intervalo. Uma queda geralmente significa uma mudança massiva de status (mudança para manutenção, clima, recall).

### 6. Por Tipo

Distribuição por **tipo de veículo** (patinete / bicicleta / e-bike / etc.). Para cada: contagem, proporção de receita, utilização, taxa de alertas.

Se um tipo domina a taxa de alertas, o **modelo** tem um problema — não a equipe de operações.

### 7. Por Zona

Distribuição por **zona**. Para cada: contagem de veículos, utilização, taxa de problemas.

Zonas com baixa utilização e alto inventário = **oportunidade de reequilíbrio** (veja também as análises de [Rebalanceamento](../../operations/rebalance/runs.md)).

## Fluxos de trabalho típicos

- **Revisão semanal da frota** — Visão geral → Desempenho (tendência de utilização) → Bateria (algum aumento em críticos?) → Problemas (picos de alertas) → Tendências (alguma queda inexplicada em Ativos?)
- **Limpeza de dormentes** — Desempenho → contagem de dormentes → se estiver crescendo, encontre os veículos problemáticos via a [lista de Veículos](../../operations/fleet/vehicles.md) e verifique status / localização
- **Emergência de bateria** — Seção de Bateria → Crítico subindo + Nível médio caindo → pressione a equipe de campo
- **Detecção de modelo ruim** — Seção Por Tipo → qual tipo tem a pior taxa de alertas → considere descontinuar / negociar com o fabricante
- **Reequilíbrio** — Seção Por Zona → zonas de baixa utilização + alto inventário → agende uma redistribuição
- **Planejamento pré-turno** — Tendências + Padrões de [Eventos](events.md) → quais dias / horas precisam de mais equipe de campo?

## Dicas

- **Ativo + Ocioso + Fora de serviço + Perdido/Roubado = Total** — quando a conta não fecha, os status estão em transição; atualize ou escolha uma data estável
- **Ativo ≠ gerando receita** — um veículo está "Ativo" se pode ser alugado; "Gerando receita" significa que realmente foi alugado. Compare esses dois
- **Utilização acima de 25% é insalubre** — os usuários não encontram veículos quando querem; considere aumentar o inventário nessa zona
- **Utilização abaixo de 5% é peso morto** — o custo de manter esse veículo em serviço excede sua receita; reequilibre ou retire
- **Bateria crítica + Tendência média** — juntos formam seu sistema de alerta precoce; um isoladamente é ruído
- **Perdido / Roubado é persistente** — requer mudança manual de status para ser resolvido; recupere um "Roubado" antes de comemorar
- **Por Tipo e Por Zona juntos** — às vezes um tipo falha apenas em uma zona (incompatibilidade de terreno); a análise cruzada revela isso
