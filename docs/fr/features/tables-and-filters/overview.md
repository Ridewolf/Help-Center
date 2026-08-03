# Tableaux et filtres

Presque toutes les pages de liste du Tableau de bord (Véhicules, Trajets, Clients, Paiements, Tickets d'assistance, Preuves de stationnement, Conversations, Analytique, Opérateurs, etc.) partagent la même structure. Une fois que vous connaissez le modèle, chaque page de liste fonctionne de la même manière.

## Anatomie d'une page de liste

De haut en bas :

1. **En-tête de page** — titre, actions au niveau de la page (par ex. _Créer_, _Exporter_)
2. **Barre de recherche** — recherche en texte intégral sur plusieurs champs
3. **Ligne de filtres** — menus déroulants et pastilles pour affiner les résultats
4. **Pastilles de filtres actifs** — pastilles supprimables montrant les filtres actuellement appliqués
5. **Barre d'actions groupées** — apparaît lorsqu'une ou plusieurs lignes sont sélectionnées
6. **Tableau** — colonnes triables, actions sur la ligne à droite
7. **Pagination** — en bas à droite

## Recherche

La barre de recherche interroge les champs les plus pertinents pour cette page (par ex. étiquette, ID, nom du propriétaire).

- **Tapez pour rechercher** — les résultats se filtrent au fur et à mesure de la saisie, avec un court délai pour ne pas surcharger le serveur
- **Effacer** — cliquez sur le × dans le champ ou appuyez sur `Esc`
- La recherche s'exécute **côté serveur** sur l'ensemble des données, pas seulement sur la page courante

## Filtres

Les filtres restreignent l'ensemble des résultats sans recherche textuelle. Chaque filtre est un menu déroulant (sélection unique ou multiple selon le champ).

- **Application instantanée** — les filtres s'appliquent immédiatement, pas de bouton Appliquer
- **Combinaison des filtres avec ET** — plus vous ajoutez, plus c'est restrictif
- **Pastilles de filtres actifs** apparaissent au-dessus du tableau ; cliquez sur le × d'une pastille pour supprimer ce filtre uniquement
- **Tout effacer** — lorsqu'il y a plusieurs filtres appliqués, un bouton _Tout effacer_ est affiché à côté des pastilles

Types de filtres courants :

| Type         | Comportement                                                  |
| ------------ | ------------------------------------------------------------- |
| Statut       | Menu déroulant à sélection unique                             |
| Type / Modèle| Menu déroulant à sélection unique                             |
| Étiquettes   | Sélection multiple avec pastilles dans le menu déroulant     |
| Plage de dates| Widget calendrier (de / à)                                   |
| Plage de nombres| Champs numériques de / à (par ex. batterie 0–30%)           |
| Recherche par ID| Texte libre dans une pastille de filtre (séparée de la recherche principale) |

## Tri

- **Cliquez sur un en-tête de colonne** — tri croissant
- **Cliquez de nouveau** — tri décroissant
- **Cliquez une troisième fois** — annule le tri (retour à l'ordre par défaut)
- Une **icône flèche** (↑ / ↓) apparaît à côté du nom de la colonne quand c'est le tri actif

Toutes les colonnes ne sont pas triables. Les colonnes triables affichent un état au survol subtil sur l'en-tête ; les autres non.

## Pagination

En bas à droite du tableau :

- **Numéros de page** — cliquez sur un numéro pour sauter
- **Flèches Précédent / Suivant** sur les côtés
- **Sélecteur de taille de page** — menu déroulant (typiquement 10 / 20 / 50 / 100 lignes par page)

La pagination est côté serveur. Vos filtres et recherches s'appliquent à **l'ensemble des données**, pas seulement à la page affichée — la page 3 des résultats filtrés est toujours filtrée.

## Actions sur les lignes

Chaque ligne a un **menu à trois points** tout à droite. Le menu ouvre un déroulant avec les actions au niveau de la ligne :

- **Voir** — ouvrir la page de détail
- **Modifier** — ouvrir le formulaire d'édition
- **Supprimer** — supprimer l'enregistrement (avec confirmation)
- **Actions spécifiques à la page** — par ex. _Envoyer une notification_ sur les clients, _Déverrouiller_ sur les véhicules, _Rembourser_ sur les paiements, _Attribuer_ sur les tickets

Les actions visibles dépendent de vos **autorisations** — les actions pour lesquelles vous n'avez pas les droits sont cachées.

## Sélection multiple et actions groupées

Sur les pages qui le supportent (Clients, Véhicules, etc.) :

1. **Sélectionner des lignes** — cliquez sur la case à cocher à gauche de chaque ligne
2. **Sélectionner tout sur cette page** — cliquez sur la case à cocher dans l'en-tête de colonne
3. Une **barre d'actions groupées** apparaît en haut, affichant le nombre sélectionné et les actions groupées disponibles
4. **Choisir une action** — elle s'applique à toutes les lignes sélectionnées
5. **Effacer la sélection** — × sur la barre d'actions groupées, ou décocher la case dans l'en-tête

Actions groupées courantes :

- Ajouter ou retirer des étiquettes
- Envoyer une notification push
- Appliquer une amende ou recharger un solde (clients)
- Changer le statut

## États vides et de chargement

- **Chargement** — des lignes fantômes apparaissent brièvement pendant le chargement des données
- **Aucun résultat** — un message convivial ("Aucun résultat correspondant") avec un bouton _Effacer les filtres_ quand des filtres sont actifs
- **Erreur réseau** — un état d'erreur avec un bouton _Réessayer_ (le plus souvent sur une connexion instable)

## Conseils

- **Attendez le délai de saisie** — après avoir tapé dans la recherche, attendez une fraction de seconde avant de cliquer — le serveur lance la recherche une seule fois quand vous arrêtez de taper
- **Partagez des vues filtrées** — recherche, filtres, tri et page sont reflétés dans l'URL. Copiez l'URL et envoyez-la à un collègue ; il verra exactement la même vue
- **Le bouton retour/avant du navigateur** fonctionne comme prévu — il revient sur vos modifications de filtres
- **Combinez recherche + filtres** — la recherche est une couche de texte libre au-dessus des filtres. Utilisez les filtres pour restreindre par statut/type, puis recherchez un nom dans ce sous-ensemble
- **Augmentez la taille de page** à 100 quand vous voulez parcourir visuellement beaucoup d'enregistrements au lieu de cliquer page par page
- **Les autorisations sont le filtre silencieux** — si un collègue voit des lignes que vous ne voyez pas, c'est presque toujours une différence d'autorisations, pas un bug
