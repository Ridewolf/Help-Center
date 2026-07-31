# Guias Rápidos

A página Guias Rápidos (`/settings/quick-guides`) contém os **passo a passo** que o aplicativo móvel Ridewolf para riders exibe para coisas como "Como alugar uma scooter" ou "Checklist de segurança". Cada guia é uma lista ordenada de itens com um ícone, cor, título e texto — publicados por público (app do rider, app do cliente, mecânico, admin, geral).

Juntamente com os [Conjuntos de FAQ](faq-sets.md) (blocos de perguntas e respostas) e os [Conjuntos de Ícones](icon-sets.md) (arte do mapa), os Guias Rápidos são o terceiro pilar da camada de conteúdo. Edite um guia aqui, o app do rider captura a mudança na próxima atualização — sem necessidade de liberar uma nova versão do app.

Permissão necessária: **Guias Rápidos** (verifique com o admin).

## Onde isso aparece para o rider

No app móvel do rider, os Guias Rápidos alimentam os tutoriais de onboarding e as telas de dicas durante a corrida. Cada guia com tipo **rider-app** e status `active` é carregado; itens marcados como `visible` aparecem na `order`, com o `icon` e `color` configurados à esquerda, e o texto do `body` expandido se `expandByDefault` for verdadeiro.

Guias do tipo `client-app`, `mechanic`, `admin`, `general` são vinculados às suas respectivas interfaces.

## Filtros

| Filtro  | Tipo         | Notas                                                                    |
| ------- | ------------ | ------------------------------------------------------------------------ |
| Pesquisa| Texto        | Caixa de busca no cabeçalho — pesquisa título / descrição / slug        |
| Tags    | Multi-seleção| Filtra por tags (onboarding, básicos, técnico, pagamentos, …)           |
| Status  | Dropdown     | `Ativo` / `Rascunho` / `Arquivado` (ou `Todos`)                         |
| Tipo    | Dropdown     | `App do cliente` / `App do rider` / `Mecânico` / `Admin` / `Geral` (ou `Todos`) |

**Limpar tudo** reseta todos os filtros.

## Colunas

| Coluna      | Conteúdo                                                            |
| ----------- | ------------------------------------------------------------------ |
| **Conjunto**| Ícone de livro + título; linha secundária mostra descrição ou slug |
| **Tipo**    | Indicador de público — App do cliente / App do rider / Mecânico / Admin / Geral |
| **Tags**    | Primeiras 3 tags, com `+N` para excesso                            |
| **Itens**   | Número de passos no guia                                           |
| **Status**  | `Ativo` (verde) / `Rascunho` (cinza) / `Arquivado` (suave)        |
| **Atualizado** | Data relativa; passe o mouse para ver timestamp completo + autor |

Clique em uma linha para abrir o diálogo **Visualizar** (prévia de cada passo). Clique no menu de três pontos para ações.

## Ações na linha

| Ação             | O que faz                                                          |
| ---------------- | ----------------------------------------------------------------- |
| **Visualizar detalhes** | Prévia com todos os itens renderizados como o rider veria      |
| **Editar**       | Abre o formulário (igual a Criar, preenchido)                    |
| **Duplicar**     | Clona o guia com sufixo `-copy` no slug e status resetado para `Rascunho` |
| **Exportar**     | Baixa como ZIP ou JSON                                            |
| **Arquivar**     | Move para `Arquivado` — oculto no app do rider, mantido para histórico |
| **Excluir**      | Remove permanentemente                                            |

Os botões da barra superior **Importar** (ZIP / JSON) e **Exportar** (ZIP / JSON) funcionam em lote.

## Formulário de Criar / Editar

O formulário tem os mesmos seletores principais dos Conjuntos de FAQ, além de um editor mais completo por item:

- **Tipo** — obrigatório, define quem vê o guia
- **Status** — `Rascunho` / `Ativo` / `Arquivado`
- **Tags** — multi-seleção
- **Título / Descrição** — título obrigatório, descrição opcional
- **Itens** — a lista de passos. Cada item tem:
  - **Título** — o cabeçalho do passo
  - **Corpo** — o conteúdo do passo (texto longo, simples)
  - **Ícone** — nome de ícone Lucide (ex: `MapPin`, `QrCode`, `Shield`)
  - **Cor** — cor hex com presets da marca (Primária `#6366f1`, Sucesso `#22c55e`, Aviso `#eab308`, Perigo `#ef4444`, etc.)
  - **Expandir por padrão** — se ligado, o item abre expandido no app
  - **Visível** — alternar para esconder um item sem deletar
  - **Ordem** — arraste para reordenar

O slug é derivado do título e usado na URL da API.

## Fluxos típicos

- **Escrever um guia de onboarding novo** — `+ Criar guia` → Tipo = App do rider, Status = Rascunho → adicionar 5–7 itens ordenados com ícones + cores → pré-visualizar via Visualizar detalhes → mudar para Ativo → aparece no app do rider na próxima atualização
- **Tornar um passo opcional / escondê-lo** — Editar → desligar `Visível` no item → salvar (o item fica nos dados, só não é exibido)
- **Testar um novo passo a passo A/B** — Duplicar o guia ativo → editar a cópia → arquivar o antigo e ativar o novo juntos
- **Importar em lote um rascunho de designer** — no canto superior direito _Importar_ → ZIP/JSON → confirmar estrutura analisada → importar como Rascunho → revisar e Ativar

## Dicas

- **Ícones são nomes Lucide** — escolha em [lucide.dev](https://lucide.dev) para que renderizem no app; nomes errados caem em um placeholder
- **Colorir os passos para facilitar a leitura** — riders escaneiam guias. Use Aviso para passos de "cuidado" e Sucesso para estados "concluídos"
- **`expandByDefault` é geralmente só para o primeiro passo** — abrir todos os itens por padrão anula o propósito do acordeão. Deixe os demais recolhidos
- **O texto do corpo é prosa simples, não markdown** — mantenha parágrafos curtos; o app móvel define a tipografia
- **Arquive em vez de Excluir** ao aposentar um guia — você pode reativar ou duplicar depois
- **Use tags consistentemente com os [Conjuntos de FAQ](faq-sets.md)** — `onboarding`, `troubleshooting`, etc. são vocabulário compartilhado na camada de conteúdo
