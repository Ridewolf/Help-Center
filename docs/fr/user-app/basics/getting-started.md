# Premiers pas — Notions de base de l'application utilisateur

Voici le guide à donner à un tout nouveau rider : de l'installation de l'application au premier trajet. Il liste aussi les règles qui déterminent si un trajet peut commencer, pour que votre équipe d'assistance puisse répondre à « pourquoi je ne peux pas rouler ? » sans deviner.

Pour la carte plein écran de l'application, voir [Overview](overview.md).

## Ce qu'un rider peut faire

- Trouver des véhicules partagés à proximité sur la carte, en scanner un ou en toucher un, et l'utiliser
- Garder un solde dans le portefeuille et le recharger depuis l'application
- Consulter les trajets passés et les paiements passés, avec un détail du coût par trajet
- Contacter l'assistance via les canaux que vous activez, ou via le chat en direct
- Gérer le compte : nom, photo, mot de passe, appareils connectés

Les abonnements et codes promo ne sont pas encore disponibles dans l'application — voir [Subscriptions](../money/subscriptions.md).

## Avant de commencer

- Le rider doit avoir l'application de votre opérateur installée sur un téléphone
- Le rider doit utiliser une des méthodes de connexion que vous avez activées dans **Paramètres → Mon entreprise → Application → Méthodes d'authentification** (voir [My Company](../../settings/administration/my-company.md))
- Aucune carte ni configuration de paiement n'est nécessaire pour créer un compte — cela se fait plus tard, depuis **Portefeuille**

## Configuration initiale

### 1. Connexion

Il n'y a pas de flux de connexion unique et fixe. L'écran de connexion affiche un onglet par méthode que vous avez activée, et les méthodes possibles sont : code unique par téléphone, code unique par e-mail, code WhatsApp, e-mail plus mot de passe, Google, Apple, Telegram et Viber.

Expliquez-le à un rider comme « connectez-vous avec une des méthodes proposées par votre opérateur » — pas comme « entrez votre numéro de téléphone et attendez un SMS ». Les champs par onglet et les étapes de saisie du code sont dans [Signing in](../account/registration-login.md).

### 2. Compléter l'intégration

Un rider tout neuf est guidé à travers l'intégration avant d'accéder à la carte. Certaines étapes sont conditionnelles, donc deux riders sur des opérateurs différents peuvent voir un nombre différent d'écrans. L'ordre est :

1. **À propos de moi** — un assistant en trois étapes : une photo optionnelle, puis nom et date de naissance, puis coordonnées plus une case à cocher pour le consentement marketing. **C'est cette étape qui crée réellement le compte.**
2. **Permis de conduire** — uniquement si vos paramètres d'entreprise l'autorisent (par défaut ce n'est pas le cas)
3. **Passeport** — uniquement si activé de la même manière
4. **Autorisations** — notifications, localisation, caméra
5. **Félicitations** — puis accès à la carte

La configuration de la carte ou du paiement ne fait **pas** partie de l'intégration. Un rider ajoute un moyen de paiement plus tard, depuis l'écran **Portefeuille**, quand il veut recharger.

Deux choses à savoir avant d'accompagner un rider dans l'intégration : les étapes de documents ne peuvent pas être complétées (le téléchargement de documents n'est pas encore disponible dans l'application), et après avoir accordé les autorisations, les boutons **Continuer** et **Passer** ramènent actuellement à l'assistant **À propos de moi** au lieu d'avancer. Détails complets : [Onboarding and verification](../account/onboarding-verification.md).

### 3. Commencer à rouler

L'intégration se termine sur la carte. De là, le rider sélectionne un véhicule ([Map](../riding/map.md)) et démarre un trajet ([Rides](../riding/rides.md)).

## Les sections de l'application

| Section             | Route                     | Ce que le rider y fait                                    |
| ------------------- | ------------------------- | -------------------------------------------------------- |
| **Carte**           | `/map`                    | Écran d'accueil — trouver et sélectionner un véhicule    |
| **Portefeuille**    | `/wallet`                 | Solde, bonus, rechargement, rechargement automatique     |
| **Moyens de paiement** | `/wallet/payment-methods` | Cartes enregistrées, rechargements en attente            |
| **Historique**      | `/history`                | Onglets **Trajets** et **Paiements** ; toucher un trajet pour ses détails, carte du parcours et décomposition du coût |
| **Profil**          | `/profile`                | Infos du compte, photo, mot de passe, suppression du compte |
| **Paramètres**      | `/settings`               | Notifications, affichage de la carte, langue, thème      |
| **Sessions**        | `/settings/sessions`      | Tous les appareils connectés                              |
| **Confidentialité** | `/privacy`                | Politique de confidentialité et consignes de sécurité   |
| **Assistance**      | `/support`                | Onglets **FAQ** et **Contact**, plus chat en direct     |

Toutes ces sections s'ouvrent depuis le **menu latéral** sur la carte. Il n'y a pas de barre d'onglets en bas dans l'application.

## Les règles qui régissent un trajet

Ce sont des règles réelles, basées sur votre configuration. Consultez les valeurs dans le tableau de bord plutôt que de citer un chiffre de mémoire.

| Règle                          | Source                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Solde minimum pour démarrer** | Le solde minimum de départ du tarif, appliqué uniquement aux riders sans carte liée. Quand le tarif ne le définit pas, la règle est simplement « solde supérieur à zéro ». Lisez la valeur dans le tarif — voir [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Où un trajet peut se terminer** | Vos zones. Terminer en dehors d'une zone de stationnement autorisée est refusé et l'application affiche un dialogue dédié — voir [Zones](../../settings/infrastructure/zones.md) |
| **Photos avant et après un trajet** | Vos paramètres d'entreprise : photos du véhicule et selfie au début du trajet, et photos de stationnement à la fin. Chacune peut être activée, rendue obligatoire, et avoir un nombre de photos défini. Par défaut, toutes sont activées, avec une photo et non obligatoires |

Une règle supplémentaire à retenir concernant les photos : quand le selfie de début de trajet est activé, reprendre un trajet après une pause demande aussi un selfie, et **celui-ci ne peut pas être sauté**.

Étape par étape pour tout ce qui précède : [Rides](../riding/rides.md).

## Avant de conseiller un utilisateur

- **Il vaut la peine d'activer les notifications** — les bascules de notification de trajet et de promotion dans [Paramètres](../help/settings.md) sont réelles et fonctionnent
- **Les totaux se trouvent dans l'Historique**, pas sur un écran d'Analytique
- **Le téléchargement de documents n'est pas encore disponible dans l'application** — ne dites jamais à un utilisateur qu'un document a été reçu ou est en cours d'examen
- **Les abonnements et codes promo ne sont pas encore disponibles dans l'application**

## Étapes suivantes

- [Connexion](../account/registration-login.md) — chaque méthode de connexion, champ par champ
- [Intégration et vérification](../account/onboarding-verification.md) — ce que chaque étape d'intégration demande
- [Portefeuille](../money/wallet.md) — premier rechargement
- [Assistance](../help/support.md) — comment les utilisateurs contactent votre équipe
