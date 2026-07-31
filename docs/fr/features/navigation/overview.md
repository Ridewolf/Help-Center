# Navigation

Le tableau de bord se compose de trois surfaces principales : la **barre latérale** à gauche, la **barre supérieure** en haut, et le **fil d’Ariane** dans la barre supérieure. Leur comportement est cohérent sur toutes les pages.

## Barre latérale

La barre latérale est votre navigation principale. Chaque élément est soit une page unique (Tableau de bord, Trajets, Véhicules, Clients, Assistance) soit un **groupe** qui se déploie en sous-éléments (Paiements, Assistance, Analytique, Paramètres, Applications).

### Déploiement et repli

- **Cliquez sur un groupe** (par exemple _Assistance_) pour le déployer ; cliquez de nouveau pour le replier.
- **Basculer toute la barre latérale** avec `⌘ B` (macOS) ou `Ctrl B` (Windows/Linux). En état replié, seuls les icônes sont visibles — survolez une icône pour voir son étiquette en infobulle.
- L’état de la barre latérale est conservé entre les chargements de page (via cookie).

### État actif

La section courante est mise en surbrillance avec la couleur d’accentuation (rouge par défaut). Lorsque vous êtes dans un groupe, l’en-tête du groupe reste aussi surligné pour que vous sachiez toujours où vous vous trouvez.

### Comptages et badges

Certains éléments affichent un **badge** avec un nombre — ce sont des comptes non lus/en attente extraits en temps réel des notifications :

- _Assistance → Tickets_ — tickets en attente qui vous sont assignés
- _Assistance → Preuves de stationnement_ — preuves en attente de validation
- _Trajets_, _Véhicules_, _Clients_ — comptages pertinents selon le contexte

### Permissions

Vous ne voyez que les éléments que votre **rôle et vos permissions** autorisent. Si une section vous manque alors qu’un collègue y a accès, c’est une restriction de permission, pas un bug. Demandez à un administrateur si vous devez y avoir accès.

## Barre supérieure

La barre supérieure apparaît sur chaque page. Sur desktop, elle contient le fil d’Ariane à gauche et cinq contrôles à droite.

### Fil d’Ariane (à gauche)

Le fil d’Ariane est votre chemin de retour dans la hiérarchie :

`Accueil → Véhicules → RW-001`

- **Cliquez sur n’importe quel segment** pour revenir à ce niveau (le dernier segment est la page courante et n’est pas cliquable).
- Le fil d’Ariane est toujours visible — c’est le moyen le plus sûr de sortir d’une page profonde.

### Contrôles (à droite, desktop)

Dans l’ordre, de gauche à droite :

| Icône | Fonction                                                                                  |
| ------ | ---------------------------------------------------------------------------------------- |
| ✨     | **Chat IA** — ouvre un panneau de chat avec un assistant qui répond aux questions du tableau de bord |
| ?      | **Assistance** — ouvre cette base de connaissances dans un tiroir latéral, contextuel à la page courante |
| 🔔     | **Notifications** — événements système récents et alertes (le badge rouge indique le nombre de non lus) |
| 👤     | **Profil** — paramètres, mot de passe, déconnexion, contrôles du thème (votre avatar)     |

### Mobile

Sur les écrans de moins de 769 px, la barre supérieure se replie :

- La barre latérale se transforme en un bouton hamburger tout à gauche
- Le fil d’Ariane est à côté du hamburger et défile horizontalement s’il est long
- Les cinq contrôles deviennent quatre boutons à droite (IA, Assistance, Notifications, Avatar) — mêmes actions, cibles tactiles plus grandes

## Panneau Profil

Cliquer sur votre avatar ouvre un panneau coulissant à droite avec :

- **Profil** — vos informations personnelles
- **Changer le mot de passe**
- **Paramètres** — préférences (langue, thème, notifications)
- **Assistance** — renvoie à la page d’accueil de l’Assistance
- **Déconnexion** (en rouge)
- Commutateurs thème/langue/style de carte en bas

## Conseils

- **Survolez les éléments de la barre latérale** quand elle est repliée — les infobulles apparaissent immédiatement, sans délai
- **Utilisez le fil d’Ariane** pour sortir des pages profondes plutôt que le bouton retour du navigateur — c’est plus rapide et évite de recharger
- **`⌘/Ctrl + B`** est un moyen rapide de vous donner plus d’espace horizontal sur les pages riches en données (tables, cartes)
- **L’aide (?)** dans la barre supérieure est **consciente de la page** — elle essaie d’ouvrir l’article le plus pertinent selon votre position ; sinon, elle revient à la recherche
