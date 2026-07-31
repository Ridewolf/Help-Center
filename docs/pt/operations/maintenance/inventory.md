# Inventário e Peças

A página Inventário e Peças (`/maintenance/inventory`) monitora o **estoque de peças sobressalentes por trás da sua operação de manutenção** — filtros, pastilhas de freio, baterias, painéis da carroceria — com níveis de estoque, limites de reposição e avaliação. Ela compartilha o **Painel de Insights de Manutenção** com [Tarefas de Manutenção](tasks.md) e [Automação de Manutenção](automation.md).

Encontre-a na barra lateral em **Manutenção → Inventário**.

> **Aviso: o gerenciamento de itens está chegando em breve.** Adicionar e editar itens do inventário está atualmente desabilitado ("em breve"). O que está disponível hoje são os números do Painel de Insights — **total de itens, estoque baixo, sem estoque, valor total** — em uma janela fixa de 30 dias.

## O que o Painel de Insights informa

- **Total de itens** — quantos registros distintos de inventário existem
- **Estoque baixo** — itens no nível mínimo ou abaixo dele
- **Sem estoque** — itens sem disponibilidade; qualquer valor acima de zero torna o bloco vermelho **danger**
- **Valor total** — a avaliação do estoque disponível

O mesmo painel aparece em todas as três páginas de Manutenção (veja [Tarefas de Manutenção](tasks.md) para a descrição completa de seus quatro blocos), e a troca entre páginas é instantânea.

## O modelo de inventário

A estrutura do item já está definida, para que você possa planejar a estrutura do seu catálogo antes do lançamento do recurso:

- **SKU**, **rótulo**, **descrição**
- **Categoria** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Estoque** — disponível, reservado, disponível para uso, mínimo, máximo, além de uma flag de necessidade de reposição
- **Em trânsito** — compras e transferências em andamento
- **Custo** — média, último preço de compra, avaliação
- **Condição** — `new`, `used`, `refurbished`, `for-repair` — além de **caixas** de armazenamento
- **Validade da garantia**, **data de validade**, **status**, **etiquetas**

## O fluxo de criação planejado

A criação de itens será um assistente de três etapas:

1. **Item** — SKU, nome, categoria, descrição
2. **Estoque** — quantidade, nível mínimo, preço
3. **Revisão** — confirmar e enviar

## Perguntas comuns

- **Não consigo adicionar um item — permissões?** Não, o formulário está desabilitado para todos até o lançamento do recurso. Esperado.
- **Posso gerenciar o estoque por caixa de armazenamento?** As caixas existem no modelo de dados, mas ainda não há tela de gerenciamento por caixa.
- **Os números não reagem a nenhum filtro.** A janela de 30 dias do Painel de Insights é fixa; não há filtros para aplicar.

## Dicas

- **Observe primeiro o "sem estoque"** — é a métrica que torna o bloco vermelho danger e a que bloqueia reparos.
- **A lógica de reposição dependerá do nível mínimo** — ao projetar seu catálogo, defina mínimos realistas por item; a flag de necessidade de reposição deriva deles.
