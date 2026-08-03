# Etiquetas

A página de Etiquetas (`/settings/tags`) é a **biblioteca compartilhada de etiquetas** da sua empresa. Uma etiqueta é um distintivo nomeado que você pode anexar a veículos, clientes, operadores, corridas e pagamentos para filtrar, agrupar e gerar relatórios sobre eles. A lista aqui é a fonte única da verdade — quando você adiciona uma etiqueta, ela fica disponível em todos os lugares onde é suportada.

Permissão necessária: **Etiquetas** (`d1e2f3`). Subpermissões controlam criação, edição e exclusão.

## Onde as etiquetas são usadas

As etiquetas são um **pool global único** — não há escopo por entidade. A mesma etiqueta pode ser anexada a diferentes tipos de registros:

- **[Veículos](../../operations/fleet/vehicles.md)** — ex.: "Precisa de limpeza", "Manutenção prioritária", "Frota de teste"
- **[Clientes](../../operations/customers/clients.md)** — ex.: "VIP", "Corporativo", "Lista de bloqueio"
- **[Operadores](../access/operators.md)** — ex.: "Turno da noite", "Instrutor", "De plantão"
- **Corridas** — etiquetadas para revisão, disputa ou acompanhamento de campanha
- **Pagamentos** — etiquetados para conciliação ou acompanhamento

Cada registro pode carregar múltiplas etiquetas; o filtro por etiqueta está disponível em toda lista que as suporta.

## Filtros

| Filtro | Tipo | Notas                                     |
| ------ | ---- | ----------------------------------------- |
| Pesquisa | Texto | Pesquisa pelo nome da etiqueta (rótulo) e descrição |

A lista padrão exibe 50 linhas por página e limpa os filtros com a ação **Limpar**.

## Colunas

| Coluna          | Ordenável? | Conteúdo                                                        |
| --------------- | --------- | -------------------------------------------------------------- |
| **Nome da etiqueta**    | SIM       | Ícone da etiqueta + rótulo; link para a página de detalhes da etiqueta                |
| **Status**      | SIM       | `Público` ou `Privado` (veja abaixo)                              |
| **Descrição** | NÃO        | Descrição em texto livre; placeholder "Sem descrição" quando vazio |
| **Datas**       | SIM       | Data de criação no topo, data de atualização abaixo                   |

O cabeçalho da página também exibe **Atualização automática**, **+ Criar**, **Importar** (em breve) e **Exportar** (download JSON — página atual, todas filtradas ou páginas específicas).

## Ações na linha

Um menu de três pontos por linha. As ações disponíveis dependem das permissões:

| Ação           | Permissão | O que faz                                                                                    |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| **Visualizar detalhes** | —          | Abre a página de detalhes da etiqueta                                                                      |
| **Editar**         | `edit`     | Abre o formulário de edição (rótulo, status, descrição)                                                 |
| **Excluir**       | `delete`   | Remove a etiqueta da empresa. **Registros previamente etiquetados perdem a ligação** — use com cuidado |

Excluir requer confirmação com uma pressão de 3 segundos para evitar acidentes.

## Página de detalhes

Clicar em uma linha (ou _Visualizar detalhes_) abre a página de detalhes da etiqueta com:

- **Informações da etiqueta** — rótulo, status, descrição (renderizada com suporte a Markdown)
- **Metadados** — ID interno, timestamps de criação / atualização

Editar e Excluir também estão disponíveis nas ações do cabeçalho na página de detalhes.

## Formulário de criação / edição

O **formulário de etiqueta** (`+ Criar` ou _Editar_) tem três campos:

- **Rótulo** (obrigatório) — o nome visível da etiqueta; deve ser suficientemente único para reconhecimento imediato
- **Status** (obrigatório) — `Público` ou `Privado`
  - **Público** — visível e selecionável por todos os operadores da empresa
  - **Privado** — visibilidade restrita; útil para fluxos de trabalho internos/somente admin
- **Descrição** (opcional) — texto livre explicando quando usar a etiqueta; exibido na página de detalhes

Uma **pré-visualização** ao vivo na barra lateral mostra como o rótulo e a descrição da etiqueta ficarão enquanto você digita. Salvar valida que o rótulo não está vazio, grava no pool de etiquetas da empresa e limpa o cache compartilhado de etiquetas para que outras páginas recarreguem na próxima montagem.

## Fluxos típicos

- **Adicionar um novo rótulo** — `+ Criar` → digitar rótulo → escolher Público/Privado → opcionalmente descrever quando usar → Salvar → a etiqueta fica imediatamente disponível nos filtros e formulários de edição de Veículos / Clientes / Operadores
- **Renomear uma etiqueta** — Editar → alterar Rótulo → Salvar (todo registro já etiquetado mantém a ligação; o novo nome aparece em todos os lugares)
- **Descontinuar uma etiqueta** — Excluir pelo menu da linha, ou primeiro definir Status para Privado para ocultá-la de novas etiquetagens mantendo as ligações históricas (você então reanexa apenas via edição direta)
- **Limpar duplicatas** — pesquisar na lista para identificar quase-duplicatas ("vip" vs "VIP") → editar uma para unificar o nome, depois excluir a outra (nota: registros sob a etiqueta excluída perderão a ligação — reetiquete-os primeiro)
- **Exportação em massa** — Exportar → Todas filtradas → download JSON para compartilhar com sua equipe ou fazer backup da taxonomia

## Dicas

- **Etiquetas são globais** — não há namespace separado para "etiquetas de cliente" vs "etiquetas de veículo". Nomeie-as claramente para que uma etiqueta como "VIP" faça sentido em qualquer entidade a que esteja anexada, ou use prefixos ("cliente:vip", "veículo:manutenção") para manter a organização
- **Público é o padrão** — deixe como Público a menos que tenha um motivo específico para restringir a visibilidade
- **Excluir é destrutivo** — todo registro que carrega a etiqueta perde a ligação imediatamente; não há exclusão suave. Prefira renomear ou mudar para Privado se estiver em dúvida
- **Descrição suporta Markdown** na visualização de detalhes — use para documentar quem deve aplicar a etiqueta e quando
- **O cache compartilhado é limpo a cada salvar / excluir** — outras abas abertas capturam suas mudanças na próxima navegação, sem recarregamento completo
- **Nomes de etiquetas aparecem nos filtros contextuais do Ridewolf em todos os lugares** — mantenha-os curtos e amigáveis a minúsculas para a melhor experiência em tabelas densas
