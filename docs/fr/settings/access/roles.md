# Rôles

La page **Rôles** (`/settings/roles`) est l'endroit où vous définissez **ce que les opérateurs peuvent faire** dans le Tableau de bord. Un rôle est un ensemble nommé d'autorisations ; chaque opérateur a exactement un rôle ; les autorisations déterminent quelles pages ils voient et quelles actions ils peuvent effectuer.

Associez cette page à [Operators](operators.md) — Operators attribue des rôles aux personnes, Rôles définit ce que chaque rôle peut réellement faire.

Permission requise : **Rôles** (`d4e5f6`).

## Comment fonctionnent les autorisations

Chaque page et action dans le Tableau de bord est protégée par un **ID d'autorisation** (par exemple `k7m8n9` pour Véhicules, `e4f5h6` pour Clients). Un rôle est essentiellement une liste de contrôle de ces IDs d'autorisation :

- Un opérateur peut voir une page uniquement si son rôle possède l'autorisation de cette page
- Une action sur une ligne (Modifier, Supprimer, etc.) est cachée lorsque le rôle ne possède pas la sous-autorisation correspondante
- Les autorisations sont évaluées **à chaque requête** — modifiez un rôle et l'opérateur voit le changement au prochain chargement de page (ou avant)

Il n'y a **pas d'héritage** entre les rôles — chaque rôle est indépendant. Les rôles de confiance plus élevée ont simplement une liste d'autorisations plus longue.

## Rôles par défaut vs personnalisés

Les rôles existent en deux variantes :

| Type        | Modifiable | Objectif                                                                 |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| **Par défaut** | Non       | Livrés avec la plateforme (ex. Propriétaire, Admin). Garantit une base sûre |
| **Personnalisé**  | Oui      | Créés par vous — adaptés à la structure de votre équipe                 |

Les rôles **Propriétaire / Admin** par défaut ne peuvent pas être modifiés ou supprimés — ils sont la sécurité. Les rôles personnalisés sont ceux où vous ajustez les autorisations pour correspondre aux responsabilités réelles.

## Filtres

| Filtre | Type     | Notes                              |
| ------ | -------- | ---------------------------------- |
| Recherche | Texte     | Recherche dans le nom et la description du rôle |
| Statut | Liste déroulante | `Actif` / `Inactif` (ou `Tous`)   |

## Colonnes

| Colonne          | Triable ? | Contenu                                                                    |
| --------------- | --------- | -------------------------------------------------------------------------- |
| **Nom du rôle**   | ✓         | Le libellé du rôle                                                         |
| **Description** | —         | Texte court expliquant l'objet du rôle                                     |
| **Type**        | —         | Étiquette Par défaut / Personnalisé                                        |
| **Autorisations** | —         | Nombre d'autorisations accordées (ex. « 23 / 84 »)                         |
| **Score de confiance** | ✓         | Score numérique indiquant la puissance du rôle (plus élevé = plus puissant) |
| **Créé le**     | ✓         | Date de création du rôle                                                   |

### Score de confiance

Le score de confiance est une approximation numérique de « à quel point l'ensemble des autorisations de ce rôle est dangereux » — utilisé pour le tri et les indices visuels. Un rôle avec suppression + mise à jour en masse + gestion des autorisations a un score de confiance plus élevé qu'un rôle en lecture seule. Il n'y a pas d'échelle fixe ; considérez-le comme une mesure relative dans votre propre liste de rôles.

## Actions sur les lignes

Un menu à trois points par ligne.

| Action           | Autorisation | Fonction                                                                                      |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------- |
| **Voir détails** | —            | Ouvre la page de détail du rôle avec la liste complète des autorisations                      |
| **Modifier**     | `edit`       | Ouvre le formulaire de modification (désactivé avec notification pour les rôles par défaut)   |
| **Supprimer**    | `delete`     | Supprime le rôle en douceur (avec confirmation ; uniquement pour les rôles personnalisés ; uniquement si aucun opérateur ne le possède) |

Si un rôle est utilisé, le système refusera la suppression et indiquera combien d'opérateurs le possèdent encore — réattribuez-les d'abord.

## Formulaire de création / modification

Le formulaire de rôle affiche chaque autorisation regroupée par domaine (Opérations, Assistance, Analytique, Paramètres, etc.) avec des cases à cocher.

Champs clés :

- **Nom** (obligatoire, unique)
- **Description** (optionnelle mais recommandée)
- **Statut** (Actif / Inactif)
- **Arbre des autorisations** — autorisations au niveau des pages et sous-autorisations, regroupées par domaine

Lorsque vous désactivez une autorisation de page de premier niveau, toutes ses sous-autorisations sont automatiquement désactivées (l'opérateur perd entièrement l'accès à la page). Activer une autorisation de page donne par défaut un accès en lecture seule — vous pouvez ensuite choisir individuellement les sous-autorisations _créer_, _modifier_, _supprimer_, etc.

Un petit indicateur **Score de confiance** se met à jour au fur et à mesure que vous cochez les cases — utile pour vérifier par rapport à des rôles similaires.

## Page de détail du rôle

Cliquer sur une ligne ouvre la page de détail du rôle affichant :

- Nom, description, type, statut
- Score de confiance
- Liste complète des autorisations (lecture seule, regroupée par domaine)
- Journal d'activité : création, dernière modification, par qui
- Liste des opérateurs actuellement assignés (avec liens vers leurs profils)

## Flux de travail typiques

- **Définir une nouvelle équipe** — `+ Créer` → nom (ex. « Chef d'équipe terrain ») → cochez les autorisations nécessaires → Enregistrer → assignez le rôle aux [opérateurs](operators.md) concernés
- **Restreindre un rôle existant** — trouvez le rôle dans la liste → Modifier → décochez les autorisations non désirées → Enregistrer (les opérateurs avec ce rôle perdent l'accès à la prochaine requête)
- **Promouvoir un membre d'équipe** — allez dans [Operators](operators.md) → Modifier → changez le Rôle → Enregistrer (non fait depuis cette page)
- **Auditer qui peut supprimer des véhicules** — ouvrez cette liste → triez par Score de confiance → vérifiez les sous-autorisations Modifier / Supprimer sur Véhicules pour chaque rôle
- **Retirer un rôle** — assurez-vous qu'aucun opérateur ne le possède ([Operators](operators.md) filtre par rôle) → Supprimer

## Conseils

- **Moins c'est mieux** — commencez par un accès en lecture seule et ajoutez des actions spécifiques ; résistez à la tentation de copier un rôle supérieur et de le réduire
- **Testez par usurpation d'identité** (lorsque c'est possible) — avant de déployer un rôle, connectez-vous en tant qu'opérateur test avec ce rôle et essayez les flux de travail
- **Les rôles par défaut sont votre filet de sécurité** — Propriétaire / Admin existent toujours ; si vous vous verrouillez accidentellement hors d'un rôle personnalisé, un Admin peut restaurer l'accès
- **Le score de confiance est une indication, pas une règle** — deux rôles avec le même score de confiance peuvent avoir des permissions très différentes ; vérifiez toujours l'arborescence réelle des permissions
- **Les permissions sont évaluées côté serveur** — les désactiver dans le rôle ne supprime pas la session actuelle de l'opérateur, mais la requête suivante sera refusée
- **Documentez chaque rôle personnalisé** dans le champ Description — six mois plus tard, « Gestionnaire de flotte (lecture + modification, sans suppression) » est un véritable sauveur
