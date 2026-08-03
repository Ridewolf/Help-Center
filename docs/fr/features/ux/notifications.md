# Notifications

Les notifications affichent les événements en direct de tout le Tableau de bord — nouveaux tickets, alertes IoT, activité de paiement, problèmes de véhicule, messages système. Elles arrivent via une connexion WebSocket, donc les mises à jour sont en temps réel sans rechargement de page.

## Cloche dans la barre supérieure

L'**icône de cloche** dans la barre supérieure est votre point d'entrée. Un badge rouge indique le nombre de notifications non lues.

- Pas de badge → rien de non lu
- Badge avec un nombre → autant de notifications non lues
- `99+` → plus de 99 notifications non lues

Cliquez sur la cloche pour ouvrir le **panneau Notifications** en volet latéral à droite.

## À l'intérieur du panneau

### En-tête

- **Titre** « Notifications »
- **Nombre de non lus** affiché soit comme « N non lus » soit « Tout est à jour » lorsqu'il n'y en a pas
- **Raccourci Paramètres** (icône d'engrenage) ouvre la page globale des paramètres de notifications

### Bascule des notifications du navigateur

Si votre navigateur supporte les notifications système, une bascule apparaît sous l'en-tête :

- **Désactivé** → notifications uniquement dans le tableau de bord
- **Activé** → le navigateur affiche une notification système quand quelque chose de nouveau arrive, même si l'onglet est en arrière-plan
- Lors de la première activation, le navigateur demande la permission

Si vous avez refusé la permission auparavant, la bascule est désactivée et un avis jaune apparaît avec des instructions pour la réactiver dans les paramètres du site du navigateur.

### Liste

Les notifications sont listées de la plus récente à la plus ancienne. Chaque élément affiche :

- **Icône de catégorie** — une petite icône teintée selon la couleur de priorité (voir ci-dessous)
- **Titre** — un court titre
- **Corps** — la description de l'événement
- **Temps écoulé** — par ex. « il y a 2 min »
- **Cliquez** sur l'élément pour accéder à la page liée (ticket, véhicule, paiement, etc.)

### État vide

Lorsqu'il n'y a rien à afficher, le panneau montre un message convivial et un bouton pour ouvrir la page des paramètres.

## Catégories et priorité

Chaque notification a une **catégorie** (qui détermine l'icône) et une **priorité** (qui détermine la couleur).

### Catégories

| Catégorie   | Icône          | Événements typiques                         |
| ----------- | -------------- | ------------------------------------------- |
| Assistance  | 🔔 Cloche      | Nouveaux tickets, réponses aux tickets     |
| Maintenance | 🔧 Clé à molette | Tâches de service assignées, déclencheurs d'automatisation |
| Véhicule    | ✨ Étincelles  | Changements de statut, anomalies            |
| Client      | 👥 Utilisateurs | Nouvelles inscriptions, drapeaux de compte |
| Paiement    | 💳 Carte       | Transactions, remboursements, événements webhook |
| IoT         | 🖥️ Cpu         | Appareil hors ligne, batterie faible, alertes capteurs |
| Système     | 🛎️ Sonnerie   | Messages système, déploiements              |
| Sécurité    | 🛡️ AlerteBouclier | Événements d'authentification, activité suspecte |

### Couleurs de priorité

| Priorité | Couleur | Usage                                               |
| -------- | ------- | -------------------------------------------------- |
| Critique | Rouge   | Nécessite une action immédiate (panne véhicule, alerte sécurité) |
| Élevé    | Orange  | Important mais non bloquant                         |
| Moyen    | Ambre   | Attention de routine                                |
| Faible   | Bleu    | Informatif                                         |

## Paramètres (configuration avancée)

Le panneau de la cloche couvre l'essentiel. Pour une configuration complète, ouvrez **Paramètres → Alertes & Notifications** (ou cliquez sur l'engrenage dans l'en-tête du panneau) :

- **Sons** — choisissez un son par priorité, ou désactivez les sons
- **Fournisseurs** — redirigez les notifications vers des canaux externes (Telegram, etc.) configurés par chat/destinataire
- **Filtrage** — quelles catégories vous souhaitez recevoir
- **Horaires de silence** — heures calmes (lorsque supporté)

## Fonctionnement de la permission

Les notifications du navigateur nécessitent une autorisation unique accordée par le navigateur. La bascule dans le panneau déclenche la demande de permission la première fois que vous l'activez.

- **Accordée** → la bascule fonctionne ; vous recevez des notifications système tant que le tableau de bord est ouvert dans un onglet
- **Refusée** → la bascule est verrouillée sur désactivé ; vous devez modifier la permission dans les paramètres du site de votre navigateur, puis revenir et activer la bascule
- **Non supporté** → certains navigateurs intégrés et versions anciennes ne peuvent pas afficher les notifications système ; la bascule est cachée

Accorder la permission au navigateur ne change rien à l'intérieur du tableau de bord — le panneau intégré fonctionne dans tous les cas.

## Conseils

- **Utilisez les notifications du navigateur sur un seul onglet** — ouvrir le tableau de bord dans plusieurs onglets peut multiplier les notifications système
- **Les sons sont locaux** — ils ne jouent que dans l'onglet où vous êtes connecté ; coupez-les sur les ordinateurs partagés
- **Le clic direct est le flux de travail le plus rapide** — cliquer sur une notification vous amène directement à la page qui l'a déclenchée ; plus rapide que de naviguer manuellement
- **Tableau de bord déconnecté** — si la connexion WebSocket tombe, le petit point de statut sur l'avatar devient rouge. Les notifications reprennent dès que la connexion revient ; vous ne perdez rien entre-temps
- **Critique en premier** — quand plusieurs arrivent en même temps, regardez d'abord les couleurs avant les titres : les icônes rouges passent en haut de votre file
