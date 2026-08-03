# Détail du client

La page de détail du client (`/clients/:id`) est l'espace de travail pour un client unique. Utilisez-la pour consulter les informations personnelles, effectuer des actions sur le solde (recharger, amende), bloquer / débloquer, envoyer des messages, et auditer l'historique des trajets et l'activité du compte du client.

Vous arrivez généralement ici en cliquant sur une ligne dans la [liste des Clients](clients.md) ou depuis la page de détail d'un trajet (le lien client dans l'en-tête).

Permission requise : **Clients** (`e4f5h6`). Certaines actions nécessitent des sous-permissions (indiquées ci-dessous).

## Mise en page

De haut en bas :

1. **En-tête** — retour, nom, statut, bouton _Actions_
2. **Cartes de synthèse** — solde, trajets, note, statut (4 tuiles KPI)
3. **Onglets** — Détails / Activité / Historique

## En-tête

La bande supérieure identifie le client :

- **Bouton retour** (`←`) revient à la liste
- **Nom** (prénom + nom) et **pastille de statut** (Actif / Bloqué / Gelé / Enregistrement)
- Bouton **Actions** à droite — ouvre la boîte de dialogue des actions

## Actions

Cliquer sur **Actions** ouvre une boîte modale avec toutes les actions opérateur disponibles pour ce client. Chacune est soumise à permission :

| Action              | Permission          | Ce que ça fait                                                             |
| ------------------- | ------------------- | -------------------------------------------------------------------------- |
| **Recharger le solde**  | `topup-manual`      | Ouvre la boîte de dialogue de solde — créditer de l'argent dans le portefeuille du client              |
| **Émettre une amende**      | `fine`              | Ouvre la boîte de dialogue d'amende — débiter de l'argent du portefeuille (dommages, stationnement, etc.) |
| **Envoyer une notification push**       | —                   | Ouvre une boîte de dialogue pour envoyer une notification push à l'application du client              |
| **Bloquer / Débloquer** | `block` / `unblock` | Bascule le statut bloqué du client avec une raison optionnelle                 |
| **Modifier le client**     | `edit`              | Ouvre le [formulaire de modification](client-create-edit.md)        |
| **Supprimer le client**   | `delete`            | Suppression douce avec une boîte de confirmation (élément destructif rouge)              |

Les actions pour lesquelles vous n'avez pas la permission sont cachées.

## Cartes de synthèse

Une rangée de quatre cartes sous l'en-tête résume le client en un coup d'œil :

| Carte        | Ce qu'elle affiche                                                                       |
| ----------- | ----------------------------------------------------------------------------------- |
| **Solde** | Solde du portefeuille dans la devise de l'entreprise (en rouge si négatif)                            |
| **Trajets**   | Nombre total de trajets effectués                                                                 |
| **Note**  | Note moyenne laissée par les riders pour ce client                                     |
| **Statut**  | Statut actuel avec un sous-titre sur une ligne ("Actif / Bloqué / Gelé / Enregistrement") |

## Onglets

Trois onglets :

| Onglet          | Contenu                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| **Détails**  | Informations personnelles (nom, e-mail, téléphone, statut, solde, étiquettes) et le panneau **Appareils** (appareils connectés) |
| **Activité** | Actions opérateur et système sur ce compte client (changements de statut, modifications de solde, etc.)                |
| **Historique**  | Historique des trajets du client — un extrait ciblé de la liste globale des Trajets, filtré sur ce client             |

### Onglet Détails

La vue la plus détaillée de l'état du compte client. Deux zones :

**Informations personnelles (grille) :**

- Prénom
- Nom
- E-mail (indicateur de statut vérifié)
- Téléphone (indicateur de statut vérifié)
- Statut (avec la pastille de statut)
- Solde (formaté dans la devise de l'entreprise)
- Étiquettes (les puces appliquées à ce client)

**Panneau Appareils :**

Liste tous les appareils qui se sont connectés à l'application Rider sous ce compte, avec les horodatages de dernière connexion et l'option d'envoyer une notification push (si autorisé) ou de déconnecter un appareil. Utile pour les enquêtes de sécurité et les cas d'assistance "Je ne peux pas me connecter".

### Onglet Activité

Le **journal d'activité** chronologique pour ce client : chaque action opérateur (recharge, amende, changement de statut, modification, envoi de SMS/e-mail/push) et chaque événement système (étapes d'enregistrement, changements de statut de vérification, ajustements de solde suite à des remboursements).

Utile pour la conformité, la résolution de litiges et la traçabilité.

### Onglet Historique

L'**historique des trajets** du client sous forme de tableau — même format de ligne que la liste globale des Trajets, pré-filtré sur ce client. Cliquez sur une ligne pour ouvrir le détail du trajet.

Cet onglet est votre point de départ pour les cas "le client dit que le trajet X était erroné".

## Flux de travail typiques

- **Le client dit que le solde est erroné** — ouvrez Détails (solde actuel), puis Activité (cherchez le dernier changement de solde), puis Historique (vérifiez le trajet qui a déclenché le débit). Si quelque chose n'allait pas, _Actions → Recharger le solde_ avec une raison
- **Le client signale un téléphone perdu** — Détails → Appareils → déconnectez l'appareil perdu (si supporté) ; verrouillez éventuellement le portefeuille via _Actions → Bloquer le client_ jusqu'à ce qu'il ait récupéré l'accès
- **Fraude ou abus** — Activité pour la chronologie, Historique pour les trajets suspects ; puis _Actions → Bloquer le client_ avec une raison ; la raison est enregistrée dans le journal d'activité
- **Remboursement de bonne volonté** — _Actions → Recharger le solde_ avec une description comme "Remboursement de bonne volonté — ticket #12345" ; la description est visible dans Activité pour la traçabilité
- **Accueil / accompagnement à l'intégration** — _Actions → Envoyer une notification push_ avec un message de bienvenue ; vérifiez d'abord les Appareils pour vous assurer qu'ils ont une session active

## Conseils

- **Surveillez la carte Statut** — même si tout semble correct, un statut _Bloqué_ ou _Gelé_ explique pourquoi le client ne peut pas rouler
- **Le panneau Appareils est votre point de départ pour le débogage** — la plupart des cas de « je ne peux pas me connecter » sont dus à une session d'appareil périmée
- **Les recharges et descriptions d'amendes apparaissent dans Activité** — écrivez quelque chose que les opérateurs peuvent rechercher plus tard (« ticket #X », « remboursement pour trajet Y ») au lieu d'un simple numéro
- **Modifier sert pour les métadonnées** — nom, e-mail, téléphone — pas pour le solde. Utilisez les dialogues dédiés au solde (avec piste d'audit) pour les opérations d'argent
- **La note est la note _du conducteur_ du client** — une note basse croisée avec des pics de preuve de stationnement / tickets indique généralement un usager problématique
- **L'URL contient l'ID client** — collez-le dans une conversation d'assistance pour partager le profil exact
