# Détail du trajet

La page de détail du trajet (`/rides/:id`) est l'espace de travail pour un seul déplacement. Utilisez-la pour enquêter sur les plaintes, auditer les frais, effectuer des actions d'opérateur (pause, remboursement, archivage) et consulter le journal complet des événements.

Vous arrivez généralement ici en cliquant sur une ligne dans la [liste des trajets](rides.md) ou depuis le profil d'un client.

Permission requise : **Trajets** (`i1j2k3`).

## Mise en page

De haut en bas :

1. **En-tête** — faits clés + bouton _Actions_
2. **Cartes de synthèse** — durée, distance, coût, statut
3. **Cartes d'information** — infos du trajet, ventilation, aperçu du tarif
4. **Onglets** — Détails (carte de l'itinéraire + chronologie) et Activité (journal complet des événements)

## En-tête

La bande supérieure identifie le trajet en un coup d'œil :

- **Bouton Retour** (`←`) revient à la liste
- **ID du trajet** avec une icône _Copier_
- **Pastille de statut** (Actif, Terminé, Annulé, etc.)
- Liens vers le **client** et le **véhicule**
- **Horodatages de début → fin** et **coût principal**
- Bouton **Actions** à droite — ouvre la boîte de dialogue des actions (décrite ci-dessous)

## Actions

Cliquez sur **Actions** dans l'en-tête pour ouvrir une boîte de dialogue avec toutes les actions opérateur disponibles pour ce trajet. Les actions se désactivent selon le statut du trajet et vos permissions, avec une info-bulle expliquant pourquoi :

| Action                | Quand activée                          | Permission      |
| --------------------- | ------------------------------------ | --------------- |
| **Pause / Reprise**   | Le trajet doit être actif pour pause ou reprise | `pause-unpause` |
| **Terminer le trajet**| Le trajet doit être actif pour terminer | `end-ride`      |
| **Voir l'itinéraire sur la carte** | Toujours (bascule vers l'onglet carte) | —               |
| **Rembourser le trajet** | Le trajet doit être terminé pour rembourser | refund-related  |
| **Envoyer une notification** | Toujours (envoie une notification push au rider) | notification    |
| **Archiver le trajet** | Toujours                             | archive         |

Survolez une action désactivée pour voir pourquoi elle n'est pas disponible (ex. « Le trajet doit être terminé pour rembourser »).

La boîte de dialogue _Actions_ de l'en-tête est le **superset** de ce qui est disponible ; le menu de la ligne dans la liste ne propose que les trois plus courantes (Pause / Reprise / Fin). Pour les remboursements, la vue itinéraire, les notifications push et l'archivage — venez ici.

## Cartes de synthèse

Une rangée de quatre petites cartes sous l'en-tête donne des faits en un coup d'œil :

- **Durée** — durée totale du trajet
- **Distance** — distance totale parcourue
- **Coût** — coût total facturé
- **Statut** — statut actuel du trajet (reflète la pastille de l'en-tête, plus grande et plus visible)

## Cartes d'information

Une grille de trois cartes se trouve sous la synthèse, affichant les données principales du trajet :

- **Infos du trajet** — véhicule, client, tarif, IDs, horodatages
- **Ventilation** — composition du coût minute par minute (frais de départ, temps, distance, modificateurs, remises)
- **Détails du tarif** — aperçu du tarif utilisé pour ce trajet (pour voir ce qui a réellement été facturé au client, même si le tarif a changé ensuite)

## Onglets

Sous les cartes, le détail bascule entre deux onglets :

| Onglet       | Contenu                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Détails**  | Carte de l'itinéraire, chronologie des événements importants, cartes d'information complètes                                                             |
| **Activité** | Journal chronologique des événements — chaque changement d'état, signal et action système lié à ce trajet — plus large que la chronologie des Détails (utile pour le débogage IoT) |

### Carte de l'itinéraire

Dans l'onglet Détails, la carte de l'itinéraire montre la trace GPS du trajet :

- **Marqueurs de début / fin** avec leurs adresses
- **Polyligne** colorée selon la vitesse (segments lents vs rapides)
- **Superpositions de zones** si le trajet est entré dans des zones restreintes
- **Légende** expliquant l'échelle des couleurs
- **Zoom / panoramique** avec la souris ou gestes à deux doigts

### Chronologie

Sous la carte, une chronologie verticale liste chaque événement important du trajet :

- **Début du trajet** (avec déverrouillage du véhicule)
- **Pauses / reprises** (le cas échéant)
- **Entrées / sorties de zones**
- **Alertes de vitesse**
- **Fin du trajet** (avec verrouillage / preuve de stationnement, le cas échéant)
- **Événements de paiement**

Utilisez la chronologie pour enquêter sur des litiges (« le rider dit avoir été facturé après la fin du trajet ») — chaque événement est horodaté.

### Onglet Activité

L'onglet Activité affiche le journal complet des événements incluant les actions au niveau système — plus large que la chronologie des Détails. Utilisez-le lorsque la chronologie simple ne donne pas assez de détails (ex. pour le débogage technique d'un problème IoT).

## Flux de travail typiques

- **Enquêter sur une plainte client** — lisez la ventilation, puis la carte de l'itinéraire et la chronologie ; la chronologie ment rarement
- **Auditer une décision de remboursement** — ouvrez la carte de ventilation ; les lignes détaillent exactement ce que le client a payé, puis cliquez sur _Actions → Rembourser le trajet_
- **Mettre en pause et appeler le client** — _Actions → Pause_ fige le trajet ; _Actions → Envoyer une notification_ incite le client ; _Reprendre_ quand il est de retour
- **Terminer un trajet bloqué** — pour les trajets qui ne se terminent jamais (perte de connectivité, client ayant laissé le véhicule allumé), utilisez _Actions → Terminer le trajet_ pour forcer la clôture — le système utilisera la dernière position connue pour la preuve de stationnement

## Conseils

- **Lisez l'infobulle disabled-action** — les boutons désactivés ne sont pas cassés ; l'infobulle indique dans quel état le trajet doit être
- **Copiez l'ID du trajet** depuis l'en-tête pour le coller dans une conversation d'assistance ou une requête backend
- **Les détails du tarif montrent le tarif _tel qu'il était_** — même si le tarif a été modifié par la suite, la capture est conservée à des fins d'audit
- **La boîte de dialogue Actions est le menu complet** — ne cherchez pas remboursement/archivage dans la liste ; ils se trouvent ici
