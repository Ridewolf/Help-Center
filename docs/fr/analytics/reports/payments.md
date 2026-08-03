# Analytique — Paiements

La page d'analytique des Paiements (`/analytics/payments`) est votre **tableau de bord financier** : indicateurs clés et graphiques sur l'argent entrant (recharges), l'argent sortant (remboursements), l'argent facturé (débits) et la santé de votre système de paiement.

Différente de l'[Historique des paiements](../../operations/payments/payments.md), qui est un registre par transaction — cette page est **agrégée** sur une plage de dates pour que vous puissiez repérer les tendances, fuites et anomalies.

Permission requise : **Voir l'analytique des paiements** (`w7x8y9`).

## Plage temporelle

Une **barre de plage de dates** se trouve en haut de la page. Chaque métrique et graphique respecte cette plage :

- Choisissez un préréglage (Aujourd'hui, 7 / 30 / 90 derniers jours, Ce / Dernier mois) ou une plage personnalisée
- Le badge de comparaison sous les cartes métriques indique « vs période précédente » — quand vous choisissez _7 derniers jours_, la comparaison porte sur les 7 jours précédents
- La plage est conservée pendant la session : naviguez ailleurs puis revenez, votre plage est préservée

## Sections

La page est organisée en **six sections**, chacune centrée sur un aspect différent des paiements :

### 1. Flux

La vue d'ensemble — argent entrant vs argent sortant.

| Indicateur clé | Ce qu'il mesure                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Recharges**  | Argent crédité aux portefeuilles sur cette période (manuel + fournisseur)                                                  |
| **Remboursements** | Argent retourné aux clients ; affiche un badge _Taux de remboursement_ (remboursements / débits)                         |
| **Débits**     | Argent facturé aux clients (trajets, amendes). Comprend un **filtre d'étiquettes** pour cibler une étiquette client spécifique (ex. _VIP_) |
| **Flux net**   | Recharges − Remboursements ; positif = votre solde de portefeuille augmente                                               |

### 2. Qualité

La santé de votre intégration avec le fournisseur de paiement.

| Indicateur clé       | Ce qu'il mesure                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Taux de réussite** | Transactions terminées / toutes tentées — votre chiffre principal de fiabilité                                            |
| **Échouées**         | Nombre de transactions échouées sur la période                                                                           |
| **En attente**       | Nombre de transactions encore en attente (à croiser avec les [Webhooks en attente](../../operations/payments/pending-webhooks.md)) |
| **Remboursées**      | Nombre de débits finalement remboursés                                                                                    |
| **Raisons d'échec**  | Graphique décomposant les échecs par raison (refus / 3DS / réseau / etc.)                                                |

Un pic d’_Échouées_ + une raison spécifique dominant le graphique = une panne ou un problème d’intégration à escalader.

### 3. Solde

L’état des fonds détenus par l’opérateur (portefeuilles des utilisateurs) à la fin de la période.

| Indicateur clé     | Ce qu'il montre                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| **Solde**         | Somme de tous les soldes positifs — argent que vous détenez effectivement pour les utilisateurs |
| **Dette**         | Somme de tous les soldes négatifs — argent que les utilisateurs vous doivent                        |
| **Solde moyen**   | Solde moyen par client actif                                                |
| **Utilisateurs**  | Nombre de clients avec un solde non nul                                    |
| **Graphique par tranches** | Histogramme des clients par taille de solde (ex. 0–10 / 10–50 / 50–100 / 100+)   |

Utilisez la _Dette_ comme signal de retard de recouvrement — une dette élevée indique de nombreuses amendes ou débits échoués nécessitant un suivi.

### 4. Modèles

Modèles comportementaux des recharges des utilisateurs — utile pour le marketing / produit.

- **Histogramme de taille des recharges** — comment les utilisateurs répartissent leurs recharges par montant. Le mode de l'histogramme (taille la plus fréquente) est ce que vos invites devraient proposer par défaut
- **Recharges par heure** — moments de la journée où les utilisateurs rechargent. Les pics correspondent généralement aux pics de trajets (trajets domicile-travail, soirées de week-end)

### 5. Méthodes

Une répartition tabulaire par **méthode / fournisseur de paiement**.

- Colonnes : Méthode (carte / solde / portefeuille / etc.), Montant total, Nombre, Transaction moyenne, Taux de réussite
- Utile pour repérer les fournisseurs sous-performants (une méthode avec un faible taux de réussite est votre maillon faible)

### 6. Utilisateurs

Vue par cohorte client — qui vous paie.

| Indicateur clé       | Ce qu'il mesure                                                                   |
| ------------------- | ---------------------------------------------------------------------------------- |
| **Payeurs uniques**  | Clients distincts ayant payé sur la période                                       |
| **Nouveaux payeurs** | Clients ayant payé pour la première fois sur cette période                        |
| **Payeurs récurrents** | Clients ayant payé plus d'une fois sur cette période                            |
| **Grands payeurs**   | Tableau des clients les plus payants avec nom, montant, nombre de trajets, lien vers le profil |

## Flux de travail typiques

- **Revue hebdomadaire** — préréglage _7 derniers jours_ → parcourez chaque section une fois. Tout ce qui est en dehors du ruban de comparaison (grand ▲ ou ▼) mérite un examen approfondi
- **Analyse post-mortem d'une panne** — définissez la plage de dates au jour d'un incident → section Qualité → graphique des raisons d'échec → recoupez avec l'[Historique des paiements](../../operations/payments/payments.md) pour les transactions réelles
- **Analyse approfondie des étiquettes** — Carte des débits → filtre d’étiquettes → choisissez une étiquette comme _VIP_ → la métrique Débits affiche uniquement cette cohorte ; comparez avec le nombre total de débits pour une part rapide
- **Relance des recouvrements** — section Solde → _Dette_ → si elle a augmenté, explorez les clients individuels via la liste des Clients filtrée par solde négatif
- **Tarification marketing** — Modèles → histogramme de la taille des recharges → définissez votre suggestion de recharge dans l’application sur le groupe le plus populaire

## Conseils

- **Le ruban de comparaison est plus utile que le chiffre absolu** — le chiffre absolu du revenu dépend de la taille de l’entreprise ; le % de variation indique si la situation s’améliore
- **Plage de dates persistante** — votre dernière plage sélectionnée reste active lors de la navigation ; si un collègue partage une URL avec une plage différente, c’est celle-ci qui prévaut
- **Le filtre d’étiquettes s’applique uniquement aux Débits** — pour voir les recharges par étiquette, vous devez recouper avec la liste des Clients
- **Le graphique des raisons d’échec est votre tableau de bord fournisseur** — l’apparition soudaine d’une nouvelle catégorie de raison signifie généralement un changement de configuration fournisseur
- **Flux net positif ≠ bénéfice** — il s’agit de la trésorerie du portefeuille, pas du revenu ; cela ne tient pas compte des remboursements que vous pourriez effectuer ultérieurement ni des soldes non réglés
- **Solde moyen × Utilisateurs ≠ Trésorerie** — la trésorerie est la somme des positifs ; si de nombreux utilisateurs sont endettés, la moyenne peut être inférieure à Trésorerie / Utilisateurs
