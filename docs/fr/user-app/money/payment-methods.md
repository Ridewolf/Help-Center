# Rider App — Méthodes de paiement et flux de recharge

Tout ce qui concerne la façon dont un utilisateur paie : la liste des cartes enregistrées, l'ajout d'une carte, et les trois façons différentes dont une recharge peut se terminer selon le fournisseur de paiement utilisé.

| Écran                | Route                        | Accès depuis                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Gérer les méthodes de paiement | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Gérer les méthodes de paiement** |
| Ajouter une carte             | `/wallet/add-payment-method` | **Ajouter une carte** sur l'écran ci-dessus          |
| Recharge par redirection        | `/wallet/topup-redirect`     | Confirmation d'une recharge via un fournisseur par redirection |
| Recharge par QR              | `/wallet/topup-qr`           | Confirmation d'une recharge via un fournisseur QR       |

Deux des plaintes les plus courantes des utilisateurs sont traitées sur cette page : _« il n'y a pas de bouton Ajouter une carte »_ et _« mon paiement est bloqué en attente »_.

## Gérer les méthodes de paiement

Un **sélecteur de fournisseur** se trouve en haut, et le reste de l'écran s'adapte à ce que ce fournisseur prend en charge :

- Si le fournisseur **ne prend pas en charge les cartes enregistrées**, aucune liste de cartes n'est affichée — un message d'état vide apparaît à la place.
- Si le fournisseur **ne permet pas d'enregistrer de nouvelles cartes**, le bouton **Ajouter une carte** est complètement masqué. C'est la réponse quand un utilisateur demande pourquoi il ne peut pas ajouter de carte.

Chaque méthode enregistrée affiche son type (carte ou portefeuille comme Apple Pay / Google Pay), la marque, les quatre derniers chiffres, le mois et l'année d'expiration, et si elle est la carte par défaut. La liste charge 10 éléments à la fois avec un défilement infini.

**Définir par défaut** et **Retirer** demandent tous deux une confirmation, puis rechargent la liste.

### Recharges en attente

Sous les cartes se trouve une liste **Recharges en attente**, construite à partir des enregistrements de paiement de l'utilisateur : montant, devise, date, statut et fournisseur. Elle affiche par défaut les **deux plus récents**, avec un bouton **Afficher tout** pour étendre la liste.

C'est dans cette liste qu'une transaction par redirection ou QR inachevée se trouve. Un utilisateur dont l'argent « a disparu » a presque toujours un enregistrement ici qu'il n'a jamais terminé — et il peut être annulé depuis cet endroit.

Un accordéon **Comment recharger** sur le même écran donne des instructions spécifiques au fournisseur sélectionné.

## Ajouter une carte

1. Ouvrir **Wallet → Gérer les méthodes de paiement → Ajouter une carte**.
2. Le **Nom du titulaire** est pré-rempli depuis le profil de l'utilisateur (prénom et nom).
3. Le numéro de carte, la date d'expiration et le CVC sont saisis dans le **cadre sécurisé du fournisseur de paiement**, pas dans les champs de l'application. Le cadre se charge à l'ouverture de l'écran.
4. Le bouton **Soumettre reste bloqué** tant que deux conditions ne sont pas remplies : le cadre sécurisé a fini de charger, et il indique que tous les champs sont complets sans erreur de validation. Un bouton Soumettre qui ne s'active pas est presque toujours dû à l'une de ces deux raisons.
5. Alternativement, l'utilisateur peut utiliser le bouton portefeuille **Apple Pay / Google Pay** au lieu de saisir une carte.
6. En cas de succès, la liste des cartes se rafraîchit et l'écran revient à Gérer les méthodes de paiement.

Une boîte d'information sur la sécurité à l'écran explique que le fournisseur de paiement gère les données de la carte et que l'application ne stocke jamais le numéro complet. C'est exact, et cela vaut la peine d'être cité à un utilisateur inquiet.

## Recharger — les trois flux

L'utilisateur commence toujours de la même façon — **Wallet → choisir un montant prédéfini → confirmer** — puis le flux qui s'exécute est décidé automatiquement par le fournisseur.

### 1. Confirmation dans l'application (Stripe)

Le paiement est confirmé dans l'application avec une carte enregistrée. Pas de navigateur, pas d'étape externe. C'est le seul flux qui se comporte comme une recharge instantanée, et le seul sous lequel la **Recharge automatique** peut être activée.

### 2. Fournisseurs par redirection (MAIB et similaires)

1. L'utilisateur confirme le montant.
2. L'application **ouvre automatiquement la page de paiement du fournisseur** dans le navigateur système ou intégré.
3. L'utilisateur paie sur cette page.
4. Pendant ce temps, l'application vérifie le statut du paiement environ **toutes les 5 secondes**.
5. L'utilisateur peut aussi appuyer sur **J'ai déjà payé** pour forcer une vérification immédiate.
6. Un paiement non terminé peut être **annulé** depuis l'écran — cela supprime le paiement en attente et revient au Wallet.

### 3. Fournisseurs QR (MIA et similaires)

1. L'écran affiche un **compte à rebours MM:SS** jusqu'à l'expiration du paiement.
2. **Ouvrir dans l'application bancaire** ouvre le paiement — nativement, dans un navigateur externe ou dans une fenêtre de navigateur intégré.
3. **Copier le lien** met le lien du paiement dans le presse-papiers, pour que l'utilisateur puisse terminer sur un autre appareil.
4. Une fois le compte à rebours écoulé, le bouton Ouvrir est désactivé et un badge **Lien expiré** apparaît. **Le paiement expiré ne peut pas être réactivé** — l'utilisateur doit lancer une nouvelle recharge.
5. La vérification du statut, **J'ai déjà payé** et l'annulation fonctionnent exactement comme dans le flux par redirection.

## Dépannage

| Le passager dit…                     | Ce que c'est                                                                                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| « Comment puis-je recharger ? »      | Portefeuille → choisir un montant prédéfini → puis suivre l'un des trois flux utilisés par leur fournisseur. Seule la confirmation dans l'application se termine sans quitter l'app |
| « Il n'y a pas de bouton Ajouter une carte » | Le fournisseur actif ne prend pas en charge l'enregistrement de nouvelles cartes                                                                    |
| « Aucune carte n'est listée »        | Le fournisseur actif ne prend pas en charge les cartes enregistrées                                                                                   |
| « Le formulaire de carte ne se soumet pas » | Le cadre sécurisé de la carte n'a pas fini de se charger, ou il signale encore un champ incomplet ou invalide                                        |
| « Mon paiement est bloqué en attente » | Appuyez sur **J'ai déjà payé** pour revérifier. Si cela ne se résout pas, annulez-le depuis **Recharges en attente** et réessayez. Un enregistrement en attente peut aussi nécessiter une réconciliation par un opérateur — voir [Webhooks en attente](../../operations/payments/pending-webhooks.md). **Ne promettez pas de délai de résolution** |
| « Le lien QR a expiré »               | Lancez une nouvelle recharge ; celle expirée ne peut pas être rouverte                                                                               |
| « Paiement refusé »                   | Refus côté banque. Le code d'échec se trouve sur l'enregistrement de paiement dans [Historique → Paiements](history.md#onglet-paiements)                  |
| « Quelles sont les limites de recharge automatique ? » | Ne donnez pas de limites — aucune n'est définie dans l'application. Lisez ce que dit la description de l'écran Portefeuille                          |

## Conseils

- **Le fournisseur décide de l'écran.** Avant de répondre à toute question du type « pourquoi ne puis-je pas… », vérifiez quel fournisseur utilise le passager — la moitié des boutons manquants sont des capacités du fournisseur, pas des défauts.
- **Recharges en attente est le premier endroit à vérifier** pour toute question d'argent qui n'est pas liée à une carte refusée.
- **Annulez, puis réessayez.** Un paiement en attente bloqué perturbe plus le modèle mental du passager que son compte ; annuler et repartir à zéro est généralement plus rapide que d'attendre.
- **Citez la boîte de dialogue de sécurité, pas votre propre assurance.** Elle dit exactement ce qu'il faut sur qui stocke les données de la carte.
- **Ajouter une carte fait plus que permettre les recharges** — cela supprime aussi la condition de solde minimum pour les trajets et fait apparaître le bouton **Scanner**. Voir [Carte](../riding/map.md#la-barre-inférieure-est-conditionnelle).
