# Conversations

La page Conversations (`/support/conversations`) est le **messager opérateur** — une interface de chat en temps réel entre votre équipe d'assistance et vos utilisateurs. Chaque conversation appartient à un client et contient l'historique complet des messages, les actions de votre équipe et les changements de statut.

Permission requise : **Conversations** (`x2y3z4`).

## Comment les conversations apparaissent ici

Les conversations arrivent par plusieurs flux :

1. **L'utilisateur ouvre un chat** dans l'application mobile — crée une conversation _Nouvelle_, mise en file d'attente en _Attente_
2. **L'opérateur initie** — _+ Nouveau_ dans la barre latérale vous permet de démarrer un chat avec un client spécifique (par exemple pour un suivi sur une amende ou une vérification de fraude)
3. **Rouverte** — les conversations fermées peuvent être rouvertes (par l'utilisateur ou l'opérateur) et remontent en haut de la liste

La liste est **en direct** — les nouvelles conversations et messages entrants arrivent via WebSocket sans actualisation.

## Disposition

La page comporte deux zones principales. La disposition s'adapte à la taille de l'écran :

- **Bureau** — vue partagée, barre latérale à gauche (30 %) et contenu du chat à droite (70 %), avec une poignée de redimensionnement
- **Mobile** — une zone à la fois : la liste dans la barre latérale, ou le chat ouvert (flèche retour pour revenir à la liste)

## Barre latérale (gauche)

La file d'attente des conversations et les filtres :

- **+ Nouveau** — ouvre une boîte de dialogue pour rechercher un client et démarrer une nouvelle conversation (statut _Attente_)
- **Recherche** — recherche textuelle sur le nom du client, l'ID, le dernier message
- **Filtres de statut** — pastilles avec compteurs : `Tous` / `Nouveau` / `Attente` / `Actif` / `Retardé` / `Fermé`
- **Cartes de conversation** — affichent : avatar, nom du client, aperçu du dernier message, pastille de statut, horodatage, badge non lu. Cliquez pour ouvrir
- **Charger plus** — pagination au défilement

Le tri par défaut place en haut les conversations sans réponse (Attente / Actif avec non lus) — les chats les plus urgents sont toujours visibles.

### Référence des statuts

| Statut      | Signification                                               |
| ----------- | ----------------------------------------------------------- |
| **Nouveau** | Juste ouvert, personne n'a encore lu                        |
| **Attente** | Non attribué, en file d'attente pour qu'un opérateur prenne |
| **Actif**   | Assigné à un opérateur, conversation en cours              |
| **Retardé** | Opérateur en pause (en attente d'info, suivi ultérieur)     |
| **Fermé**   | Résolu et fermé                                             |

## Contenu du chat (droite)

Lorsque vous sélectionnez une conversation, la colonne de droite affiche :

### En-tête du chat

- **Flèche retour** (mobile uniquement) — revient à la liste dans la barre latérale
- **Titre** — nom du client avec la pastille de statut de la conversation
- **Infos ouvertes** — ouvre la [barre latérale Infos utilisateur](#panneaux-dinformation) avec le contexte complet du client
- Boutons **Retarder / Transférer / Fermer** selon le statut

### Fenêtre de chat

- **Bulles de message** — messages opérateur à droite (couleur accentuée), messages utilisateur à gauche ; avec horodatages et indicateurs de lecture
- **Indicateur de saisie** — montre quand l'utilisateur tape
- Bouton **Charger plus ancien** en haut — récupère les messages plus anciens à la demande
- Bouton **Vers les nouveaux messages** — raccourci pour descendre en bas quand vous avez fait défiler vers le haut
- **Actions sur message** au survol — Modifier / Supprimer vos propres messages

### Réponses préenregistrées

Une rangée au-dessus de la zone de saisie affiche des modèles de réponses rapides groupés par catégorie. Cliquez sur un modèle pour insérer le texte dans la saisie — vous pouvez modifier avant d'envoyer.

### Pied de chat

Ce qui apparaît dans le pied dépend du **statut** de la conversation et de son attribution :

- **Actif + attribué à vous** → **Zone de saisie de message** avec menu de pièces jointes (texte + image / fichier)
- **Autre cas** → barre **Actions de conversation** avec les boutons pertinents à l'état actuel

## Actions de conversation (par statut)

Le pied affiche les bons boutons selon le statut actuel. Actions courantes :

| Action        | Disponible quand…                   | Ce que ça fait                                         |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| **Accepter**  | Attente / Nouveau (pas encore à vous) | Assigne la conversation à vous et passe en _Actif_    |
| **Prendre en charge** | Actif (un autre opérateur l'a) | Réassigne à vous                                      |
| **Retourner** | Actif (attribué à vous)            | Libère la conversation vers _Attente_                 |
| **Retarder**  | Actif                             | Met la conversation en pause → _Retardé_              |
| **Rouvrir**   | Fermé                             | Ramène en _Actif_                                      |
| **Fermer**    | Actif                             | Marque la conversation comme résolue → _Fermé_        |
| **Supprimer** | Permission requise                | Suppression douce de la conversation (style admin)    |
| **Nouveau**   | Toujours                          | Démarre une nouvelle conversation avec le même client |

Vous êtes protégé contre l'action sur un chat qui n'est pas à vous — vous verrez un bouton _Prendre en charge_ au lieu de la zone de saisie quand le chat est attribué à quelqu'un d'autre.

## Panneaux d'information

Deux panneaux coulissants s'ouvrent depuis les actions de la fenêtre de chat :

- **Barre latérale Infos utilisateur** — contexte rapide pour l'opérateur assigné (vous), et l'activité récente de l'utilisateur dans ce chat
- **Fiche d'information client** — aperçu complet du profil client (solde, statut, étiquettes, trajets récents) sans quitter le chat — pratique pour des décisions rapides

## État vide (bureau)

Quand aucun chat n'est sélectionné sur bureau, le panneau de droite affiche une illustration d'état vide avec une invite à choisir une conversation. Sur mobile, le panneau de droite n'existe pas tant qu'une conversation n'est pas sélectionnée — la liste dans la barre latérale occupe tout l'écran.

## Flux de travail typiques

- **Prendre un chat en attente** — `Status = Waiting` → cliquer sur la carte en haut → _Accepter_ → commencer à discuter
- **Reprendre une conversation d'un collègue** — ouvrir le chat (vous verrez qu'il appartient à quelqu'un d'autre) → _Reprendre_ (à utiliser avec parcimonie ; cela perturbe la continuité du rider)
- **Mettre en pause une conversation lente** — quand le rider ne répond plus, _Différer_ pour la sortir de votre file active ; elle revient dans votre boîte de réception quand il répond
- **Clore la conversation** — problème résolu → _Clore_ avec une réponse rapide préenregistrée ("Tout est réglé, bon trajet !")
- **Obtenir rapidement le contexte du rider** — _Ouvrir les infos_ dans l'en-tête → voir le solde / trajets récents / étiquettes avant de répondre à une question de facturation
- **Utiliser les réponses préenregistrées** — pour les réponses répétitives (politique de remboursement, procédure objet perdu), choisir un modèle et le personnaliser

## Conseils

- **En direct par défaut** — les nouveaux messages arrivent sans actualisation ; le compteur de badge se met à jour automatiquement
- **Non répondu en premier** — le tri garde les chats urgents en haut ; faites confiance à l'ordre de la liste
- **Les réponses préenregistrées sont des modèles, pas des scripts** — personnalisez toujours la salutation et la phrase de clôture ; les riders sentent quand c’est du standard
- **Reprendre avec précaution** — le rider ne voit pas l’état opérateur. Changer en cours de conversation peut être déstabilisant ; ne reprendre que si l’opérateur actuel est clairement bloqué (hors ligne, hors service)
- **Différer > Clore en cas d’incertitude** — si vous pensez que le problème peut revenir, _Différer_ garde le fil lié ; _Clore_ oblige le rider à ouvrir une nouvelle conversation s’il veut continuer
- **Modifier uniquement vos propres messages** — et corriger seulement de petites fautes ; réécrire un ancien message après que le rider l’a lu peut nuire à la confiance
- **L’URL contient l’ID de la conversation** — collez-la dans un ticket ou une note d’escalade pour que le prochain opérateur puisse accéder directement
