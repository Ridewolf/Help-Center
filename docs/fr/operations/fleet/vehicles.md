# Véhicules — Liste

La liste des Véhicules (`/vehicles`) est l'inventaire de toute votre flotte — chaque trottinette, vélo ou autre unité, avec son état actuel, son emplacement, sa batterie, sa connexion IoT, ses étiquettes et sa zone. C'est la page la plus utilisée du tableau de bord : vous commencez ici pour presque toutes les opérations de flotte.

Pour un travail par véhicule (statut complet, historique, commandes IoT, relecture d'itinéraire), ouvrez la [page de détail du véhicule](vehicle-detail.md).

Permission requise : **Véhicules** (`k7m8n9`).

## Comment les véhicules arrivent ici

Les véhicules n'apparaissent pas d'eux-mêmes — ils sont créés et maintenus par vous :

1. L'opérateur **crée un véhicule** via le bouton _Créer_ (définit l'étiquette, le modèle, l'appareil IoT, l'état initial)
2. Le véhicule est enregistré avec un appareil IoT ; cet appareil commence à rapporter en continu **batterie, état du verrou, dernier signal, coordonnées GPS**
3. Dès que l'appareil IoT envoie son premier battement de cœur, la ligne dans cette liste se remplit avec des données en direct — pourcentage de batterie, heure du signal, indicateur de verrou
4. Les opérateurs (et les actions en masse) **mettent à jour le statut, les étiquettes, la zone, les paramètres** pendant toute la durée de vie du véhicule
5. Lorsque le véhicule est retiré, vous changez son statut en _Stockage_ / _Maintenance_ / etc., ou vous le supprimez

La liste se rafraîchit lorsque vous rechargez ou modifiez les filtres ; les mises à jour IoT en direct poussées par le backend peuvent aussi actualiser les lignes sur place.

## Modes d'affichage — Tableau vs Carte

La page propose deux vues, basculables depuis un contrôle en haut :

- **Tableau** — la grille complète de données avec tous les filtres, tris et fonctionnalités de sélection en masse
- **Carte** — la même flotte projetée sur une carte de votre zone d'exploitation ; les véhicules sont des épingles colorées selon le statut avec des badges de batterie

Les filtres s'appliquent aux deux vues. La vue Carte est idéale pour repérer des regroupements, des lacunes et des opportunités de rééquilibrage ; le Tableau est ce que vous utilisez pour travailler avec les données.

## Filtres

| Filtre   | Type            | Notes                                                                       |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Recherche| Texte pleine largeur | Recherche dans l'étiquette du véhicule, l'ID, le numéro de série IoT — saisie **avec délai d'environ 300 ms** |
| Odomètre | Liste déroulante | Tranches de distance totale : `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Statut   | Liste déroulante | Filtrer par statut du véhicule (voir référence des statuts ci-dessous)       |
| Étiquettes | Sélection multiple | Filtrer par étiquettes appliquées au véhicule                               |

Tous les filtres sont combinés avec ET. Les puces de filtre apparaissent au-dessus du tableau ; l'URL est mise à jour au fur et à mesure.

## Colonnes

| Colonne         | Triable ? | Contenu                                                                                   |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Santé**       | —         | Indicateurs compacts de santé IoT (périphérie) — petites icônes résumant l'état des sous-systèmes IoT |
| **Code**        | ✓         | Étiquette du véhicule (le code lisible sur l'autocollant), avec un lien vers le détail du véhicule |
| **Statut**      | ✓         | Pastille de statut (Disponible, En cours d'utilisation, En charge, etc. — voir référence ci-dessous) |
| **Modèle**      | —         | Nom du modèle et vignette (ex. Xiaomi M365)                                               |
| **Verrou**      | —         | Icône de verrou — fermé (verrouillé) / ouvert (déverrouillé) selon le dernier rapport IoT  |
| **Batterie**    | ✓         | Pourcentage de batterie avec barre colorée (vert ≥ 60 %, ambre 30–60 %, rouge < 30 %)      |
| **Étiquettes**  | —         | Étiquettes appliquées à ce véhicule (les opérateurs peuvent modifier)                     |
| **Zone**        | —         | Zone dans laquelle le véhicule se trouve actuellement, ou « Hors zone »                   |
| **Dernier trajet** | ✓       | Date / heure du dernier déverrouillage pour un trajet                                   |
| **Dernier signal** | ✓       | Dernier rapport de l'appareil IoT (un signal obsolète = appareil probablement hors ligne) |

Les colonnes triables sont marquées ✓ — cliquez sur l'en-tête. Le tri est reflété dans l'URL.

## Référence des statuts

Chaque véhicule est dans un seul statut. Le statut détermine le comportement (si les utilisateurs peuvent le louer, si les alertes IoT se déclenchent, etc.) :

| Statut                  | Signification                                          |
| ----------------------- | ------------------------------------------------------ |
| **Disponible**          | Inactif, louable, stationné correctement               |
| **En cours d'utilisation** | Actuellement en trajet                               |
| **En charge**            | À une station de charge                                |
| **Déchargé**             | Batterie trop faible pour être loué                     |
| **Nécessite une enquête** | Signalé par le système ou un opérateur — nécessite une revue manuelle |
| **Maintenance**          | En atelier / hors flotte pour réparation                |
| **Pas prêt**             | Créé mais pas encore mis à disposition des utilisateurs |
| **Réservé**              | Réservé pour un utilisateur/réservation spécifique     |
| **Transport**            | En cours de déplacement (rééquilibrage, ramassage sur le terrain) |
| **Stockage**             | En stockage longue durée, hors opérations               |
| **Volé**                 | Signalé volé / non retrouvé                             |
| **Alerte**               | Alerte critique du système ou IoT                       |

## Actions sur la ligne

Chaque ligne dispose d'un **menu à trois points** tout à droite. Les actions disponibles dépendent de vos permissions :

| Action                  | Permission            | Ce que cela fait                                                     |
| ----------------------- | --------------------- | ------------------------------------------------------------------- |
| **Voir les détails**    | —                     | Ouvre la [page de détail du véhicule](vehicle-detail.md)            |
| **Voir l'historique**   | `coordinates-history` | Ouvre une carte rejouant la trace GPS récente du véhicule           |
| **Ouvrir dans Google Maps** | —                 | Ouvre les dernières coordonnées connues du véhicule dans Google Maps (nouvel onglet) |
| **Modifier**            | `edit`                | Ouvre le formulaire de modification                                 |
| **Changer le statut**   | `edit`                | Ouvre une petite boîte de dialogue pour changer le statut sans quitter la liste |
| **Supprimer**           | `delete`              | Supprime le véhicule en douceur (avec confirmation)                 |

Les actions pour lesquelles vous n'avez pas les permissions sont masquées.

## Actions groupées

Sélectionnez un ou plusieurs véhicules avec les cases à cocher à gauche de chaque ligne. Une **barre d'actions groupées** apparaît en haut avec le nombre sélectionné et les actions :

| Action groupée       | Permission    | Ce que cela fait                                                  |
| -------------------- | ------------- | ---------------------------------------------------------------- |
| **Changer le statut** | `bulk-update` | Ouvre une boîte de dialogue et applique un statut unique à tous les véhicules sélectionnés |
| **Modifier les étiquettes** | `bulk-update` | Ajoute ou supprime des étiquettes sur la sélection               |
| **Modifier les paramètres** | `bulk-update` | Applique les paramètres du véhicule (ex. vitesse max, alarmes) à tous les sélectionnés |
| **Envoyer une commande** | `iot-command` | Envoie une commande IoT (verrouiller, déverrouiller, alarme on/off, redémarrer) à tous |
| **QR groupé**         | —             | Génère une feuille de codes QR imprimables pour les véhicules sélectionnés |
| **Supprimer la sélection** | `delete`  | Supprime en douceur tous les véhicules sélectionnés (avec confirmation) |

## Actions de la page (en haut à droite)

- **+ Créer** — ouvre le [formulaire de création de véhicule](vehicle-create-edit.md) (article séparé)
- **Exporter** — télécharge la liste filtrée actuelle en fichier (filtres et tri respectés)
- **QR groupé** (également disponible en action groupée) — ouvre l'assistant de génération de codes QR imprimables

## Vue carte

Lorsque vous passez en vue Carte :

- Les véhicules apparaissent sous forme de **points** colorés selon le statut (vert = Disponible, bleu = En cours d'utilisation, etc.)
- Un petit **badge batterie** est affiché à côté de chaque point
- Cliquez sur un point pour ouvrir une infobulle avec le label du véhicule, son statut, la batterie, et un lien _Voir les détails_
- **Les filtres s'appliquent toujours** — affinez par statut, étiquettes, etc. et la carte se met à jour
- Déplacez / zoomez avec la souris ou des gestes à deux doigts

La carte est alimentée par les mêmes données que le tableau — c'est un autre angle de vue, pas un autre jeu de données.

## Flux de travail typiques

- **Rééquilibrage groupé** — filtrez par `Statut = Déchargé` + zone, sélectionnez tout, _Envoyer commande → Verrouiller_ (ou _Changer statut → Transport_) avant la prise en charge
- **Trouver un véhicule bloqué** — triez par _Dernier signal_ croissant pour voir les signaux les plus anciens en haut
- **Repérer les batteries faibles avant qu'elles ne posent problème** — triez par _Batterie_ croissant ; le bas de la flotte est votre file d'attente de maintenance proche
- **Auditer une étiquette** — filtrez par étiquette et passez en revue les lignes
- **Préparation du personnel terrain** — filtrez sur les cibles du jour, _QR groupé_ pour imprimer les étiquettes des nouvelles unités

## Conseils

- **La recherche est débouncée** — faites une pause dans la saisie pour que le serveur réponde une fois
- **L'URL = la vue** — copiez et partagez des liens filtrés avec vos collègues
- **Colonne santé en un coup d'œil** — les petites icônes résument les sous-systèmes IoT ; survolez une icône pour voir ce qu'elle représente (ex. signal cellulaire, état du verrou, lecture de capteur)
- **La couleur de la batterie est votre code rapide** — une barre rouge dans la liste = besoin de chargeur ou de prise en charge bientôt
- **L'indicateur de verrou est le dernier rapport IoT** — il peut avoir quelques secondes de retard ; utilisez _Envoyer commande → Verrouiller_ si vous devez garantir l'état sur l'appareil
