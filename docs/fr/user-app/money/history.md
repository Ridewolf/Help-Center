# Rider App — Historique (Trajets & Paiements)

L'Historique (`/history`) est le seul endroit dans l'application rider où figurent les données propres au rider. Il comporte deux onglets sur un seul écran — **Trajets** et **Paiements** — et c'est là que vous envoyez un rider pour toute information sur un trajet ou un paiement passé.

Chaque onglet a sa propre pagination et son propre défilement infini, chargeant la page suivante à mesure que le rider approche du bas. Changer d'onglet réinitialise la position de défilement et la pagination, et les données se rechargent à chaque réouverture de l'écran.

Pour les équivalents côté opérateur, voir [Rides — List](../../operations/trips/rides.md) et [Payments — History](../../operations/payments/payments.md).

## Onglet Trajets

Chaque carte de trajet affiche : type de véhicule, numéro de véhicule, lieu de départ et d'arrivée, heure de début et de fin, distance en kilomètres, durée en minutes, coût et statut. Les cartes se chargent par paquets de 20. En toucher une ouvre le [détail du trajet](#détail-du-trajet).

| Statut       | Couleur | Signification                                |
| ------------- | ------- | -------------------------------------------- |
| **Terminé**   | Vert    | Le trajet s'est terminé normalement          |
| **Annulé**   | Rouge   | Le trajet a été annulé                        |
| **Expiré**   | Jaune   | Le trajet ou la réservation a expiré sans être complété |

## Onglet Paiements

Chaque enregistrement de paiement affiche : type, montant, devise, statut, fournisseur, date, le solde avant et après, et — en cas d'échec — un code d'erreur.

**Types :** recharge, remboursement, débit et bonus.

**Code couleur du montant :**

| Couleur | S'applique à               |
| -------- | -------------------------- |
| Vert     | Recharges, remboursements, bonus |
| Orange   | Amendes                    |
| Rouge    | Débits et frais            |

**Badges de statut :** _en attente_ en ambre, _échoué_ en rouge, _remboursé_ en atténué. Un **paiement terminé n'affiche aucun badge** — l'absence de badge est le cas normal et sain, pas une donnée manquante. Les riders interprètent parfois cela comme "rien ne s'est passé" ; c'est en fait le contraire.

Le **code d'erreur** d'un paiement échoué est ce qu'il faut lire quand un rider demande pourquoi un paiement n'a pas abouti.

## Détail du trajet

Toucher une carte de trajet ouvre `/history/:id`. Il affiche :

- **Informations sur le trajet** — statut, prix, distance (en km), durée (en minutes), étiquette et type de véhicule, tarif, adresse de départ et d'arrivée, horodatages et la note laissée par le rider
- **Détail du coût** — les cinq lignes qui composent le prix total : frais de déverrouillage, réservation, temps actif, distance et temps de pause. Voir [Détail du coût](../riding/rides.md#détail-des-coûts) pour ce que chaque ligne correspond dans le tarif
- **Chronologie de l'activité** — d'abord la période de réservation (s'il y en a eu une), puis les blocs de trajet et de pause dans l'ordre chronologique. C'est la manière la plus claire de montrer au rider où son argent a réellement été dépensé sur un trajet qui a semblé cher
- **Carte du trajet** — pour les trajets terminés : le parcours tracé en ligne, avec un marqueur de départ et un marqueur d'arrivée, zoomé pour englober tout le trajet

Si le tarif du trajet ne peut pas être chargé, l'écran affiche **seulement le total, sans détail ni message d'erreur**. Le total reste correct — c'est pourquoi un détail peut parfois manquer.

## Non disponible actuellement dans l'application

Les riders demandent régulièrement ces fonctionnalités. Aucune d'elles n'existe dans l'Historique, il faut donc le dire clairement plutôt que d'envoyer le rider à la recherche :

- Regrouper la liste par Aujourd'hui / Hier / Cette semaine
- Un panneau de filtre par date, type de véhicule ou statut
- Une action **Télécharger le reçu** (PDF ou e-mail)
- Re-noter un trajet passé (la note est donnée à la fin du trajet)
- Un formulaire **Signaler un problème** sur un trajet — utilisez plutôt [Assistance](../help/support.md)
- Exporter l'historique des trajets ou paiements en CSV ou PDF
- Une bannière de totaux ou un chiffre de dépenses à vie en haut de la liste

Les statistiques côté rider ne sont [pas disponibles actuellement](analytics.md). Si un rider a besoin de totaux ou d'un document de type reçu, produisez-le depuis le tableau de bord : [Rides — List](../../operations/trips/rides.md) et [Payments — History](../../operations/payments/payments.md) exportent tous deux.

## FAQ

| Le rider demande…                      | Réponse                                                                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| « Que signifie ce détail ? »          | Lisez les cinq lignes dans l'ordre. Une longue ligne de pause ou de réservation explique la plupart des totaux surprenants       |
| « Pourquoi n'y a-t-il pas de détail ? » | Le tarif du trajet n'a pas pu être chargé, seul le total est affiché. Le total est correct                                      |
| « Pourquoi mon paiement est-il en attente ? » | Le fournisseur ne l'a pas confirmé. Pour une redirection ou une recharge par QR, le rider n'a probablement jamais terminé le paiement — voir [Payment Methods](payment-methods.md#recharges-en-attente) |
| « Où sont mes totaux ? »               | Il n'y a pas de total dans l'application rider ; additionnez-les depuis la liste ou récupérez-les depuis le tableau de bord      |
| « Puis-je obtenir un reçu ? »         | Pas depuis l'application. Exportez l'enregistrement de paiement depuis le tableau de bord si le rider a besoin d'un document     |
| « Pourquoi mon paiement n'a-t-il pas de badge ? » | Parce qu'il est terminé. Seuls les paiements en attente, échoués et remboursés portent un badge                                  |

## Conseils

- **Le détail du trajet règle les litiges de facturation, pas la liste.** Ouvrez le trajet, lisez la ventilation par rapport au tarif, puis expliquez la ligne unique qui domine.
- **La chronologie d'activité est votre meilleur support visuel.** Un utilisateur qui voit un bloc de pause de 40 minutes cesse de contester le total.
- **« Pas de badge » signifie terminé.** Apprenez cela à votre équipe pour qu'elle arrête de poursuivre des paiements sains.
- **Les codes d'échec sont enregistrés.** Lisez le code avant de spéculer sur une banque.
