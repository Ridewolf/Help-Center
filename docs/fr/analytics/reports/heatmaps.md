# Analytique — Cartes de chaleur

La page Cartes de chaleur (`/analytics/heatmaps`) est un **visualiseur de densité géographique** : choisissez une source de données, une plage de dates et un mode de visualisation — la carte montre où l'activité se concentre dans votre zone d'exploitation.

Utilisez-la pour la **découverte de la demande** (où les utilisateurs veulent-ils commencer ? où finissent-ils ?) et la **planification de la couverture** (où les utilisateurs cherchent-ils, mais nous n'avons pas de véhicules ?).

## Sources de données

Trois sources de signaux, une à la fois :

| Source          | Ce qu'elle montre                                                          |
| --------------- | -------------------------------------------------------------------------- |
| **Scans**       | Où les utilisateurs **ont ouvert l'application et recherché des véhicules** — intention de demande |
| **Début de trajets** | Où les trajets **ont effectivement commencé** — demande convertie          |
| **Fin de trajets**   | Où les trajets **se sont terminés** — lieux naturels de dépose             |

Comparez _Scans_ et _Début de trajets_ pour trouver la **demande non satisfaite** : des endroits où les utilisateurs ont cherché mais n'ont pas trouvé de véhicule.

## Modes de visualisation

Quatre façons de représenter les mêmes données :

| Mode         | Ce qu'il affiche                                                                |
| ------------ | ------------------------------------------------------------------------------ |
| **Carte de chaleur**  | Flou thermique classique — idéal pour **voir les pics** d'un coup d'œil       |
| **Hexagones** | Bacs hexagonaux — idéal pour **comparer des zones** avec une géométrie cohérente |
| **Clusters** | Regroupements de points qui se développent au zoom — idéal pour **explorer les points individuels** |
| **Grille**     | Grille carrée régulière — idéal pour **s'aligner avec les zones de planification** |

Les mêmes données sources peuvent raconter différentes histoires selon le mode — changez de mode au fur et à mesure de votre enquête.

## Schémas de couleurs

Une rangée de petits échantillons vous permet de choisir le schéma de couleurs — utile pour les opérateurs daltoniens ou pour assortir une palette de marque. Le nom du schéma apparaît en infobulle au survol.

## Curseur de points

Un curseur dans la barre d'outils vous permet de contrôler combien de points de données sont échantillonnés (ex. 1k / 10k / 100k). Plus de points = image de densité plus précise mais rendu plus lent. Commencez bas pendant l'exploration, augmentez quand vous avez réduit la zone/plage.

## Plage de dates

Une barre de plage de dates standard en haut. Plus la plage est large, plus l'image est agrégée ; pour "ce qui s'est passé ce matin" choisissez quelques heures.

## Carte

La carte remplit la page. Contrôles standards (panoramique, zoom, bascule des couches). La superposition de la carte de chaleur est au-dessus de la carte de base.

Une **légende** dans un coin explique l'échelle des couleurs du mode actif — densité faible à élevée.

## Flux de travail typiques

- **Trouver la demande non satisfaite** — Source = Scans, Mode = Carte de chaleur → repérer une zone chaude → changer la Source en Début de trajets → si la même zone est froide = demande non satisfaite → envisager un rééquilibrage ou une expansion dans cette zone
- **Planifier une nouvelle zone** — Source = Fin de trajets, Mode = Hexagones → chercher des concentrations naturelles de dépose en dehors de vos zones actuelles → proposer aux opérations
- **Explorer un point chaud** — Mode = Clusters → zoomer sur la zone chaude → les points individuels montrent la latitude/longitude exacte ; croiser avec [Vehicle Search](vehicles.md) pour les détails au niveau du trajet
- **Comparer des plages horaires** — charger les Scans du matin → capture d'écran → passer aux Scans du soir → comparer les captures côte à côte (le tableau de bord ne gère pas encore la vue double période ; export manuel nécessaire)
- **Audit de couverture** — Source = Scans de la semaine dernière → chercher des points chauds loin de toute zone planifiée → envisager de redessiner les limites des zones

## Conseils

- **Scans ≠ trajets** — beaucoup de scans ne se convertissent jamais (l'utilisateur ne voit pas de véhicule, voit le prix, abandonne). L'écart entre Scans et Début de trajets est votre signal le plus exploitable
- **Le mode carte de chaleur masque l'échelle** — les couleurs sont relatives à la carte visible ; le zoom change l'image. Le mode Hexagones est plus honnête à zoom fixe
- **Commencez avec peu de points, terminez avec beaucoup** — explorer avec 1k points est rapide ; ne montez à 100k que quand vous savez ce que vous cherchez
- **Mode grille pour la planification** — si vos zones sont plutôt rectangulaires, la Grille s'aligne avec elles et facilite les calculs ; sinon préférez Hexagones
- **Daltonien ?** — essayez les schémas alternatifs ; les données sous-jacentes sont les mêmes
- **La carte ne se rafraîchit pas automatiquement au changement de date** — selon la configuration, vous devrez peut-être re-cliquer sur _Appliquer_ / _Rafraîchir_ après avoir changé la plage de dates
- **La légende est importante** — ce qui semble "rouge et dramatique" peut être un petit nombre absolu ; jetez toujours un œil à la légende avant d'interpréter
