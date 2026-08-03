# Inventaire et pièces

La page Inventaire et pièces (`/maintenance/inventory`) suit le **stock de pièces de rechange derrière votre opération de maintenance** — filtres, plaquettes de frein, batteries, panneaux de carrosserie — avec les niveaux de stock, les seuils de réapprovisionnement et la valorisation. Elle partage le **Panneau d'information Maintenance** avec les [Tâches de maintenance](tasks.md) et [Automatisation de la maintenance](automation.md).

Vous la trouverez dans la barre latérale sous **Maintenance → Inventaire**.

> **À noter : la gestion des articles arrive bientôt.** L'ajout et la modification des articles d'inventaire sont actuellement désactivés (« bientôt disponible »). Ce qui est en ligne aujourd'hui, ce sont les chiffres du Panneau d'information — **nombre total d'articles, stock faible, rupture de stock, valeur totale** — sur une fenêtre fixe de 30 jours.

## Ce que vous indique le Panneau d'information

- **Nombre total d'articles** — combien d'enregistrements d'inventaire distincts existent
- **Stock faible** — articles au niveau minimum ou en dessous
- **Rupture de stock** — articles sans disponibilité ; tout nombre supérieur à zéro colore la tuile en rouge **danger**
- **Valeur totale** — la valorisation du stock disponible

Le même panneau apparaît sur les trois pages Maintenance (voir [Tâches de maintenance](tasks.md) pour la répartition complète de ses quatre blocs), et le passage d'une page à l'autre est instantané.

## Le modèle d'inventaire

La structure de l'article est déjà définie, vous pouvez donc planifier la structure de votre catalogue avant la mise en service de la fonctionnalité :

- **SKU**, **libellé**, **description**
- **Catégorie** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stock** — disponible, réservé, disponible à la vente, minimum, maximum, plus un indicateur de besoin de réapprovisionnement
- **En transit** — achats entrants et transferts
- **Coût** — moyenne, dernier prix d'achat, valorisation
- **État** — `new`, `used`, `refurbished`, `for-repair` — plus les **bacs** de stockage
- **Expiration de garantie**, **date d'expiration**, **statut**, **étiquettes**

## Le flux de création prévu

La création d'article sera un assistant en trois étapes :

1. **Article** — SKU, nom, catégorie, description
2. **Stock** — quantité, niveau minimum, prix
3. **Revue** — confirmation et envoi

## Questions fréquentes

- **Je ne peux pas ajouter d'article — problème de permissions ?** Non, le formulaire est désactivé pour tout le monde jusqu'à la mise en service de la fonctionnalité. C'est prévu.
- **Puis-je gérer le stock par bac de stockage ?** Les bacs existent dans le modèle de données, mais il n'y a pas encore d'écran de gestion au niveau des bacs.
- **Les chiffres ne réagissent à aucun filtre.** La fenêtre de 30 jours du Panneau d'information est fixe ; il n'y a pas de filtres à appliquer.

## Conseils

- **Surveillez d'abord la « rupture de stock »** — c'est la métrique qui colore la tuile en danger et celle qui bloque les réparations.
- **La logique de réapprovisionnement dépendra du niveau minimum** — lors de la conception de votre catalogue, fixez des minimums réalistes par article ; l'indicateur de besoin de réapprovisionnement en découle.
