# Analytique — Véhicules

La page d'analytique Véhicules (`/analytics/vehicles`) est le **tableau de bord de santé de la flotte** : combien de véhicules vous avez, comment ils fonctionnent, l'état de la batterie, les problèmes et les pannes par type et zone.

Différent de la [liste des Véhicules](../../operations/fleet/vehicles.md) — qui est la vue opérationnelle par unité ; ceci est des **métriques agrégées de la flotte** sur une période choisie.

## Période

Une **barre de plage de dates** se trouve en haut. Les graphiques de tendance utilisent toute la plage ; les aperçus / comptes de statut reflètent l'**état actuel** (fin de la plage).

## Sections

Sept sections, de haut en bas :

### 1. Aperçu

Composition de la flotte au niveau supérieur.

| KPI               | Ce qu'il montre                                                    |
| ----------------- | ------------------------------------------------------------------ |
| **Total**         | Tous les véhicules enregistrés                                     |
| **Actif**         | Disponibles pour les riders à la location en ce moment            |
| **Inactif**       | Inutilisés, pas en service (peut être Disponible ou faible usage) |
| **Hors service**  | En Maintenance / Stockage / Pas prêt — ne génèrent pas de revenu  |
| **Perdus / Volés**| Statut = Volé, ou hors réseau depuis plus longtemps que le seuil  |

Utilisez cette section comme votre aperçu principal de la flotte.

### 2. Performance

À quel point votre flotte vous **génère des revenus**.

| KPI                   | Ce qu'il montre                                              |
| --------------------- | ------------------------------------------------------------ |
| **Véhicules générateurs** | Véhicules ayant effectué au moins un trajet dans la période |
| **Véhicules dormants**    | Véhicules actifs sans trajets (gaspillage)                  |
| **Trajets par véhicule**   | Moyenne de trajets par véhicule sur la plage                 |
| **Utilisation**           | Heures louées / heures disponibles (référence secteur : 5-15%) |

Dormant sur Actif est le pire cas — vous coûte en frais opérationnels sans rien produire.

### 3. Batterie

Santé des batteries dans la flotte.

| KPI / Graphique  | Ce qu'il montre                                                                   |
| ---------------- | --------------------------------------------------------------------------------- |
| **Niveau moyen** | Pourcentage moyen de batterie sur tous les véhicules en ce moment                  |
| **Critique**     | Nombre en dessous du seuil critique (10-20%)                                      |
| **Tendance moyenne** | Moyenne de batterie sur la plage — en baisse = les échanges ne suivent pas       |
| **Répartition**  | Histogramme des véhicules par tranche de batterie (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Échanges**     | Nombre d'opérations d'échange de batterie dans la plage                           |

Si le niveau moyen baisse tandis que le critique augmente, l'équipe terrain est en retard — planifiez plus d'échanges.

### 4. Problèmes

Alertes et problèmes opérationnels signalés sur la flotte.

| KPI             | Ce qu'il montre                                                  |
| --------------- | ---------------------------------------------------------------- |
| **Alertes**     | Total des alertes signalées dans la plage                        |
| **Types d'alerte** | Répartition par type (batterie / connectivité / mécanique / etc.) |
| **Critique**    | Alertes de gravité critique                                     |
| **Maintenance** | Véhicules actuellement en statut Maintenance                     |
| **Hors ligne**  | Véhicules dont l'IoT n'a pas rapporté depuis plus longtemps que le seuil |

Associez cette section avec l'analytique [Événements récents](events.md) pour la vue par événement.

### 5. Tendances

Graphique(s) en série temporelle montrant comment le nombre de véhicules **Actifs** a évolué sur la plage. Une baisse signifie généralement un changement massif de statut (passage en maintenance, météo, rappel).

### 6. Par type

Répartition par **type de véhicule** (trottinette / vélo / vélo électrique / etc.). Pour chacun : nombre, ratio de revenus, utilisation, taux d'alerte.

Si un type domine le taux d'alerte, le **modèle** a un problème — pas l'équipe opérationnelle.

### 7. Par zone

Répartition par **zone**. Pour chacune : nombre de véhicules, utilisation, taux de problème.

Les zones à faible utilisation et fort inventaire = **opportunité de rééquilibrage** (voir aussi l'analytique [Rééquilibrage](../../operations/rebalance/runs.md)).

## Flux de travail typiques

- **Revue hebdomadaire de la flotte** — Aperçu → Performance (tendance d'utilisation) → Batterie (augmentation des critiques ?) → Problèmes (pics d'alertes) → Tendances (baisse inexpliquée des Actifs ?)
- **Nettoyage des dormants** — Performance → Nombre de dormants → si en croissance, identifiez les véhicules concernés via la [liste des Véhicules](../../operations/fleet/vehicles.md) et vérifiez statut / emplacement
- **Urgence batterie** — Section Batterie → Critique en hausse + Niveau moyen en baisse → poussez l'équipe terrain
- **Détection de mauvais modèle** — Section Par type → quel type a le pire taux d'alerte → envisagez un retrait progressif / négociation avec le fabricant
- **Rééquilibrage** — Section Par zone → zones à faible utilisation + fort inventaire → planifiez une redistribution
- **Planification pré-poste** — Tendances + Modèles depuis [Événements](events.md) → quels jours / heures nécessitent plus de personnel terrain ?

## Conseils

- **Actif + Inactif + Hors service + Perdu/Volé = Total** — lorsque le calcul ne correspond pas, les statuts sont en transition ; actualisez ou choisissez une date stable
- **Actif ≠ générer des revenus** — un véhicule est « Actif » s'il peut être loué ; « Générer des revenus » signifie qu'il l'a effectivement été. Comparez ces deux valeurs
- **Une utilisation supérieure à 25 % est malsaine** — les utilisateurs ne trouvent pas de véhicules quand ils en ont besoin ; envisagez d'augmenter l'inventaire dans cette zone
- **Une utilisation inférieure à 5 % est un poids mort** — le coût de maintien de ce véhicule en service dépasse ses revenus ; rééquilibrez ou retirez-le
- **Batterie critique + tendance moyenne** — les deux ensemble constituent votre système d'alerte précoce ; un seul est du bruit
- **Perdu / Volé est persistant** — cela nécessite un changement de statut manuel pour être effacé ; récupérez un véhicule « Volé » avant de le remettre en service
- **Par type et par zone ensemble** — parfois un type ne fonctionne que dans une zone (inadaptation au terrain) ; la combinaison croisée le révèle
