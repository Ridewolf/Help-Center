# Ensembles de FAQ

La page des Ensembles de FAQ (`/settings/faq-sets`) est la **bibliothèque de questions-réponses** affichée dans les applications Ridewolf — principalement l'application mobile pour les utilisateurs, mais aussi les interfaces destinées aux opérateurs. Chaque ensemble est un lot d'entrées Q/R destiné à un public spécifique (application utilisateur, application client, mécanicien, administrateur ou général).

Avec les [Guides rapides](quick-guides.md) et les [Ensembles d'icônes](icon-sets.md), cette page fait partie de la couche de contenu — ce qu'un opérateur modifie ici est ce que l'utilisateur voit sur son téléphone, sans mise à jour de l'application mobile.

Permission requise : **Ensembles de FAQ** (vérifiez avec un administrateur).

## Où cela apparaît pour l'utilisateur

Dans l'application mobile pour les utilisateurs, les Ensembles de FAQ alimentent la section Aide / FAQ intégrée. Chaque ensemble de type **rider-app** et au statut `active` est chargé dans l'application ; les entrées marquées `visible` apparaissent, ordonnées selon le champ `order`. Les ensembles de type `client-app`, `mechanic`, `admin`, `general` sont destinés aux applications / interfaces respectives.

Un ensemble `draft` ou `archived` n'est jamais affiché — utile pour préparer des modifications avant publication.

## Filtres

| Filtre  | Type         | Notes                                                                    |
| ------- | ------------ | ------------------------------------------------------------------------ |
| Recherche | Texte       | Champ de recherche dans l'en-tête — recherche dans le titre / description / slug |
| Étiquettes | Multi-sélection | Filtrer par étiquettes appliquées à l'ensemble (onboarding, paiements, technique, …) |
| Statut  | Liste déroulante | `Actif` / `Brouillon` / `Archivé` (ou `Tous`)                           |
| Type    | Liste déroulante | `Application client` / `Application utilisateur` / `Mécanicien` / `Administrateur` / `Général` (ou `Tous`) |

**Tout effacer** réinitialise tous les filtres en une seule fois.

## Colonnes

| Colonne    | Contenu                                                             |
| ---------- | ------------------------------------------------------------------- |
| **Ensemble** | Icône + titre ; ligne secondaire affichant la description ou le slug |
| **Type**  | Pastille d'audience — Application client / Application utilisateur / Mécanicien / Administrateur / Général |
| **Étiquettes** | Les 3 premières étiquettes, avec `+N` pour le surplus               |
| **Éléments** | Nombre de champs Q/R dans l'ensemble                               |
| **Statut** | `Actif` (vert) / `Brouillon` (gris) / `Archivé` (atténué)          |
| **Mis à jour** | Date relative ; survol pour voir l'horodatage complet + auteur    |

Cliquez sur une ligne pour ouvrir la boîte de dialogue **Voir** (aperçu en lecture seule). Cliquez sur le menu à trois points pour les actions.

## Actions sur la ligne

| Action           | Fonction                                                             |
| ---------------- | -------------------------------------------------------------------- |
| **Voir les détails** | Aperçu en lecture seule avec tous les éléments Q/R affichés        |
| **Modifier**     | Ouvre le formulaire (identique à Créer, pré-rempli)                  |
| **Dupliquer**   | Clone l'ensemble avec suffixe de slug `-copy` et statut remis à `Brouillon` |
| **Exporter**    | Télécharge l'ensemble au format ZIP ou JSON                          |
| **Archiver**    | Déplace vers `Archivé` — caché dans l'application utilisateur, conservé pour l'historique |
| **Supprimer**   | Supprime définitivement (destructif — uniquement si vraiment inutile) |

La barre d'outils supérieure propose aussi l'**Importation** en masse (ZIP / JSON) et l'**Exportation** (ZIP / JSON de la liste visible).

## Formulaire de création / modification

La boîte de dialogue du formulaire comporte trois sélecteurs principaux et une liste de champs Q/R :

- **Type** — obligatoire, définit qui voit l'ensemble (Application client / Application utilisateur / Mécanicien / Administrateur / Général)
- **Statut** — `Brouillon` (par défaut pour les nouveaux) / `Actif` / `Archivé`
- **Étiquettes** — multi-sélection, utilisées pour filtrer et grouper
- **Titre** — obligatoire, affiché comme nom de l'ensemble
- **Description** — optionnelle, ligne secondaire dans la liste
- **Champs** — les entrées Q/R. Chaque champ a :
  - **Libellé** (la question)
  - **Valeur** (la réponse)
  - **Type** — `text` / `markdown` / `link` / `list`
  - **Visible** (bouton bascule pour masquer sans supprimer)
  - **Ordre** (glisser pour réordonner)

Le slug est dérivé du titre et utilisé dans l'URL de l'API — modifiez-le via Modifier si nécessaire.

## Flux de travail typiques

- **Publier une nouvelle FAQ utilisateur** — `+ Créer un ensemble` → Type = Application utilisateur, Statut = Brouillon → remplir titre + description → ajouter des champs Q/R → enregistrer → prévisualiser via Voir les détails → Modifier, passer Statut à Actif → il apparaît dans l'application utilisateur au prochain chargement
- **Préparer un contenu saisonnier** — Dupliquer un ensemble existant → modifier la copie en Brouillon → programmer le changement en archivant l'ancien ensemble et en activant le nouveau en une seule opération
- **Revenir sur une mauvaise réponse** — ouvrir l'ensemble concerné → Modifier → corriger le champ (ou désactiver `Visible`) → enregistrer ; ou Archiver l'ensemble complet et revenir à une version dupliquée antérieure
- **Importer en masse depuis un dump JSON** — en haut à droite _Importer_ → choisir le fichier → confirmer la structure analysée → importer en Brouillon, puis réviser et Activer

## Conseils

- **Le Type contrôle qui voit le contenu** — ne mettez pas de contenu destiné aux utilisateurs dans un ensemble `mécanicien`, il n'atteindra jamais l'application utilisateur
- **Le Brouillon est votre ami** — les nouveaux ensembles sont par défaut en Brouillon pour éviter d'afficher un contenu incomplet dans l'application utilisateur. Passez à Actif seulement après révision complète
- **Les champs Markdown rendent la mise en forme** — utilisez-les pour des réponses nécessitant des listes à puces ou du gras ; choisissez `text` pour du texte simple
- **Les Étiquettes sont partagées avec le filtre** — utilisez un vocabulaire d'étiquettes cohérent (ex. `onboarding`, `payments`, `troubleshooting`) pour que le filtrage reste pertinent
- **Archivez plutôt que Supprimez** quand c'est possible — les ensembles supprimés disparaissent définitivement, les ensembles archivés peuvent être réactivés et servent d'historique
