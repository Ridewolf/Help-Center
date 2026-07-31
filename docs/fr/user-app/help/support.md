# Rider App — Assistance, FAQ & Chat en direct

L’**Assistance** (`/support`) est l’endroit où un utilisateur vient chercher de l’aide. Elle comporte deux onglets — **FAQ** et **Contact** — et le chat en direct s’ouvre sur un écran dédié (`/support/messenger`).

Deux choses à savoir avant de répondre à une question sur l’assistance :

- **Chaque canal de contact est à configurer par vous.** Il n’existe pas d’e-mail, numéro de téléphone ou horaires d’ouverture Ridewolf globaux dans l’application — ne les communiquez jamais.
- **L’application propose un chat, pas un formulaire de ticket.** Les utilisateurs ne reçoivent pas de numéro de ticket. La vue de votre équipe sur ces conversations est [Conversations](../../support/tickets-proofs-chat/conversations.md) ; [Tickets](../../support/tickets-proofs-chat/tickets.md) est un concept côté opérateur.

## Onglet FAQ

Sections accordéon construites à partir de votre contenu publié de questions-réponses, plus des éléments **Guide de conduite** répartis en groupes **Avant le départ** et **Avant la fin**.

Vous contrôlez tout cela sans mise à jour de l’application :

- Questions et réponses — [Ensembles de FAQ](../../settings/content/faq-sets.md)
- Parcours du Guide de conduite — [Guides rapides](../../settings/content/quick-guides.md)

Les éléments FAQ individuels sont **liens profonds** : un lien vers un élément spécifique ouvre l’Assistance avec cet élément déjà déployé et visible. C’est la bonne façon d’envoyer un utilisateur directement à une réponse au lieu de « consulter la FAQ ».

## Onglet Contact

Chaque canal ici s’affiche uniquement si vous l’avez activé dans [Mon entreprise → Application → canaux d’assistance](../../settings/administration/my-company.md).

| Canal         | Fonctionnement                                                    |
| ------------- | ---------------------------------------------------------------- |
| **Chat en direct** | Ouvre le messager (`/support/messenger`)                      |
| **E-mail**    | Ouvre l’application mail de l’utilisateur avec votre adresse    |
| **Site web**  | Ouvre votre URL configurée dans le navigateur intégré            |
| **Telegram**  | Ouvre votre contact Telegram en externe                         |
| **WhatsApp**  | Ouvre votre contact WhatsApp en externe                         |
| **Téléphone** | Lance un appel vers votre numéro configuré                      |

Si **aucun** canal n’est activé, l’onglet affiche une illustration sans contacts. Un utilisateur signalant « il n’y a aucun moyen de contacter l’assistance » est presque toujours sur une entreprise avec tous les canaux désactivés — vérifiez votre propre configuration avant de chercher ailleurs.

## Chat en direct

Le messager est basé sur des conversations :

- L’utilisateur voit sa **liste de conversations**, chacune avec un statut, l’opérateur assigné, le dernier message et son heure, ainsi qu’un compteur de non lus.
- **Nouveau chat** est proposé **uniquement lorsque l’utilisateur n’a aucune conversation ouverte.** Un utilisateur avec un fil ouvert ne voit pas comment en démarrer un second — c’est voulu. Il continue le fil existant.
- L’ouverture d’une conversation charge son historique de messages, 50 messages à la fois, récupérant les plus anciens au fur et à mesure que l’utilisateur fait défiler vers le haut.

| Statut de la conversation | Signification                         |
| ------------------------- | ----------------------------------- |
| **Nouveau**               | Juste ouvert, pas encore pris en charge |
| **En attente**            | En attente de votre équipe           |
| **Actif**                 | En cours de traitement               |
| **Retardé**               | Différé                             |
| **Fermé**                 | Fermé par un opérateur               |

**Types de messages affichés par l’application :** texte, image, fichier, localisation, contact, trajet, lien d’application et messages système.

**Icônes de statut des messages :** envoi, envoyé, livré, lu et échoué.

### Envoyer un message

Un utilisateur peut joindre :

- Jusqu’à **5 images par message**
- Une **épingle de localisation** (latitude, longitude et un label)
- Un **fichier**

Un message envoyé apparaît immédiatement comme _en cours d’envoi_, puis se met à jour avec son vrai statut dès confirmation du serveur. La même connexion en direct gère les mises à jour de nouveaux messages et de lecture, les notifications de conversation fermée et assignée, ainsi que l’indicateur "_{nom} est en train d’écrire…_".

Après une perte de connexion, l’application recharge la liste des conversations et le chat ouvert, en supprimant les doublons par message — ainsi un utilisateur qui s’est déconnecté ne verra pas le même message deux fois.

Quand un opérateur **ferme** la conversation, la saisie de l’utilisateur est désactivée et un avis « conversation fermée » la remplace.

## Dépannage

| L’utilisateur dit…                         | Ce que c’est                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| « Il n’y a aucune option de contact »     | Aucun canal n’est activé pour votre entreprise — corrigez cela dans [Mon entreprise](../../settings/administration/my-company.md) |
| « Il n’y a pas de bouton Nouveau chat »   | L’utilisateur a déjà une conversation ouverte ; il doit continuer ce fil                                     |
| « Je ne peux plus taper »                 | Un opérateur a fermé la conversation. Un nouveau peut être démarré une fois qu’aucun fil n’est ouvert          |
| « Mon message affiche échoué »            | Il n’a jamais quitté l’appareil — réessayez                                                                |
| « Mes messages se sont dupliqués après reconnexion » | Ce n’est pas le cas ; le rechargement supprime les doublons. Demandez une capture d’écran s’ils insistent |
| « À quelle vitesse répondez-vous ? »     | Aucun délai de réponse n’est défini dans l’application. **Ne promettez pas de délai** — citez votre propre engagement de service publié |
| « Où signaler une urgence ? »              | Par les canaux que vous avez activés. L’application ne définit pas de numéro d’urgence, et aucun numéro d’urgence ne doit être communiqué |

## Conseils

- **Vérifiez votre onglet Contact.** Ouvrez vous-même l'application Rider après toute modification dans Mon entreprise — un onglet Contact entièrement vide est invisible pour vous et exaspérant pour les riders.
- **Lien direct vers les réponses FAQ** dans les réponses du chat au lieu de les retaper. Cela apprend aux riders où se trouve la réponse.
- **Une seule conversation ouverte à la fois** est la règle. Lorsqu'un rider doit soulever un sujet non lié, fermez d'abord l'ancien fil.
- **Gardez les Ensembles de FAQ et les Guides rapides à jour** — chaque question qu'ils répondent est un chat que vous n'aurez jamais.
- **Fermer une conversation met fin à la possibilité pour le rider de répondre.** Assurez-vous que la réponse est complète avant de fermer.
