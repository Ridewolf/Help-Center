# Règles des véhicules

La page Règles des véhicules (`/settings/vehicle-rules`) est le **catalogue des modèles de véhicules** que Ridewolf sait exploiter — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_, etc. Chaque ligne ici est un **modèle type** : un ensemble réutilisable de tarification, limites techniques, règles de preuve photo et étiquettes qui est attaché à des [véhicules](../../operations/fleet/vehicles.md) physiques individuels via le [formulaire véhicule](../../operations/fleet/vehicle-create-edit.md).

Permission requise : **Règles des véhicules** (`e7f8g9`). Sous-permissions contrôlant `create` / `edit` / `delete`.

## Modèle vs instance de véhicule

C’est la distinction la plus importante sur cette page :

- Un **Modèle de véhicule** (cette page) — une définition. _« Chaque Xiaomi M365 de notre flotte se comporte ainsi »_. Une ligne par marque/configuration.
- Un **Véhicule** (la [liste des Véhicules](../../operations/fleet/vehicles.md)) — une unité physique avec une étiquette autocollante comme `RW-007`, liée à un appareil IoT, stationnée quelque part. Des centaines de ces unités pointent vers un seul modèle.

Lorsque vous modifiez un modèle ici, chaque véhicule qui y est lié hérite des nouveaux paramètres par défaut — les tarifs deviennent actifs, les limites de vitesse se mettent à jour, les exigences de preuve photo s’appliquent. Considérez cette page comme une **couche de politique** qui se déploie simultanément sur de nombreuses unités.

## Filtres

La barre de filtres en haut comporte trois contrôles :

| Filtre      | Type     | Notes                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------- |
| **Recherche** | Texte    | Recherche dans le libellé du modèle                                                  |
| **Statut**  | Liste déroulante | `Tous` / `Actif` / `Inactif` / `Archivé`                                         |
| **Type**    | Liste déroulante | `Tous` / `Trottinette électrique` / `Vélo électrique` / `Vélo cargo électrique` / `Mobylette électrique` / `Voiture électrique` / `Bateau électrique` |

Modifier un filtre réinitialise la pagination à la page 1 et recharge depuis le serveur.

## Colonnes

| Colonne         | Triable ? | Contenu                                                                                      |
| --------------- | --------- | -------------------------------------------------------------------------------------------- |
| **Image**       | —         | Vignette 64×64 ; icône générique de voiture si aucune image n’est téléversée                  |
| **Nom**         | ✓         | Libellé du modèle (ex. _Xiaomi M365 Pro_)                                                   |
| **Type**        | ✓         | Pastille du type de véhicule (trottinette électrique, vélo électrique, …)                    |
| **Description** | ✓         | Premiers 36 caractères de la description markdown, sans mise en forme                        |
| **Étiquettes**  | —         | Jusqu’à 2 pastilles d’étiquettes + une puce `+N` pour le dépassement — **clic pour édition rapide** dans une boîte de dialogue |
| **Statut**      | ✓         | Pastille colorée : Actif (vert) / Inactif (gris) / Archivé (bleu) — **clic pour édition rapide** |
| **Créé le**     | ✓         | Date de création du modèle                                                                  |
| **Mis à jour**  | ✓         | Date de la dernière modification                                                            |

Les clics d’édition rapide ouvrent une petite boîte de dialogue avec uniquement la multi-sélection d’étiquettes ou la liste déroulante de statut — utile pour modifier en masse les statuts sans quitter la liste.

## Actions de la barre d’outils

Boutons en haut à droite (visibilité selon permissions) :

| Bouton           | Permission | Fonction                                                                                                                    |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Actualisation auto** | —          | Interroge la liste à intervalle régulier ; bascule on/off ; l’icône tourne pendant le chargement                            |
| **Importer**     | `create`   | Choisir un fichier JSON (format export). Chaque élément devient un appel `create` ; les étiquettes et tarifs sont supprimés — à rattacher manuellement après |
| **Exporter**     | —          | Ouvre une boîte de dialogue pour exporter la page courante / toutes filtrées / pages spécifiques en `vehicle-models-export.json` |
| **+ Créer**      | `create`   | Va à `/settings/vehicle-rules/create`                                                                                        |

## Actions sur la ligne

Menu à trois points par ligne :

| Action           | Permission | Fonction                                                                                                                   |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Voir détails** | —          | Ouvre le détail du modèle à `/settings/vehicle-rules/:id` (onglets Général / Technique / Historique)                        |
| **Modifier**     | `edit`     | Ouvre le formulaire d’édition (`/settings/vehicle-rules/:id/edit`) avec l’ensemble complet des champs                      |
| **Supprimer**   | `delete`   | Boîte de dialogue de confirmation destructive avec délai de 3 secondes avant activation du bouton confirmer. La ligne disparaît de la liste |

Cliquer sur la ligne elle-même (n’importe où en dehors des puces d’édition rapide) ouvre **Voir détails**.

## Formulaire de création / modification

`+ Créer` (`/settings/vehicle-rules/create`) et _Modifier_ (`/settings/vehicle-rules/:id/edit`) partagent la même mise en page : une carte formulaire à gauche, une barre latérale contextuelle **Guide des champs** à droite avec un aperçu en direct du modèle.

Le formulaire est organisé en sections — Création affiche seulement les sept champs principaux ; Modification ajoute trois sous-sections supplémentaires (Spécifications techniques, Politiques automatiques, Exigences documentaires) pour les réglages avancés.

### Champs principaux

| Champ            | Obligatoire | Remarques                                                                                                                             |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Libellé**      | ✓           | Nom affiché partout (ex. _Xiaomi M365 Pro_). Texte libre                                                                             |
| **Description**  | —           | Éditeur Markdown ; utilisé dans le détail du modèle et dans les conseils destinés à l'opérateur                                      |
| **Type de véhicule** | ✓        | Un de : trottinette électrique / vélo électrique / vélo cargo électrique / cyclomoteur électrique / voiture électrique / bateau électrique. Contrôle l'icône et la logique de catégorie |
| **Statut**       | ✓           | Actif / Inactif / Archivé. Inactif retire le modèle du sélecteur de création de véhicule                                              |
| **Image**        | —           | Glisser-déposer ou clic pour téléverser. PNG/JPEG/JPG, max 10 Mo. Affichée en vignette dans la liste et dans le détail du véhicule    |
| **Tarifs**       | ✓           | Sélection multiple de [Tarifs des véhicules](vehicle-tariffs.md). Tous les trajets sur ce modèle sont tarifés selon ces tarifs       |
| **Étiquettes**   | ✓           | Sélection multiple d’étiquettes au niveau du modèle. Héritées par chaque véhicule de ce modèle                                        |

### Spécifications techniques (mode édition uniquement)

| Champ                              | Remarques                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **Limite de vitesse de base (km/h)** | Plafond strict appliqué par le firmware IoT à chaque trajet                          |
| **Réserve de batterie (%)**        | Niveau de charge en dessous duquel le véhicule est considéré comme faible en batterie  |
| **Réserve d'autonomie (km)**       | Autonomie estimée restante en dessous de laquelle l’unité est signalée pour échange     |
| **Tension batterie min / max (V)** | Limites des lectures valides de la batterie principale — toute valeur hors limites déclenche _Nécessite une enquête_ |
| **Tension IoT min / max (V)**      | Idem, pour la batterie du traceur du module IoT                                       |

### Politiques automatiques (mode édition uniquement)

Basculez le groupe : **Arrêt batterie faible**, **Arrêt solde faible**, **Trajets multiples**, **Verrouillage automatique**, plus **Remboursement automatique** et **Remise automatique** avec leurs propres seuils (distance / temps / montant).

### Exigences documentaires (mode édition uniquement)

Détermine quelles photos / documents un utilisateur doit soumettre :

- **Preuves de départ** — photos du véhicule au début du trajet (bascule + obligatoire + nombre) et selfie du conducteur
- **Preuves de stationnement** — photos du stationnement à la fin du trajet (bascule + obligatoire + nombre)
- **Documents supplémentaires** — permis de conduire / passeport / carte d’identité / selfie / autre

Ces règles sont lues par l'application Rider lors du démarrage / de la fin d’un trajet sur un véhicule lié à ce modèle.

## Relations avec d'autres entités

- **[Tarifs des véhicules](vehicle-tariffs.md)** — les lignes tarifaires que vous sélectionnez dans le champ **Tarifs**. Un modèle sans tarifs ne peut pas tarifer un trajet
- **[Véhicules](../../operations/fleet/vehicles.md)** — unités physiques qui pointent vers ce modèle via le champ _Modèle de véhicule_ du [formulaire véhicule](../../operations/fleet/vehicle-create-edit.md). Le modèle définit la politique ; le véhicule possède l’IoT, le libellé et l’emplacement
- **Étiquettes** — étiquettes au niveau du modèle héritées par chaque véhicule de ce modèle, en plus des étiquettes au niveau du véhicule appliquées directement sur l’unité. Les trajets héritent des deux au début du trajet

## Flux de travail typiques

- **Intégrer un nouveau modèle** — `+ Créer` → remplir Libellé / Type / Statut / Image → choisir les tarifs applicables → enregistrer → ouvrir le nouveau modèle dans la liste et cliquer sur _Modifier_ pour définir les Spécifications techniques et les politiques
- **Retirer un modèle** — ouvrir le modèle → _Modifier_ → définir Statut = _Archivé_ → enregistrer. Les véhicules existants continuent de fonctionner ; le modèle n’apparaît plus dans le sélecteur de création de véhicule
- **Changement de tarif sur toute la flotte** — modifier le modèle → changer les tarifs → enregistrer. Tous les véhicules de ce modèle appliquent les nouveaux tarifs dès le trajet suivant
- **Importation en masse après migration** — exporter depuis la préproduction → importer le fichier JSON ici → rattacher manuellement tarifs et étiquettes sur chaque nouveau modèle (l’import supprime volontairement ces références)
- **Ajuster les exigences photo** — Modifier → Exigences documentaires → basculer Preuves de départ / de stationnement → enregistrer. L’application Rider prend en compte les nouvelles règles au prochain démarrage de trajet

## Conseils

- **Définissez les tarifs avant d’activer** — un modèle sans tarifs rejettera les demandes de tarification de trajet
- **Utilisez Inactif, pas Supprimer, pour retirer** — Inactif masque le modèle de la création de nouveaux véhicules mais conserve l’historique. Supprimer est irréversible et bloqué par un délai de confirmation de 3 secondes pour une bonne raison
- **L’image est importante** — la vignette de la liste et les sélecteurs de véhicule pour l’opérateur utilisent cette image. Recadrez en carré avec un fond transparent pour un rendu optimal
- **Les étiquettes ici sont au niveau du modèle, pas du véhicule** — appliquer une étiquette ici la met sur chaque véhicule de ce modèle. Pour des étiquettes spécifiques à une unité, modifiez le véhicule individuel
- **Alertes des Spécifications techniques** — la réserve de batterie et les limites de tension alimentent le déclencheur _Nécessite une enquête_ ; les définir trop strictement inonde la file d’alertes
- **La barre latérale du Guide de terrain se met à jour selon le champ sélectionné** — lisez-la la première fois que vous créez un modèle, elle est plus à jour que cet article
