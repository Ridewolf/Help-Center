# Page Véhicule — Contrôles, Tickets, Pannes et Alertes

La page véhicule (`/vehicle/:id`) est la surface de travail de l'opérateur terrain pour un véhicule unique : télémétrie en direct en haut, boutons d'action au milieu, et trois files d'attente de choses à traiter. Vous y accédez en tapant sur un marqueur ou une ligne de liste sur la [carte de la flotte](fleet-map.md), en scannant un code QR, ou en tapant une ligne en [mode batch](../operations/batch-mode.md).

## Ce que la page affiche selon le type de véhicule

À l'ouverture, la page charge le véhicule, puis son modèle :

- **Trottinettes et vélos** disposent de la page de contrôle complète décrite ici.
- **Voitures** ont une page de statut uniquement, sans contrôles à distance.

Si les informations du modèle ne peuvent pas être chargées, la page s'ouvre quand même — elle revient à la mise en page trottinette plutôt que de vous laisser sur un indicateur de chargement. Si le véhicule lui-même ne peut pas être chargé, vous obtenez un écran d'erreur avec un bouton retour.

## Onglets

Quatre onglets avec un indicateur coulissant :

| Onglet       | Contenu                                         |
| ------------ | ----------------------------------------------- |
| **Trottinette** | Télémétrie en direct et boutons d'action       |
| **Tickets**  | Tickets de support ouverts signalés par les riders |
| **Pannes**  | Erreurs signalées par le traceur                 |
| **Alertes** | Avertissements signalés par le traceur          |

## Onglet Trottinette — télémétrie

En haut se trouve un badge de verrouillage (**vert** = verrouillé, **ambre** = déverrouillé) et le badge de statut du véhicule, puis ces lignes :

| Ligne               | Comment la lire                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **QR / étiquette**  | Le code sur l'autocollant du véhicule                                                     |
| **Réseau**          | Qualité du signal mobile en fraction sur 36 quand en ligne, ou temps depuis le dernier signal quand hors ligne |
| **Batterie**        | Pourcentage de batterie du véhicule — rouge à 10 % ou moins, orange à 20 % ou moins, ambre à 40 % ou moins, vert au-dessus de 40 % |
| **Tension du traceur** | Batterie du traceur, en volts avec deux décimales — rouge en dessous de 3,6 V, vert à 3,6 V et plus |
| **GPS**             | **Fix** ou **No Fix**                                                                     |

La **tension du traceur** est la valeur que les opérateurs lisent le plus souvent mal. C'est la batterie du traceur, pas celle du véhicule : une lecture rouge signifie que le traceur est sur le point de s'éteindre même si la batterie principale semble parfaitement saine. Signalez ces véhicules pour ramassage avant qu'ils ne cessent complètement de transmettre.

## Onglet Trottinette — les cinq boutons d'action

Chaque action demande une confirmation avant d'être envoyée, et vous donne une impulsion haptique à l'envoi.

### 1. Statut

Ouvre une feuille avec neuf statuts, chacun avec une icône et une courte description, et une coche sur le statut actuel :

- Disponible
- Déchargé
- En charge
- Nécessite une enquête
- Maintenance
- Pas prêt
- Transport
- Stockage
- Volé

Choisir **En charge** lance aussi la séquence complète de [changement de batterie](../operations/battery-swap.md) — attendez-vous à ce que le véhicule se déverrouille, attende, puis se reverrouille. Ce n'est pas qu'un simple changement d'étiquette.

### 2. Mode de conduite (verrouiller / déverrouiller)

- **Déverrouiller** envoie la commande de déverrouillage, augmente la limite de vitesse à 25 km/h, allume le moteur, et démarre le suivi du trajet.
- **Verrouiller** arrête le suivi, éteint le moteur, restaure la limite de vitesse de stationnement à 6 km/h, et verrouille le véhicule.

Confirmez toujours que le badge de verrouillage devient vert avant de vous éloigner.

### 3. Bip

Émet un bip localisateur unique, avec une notification de succès ou d'erreur. Utilisez-le pour localiser un véhicule proche mais hors de vue — ou utilisez [Find Scooter](../operations/finder.md) pour une recherche guidée.

### 4. Changement de batterie

Démarre la séquence de changement chronométrée et affiche le compte à rebours sur le bouton. Voir [Changement de batterie](../operations/battery-swap.md) pour le déroulement complet.

### 5. Commandes

Ouvre une feuille de commandes supportées par le traceur de ce véhicule, regroupées par catégorie. Certaines commandes demandent une valeur que vous saisissez avant l'envoi.

## Onglet Tickets

Liste les tickets de support ouverts déposés par les riders contre ce véhicule. Chaque ligne affiche :

- Une icône éclair pour un problème électrique, ou une clé pour tout autre problème
- Un badge de statut violet
- La description, limitée à deux lignes
- Le type de plainte
- Le temps écoulé depuis la création

Les lignes de priorité critique et élevée portent aussi un badge de priorité rouge — traitez-les en premier.

Taper une ligne ouvre le ticket dans une fenêtre modale, la même que celle utilisée par le tiroir des tickets de la carte de la flotte.

**Résoudre tout** demande confirmation, puis ferme tous les tickets ouverts sur le véhicule. Les tickets fermés disparaissent immédiatement de la liste, et vous obtenez soit « X ticket(s) résolu(s) », soit, si certains n'ont pas pu être fermés, « Résolu X, échoué Y ». Le bouton est désactivé pendant la fermeture et quand il n'y a rien d'ouvert.

Quand l'onglet est vide, il affiche « Pas de tickets ouverts pour ce véhicule ».

## Onglet Pannes

Les pannes sont des événements d'erreur signalés par le traceur lui-même. Le bruit et les entrées sans erreur sont filtrés, et la panne la plus récente apparaît en premier.

- Les **pannes actives** — pas encore traitées et toujours dans la fenêtre d'alarme — ont une bordure et un fond rouges.
- Les **pannes traitées** deviennent grises et reçoivent un badge **Résolu**.

Chaque ligne affiche une icône pour le type de panne (un triangle d'avertissement générique quand le type n'a pas d'icône spécifique), le titre de la panne, et le temps écoulé depuis son occurrence.

**Tout effacer** demande une confirmation, puis marque chaque défaut actif traité un par un, avec une courte pause entre eux — effacer une longue liste n'est pas instantané, donc patientez un moment. La liste se met à jour au fur et à mesure, et une fois qu'il ne reste plus aucun défaut non traité, le véhicule disparaît de la liste d'alertes de l'application. Vous obtenez « X défaut(s) effacé(s) » ou « Effacé X, échoué Y ». Le bouton est désactivé lorsqu'il n'y a aucun défaut actif.

État vide : « Aucun défaut enregistré ».

## Onglet Alertes

Identique en structure et dans son comportement **Tout effacer** à Défauts, mais pour les avertissements au lieu des erreurs. État vide : « Aucune alerte enregistrée ».

La distinction pratique :

- **Défauts** — erreurs signalées par le traceur
- **Alertes** — avertissements signalés par le traceur
- **Tickets** — plaintes déposées par les utilisateurs

Les trois sont des files d'attente distinctes ; effacer l'une ne supprime pas les autres.

## Problèmes courants

| Symptôme                                         | Ce que cela signifie                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Un bouton d'action ne fait rien ou est désactivé | Une autre action est encore en cours — attendez sa notification                   |
| Un onglet est vide                               | Il n'y a vraiment rien d'ouvert pour ce véhicule ; une erreur s'affiche en cas d'échec au lieu d'un état vide |
| Aucun contrôle à distance                        | Le véhicule est une voiture, qui dispose uniquement de la page de statut          |
| **Réseau** affiche une heure au lieu d'une fraction | Le traceur est hors ligne et vous voyez le temps écoulé depuis son dernier signal |
| **Tout effacer** semble bloqué                    | Il traite les défauts un par un intentionnellement ; laissez-le finir             |
| Un défaut effacé réapparaît comme actif          | Le traceur l'a de nouveau signalé dans la fenêtre d'alarme — le problème sous-jacent est toujours présent |

## Conseils

- **Examinez la télémétrie de haut en bas** avant de toucher un contrôle : badge de verrouillage, réseau, batterie, tension du traceur, le GPS vous indique en cinq secondes si le véhicule est utilisable ou doit être récupéré.
- **Résoudre tout est par véhicule**, donc il est sûr à utiliser une fois que vous avez physiquement réparé ce que décrivent les tickets.
- **Effacez les défauts uniquement après la réparation**, pas avant — un défaut qui réapparaît est une preuve utile.
- **Une tension rouge du traceur avec une batterie en bon état** est la signature classique du « véhicule sur le point de disparaître de la carte ».
