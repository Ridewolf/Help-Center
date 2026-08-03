# Lecteur de Rejouer

Le Lecteur de Rejouer (`/apps/replay-player`) est un outil d'analyse qui anime la trace GPS d'un véhicule sur une journée entière — ou le trajet complet d'un seul trajet — sur une carte. Utilisez-le pour enquêter sur des incidents, valider les réclamations des usagers, auditer des itinéraires inhabituels, ou simplement observer la flotte en mouvement.

Ce n'est pas une carte en temps réel (pour cela, voir le Tableau de bord Realtime) — il rejoue des coordonnées **historiques** provenant du backend avec un contrôle complet de la timeline.

Permission requise : **Lecteur de Rejouer** (`k7m8n9`).

## Disposition

La page est divisée en une barre latérale gauche (sélecteurs + panneaux d'information) et une grande zone de carte avec une barre de contrôle en bas :

| Région       | Largeur | Contenu                                                                |
| ------------ | ------- | --------------------------------------------------------------------- |
| **Barre latérale** | 320 px | Onglets de sélection (Par Véhicule / Par Trajet), panneau(s) d'info par véhicule |
| **Carte**    | flex    | Carte MapLibre avec la polyligne de l'itinéraire, marqueurs de début / fin, curseur en direct |
| **Contrôles**| bas     | Lecture / pause, menu déroulant de vitesse, curseur de timeline, affichage du temps écoulé / total |

## Contrôles (barre latérale)

La barre latérale détermine **ce qui** est lu. Elle comporte deux onglets qui changent le modèle de sélection.

### Onglet Par Véhicule

Jouez la trace complète d'une ou plusieurs véhicules sur une journée (ou une date choisie) :

- **Véhicules** — sélection multiple jusqu'à **5** véhicules. Tapez pour rechercher, filtrez la liste par étiquettes via le menu déroulant ci-dessous.
- **Date** — calendrier contextuel ; par défaut aujourd'hui. La relecture couvre toute la journée en heure locale pour la date choisie.
- **Étiquettes** — restreint la liste des véhicules aux véhicules portant l'une des étiquettes sélectionnées. Utile pour une grande flotte.
- **Charger** — récupère en parallèle les coordonnées de la journée pour tous les véhicules sélectionnés et les affiche.

Lorsque vous chargez plusieurs véhicules, chacun obtient sa propre polyligne (colorée selon la vitesse) et son propre marqueur mobile sur la carte, ainsi qu'une carte d'information dédiée dans la barre latérale.

### Onglet Par Trajet

Jouez les coordonnées d'un seul trajet au lieu d'une journée complète :

- **Véhicule** (optionnel) — sélection unique ; restreint la liste des trajets ci-dessous
- **Date** (optionnel) — calendrier contextuel ; filtre les trajets à une seule journée. Effacez pour voir toutes les dates.
- **Étiquettes** (optionnel) — filtre la liste des trajets par étiquettes de véhicule
- **Liste des trajets** — liste défilante et paginée des trajets correspondant aux filtres ci-dessus. Chaque carte affiche l'heure de début, le statut, la durée et la distance.

Cliquer sur une carte de trajet charge automatiquement ses coordonnées immédiatement — pas besoin de bouton Charger séparé.

## Timeline (barre du bas)

La barre de contrôle s'étend en bas de la carte :

| Contrôle           | Fonction                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Lecture / Pause** | Démarre ou met en pause l'animation                                                      |
| **Menu vitesse**    | Choisit le multiplicateur de vitesse de lecture (voir ci-dessous)                        |
| **Curseur timeline**| Permet de naviguer à n'importe quel point de la relecture ; la carte se met à jour instantanément |
| **Écoulé / Total**  | `mm:ss` (ou `h:mm:ss` si plus d'une heure) — temps écoulé de la relecture et durée totale |

Lorsque plusieurs véhicules sont chargés, le curseur couvre la plage **globale** du début à la fin de l'union de toutes les traces. Les traces qui n'ont pas encore commencé à l'heure actuelle n'ont simplement pas de marqueur sur la carte.

## Carte

La carte utilise le style de carte de votre thème actuel (voir [Themes](../../features/ux/themes.md)). Pour chaque trace chargée :

- Une **polyligne** est dessinée, colorée selon la vitesse — vert pour lent, orange pour moyen, rouge pour rapide
- Un **marqueur vert de départ** est placé au premier point
- Un **marqueur rouge de fin** est placé au dernier point
- Un **marqueur de véhicule** se déplace le long de la ligne pendant la lecture de la timeline

Les contrôles de la carte se trouvent en haut à droite (pile verticale) :

| Bouton            | Fonction                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Zoom avant / arrière** | Zoom standard de la carte                                                              |
| **Réinitialiser l'orientation** | Replace la carte avec le nord en haut si vous l'avez inclinée / tournée               |
| **Ajuster les limites** | Zoom et panoramique pour afficher l'intégralité du ou des itinéraires — utile après qu'une longue relecture ait déplacé la caméra |
| **Plein écran**    | Passe la carte en plein écran ; la barre de contrôle reste en bas                         |

## Vitesse de lecture

Le menu déroulant de vitesse propose huit préréglages : **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** joue la relecture en temps réel — un trajet de 20 minutes prend 20 minutes à se dérouler
- **128x** compresse une journée de 8 heures en environ 4 minutes
- La vitesse peut être changée en cours de lecture ; l'animation continue en douceur depuis sa position

Utilisez des vitesses plus élevées (32x / 64x / 128x) pour les relectures de véhicules sur une journée complète, des vitesses plus basses (1x / 2x / 4x) pour les enquêtes sur un trajet où vous souhaitez voir précisément où se trouvait l'usager à chaque seconde.

## Panneau d'information par véhicule

Chaque véhicule chargé obtient une petite carte dans la barre latérale qui se met à jour en direct pendant la relecture :

| Champ           | Ce qu'il affiche                                                           |
| --------------- | -------------------------------------------------------------------------- |
| **Vitesse**     | Vitesse interpolée actuelle en km/h (codée par couleur : vert / jaune / rouge) |
| **Coordonnées** | Latitude / longitude actuelles à 6 décimales                               |
| **Distance**    | Distance cumulée parcourue jusqu'à présent en km (haversine, calculée côté client) |
| **Point**       | Index du point actuel / total des points (progression dans l'ensemble de données) |

Lorsque la lecture n'a pas commencé ou qu'aucune donnée n'est chargée, la carte affiche des tirets cadratins.

## États vides / de chargement

- **Aucune sélection** — la zone de la carte affiche une icône de lecture et l'invite « Sélectionnez un véhicule et une date ou un trajet pour démarrer la relecture »
- **Chargement** — un indicateur de chargement centré avec « Chargement des coordonnées... » recouvre la carte
- **Pas de données** — si la date ou le trajet choisi n'a aucun point de coordonnées, un toast d'avertissement indique « Aucune donnée de coordonnées trouvée pour cette sélection » et la carte reste vide
- **Échec du chargement d'un segment de carte** — la carte est un segment chargé à la demande (~1 Mo) ; si le chargement échoue (déploiement obsolète, hors ligne), un toast d'erreur vous invite à rafraîchir

## Flux de travail typiques

- **Enquêter sur une plainte** — passez en mode Par trajet, recherchez le trajet du passager, cliquez dessus → regardez l'itinéraire à 4x pour voir où il est réellement allé par rapport à ce qu'il a déclaré
- **Auditer un véhicule « perdu »** — Par véhicule, choisissez l'unité, définissez la date du jour → lancez la lecture à 128x pour voir sa journée complète en secondes ; la dernière position du marqueur est son emplacement actuel
- **Comparer deux véhicules** — Par véhicule, sélectionnez deux unités ayant effectué des itinéraires similaires, même date → les deux polylignes et marqueurs s'affichent ensemble pour une comparaison visuelle
- **Localiser un moment d'événement** — chargez un trajet → déplacez le curseur vers l'horodatage d'un ticket / journal → lisez les coordonnées dans le panneau d'information
- **Repérer un excès de vitesse** — chargez la journée d'un véhicule → cherchez des segments de polyligne **rouges** → déplacez le curseur sur cette zone pour confirmer

## Conseils

- **Maximum 5 véhicules** à la fois — l'interface limite la sélection multiple pour maintenir des performances raisonnables de la carte. Pour plus, faites des sessions séparées.
- **Utilisez Ajuster les limites après une longue relecture** — la lecture suit le marqueur, ce qui déplace la caméra ; un clic sur Ajuster les limites recadre tout l'itinéraire.
- **Les couleurs de vitesse ne sont pas liées aux tarifs** — ce sont uniquement des indices visuels basés sur la vitesse GPS observée (>15 km/h jaune, >30 km/h rouge). Comparez avec le _mode vitesse_ du véhicule sur la page de détail du véhicule pour le contexte.
- **Le curseur peut être déplacé dans les deux sens** — glissez vers l'arrière pour revenir en arrière. Combinez avec une faible vitesse pour avancer pas à pas dans les segments délicats.
- **Pas d'état dans l'URL** — les sélections ne sont pas conservées dans l'URL, vous ne pouvez donc pas partager un lien profond. Sauvegardez des captures d'écran si vous devez marquer un moment.
- **Associez avec la page [Ride Detail](../../operations/trips/ride-detail.md)** — le détail du trajet propose une carte statique de l'itinéraire avec les événements de la chronologie ; le lecteur de relecture ajoute la dimension temporelle par-dessus.
