# Rider App — Portefeuille et Recharges

Le Portefeuille (`/wallet`) est l'écran d'argent du passager, accessible depuis la ligne du solde du portefeuille dans le tiroir latéral. Il affiche le solde actuel, les bonus, le point d'entrée pour la recharge, l'interrupteur de recharge automatique, et l'accès aux cartes enregistrées.

Tout ce qui concerne les cartes elles-mêmes — en ajouter une, en retirer une, choisir une carte par défaut, et les trois façons dont une recharge peut se terminer — se trouve dans [Moyens de paiement](payment-methods.md). Les recharges passées, remboursements, débits et bonus se trouvent dans [Historique](history.md).

## Ce qui se trouve à l'écran

| Élément                       | Ce que c'est                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Solde réel**                | Le solde dépensable du passager. L'icône de rafraîchissement à côté relit le solde depuis le serveur               |
| **Bonus**                    | Un solde bonus séparé, affiché uniquement lorsque les bonus sont activés                                            |
| **Montants de recharge** prédéfinis | Quatre boutons : **50**, **100**, **200**, **400**. Il n'y a pas de champ de montant personnalisé sur cet écran    |
| **Recharge automatique**      | Un seul interrupteur, avec une description de son propre seuil et montant                                          |
| **Gérer les moyens de paiement** | Ouvre [Moyens de paiement](payment-methods.md) (`/wallet/payment-methods`)                                         |

Si un passager insiste pour dire que son solde est erroné ou obsolète, **faites-lui d'abord appuyer sur l'icône de rafraîchissement** — cela efface la valeur mise en cache et lit la valeur en direct. Cela résout la plupart des rapports « ma recharge n'apparaît pas ».

## Comment un passager effectue une recharge

1. Ouvrir le Portefeuille.
2. Choisir un des montants prédéfinis — 50, 100, 200 ou 400.
3. Confirmer la recharge.

Ce qui se passe ensuite dépend entièrement du fournisseur de paiement utilisé, et il y a exactement **trois** possibilités :

| Flux du fournisseur              | Ce que le passager expérimente                                                            | Quitte l'application ? |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- |
| **Confirmation dans l'app** (Stripe) | Le paiement est confirmé dans l'app avec une carte enregistrée                             | Non                    |
| **Redirection** (MAIB et similaires)  | Un navigateur externe s'ouvre, le passager paie sur la page de la banque, l'app attend la confirmation | Oui                    |
| **Paiement par QR** (MIA et similaires) | Un paiement par QR / application bancaire avec un compte à rebours, l'app attend la confirmation | Oui                    |

**Seul le flux de confirmation dans l'app se termine sans quitter l'application.** Pour les flux de redirection et QR, ne dites jamais à un passager que l'argent arrive instantanément — il doit d'abord terminer le paiement en externe. Les instructions étape par étape pour les trois flux sont dans [Moyens de paiement](payment-methods.md#recharger--les-trois-flux).

## Ce qui se passe juste après une recharge

Le solde se met à jour immédiatement dans l'app, puis l'app le confirme auprès du serveur, en réessayant plusieurs fois avec des délais croissants (environ une demi-seconde, puis 1, 2, 4 et 8 secondes). Si aucune confirmation n'arrive jamais, le solde affiché est **rétabli** à sa valeur initiale.

Donc un solde qui est apparu brièvement puis a disparu signifie une chose : **le paiement n'a jamais été confirmé.** Vérifiez la liste des recharges en attente sur l'écran [Moyens de paiement](payment-methods.md#recharges-en-attente).

## Recharge automatique

- Un interrupteur, avec une boîte de confirmation lorsque le passager l'active.
- Elle est **désactivée** lorsque le fournisseur actuel ne peut pas confirmer les paiements dans l'app. C'est pourquoi un passager avec un fournisseur uniquement redirection ou uniquement QR ne peut pas l'activer.
- Le seuil et le montant sont décrits directement à l'écran. Lisez-les à l'écran — ne citez pas des chiffres de mémoire, et ne mentionnez pas de limites que l'écran ne mentionne pas.

## Où se trouve l'historique des paiements

Pas ici. Les recharges, remboursements, débits et bonus sont tous listés dans l'onglet **Paiements** de [Historique](history.md#onglet-paiements), avec un codage couleur du montant et du statut. Votre propre grand livre côté opérateur est [Paiements — Historique](../../operations/payments/payments.md).

## Dépannage

| Le passager dit…                        | Que vérifier                                                                                                                              |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| « Mon solde est incorrect / périmé »    | Appuyez sur l'icône de rafraîchissement à côté de **Solde réel**                                                                           |
| « Paiement refusé »                      | Refus côté carte ou banque. Le code d'échec se trouve dans l'enregistrement de paiement dans [Historique → Paiements](history.md#onglet-paiements) |
| « Fonds insuffisants »                   | Le solde est inférieur au montant nécessaire pour l'action. Rechargez d'abord — et notez que démarrer un trajet a son propre [solde minimum de départ](../riding/rides.md#pourquoi-un-conducteur-ne-peut-pas-démarrer-un-trajet) pour les passagers sans carte |
| « Je ne peux pas activer la recharge automatique » | Le fournisseur actif ne peut pas confirmer les paiements dans l'application                                                               |
| « Ma recharge n'a pas abouti »          | Vérifiez la liste des recharges en attente dans [Méthodes de paiement](payment-methods.md#recharges-en-attente). Un paiement par redirection ou QR non finalisé y reste et peut être annulé |
| « Quand mon remboursement arrivera-t-il ? » | Ne promettez pas de délai — aucun délai de remboursement n'est défini dans l'application. Les paiements remboursés apparaissent dans l'onglet Paiements avec un statut remboursé |

## Conseils

- **Rafraîchissez avant d'enquêter.** La moitié des tickets « l'argent a disparu » sont dus à un solde mis en cache.
- **Connaissez le processus de votre fournisseur avant de répondre.** « Instantané » ne s'applique qu'à la confirmation dans l'application ; les deux autres nécessitent que le passager finalise côté banque.
- **Un solde disparu est un paiement non confirmé**, pas perdu. Allez directement aux recharges en attente.
- **Lier une carte supprime entièrement la barrière du solde de trajet** — pour les passagers qui rechargent constamment en petites sommes, c'est le meilleur conseil.
