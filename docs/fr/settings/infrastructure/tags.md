# Étiquettes

La page Étiquettes (`/settings/tags`) est la **bibliothèque d'étiquettes partagée** pour votre entreprise. Une étiquette est un badge nommé que vous pouvez attacher aux véhicules, clients, opérateurs, trajets et paiements pour les filtrer, regrouper et générer des rapports. La liste ici est la source unique de vérité — lorsque vous ajoutez une étiquette, elle devient disponible partout où elle est prise en charge.

Permission requise : **Étiquettes** (`d1e2f3`). Les sous-permissions contrôlent la création, la modification et la suppression.

## Où les étiquettes sont utilisées

Les étiquettes constituent un **pool global unique** — il n'y a pas de portée par entité. La même étiquette peut être attachée à différents types d'enregistrements :

- **[Véhicules](../../operations/fleet/vehicles.md)** — par exemple « Besoin de nettoyage », « Maintenance prioritaire », « Flotte test »
- **[Clients](../../operations/customers/clients.md)** — par exemple « VIP », « Entreprise », « Liste noire »
- **[Opérateurs](../access/operators.md)** — par exemple « Équipe de nuit », « Formateur », « De garde »
- **Trajets** — étiquetés pour révision, litige ou suivi de campagne
- **Paiements** — étiquetés pour rapprochement ou suivi

Chaque enregistrement peut porter plusieurs étiquettes ; le filtrage par étiquette est disponible sur toutes les listes qui les supportent.

## Filtres

| Filtre  | Type | Notes                                     |
| ------- | ---- | ----------------------------------------- |
| Recherche | Texte | Recherche dans le nom (libellé) et la description de l'étiquette |

La liste affiche par défaut 50 lignes par page et efface les filtres avec l'action **Effacer**.

## Colonnes

| Colonne         | Triable ? | Contenu                                                        |
| --------------- | --------- | -------------------------------------------------------------- |
| **Nom de l'étiquette** | OUI       | Icône + libellé de l'étiquette ; lien vers la page de détail de l'étiquette |
| **Statut**      | OUI       | `Public` ou `Privé` (voir ci-dessous)                          |
| **Description** | NON       | Description libre ; espace réservé « Pas de description » si vide |
| **Dates**       | OUI       | Date de création en haut, date de mise à jour en dessous      |

L'en-tête de la page propose aussi **Actualisation automatique**, **+ Créer**, **Importer** (bientôt disponible) et **Exporter** (téléchargement JSON — page courante, tout filtré ou pages spécifiques).

## Actions sur les lignes

Un menu à trois points par ligne. Les actions disponibles dépendent des permissions :

| Action           | Permission | Fonctionnalité                                                                                  |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| **Voir détails** | —          | Ouvre la page de détail de l'étiquette                                                        |
| **Modifier**     | `edit`     | Ouvre le formulaire de modification (libellé, statut, description)                             |
| **Supprimer**   | `delete`   | Supprime l'étiquette de l'entreprise. **Les enregistrements précédemment étiquetés perdent la liaison** — à utiliser avec précaution |

La suppression nécessite une confirmation avec un maintien de 3 secondes pour éviter les accidents.

## Page de détail

Cliquer sur une ligne (ou _Voir détails_) ouvre la page de détail de l'étiquette avec :

- **Informations sur l'étiquette** — libellé, statut, description (rendu avec prise en charge Markdown)
- **Métadonnées** — ID interne, horodatages de création / mise à jour

Modifier et Supprimer sont également disponibles dans les actions de l'en-tête sur la page de détail.

## Formulaire de création / modification

Le **formulaire d'étiquette** (`+ Créer` ou _Modifier_) comporte trois champs :

- **Libellé** (obligatoire) — nom visible de l'étiquette ; doit être suffisamment unique pour être reconnu d’un coup d’œil
- **Statut** (obligatoire) — `Public` ou `Privé`
  - **Public** — visible et sélectionnable par tous les opérateurs de l’entreprise
  - **Privé** — visibilité restreinte ; utile pour des workflows d’étiquetage internes ou réservés aux administrateurs
- **Description** (optionnelle) — texte libre expliquant quand utiliser l’étiquette ; affichée sur la page de détail

Un **aperçu** en direct dans la barre latérale montre comment le libellé et la description de l’étiquette apparaîtront pendant la saisie. Enregistrer valide que le libellé n’est pas vide, écrit dans le pool d’étiquettes de l’entreprise, et vide le cache partagé des étiquettes pour que les autres pages rechargent à leur prochaine ouverture.

## Flux de travail typiques

- **Ajouter un nouveau libellé** — `+ Créer` → taper le libellé → choisir Public/Privé → décrire éventuellement quand l’utiliser → Enregistrer → l’étiquette est immédiatement disponible dans les filtres et formulaires de modification des Véhicules / Clients / Opérateurs
- **Renommer une étiquette** — Modifier → changer le Libellé → Enregistrer (chaque enregistrement déjà étiqueté conserve la liaison ; le nouveau nom s’affiche partout)
- **Retirer une étiquette** — Supprimer depuis le menu de ligne, ou d’abord définir le Statut sur Privé pour la cacher des nouveaux étiquetages tout en conservant les liaisons historiques (vous la rattachez ensuite uniquement via modification directe)
- **Nettoyer les doublons** — rechercher dans la liste pour repérer les quasi-doublons (« vip » vs « VIP ») → modifier l’un pour fusionner les noms, puis supprimer l’autre (note : les enregistrements sous l’étiquette supprimée perdront la liaison — réétiquetez-les d’abord)
- **Exportation en masse** — Exporter → Tout filtré → téléchargement JSON pour partager avec votre équipe ou sauvegarder la taxonomie

## Conseils

- **Les étiquettes sont globales** — il n’y a pas d’espace de noms séparé « étiquettes clients » vs « étiquettes véhicules ». Nommez-les assez clairement pour qu’une étiquette comme « VIP » ait du sens sur n’importe quelle entité à laquelle elle est attachée, ou utilisez des préfixes (« client:vip », « vehicle:maintenance ») pour garder de l’ordre
- **Public est le défaut** — laissez-le Public sauf si vous avez une raison spécifique de restreindre la visibilité
- **Supprimer est destructeur** — chaque enregistrement portant l’étiquette perd immédiatement la liaison ; il n’y a pas de suppression douce. Préférez renommer ou passer en Privé si vous n’êtes pas sûr
- **La description supporte Markdown** dans la vue détail — utilisez-la pour documenter qui doit appliquer l’étiquette et quand
- **Le cache partagé est vidé à chaque enregistrement / suppression** — les autres onglets ouverts prendront en compte vos modifications à leur prochaine navigation, sans rechargement complet
- **Les noms d’étiquettes apparaissent partout dans les filtres contextuels de Ridewolf** — gardez-les courts et compatibles avec les minuscules pour la meilleure expérience utilisateur dans les tableaux denses
