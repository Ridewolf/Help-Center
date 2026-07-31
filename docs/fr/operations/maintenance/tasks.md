# Tâches de maintenance

La page Tâches de maintenance (`/maintenance/tasks`) est le centre des **ordres de travail pour votre flotte** — réparations, inspections, entretien programmé. Elle partage le **Panneau d'aperçu de maintenance** avec [Inventaire et pièces](inventory.md) et [Automatisation de la maintenance](automation.md), vous offrant une vue en temps réel sur 30 jours de la charge de travail de maintenance.

Vous la trouverez dans la barre latérale sous **Maintenance → Tâches**.

> **Attention : la création de tâches arrive bientôt.** Le bouton **Créer une tâche** est actuellement désactivé avec une info-bulle « bientôt disponible » — il n'est pas possible de créer ou modifier des tâches dans le produit aujourd'hui. Les chiffres du Panneau d'aperçu sont cependant en temps réel. Ne planifiez pas de flux de travail autour de la création de tâches ici avant la sortie de cette fonctionnalité.

## Panneau d'aperçu de maintenance

Le panneau en haut de la page est entièrement fonctionnel et en lecture seule. Il couvre une **fenêtre glissante de 30 jours** (fixe — il n'y a pas de sélecteur de date) et affiche :

| Bloc           | Indicateurs                                               |
| -------------- | --------------------------------------------------------- |
| **Tâches**     | total, en attente, en cours, terminées, en retard         |
| **Service**    | programmé, terminé, durée moyenne, à venir cette semaine  |
| **Inventaire** | total d'articles, stock faible, en rupture, valeur totale |
| **Automatisation** | règles actives, déclenchées aujourd'hui, taux de réussite |

- Une tuile devient **avertissement** lorsqu'il y a des tâches ouvertes, et **danger** lorsqu'il y a une rupture de stock.
- Sous les tuiles : un graphique en barres de la répartition des statuts des tâches et un indicateur de progression pour le taux de réussite de l'automatisation.
- Le même panneau (et les mêmes données) apparaît sur les trois pages Maintenance, donc le passage de l'une à l'autre est instantané.

## Le modèle de tâche

Même si la création n'est pas encore disponible, la structure de la tâche est définie — utile pour planifier comment votre équipe l'utilisera :

- **Libellé** et **description**
- **Statut** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priorité** et **gravité** — chacun `low` / `medium` / `high` / `critical`
- **Impact** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Source** — `user`, `iot`, `inspection`, `schedule` (origine de la tâche)
- **Catégorie / sous-catégorie**, **véhicule** lié, **assigné à**, **étiquettes**
- **Coût** — pièces, main-d'œuvre, total
- **SLA** — échéance et statut SLA

Il n'y a pas de champ "type de tâche" distinct — ce que vous pourriez considérer comme _routinière_, _réparation_ ou _inspection_ se traduit plutôt par **source**, **catégorie**, **gravité** et **impact**.

## Le flux de création prévu

Une fois la création disponible, ce sera un assistant en trois étapes :

1. **Infos** — nom et description
2. **Statut** — choisir le statut de départ
3. **Revue** — un résumé dans lequel vous pouvez revenir pour modifier un champ, puis soumettre

## Questions fréquentes

- **Le bouton "Créer une tâche" ne s'ouvre pas — est-ce un problème de permissions ?** Non. Le bouton est désactivé pour tout le monde pendant la finalisation de la fonctionnalité. C'est normal.
- **Le Panneau d'aperçu ignore mes filtres de date.** Il n'y en a pas — la fenêtre de 30 jours est fixe.
- **Les indicateurs d'échange de batterie affichent des squelettes de substitution.** Cette agrégation n'est pas encore disponible.
- **Où est l'historique de service par véhicule ?** Pas disponible dans la version actuelle. Pour l'instant, utilisez le journal d'activité du véhicule sur la [page de détail du véhicule](../fleet/vehicle-detail.md) comme enregistrement le plus proche.

## Conseils

- **Suivez les réparations urgentes via les [Tickets](../../support/tickets-proofs-chat/tickets.md) pour l'instant** — jusqu'à la sortie de la création de tâches, la file des tickets d'assistance (avec ses champs de gravité et SLA) est l'alternative opérationnelle pour les suivis exploitables.
- **Utilisez le Panneau d'aperçu comme tableau de bord de santé** — les tâches en retard et les pièces en rupture sont les deux chiffres qui font passer les tuiles au rouge ; vérifiez-les au début de chaque service.
