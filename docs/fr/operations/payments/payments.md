# Paiements — Historique

La page Paiements (`/payments`) est le registre de chaque transaction monétaire affectant le compte d'un client : frais de trajet, recharges de portefeuille, remboursements, amendes. Utilisez-la pour enquêter sur un prélèvement, émettre un remboursement ou auditer les flux d'argent sur une période donnée.

Pour les événements webhook non traités des fournisseurs de paiement, voir [Pending Webhooks](pending-webhooks.md).

Permission requise : **Paiements** (`m1n2p3`). Certaines actions sur les lignes nécessitent des sous-permissions supplémentaires.

## Ce que vous trouverez ici

Chaque ligne représente une transaction de paiement unique :

| Type       | Ce que c'est                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Recharge**  | Argent ajouté au portefeuille du client (crédit manuel opérateur ou recharge par carte) |
| **Débit**  | Argent prélevé du client (frais de trajet ou amende)                          |
| **Remboursement** | Argent retourné au client (annulation d'un débit précédent)                |

Chaque transaction a une **méthode/fournisseur** — le canal par lequel elle est passée :

- **Fournisseurs de carte** (Stripe, etc.) — argent réel sur une carte de paiement
- **Solde** — portefeuille interne (pas un fournisseur de paiement ; juste un débit/crédit contre le solde du client)
- **Autres passerelles** selon vos intégrations

La distinction entre _fournisseur de carte_ et _solde_ est importante pour les remboursements — voir _Actions sur la ligne → Remboursement_ ci-dessous.

## Filtres

| Filtre     | Type     | Notes                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| Recherche  | Texte    | Recherche par nom du client, ID de paiement, ID de trajet / amende associé   |
| Plage de dates | Calendrier | Sélecteur de début / fin ; par défaut "toutes périodes"                   |
| Type       | Liste déroulante | `Recharge` / `Débit` / `Remboursement` (ou `Tous`)                    |
| Statut     | Liste déroulante | `En attente` / `Terminé` / `Échoué` / `Remboursé` (ou `Tous`) |

Les filtres s'appliquent côté serveur et se combinent avec ET.

## Colonnes

| Colonne    | Triable ? | Contenu                                                            |
| ---------- | --------- | ------------------------------------------------------------------ |
| **Date**   | ✓         | Date de création de la transaction ; tri par défaut = plus récent en premier      |
| **Client** | —         | Nom et avatar du client ; lien vers le détail du client                  |
| **Source** | —         | Type de transaction (Recharge / Débit / Remboursement), avec une étiquette colorée   |
| **Montant**| ✓         | Montant en devise de l'entreprise, signé (+/−) et codé par couleur |
| **Méthode**| —         | Méthode / fournisseur de paiement (carte, solde, nom de la passerelle)            |
| **Statut** | ✓         | Pastille de statut (voir référence ci-dessous)                                  |

Triez en cliquant sur un en-tête triable. Le tri choisi fait partie de l'URL.

## Référence des statuts

| Statut        | Signification                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| **En attente**   | Soumis au fournisseur ; en attente de confirmation webhook                     |
| **Terminé** | Fournisseur a confirmé le succès ; argent transféré                                      |
| **Échoué**    | Fournisseur a rejeté la transaction (refus de carte, erreur réseau, contrôle anti-fraude) |
| **Remboursé**  | Un débit réussi qui a ensuite été annulé par un remboursement                       |

## Actions sur la ligne

Chaque ligne dispose d'un **menu à trois points** à droite. Les actions disponibles dépendent du type de paiement, du statut et de vos permissions :

| Action          | Quand activée                           | Permission                                              |
| --------------- | -------------------------------------- | ------------------------------------------------------- |
| **Voir client** | Toujours (redirige vers le profil du client) | —                                                       |
| **Rembourser**      | Voir "Routage du remboursement" ci-dessous             | `refund` / `topup-manual` / `fine` (selon le chemin) |

### Routage du remboursement

Le tableau de bord vous cache les détails du fournisseur, mais l'action _Rembourser_ est assez intelligente pour choisir le bon chemin :

- **Débit basé sur un fournisseur** (carte, passerelle) → appelle le point de terminaison de remboursement du fournisseur → l'argent retourne sur la carte
- **Débit sur solde** (portefeuille) → pas de fournisseur impliqué — ouvre la boîte de dialogue **Recharger le solde** pour créditer à nouveau le portefeuille (nécessite `topup-manual`)
- **Recharge de solde** (crédit manuel opérateur) → ne peut pas être annulée via un fournisseur — ouvre la boîte de dialogue **Émettre une amende** pour débiter le même montant (nécessite `fine`)

Le remboursement est **désactivé** lorsque :

- La ligne est elle-même un remboursement (rembourser un remboursement n'a pas de sens)
- Le statut n'est pas _Terminé_ (vous ne pouvez pas rembourser les transactions en attente / échouées)
- La transaction a déjà été annulée (le tableau de bord suit cela et bloque les clics en double)
- Vous ne disposez pas de la sous-permission appropriée pour le chemin de routage

## Pourquoi les paiements apparaissent ici (et ce qui les crée)

Les paiements ne sont **pas** créés depuis cette page — ils proviennent d'autres flux :

1. **Le client effectue un trajet** → fin du trajet → le backend crée une transaction _Débit_ → si elle réussit, le statut passe à _Terminé_ et l'argent est prélevé du portefeuille ou de la carte
2. **Le client recharge le portefeuille dans l'app** → appel au fournisseur → le backend crée une transaction _Recharge_ → le statut passe à _Terminé_ à la confirmation du webhook
3. **L'opérateur crédite un portefeuille** via _Recharger le solde_ sur un client → le backend crée une _Recharge_ avec la méthode _solde_ et immédiatement _Terminé_
4. **L'opérateur émet une amende** → le backend crée un _Débit_ avec la méthode _solde_, immédiatement _Terminé_
5. **Remboursement** depuis cette liste → le backend crée une transaction _Remboursement_ ; l'original est marqué _Remboursé_

La transaction originale ne disparaît jamais — chaque action est auditable.

## Flux de travail typiques

- **Enquêter sur une charge** — rechercher par ID client / trajet / paiement → vérifier le Statut (Terminé = argent prélevé, Échoué = pas d'argent) et la Méthode
- **Rembourser un trajet** — trouver la ligne _Débit_ pour le trajet → menu de la ligne → _Rembourser_ → confirmer → une ligne _Remboursement_ appariée apparaît, l'original passe à _Remboursé_
- **Auditer la journée** — définir la plage de Dates = aujourd'hui → filtrer Statut = Terminé → vérifier les totaux
- **Trouver les échecs à retenter** — filtrer Statut = Échoué → contacter les clients pour retenter / méthode alternative
- **Rapprocher avec le fournisseur** — plage de Dates + Type = Recharge/Débit + Méthode = fournisseur de carte → exporter et vérifier avec le relevé du fournisseur

## Conseils

- **En attente n'est pas échoué** — les transactions en attente attendent le webhook du fournisseur ; consultez les [Webhooks en attente](pending-webhooks.md) si une ligne reste en attente trop longtemps
- **Les transactions de solde ne peuvent pas être remboursées par carte** — le système vous dirige vers le bon dialogue ; ne tentez pas de créer manuellement des transactions compensatoires
- **L'original survit à un remboursement** — les remboursements ajoutent une ligne appariée, ils ne suppriment pas le débit ; les deux lignes restent dans l'historique pour audit
- **Le signe du montant indique la direction** — `+` (vert) est de l'argent vers le client ; `−` (rouge/foncé) est de l'argent venant du client
- **Les noms des fournisseurs sont importants pour l'assistance** — lors d'une escalade vers votre fournisseur de paiement, copiez l'ID du paiement et le nom du fournisseur depuis la colonne Méthode
- **L'URL est partageable** — copiez une vue filtrée (par ex. _les débits par carte échoués d'hier_) et envoyez-la à la finance ou à la fraude
