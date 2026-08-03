# Ensembles d'icônes

La page Ensembles d'icônes (`/settings/icon-sets`) est la **bibliothèque d'icônes de carte** que l'application mobile Ridewolf Rider utilise pour afficher les véhicules. Chaque ensemble est lié à un type de véhicule (trottinette électrique, vélo électrique, vélo cargo électrique, mobylette électrique, voiture électrique, bateau électrique) et fournit trois catégories d'icônes SVG : **Sélectionné**, **Non sélectionné** et **Remise**.

Il s'agit d'une infrastructure de contenu — les opérateurs téléversent des SVG ici, l'application rider choisit la bonne icône selon le type de véhicule, le niveau de batterie et si le rider a tapé sur le véhicule sur la carte. Aucun déploiement mobile n'est nécessaire pour changer les illustrations.

Avec les [FAQ Sets](faq-sets.md) et les [Quick Guides](quick-guides.md), c'est la couche de contenu du Tableau de bord.

Permission requise : **Ensembles d'icônes** (vérifiez avec un administrateur).

## Où cela apparaît pour le rider

Sur la carte de l'application rider, chaque épingle de véhicule utilise une icône de l'ensemble actif pour son type de véhicule :

- Les icônes **Non sélectionnées** sont utilisées pour les épingles que le rider n'a pas tapées — six niveaux de batterie (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) pour refléter la charge actuelle
- Les icônes **Sélectionnées** remplacent l'épingle une fois que le rider la tape — mêmes six niveaux de batterie, style différent
- Les icônes **Remise** (5 %, 15 %, 25 %, 35 %, 45 %, 55 % par défaut) s'affichent en superposition sur l'épingle quand le véhicule bénéficie d'un prix promotionnel

Un seul ensemble par type de véhicule peut être marqué **par défaut** — c'est celui que l'application charge quand rien d'autre n'est configuré.

## Filtres

| Filtre          | Type     | Notes                                                                                                            |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Recherche      | Texte    | Zone de recherche dans l'en-tête — recherche par titre / identifiant                                             |
| Type de véhicule | Liste déroulante | `Trottinette électrique` / `Vélo électrique` / `Vélo cargo électrique` / `Mobylette électrique` / `Voiture électrique` / `Bateau électrique` (ou `Tous`) |
| Couverture d'état | Liste déroulante | Filtrer selon ce qui est rempli : `Sélectionné uniquement` / `Non sélectionné uniquement` / `Remise uniquement` / `Couverture complète` (ou `Tous`) |
| Statut         | Liste déroulante | `Actif` / `Brouillon` / `Incomplet` / `Archivé` (ou `Tous`)                                                      |
| Étiquettes     | Combobox | Filtre libre par étiquette (champ affiché mais désactivé pour l'instant — bientôt disponible)                     |

**Tout effacer** réinitialise tous les filtres.

## Colonnes

| Colonne                | Contenu                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Ensemble**           | Icône du paquet + titre ; ligne secondaire affiche l'identifiant          |
| **Type de véhicule**   | Pastille (Trottinette électrique, Vélo électrique, etc.)                  |
| **Icônes sélectionnées**     | Couverture comme `6/6` (combien de niveaux de batterie sont téléversés)  |
| **Icônes non sélectionnées** | Même couverture `n/6` pour les variantes non sélectionnées               |
| **Icônes remise**      | 3 premiers pourcentages de remise sous forme de puces (`5%`, `15%`, `25%`), débordement `+N` |
| **Étiquettes**         | 2 premières puces d'étiquette avec débordement `+N`                      |
| **Mis à jour**         | Date de dernière mise à jour                                             |
| **Statut**             | `Actif` / `Brouillon` / `Incomplet` / `Archivé`                          |

`Incomplet` signifie que l'ensemble manque des icônes dans l'une des trois catégories — l'application rider utilise alors l'ensemble par défaut pour ce type de véhicule jusqu'à ce que vous terminiez le téléversement.

Cliquez sur une ligne pour ouvrir la **boîte de dialogue Détail** — un aperçu visuel de chaque icône de l'ensemble. Cliquez sur le menu à trois points pour les actions.

## Actions sur les lignes

| Action             | Fonctionnalité                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| **Voir les détails** | Ouvre la boîte de dialogue détail avec aperçu de chaque SVG téléversé           |
| **Modifier**        | Ouvre le formulaire multi-onglets (Détails / Sélectionné / Non sélectionné / Remises / Aperçu) |
| **Dupliquer**       | Clone l'ensemble en Brouillon                                                  |
| **Définir par défaut** | Marque cet ensemble comme par défaut pour son type de véhicule — l'application rider le chargera |
| **Télécharger**     | Télécharge l'ensemble en ZIP de tous les SVG                                   |
| **Archiver**        | Déplace vers `Archivé` — conservé pour l'historique, non utilisé par l'application |
| **Supprimer**       | Supprime définitivement                                                        |

Les boutons **Importer** (ZIP / JSON) et **Exporter** (ZIP / JSON) de la barre d'outils supérieure fonctionnent en masse.

## Formulaire de création / modification

Le formulaire est une boîte de dialogue à cinq onglets :

1. **Détails** — titre (obligatoire), identifiant (généré automatiquement), type de véhicule (obligatoire), étiquettes, statut
2. **Sélectionné** — téléversement de 6 SVG, un par niveau de batterie (`bat10` → `bat100`)
3. **Non sélectionné** — mêmes 6 emplacements, pour l'état non sélectionné sur la carte
4. **Remises** — un SVG par pourcentage de remise. Les préréglages par défaut sont `5, 15, 25, 35, 45, 55` mais vous pouvez ajouter/supprimer des lignes
5. **Aperçu** — vérification visuelle de l'ensemble avant enregistrement

Un ensemble avec des emplacements vides dans un onglet est enregistré comme `Incomplet`.

## Flux de travail typiques

- **Actualisez les icônes des trottinettes électriques pour un rebranding** — Dupliquez le jeu par défaut actuel → téléversez de nouveaux SVG dans les trois onglets → enregistrez en tant que Brouillon → prévisualisez → Définissez comme par défaut → l'application Rider le prendra en compte au prochain rafraîchissement
- **Lancez un test A/B sur les icônes** — gardez l'ancien jeu Actif et non par défaut, créez un nouveau jeu Actif + par défaut pour un type de véhicule → revenez en arrière en définissant l'ancien comme par défaut si nécessaire
- **Graphismes de réduction pour les fêtes** — ouvrez le jeu actif → Modifier → onglet Réductions → téléversez des SVG thématiques pour les pourcentages actuellement utilisés → enregistrez
- **Importation en masse d’un ZIP de designer** — en haut à droite _Importer_ → ZIP → confirmez la correspondance des fichiers → vérifiez dans la Prévisualisation → Activez

## Conseils

- **Un seul par défaut par type de véhicule** — définir un nouveau par défaut désactive automatiquement le précédent. Le badge Statut n’a pas besoin d’être `Actif` pour qu’un jeu soit par défaut, mais c’est recommandé
- **Les niveaux de batterie sont fixes** — `bat10/25/40/55/90/100` sont les seules catégories reconnues par l’application ; celle-ci choisit la plus proche selon la charge réelle du véhicule
- **Uniquement des SVG** — les téléversements attendent des fichiers SVG ; les PNG ne s’adaptent pas bien sur les écrans retina
- **`Incomplete` est un garde-fou utile** — cela indique que l’application Rider revient au jeu par défaut, vous évitant ainsi d’envoyer accidentellement un jeu partiellement téléversé
- **Archivez avant de supprimer** — les jeux archivés restent consultables au cas où vous voudriez revenir en arrière
