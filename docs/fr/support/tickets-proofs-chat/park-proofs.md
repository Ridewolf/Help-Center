# Preuves de stationnement — Liste

La liste des Preuves de stationnement (`/support/park-proofs`) est la file de modération des photos que les utilisateurs prennent de leur véhicule à des moments clés d'un trajet. Ces photos prouvent que l'utilisateur a bien stationné (ou non), et le rôle de votre équipe est de **valider les bonnes photos, avertir ou pénaliser les mauvaises**.

Pour la revue photo par photo (l'écran de modération avec grande image), voir [Park Proof Review](park-proof-review.md). Pour les règles d'automatisation qui gèrent les cas évidents sans intervention, voir [Auto Review](park-proof-auto-review.md).

Permission requise : **Park Proofs** (`d5e6f7`). Certaines actions sur les lignes nécessitent des sous-permissions supplémentaires.

## Comment les preuves arrivent ici

L'application mobile invite l'utilisateur à prendre une photo à trois moments :

1. **Début** — lorsqu'il déverrouille le véhicule (prouve que l'unité était en bon état au départ)
2. **Stationnement** — lors d'une pause en cours de trajet (prouve qu'il a stationné légalement pendant l'arrêt)
3. **Fin** — à la fin du trajet (la **principale** — prouve qu'il a laissé le véhicule correctement stationné)

La photo est téléversée avec les métadonnées GPS et ajoutée à cette file avec le statut **En attente**. L'Auto Review peut la passer en _Approuvé_ (bonne photo) sans intervention ; tout ce dont l'Auto Review n'est pas sûr arrive ici pour revue humaine.

## Filtres

| Filtre     | Type     | Notes                                                               |
| ---------- | -------- | ------------------------------------------------------------------- |
| Recherche  | Texte    | Recherche par nom du client, étiquette du véhicule, ID du trajet   |
| Plage de dates | Calendrier | Sélecteur de début / fin ; par défaut "toutes périodes"          |
| Statut     | Liste déroulante | `En attente` / `Approuvé` / `Avertissement` / `Amende` / `Bloqué` (ou `Tous`) |
| Type       | Liste déroulante | `Début` / `Stationnement` / `Fin` (ou `Tous`)                      |

Utilisez `Statut = En attente` comme filtre de surveillance quotidienne — c'est la file de modération.

## Colonnes

| Colonne     | Triable ? | Contenu                                                   |
| ----------- | --------- | --------------------------------------------------------- |
| **Image**   | —         | Vignette de la photo (cliquez pour ouvrir la page de revue) |
| **Utilisateur** | —      | Nom du client et avatar ; cliquez pour ouvrir le profil client |
| **Véhicule** | —        | Étiquette et modèle du véhicule ; cliquez pour ouvrir le détail du véhicule |
| **Trajet**  | —         | ID du trajet ; cliquez pour ouvrir le détail du trajet    |
| **Type**    | ✓         | Phase du trajet (`Début` / `Stationnement` / `Fin`)       |
| **Statut**  | ✓         | Pastille de statut (voir référence ci-dessous)            |
| **Date**    | ✓         | Date de prise de la photo ; tri par défaut = plus récent en premier |

## Référence des statuts

| Statut       | Couleur | Signification                                                                 |
| ------------ | ------- | --------------------------------------------------------------------------- |
| **En attente** | Jaune  | En attente de modération (votre intervention ou celle de l'Auto Review)      |
| **Approuvé** | Vert    | Photo valide — l'utilisateur a bien stationné                              |
| **Avertissement** | Orange | Photo moyenne — l'utilisateur reçoit un avertissement mais pas d'amende    |
| **Amende**   | Rouge   | Photo mauvaise — l'utilisateur a été sanctionné (ou le système l'a signalée comme candidate à une amende) |
| **Bloqué**   | Gris    | L'utilisateur a été bloqué à cause de cette preuve (infraction grave / répétée) |

Les statuts définis via les actions sur les lignes et sur la page de revue sont enregistrés à la fois dans le dossier de la preuve et dans le [Journal des actions](../../operations/customers/client-detail.md#onglet-activité) du client.

## Actions sur les lignes

Chaque ligne dispose d'un **menu à trois points** à droite. Les actions disponibles dépendent des permissions :

| Action        | Permission    | Fonctionnalité                                                                                              |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| **Voir**      | `view-detail` | Ouvre la [page de revue](park-proof-review.md) avec l'image complète et le contexte                        |
| **Approuver** | `review`      | Marque la preuve comme _Approuvée_ (pas d'amende, pas d'avertissement) — typique pour les bonnes photos   |
| **Avertir**   | `review`      | Marque comme _Avertissement_ — l'utilisateur est notifié mais pas sanctionné                              |
| **Ouvrir le trajet** | —       | Accède à la page de détail du trajet lié (carte du parcours, chronologie, etc.)                           |

Les actions pour lesquelles vous n'avez pas la permission sont masquées.

L'ensemble complet des actions (Amender, Bloquer l'utilisateur, Créer une tâche de maintenance, Demander un repositionnement) se trouve sur la **page de revue** — rendez-vous-y pour toute action au-delà d'une simple approbation ou avertissement.

## Actions de la page (en haut à droite)

- **Auto Review** — ouvre la [page des paramètres Auto Review](park-proof-auto-review.md) pour configurer les règles qui approuvent automatiquement les bonnes photos évidentes et signalent automatiquement les mauvaises évidentes (cela vide la file En attente pour que vous ne revoyiez que les cas limites)

## Flux de travail typiques

- **File de modération quotidienne** — `Statut = En attente` → trier par date du plus ancien au plus récent → parcourir chaque élément, _Voir_ pour le contexte, _Approuver_ / _Avertir_ selon ce que vous observez
- **Enquêter sur une plainte** — rechercher par ID de trajet ou client → trouver la preuve → _Voir_ → vérifier la photo par rapport à la réclamation de l'utilisateur
- **Trouver les récidivistes** — rechercher par nom de client → examiner plusieurs preuves pour détecter un schéma (le journal d'activité du profil utilisateur racontera la même histoire)
- **Uniquement fin de trajet** — `Type = Fin` → ne revoir que les photos de fin de trajet (les plus importantes ; les photos de stationnement en cours de trajet sont généralement correctes)
- **Auditer Auto Review** — filtrer `Statut = Approuvé` pour la dernière journée → vérifier un échantillon pour s'assurer que les règles fonctionnent correctement

## Conseils

- **La vignette suffit pour la plupart des appels** — clairement à l'intérieur d'une zone, cadrée droit, sans obstruction — _Approuver_ sans ouvrir. Gardez _Voir_ pour les photos ambiguës
- **Ouvrir le trajet** est votre raccourci vers le contexte — si le conducteur affirme avoir stationné légalement, la carte du trajet vous montre où il a réellement terminé
- **Les statuts sont persistants** — une fois que vous avez défini _Approuvé_, le conducteur ne reçoit plus de rappels pour cette preuve. N'approuvez pas une mauvaise photo pour « vider la file » sous peine de perdre la possibilité de faire un suivi
- **Avertissement est votre statut "intermédiaire"** — utilisez-le lorsque la photo est mauvaise mais non malveillante (le conducteur était pressé, le temps était mauvais, etc.). Les avertissements répétés entraînent des amendes via les règles d'Auto Review
- **Utilisez Auto Review de manière agressive** — la file d'attente grandit vite ; plus Auto Review approuve automatiquement les photos manifestement bonnes, plus vous avez d'énergie pour les cas vraiment ambigus
- **L'URL est partageable** — copiez une vue filtrée (par ex. _preuves sanctionnées d'hier_) et envoyez-la à un collègue pour un contrôle ponctuel
