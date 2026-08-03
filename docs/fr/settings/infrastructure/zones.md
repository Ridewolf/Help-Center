# Zones

La page Zones (`/zones`) est l'endroit où vous dessinez les **règles invisibles de votre zone de service** — parkings, zones interdites, zones à vitesse réduite, zones de charge et autres polygones qui modifient le comportement des véhicules et des clients lorsqu'ils franchissent une limite. Chaque zone est un polygone unique sur la carte avec un type, un statut, des paramètres optionnels (vitesse, prix, capacité du véhicule) et des étiquettes.

Les zones déterminent le comportement en temps réel des [Véhicules](../../operations/fleet/vehicles.md) — entrer dans un polygone no-ride coupe le véhicule ; se garer dans un polygone de parking payant applique le tarif.

Permission requise : **Zones** (`u7v8w9`). Les sous-permissions `create` / `edit` / `delete` contrôlent les actions correspondantes.

## Qu'est-ce qu'une zone

Une zone comporte quatre parties essentielles :

1. **Type** — détermine la couleur et la règle appliquée en temps réel (voir le tableau ci-dessous)
2. **Polygone** — exactement un polygone, dessiné sur la carte ; les formes concaves sont acceptées, les trous ne le sont pas
3. **Paramètres** — dépendent du type : vitesse (low-speed), prix (paid-parking), montant (charge), véhicules autorisés (parking, paid-parking, rebalance)
4. **Statut** — `Actif` (appliqué), `Inactif` (enregistré mais ignoré), `Archivé` (caché dans la plupart des listes)

### Types de zones

| Type             | Couleur    | Fonctionnement                                                      |
| ---------------- | ---------- | ------------------------------------------------------------------ |
| **No-go**        | Noir       | Les véhicules ne peuvent pas entrer ni circuler ici               |
| **No-parking**   | Rouge      | Les utilisateurs ne peuvent pas terminer un trajet ici            |
| **No-ride**      | Violet     | Les véhicules sont coupés / refusent de démarrer dans ce polygone |
| **Low-speed**    | Bleu       | Vitesse maximale limitée à la valeur `speed` configurée (km/h)    |
| **Parking**      | Vert       | Parking désigné ; capacité de véhicule optionnelle                 |
| **Paid-parking** | Orange     | Parking payant avec tarif et capacité optionnelle                  |
| **Charge**       | Vert foncé | Zone de récompense — `amount` appliqué quand les utilisateurs terminent ici |
| **Maintenance**  | Rouge foncé| Marqueur interne pour les opérations ; véhicules exclus du flux utilisateur |
| **Rebalance**    | Bleu foncé | Zone cible pour le rééquilibrage de la flotte ; capacité optionnelle |

## Modes d'affichage

Un groupe de bascule dans l'en-tête de la page permet de passer entre trois vues — mêmes données, perspectives différentes.

| Mode      | Idéal pour                                                            |
| --------- | -------------------------------------------------------------------- |
| **Table** | Modifications en masse, tri par nom/type/statut, navigation paginée  |
| **Cards** | Scan visuel avec mini-carte par zone ; défilement infini            |
| **Map**   | Voir toutes les zones superposées sur la carte réelle — utile pour les audits de couverture |

## Filtres

| Filtre  | Type     | Notes                                  |
| ------- | -------- | ------------------------------------ |
| Recherche | Texte   | Recherche dans le nom et la description de la zone |
| Statut  | Liste déroulante | `Actif` / `Inactif` (ou `Tous`)       |
| Type    | Liste déroulante | Un des 9 types (ou `Tous`)          |

Les filtres s'appliquent à tous les modes d'affichage. La vue Carte récupère **toutes** les zones correspondantes (pas de pagination) ; Table et Cartes paginent.

## Colonnes (vue Table)

| Colonne         | Triable ? | Contenu                                                    |
| --------------- | --------- | ---------------------------------------------------------- |
| **Nom de zone** | ✓         | Étiquette + pastille colorée du type ; lien vers la page de détails de la zone |
| **Description** | —         | Description libre optionnelle                              |
| **Type**        | ✓         | Pastille colorée du type (voir tableau des types ci-dessus) |
| **Statut**      | ✓         | `Actif` / `Inactif` / `Archivé`                            |
| **Étiquettes**  | —         | Étiquettes appliquées à la zone                            |

## Actions sur la ligne

Un menu à trois points par ligne. Les actions disponibles dépendent des permissions :

| Action           | Permission | Fonctionnement                                          |
| ---------------- | ---------- | ------------------------------------------------------ |
| **Voir détails** | —          | Ouvre la page de détails de la zone (carte + métadonnées) |
| **Modifier**     | `edit`     | Ouvre le formulaire d'édition de la géométrie/propriétés |
| **Supprimer**    | `delete`   | Suppression définitive — nécessite une confirmation de 3 secondes |

## Actions en masse

Sélectionnez des lignes en vue Table pour faire apparaître la barre d'actions en masse. Toutes les actions modifiant les données nécessitent la capacité `edit` :

- **Changer le type** — repeint plusieurs zones en un nouveau type d'un coup (paramètres réinitialisés en conséquence)
- **Changer la limite de véhicules** — définit `allowedVehicles` sur la sélection (pertinent pour parking / paid-parking / rebalance)
- **Changer la valeur** — définit la valeur numérique spécifique au type (vitesse / prix / montant)
- **Changer le statut** — bascule Actif ↔ Inactif en masse
- **Changer les étiquettes** — ajoute ou remplace les étiquettes sur la sélection
- **Exporter la sélection** — télécharge uniquement les zones sélectionnées au format JSON (pas de permission requise ; côté client)

## Création — l'assistant en 5 étapes

`+ Créer` ouvre un formulaire guidé. Vous pouvez revenir en arrière librement ; les sauts en avant sont débloqués uniquement lorsque l'étape en cours est valide.

1. **Nom et description** — `Label` (obligatoire) et une `Description` optionnelle
2. **Classification** — `Type` (obligatoire, détermine la couleur et la forme du paramètre), `Statut` (Actif / Inactif / Archivé), `Étiquettes`
3. **Paramètres** — entrées numériques spécifiques au type avec un curseur 0–100 pour une saisie rapide : vitesse (km/h), prix, montant ou véhicules autorisés. Les types sans paramètres affichent un message "pas de paramètres" et permettent d'avancer
4. **Géométrie** — dessinez exactement **1 polygone** sur la carte. Les zones existantes peuvent être affichées en superposition en pointillés pour éviter les chevauchements. Contrôles de la carte : dessiner, modifier, ajouter des points, annuler (jusqu'à 20 étapes), supprimer, zoomer, ajuster aux limites, localisation, plein écran
5. **Revue** — résumé final en lecture seule de chaque champ plus le nombre de points du polygone

L'enregistrement crée la zone et vous redirige vers sa page de détails.

## Formulaire de modification

`Modifier` réutilise la même interface mais en formulaire sur une seule page (sans étapes) — changez le label, le type, le statut, les paramètres, les étiquettes ou redessinez le polygone, puis Enregistrez. Une alerte de sauvegarde non effectuée s'affiche avant de quitter la page.

## Importer / Exporter

Deux boutons en contour à côté de **+ Créer** :

- **Importer** — choisissez un fichier `.json` exporté précédemment ; le tableau de bord valide le contenu et crée les zones côté serveur. Nécessite la capacité `create`
- **Exporter** — ouvre une boîte de dialogue où vous choisissez ce que vous voulez télécharger : la page actuelle, toutes les pages avec les filtres en cours, ou tout. La barre d'actions groupées propose aussi "Exporter la sélection" pour les lignes surlignées

## Page de détails

Cliquer sur une ligne (ou _Voir les détails_) ouvre la page de détails de la zone avec :

- Un aperçu cartographique en direct du polygone
- Une carte d'informations basiques (label, description, type, statut, couleur)
- Une carte des paramètres (vitesse / prix / montant / véhicules autorisés, selon le cas)
- Les étiquettes
- Les horodatages de création / mise à jour
- Les boutons Modifier et Supprimer dans l'en-tête (contrôlés par permissions)

## Flux de travail typiques

- **Lancer une nouvelle ville** — Importez un pack JSON de zones si vous en avez un, sinon dessinez d'abord l'anneau d'interdiction, puis les polygones de stationnement à l'intérieur
- **Ajuster une zone à vitesse réduite** — Modifier → étape 3 → augmenter la valeur de vitesse → Enregistrer. Actif immédiatement
- **Fermer un parking pour une journée** — Modifier → Statut = Inactif → Enregistrer. Remettez en actif à la réouverture
- **Rezonage après un changement en ville** — sélection groupée des zones affectées → Changer le type → confirmer. Les anciens paramètres spécifiques au type sont automatiquement effacés
- **Audit de couverture** — passez en vue Carte, filtrez par Statut = Actif, vérifiez les lacunes et chevauchements

## Conseils

- **Le type détermine tout** — couleur, forme du paramètre, règle d'exécution. Choisir le mauvais type est la cause la plus fréquente de retouches
- **Un polygone par zone** — divisez les zones complexes en plusieurs zones ; l'éditeur impose un seul polygone
- **Les zones qui se chevauchent sont autorisées** — la règle la plus restrictive l'emporte (interdiction > interdiction de circulation > vitesse réduite), n'hésitez pas à superposer une zone à vitesse réduite dans un polygone de stationnement
- **Utilisez la superposition en pointillés** — activez "Afficher les zones existantes sur la carte" dans l'éditeur pour éviter les chevauchements accidentels avec les voisins
- **Inactif ≠ Supprimé** — changez le Statut pour mettre une zone en pause temporairement ; Supprimer est définitif (confirmation par maintien 3 secondes pour sécurité)
- **Étiquetez vos zones** — les étiquettes sont le seul filtre multi-sélection qui persiste entre les modes de vue. Utilisez-les pour grouper par quartier, campagne ou propriété
- **Exportez avant les modifications groupées** — un clic dans la boîte d'export sauvegarde l'ensemble, ainsi une modification groupée ratée peut être annulée par un Import
