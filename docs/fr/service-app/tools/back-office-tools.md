# Outils Back-Office dans l'Application de Service

Outre les écrans terrain, l'application de service comprend un ensemble d'outils back-office : lecture de trajet, analytique, et les trois files d'assistance. Cet article explique ce que fait chacun dans l'application et où cela diffère de la même fonctionnalité dans le tableau de bord opérateur.

**Tout ce qui est ici sauf le Lecteur de Rejouer est réservé aux propriétaires uniquement** et est simplement absent du [tiroir de navigation](../basics/overview.md#le-tiroir-de-navigation) pour les autres opérateurs — il n'y a pas d'élément grisé sur lequel cliquer.

## Lecteur de Rejouer

**Lecteur de Rejouer** (`/replay-player`) reconstitue le parcours d'un véhicule sur une journée.

1. **Choisissez un véhicule.** Jusqu'à 500 véhicules sont préchargés, triés par ordre alphabétique. Filtrez la liste en tapant une partie d'une étiquette ou un IMEI.
2. **Choisissez un jour** dans le calendrier. Les dates futures ne peuvent pas être sélectionnées.
3. L'application charge les coordonnées de ce véhicule pour toute la journée locale. Une journée sans données affiche « Pas de données pour ce jour ».

### La carte

- Les zones sont dessinées en dessous
- L'itinéraire complet apparaît comme une ligne fine et atténuée, colorée selon la vitesse
- La partie déjà jouée apparaît comme une trace épaisse
- Un triangle vert tournant marque le véhicule
- Des marqueurs verts et rouges indiquent le début et la fin de la journée

Une **caméra de poursuite** est activée par défaut : elle suit le véhicule et ajuste le zoom en fonction de la vitesse. Le déplacement, le zoom ou la rotation manuelle de la carte la désactive — rechargez la journée si vous voulez la réactiver.

### Contrôles

| Contrôle           | Détails                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Curseur**        | Coloré selon la vitesse, avec des badges d'événements pour stationné, démarré, avertissement de vitesse, et alerte de vitesse |
| **Zoom de la timeline** | De 1x à 32x, pour choisir un moment précis dans une journée chargée                      |
| **Vitesse de lecture** | 1, 2, 4, 8, 16, 32, 64, 128x                                                           |

Raccourcis clavier (pratiques sur la version web) :

- **Espace** ou **K** — lecture / pause
- **Flèches gauche / droite** — avance ou recule de 10 secondes ; maintenez **Shift** pour une minute, **Alt** pour une heure, **Ctrl** ou **Cmd** pour une journée
- **Home / End** — aller au début ou à la fin de la journée
- **Flèches haut / bas** — changer le préréglage de la vitesse de lecture

La bannière des données en direct affiche la **Vitesse** et la **Distance**. Les lectures d'allumage, batterie, connexion et GPS ne sont pas disponibles actuellement dans l'application — les champs sont affichés mais sans lecture, donc un champ vide n'indique pas une panne de données.

Pour un outil de lecture plus complet — plusieurs véhicules à la fois, rejouer par trajet, filtrage par étiquette — utilisez le [Lecteur de Rejouer](../../apps/tools/replay-player.md) du tableau de bord.

## Analytique

**Analytique** (`/analytics`, réservé aux propriétaires) est un tableau de bord KPI quotidien : revenu, trajets, distance, durée, recharges, et prix moyen par trajet, par kilomètre, et par minute, chacun avec une courbe d'évolution sur 30 jours, plus un histogramme horaire avec un sélecteur de métrique.

Deux approfondissements, tous deux avec des préréglages 7, 30 et 90 jours :

| Approfondissement         | Ce qu'il affiche                                                        |
| ------------------------- | ---------------------------------------------------------------------- |
| **`/analytics/payments`** | Flux de paiements, qualité, solde, méthodes de paiement, et principaux payeurs |
| **`/analytics/heatmaps`** | Densité des scans QR, débuts de trajets, ou fins de trajets (jusqu'à 5 000 points) |

Le tableau de bord propose les versions complètes de ces rapports — voir [Rapport Paiements](../../analytics/reports/payments.md) et [Cartes de chaleur](../../analytics/reports/heatmaps.md).

## Assistance — Tickets

**Assistance** (`/support/tickets`, réservé aux propriétaires) est la file des plaintes sur véhicules.

- **Statuts** : nouveau, triage, en cours, en attente d'info, résolu, ignoré, dupliqué
- **Priorité** : faible à critique
- **Badge de compte à rebours SLA** : devient orange sous deux heures et rouge une fois dépassé

Le bouton **véhicule** d'un ticket ouvre la page de ce véhicule, pour agir directement sur la plainte. Son bouton **tâche de maintenance** ouvre l'écran Maintenance de l'application, qui est ici un écran « Bientôt disponible » (voir ci-dessous).

Les tickets pour un véhicule unique sont aussi listés dans l'onglet **Tickets** de la [page véhicule](../fleet/vehicle-controls.md#onglet-tickets), où **Tout résoudre** ferme tous les tickets d'un coup. Pour la file complète avec filtres, affectation et historique, utilisez les [Tickets](../../support/tickets-proofs-chat/tickets.md) du tableau de bord.

## Conversations

**Conversations** (`/support/dialogs`, réservé aux propriétaires) est un messager en direct avec les riders : **Prendre** et **Reprendre** pour réclamer une discussion, un composeur de message, un indicateur de saisie, et jusqu'à 5 images jointes par message. Si la connexion en direct tombe, l'application revient à un rafraîchissement toutes les 15 secondes.

**L'envoi de réponse depuis cet écran n'est pas disponible actuellement dans l'application.** Lisez les discussions ici si cela vous aide sur le terrain, mais répondez aux riders depuis la page [Conversations](../../support/tickets-proofs-chat/conversations.md) du tableau de bord.

## Preuves de stationnement

**Preuves de stationnement** (`/support/park-proofs`, réservé aux propriétaires) est une galerie d'examen des photos prises par les riders : départ, stationnement, fin, et selfies. Chaque photo porte une puce de prédiction automatique — **stationnement**, **pas de stationnement**, **pas de trajet**, ou **peu clair** — avec une valeur de confiance. Pincez pour basculer entre des mises en page à 1, 2, et 3 colonnes.

Actions d'examen :

| Action                   | Ce que cela fait                                    |
| ------------------------ | --------------------------------------------------- |
| **Approuver**            | Marque la photo comme bonne                         |
| **Avertir**              | Avertit le conducteur ; nécessite un commentaire    |
| **Rejeter** / **Amende** | Nécessite un commentaire et un montant               |
| **Bloquer**              | Bloque le conducteur ; nécessite un commentaire      |
| **Approuver avec commentaire** | Approuve et peut joindre un code promo optionnel  |

L'approbation avec bonus n'est pas disponible actuellement dans l'application.

La file d'attente [Preuves de stationnement](../../support/tickets-proofs-chat/park-proofs.md) du Tableau de bord comprend le flux complet de modération, les filtres et les règles d'examen automatique.

## Maintenance et rééquilibrage

`/maintenance` et `/rebalancing` dans l'application de service sont des écrans « Bientôt disponible » : pas de données, rien à configurer. **Rééquilibrage** apparaît aussi dans le tiroir de navigation avec un badge **Bientôt**.

Cela importe lorsque vous répondez à un opérateur terrain : le Tableau de bord possède ses propres fonctionnalités réelles de maintenance et de rééquilibrage, qui sont complètement différentes de ces écrans. Ne décrivez jamais la fonctionnalité de maintenance du Tableau de bord comme si un technicien pouvait l'utiliser dans l'application de service.

## Problèmes courants

| Symptôme                                                       | Ce que cela signifie                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| La bannière Rejouer affiche des blancs pour l'allumage ou la batterie | Ces mesures ne sont pas disponibles actuellement dans l'application — ce n'est pas une panne |
| Rejouer ne trouve pas de données pour un jour                 | Le véhicule n'a peut-être pas bougé ou rapporté ce jour — essayez une autre date |
| Analytique, Assistance, Conversations ou Preuves de stationnement manquent | Ils sont disponibles uniquement pour les propriétaires          |
| Le bouton maintenance d'un ticket mène à « Bientôt disponible » | Attendu dans cette application — utilisez le Tableau de bord pour les travaux de maintenance |
| Une réponse de chat semble envoyée mais rien ne se passe       | Répondre depuis l'application n'est pas disponible actuellement — répondez depuis le Tableau de bord |
| L'approbation avec bonus est indisponible dans les Preuves de stationnement | Cette action n'est pas disponible actuellement                   |

## Conseils

- **La caméra de poursuite est le moyen le plus rapide de revoir une journée** — lancez la lecture à 8x et ne ralentissez qu'autour des badges d'événement sur la barre de défilement.
- **Utilisez la file d'attente des tickets de l'application pour planifier un itinéraire**, puis agissez depuis la page de chaque véhicule ; la force de l'application est la proximité, pas la paperasse.
- **Effectuez la modération et la messagerie depuis le Tableau de bord.** Les copies de ces files dans l'application servent à consulter les informations lorsque vous êtes sur le terrain.
