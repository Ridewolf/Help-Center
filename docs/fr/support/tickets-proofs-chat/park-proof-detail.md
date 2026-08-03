# Détail de la preuve de stationnement

La page de détail de la preuve de stationnement (`/support/park-proofs/:id`) est l'endroit où vous inspectez en profondeur une preuve de stationnement et — si elle est encore en attente — la modérez. Elle s'ouvre sous forme d'un grand dialogue au-dessus de la [liste des Preuves de stationnement](park-proofs.md) ; l'URL change pour que la preuve soit partageable / accessible par lien profond.

Vous arrivez généralement ici en cliquant sur _Voir_ dans une ligne, en cliquant sur une vignette en vue galerie, ou en collant une URL directe.

Permission requise : **Preuves de stationnement** (`d5e6f7`). La sous-permission `review` active les actions de modération, `delete` active le bouton Supprimer.

## Comment cela se rapporte à la page de revue

Les deux pages `/support/park-proofs/:id` (cette page) et `/support/park-proofs/:id/review` existent — elles se ressemblent mais ont des fonctions différentes :

| Surface                                                                            | Ce que c'est                                                                                                                                |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Détail de la preuve de stationnement (cette page)**                             | Un **dialogue** ouvert depuis la liste — image complète avec zoom, contexte complet, ensemble complet d'actions. Vue d'un seul enregistrement. URL `/support/park-proofs/:id` |
| [Revue de preuve de stationnement](park-proof-review.md)                          | Une **page plein écran** (`/:id/review`) — la surface dédiée à la revue d'une preuve                                                        |
| [Revue automatique de preuve de stationnement](park-proof-auto-review.md)         | **Mode simplifié** — file d'attente automatique des preuves en attente, une à la fois                                                        |

Au quotidien : utilisez **Revue automatique** pour vider la file d'attente, le **dialogue de détail** (cette page) pour une inspection ponctuelle depuis la liste, et la **page de revue** pour le flux dédié au réviseur.

## Mise en page

Le dialogue est divisé en deux colonnes sur les écrans larges, empilé sur les écrans étroits :

| Colonne          | Largeur | Contenu                                                                                               |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| **Image (gauche)** | 3/5     | La photo en pleine résolution avec zoom, sur fond noir                                               |
| **Infos (droite)** | 2/5     | En-tête (titre + badges statut / type), contexte (client / trajet / véhicule), grille de détails, actions de revue |

## Image (colonne gauche)

Un grand visualiseur d'image avec la photo en pleine résolution sur fond noir :

- **Cliquez sur l'image** pour basculer le zoom (1× → 2× → 3× → 4× → retour à 1×)
- **Molette de défilement** pour zoomer ou dézoomer par pas de 0,5×
- Le curseur change entre zoom avant / zoom arrière selon l'état
- Un **badge de pourcentage de zoom** apparaît en haut à gauche dès que vous dépassez 1×

Quatre boutons apparaissent en bas à droite au survol (semi-transparents sur fond noir) :

| Bouton              | Fonction                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Zoom avant**      | Zoom +0,5× (limité à 4× maximum)                                                         |
| **Zoom arrière**    | Zoom -0,5× (minimum 1×)                                                                   |
| **Minimiser**       | Réinitialise le zoom à 1×                                                                 |
| **Ouvrir dans un nouvel onglet** | Ouvre l'image en résolution originale dans un nouvel onglet du navigateur pour une inspection plus précise |

Cherchez les mêmes indices que dans la [page de revue](park-proof-review.md) : véhicule entier dans le cadre, place de stationnement légale, béquille déployée, tout ce qui contredit la réclamation d'un utilisateur.

## En-tête (haut de la colonne droite)

La bande d'en-tête identifie la preuve :

- **Titre** _"Revoir la preuve de stationnement"_ avec une courte description en dessous
- Deux **badges** empilés à droite :
  - **Badge de statut** — coloré selon le statut (jaune En attente, vert Approuvé, orange Avertissement, rouge Rejeté, sombre Bloqué)
  - **Badge de type** — pilule en contour affichant _Début_ / _Stationnement_ / _Fin_

## Section contexte

Trois lignes renvoyant vers des entités liées. Chacune est un router-link (cliquez pour ouvrir la page de détail liée dans la même fenêtre) :

| Ligne         | Affiche                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Client**    | Nom du client (lié au [détail client](../../operations/customers/client-detail.md)), e-mail + téléphone (clic pour copier) |
| **Trajet**    | Nom / ID du trajet lié au [détail du trajet](../../operations/trips/ride-detail.md)                                      |
| **Véhicule**  | Étiquette du véhicule liée au [détail du véhicule](../../operations/fleet/vehicle-detail.md), type de véhicule en dessous |

Utilisez ces références croisées pour construire rapidement le contexte — ce client a-t-il déjà enfreint les règles, a-t-il vraiment terminé le trajet ici, ce véhicule a-t-il souvent été signalé.

## Section détails

Une grille clé/valeur à deux colonnes sous le contexte. Les champs affichés dépendent de l'état de la preuve :

| Champ               | Quand affiché              | Ce qu'il affiche                                                                                                                                                                                                                               |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Créé**            | Toujours                   | Quand l'application du rider a téléchargé la photo                                                                                                                                                                                            |
| **Examiné le**      | Seulement après examen     | Quand un opérateur (ou l'Auto Review) a pris la décision                                                                                                                                                                                       |
| **Durée d'examen**  | Seulement après examen     | Délai entre Créé → Examiné (ex. « 2h 14m ») — utile pour mesurer le SLA par rapport à la preuve                                                                                                                                               |
| **Examiné par**     | Seulement après examen opérateur | L'opérateur qui a examiné. Lié à son [profil opérateur](../../settings/access/operators.md). Si l'opérateur ne peut être résolu (404, pas d'autorisation), l'id s'affiche comme un lien cliquable — la page de profil gère sa propre authentification |
| **Emplacement**     | Quand le trajet a des coordonnées | Latitude / longitude du début du trajet (pour les preuves de _Départ_) ou de la fin (pour les preuves de _Stationnement_/_Fin_), à 6 décimales                                                                                               |

Si la preuve a été rejetée avec une amende, une alerte rouge _Amende_ s'affiche sous les détails avec le montant de l'amende dans la devise de l'entreprise.

Si un commentaire ou une raison de rejet précédente existe, elle apparaît en section _Commentaire_ en dessous.

## Actions d'examen (uniquement en attente)

Si le statut de la preuve est **En attente**, un sélecteur d'action apparaît en bas de la colonne de droite. La boîte de dialogue détail prend en charge **cinq** actions de modération (une de plus que la page d'examen dédiée) :

| Action                   | Effet sur le statut | Champs supplémentaires | Quand l'utiliser                                                                    |
| ------------------------ | ------------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| **Approuver**            | _Approuvé_          | —                      | Photo clairement bonne — pas besoin de commentaire                                 |
| **Approuver avec commentaire** | _Approuvé_    | Commentaire requis     | Photo bonne mais vous souhaitez noter un commentaire (cas particulier, référence future, entraînement ML) |
| **Avertir**              | _Avertissement_     | Commentaire recommandé | Photo pas idéale — le rider reçoit une notification douce, pas d'amende             |
| **Rejeter**              | _Rejeté_            | Commentaire + montant amende | Mauvaise photo — amende appliquée. Amende débitée du portefeuille à la soumission  |
| **Bloquer**              | _Bloqué_            | Commentaire requis     | Infraction grave / répétée — bloque le rider pour les trajets futurs               |

Chaque action s'affiche comme une carte radio cliquable avec une description ; en sélectionner une révèle les champs conditionnels (zone de texte commentaire et/ou saisie du montant de l'amende). Le bouton principal de soumission prend la couleur de l'action (vert / jaune / rouge / foncé).

Une fois soumis, la boîte de dialogue se ferme, un toast confirme l'action, et la liste se rafraîchit.

### Qu'est-ce qui diffère de la page d'examen

La [page d'examen dédiée](park-proof-review.md) (`/:id/review`) affiche **quatre** actions sous forme de boutons empilés. Cette boîte de dialogue affiche **cinq** actions sous forme de cartes radio — la cinquième étant _Approuver avec commentaire_, utile pour consigner un contexte sur une décision positive sans la faire évoluer en avertissement.

## Preuves clôturées (déjà examinées)

Si la preuve est déjà examinée (Approuvé / Avertissement / Rejeté / Bloqué), la section d'action est masquée — la boîte de dialogue devient en lecture seule. Vous voyez toujours tout le contexte (image, client / trajet / véhicule, détails, amende, commentaire, qui a examiné et quand), et vous pouvez toujours :

- **Supprimer** l'enregistrement (avec permission `delete`) — uniquement pour les téléchargements spam / test / mauvais trajet
- **Fermer** la boîte de dialogue

Pour modifier une décision après coup, contactez votre administrateur — le flux standard ne permet pas de réexaminer via l'interface.

## Pied de page

| Bouton            | Quand visible                                  | Ce qu'il fait                                                                                                                     |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Supprimer**     | Toujours, si vous avez la sous-permission `delete` | Supprime entièrement l'enregistrement de la preuve (avec confirmation). À utiliser uniquement pour les tests / spams / téléchargements erronés — pas comme choix de modération |
| **Annuler**       | Seulement en attente                           | Ferme la boîte de dialogue sans soumettre                                                                                         |
| **Soumettre l'action** | Seulement en attente, après avoir choisi une action | Soumet l'action sélectionnée (couleur assortie à l'action)                                                                        |
| **Fermer**        | Preuves examinées                              | Ferme la boîte de dialogue                                                                                                       |

La fermeture de la boîte de dialogue (Annuler / Fermer / Échap / clic sur le fond) supprime `/:id` de l'URL pour que l'historique retour / avance corresponde à ce que vous voyez.

## Flux de travail typiques

- **Enquêter sur une preuve depuis la liste** — trouvez la preuve dans la liste (filtrer / rechercher), cliquez sur la ligne → la boîte de dialogue de détail s'ouvre → faites défiler le contexte → décidez
- **Analyse approfondie d'une preuve sanctionnée** — recherchez par client → ouvrez une de leurs preuves rejetées → vérifiez "Examiné par" + commentaire pour voir qui a décidé et pourquoi → utilisez cela pour la résolution des litiges
- **Approbation rapide via un lien direct** — recevez une URL d'un collègue → cliquez → la boîte de dialogue s'ouvre → zoomez sur la photo → Approuver / Approuver avec commentaire
- **Vérification croisée de l'historique du véhicule** — ouvrez une preuve → cliquez sur le véhicule → voyez si le même véhicule reçoit régulièrement de mauvaises photos de stationnement → cela indique un problème de placement / signalisation, pas le conducteur
- **Audit des décisions d'un examinateur** — filtrez la liste par Statut `Approuvé` → cliquez sur les preuves pour voir "Examiné par" + commentaire → calibrez les standards de l'équipe

## Conseils

- **Le zoom à la molette est rapide** — vous n'avez pas besoin du bouton — il suffit de faire rouler la molette sur l'image
- **L'image s'ouvre dans un nouvel onglet en pleine résolution** — quand le zoom dans la boîte de dialogue ne suffit pas (ex. lire un panneau de la taille d'une plaque d'immatriculation), ouvrez-la en externe
- **"Approuver avec commentaire" est préférable à une approbation silencieuse** pour les cas limites — laissez une note d'une ligne que le prochain examinateur (ou vous dans trois mois) vous remerciera
- **Le blocage est définitif** — les conducteurs peuvent être débloqués via le [détail client](../../operations/customers/client-detail.md) mais pour une preuve donnée, _Bloquer_ est la plus haute escalade. Ne l'utilisez pas dès la première infraction
- **Supprimer vs Rejeter** — Rejeter laisse un enregistrement de modération (et sanctionne le conducteur) ; Supprimer efface entièrement la preuve. Si vous voulez une trace, ne supprimez jamais
- **L'URL est partageable** — `/support/park-proofs/:id` mène directement ici, sans navigation dans la liste
- **Les preuves fermées sont en lecture seule** — si vous avez ouvert une preuve examinée en vous attendant à agir, c'est pourquoi les boutons ont disparu
