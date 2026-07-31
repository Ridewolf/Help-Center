# Localisation

La page Localisation (`/settings/localization`) est le **banc de travail de traduction** — une bibliothèque de _Collections_ (groupes de clés de traduction liées) que vous éditez, importez, exportez et publiez. Chaque collection a un espace de noms (par exemple `ui`, `auth`, `rides`), une langue de base (toujours `en`), un ensemble de langues cibles et une liste de clés avec des valeurs par langue.

> _Note_ : cette page est actuellement un **prototype uniquement front-end** — les collections sont initialisées depuis `mockData.ts` et conservées en état local. _Enregistrer_ et _Publier_ affichent des notifications de confirmation mais aucun point de terminaison backend n'existe encore. La page est sûre à utiliser comme spécification pour l'API ; rien de ce que vous faites ici n'est persistant.

Permission requise : aucun `requiredPermissions` spécifique n'est défini sur la route — tout opérateur connecté peut l'ouvrir.

## Mise en page

Une seule ligne d'en-tête avec le titre de la page, une zone de recherche, un menu déroulant _Importer / Exporter_ et un bouton _+ Créer une collection_ — puis une carte Filtres et le tableau des Collections.

Données de référence (actuellement codées en dur dans `Localization.vue`) :

- Langues : `en`, `ro`, `ru`, `de`, `fr`, `es` (base + 5 cibles)
- Espaces de noms : `ui`, `auth`, `rides`, `payments`, `marketing`
- Étiquettes : `core`, `beta`, `promo`, `legacy`

## Filtres

Une carte Filtres est placée au-dessus du tableau.

| Filtre    | Type           | Notes                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Langue   | Menu déroulant | Filtre les collections qui incluent cette langue. Par défaut `ro`            |
| Espace de noms | Menu déroulant | Un des espaces de noms listés (ou vide pour tous)                            |
| Statut    | Menu déroulant | `all`, `active`, `draft`, `archived`                                         |
| Étiquettes| Puces à bascule| Sélection multiple de puces d’étiquettes — une collection doit porter _toutes_ les étiquettes cochées pour passer |
| Recherche | Texte (barre d’outils) | Délai de 300 ms — correspond au nom, description, espace de noms           |

Un bouton _Effacer_ sur la carte Filtres réinitialise les quatre filtres.

## Tableau des collections

| Colonne    | Triable ? | Contenu                                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Collection | —         | Nom + description sur 1 ligne                                                                                         |
| Espace de noms | —         | Badge avec la chaîne de l’espace de noms                                                                              |
| Langues   | —         | Badge par langue. La langue de base a la variante principale ; les cibles sont secondaires. Le survol montre _base_ vs _cible_ |
| Clés      | —         | Nombre total de clés. Le survol affiche une répartition par drapeau (_manquantes_, _modifiées_, _obsolètes_)            |
| Statut    | —         | Badge — `active` / `draft` / `archived`                                                                               |
| Mis à jour| —         | Date relative. Le survol affiche l’auteur                                                                               |
| Actions   | —         | Menu à trois points par ligne                                                                                          |

Pagination en bas : _Précédent / Suivant_, nombre total et un sélecteur par page (10 / 20 / 50).

### Actions sur la ligne

| Action    | Fonctionnalité                                                                 |
| --------- | ------------------------------------------------------------------------------ |
| Voir      | Ouvre la boîte de dialogue Collection en mode lecture seule _vue_              |
| Modifier  | Ouvre la boîte de dialogue Collection en mode _édition_                        |
| Dupliquer | Clone la collection avec le suffixe " (Copie)" en haut de la liste            |
| Importer  | Ouvre la boîte de dialogue Collection centrée sur l’onglet _Importer / Exporter_ en mode importation |
| Exporter  | Notification — espace réservé pour télécharger la collection dans le format choisi |
| Archiver  | Change le statut en `archived` (la ligne reste — filtre Statut pour voir les archivées) |
| Supprimer | Supprime la ligne de la liste locale                                          |

## Créer / Modifier / Voir — la boîte de dialogue Collection

S’ouvre depuis + Créer ou l’une des actions sur la ligne. Quatre onglets dans la boîte de dialogue.

### Onglet Aperçu

Modifier les métadonnées de la collection.

- _Nom_ (obligatoire) — nom affiché (ex. « Étiquettes UI »).
- _Espace de noms_ — sélecteur avec champ de recherche.
- _Description_ — court résumé.
- _Langue de base_ — lecture seule, toujours `en`.
- _Langues cibles_ — puces activables parmi les cinq options non anglaises. La base + cibles forment ensemble l’ensemble des colonnes de langue dans l’onglet Clés.
- _Statut_ — `active` / `draft` / `archived`.
- _Étiquettes_ — puces activables parmi la liste d’étiquettes.

### Onglet Clés

La grille de traduction proprement dite.

- Barre d’outils : une zone de recherche (correspond au nom de la clé et à toute valeur), un filtre de statut (ex. _Manquantes uniquement_), un sélecteur de langue (quelle colonne cible est mise en surbrillance comme focus d’édition).
- Actions groupées quand des clés sont sélectionnées : _Définir le statut_, _Effacer les valeurs_, _Exporter la sélection_, _Supprimer_.
- Actions par ligne : dupliquer la clé, supprimer la clé, copier depuis l’anglais (remplit la cible actuelle avec la valeur EN), valider les espaces réservés (vérifie que des éléments comme `{{name}}` en EN sont préservés dans la cible).
- Chaque ligne porte des drapeaux optionnels affichés sous forme de badges :

| Drapeau    | Signification                                                   |
| ---------- | -------------------------------------------------------------- |
| `new`      | Clé ajoutée récemment — nécessite une revue humaine            |
| `changed`  | Valeur EN modifiée depuis la dernière traduction — cibles peut-être obsolètes |
| `missing`  | Valeur vide dans au moins une langue cible                     |
| `obsolete` | Clé plus utilisée dans le code — suppression sans risque       |

- _Ajouter une clé_ et _Rechercher & remplacer_ ouvrent des mini-dialogues dédiés.
- Bascule _Sauvegarde automatique_ — quand activée, les modifications d'une valeur sont immédiatement enregistrées dans l'état local.

### Onglet Importer / Exporter

Importer :

- _Format_ — JSON / CSV / XLSX.
- _Mode_ — remplacer les valeurs existantes / fusionner / ajouter.
- Interrupteur _Conserver les clés inconnues_ — quand désactivé, les clés absentes du fichier importé sont marquées `obsolete`.
- _Simuler_ — exécution à blanc qui rapporte ce qui changerait (sans écriture).
- _Appliquer_ — valider l'import. Une barre de progression s'affiche pendant l'exécution.

Exporter :

- _Format_ — JSON / CSV / XLSX.
- _Portée_ — toutes les clés / clés filtrées / clés sélectionnées.
- _Télécharger_ — action fictive (notification pour l'instant).

### Onglet Publier

- Un bloc récapitulatif : _N clés au total / M modifiées / K manquantes_.
- Une liste des clés modifiées avec valeurs avant / après.
- Une liste d'avertissements (ex. incohérence de placeholder, cible manquante).
- _Enregistrer le brouillon_ — sauvegarde la copie de travail comme brouillon (`status = draft`).
- _Publier_ — promeut le brouillon en `active` et affiche une notification.

## Barre d'outils supérieure — menu Importer / Exporter

Deux raccourcis globaux dans l'en-tête de page (séparés des actions par collection) :

- _Importer des collections_ — ouvre le dialogue d'import au niveau de la page (import en masse de plusieurs collections).
- _Exporter tout_ — raccourci pour exporter toutes les collections en un seul paquet (notification pour l'instant).

## Modifications non enregistrées & garde de navigation

Il y a un indicateur global « modifications non enregistrées » (`hasUnsavedGlobal`) — quand il est actif, un pied de page fixe avec _Abandonner_ / _Enregistrer_ apparaît. La page installe aussi un garde `router.beforeEach` : tenter de quitter avec des modifications non enregistrées déclenche un dialogue natif de confirmation du navigateur.

## Flux de travail

- **Traduire une nouvelle clé en roumain** — Choisir la collection dans le tableau → Modifier → onglet Clés → régler le sélecteur de langue sur `ro` → trouver la clé (ou _Ajouter une clé_) → remplir la valeur → _Enregistrer_ (ou activer la Sauvegarde automatique).
- **Auditer ce qui manque en français** — Modifier une collection → onglet Clés → filtre de statut _Manquantes uniquement_ → langue _fr_. Utiliser _Copier depuis l'anglais_ comme solution rapide, ou _Valider les placeholders_ avant publication.
- **Mise à jour en masse depuis un XLSX** — Modifier la collection → onglet Importer / Exporter → choisir XLSX, mode _Fusion_, _Simuler_ d'abord → vérifier la différence → _Appliquer_.
- **Promouvoir les chaînes du brouillon en production** — Modifier la collection → onglet Publier → confirmer la liste des clés modifiées, corriger les avertissements → _Publier_.
- **Dériver une variante pour un nouveau marché** — Dupliquer la collection → renommer → ajouter la nouvelle langue dans _Langues cibles_ → traduire.
- **Archiver un ensemble obsolète** — Menu de ligne → Archiver. La collection reste dans le tableau mais passe au statut `archived` ; filtrer par Statut pour la retrouver plus tard.

## Conseils

- **Front-end uniquement pour l'instant.** Rien ici ne touche encore le backend — `Enregistrer`, `Publier`, `Exporter`, `Supprimer`, `Archiver` sont toutes des mutations d'état local + notifications. Ne comptez pas dessus pour des chaînes de production réelles avant la sortie de l'API.
- **La langue de base est verrouillée.** `en` est toujours la base — les collections non anglaises doivent être créées comme langues cibles d'une collection de base anglaise, pas en autonome.
- **Les étiquettes utilisent la logique ET.** Filtrer par deux puces d'étiquette signifie que la collection doit porter _les deux_ étiquettes. Pour chercher par l'une ou l'autre, effacez une des puces.
- **La garde de navigation est globale.** Même si seul un dialogue est modifié, quitter la page demande confirmation — enregistrez ou abandonnez explicitement pour éviter la demande.
- **La validation des placeholders est votre alliée** — la lancer avant la publication détecte les erreurs du type « on a perdu le `{{name}}` dans la traduction » qui cassent la chaîne affichée à l'exécution.
- **Ne pas confondre avec l'onglet Locale dans [General](general.md)** — cet onglet définit les valeurs par défaut (quelles langues sont _activées_, formats date / heure / unité). Cette page contient les chaînes effectivement traduites.
- **Les données de référence sont factices.** Langues, espaces de noms et étiquettes sont actuellement codés en dur — quand le backend sera disponible, attendez-vous à ce qu'ils proviennent de l'API et soient peut-être modifiables.
