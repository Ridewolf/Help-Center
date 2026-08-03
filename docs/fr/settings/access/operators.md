# Opérateurs

La page **Opérateurs** (`/settings/operators`) est l'**annuaire du personnel** — chaque employé ayant accès au Tableau de bord. Chaque opérateur a un rôle (voir [Rôles](roles.md)), des métadonnées optionnelles de département / poste, des étiquettes pour filtrer, et un statut (Actif / Inactif).

Différent des [Clients](../../operations/customers/clients.md) (vos clients) — les Opérateurs sont l'**équipe interne** qui gère la plateforme.

Permission requise : **Opérateurs** (`t4u5v6`). Des sous-permissions contrôlent les actions de modification.

## Comment les opérateurs arrivent ici

Les opérateurs sont créés par vous (un administrateur) via le bouton **+ Créer** — il n'y a pas d'auto-inscription :

1. **+ Créer** ouvre le formulaire opérateur — nom, e-mail, rôle, département / poste / étiquettes optionnels
2. Le nouvel opérateur reçoit un e-mail avec les instructions de connexion et un mot de passe temporaire
3. Il se connecte, complète son profil (`/profile`), et peut commencer à travailler selon les permissions de son rôle
4. Les opérateurs inactifs ne peuvent pas se connecter — basculez un compte en inactif lorsqu'un employé quitte

## Filtres

| Filtre  | Type         | Notes                                                    |
| ------- | ------------ | -------------------------------------------------------- |
| Recherche | Texte       | Recherche dans le nom, l'e-mail, le poste, le département |
| Statut  | Liste déroulante | `Actif` / `Inactif` (ou `Tous`)                         |
| Étiquettes | Multi-sélection | Filtrer par étiquettes appliquées aux opérateurs (ex. « Équipe de nuit ») |

## Colonnes

| Colonne       | Triable ? | Contenu                                                                 |
| ------------- | --------- | ----------------------------------------------------------------------- |
| **Utilisateur** | ✓       | Avatar + prénom/nom + e-mail ; lien vers la page détail de l'opérateur  |
| **Rôle**       | —        | Pastille du rôle de l'opérateur (lien vers [Rôles](roles.md))           |
| **Département**| —        | Étiquette de département optionnelle                                  |
| **Poste**      | —        | Étiquette de poste optionnelle                                        |
| **Étiquettes** | —        | Étiquettes appliquées à l'opérateur                                   |
| **Statut**     | ✓        | `Actif` (vert) / `Inactif` (gris)                                    |

## Actions sur la ligne

Un menu à trois points par ligne. Les actions disponibles dépendent des permissions :

| Action           | Permission | Fonctionnalité                                   |
| ---------------- | ---------- | ------------------------------------------------ |
| **Voir détails** | —          | Ouvre la page détail de l'opérateur              |
| **Modifier**     | `edit`     | Ouvre le formulaire de modification (nom, rôle, département, etc.) |

Il n'y a **pas d'action Supprimer** — les enregistrements des opérateurs sont conservés pour l'audit. Pour empêcher la connexion, basculez le statut de l'opérateur en _Inactif_ via Modifier.

## Page détail

Cliquer sur une ligne (ou _Voir détails_) ouvre la page détail de l'opérateur avec :

- Infos personnelles (nom, e-mail, téléphone, photo)
- Rôle + instantané des permissions
- Département / poste / étiquettes
- Statut
- Journal d'activité (connexions, changements de rôle)

Modifiez depuis là ou depuis le menu de la ligne — les deux mènent au même formulaire.

## Formulaire Créer / Modifier

Le **formulaire opérateur** (`+ Créer` ou _Modifier_) est simple :

- **Prénom / Nom** (obligatoire)
- **E-mail** (obligatoire, unique parmi les opérateurs)
- **Rôle** (obligatoire, liste déroulante des rôles disponibles — voir [Rôles](roles.md))
- **Département / Poste** (optionnel)
- **Étiquettes** (multi-sélection optionnelle)
- **Statut** (Actif / Inactif)
- Seulement à la création : un champ **mot de passe initial** ou un mot de passe généré automatiquement envoyé par e-mail à l'opérateur

Enregistrer valide et écrit dans le journal d'audit. Les opérateurs nouvellement créés reçoivent automatiquement un e-mail de bienvenue.

## Flux de travail typiques

- **Intégration d'un nouvel employé** — `+ Créer` → remplir nom/e-mail/rôle → Enregistrer → confirmer la réception de l'e-mail de bienvenue → leur demander de se connecter et de compléter leur profil
- **Changement de rôle après promotion** — Modifier → changer le Rôle → Enregistrer (les nouvelles permissions prennent effet à la prochaine requête de l'opérateur, pas rétroactivement)
- **Départ** — Modifier → définir Statut = Inactif → Enregistrer (l'enregistrement reste pour l'audit ; la connexion est bloquée)
- **Planification des équipes par étiquette** — appliquer des étiquettes comme « Équipe de nuit » → filtrer la liste par étiquette pour voir qui est programmé

## Conseils

- **Le rôle est le champ puissant** — soyez prudent lors de sa modification. Rétrograder d'Administrateur à Assistance retire immédiatement les droits d'écriture
- **Inactif ≠ Supprimé** — l'historique de l'opérateur est conservé ; repassez à Actif pour restaurer l'accès
- **La liste est triée par nom par défaut** — si vous avez beaucoup d'opérateurs, recherchez par e-mail ou département plutôt que de faire défiler
- **Les étiquettes ici sont différentes des étiquettes clients** — elles sont spécifiques aux opérateurs (ex. « Équipe de nuit », « Formateur ») et ne partagent pas l'espace de noms
- **Restrictions d'auto-modification** — vous ne pouvez pas changer votre propre rôle depuis le menu de la ligne ; utilisez Profil pour les modifications personnelles
