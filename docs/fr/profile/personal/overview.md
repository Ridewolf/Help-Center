# Votre profil

Le **Profil** est _votre_ compte dans Ridewolf — l'opérateur connecté actuellement. Depuis ici, vous pouvez changer votre nom, photo, mot de passe, thème, sons de notification, et consulter où vous êtes connecté. Si votre compte opérateur est aussi lié à un compte client sur les applications Rider, vous pouvez basculer en vue client du même compte.

Quatre routes partagent cet article, toutes accessibles depuis l'avatar dans la barre supérieure :

| Route               | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — vous redirige automatiquement vers la vue opérateur ou client selon ce que votre compte possède |
| `/profile/operator` | Vue opérateur de vous-même (par défaut pour le personnel)                                        |
| `/profile/customer` | Vue client (uniquement si votre compte est aussi lié à un client rider)                          |
| `/profile/legacy`   | Vue héritée sur une seule page — mêmes données présentées sous forme d’un long formulaire (solution de secours pour les vues redesignées) |

Ceci est la vue **en libre-service**. Pour gérer _d'autres_ opérateurs (vos coéquipiers), utilisez plutôt [Operators](../../settings/access/operators.md).

Pas de restriction d'accès — tout utilisateur connecté peut ouvrir son propre profil.

## Comment `/profile` décide où vous envoyer

Accéder directement à `/profile` ne vous amène jamais sur une page — il redirige immédiatement :

1. Lit `lastPersona` depuis le localStorage de votre navigateur (défini la dernière fois que vous avez utilisé le sélecteur de persona dans l’en-tête principal)
2. Si `lastPersona = customer` et que votre compte a un client lié → `/profile/customer`
3. Si `lastPersona = operator` → `/profile/operator`
4. Sinon : opérateur si vous avez un compte opérateur, client uniquement si vous n’en avez pas
5. Solution de secours par défaut : `/profile/operator`

Vous voyez un indicateur de chargement avec « Redirection en cours... » pendant le bref instant entre l’arrivée et la redirection.

## L’en-tête principal (partagé entre vues opérateur et client)

Un en-tête fixe est placé en haut de `/profile/operator` et `/profile/customer`. Il affiche :

- **Avatar** avec une superposition d’appareil photo au survol — cliquez pour ouvrir la boîte de dialogue **Téléversement d’avatar**
- **Nom** (cliquez pour copier) et **e-mail** (cliquez pour copier) — tous deux ont des info-bulles pour copier dans le presse-papiers
- **Badges** — votre statut (`Actif` / `Inactif`), `Vérifié`, et `Client` si vous êtes en vue client
- **Indicateurs clés rapides** — quatre petites tuiles, contenu dépendant de la persona (voir ci-dessous)
- **Sélecteur de persona** — deux boutons (`Opérateur` / `Client`). Le bouton Client est désactivé avec une info-bulle si votre compte n’a pas de client lié
- **Actions** — bouton `Modifier`, plus un menu à trois points avec _Copier ID utilisateur_, _Copier e-mail_, _Ouvrir en JSON_ (exporte votre fiche utilisateur dans un nouvel onglet), et _Déconnexion_

Changer de persona via ces boutons enregistre votre choix dans `lastPersona` dans localStorage pour que la prochaine fois `/profile` sache où vous envoyer.

## `/profile/operator` — trois onglets

La vue opérateur organise tout en trois onglets. Le fragment d’URL (`#overview`, `#security`, `#preferences`) reflète l’onglet actif, vous permettant de créer un lien direct vers un onglet.

### Onglet Vue d’ensemble

Deux cartes côte à côte : **Organisation & Rôle** (à gauche) et **Activité** (à droite).

La carte **Organisation & Rôle** affiche, en lecture seule :

| Champ           | Source                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **ID utilisateur** | Votre ID opérateur — tronqué à 8 caractères avec une icône pour copier dans le presse-papiers      |
| **Équipes**     | Étiquettes de tags qui vous sont assignées (résolues depuis le cache des tags)                     |
| **E-mail**      | L’e-mail de votre compte                                                                           |
| **Statut**      | Badge `Actif` / `Inactif`                                                                         |
| **Rôle**        | Libellé du rôle, avec le nombre de permissions entre parenthèses                                  |
| **Département** | Depuis le profil de votre organisation                                                            |
| **Poste**       | Depuis le profil de votre organisation                                                            |
| **Emplacement** | Ville et fuseau horaire, si définis                                                               |
| **2FA**         | `Activé` (vert) ou `Désactivé` (gris) — affiché uniquement si connu                                |

Cette carte est **en lecture seule** dans la vue opérateur. Pour modifier ces champs (rôle, département, poste, tags), un administrateur doit éditer votre fiche depuis [Operators](../../settings/access/operators.md) — vous ne pouvez pas vous promouvoir vous-même.

La carte **Activité** affiche vos cinq dernières actions, extraites de `/activity/operator/{id}` :

- Point coloré (vert = Créé, bleu = Mis à jour, orange = Supprimé, primaire = autre)
- Badge de catégorie ("Créé" / "Mis à jour" / "Supprimé" / "Sécurité")
- Description ("Véhicule #ABC mis à jour", etc.)
- Temps relatif ("il y a 2 heures")
- Acteur — généralement "par vous-même", "par le Système" pour les modifications automatisées

Si le fil d’activité est vide, la carte affiche à la place vos **sessions de connexion récentes** comme événements de Sécurité. Un bouton « Voir tout » en bas bascule vers l’onglet Sécurité où se trouve la liste complète des sessions.

Les indicateurs clés au-dessus des cartes affichent `{n} actions · {m} changes in 30d`.

### Onglet Sécurité

Deux cartes empilées : **Gestion du mot de passe** et **Sessions actives**.

**Gestion du mot de passe** vous permet de changer votre propre mot de passe via une boîte de dialogue. Ouvrez-la avec le bouton _Modifier_ à côté de « Mot de passe actuel ».

La boîte de dialogue comporte trois champs :

| Champ                | Validation                                          |
| -------------------- | --------------------------------------------------- |
| Mot de passe actuel  | Obligatoire ; minimum 8 caractères                  |
| Nouveau mot de passe | Obligatoire ; minimum 8 caractères ; doit être différent de l’actuel |
| Confirmer nouveau mot de passe | Obligatoire ; minimum 8 caractères ; doit être identique au nouveau mot de passe |

Le bouton de validation reste désactivé tant que les trois champs ne sont pas valides. Les erreurs en ligne apparaissent en rouge sous chaque champ pendant la saisie. En cas de succès, vous recevez une notification toast et la boîte se ferme ; le formulaire est réinitialisé.

Sous la section mot de passe, un petit tableau **historique des mots de passe** liste les trois derniers événements de changement avec la date, l'action et la raison. (Ceci est actuellement un espace réservé statique — le backend n'expose pas encore de point de terminaison pour l'historique des mots de passe.)

Les **sessions actives** sont affichées par le gestionnaire de sessions partagées. Les sessions sont **groupées par empreinte de l'appareil** (navigateur + OS + type d'appareil + fabricant + modèle), donc plusieurs onglets sur le même ordinateur portable se regroupent en un seul groupe.

Chaque en-tête de groupe affiche :

- Une icône d'appareil (Moniteur / Smartphone / Ordinateur portable selon `deviceType`)
- Étiquette de l'appareil — fabricant + modèle, ou OS + version, ou type d'appareil
- Étiquette du navigateur
- Un badge de statut : `active` (dernière activité sous 1h, vert), `inactive` (moins de 24h, gris), `old` (plus de 24h, atténué), ou `Cet appareil` (la session actuelle, contour bleu)
- Heure de la dernière activité (relative)
- Nombre de sessions dans le groupe

Cliquez sur un en-tête de groupe pour l'agrandir et voir chaque session individuelle à l'intérieur, chacune avec le pays et l'IP issus de la recherche de localisation, la date de connexion, et une icône de corbeille pour révoquer cette session. Le groupe peut aussi être révoqué dans son ensemble via le bouton « Déconnexion de cet appareil » en bas de la liste étendue (la session actuelle est toujours préservée).

Un bouton **Déconnecter les autres sessions** en haut révoque _toutes_ les autres sessions en une fois. L'appareil actuel n'est jamais affecté. Le compte inclut toutes les sessions non actuelles sur tous les appareils.

### Onglet Préférences

Deux cartes : **Thème & style de carte** et **Sons de notification**.

La première carte intègre le sélecteur de thème partagé et le sélecteur de style de carte — mêmes widgets que la fiche de profil flottante. Voir [Themes](../../features/ux/themes.md) pour la description complète des modes, couleurs d'accentuation et styles de carte.

La deuxième carte intègre les réglages des sons de notification — sons par type de toast, son par notification, et curseurs de volume indépendants pour les toasts et les notifications. Voir [Notifications](../../features/ux/notifications.md) pour le sélecteur complet.

Tout dans cet onglet s'écrit dans le **localStorage** de votre navigateur, pas sur le serveur. Cela signifie que les préférences sont par appareil et par navigateur — elles ne vous suivent pas lorsque vous vous connectez depuis une autre machine.

## `/profile/customer` — vue côté client

Si votre compte opérateur est **également** lié à un compte client (rider) dans la même installation Ridewolf, vous pouvez changer de persona pour voir ce que vous voyez côté client. Le bouton persona dans l'en-tête principal vous y emmène.

### Quand vous n'avez pas de compte client

Vous voyez une carte d'état vide en pointillés avec :

- Une icône et le titre « Liez votre profil client »
- Une description
- Deux boutons — **Créer un compte client** et **Lier un compte existant** (les deux affichent actuellement des toasts « Bientôt disponible » ; pas de backend encore)
- Une alerte de vérification
- Un lien « Continuer en tant qu'opérateur » qui revient à `/profile/operator`

### Quand vous avez un compte client

Deux onglets : **Aperçu** et **Trajets**.

Les indicateurs clés du héros basculent vers des chiffres pertinents pour le client : **Solde** (monnaie formatée), **Total des trajets**, **Note** (1 décimale), **Bonus** (points).

L'onglet **Aperçu** affiche :

- Carte **Portefeuille** — solde actuel, points bonus optionnels (uniquement si > 0), et méthode de paiement liée (marque + 4 derniers chiffres + mois/année d'expiration + type de fournisseur) si elle existe
- Carte **Statistiques de trajets** — trois tuiles : Total des trajets, Note avec une étoile (et un sous-label « {n} notés »), Points bonus
- Barre latérale **Infos du compte** — ID client (monospace, tronqué), Fournisseur, Créé (relatif), Dernière activité (relatif, si présent), Dernier trajet (relatif, si présent)
- Carte **Appareils** — vos appareils clients enregistrés (iOS / Android / Web) rendus par le `ClientDevicesList` partagé
- Liens rapides **Sécurité & assistance** — FAQ, Contacter l'assistance, Signaler un problème (boutons espace réservé)

L'onglet **Trajets** liste vos 20 derniers trajets (du plus récent au plus ancien), avec :

- ID du trajet (monospace) et heure de création (relative)
- Badge de statut (`completed` plein, `active` secondaire, autres contour)
- Distance (km), durée (minutes ou `Hh Mm`), étiquette du véhicule
- Prix (monnaie formatée)
- Ligne d'étoiles pour la note, si présente

Il utilise un conteneur défilable avec une hauteur fixe de 500px et un état de chargement à 4 squelettes. L'état vide affiche une icône de carte et « Pas encore de trajets ».

Il n'y a **pas de formulaire d'édition ici** — c'est un miroir en lecture seule de ce qui apparaît dans votre Rider App. Le bouton Modifier dans l'en-tête principal affiche actuellement un toast « Bientôt disponible ».

## `/profile/legacy` — repli page unique

`/profile/legacy` est le **profil plus ancien sur une seule page**, conservé pour repli et liens directs. Il regroupe presque tout sur une page défilante au lieu d'onglets :

- Une carte d'en-tête de profil avec avatar, nom, e-mail, badge de statut, et boutons Modifier / Enregistrer / Annuler
- Carte **Informations personnelles** — Prénom, Nom modifiables (champs texte en édition) ; E-mail en lecture seule et Téléphone modifiable
- Carte **Informations du compte** — ID utilisateur en lecture seule (tronqué + copie), E-mail, Statut (valeur brute)
- Carte **Apparence** — sélecteur de thème et sélecteur de style de carte (mêmes widgets que l'onglet Préférences)
- Carte **Notifications & Sons**
- Carte **Sécurité** — ligne mot de passe avec bouton Modifier (n'ouvre pas encore la boîte de dialogue)
- Un pied de page affichant la version de l'application (`CF_PAGES_COMMIT_SHA` 7 premiers caractères, ou `DEVELOPMENT_KIT` localement)

Deux mises en garde importantes :

- L'action **Enregistrer** affiche actuellement un toast « Fonctionnalité pas encore disponible » — le backend n'a pas de point de terminaison `PATCH /operators/me`, donc les modifications de Prénom, Nom et Téléphone ne sont pas réellement sauvegardées
- Le téléversement de photo a été retiré de cette vue ; utilisez le `/profile/operator` repensé et cliquez sur votre avatar pour ouvrir la boîte de dialogue de téléversement

Préférez `/profile/operator` pour un usage quotidien. Gardez cette URL en favori uniquement si une future correction de la vue repensée nécessite un repli ici.

## Boîte de dialogue de téléversement d'avatar

S'ouvre depuis l'en-tête principal (cliquez sur votre avatar) dans les vues repensées.

Accepte :

- Types de fichiers : uniquement `image/png`, `image/jpeg`, `image/jpg` — tout autre type déclenche une erreur « Type de fichier »
- Taille maximale du fichier : **10 Mo** — les fichiers plus volumineux déclenchent une erreur « Taille du fichier »
- Glisser-déposer ou cliquer pour sélectionner

La boîte de dialogue affiche un aperçu, le nom du fichier et une barre de progression pendant le téléchargement. La séquence de téléchargement est la suivante :

1. `POST` du fichier → retourne un `avatarUrl`
2. `PATCH /me` avec `{ photo: avatarUrl }` → retourne l'enregistrement utilisateur mis à jour
3. Le magasin utilisateur se met à jour avec le nouveau champ `photo` ; le nouvel avatar apparaît immédiatement partout où il est référencé

Des notifications toast confirment le succès ou l'échec. En cas de succès, la boîte de dialogue se ferme automatiquement.

## Référence des champs (toutes routes confondues)

Une liste consolidée de ce qui est modifiable, où, et comment c'est validé :

| Champ                         | Modifiable sur                 | Validation                                                          |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / photo                | Opérateur                      | PNG/JPG/JPEG, max 10 Mo                                             |
| Prénom                       | Héritage (cassé — pas de backend) | Aucune validation côté client                                       |
| Nom de famille               | Héritage (cassé — pas de backend) | Aucune validation côté client                                       |
| Téléphone                    | Héritage (cassé — pas de backend) | Aucune validation côté client                                       |
| Mot de passe actuel          | Opérateur → Sécurité           | Obligatoire, ≥ 8 caractères                                         |
| Nouveau mot de passe         | Opérateur → Sécurité           | Obligatoire, ≥ 8 caractères, doit être différent de l'actuel       |
| Confirmer le mot de passe    | Opérateur → Sécurité           | Obligatoire, doit correspondre au nouveau mot de passe             |
| Mode thème                  | Opérateur → Préférences, Héritage | localStorage uniquement                                             |
| Couleur du thème            | Opérateur → Préférences, Héritage | localStorage uniquement                                             |
| Style de carte              | Opérateur → Préférences, Héritage | localStorage uniquement                                             |
| Configuration du son de notification | Opérateur → Préférences, Héritage | localStorage uniquement                                             |
| Rôle / Département / Poste / Étiquettes | _Pas ici_                     | Modifié par un administrateur via [Operators](../../settings/access/operators.md) |

## Flux de travail typiques

- **Réinitialiser votre propre mot de passe** — `/profile/operator` → onglet Sécurité → Modifier → remplir les trois champs → Soumettre. La boîte de dialogue se ferme et vous restez connecté
- **Se déconnecter d’un ordinateur public oublié** — onglet Sécurité → développer le groupe d’appareils → icône poubelle sur cette session, ou « Déconnecter cet appareil » pour toutes les sessions dessus. Votre session actuelle est toujours protégée
- **Activité suspecte** — onglet Sécurité → « Déconnecter les autres sessions » en haut révoque toutes les sessions non actuelles en un clic
- **Changer votre avatar** — cliquer sur l’avatar dans l’en-tête principal → déposer un PNG/JPG jusqu’à 10 Mo → Télécharger
- **Passer le tableau de bord en mode sombre** — onglet Préférences → Mode thème = Sombre (ou définir Système et laisser l’OS décider)
- **Ajouter un onglet aux favoris** — chaque onglet a un hash (`#overview`, `#security`, `#preferences`) ; copiez l’URL avec le hash et utilisez-la comme lien direct
- **Se voir en tant que client** — si votre compte est lié, cliquez sur le bouton Client dans l’en-tête principal → voir votre vue Rider App (solde, trajets, appareils). Revenir de la même façon

## Conseils

- **Ce que vous pouvez modifier ici est limité** — votre rôle, département, poste, étiquettes et e-mail sont tous gérés sur la page [Operators](../../settings/access/operators.md) par un administrateur. Le profil est uniquement pour votre propre avatar, mot de passe, sessions et préférences
- **Les préférences sont locales** — les thèmes et sons de notification sont stockés dans localStorage, pas sur le serveur. Effacez les données de votre navigateur et ils se réinitialisent ; changez de machine et ils ne suivent pas
- **Le hash décide de l’onglet** — `/profile/operator#security` ouvre directement sur Sécurité. Utilisez cela dans les liens de chat pour qu’un coéquipier voie la même vue que vous
- **Le bouton Enregistrer de la vue héritée est actuellement une impasse** — jusqu’à ce que `PATCH /operators/me` soit disponible, utilisez la vue opérateur repensée pour tout ; pour les changements de nom, demandez à un administrateur
- **Les sessions sont groupées par appareil** — si vous voyez une entrée couvrant plusieurs onglets, c’est normal. Développez pour voir les sessions individuelles
- **La persona client dépend des données** — même si le bouton est visible, il ne fait rien d’utile à moins que votre compte ait un enregistrement `client` associé. Si vous n’en avez pas, ignorez le bouton Client et restez sur `/profile/operator`
