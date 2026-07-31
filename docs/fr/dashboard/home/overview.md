# Accueil du Tableau de bord

La page d'accueil (`/dashboard`) est votre aperçu quotidien. Elle affiche les indicateurs clés de la flotte pour un jour choisi, leur comparaison avec la moyenne mobile sur 30 jours, et la répartition horaire de l'activité. Ouvrez-la pour avoir le pouls des opérations en un seul écran.

## En-tête

En haut :

- **Salutation** — « Bonjour, _{votre nom}_ ! Bienvenue sur le tableau de bord de _{votre entreprise}_ ! »
- **Sous-titre** — « Aperçu des performances de votre entreprise »
- **Sélecteur de date** — indique le jour auquel appartiennent les indicateurs

## Sélecteur de date

Par défaut, la page charge les données de **aujourd'hui**. Le sélecteur de date vous permet de remonter dans l'historique.

- **Aujourd'hui** — bouton qui revient à aujourd'hui
- **Jour précédent** (‹) / **Jour suivant** (›) — avance ou recule d'un jour à la fois
- **Icône calendrier** — ouvre un sélecteur de date pour sauter à un jour précis

La date sélectionnée est conservée pour la session en cours — changer de page puis revenir garde votre sélection.

## Cartes de statistiques (KPI)

Huit cartes métriques sont disposées en deux rangées. Chaque carte affiche :

- **Titre** — ce qui est mesuré (ex. _Trajets_)
- **Valeur** — le chiffre pour le jour sélectionné
- **Description** — une courte précision ("Trajets terminés", "Distance totale", etc.)
- **Comparaison** — évolution par rapport à la moyenne mobile sur 30 jours, avec une flèche haut/bas
- **Info-bulle** — survolez le titre pour la définition complète

### Les huit cartes

| Carte                | Ce qu'elle affiche                              |
| -------------------- | ---------------------------------------------- |
| **Trajets**          | Nombre de trajets terminés le jour sélectionné |
| **Distance**         | Total des kilomètres parcourus par tous les trajets |
| **Durée**            | Durée totale des trajets dans la flotte        |
| **Revenu**           | Revenu total des trajets du jour sélectionné   |
| **Recharges**        | Somme des recharges de portefeuille effectuées par les clients ce jour |
| **Prix moyen**       | Prix moyen par trajet                           |
| **Prix moyen / km**  | Prix moyen par kilomètre                        |
| **Prix moyen / min** | Prix moyen par minute                           |

La comparaison se lit comme « **vs moyenne 30 jours** » :

- ↑ Vert — au-dessus de la moyenne des 30 derniers jours
- ↓ Rouge — en dessous de la moyenne
- (pas de flèche) — trop proche de la moyenne pour être signalé

## Carte météo

Un widget météo se trouve dans la grille des cartes statistiques et affiche les conditions dans votre zone d'exploitation :

- **Température actuelle** et conditions (Dégagé, Nuageux, Pluie, etc.)
- **Vent** et **précipitations**
- **Prévisions sur 3 jours** — les deux jours suivants plus demain
- Source de localisation — _par GPS_ ou _par IP_ (selon disponibilité)

Utile pour prévoir la demande : la pluie et le vent sont souvent corrélés au volume de trajets.

## Graphiques horaires

Sous les cartes statistiques, quatre graphiques en aires montrent la répartition de l'activité sur les 24 heures du jour sélectionné, regroupés en deux sections :

### Activité

- **Trajets par heure** — nombre de trajets démarrant chaque heure
- **Distance par heure** — total des kilomètres par heure
- **Durée par heure** — total des minutes de trajet par heure

### Revenu

- **Revenu par heure** — montant gagné par heure

Chaque graphique montre la courbe du jour ; survolez un point pour voir la valeur exacte à cette heure.

## Chargement et erreurs

- **Chargement** — les cartes statistiques affichent un état squelette pendant la résolution du point d'accès analytique
- **Erreur** — une petite bannière apparaît en haut indiquant « Échec du chargement des analyses » ; le reste de la page reste utilisable

## Permissions

La page d'accueil est protégée par la permission **Voir l'analytique du Tableau de bord** (`q4r5t6`). Sans elle, vous serez redirigé vers une autre page d'accueil lors de la connexion.

Si vous avez accès au tableau de bord mais que la page est vide :

- Vérifiez la date sélectionnée — les jours sans données sont valides (pas de trajets)
- Vérifiez le réseau — regardez la bannière « Échec du chargement des analyses »
- Sinon, contactez un administrateur

## Conseils

- **Comparez rapidement les jours** — utilisez `‹` et `›` pour parcourir les jours récents et observez l'évolution des KPI
- **Info-bulles sur les titres des statistiques** — chaque carte a une définition précise ; fiez-vous à elle plutôt que de deviner ce que "Prix moyen / km" exclut
- **Utilisez d'abord le badge de comparaison** — la flèche colorée vous indique en un coup d'œil si le jour était au-dessus ou en dessous de la normale, avant de lire le chiffre absolu
- **Les graphiques horaires révèlent des tendances** — pics du matin vs soir, courbes du week-end, effets météo ; ils en disent plus que les totaux
