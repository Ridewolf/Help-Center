# Zonas

A página Zonas (`/zones`) é onde você desenha as **regras invisíveis da sua área de serviço** — polígonos de estacionamento, proibição, baixa velocidade, cobrança e outros que alteram o comportamento de veículos e clientes ao cruzar um limite. Cada zona é um único polígono no mapa, além de um tipo, um status, parâmetros opcionais (velocidade, preço, capacidade do veículo) e etiquetas.

As zonas determinam o comportamento em tempo real para [Veículos](../../operations/fleet/vehicles.md) — entre em um polígono de proibição de corrida e o veículo é desligado; estacione dentro de um polígono de estacionamento pago e a tarifa é aplicada.

Permissão necessária: **Zonas** (`u7v8w9`). Subpermissões `create` / `edit` / `delete` controlam as ações correspondentes.

## O que é uma zona

Uma zona tem quatro partes essenciais:

1. **Tipo** — define a cor e a regra aplicada em tempo real (veja a tabela abaixo)
2. **Polígono** — exatamente um polígono, desenhado no mapa; formas côncavas são aceitas, buracos não
3. **Parâmetros** — dependem do tipo: velocidade (baixa velocidade), preço (estacionamento pago), valor (cobrança), veículos permitidos (estacionamento, estacionamento pago, rebalanceamento)
4. **Status** — `Ativo` (aplicado), `Inativo` (salvo mas ignorado), `Arquivado` (oculto da maioria das listas)

### Tipos de zona

| Tipo             | Cor        | O que faz                                                            |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| **Proibição**    | Preto      | Veículos não podem entrar ou operar aqui                             |
| **Proibição de estacionamento** | Vermelho   | Passageiros não podem encerrar uma corrida aqui                      |
| **Proibição de corrida** | Roxo       | Veículos são desligados / recusam iniciar dentro deste polígono     |
| **Baixa velocidade** | Azul       | Velocidade máxima limitada ao valor configurado `speed` (km/h)           |
| **Estacionamento** | Verde      | Estacionamento designado; capacidade opcional de veículos           |
| **Estacionamento pago** | Laranja    | Estacionamento com preço e capacidade opcional                      |
| **Cobrança**     | Verde escuro | Zona de recompensa — `amount` aplicada quando passageiros encerram aqui  |
| **Manutenção**   | Vermelho escuro | Marcador interno para operações; veículos dentro são excluídos do fluxo de passageiros |
| **Rebalanceamento** | Azul escuro | Área alvo para rebalanceamento da frota; capacidade opcional de veículos |

## Modos de visualização

Um grupo de alternância no cabeçalho da página troca entre três visualizações — mesmos dados, diferentes perspectivas.

| Modo      | Melhor para                                                            |
| --------- | ----------------------------------------------------------------------- |
| **Tabela** | Edições em massa, ordenação por nome/tipo/status, navegação paginada   |
| **Cartões** | Varredura visual com mini-mapa por zona; rolagem infinita             |
| **Mapa**   | Visualizar todas as zonas sobrepostas no mapa real — útil para auditorias de cobertura |

## Filtros

| Filtro  | Tipo     | Notas                                  |
| ------- | -------- | -------------------------------------- |
| Pesquisa | Texto    | Pesquisa pelo nome e descrição da zona |
| Status  | Dropdown | `Ativo` / `Inativo` (ou `Todos`)       |
| Tipo    | Dropdown | Um dos 9 tipos (ou `Todos`)             |

Os filtros se aplicam a todos os três modos de visualização. A visualização Mapa busca **todas** as zonas correspondentes (sem paginação); Tabela e Cartões paginam.

## Colunas (visualização em tabela)

| Coluna          | Ordenável? | Conteúdo                                                    |
| --------------- | ---------- | ---------------------------------------------------------- |
| **Nome da zona** | ✓          | Rótulo + indicador colorido do tipo; link para a página de detalhes da zona |
| **Descrição**   | —          | Descrição opcional em texto livre                           |
| **Tipo**        | ✓          | Indicador colorido do tipo (veja a tabela de tipos acima)  |
| **Status**      | ✓          | `Ativo` / `Inativo` / `Arquivado`                          |
| **Etiquetas**   | —          | Etiquetas aplicadas à zona                                  |

## Ações por linha

Um menu de três pontos por linha. As ações disponíveis dependem das permissões:

| Ação             | Permissão | O que faz                                               |
| ---------------- | --------- | ------------------------------------------------------- |
| **Visualizar detalhes** | —         | Abre a página de detalhes da zona (mapa + metadados)    |
| **Editar**       | `edit`    | Abre o formulário de edição da geometria/propriedades  |
| **Excluir**      | `delete`  | Remoção permanente — requer manter pressionado por 3 segundos para confirmar |

## Ações em massa

Selecione linhas na visualização Tabela para revelar a barra de ações em massa. Todas as ações mutativas em massa requerem a capacidade `edit`:

- **Alterar tipo** — repinta muitas zonas para um novo tipo de uma vez (parâmetros são resetados conforme)
- **Alterar limite de veículos** — define `allowedVehicles` para a seleção (relevante para estacionamento / estacionamento pago / rebalanceamento)
- **Alterar valor** — define o valor numérico específico do tipo (velocidade / preço / valor)
- **Alterar status** — alterna Ativo ↔ Inativo em massa
- **Alterar etiquetas** — adiciona ou substitui etiquetas na seleção
- **Exportar selecionados** — baixa apenas as zonas destacadas em JSON (sem permissão necessária; no cliente)

## Criar — o assistente de 5 passos

`+ Criar` abre um formulário guiado. Você pode voltar livremente; avançar só é liberado quando o passo atual for válido.

1. **Nome e descrição** — `Rótulo` (obrigatório) e uma `Descrição` opcional
2. **Classificar** — `Tipo` (obrigatório, define a cor e o formato do parâmetro), `Status` (Ativo / Inativo / Arquivado), `Etiquetas`
3. **Parâmetros** — entradas numéricas específicas do tipo com um controle deslizante de 0 a 100 para entrada rápida: velocidade (km/h), preço, quantidade ou veículos permitidos. Tipos sem parâmetros mostram um aviso "sem parâmetros" e permitem avançar
4. **Geometria** — desenhe exatamente **1 polígono** no mapa. Zonas existentes podem ser ativadas como sobreposição tracejada para evitar sobreposição. Controles do mapa: desenhar, editar, adicionar pontos, desfazer (até 20 passos), excluir, zoom, ajustar limites, localizar-me, tela cheia
5. **Revisão** — resumo final somente leitura de todos os campos mais a contagem de pontos do polígono

Salvar cria a zona e redireciona para a página de detalhes dela.

## Formulário de edição

`Editar` reutiliza a mesma estrutura, mas em formulário de página única (sem etapas) — altere o rótulo, tipo, status, parâmetros, etiquetas ou redesenhe o polígono, depois Salve. Um aviso de alterações não salvas aparece antes de sair da página.

## Importar / Exportar

Dois botões de contorno ao lado de **+ Criar**:

- **Importar** — escolha um arquivo `.json` exportado anteriormente; o painel valida o conteúdo e cria as zonas no servidor. Requer a capacidade `create`
- **Exportar** — abre um diálogo onde você escolhe o que baixar: a página atual, todas as páginas com os filtros atuais ou tudo. A barra de ações em massa também oferece "Exportar selecionados" para as linhas destacadas

## Página de detalhes

Clicar em uma linha (ou _Visualizar detalhes_) abre a página de detalhes da zona com:

- Uma prévia ao vivo do polígono no mapa
- Cartão de informações básicas (rótulo, descrição, tipo, status, cor)
- Cartão de parâmetros (velocidade / preço / quantidade / veículos permitidos, quando aplicável)
- Etiquetas
- Datas de criação / atualização
- Botões Editar e Excluir no cabeçalho (restritos por permissão)

## Fluxos típicos

- **Criar uma nova cidade** — importe um pacote JSON de zonas se tiver, caso contrário desenhe primeiro o anel de proibição, depois os polígonos de estacionamento dentro dele
- **Ajustar uma área de baixa velocidade** — Editar → etapa 3 → aumentar o valor da velocidade → Salvar. Ativo imediatamente
- **Fechar um estacionamento por um dia** — Editar → Status = Inativo → Salvar. Reative quando o estacionamento reabrir
- **Rezoneamento após mudança na cidade** — selecione em massa as zonas afetadas → Alterar tipo → confirme. Parâmetros antigos específicos do tipo são apagados automaticamente
- **Auditoria de cobertura** — mude para a visualização de Mapa, filtre por Status = Ativo, verifique visualmente por lacunas e sobreposições

## Dicas

- **O tipo determina tudo** — cor, formato do parâmetro, regra em tempo de execução. Escolher o tipo errado é a causa mais comum de retrabalho
- **Um polígono por zona** — divida áreas complexas em múltiplas zonas; o editor exige um único polígono
- **Zonas sobrepostas são permitidas** — a regra mais restritiva prevalece (proibido > sem corrida > baixa velocidade), então não tenha medo de sobrepor uma zona de baixa velocidade dentro de um polígono de estacionamento
- **Use a sobreposição tracejada** — ative "Mostrar zonas existentes no mapa" no editor para evitar sobreposição acidental com vizinhos
- **Inativo ≠ Excluído** — altere o Status para pausar temporariamente uma zona; Excluir é permanente (confirmação segurando 3 segundos é a segurança)
- **Etiquete suas zonas** — etiquetas são o único filtro multiseleção que persiste entre modos de visualização. Use para agrupar por distrito, campanha ou propriedade
- **Exporte antes de edições em massa** — um clique no diálogo de exportação faz backup do conjunto inteiro, assim uma alteração em massa mal feita pode ser desfeita com uma Importação
