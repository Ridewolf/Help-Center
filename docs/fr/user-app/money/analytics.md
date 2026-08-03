# Rider App — Statistiques du Rider

**Les statistiques destinées aux riders ne sont pas actuellement disponibles dans l'application.** Il n'y a pas d'écran de graphiques, pas de totaux, ni de résumé des dépenses qu'un rider pourrait consulter.

Dirigez les riders vers [History](history.md) à la place — c'est le seul endroit où leurs propres données sont disponibles.

## Ce que voit un rider

- **Il n'y a pas de point d'entrée.** Le tiroir latéral liste Portefeuille, History, Assistance, Confidentialité, Paramètres et Profil — et rien d'autre. Un rider qui dit ne pas trouver d'écran analytique a raison ; ne lui dites pas de chercher dans le menu, et ne lui envoyez pas de lien vers un tel écran.
- Si l'écran `/analytics` est ouvert directement, il affiche seulement un titre et un espace vide. **Rien ne dysfonctionne** dans le compte du rider, son appareil ou l'installation de l'application — une réinstallation ne change rien.

## Où se trouvent réellement les chiffres du rider

[History](history.md) contient de vraies données par rider :

- L'onglet **Rides** liste chaque trajet passé avec sa distance, sa durée et son coût
- L'onglet **Payments** liste les recharges, remboursements, débits et bonus avec montants et statuts
- En tapant sur un trajet, on ouvre ses détails avec la [répartition complète des coûts](../riding/rides.md#détail-des-coûts), la chronologie des activités, et l'itinéraire tracé sur une carte

Il n'y a **aucune bannière de totaux agrégés nulle part** dans l'application rider — ni sur un écran de statistiques, ni en haut de History. Les totaux cumulés doivent être calculés à partir de la liste des trajets, ou extraits de vos propres rapports.

## Répondre aux questions sur les chiffres depuis le tableau de bord

Quand un rider a vraiment besoin de totaux, produisez-les côté opérateur :

| Le rider veut                   | Où vous l'obtenez                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Dépenses totales sur une période | [Analytique — Paiements](../../analytics/reports/payments.md)                     |
| Sa propre liste de trajets, exportée | [Trajets — Liste](../../operations/trips/rides.md), filtrée sur ce client         |
| Ses relevés de paiements         | [Paiements — Historique](../../operations/payments/payments.md)                    |
| Un résumé rapide par client      | [Détail client](../../operations/customers/client-detail.md) — nombre total de trajets, solde, note |

## FAQ

| Le rider demande…               | Réponse                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------- |
| « Où sont mes stats ? »          | Pas disponible actuellement dans l'application. Utilisez [History](history.md)   |
| « Je ne trouve pas Analytique dans le menu » | Il n’y a pas d’entrée de menu pour cela                                    |
| « La page Analytique est vide » | C’est normal — l’écran n’est pas disponible actuellement. Rien n’est cassé        |
| « Puis-je exporter mes données de trajet ? » | Pas depuis l’application. Exportez-les depuis le tableau de bord pour le rider  |
| « Combien ai-je dépensé au total ? » | Aucun total n’existe dans l’application rider. Consultez History ou extrayez-le du tableau de bord |

## Conseils

- **Ne pas envoyer de liens analytiques aux riders.** Il n’y a aucun écran valable où atterrir, et une page blanche est perçue comme une application cassée.
- **Répondez vous-même aux questions sur les totaux.** Extraire la donnée du tableau de bord prend une minute et met fin à la conversation.
- **History est la réponse honnête**, et elle est vraiment complète par trajet et par paiement — présentez-la ainsi plutôt que de vous excuser de l’absence d’écran.
