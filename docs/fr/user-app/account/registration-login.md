# Connexion — Codes, mots de passe et connexion via Messenger

Tout ce qu'un utilisateur traverse avant d'atteindre la carte : choisir une méthode de connexion, confirmer un code à usage unique, remplir un profil minimal, récupérer un mot de passe ou arriver depuis un bot Telegram ou Viber.

Utilisez cet article lorsqu'un utilisateur ne parvient pas à accéder à l'application. Ce qui se passe *après* la première connexion réussie est couvert dans [Onboarding and verification](onboarding-verification.md).

## Méthodes de connexion visibles par un utilisateur

Les onglets de l'écran de connexion (`/auth/login`) sont construits à partir des **Méthodes d'authentification** que vous activez dans **Paramètres → Mon entreprise → Application**. Tous les utilisateurs ne voient pas toutes les méthodes. Les méthodes possibles sont :

- Code à usage unique par **téléphone**
- Code à usage unique par **e-mail**
- Code à usage unique via **WhatsApp**
- **E-mail et mot de passe**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Si un utilisateur signale qu'une méthode manque, elle n'est pas activée pour cet opérateur. Activez-la dans [Mon entreprise](../../settings/administration/my-company.md) — l'utilisateur ne peut rien faire de son côté.

## Champs sur chaque onglet

| Onglet                   | Champs                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Téléphone**            | Numéro de téléphone (au moins 6 caractères) plus un choix de livraison — envoyer le code par **téléphone** ou par **WhatsApp** |
| **E-mail**               | Adresse e-mail                                                                                |
| **Mot de passe** — connexion | E-mail et mot de passe                                                                       |
| **Mot de passe** — inscription | **Prénom** (obligatoire, au moins 2 caractères), **Nom de famille** (optionnel), e-mail, mot de passe |

Téléphone et WhatsApp sont des **canaux de livraison distincts**. Un utilisateur qui attend un SMS alors que le choix de livraison est WhatsApp attendra indéfiniment.

Les boutons **Google** et **Apple** apparaissent lorsque ces méthodes sont activées. Si un utilisateur quitte la fenêtre du fournisseur, rien ne se passe et aucune erreur n'est affichée — c'est normal, il a simplement annulé.

## Nouvel utilisateur ou utilisateur de retour

Avant d'envoyer un code, l'application vérifie si le contact appartient à un compte existant.

- **Utilisateur de retour** — le code est envoyé immédiatement
- **Nouvel utilisateur** — un court dialogue d'inscription apparaît d'abord et collecte le **Prénom**, le **Nom de famille** et le contact manquant : un e-mail si le code est envoyé par téléphone, un téléphone si le code est envoyé par e-mail

## La vérification de sécurité

Un CAPTCHA doit se charger sur l'écran de connexion avant qu'un code à usage unique puisse être demandé. S'il ne se charge pas — réseau bloqué, moteur de navigateur très ancien, bloqueur de publicité dans le navigateur intégré — la demande de code ne peut pas être envoyée. Demandez à l'utilisateur de rouvrir l'application avec une connexion normale.

## Saisie du code à usage unique — `/auth/otp`

1. L'utilisateur saisit le code — exactement **6 chiffres**, uniquement des chiffres
2. **Renvoyer** devient disponible lorsque le compte à rebours à l'écran atteint zéro
3. Sur le canal téléphone, les téléphones compatibles remplissent automatiquement le code et le soumettent

Ce qui se passe ensuite :

- Un **nouvel utilisateur** continue vers l'écran **Compléter le profil**
- Un **utilisateur de retour** entre directement dans l'application

## Compléter le profil — `/auth/complete-profile`

Affiché uniquement aux nouveaux utilisateurs. Il demande :

- **Prénom** — obligatoire, au moins 2 caractères
- **Nom de famille** — optionnel
- Le contact manquant — un e-mail si le code est arrivé par téléphone, un téléphone si le code est arrivé par e-mail

Les valeurs déjà collectées sont pré-remplies, et le formulaire se soumet automatiquement lorsque le nom et le contact sont déjà présents. Un bouton **Passer** est disponible.

Si le numéro de téléphone d'un utilisateur s'avère manquant plus tard, demandez-lui de vérifier l'écran **Profil** plutôt que de supposer que cette étape l'a enregistré — voir [Profile](profile.md).

## Utilisateurs qui n'ont jamais choisi de mot de passe

Un utilisateur qui a créé son compte via l'onboarding n'a jamais été invité à choisir un mot de passe. S'il souhaite ensuite se connecter via l'onglet **Mot de passe**, il doit d'abord définir un mot de passe via **Mot de passe oublié**. Ne dites pas à un utilisateur de « simplement essayer son mot de passe habituel ».

## Mot de passe oublié — `/auth/forgot-password`

Un champ : l'e-mail du compte. Après envoi, l'écran affiche l'un des trois résultats, qui signifient des choses différentes :

| Ce que voit l'utilisateur | Signification                                  |
| -------------------------- | ---------------------------------------------- |
| **Message vert**           | L'e-mail de réinitialisation a été demandé avec succès |
| **Compte à rebours orange**| Trop de tentatives depuis cet appareil — attendre la fin du minuteur |
| **Erreur rouge**           | La demande a échoué — réessayez                 |

Le compte à rebours orange est conservé sur l'appareil de l'utilisateur, il ne le suit donc pas sur un autre téléphone.

## Réinitialiser le mot de passe — `/auth/reset-password`

L'utilisateur doit ouvrir cet écran depuis le lien dans l'e-mail de réinitialisation. L'ouvrir sans lien valide le renvoie à **Mot de passe oublié** avec un message « lien expiré » — demandez un nouvel e-mail.

Sur l'écran, l'utilisateur saisit un nouveau mot de passe et une confirmation. Les règles du mot de passe sont affichées en direct pendant la saisie, et les deux champs doivent correspondre avant que le formulaire puisse être soumis.

## Connexion via Messenger (Telegram / Viber) — `/auth/messenger-callback`

Lorsqu'un utilisateur démarre depuis votre bot Telegram ou Viber, le lien du bot ouvre une page passerelle, qui ouvre l'application, qui connecte l'utilisateur et le fait entrer dans l'application.

Deux échecs ont leurs propres messages :

- **Compte bloqué** — le conducteur est dirigé vers l'écran **Compte bloqué**, voir [Onboarding and verification](onboarding-verification.md)
- **Accès conducteur requis** — le compte existe mais n'est pas un compte conducteur pour cet opérateur

Tout autre cas affiche un message générique « connexion invalide » ; demandez au conducteur de recommencer depuis le bot avec un nouveau lien.

## Limites de fréquence

Les limites sur les codes à usage unique sont définies par le serveur, pas par l'application. L'écran affiche un compte à rebours basé sur le délai renvoyé par le serveur. **Lisez le compte à rebours au conducteur — ne donnez jamais un nombre fixe de minutes**, car ce n'est pas fixe.

## Dépannage

| Symptôme                         | Ce que cela signifie et que faire                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Une méthode de connexion manque  | Elle n'est pas activée dans vos **Méthodes d'authentification**. Activez-la dans [Mon entreprise](../../settings/administration/my-company.md) |
| Le code n'est jamais arrivé       | Attendez la fin du compte à rebours, puis **Renvoyer**. Vérifiez que le choix de livraison dans l'onglet **Téléphone** est celui attendu par le conducteur — téléphone et WhatsApp sont des canaux distincts |
| « Trop de tentatives »            | Lisez le compte à rebours à l'écran ; la durée d'attente vient du serveur                         |
| La demande de code ne s'envoie pas | Le CAPTCHA sur l'écran de connexion ne s'est probablement pas chargé                            |
| Le conducteur ne connaît pas son mot de passe | Il ne l'a probablement jamais défini. Faites-le passer par **Mot de passe oublié**          |
| Le lien de réinitialisation a expiré | Le conducteur est renvoyé vers **Mot de passe oublié** ; demandez un nouveau lien               |
| Écran **Compte bloqué**           | Voir la section compte bloqué de [Onboarding and verification](onboarding-verification.md)       |
| Connecté mais rien ne charge      | Vérifiez [Sessions](sessions.md) — si le compte a une suppression en attente, certaines parties de l'application sont restreintes ; voir [Profil](profile.md) |
