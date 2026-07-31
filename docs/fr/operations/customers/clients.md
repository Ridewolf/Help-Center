# Clients — Liste

La liste des Clients (`/clients`) est votre base de données clients : chaque personne ayant créé un compte sur votre service, avec son solde, ses étiquettes, un résumé de son historique de trajets et ses canaux de contact.

Pour travailler sur un client en particulier (historique complet, actions sur le solde, appareils, commentaires), ouvrez la [page de détail du client](client-detail.md).

Permission requise : **Clients** (`e4f5h6`). Des sous-permissions supplémentaires contrôlent certaines actions sur les lignes et en masse.

## Comment les clients apparaissent ici

Vous ne créez généralement pas les clients dans le tableau de bord — ils s'inscrivent via l'application mobile Rider :

1. Une personne installe l'**application Ridewolf rider** et s'inscrit (téléphone ou e-mail)
2. Le backend crée un enregistrement client ; la ligne apparaît ici avec le statut **Enregistrement** pendant la vérification (SMS, pièce d'identité, moyen de paiement)
3. Une fois la vérification terminée, le statut passe à **Actif** — le client peut prendre des trajets
4. Les opérateurs peuvent créer manuellement des clients (par exemple pour des comptes VIP ou de test) via `+ Créer` — expliqué dans l'article _Créer_

La liste se rafraîchit lorsque vous rechargez ou modifiez les filtres.

## Filtres

| Filtre     | Type         | Notes                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Recherche  | Texte        | Recherche dans le nom, téléphone, e-mail, ID client        |
| Plage de dates | Calendrier | Filtre par **date d'inscription** ; de / à                 |
| Statut     | Liste déroulante | `Actif` / `Bloqué` / `Gelé` / `Enregistrement` (ou `Tous`) |
| Étiquettes | Multi-sélection | Filtrer par étiquettes appliquées au client               |

Tous les filtres sont combinés avec ET. Les filtres actifs s'affichent au-dessus du tableau ; l'URL reflète l'état actuel.

## Colonnes

| Colonne       | Triable ? | Contenu                                                                        |
| ------------- | --------- | ------------------------------------------------------------------------------ |
| **Client**    | ✓         | Avatar + prénom/nom + téléphone ou e-mail ; lien vers la page détail client    |
| **Canaux**    | —         | Icônes des canaux de contact vérifiés par le client (téléphone, e-mail, social) |
| **Solde**     | ✓         | Solde du portefeuille dans la devise de l'entreprise, en rouge si négatif      |
| **Étiquettes**| —         | Étiquettes appliquées à ce client                                             |
| **Statut**    | ✓         | Pastille de statut (voir référence ci-dessous)                                |
| **Note**      | ✓         | Note moyenne laissée par les riders pour ce client (note du conducteur)        |
| **Trajets**   | ✓         | Nombre total de trajets                                                        |
| **Dernier trajet** | ✓     | Date du dernier trajet du client                                              |
| **Paiement**  | —         | Icône du moyen de paiement par défaut (carte, portefeuille, etc.)              |

Triez en cliquant sur un en-tête triable. Le tri fait partie de l'URL.

## Référence des statuts

| Statut          | Signification                                                                        |
| --------------- | ------------------------------------------------------------------------------------ |
| **Actif**       | Entièrement vérifié, peut prendre des trajets, peut être facturé                     |
| **Bloqué**      | Ne peut pas prendre de trajets ; blocage initié par l'opérateur (fraude, abus, dette) ou déclenché par le système |
| **Gelé**        | Compte en pause (par exemple pendant une enquête sur un litige, ou à la demande du client) |
| **Enregistrement** | Inscription en cours — téléphone / e-mail / pièce d'identité / moyen de paiement non encore vérifiés |

## Actions sur la ligne

Chaque ligne dispose d'un **menu à trois points** à droite. Les actions disponibles dépendent de vos permissions :

| Action              | Permission          | Fonctionnalité                                                                    |
| ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| **Voir profil**     | —                   | Ouvre la [page de détail du client](client-detail.md)                            |
| **Historique des trajets** | —             | Ouvre la vue des trajets du client (un sous-ensemble ciblé de la liste globale des trajets) |
| **Envoyer SMS**     | —                   | Ouvre une boîte de dialogue pour envoyer un SMS au téléphone vérifié du client   |
| **Envoyer e-mail**  | —                   | Ouvre une boîte de dialogue pour envoyer un e-mail à l'adresse vérifiée du client |
| **Envoyer push**    | —                   | Ouvre une boîte de dialogue pour envoyer une notification push à l'application du client |
| **Recharger solde** | `topup-manual`      | Ouvre la boîte de dialogue de solde — créditer de l'argent sur le portefeuille du client |
| **Émettre une amende** | `fine`            | Ouvre la boîte de dialogue d'amende — débiter de l'argent du portefeuille (pour dommages, stationnement, etc.) |
| **Bloquer / Débloquer** | `block` / `unblock` | Ouvre la boîte de dialogue de blocage — bascule le statut bloqué du client avec une raison optionnelle |
| **Modifier**        | `edit`              | Ouvre le [formulaire de modification](client-create-edit.md)                      |
| **Supprimer**       | `delete`            | Supprime en douceur l'enregistrement client (avec confirmation ; action destructive en rouge) |

Les actions pour lesquelles vous n'avez pas les permissions sont cachées dans le menu.

## Actions en masse

Sélectionnez un ou plusieurs clients avec les cases à cocher à gauche. Une **barre d'actions en masse** apparaît en haut avec le nombre sélectionné et les actions :

| Action groupée    | Permission          | Ce que cela fait                                                        |
| ----------------- | ------------------- | ---------------------------------------------------------------------- |
| **Ajouter un solde** | `topup-manual`      | Créditer un montant unique à chaque portefeuille sélectionné (avec confirmation) |
| **Débiter un montant** | `fine`              | Débiter un montant unique de chaque portefeuille sélectionné (ex. amende générale) |
| **Changer le statut** | `block` / `unblock` | Appliquer le même statut à tous les clients sélectionnés (Actif / Bloqué / Gelé) |
| **Envoyer une notification push** | —                   | Envoyer une notification push à tous les clients sélectionnés en une seule opération |

Les dialogues groupés vous guident à travers le montant / message / statut, puis appliquent à toutes les lignes sélectionnées en une seule opération avec une confirmation finale.

## Actions de la page (en haut à droite)

- **+ Créer** — ouvre le [formulaire de création de client](client-create-edit.md) (article séparé)

## Flux de travail typiques

- **Enquêter sur une plainte de paiement** — rechercher par téléphone ou e-mail → ouvrir le détail → vérifier le solde et l'historique des trajets
- **Recharger un portefeuille sur demande de l'opérateur** — trouver le client, _Recharger le solde_ dans le menu de ligne, saisir le montant, confirmer
- **Bloquer un fraudeur** — rechercher le client → _Bloquer / Débloquer_ → définir Bloqué avec raison ; le statut passe à _Bloqué_, plus aucun trajet possible
- **Envoyer un SMS de panne** — filtrer par étiquette de zone → _Tout sélectionner_ → _Envoyer une notification push_ (ou utiliser Marketing → SMS pour les diffusions non urgentes)
- **Auditer les détenteurs d'une étiquette** — filtrer par étiquette, vérifier les soldes et le nombre de trajets pour détecter les anomalies

## Conseils

- **Le statut est le gardien silencieux** — les clients en _Enregistrement_ / _Gelé_ / _Bloqué_ ne peuvent pas prendre de trajets ; ne vous attendez pas à les voir dans la liste des Trajets
- **Les icônes des canaux indiquent ce qui est vérifié** — une icône e-mail manquante signifie que le SMS est votre seul canal sortant pour ce client
- **La note est la note du client donnée par le rider** (pas celle du trajet) — une note basse signifie souvent des problèmes de stationnement ou un comportement impoli ; vérifiez avec les preuves de stationnement et les amendes
- **Le solde qui devient rouge** = portefeuille négatif. Le client ne peut pas démarrer de nouveaux trajets tant que le solde n'est pas rechargé ou remboursé
- **Les permissions sont hiérarchisées** — vous pouvez être autorisé à _Envoyer un SMS_ mais pas à _Recharger_ le même client ; le menu montre ce que vous pouvez faire
- **L'URL est partageable** — copiez une vue filtrée (ex. _Clients bloqués avec trajets > 0_) et envoyez-la à un collègue
