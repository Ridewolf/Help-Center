# Journaux d'erreurs

Les journaux d'erreurs (`/error-logs`) sont un **outil de diagnostic interne** listant les erreurs signalées par le tableau de bord et l'application mobile Rider — exceptions JavaScript et appels API échoués — avec la trace de la pile, le contexte de la requête et, lorsque disponible, une capture d'écran et une carte de l'emplacement de l'utilisateur.

Utilisez-le lorsqu'une personne signale _« l'application a planté »_ ou _« un problème est survenu »_ et que vous avez besoin de l'erreur réelle derrière cela.

## Où le trouver

- `/error-logs` — la liste
- `/error-logs/:id` — une erreur unique

Il n'y a **aucune entrée dans la barre latérale**. Vous y accédez en tapant directement l'URL — c'est un outil de diagnostic pour les ingénieurs et les administrateurs, plutôt qu'une partie de la navigation normale de l'opérateur (comme [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), c'est une surface non listée).

**Accès :** la page nécessite une clé API de rapport d'erreur configurée pour votre environnement, ainsi que votre session de connexion normale. Si la page ne renvoie rien du tout, la première chose à vérifier est une clé manquante pour cet environnement — demandez à votre administrateur.

## Vue liste

- Liste paginée, commençant à la page 1 avec 100 lignes par page ; le contrôle de pagination gère la taille des pages à partir de là.
- Un menu déroulant **source** filtre selon l'origine de l'erreur : **tableau de bord** ou **app**.
- Un contrôle **rafraîchir** est situé dans l'en-tête. Le rafraîchissement automatique est **désactivé par défaut** ; vous pouvez choisir un intervalle de 10 secondes, ou 1 / 5 / 15 / 30 minutes. Le sondage est suspendu lorsque l'onglet est masqué et rattrape son retard à votre retour, ainsi un onglet en arrière-plan ne continue pas à sonder.

La source plus la page/limite sont les seuls filtres — il n'y a pas de filtre par utilisateur, e-mail ou plage horaire.

## Lecture du badge

Chaque ligne porte un badge qui est votre **signal de triage le plus rapide** :

- Un **nombre** (statut HTTP) → la ligne est un **appel API échoué** ; le problème pointe vers le backend ou la requête.
- Un **mot** → la ligne est côté client ; le type est deviné à partir du texte du message : **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (connexion, authentification), **Network** (réseau, fetch, timeout), **Cancelled**, ou le fourre-tout **Error**.

Considérez les badges mots comme une heuristique approximative sur la chaîne de message, pas une classification envoyée par le rapporteur.

## Vue détail

La page d'erreur unique affiche :

- les métadonnées de l'erreur et la **trace de la pile**
- l'**URL** où elle s'est produite, et l'**agent utilisateur** (analysé en navigateur, OS, appareil, matériel et infos écran)
- une **capture d'écran**, en ligne, lorsqu'une a été jointe au rapport
- une **mini carte** avec un marqueur rouge, lorsque des coordonnées valides ont été capturées — c'est ce qui rend visibles les bugs spécifiques à un emplacement, comme un bord de zone ou une mauvaise localisation GPS

Les horodatages sont affichés au format relatif (il y a ...).

## Référence des champs

- **id** — identifiant de l'erreur
- **source** — `dashboard` ou `app`
- **message** / **stack** — l'erreur et sa trace de pile
- **url** — la page ou le point de terminaison où elle s'est produite
- **userAgent** — l'agent utilisateur brut ; il est analysé pour les infos appareil, et c'est aussi la source des coordonnées de la carte
- **metadata** — le contexte structuré : la requête (méthode, point de terminaison, corps) et la réponse (statut, corps) pour les erreurs API ; id utilisateur / e-mail / rôle quand le rapport a identifié un utilisateur ; versions du tableau de bord et de l'app, runtime, plateforme ; la capture d'écran ; et le contexte WebSocket (code de fermeture / raison, tentative de reconnexion) lorsque l'erreur provient d'un socket
- **clientTimestamp** — pris de l'horloge de l'appareil, donc peut être erroné
- **createdAt** — l'horodatage serveur ; **celui fiable pour l'ordre**

Tous les rapports n'identifient pas un utilisateur — l'e-mail peut être vide.

## Questions fréquentes

- **La page est vide ou non autorisée.** Vérifiez que la clé de rapport d'erreur est configurée pour cet environnement et que vous êtes connecté. Demandez à votre administrateur.
- **Je ne le trouve pas dans le menu.** Il n'y a pas d'entrée de navigation — allez directement à `/error-logs`.
- **Aucune capture d'écran affichée.** Ce rapport n'en contenait pas ; toutes les erreurs n'en ont pas.
- **Aucune carte affichée.** Aucune coordonnée valide n'a été capturée pour ce rapport.
- **Les horodatages ne correspondent pas.** Comparez `createdAt` (serveur) avec `clientTimestamp` (horloge de l'appareil) — une horloge d'appareil déréglée explique l'écart.
- **J'ai besoin des erreurs d'un utilisateur.** Il n'y a pas de filtre utilisateur ou e-mail ; filtrez par source et parcourez la liste.
- **La liste semble obsolète.** Le rafraîchissement automatique est désactivé par défaut — choisissez un intervalle dans le contrôle de rafraîchissement, et souvenez-vous que le sondage est suspendu lorsque l'onglet est en arrière-plan.
- **Un badge indique « Runtime » alors que j'attendais un code de statut.** Cette ligne ne portait aucun contexte requête/réponse, donc le badge a deviné un type à partir du texte du message.
