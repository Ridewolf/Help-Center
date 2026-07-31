# Webhooks en attente

La page Webhooks en attente (`/payments/pending-webhooks`) liste les transactions de paiement bloquées en **En attente** car la confirmation webhook du fournisseur de paiement n'est pas encore arrivée.

Chaque ligne correspond à un paiement envoyé à un fournisseur pour lequel nous n'avons pas reçu de rappel de statut final. Utilisez cette page comme votre **file d'attente des paiements bloqués** : repérez les anciennes lignes, identifiez le fournisseur en retard, et escaladez.

Permission requise : **Paiements** (`m1n2p3`).

## Ce que vous regardez

Lorsqu'un client paie :

1. Le tableau de bord envoie une demande de paiement à un **fournisseur** (Stripe, passerelle, etc.) — un _Payment Intent_ est créé
2. Le fournisseur traite la transaction de manière asynchrone et envoie un **webhook** avec le statut final (`succeeded`, `failed`, etc.)
3. Le tableau de bord reçoit le webhook et change le statut du [paiement](payments.md) de _En attente_ à _Terminé_ / _Échoué_

Les lignes **Webhooks en attente** correspondent à l'étape 2 bloquée — le fournisseur a été contacté mais n'a jamais donné de suite. La plupart du temps, le webhook arrive en quelques secondes, parfois en quelques minutes. Tout ce qui est plus ancien qu'environ 30 minutes est suspect ; tout ce qui dépasse 2 heures est presque certainement défaillant côté fournisseur ou dans notre récepteur de webhook.

## Filtres

| Filtre          | Type   | Notes                                                                             |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| **Fournisseur** | Texte  | Recherche par nom de fournisseur (ex. `stripe`)                                  |
| **Plus ancien que** | Sélection | `Tous` / `5` / `15` / `30` / `60` / `120` minutes — affiche uniquement les lignes plus anciennes que ce délai |

Utilisez _Plus ancien que 30 min_ ou _60 min_ comme filtre de surveillance quotidienne — les webhooks récents sont du bruit.

## Colonnes

| Colonne               | Triable ? | Contenu                                                               |
| --------------------- | --------- | --------------------------------------------------------------------- |
| **Créé le**           | ✓         | Date de création du Payment Intent                                   |
| **Âge**               | ✓         | Minutes depuis la création — codé par couleur (voir ci-dessous)      |
| **Fournisseur**       | —         | Le fournisseur de paiement auquel le Payment Intent a été envoyé    |
| **ID Payment Intent** | —         | L'ID du fournisseur pour ce Payment Intent — copiez-le lors d'une escalade |
| **Statut**            | —         | Statut côté fournisseur (brut) — généralement `requires_action` / `processing` |
| **ID Commande**       | —         | Notre ID interne de commande/paiement                                |

### Codage couleur de l'âge

La colonne **Âge** change de couleur en fonction de l'ancienneté, pour que vous puissiez scanner et trier d'un coup d'œil :

| Âge             | Couleur | Que faire                                      |
| -------------- | ------- | ---------------------------------------------- |
| **< 30 min**   | Gris    | Normal ; ignorer                               |
| **30–120 min** | Jaune   | À vérifier ; consultez le tableau de bord du fournisseur |
| **> 120 min**  | Rouge   | Presque certainement défaillant — escaladez   |

## Actions sur les lignes

Un petit menu d'actions à droite de chaque ligne :

| Action           | Fonction                                               |
| ---------------- | ------------------------------------------------------ |
| **Voir client**  | Ouvre le profil client lié à ce Payment Intent         |

(L'action _Voir détail du paiement_ est dans le code mais temporairement désactivée car la page de détail du paiement a été supprimée — elle reviendra plus tard.)

## Flux de travail typiques

- **Surveillance quotidienne** — définissez _Plus ancien que = 30 min_ → la page doit être vide la plupart du temps → sinon, vérifiez la colonne fournisseur
- **Panne d'un fournisseur unique** — voyez plusieurs lignes du même fournisseur passer au jaune/rouge simultanément → consultez la page de statut du fournisseur → contactez leur support avec quelques _ID Payment Intent_ du tableau
- **Problème d'un client unique** — une ou deux lignes anciennes → _Voir client_ → vérifiez l'[Activité / Paiements](../customers/client-detail.md) du client → demandez-lui de réessayer ou d'utiliser un autre moyen
- **Problème du récepteur de webhook** — plusieurs fournisseurs passent au rouge sans panne côté fournisseur → le problème vient de notre récepteur de webhook, pas du fournisseur ; escaladez à l'équipe technique

## Quand une ligne disparaît

Une ligne quitte cette page lorsque le webhook arrive — le statut du paiement passe à _Terminé_ ou _Échoué_ dans la liste principale des [Paiements](payments.md). La ligne ne disparaît jamais d'elle-même ; seul un webhook la supprime.

Si vous avez des **webhooks bloqués depuis plus d'un jour** qui ne disparaissent pas, c'est un bug à escalader — le tableau de bord opérateur ne propose pas de bouton manuel "forcer la complétion" pour des raisons de sécurité (une complétion manuelle incorrecte crée un désordre comptable difficile à corriger).

## Conseils

- **Copiez l'ID Payment Intent** lors d'une escalade vers un fournisseur — c'est le seul ID qu'ils reconnaissent
- **Tri par âge** (du plus récent au plus ancien) vous donne une file de triage : le haut de la liste triée est votre travail urgent
- **Page vide est l'objectif** — les Webhooks en attente doivent être vides (ou presque) en journée normale ; toute ligne est un travail à faire
- **Recherche fournisseur souple** — les correspondances partielles fonctionnent (`stri` correspond à `stripe`)
- **La page ne se rafraîchit pas automatiquement** — utilisez le bouton rafraîchir ou rechargez la page lors d'un triage actif
