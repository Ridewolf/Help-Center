# Analytique — Événements récents

La page d'analytique des Événements (`/analytics/events`) est votre **tableau de bord des incidents** : chaque événement notable du système, véhicule, utilisateur et zone sur une période choisie, avec des compteurs KPI, des tendances dans le temps, et un fil consultable en bas.

Différent du [panneau Notifications](../../features/ux/notifications.md) (temps réel, par événement) — cette page est **agrégée et historique**, utile pour repérer des tendances et faire des revues post-incident.

Permission requise : **Voir les événements récents** (`s1t2u3`).

## Plage temporelle et filtres

Une **barre de plage de dates** est en haut — chaque métrique et graphique la respecte. Quatre filtres supplémentaires affinent la vue :

| Filtre          | Options                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Gravité**     | `critical` / `warning` / `info` (sélection multiple)                    |
| **Type**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Type de source** | `vehicle` / `user` / `zone` / `system`                                |
| **Statut**      | `open` / `resolved` / `dismissed`                                       |

Tous les filtres se combinent avec ET. L'URL reflète chaque réglage — partagez un lien et votre collègue voit exactement la même sélection.

## Sections

La page comporte **cinq sections** :

### 1. Résumé

Quatre cartes métriques résument les comptes d'événements :

| KPI          | Ce qu'il affiche                                             |
| ------------ | ------------------------------------------------------------- |
| **Total**    | Total des événements dans la plage                            |
| **Critique** | Nombre avec `severity = critical` — le chiffre à surveiller  |
| **Avertissement** | Nombre avec `severity = warning`                          |
| **Info**     | Nombre avec `severity = info` — généralement du bruit sauf pic |

Chaque carte affiche un badge de comparaison « vs période précédente ».

### 2. Par type

Un graphique décomposant les événements par **type** :

- **Erreur** — défaillances système / intégration
- **Hors ligne** — appareils IoT hors service
- **Batterie** — alarmes de batterie faible / déchargée / anomalie
- **Paiement** — refus, problèmes de passerelle
- **Assistance** — pics de tickets / chat
- **Maintenance** — événements liés au service

Un pic sur un type unique est généralement votre point de départ pour une enquête.

### 3. Tendances

Deux graphiques en séries temporelles :

- **Par jour** — événements par jour sur la plage (visualise les cycles hebdomadaires)
- **Par heure** — événements par heure de la journée sur toute la plage (visualise les pics quotidiens)

### 4. Sources principales

Une liste des **sources principales** générant des événements — généralement des véhicules ou zones individuels avec un nombre disproportionné d'événements.

Chaque entrée inclut la source (liée à sa page de détail), le nombre d'événements, et la gravité / type dominant.

C'est ici que vous trouvez le **véhicule qui a déclenché des alarmes toute la semaine** ou la **zone avec des problèmes de batterie**.

### 5. Fil

Un fil déroulant d'événements individuels correspondant aux filtres actuels. Chaque ligne affiche :

- Icône de gravité (colorée)
- Type d'événement + étiquette source
- Brève description
- Horodatage
- Pastille de statut

Cliquez sur un élément du fil pour naviguer vers l'entité liée (véhicule, client, trajet, ticket) si applicable.

## Flux de travail typiques

- **Revue matinale quotidienne** — préréglage _Dernières 24h_ → Gravité = Critique → scan ; tout ce qui est rouge attire l'attention avant d'ouvrir le reste du tableau de bord
- **Tri des sources principales** — section Sources principales → cliquez sur un véhicule qui réapparaît → corrigez ou escaladez à la source
- **Détection de tendances** — graphiques de tendances ; un jour ou une heure inhabituelle montre qu'un changement a eu lieu (déploiement, météo, panne)
- **Revue post-incident** — choisissez le jour → gravité = critique → recoupez le Fil avec l'onglet Alertes du [Véhicule](../../operations/fleet/vehicle-detail.md) ou la section Qualité des [analyses Paiements](payments.md) selon le type
- **Passage de nettoyage** — Statut = Ouvert → résolvez en masse les éléments obsolètes (vous faites cela depuis les pages source, pas ici, mais vous les trouvez ici)

## Conseils

- **Critique d'abord** — commencez par `severity = critical` ; les avertissements et infos se résolvent souvent seuls
- **Le type est votre détective** — une fois un pic identifié, filtrez par le type dominant pour réduire le bruit
- **Sources principales, c'est de l'or** — un véhicule en tête de liste explique typiquement 30-50 % des événements
- **Agrégations vs brut** — cette page agrège ; pour les transactions / alertes réelles, allez à la page du domaine source
- **Filtres persistants** — vos réglages survivent à la navigation ; effacez-les avant de transmettre l'URL à quelqu'un d'autre
- **Statut `open` ≠ alarme IoT non résolue** — le Statut ici est celui de l'enregistrement d'événement ; l'alarme sous-jacente peut avoir été levée sur l'appareil alors que l'événement est toujours ouvert dans le système
