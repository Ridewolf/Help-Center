# Application de service — Vue d'ensemble, connexion et navigation

L'application de service est l'application Ridewolf destinée aux opérateurs sur le terrain — ce que le technicien utilise dans la rue pour échanger les batteries, déverrouiller les trottinettes, résoudre les pannes et clôturer les tickets. C'est un produit distinct de l'application Rider et du Tableau de bord opérateur : elle possède sa propre connexion et sa propre navigation.

Après la connexion, l'application s'ouvre directement sur la carte de la flotte (`/battery-swap`) plutôt que sur un tableau de bord d'accueil, car sur le terrain, la carte est le point de départ de chaque tâche.

Où aller ensuite :

- [Carte de la flotte et recherche par QR](../fleet/fleet-map.md) — trouver un véhicule
- [Page véhicule](../fleet/vehicle-controls.md) — commandes, tickets, pannes, alertes
- [Échange de batterie](../operations/battery-swap.md) — la séquence chronométrée d'échange
- [Trouver une trottinette](../operations/finder.md) — radar Bluetooth pour les derniers mètres
- [Mode lot](../operations/batch-mode.md) — une file d'attente de véhicules à traiter
- [Outils back-office](../tools/back-office-tools.md) — rejouer, analytique, files d'assistance

## Connexion

L'écran de connexion (`/login`) s'affiche uniquement aux opérateurs déconnectés — si vous êtes déjà connecté, l'application vous dirige vers la carte de la flotte.

1. Saisissez votre **e-mail professionnel**. Il doit être une adresse complète (avec un arobase et un point), sinon le champ est rejeté avant l'envoi.
2. Saisissez votre **mot de passe** — au moins 6 caractères.
3. Validez. Seuls les comptes opérateurs fonctionnent ici ; les identifiants de rider sont refusés.
4. Votre profil se charge (nom, rôle, poste, département, entreprise, permissions), et l'application ouvre la carte de la flotte.

### Connexion Google et Apple

Les boutons **Google** et **Apple** apparaissent uniquement lorsque cette méthode de connexion est activée pour votre installation. L'absence d'un bouton n'est pas une configuration par opérateur — personne dans votre entreprise ne le verra.

- **Dans l'application** — appuyer sur le bouton ouvre la page du fournisseur dans le navigateur de votre téléphone, et l'application attend que le navigateur renvoie la connexion. L'attente expire après 5 minutes (avec une courte période de grâce une fois l'application revenue au premier plan). Si l'application a été fermée pendant que le navigateur était ouvert, un démarrage à froid termine quand même la connexion.
- **Dans un navigateur** — la connexion Google s'ouvre dans une fenêtre popup.

Dans tous les cas, le reste du processus est identique à une connexion par mot de passe.

## Le tiroir de navigation

Chaque écran possède un bouton de menu qui ouvre le tiroir de navigation — un panneau qui glisse depuis la gauche. Contenu, de haut en bas :

| Élément              | Ouvre                  | Notes                                               |
| -------------------- | ---------------------- | -------------------------------------------------- |
| **Votre profil**     | `/profile`             | Avatar, nom et e-mail                              |
| **Driver App**       | `/battery-swap`        | La carte de la flotte — « Gérez votre flotte en déplacement » |
| **Lecteur de rejouage** | `/replay-player`    | Rejouer la journée d'un véhicule                   |
| **Trouver une trottinette** | `/finder`        | « Localiser une trottinette via Bluetooth »        |
| **Rééquilibrage**    | `/rebalancing`         | Réservé au propriétaire, désactivé, affiche un badge **Bientôt** |
| **Assistance**       | `/support/tickets`     | Réservé au propriétaire                             |
| **Conversations**    | `/support/dialogs`     | Réservé au propriétaire                             |
| **Preuves de stationnement** | `/support/park-proofs` | Réservé au propriétaire                         |
| **Analytique**       | `/analytics`           | Réservé au propriétaire                             |

Trois autres contrôles se trouvent dans un pied de page épinglé sous la liste défilante :

- **Paramètres** — ouvre le tiroir des Paramètres de l'application (voir ci-dessous)
- **Préférences de la carte** — ouvre la feuille des paramètres de la carte, décrite dans [Carte de la flotte](../fleet/fleet-map.md#préférences-de-la-carte)
- **Déconnexion** — stylée en rouge

Deux particularités d'étiquetage valent la peine d'être mémorisées, car elles causent la plupart des questions « Je ne le trouve pas » : la carte de la flotte est listée comme **Driver App**, pas « Échange de batterie », et le radar Bluetooth est listé comme **Trouver une trottinette**, pas « Finder ». Chaque élément porte aussi une description d'une ligne sous son étiquette.

Les huit éléments de navigation forment une liste plate, pas des groupes imbriqués — **Assistance**, **Conversations** et **Preuves de stationnement** sont au même niveau même si leurs routes sont toutes sous `/support`. L'élément correspondant à votre écran actuel reçoit un fond accentué.

Deux règles expliquent la plupart des rapports « le menu est différent sur mon téléphone » :

- **Les éléments réservés au propriétaire sont entièrement cachés** pour les autres opérateurs — ils ne sont pas grisés, donc rien à toucher ni à demander.
- **Les éléments désactivés affichent un badge Bientôt** à la place du chevron habituel.

## Page de profil

Ouvrez `/profile` depuis le bouton profil du tiroir.

- **En-tête** — un grand avatar (vos initiales s'il n'y a pas de photo) avec un bouton caméra pour en téléverser une. Images uniquement, 5 Mo maximum. Un badge de statut est à côté, plus un badge propriétaire pour les propriétaires.
- **Compte** — rôle, département, poste, téléphone, nombre de permissions, date d'adhésion, et votre ID utilisateur avec un bouton copier (utile quand l'assistance le demande).
- **Espaces de travail** — si vous appartenez à plusieurs entreprises, changez ici. L'application recharge sous l'entreprise choisie.
- **Sécurité** — **Verrouillage de l'application**, **Changer le code PIN**, **Changer le mot de passe**, **Sessions actives**.
- **Plus** — **Apparence et langue**, qui ouvre le même tiroir des Paramètres de l'application que l'élément **Paramètres** du tiroir.
- **Déconnexion** en bas.

### Verrouillage de l'application

Le **Verrouillage de l'application** est disponible uniquement dans l'application installée, donc la section est absente dans un navigateur. L'activer lance un court assistant qui enregistre un code PIN et la biométrie de votre appareil. Une fois enregistré, utilisez **Changer le code PIN** pour modifier le code.

### Changer le mot de passe

1. Ouvrez **Changer le mot de passe** dans la section Sécurité.
2. Saisissez votre mot de passe actuel, puis le nouveau deux fois.
3. Validez.

Les trois champs exigent au moins 8 caractères, le nouveau mot de passe doit être différent de l'actuel, et la confirmation doit correspondre. La boîte de dialogue efface ses champs et erreurs à chaque ouverture et fermeture, donc rien de ce que vous avez tapé ne reste sur un téléphone partagé.

### Sessions actives

Les sessions sont regroupées par navigateur, système d'exploitation et fournisseur d'appareil. Chaque groupe affiche :

- Un badge de compte
- L'emplacement (pays et adresse IP)
- Le temps écoulé depuis la dernière activité
- Un badge **appareil actuel** sur celui que vous utilisez

**Révoquer** est disponible sur chaque groupe sauf l'appareil actuel. **Déconnecter les autres appareils** révoque toutes les autres sessions en une fois — la réponse la plus rapide en cas de perte d'un téléphone.

## Panneau des Paramètres de l'application

Une feuille inférieure, ouverte depuis l'élément **Paramètres** du tiroir ou le bouton **Apparence & Langue** de la page de profil. Chaque contrôle s'applique immédiatement ; il n'y a pas de bouton Enregistrer.

| Paramètre        | Options                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Thème**        | Clair, Sombre, Système                                     |
| **Style de carte** | Par défaut, Rue, Satellite, 3D, Navigation, Plat           |
| **Cartes hors ligne** | Télécharger la carte autour de votre position actuelle pour une utilisation hors ligne |
| **Langue**       | Auto, English, Română, Russian                             |
| **Mon marqueur** | Une grille de 6 icônes pour la façon dont votre position est affichée |

**Cartes hors ligne** télécharge une région autour de votre position actuelle et la conserve en cache. Pendant le téléchargement, vous voyez un compteur de tuiles téléchargées et un bouton **Annuler**. Désactiver ce paramètre annule tout téléchargement en cours et efface la région mise en cache.

L'apparence de la carte pour les véhicules (marqueurs, superpositions, regroupement, fréquence de rafraîchissement) se trouve dans la feuille distincte **Préférences de la carte** — voir [Fleet map](../fleet/fleet-map.md#préférences-de-la-carte).

## Déconnexion

La **Déconnexion** se trouve dans le tiroir de navigation et à nouveau en bas de la page de profil. Elle désactive le verrouillage de l'application, vous déconnecte et vous ramène à l'écran de connexion avec votre session effacée de l'appareil.

## Problèmes courants

| Symptôme                                        | Cause                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Pas de bouton **Google** ou **Apple**           | Cette méthode de connexion n'est pas activée pour votre installation    |
| Un élément de menu qu'un collègue a vous manque | Il est réservé au propriétaire                                          |
| Un élément ne s'ouvre pas et affiche **Bientôt** | Il est délibérément désactivé pour le moment                            |
| Pas de section **Verrouillage de l'application** sur la page de profil | Vous utilisez la version navigateur ; le verrouillage nécessite l'application installée |
| Connexion refusée avant tout chargement          | La forme de l'e-mail ou le mot de passe de 6 caractères minimum a échoué sur l'appareil |
| Les libellés du menu ne correspondent pas à ce que vous attendiez | La carte de flotte est **Driver App** ; le radar Bluetooth est **Find Scooter** |
