# Paiements et intégrations

Les onglets **Paiements** et **Intégrations** de la page [Mon entreprise](my-company.md) (`/settings/my-company`, **mode avancé**) contiennent les identifiants tiers : les passerelles de paiement qui facturent vos utilisateurs, et les intégrations de service qui gèrent les connexions, la messagerie et l'assistant IA.

En mode avancé, Mon entreprise comporte quatre onglets — Profil, Configuration de l'application, **Paiements**, **Intégrations**. Cet article couvre les deux derniers.

## Onglet Paiements

1. **Sélectionnez la devise de l'entreprise** — c'est ici que la devise (et son symbole dérivé) est modifiée, **pas dans l'onglet Profil**. Le menu déroulant propose 16 codes : USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configurez une carte par fournisseur de paiement** — **maib**, **mia**, **Stripe**.
3. Chaque carte dispose d'un bouton bascule **activé**, de ses propres champs d'identifiants, et d'une case à cocher **par défaut**.

Exactement **un fournisseur agit comme fournisseur par défaut** pour les nouvelles facturations, et il doit être l'un des fournisseurs activés/supportés.

## Onglet Intégrations

Cinq cartes, chacune avec son propre bouton bascule activé et ses identifiants :

| Carte        | Identifiants                                      | Permet                        |
| ------------ | ------------------------------------------------ | ----------------------------- |
| **Telegram** | jeton du bot, nom d'utilisateur du bot           | Connexion / messagerie Telegram |
| **WhatsApp** | ID du compte professionnel, ID du numéro, jeton d'accès | Connexion / messagerie WhatsApp |
| **Google**   | ID client, secret client                           | Connexion Google pour les utilisateurs |
| **Apple**    | ID client, ID équipe, ID clé, clé privée          | Connexion Apple pour les utilisateurs |
| **OpenAI**   | clé API                                           | Assistant IA du Tableau de bord |

## Chaque carte s'enregistre individuellement

Chaque carte de fournisseur de paiement et d'intégration **s'enregistre individuellement** — aucune ne fait partie de l'enregistrement global de la page. Enregistrer l'onglet Profil ou Configuration de l'application n'enregistre pas ces cartes, et inversement. **Enregistrez chaque carte que vous avez modifiée.**

## Relation avec les méthodes de connexion des utilisateurs

Les méthodes d'authentification de l'onglet Configuration de l'application pour Google, Apple, Telegram et WhatsApp ne fonctionnent que lorsque la **carte d'intégration correspondante est activée et configurée**. Configurez d'abord l'intégration, puis activez la méthode de connexion.

## Secrets

- Les champs secrets sont **masqués visuellement** d'une manière qui empêche également les gestionnaires de mots de passe du navigateur de tenter de les capturer ou de les remplir automatiquement.
- **Lors de la rotation d'un secret, saisissez délibérément la valeur complète** plutôt que de vous fier au placeholder masqué.

## Telegram : deux réglages différents

Indépendamment de la carte Telegram des Intégrations, il existe un flux **de découverte du bot OTP Telegram** : saisissez un jeton de bot, cliquez sur **Vérifier les discussions**, et choisissez une discussion dans le menu déroulant rempli. Ce flux sert à la livraison de mots de passe à usage unique et est un **réglage différent** de la carte Telegram des Intégrations — configurer l'un ne configure pas l'autre.

## Questions fréquentes

- **J'ai modifié un identifiant mais rien n'a changé.** Chaque carte s'enregistre individuellement — confirmez que vous avez enregistré cette carte spécifique, pas seulement la page.
- **La connexion sociale n'est pas disponible pour les utilisateurs.** La carte du fournisseur doit être activée et configurée ici avant que la méthode de connexion correspondante dans Configuration de l'application ne fonctionne.
- **Je ne peux pas sélectionner de fournisseur de paiement par défaut.** Le fournisseur par défaut ne peut être choisi que parmi ceux effectivement configurés comme supportés.
- **Où se trouve le champ de la devise ?** Dans cet onglet Paiements — pas dans l'onglet Profil.
- **"Vérifier les discussions" échoue avec un jeton valide.** Considérez d'abord cela comme un problème d'environnement/connectivité plutôt que de supposer que le jeton est incorrect.
