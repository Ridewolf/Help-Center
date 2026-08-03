# Trajets — Liste

Un **trajet** est un déplacement unique effectué par un client sur l'un de vos véhicules. La liste des Trajets (`/rides`) est l'enregistrement principal de chaque déplacement — passé, en cours et à venir — sur l'ensemble de la flotte.

Ouvrez une ligne pour voir la [page de détail du trajet](ride-detail.md) avec l'itinéraire, la chronologie et toutes les actions.

Permission requise : **Trajets** (`i1j2k3`).

## Comment les trajets apparaissent ici

Vous ne créez pas de trajets dans le tableau de bord — ils proviennent du côté client :

1. Un client **déverrouille un véhicule** dans l'application mobile (Ridewolf rider app)
2. Le backend crée un nouvel enregistrement de trajet lié à ce véhicule et ce client
3. Le trajet apparaît immédiatement dans cette liste avec le statut **Actif**
4. Lorsque le client **verrouille / gare** le véhicule, le backend clôt le trajet ; le statut passe à **Terminé** et le détail final (distance, durée, prix) est calculé
5. D'autres états terminaux (`Annulé`, etc.) proviennent des règles système ou des actions de l'opérateur

Actualisez ou revisitez la page pour obtenir la dernière capture d'écran — les trajets actifs se mettent à jour au fur et à mesure que le client se déplace.

## Ordre par défaut

Par défaut, le backend renvoie **d'abord les trajets actifs**, puis les trajets terminés dans l'ordre chronologique inverse (les plus récents en premier). Appliquez un tri sur une colonne pour outrepasser cet ordre par défaut.

## Filtres

| Filtre    | Type         | Notes                                                                |
| --------- | ------------ | -------------------------------------------------------------------- |
| Recherche | Texte        | Recherche par nom du client, étiquette du véhicule, ID du trajet    |
| Plage de dates | Calendrier | Sélecteur de début / fin ; par défaut "toutes périodes"             |
| Statut    | Liste déroulante | `Actif`, `Terminé`, `Annulé`, etc.                                 |
| Évaluation| Liste déroulante | Filtrer par note laissée par le passager (1–5, _Pas de note_)       |
| Étiquettes| Multi-sélection | Filtrer par étiquettes de trajet (héritées du véhicule — voir Colonnes ci-dessous) |

Tous les filtres se combinent avec ET. Les pastilles de filtre apparaissent au-dessus du tableau ; l'URL reflète l'état actuel des filtres.

## Colonnes

| Colonne | Triable ? | Contenu                                                            |
| ------- | --------- | ------------------------------------------------------------------ |
| Client  | —         | Avatar, nom, lien vers le profil du client                         |
| Véhicule| —         | Étiquette, modèle, lien vers le véhicule                           |
| Tarif   | —         | Nom du tarif appliqué au trajet                                   |
| Statistiques | —     | Badges rapides : distance, durée, coût total                       |
| Étiquettes | —       | Étiquettes héritées du **véhicule** au moment du début du trajet  |
| Statut  | ✓         | Pastille de statut (Actif, Terminé, Annulé, etc.)                 |
| Évaluation | ✓       | Note laissée par le passager (ou "–" si aucune)                  |
| Créé le | ✓         | Date et heure de début du trajet ; tri par défaut = plus récent en premier |

Triez en cliquant sur un en-tête triable. Le tri choisi fait partie de l'URL et **remplace** l'ordre par défaut décrit ci-dessus — il n'y a pas de troisième clic pour "restaurer par défaut", mais vous pouvez effacer le tri en modifiant l'URL ou en actualisant sans paramètre de tri.

> **Les étiquettes sont héritées du véhicule.** Les trajets n'ont pas leur propre éditeur d'étiquettes — les étiquettes d'un trajet sont une capture instantanée des étiquettes présentes sur le véhicule au début du trajet. Modifiez les étiquettes du véhicule plus tard et les trajets existants conservent leur capture d'origine ; seuls les nouveaux trajets récupèrent les nouvelles étiquettes.

## Actions sur la ligne

Chaque ligne dispose d'un **menu à trois points** tout à droite. Les actions disponibles dépendent du statut du trajet et de vos permissions :

| Action       | Permission      | Quand activée                                                  |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pause**    | `pause-unpause` | Le trajet est **Actif** (pas déjà en pause, terminé, annulé)  |
| **Reprendre**| `pause-unpause` | Le trajet est **En pause**                                    |
| **Terminer le trajet** | `end-ride` | Le trajet n'est **pas** Terminé ou Annulé                    |

Les actions pour lesquelles vous n'avez pas la permission sont cachées. Les actions désactivées (ex. Terminer sur un trajet déjà terminé) apparaissent en gris pour que vous puissiez voir ce qui est possible dans l'état approprié.

L'ensemble complet des actions — remboursement, voir l'itinéraire sur la carte, envoyer une notification, archiver — se trouve sur la **page de détail du trajet**. Cliquez sur la ligne pour y accéder.

## Actions de la page

En haut à droite de la page de liste :

- **Exporter** — téléchargez la liste filtrée actuelle sous forme de fichier (filtres et tri respectés)

## Flux de travail typiques sur la liste

- **Surveiller l'activité en direct** — ouvrez la page et restez dessus ; le haut de la liste affiche les trajets actifs
- **Trouver des trajets dans une zone ou une plage horaire** — combinez plage de dates + statut + étiquettes
- **Repérer des anomalies** — filtrez par `Statut = Annulé` ou `Évaluation ≤ 2` et cherchez des motifs (même véhicule ? même heure de la journée ?)
- **Arrêter rapidement un trajet bloqué** — sans quitter la liste, ouvrez le menu de la ligne et _Terminer le trajet_ (permission requise)

## Conseils

- **L'URL est partageable** — filtrez la liste, copiez l'URL, envoyez-la à un collègue — il obtient la même vue
- **Les badges statistiques dans la liste** sont un moyen rapide de repérer des trajets anormalement courts ou longs avant de cliquer
- **Ne vous fiez pas uniquement à la note** — ouvrez la page de détail pour les trajets mal notés ; la note est un des nombreux signaux
- **Les permissions varient selon l'entreprise** — certains opérateurs ne voient que les trajets des véhicules qu'ils gèrent ; si un trajet vous manque, vérifiez avec un administrateur
