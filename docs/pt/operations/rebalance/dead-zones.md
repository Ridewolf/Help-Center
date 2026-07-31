# Rebalance — Zonas Mortas

A página Zonas Mortas (`/rebalance/dead-zones`) é o **quadro de direcionamento para operações de campo**: onde seu inventário está parado, quanto de receita isso está custando e para quais distritos enviar a van de rebalanceamento a seguir.

Diferente da página [Analytics — Rebalance](runs.md), que resume a atividade da equipe de campo ao longo do tempo, esta página é prospectiva: responde _para onde vamos agora?_

Permissão necessária: operador autenticado (a rota apenas exige _requiresAuth_, sem ID de permissão específico).

## O que significa "zona morta"

Uma **zona morta** é uma área da cidade onde os veículos passam tempo demais estacionados sem serem alugados. A página as identifica e as classifica para que a equipe de campo saiba quais agrupamentos devem ser desfeitos primeiro.

O sistema suporta duas formas de agrupar o mapa:

- **Zonas do proprietário** — seus próprios polígonos configurados em [Configurações — Zonas](../../settings/infrastructure/zones.md)
- **Grade H3** — grade hexagonal da Uber, usada para análise mais detalhada ou independente de zona

O alternador está no bloco de filtros; a tabela exibe as mesmas colunas em ambos os modos.

## Linha de KPI (topo)

Uma linha com cinco cartões de KPI resume a situação das zonas mortas conforme o filtro aplicado.

| KPI                 | O que mostra                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Zonas mortas**    | Contagem de zonas / células atualmente marcadas como mortas                                |
| **Perda / dia**     | Receita perdida estimada por dia — soma de `lostRevenuePerDay` nas zonas filtradas        |
| **Dispositivos presos** | Total de dispositivos ociosos presos dentro das zonas mortas — seu alvo físico de coleta |
| **Tempo médio parado** | Tempo médio de permanência (minutos) nas zonas mortas — quanto tempo um veículo fica antes de se mover |
| **Progresso semanal** | Percentual de variação em relação à semana passada — negativo = piora; positivo = melhora |


Cada KPI atualiza conforme os filtros; use-os como uma verificação rápida antes de analisar a lista.

## Modos de visualização — Mapa vs Tabela

Um alternador no canto superior direito troca entre duas formas de apresentar os mesmos dados:

- **Mapa** — visão geográfica das zonas mortas sobreposta à cidade (atualmente um espaço reservado _em breve_)
- **Tabela** — grade de dados abaixo, com todas as colunas e contexto por linha

Os filtros se aplicam a ambas as visualizações. _Tabela_ é o padrão; _Mapa_ está configurado, mas a renderização geográfica ainda está em desenvolvimento.

Um controle de _Atualização automática_ fica ao lado do alternador de visualização — ative para reconsultar os dados em intervalos (útil para operações ao vivo).

## Filtros

O bloco de filtros tem quatro controles; todos combinados com E lógico:

| Filtro        | Tipo     | Notas                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **Cidade**    | Dropdown | _Todas as cidades_ / _Moscou_ / _São Petersburgo_ — restringe a uma cidade operante |
| **Gravidade** | Dropdown | _Todas_ / _Baixa_ / _Média_ / _Alta_ / _Crítica_ — baseado na pontuação de gravidade da zona |
| **Tipo de zona** | Dropdown | _Zonas do proprietário_ / _Grade H3_ — qual grade usar                            |
| **Busca**    | Texto    | Texto livre — corresponde ao nome da zona / distrito                              |

Um botão _Limpar tudo_ à direita do cartão de filtro reseta todos os controles com um clique.

## Colunas

A visualização em Tabela tem nove colunas. Clique em uma linha para abrir a gaveta de insights da zona (atualmente mostra um toast com o nome da zona como espaço reservado).

| Coluna               | Conteúdo                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zona / Célula**    | Nome da zona mais cidade e distrito abaixo; no modo H3 é o ID do hexágono                         |
| **Taxa de ociosidade**| Percentual de tempo que a zona tem dispositivos ociosos, colorido: verde `< 25%`, amarelo `25–40%`, vermelho `≥ 40%` |
| **Tempo parado**      | Tempo mediano de permanência em minutos, com _p90_ abaixo                                         |
| **Média de veículos ociosos** | Contagem média de veículos ociosos na zona, com o _Alvo_ de oferta para comparação           |
| **Inícios**           | Inícios de corrida na zona em _últimas 24h_ / _últimos 7d_ / _últimos 30d_                        |
| **Conversão**         | Inícios por veículo ocioso por hora — verde `≥ 0.30`, amarelo `0.15–0.30`, vermelho `< 0.15`     |
| **Excesso de oferta** | Veículos acima do alvo — positivo = excesso, negativo = falta; positivo aparece em vermelho       |
| **Perda / dia**       | Receita perdida estimada só para esta zona                                                       |
| **Última vez ocioso** | Quando a zona teve veículos ociosos pela última vez — formatado no seu local                      |

As linhas são clicáveis; a ordenação por coluna ainda não está implementada nesta versão.

## Ações por linha

Cada linha tem um manipulador de clique que hoje mostra um toast com o nome da zona. O **menu de ações completo (por linha)** está implementado no código, mas atualmente desativado aguardando a API. As ações planejadas estão listadas abaixo para referência — aparecerão em um menu de três pontos à direita de cada linha quando habilitadas:

| Ação planejada          | O que fará                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| **Criar execução**      | Abrir o construtor de execução de reequilíbrio pré-preenchido com esta zona |
| **Definir limite de tempo de estacionamento** | Restringir o tempo máximo de estacionamento dentro da zona           |
| **Precificação dinâmica** | Aplicar alavancas de preço para atrair / desencorajar corridas que começam ou terminam aqui |
| **Cirurgia de zona**    | Editar o limite da zona (dividir, mesclar, remodelar)                 |
| **Marcar como proibido estacionar** | Converter a zona em área de proibição de estacionamento para expulsar veículos |
| **Reduzir meta de oferta** | Diminuir a meta de dispositivos para que o sistema pare de enviar veículos aqui |
| **Experimento A/B**    | Configurar um experimento controlado em uma estratégia de remediação  |

Até que o endpoint seja lançado, trate a tabela como uma **superfície de insights somente leitura** — combine-a com a lista de Veículos para agir sobre veículos individualmente.

## Estados vazios / de carregamento

- **Carregando** — um spinner com "Carregando zonas mortas…" enquanto o backend é consultado
- **Erro** — um banner de _Alerta_ com um botão _Tentar novamente_ se a requisição falhar
- **Vazio** — um ícone _AlertTriangle_ centralizado com o texto "Sem zonas mortas"; este é o **estado esperado hoje** já que o endpoint não retorna dados

## Fluxos típicos

- **Planejamento matinal** — Ordene a tabela por _Perda / dia_ (visualmente, hoje; colunas ordenáveis em breve): selecione as 3 principais zonas para atribuir às execuções do dia
- **Triagem por severidade** — Filtre por _Severidade = Crítico_ para ver apenas os piores casos, depois abra cada zona para contexto
- **Operações cidade a cidade** — Filtre por _Cidade_ ao executar operações multi-cidade; revise a contagem e a receita perdida total separadamente
- **Referência cruzada com a frota** — Use o número de _Dispositivos presos_ da linha de KPI, depois vá para a [lista de Veículos](../fleet/vehicles.md) filtrada por zona para ver os veículos reais
- **Combine com análises** — Compare a contagem ao vivo aqui com as seções Zonas Mortas / Dispositivos Ociosos dos relatórios [Análises — Reequilíbrio](runs.md) e [Análises de Veículos](../../analytics/reports/vehicles.md) para confirmar a tendência

## Dicas

- **Conversão é a coluna mais operacional** — uma conversão baixa (vermelho) com alta oferta excessiva significa que reequilibrar a zona _não ajudará_; você tem a oferta certa, mas a demanda não está lá
- **Razão ociosa vs média de dispositivos ociosos** — _razão ociosa_ é ponderada pelo tempo (com que frequência a zona está ociosa), _média de dispositivos ociosos_ é ponderada pela contagem (quantos ficam parados). Ambos em vermelho = sinal mais forte de zona morta
- **O _Alvo_ sob _Média de dispositivos ociosos_ vem da configuração da zona** — se estiver errado, toda zona parecerá morta; verifique em [Configurações — Zonas](../../settings/infrastructure/zones.md)
- **Grade H3 é útil para cidades sem zonas definidas** — quando você ainda não definiu zonas de operador, H3 fornece um agrupamento geográfico padrão
- **Progresso semanal é o indicador "estamos ganhando" da página** — se a contagem de zonas mortas aumenta mas a receita perdida diminui, a equipe de campo está trabalhando primeiro nas zonas de maior valor (um bom sinal)
- **Os manipuladores de ação são protótipos** — clicar em uma linha atualmente só exibe uma notificação informativa; o painel / diálogos reais chegam quando o backend estiver pronto
