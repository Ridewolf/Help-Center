# Rééquilibrage — Zones mortes

La page Zones mortes (`/rebalance/dead-zones`) est le **tableau de ciblage des opérations sur le terrain** : où votre inventaire reste inactif, combien de revenus cela vous coûte, et dans quels quartiers envoyer la camionnette de rééquilibrage ensuite.

Contrairement à la page [Analytics — Rebalance](runs.md), qui résume l'activité de l'équipe terrain dans le temps, cette page est prospective : elle répond à _où allons-nous maintenant ?_

Permission requise : opérateur connecté (la route n'applique que _requiresAuth_, pas d'ID de permission spécifique).

## Ce que signifie « zone morte »

Une **zone morte** est une zone urbaine où les véhicules passent trop de temps stationnés sans être loués. La page les identifie et les classe pour que le personnel terrain sache quels regroupements dissoudre en priorité.

Le système supporte deux façons de découper la carte :

- **Zones propriétaires** — vos polygones configurés dans [Paramètres — Zones](../../settings/infrastructure/zones.md)
- **Grille H3** — la mosaïque hexagonale d'Uber, utilisée pour une analyse plus fine ou indépendante des zones

Le basculement se trouve dans le bloc de filtres ; le tableau affiche les mêmes colonnes dans les deux cas.

## Ligne KPI (en haut)

Une rangée de cinq cartes KPI résume la situation des zones mortes selon vos filtres.

| KPI                 | Ce qu'il affiche                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Zones mortes**    | Nombre de zones / cellules actuellement signalées comme mortes                               |
| **Perte / jour**    | Revenu perdu estimé par jour — somme de `lostRevenuePerDay` sur les zones filtrées           |
| **Appareils bloqués** | Total des appareils inactifs coincés dans les zones mortes — votre cible physique de ramassage |
| **Durée moyenne**   | Durée moyenne de stationnement (minutes) dans les zones mortes — temps moyen avant déplacement |
| **Progrès hebdo**   | Pourcentage de variation par rapport à la semaine dernière — négatif = situation qui se dégrade ; positif = amélioration |

Chaque KPI se met à jour avec les filtres ; utilisez-les comme un contrôle rapide avant d'examiner la liste.

## Modes d'affichage — Carte vs Tableau

Un bouton en haut à droite bascule entre deux présentations des mêmes données :

- **Carte** — vue géographique des zones mortes superposée à la ville (actuellement un espace réservé _bientôt disponible_)
- **Tableau** — la grille de données ci-dessous, avec toutes les colonnes et le contexte par ligne

Les filtres s'appliquent aux deux vues. Le _Tableau_ est par défaut ; la _Carte_ est connectée mais le rendu géographique est encore en cours de développement.

Un contrôle _Rafraîchissement automatique_ est à côté du bouton de vue — activez-le pour interroger les données à intervalle régulier (utile pour les opérations en direct).

## Filtres

Le bloc de filtres comporte quatre contrôles ; ils s'appliquent tous en mode ET :

| Filtre         | Type     | Notes                                                                             |
| -------------- | -------- | --------------------------------------------------------------------------------- |
| **Ville**      | Liste déroulante | _Toutes les villes_ / _Moscou_ / _Saint-Pétersbourg_ — restreindre à une ville d'exploitation |
| **Gravité**    | Liste déroulante | _Toutes_ / _Faible_ / _Moyenne_ / _Élevée_ / _Critique_ — selon le score de gravité de la zone |
| **Type de zone** | Liste déroulante | _Zones propriétaires_ / _Grille H3_ — choix du découpage à utiliser                 |
| **Recherche**  | Texte    | Texte libre — correspond au nom de la zone / quartier                              |

Un bouton _Tout effacer_ à droite de la carte de filtres réinitialise tous les contrôles en un clic.

## Colonnes

La vue Tableau comporte neuf colonnes. Cliquez sur une ligne pour ouvrir le panneau d'informations de la zone (affiche actuellement un toast avec le nom de la zone en espace réservé).

| Colonne              | Contenu                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Zone / Cellule**   | Nom de la zone plus la ville et le quartier en dessous ; en mode H3 c'est l'ID hexagonal         |
| **Ratio d'inactivité** | Pourcentage de temps où la zone a des appareils inactifs, coloré : vert `< 25%`, orange `25–40%`, rouge `≥ 40%` |
| **Durée de stationnement** | Durée médiane en minutes, avec le _p90_ en dessous                                         |
| **Moyenne appareils inactifs** | Nombre moyen de véhicules inactifs dans la zone, avec la _Cible_ d'approvisionnement en comparaison |
| **Démarrages**       | Démarrages de trajets dans la zone sur _24 dernières heures_ / _7 derniers jours_ / _30 derniers jours_ |
| **Conversion**       | Démarrages par appareil inactif par heure — vert `≥ 0.30`, orange `0.15–0.30`, rouge `< 0.15`   |
| **Surplus**          | Appareils au-dessus de la cible — positif = trop nombreux, négatif = trop peu ; positif en rouge |
| **Perte / jour**     | Revenu perdu estimé pour cette zone seule                                                       |
| **Dernière inactivité** | Dernière fois que la zone a eu des appareils inactifs — formaté selon votre locale             |

Les lignes sont cliquables ; le tri par colonne n'est pas encore activé dans cette version.

## Actions sur la ligne

Chaque ligne a un gestionnaire de clic qui affiche aujourd'hui un toast avec le nom de la zone. Le **menu d'actions complet (par ligne)** est implémenté dans le code mais désactivé en attendant l'API. Les actions prévues sont listées ci-dessous à titre de référence — elles apparaîtront dans un menu à trois points tout à droite de chaque ligne une fois activées :

| Action planifiée         | Ce qu'elle fera                                                          |
| ------------------------ | ------------------------------------------------------------------------ |
| **Créer une tournée**    | Ouvre le générateur de tournée de rééquilibrage pré-rempli avec cette zone |
| **Définir la limite de temps de stationnement** | Resserre le temps de stationnement maximal dans la zone                  |
| **Tarification dynamique** | Applique des leviers de prix pour attirer ou décourager les trajets débutant ou finissant ici |
| **Modification de zone** | Modifie la limite de la zone (scinder, fusionner, remodeler)             |
| **Marquer comme zone interdite au stationnement** | Convertit la zone en zone interdite au stationnement pour pousser les véhicules à sortir |
| **Réduire l'objectif d'approvisionnement** | Baisse l'objectif de dispositifs pour que le système cesse d'envoyer des véhicules ici |
| **Expérience A/B**      | Met en place une expérience contrôlée sur une stratégie de remédiation   |

Jusqu'à ce que le point de terminaison soit déployé, considérez ce tableau comme une **surface d'information en lecture seule** — associez-le à la liste des Véhicules pour agir sur les véhicules individuellement.

## États vides / de chargement

- **Chargement** — un indicateur de chargement avec « Chargement des zones mortes… » pendant la requête au backend
- **Erreur** — une bannière _Alerte_ avec un bouton _Réessayer_ si la requête échoue
- **Vide** — une icône _AlertTriangle_ centrée avec le texte « Pas de zones mortes » ; c'est l'**état attendu aujourd'hui** puisque le point de terminaison ne renvoie aucune donnée

## Flux de travail typiques

- **Planification matinale** — Triez le tableau par _Perte / jour_ (visuellement, aujourd'hui ; colonnes triables à venir) : sélectionnez les 3 meilleures zones à assigner aux tournées du jour
- **Tri par gravité** — Filtrez _Gravité = Critique_ pour ne voir que les pires cas, puis ouvrez chaque zone pour le contexte
- **Opérations ville par ville** — Filtrez par _Ville_ lors d'opérations multi-villes ; examinez séparément le nombre et le revenu total perdu
- **Recoupement avec la flotte** — Utilisez le nombre _Dispositifs piégés_ dans la ligne KPI, puis accédez à la [liste des Véhicules](../fleet/vehicles.md) filtrée par zone pour voir les véhicules réels
- **Associer avec l'analytique** — Comparez le nombre en temps réel ici avec les sections Zones mortes / Dispositifs inactifs des [Analyses — Rééquilibrage](runs.md) et [Analytique des véhicules](../../analytics/reports/vehicles.md) pour confirmer la tendance

## Conseils

- **La conversion est la colonne la plus opérationnelle** — une faible conversion (rouge) avec un excès d'offre élevé signifie que rééquilibrer la zone _n'aidera pas_ ; vous avez la bonne offre mais la demande n'est pas là
- **Ratio d'inactivité vs moyenne des dispositifs inactifs** — le _ratio d'inactivité_ est pondéré dans le temps (fréquence d'inactivité de la zone), la _moyenne des dispositifs inactifs_ est pondérée par le nombre (combien y restent). Les deux en rouge = signal le plus fort de zone morte
- **La _Cible_ sous _Moyenne des dispositifs inactifs_ provient de la configuration de la zone** — si elle est mal réglée, toutes les zones sembleront mortes ; vérifiez dans [Paramètres — Zones](../../settings/infrastructure/zones.md)
- **La grille H3 est utile pour les villes sans zones définies** — quand vous n'avez pas encore défini de zones opérateur, H3 vous donne un compartiment géographique par défaut
- **Le progrès hebdomadaire est l'indicateur "sommes-nous en train de gagner" de la page** — si le nombre de zones mortes augmente mais que le revenu perdu diminue, l'équipe terrain travaille d'abord sur les zones à plus forte valeur (un bon signe)
- **Les gestionnaires d'action sont des prototypes** — cliquer sur une ligne affiche pour l'instant seulement une notification d'information ; les tiroirs / dialogues réels arriveront quand le backend sera prêt
