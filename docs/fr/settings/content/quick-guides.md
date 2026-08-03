# Guides rapides

La page Guides rapides (`/settings/quick-guides`) contient les **tutoriels pas à pas** que l'application mobile Ridewolf pour les utilisateurs affiche pour des sujets comme « Comment louer une trottinette » ou « Liste de contrôle de sécurité ». Chaque guide est une liste ordonnée d'éléments avec une icône, une couleur, un titre et un texte principal — publiés par audience (application utilisateur, application client, mécanicien, administrateur, général).

Avec les [FAQ Sets](faq-sets.md) (blocs Q/R) et les [Icon Sets](icon-sets.md) (illustrations cartographiques), les Guides rapides constituent le troisième pilier de la couche de contenu. Modifiez un guide ici, l'application utilisateur récupère la modification au prochain chargement — aucune mise à jour de l'application n'est nécessaire.

Permission requise : **Guides rapides** (vérifiez avec un administrateur).

## Où cela apparaît pour l'utilisateur

Dans l'application mobile utilisateur, les Guides rapides alimentent les tutoriels d'intégration et les écrans d'astuces en cours de trajet. Chaque guide de type **rider-app** et au statut `active` est chargé ; les éléments marqués `visible` apparaissent dans l'`order`, avec l'`icon` et la `color` configurées à gauche, et le texte `body` développé si `expandByDefault` est vrai.

Les guides de type `client-app`, `mechanic`, `admin`, `general` sont reliés à leurs interfaces respectives.

## Filtres

| Filtre  | Type         | Notes                                                                    |
| ------- | ------------ | ------------------------------------------------------------------------ |
| Recherche | Texte       | Zone de recherche dans l'en-tête — recherche dans le titre / description / slug |
| Étiquettes | Multi-sélection | Filtrer par étiquettes (intégration, bases, technique, paiements, …)    |
| Statut  | Liste déroulante | `Actif` / `Brouillon` / `Archivé` (ou `Tous`)                           |
| Type    | Liste déroulante | `Application client` / `Application utilisateur` / `Mécanicien` / `Administrateur` / `Général` (ou `Tous`) |

**Tout effacer** réinitialise tous les filtres.

## Colonnes

| Colonne    | Contenu                                                             |
| ---------- | ------------------------------------------------------------------- |
| **Ensemble** | Icône de livre + titre ; ligne secondaire affiche la description ou le slug |
| **Type**  | Pastille d'audience — Application client / Application utilisateur / Mécanicien / Administrateur / Général |
| **Étiquettes** | 3 premières étiquettes, avec débordement `+N`                      |
| **Éléments** | Nombre d'étapes dans le guide                                      |
| **Statut** | `Actif` (vert) / `Brouillon` (gris) / `Archivé` (atténué)          |
| **Mis à jour** | Date relative ; survol pour horodatage complet + auteur           |

Cliquez sur une ligne pour ouvrir la boîte de dialogue **Voir** (aperçu de chaque étape). Cliquez sur le menu à trois points pour les actions.

## Actions sur la ligne

| Action           | Fonction                                                         |
| ---------------- | ---------------------------------------------------------------- |
| **Voir les détails** | Aperçu avec chaque élément rendu comme le verrait l'utilisateur |
| **Modifier**     | Ouvre le formulaire (identique à Créer, pré-rempli)              |
| **Dupliquer**   | Clone le guide avec suffixe de slug `-copy` et statut remis à `Brouillon` |
| **Exporter**    | Télécharger en ZIP ou JSON                                        |
| **Archiver**    | Déplacer en `Archivé` — caché dans l'application utilisateur, conservé pour l'historique |
| **Supprimer**   | Supprimer définitivement                                         |

Les boutons **Importer** (ZIP / JSON) et **Exporter** (ZIP / JSON) de la barre d'outils supérieure fonctionnent en masse.

## Formulaire de création / modification

Le formulaire a les mêmes sélecteurs principaux que les FAQ Sets, plus un éditeur plus complet par élément :

- **Type** — obligatoire, définit qui voit le guide
- **Statut** — `Brouillon` / `Actif` / `Archivé`
- **Étiquettes** — multi-sélection
- **Titre / Description** — titre obligatoire, description optionnelle
- **Éléments** — la liste des étapes. Chaque élément a :
  - **Titre** — le titre de l'étape
  - **Corps** — le contenu de l'étape (texte long, texte brut)
  - **Icône** — un nom d'icône Lucide (ex. `MapPin`, `QrCode`, `Shield`)
  - **Couleur** — couleur hexadécimale avec préréglages de la marque (Primaire `#6366f1`, Succès `#22c55e`, Avertissement `#eab308`, Danger `#ef4444`, etc.)
  - **Développer par défaut** — si activé, l'élément s'ouvre développé dans l'application
  - **Visible** — bascule pour masquer un élément sans le supprimer
  - **Ordre** — glisser pour réordonner

Le slug est dérivé du titre et utilisé dans l'URL de l'API.

## Flux de travail typiques

- **Rédiger un nouveau guide d'intégration** — `+ Créer un guide` → Type = Application utilisateur, Statut = Brouillon → ajouter 5–7 éléments ordonnés avec icônes + couleurs → prévisualiser via Voir les détails → passer à Actif → il apparaît dans l'application utilisateur au prochain chargement
- **Rendre une étape optionnelle / la masquer** — Modifier → désactiver `Visible` sur l'élément → enregistrer (l'élément reste dans les données, il ne s'affiche juste plus)
- **Tester un nouveau tutoriel en A/B** — Dupliquer le guide actif → modifier la copie → archiver l'ancien et activer le nouveau ensemble
- **Importer en masse un brouillon de designer** — en haut à droite _Importer_ → ZIP/JSON → confirmer la structure analysée → importer en Brouillon → réviser et Activer

## Conseils

- **Les icônes sont des noms Lucide** — choisissez sur [lucide.dev](https://lucide.dev) pour qu'elles s'affichent dans l'application ; les noms d'icônes mal orthographiés affichent un substitut
- **Colorez les étapes pour faciliter la lecture** — les utilisateurs parcourent les guides. Utilisez Avertissement pour les étapes de « prudence » et Succès pour les états « terminé »
- **`expandByDefault` s'applique généralement à la première étape seulement** — ouvrir tous les éléments par défaut va à l'encontre du principe d'un accordéon. Laissez les autres repliés
- **Le texte du corps est en prose simple, pas en markdown** — gardez les paragraphes courts ; l'application mobile gère la typographie
- **Archivez plutôt que Supprimez** quand vous retirez un guide — vous pouvez toujours le réactiver ou le dupliquer plus tard
- **Utilisez les étiquettes de façon cohérente avec les [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting`, etc. sont un vocabulaire partagé dans la couche de contenu
