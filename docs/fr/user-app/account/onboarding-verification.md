# Intégration et vérification du conducteur

L'intégration est l'ensemble des écrans qu'un nouveau conducteur traverse après sa première connexion réussie, avant d'accéder à la carte. Certaines étapes sont conditionnelles, donc le nombre d'écrans varie selon les opérateurs.

Lisez ceci avant de répondre à toute question sur la vérification du conducteur ou le téléchargement de documents — la réponse honnête n'est souvent pas celle attendue par le conducteur.

La connexion elle-même est couverte dans [Signing in](registration-login.md).

## L'ordre des étapes

| # | Étape                | Route                        | Quand elle apparaît                                                      |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Code d'invitation**| `/onboarding/invite`         | Actuellement indisponible dans l'application — les conducteurs vont directement à **À propos de moi** |
| 2 | **À propos de moi**   | `/onboarding/about-me`       | Toujours. **C'est ici que le compte est créé**                          |
| 3 | **Permis de conduire**| `/onboarding/driver-license` | Seulement si activé dans les paramètres de votre entreprise (par défaut non) |
| 4 | **Passeport**         | `/onboarding/passport`       | Seulement si activé de la même manière                                  |
| 5 | **Autorisations**     | `/onboarding/permissions`    | Toujours                                                                 |
| 6 | **Félicitations**     | `/onboarding/congratulations`| Toujours, puis vers `/map`                                               |

Notez l'ordre : l'inscription et les informations personnelles viennent **avant** les documents, et les autorisations viennent **après** — pas l'inverse.

## À propos de moi — l'étape qui crée le compte

Un assistant en trois étapes :

1. **Photo** — optionnelle, peut être sautée
2. **Nom et date de naissance** — **Prénom** obligatoire ; **Nom de famille** et **Deuxième prénom** optionnels ; **Date de naissance** obligatoire, ne peut pas être postérieure à aujourd'hui
3. **Contact** — **E-mail** optionnel ; téléphone saisi via le sélecteur de préfixe pays et validé comme numéro international ; la case de consentement marketing est **obligatoire** pour continuer

À la soumission, le compte est créé. Si une photo a été choisie, elle est téléchargée juste après — un échec du téléchargement de la photo ne bloque **pas** l'inscription, le compte est quand même créé.

L'écran suivant dépend des paramètres de votre entreprise : **Permis de conduire** si activé, sinon **Passeport** si activé, sinon directement **Autorisations**.

### « Quel est mon mot de passe ? »

Un conducteur qui s'est inscrit ici n'a jamais été invité à choisir un mot de passe. S'il souhaite ensuite utiliser l'onglet de connexion par e-mail et mot de passe, il doit d'abord définir un mot de passe via **Mot de passe oublié** — voir [Signing in](registration-login.md).

## Permis de conduire et passeport

Chacun de ces écrans est un assistant en trois étapes — photo avant, photo arrière, puis un selfie tenant le document — et chaque étape accepte une capture caméra ou une photo depuis la galerie. **Soumettre** reste bloqué tant que les trois images ne sont pas présentes ; le conducteur voit un message « toutes les photos sont requises » jusqu'à ce moment, et l'étape ne peut pas être sautée.

**Le téléchargement de documents n'est pas actuellement disponible dans l'application.** La soumission affiche une erreur et laisse le conducteur sur la même étape. Il n'y a pas de nouvelle tentative réussie, et aucune image de document n'atteint vos systèmes.

Ce que cela signifie en pratique :

- Ne jamais dire à un conducteur (ou un collègue) qu'un document a été reçu, est en cours de révision ou est stocké — rien n'a été téléchargé
- Un conducteur bloqué sur cet écran ne fait rien de mal : ce n'est pas un problème de qualité photo, de caméra ou de réseau
- Toute vérification d'identité réelle doit être effectuée par votre équipe en dehors de l'application
- Si vos paramètres d'entreprise activent actuellement ces étapes, les conducteurs de votre opérateur ne peuvent pas terminer l'intégration via elles. Désactivez ces étapes supplémentaires dans **Paramètres → Mon entreprise → Application → Étapes supplémentaires d'inscription** ([My Company](../../settings/administration/my-company.md)) sauf si vous avez une raison de les garder

## Autorisations

L'écran demande trois autorisations : **notifications**, **localisation** et **caméra**. **Continuer** ne devient disponible que lorsque les trois sont accordées.

**Problème connu :** les boutons **Continuer** et **Passer** ramènent actuellement le conducteur à l'assistant **À propos de moi** au lieu d'aller vers **Félicitations**. Un conducteur qui vient d'accorder les trois autorisations peut se retrouver au début de l'assistant des informations personnelles. C'est un problème connu de l'application, pas une erreur du conducteur — dites-le plutôt que de faire tourner le conducteur en rond.

L'autorisation de localisation est importante au-delà de l'intégration : sans elle, un trajet ne peut pas être démarré. Voir [Rides](../riding/rides.md).

## Félicitations

Un écran d'affichage uniquement. Il efface les données d'intégration, affiche un avis « compte en cours de révision » et propose **Continuer**, qui ouvre la carte.

L'avis ne précise pas la durée d'une révision, et vous ne devriez pas non plus — il n'y a pas de délai publié. Et comme aucun document n'a été téléchargé, il n'y a rien dans une file d'attente de révision pour l'instant.

## Compte bloqué — `/onboarding/account-blocked`

Affiché lorsque le compte du conducteur est signalé comme bloqué. C'est un écran d'affichage listant les raisons possibles :

- Violation des conditions
- Fraude
- Échecs de paiement répétés
- Comportement suspect
- Problèmes de sécurité

Sous les raisons, un accordéon **Contacter l'assistance** est construit à partir des mêmes **Canaux d'assistance** que vous configurez pour l'écran Assistance — téléphone, e-mail, Telegram, WhatsApp et site web, chacun activé indépendamment — donc les canaux affichés dépendent de votre configuration. Un bouton **Retour à la connexion** est fourni.

Il n'y a pas de procédure d'appel dans l'application. La seule voie pour le rider est de contacter votre équipe via l'un de ces canaux. De votre côté, examinez et débloquez le client depuis le tableau de bord — voir [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Comment fonctionne la vérification du rider ?** Pas dans l'application. Le compte est créé dans **À propos de moi** ; les étapes de documents ne peuvent pas être complétées car le téléversement de documents n'est pas encore disponible dans l'application. Effectuez les vérifications d'identité en dehors de l'application.
- **Pourquoi un rider voit-il une étape passeport et un autre non ?** Les étapes de documents sont définies par opérateur, dans **Étapes supplémentaires d'inscription**.
- **Un rider est bloqué sur l'écran permis de conduire ou passeport.** C'est normal. La soumission échoue toujours à cet endroit — ce n'est pas réparable par le rider.
- **Le rider peut-il passer l'étape des documents ?** Non. Les trois images sont requises avant la soumission, qui échoue sinon.
- **Combien de temps prend la revue ?** L'application ne l'indique pas, ne donnez donc pas de durée.
- **Le rider dit que la qualité de sa photo a été rejetée.** L'application n'évalue pas du tout la qualité des images. Ce qu'il a vu est une erreur de téléversement.
- **Quelle étape crée réellement le compte ?** **À propos de moi**, étape 3, lors de la soumission.
- **L'écran du code d'invitation n'apparaît jamais.** Les codes d'invitation ne sont pas encore disponibles dans l'application.

## Liens connexes

- [Getting started](../basics/getting-started.md) — la version courte de ce processus
- [Signing in](registration-login.md) — méthodes de connexion, codes, réinitialisation de mot de passe
- [Profile](profile.md) — ce que le rider peut modifier ensuite
- [Support](../help/support.md) — les canaux affichés sur l'écran Compte bloqué
