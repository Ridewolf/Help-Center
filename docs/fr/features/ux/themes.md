# Thèmes

Le tableau de bord dispose de trois paramètres d'apparence indépendants :

- **Mode** — clair, sombre, ou suivre le système d'exploitation
- **Couleur** — la couleur d'accent utilisée pour les boutons, liens, badges et états actifs
- **Style de carte** — les tuiles de la carte de base (choix séparé pour le mode clair et sombre)

Les trois se trouvent dans la **Fiche Profil** en bas — cliquez sur votre avatar dans la barre supérieure pour l'ouvrir.

## Mode (clair / sombre / système)

Basculez entre trois modes :

| Icône      | Mode   | Comportement                                                    |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Écran   | Système | Suit la préférence de votre OS ; change automatiquement avec le système |
| ☀️ Soleil  | Clair  | Toujours clair, ignore le système                               |
| 🌙 Lune    | Sombre | Toujours sombre, ignore le système                              |

Le mode **Système** est celui par défaut. Si vous changez le thème de votre OS (par exemple le mode sombre programmé sur macOS au coucher du soleil), le tableau de bord s'adapte immédiatement — sans rechargement.

## Couleur

La couleur d'accent pilote les boutons, liens, badges, anneaux de focus et l'élément actif de la barre latérale. Douze palettes prédéfinies sont disponibles :

| Couleur | Aperçu |
| ------- | ------- |
| Noir    | ⚫      |
| Rouge   | 🔴      |
| Rose    | 🌹      |
| Rose clair | 🩷    |
| Orange  | 🟠      |
| Jaune   | 🟡      |
| Vert    | 🟢      |
| Sarcelle | 🟢     |
| Cyan    | 🔵      |
| Bleu    | 🔵      |
| Indigo  | 🟣      |
| Violet  | 🟣      |

Choisissez celle que vous trouvez la plus lisible selon votre mode choisi (certaines couleurs sont mieux adaptées au clair, d'autres au sombre).

## Style de carte

Les pages affichant des cartes (Carte en direct, détail du véhicule, éditeur de zone, itinéraire de trajet, etc.) utilisent un style de carte de base que vous pouvez choisir indépendamment. Le tableau de bord conserve **deux préférences de style de carte distinctes** — une pour le mode clair, une pour le mode sombre — afin que la carte corresponde au reste de l'interface lorsque vous changez de mode.

- Le changement de mode (clair ↔ sombre) bascule automatiquement vers le style de carte choisi pour ce mode
- Les styles disponibles dépendent de votre fournisseur de cartes (MapTiler ou autre) ; typiquement : Streets, Satellite, Light, Dark, Outdoors

## Où se trouvent les préférences

Les trois paramètres sont stockés dans le **localStorage** de votre navigateur sous ces clés :

| Paramètre         | Clé de stockage       |
| ----------------- | --------------------- |
| Mode              | `app-dark-mode`       |
| Couleur           | `app-theme`           |
| Style de carte (clair) | `app-map-style-light` |
| Style de carte (sombre) | `app-map-style-dark`  |

Cela signifie :

- **Par appareil, par navigateur** — machine différente = préférences différentes
- **Non synchronisé** avec votre compte — les collègues utilisant le même compte voient leurs propres thèmes
- **Effacé lors de la suppression des données de navigation** pour ce site
- Les fenêtres **navigation privée** démarrent avec les paramètres par défaut

## Conseils

- **Commencez avec le mode Système** — laissez le planning du système décider pour vous ; passez au mode Clair/Sombre uniquement si vous avez une préférence différente du système
- **Adaptez le style de carte au mode** — Satellite est difficile à lire en mode sombre ; préférez un style "Sombre" ou "Streets Dark"
- **La couleur affecte le contraste** — Jaune ou Cyan sur fond clair peuvent être difficiles à lire ; si les boutons semblent "fins", essayez un accent plus foncé (Rouge, Bleu, Indigo)
- **Un thème n'est pas une permission** — chaque opérateur peut choisir le sien ; vos coéquipiers ne verront pas vos modifications
