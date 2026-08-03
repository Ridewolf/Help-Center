# Carte de la flotte et recherche de véhicule par QR

La carte de la flotte (`/battery-swap`) est l'écran d'accueil de l'application Service après la connexion : une carte plein écran de votre flotte avec une rangée de boutons d'action flottants en bas. Chaque intervention sur le terrain commence ici — trouvez le véhicule, puis ouvrez-le.

Ouvrir un véhicule depuis cet écran vous mène à la [page Véhicule](vehicle-controls.md), où se trouvent les commandes. Pour le menu et les paramètres de l'application, consultez la [vue d'ensemble de l'application Service](../basics/overview.md).

## Lecture de la carte

Chaque véhicule est un marqueur sur la carte. Derrière chaque marqueur, l'application conserve les valeurs dont vous avez besoin sur le terrain :

- Étiquette et statut
- Pourcentage de batterie du véhicule
- Pourcentage de batterie du traceur
- Position, cap et vitesse en km/h
- Verrouillé ou déverrouillé
- Qualité du signal mobile, valeur de 0 à 36
- Statut GPS et si le traceur est en ligne
- L'IMEI du traceur

Touchez un marqueur pour ouvrir ce véhicule.

### Vue liste

Une liste plein écran glisse au-dessus de la carte et affiche tous les véhicules correspondant aux filtres actuels. Son propre en-tête porte les boutons pour revenir à la carte et ouvrir les filtres, et la rangée de boutons d'action en bas est masquée tant que la liste est ouverte.

Toucher une ligne ouvre la même page véhicule que toucher le marqueur correspondant — utilisez la vue la plus rapide selon la tâche.

## Filtrage des véhicules

Les filtres se trouvent dans une feuille de filtres, et **ils sont enregistrés sur votre appareil** — ils persistent après la fermeture et la réouverture de l'application. C'est la raison la plus fréquente pour laquelle un véhicule « disparaît » : un filtre appliqué hier est toujours actif aujourd'hui.

Les contrôles, dans l'ordre :

| Contrôle             | Fonction                                                                               |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Pastilles de statut** | Filtrer par statut ; les pastilles sont colorées pour correspondre aux points de statut sur la carte en direct |
| **Plage de batterie** | Un curseur de 0 à 100 %                                                                |
| **Type de véhicule**  | Un carrousel de types — affiché uniquement si votre flotte comporte plusieurs types de véhicules |
| **Dernier signal**    | Préréglages : tous, 1h, 6h, 24h, 7j — masque les véhicules hors ligne depuis plus longtemps que la fenêtre choisie |
| **Étiquettes**       | Étiquettes publiques en premier par ordre alphabétique, puis étiquettes privées avec une icône de cadenas |
| **Recherche**         | Texte libre, correspondant à l'étiquette, au VIN ou à l'IMEI                             |

Deux comportements à garder en tête :

- **Plusieurs étiquettes utilisent la logique ET** — un véhicule doit porter *toutes* les étiquettes sélectionnées pour rester dans les résultats.
- **Les étiquettes se chargent silencieusement.** Si la liste des étiquettes ne peut pas être chargée, les pastilles n'apparaissent tout simplement pas et aucune erreur n'est affichée. Fermez et rouvrez la feuille pour réessayer.

Les couleurs de statut à faible contraste (comme en charge et déchargé) ont un texte de pastille plus foncé en mode clair pour rester lisibles ; le mode sombre conserve la couleur vive.

La feuille se rouvre toujours avec vos filtres enregistrés déjà appliqués.

## Ouvrir un véhicule par code QR

1. Touchez le bouton d'action **scanner**.
2. Pointez la caméra vers le code QR du véhicule. Les codes qui identifient déjà le véhicule l'ouvrent immédiatement ; tout autre est recherché par étiquette, VIN ou IMEI. Lorsque plusieurs véhicules correspondent, une correspondance exacte d'étiquette l'emporte.
3. L'application ouvre la page de ce véhicule.

En [mode lot](../operations/batch-mode.md), le même scan ajoute le véhicule à la file d'attente au lieu de l'ouvrir.

### Quand le code ne scanne pas

Utilisez la saisie manuelle en secours : tapez l'**étiquette**, le **VIN** ou l'**IMEI** dans la fenêtre modale. Cela utilise exactement la même recherche, donc tout ce que le scanner aurait pu ouvrir, la saisie l'ouvrira aussi.

Un code non reconnu affiche une erreur de code invalide. Le scanner se ferme aussi automatiquement après un moment si rien n'est scanné — touchez-le simplement à nouveau.

## Tiroir des tickets et légende

- Le bouton d'action **tickets** ouvre un tiroir des tickets d'assistance ouverts avec les comptes. C'est un raccourci terrain pour voir ce que les riders ont signalé, séparé de la file d'assistance complète décrite dans [Outils back-office](../tools/back-office-tools.md#assistance--tickets).
- La fenêtre modale **légende** explique les formes des marqueurs et le code couleur des statuts utilisés sur la carte. Ouvrez-la lorsqu'une couleur est inconnue plutôt que de deviner.

## Préférences de la carte

Un contrôle dans le **coin supérieur droit de la carte** — pas le tiroir **Paramètres** de l'application — ouvre les préférences de la carte. Il couvre :

- Style du marqueur (icône, point, auto) et taille du marqueur
- Superpositions : pourcentage de batterie, étiquettes, anneaux de statut, alarmes, tickets
- Regroupement
- Zones
- Votre propre position
- Mouvement fluide
- Verrouillage d'écran (garde l'écran allumé pendant que vous travaillez)
- Taux de rafraîchissement

Modifiez ces options lorsque la carte est trop chargée pour être lisible : désactivez les superpositions pour une image plus claire, ou activez le regroupement dans une zone dense.

## Problèmes courants

| Symptôme                                   | Que faire                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Un véhicule attendu est manquant           | Un filtre enregistré est toujours appliqué — vérifiez les pastilles de statut, l'autonomie de la batterie, et surtout la fenêtre du dernier signal |
| Pas de carrousel de type de véhicule dans les filtres | Votre flotte ne comporte qu'un seul type de véhicule ; c'est normal                             |
| Aucune pastille d'étiquette visible        | La liste des étiquettes n'a pas chargé. Fermez et rouvrez la feuille de filtre pour réessayer  |
| Une combinaison d'étiquettes ne renvoie rien | Les étiquettes sont combinées avec ET — retirez une étiquette                                  |
| Un code scanné n'est pas reconnu           | Confirmez que le code appartient à un véhicule de votre entreprise, puis utilisez la saisie manuelle avec l'étiquette, le VIN ou l'IMEI |
| Le scanner se ferme tout seul               | Il se ferme après une période d'inactivité — rouvrez-le                                        |

## Conseils

- **Effacez vos filtres au début d'un service.** Ils persistent, et une fenêtre de dernier signal obsolète masque précisément les véhicules que vous devez trouver.
- **Utilisez les préréglages du dernier signal pour rechercher les traceurs inactifs** — réglez sur `7d` et cherchez ceux qui sont silencieux.
- **La recherche accepte l'IMEI**, donc un autocollant avec seulement le numéro du traceur suffit pour ouvrir un véhicule.
- **La saisie manuelle n'est pas une régression** — elle fonctionne de la même manière que le scanner, utilisez-la dès qu'un code semble endommagé.
