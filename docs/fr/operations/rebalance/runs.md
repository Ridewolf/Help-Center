# Rééquilibrage — Courses

La page des courses de rééquilibrage (`/rebalance/runs`) est le **journal opérationnel de chaque trajet de rééquilibrage** : qui a conduit quelle camionnette, de quel dépôt elle est partie, combien de trottinettes et de batteries sont à bord, si le trajet est à l'heure, et où les problèmes sont survenus.

Une **course** correspond à une journée de travail sur le terrain — un conducteur, une camionnette, un dépôt d'origine, une liste ordonnée d'arrêts, et une fenêtre d'heure d'arrivée prévue. La page permet aux répartiteurs de suivre les courses actives et de consulter celles terminées.

Cette page est la vue détaillée par trajet qui complète le résumé plus global [Analytics — Rebalance](runs.md) et le tableau basé sur la localisation [Rebalance — Dead Zones](dead-zones.md).

Permission requise : opérateur connecté (la route applique seulement _requiresAuth_, pas d'ID de permission spécifique).

> Note — au moment de la rédaction, les points de terminaison CRUD `/rebalance/runs` ne sont pas encore actifs. La page affiche le bloc de filtres, la ligne de KPI et la mise en page du tableau avec des KPI fictifs et une liste vide. _Créer une course_, _Rechercher_, _Rafraîchissement automatique_ et le menu d'action par ligne (_Dispatcher_, _Réaffecter_, _Réoptimiser_, _Imprimer la feuille_, _Exporter_, _Modifier_, _Annuler_) sont codés mais commentés en attendant le backend. Cliquer sur une ligne mène à `/rebalance/runs/:id` mais la page de détail ne fait pas partie de cette version.

## Ligne de KPI (en haut)

Une ligne de cinq cartes KPI résume les courses du jour.

| KPI                | Ce qu'il affiche                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Courses actives** | Courses actuellement en _Dispatché_ / _En cours_ / _En pause_                                |
| **% à l'heure**    | Pourcentage de courses respectant leur fenêtre d'ETA prévue ; tendance verte ≥ 90 %, rouge en baisse |
| **Courses en retard** | Nombre de courses signalées _En retard_ selon leur SLA — l'indicateur "besoin d'aide" du répartiteur |
| **Km total aujourd'hui** | Distance cumulée parcourue par toutes les camionnettes de rééquilibrage aujourd'hui         |
| **Échanges de batteries** | Nombre total d'échanges de batteries effectués par l'équipe terrain aujourd'hui             |

Ces cinq indicateurs donnent d'un coup d'œil une image de la progression de l'opération terrain du jour par rapport au plan.

## Filtres

Quatre filtres se trouvent dans la carte _Filtres_ ; ils s'appliquent tous en mode ET. Un bouton _Tout effacer_ à droite réinitialise le bloc.

| Filtre             | Type     | Options                                                                                  |
| ------------------ | -------- | ---------------------------------------------------------------------------------------- |
| **Statut**         | Liste déroulante | _Tous_ / _Planifié_ / _Dispatché_ / _En cours_ / _En pause_ / _Terminé_ / _Annulé_    |
| **Risque SLA**     | Liste déroulante | _Tous_ / _Sur la bonne voie_ / _À risque_ / _En retard_ — indicateur de retard de la course |
| **Ville**          | Liste déroulante | _Toutes les villes_ / _Moscou_ / _Saint-Pétersbourg_                                   |
| **A des incidents**| Liste déroulante | _Tous_ / _Oui_ / _Non_ — incidents enregistrés pour la course                           |

Un contrôle de _Recherche_ en texte libre (par numéro de course, conducteur ou camionnette) est implémenté mais actuellement masqué avec _Rafraîchissement automatique_ et _Créer une course_ jusqu'à la mise en service du point de terminaison.

## Colonnes

Le tableau comporte neuf colonnes visibles. Les lignes sont cliquables — elles mènent à `/rebalance/runs/:id` (vue détaillée non incluse dans cette version).

| Colonne              | Contenu                                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **N° de course**     | Identifiant lisible de la course (ex. `RUN-2026-0517-001`)                                                            |
| **Conducteur / Camionnette** | Avatar du conducteur + nom + téléphone ; modèle et plaque de la camionnette en dessous                             |
| **Dépôt / Ville**    | Nom du dépôt d'origine et sa ville                                                                                     |
| **Statut**           | Pastille de statut — gris _Planifié_, bleu _Dispatché_, vert _En cours_, jaune _En pause_, sarcelle _Terminé_, rouge _Annulé_ |
| **Arrêts**           | Avancement sous forme `réalisés / total`, avec _Échoué : N_ en rouge en dessous si un arrêt a échoué                    |
| **Charge utile**     | Trottinettes chargées (`🛴 en / capacité`) et batteries chargées (`🔋 chargées + déchargées / capacité`)                |
| **Planifié**         | Heure d'arrivée prévue début–fin + distance prévue (km) et durée (min)                                                 |
| **Risque SLA**       | Pastille de risque — vert _Sur la bonne voie_, ambre _À risque_, rouge _En retard_                                      |
| **Créé / Mis à jour**| Date de création en haut, date de dernière mise à jour en dessous                                                      |

La colonne d'action (menu à trois points) est implémentée mais commentée en attendant les points de terminaison CRUD ; voir les _Actions par ligne_ ci-dessous pour l'ensemble prévu.

## Référence des statuts

Une course est dans un seul statut à la fois ; ce statut détermine les actions de répartition disponibles :

| Statut          | Signification                                        |
| --------------- | ---------------------------------------------------- |
| **Planifié**    | Créé et programmé mais pas encore envoyé au conducteur |
| **Expédié**    | Envoyé au conducteur / fourgon — en attente de départ |
| **En cours**   | Le fourgon est en mouvement et / ou effectue des arrêts |
| **En pause**   | Le conducteur a mis la course en pause (pause, incident, etc.) |
| **Terminé**   | Tous les arrêts tentés, course clôturée              |
| **Annulé**    | Interrompu avant la fin                               |

## Référence du risque SLA

Un indicateur en temps réel indiquant si la course respectera sa fenêtre planifiée :

| Risque        | Signification                                        |
| ------------- | ---------------------------------------------------- |
| **Sur la bonne voie** | Le rythme actuel correspond à l'ETA planifiée       |
| **À risque**  | Retard probable, mais encore récupérable             |
| **En retard** | Plan déjà manqué — nécessite l'attention du répartiteur |

Utilisez _Risque SLA = En retard_ comme premier filtre du répartiteur le matin.

## Actions sur les lignes (planifiées)

Chaque ligne aura un menu à trois points à droite avec les actions ci-dessous ; aujourd'hui la colonne est masquée en attendant l'API.

| Action          | Ce qu'elle fera                                         |
| --------------- | ------------------------------------------------------- |
| **Voir**        | Ouvrir la page de détail de la course à `/rebalance/runs/:id` |
| **Expédier**    | Passer une course _Planifiée_ à _Expédiée_, en notifiant le conducteur |
| **Réaffecter**  | Changer le conducteur et / ou le fourgon sur la course  |
| **Réoptimiser** | Relancer l'optimiseur d'itinéraire sur les arrêts restants |
| **Imprimer la feuille** | Générer une feuille de course imprimable (résumé pour le conducteur) |
| **Exporter**    | Exporter les données de la course en fichier (filtres / tri respectés) |
| **Modifier**    | Ouvrir l'éditeur de course                              |
| **Annuler**     | Annuler la course — ouvre une boîte de confirmation     |

## États vides / de chargement

- **Chargement** — un indicateur avec "Chargement des courses…" pendant la requête au backend
- **Erreur** — une bannière _Alerte_ avec un bouton _Réessayer_ si la requête échoue
- **Vide** — une icône _Camion_ centrée avec "Aucune course trouvée" ; c'est l'**état attendu aujourd'hui** car le point d'accès ne renvoie aucun élément

## Flux de travail typiques

- **Balayage de répartition matinal** — Filtrer _Statut = Planifié_, trier par date de création, répartir chaque course dans l'ordre
- **Surveillance en direct** — Filtrer _Statut = En cours_, puis _Risque SLA = En retard_ pour identifier les conducteurs nécessitant de l'aide ; une fois activé, le _Rafraîchissement automatique_ maintient la vue à jour
- **Revue de fin de journée** — Filtrer _Statut = Terminé_, parcourir la colonne _Arrêts_ pour les courses avec arrêts échoués, cliquer sur chacune pour le débriefing des incidents
- **Ville par ville** — Filtrer par _Ville_ lors d'opérations multi-villes ; recouper les comptes avec la page [Analytics — Rebalance](runs.md)
- **Tri des incidents** — Filtrer _A des incidents = Oui_ pour afficher toutes les courses ayant eu un problème aujourd'hui
- **Vérification de capacité** — Examiner la colonne _Charge utile_ sur les lignes _En cours_ ; les fourgons proches de la capacité peuvent devoir retourner au dépôt bientôt

## Conseils

- **Les numéros de course sont des identifiants stables** — partagez-les avec l'équipe terrain pour une coordination claire ("regardez la COURSE-2026-0517-003")
- **La colonne Arrêts donne une vue d'ensemble fiable** — `4/7` signifie quatre faits, trois restants ; un _Échoué : N_ en rouge en dessous = nécessite un suivi
- **La "décharge" de la charge utile est importante** — un nombre élevé de batteries déchargées signifie que le fourgon est plein de batteries mortes et devrait passer par un chargeur
- **Créé vs Mis à jour** — _Mis à jour_ s'incrémente à chaque action du conducteur sur la course ; un ancien _Mis à jour_ sur une ligne _En cours_ = le conducteur n'a pas donné de nouvelles depuis un moment
- **Le statut _En pause_ n'est pas une erreur** — les conducteurs font des pauses, gèrent des incidents et interagissent avec les usagers ; les courses en pause longue méritent un appel téléphonique
- **Jusqu'à la mise en service du point d'accès, considérez cette page comme un aperçu de la mise en page / UX** — la structure, les filtres et le langage visuel sont définitifs ; les données sous-jacentes ne le sont pas
