# Tickets — Liste

La liste des Tickets (`/support/tickets`) est la file d'attente d'assistance pour les problèmes signalés concernant un véhicule — dommages mécaniques, pannes électriques, pièces cassées, problèmes de sécurité, etc. Chaque ticket est lié à un véhicule spécifique et contient une photo, le rapporteur, le type de plainte, un minuteur SLA et un statut.

Pour une enquête par ticket (fil complet, preuves, actions de résolution), consultez la **page de détail du ticket** (ouverte en cliquant sur une ligne).

Pour une interface de file d'attente simplifiée, voir [Ticket Auto Review](ticket-auto-review.md).

Permission requise : **Tickets** (`a8b9c1`).

## Comment les tickets apparaissent ici

Les tickets sont créés à partir de plusieurs sources :

1. **Signalement par le rider** — l'application mobile rider propose un flux "signaler un problème" ; les riders choisissent un type de plainte, prennent une photo, laissent une note
2. **Initié par un opérateur** — un opérateur ouvre un ticket pour un véhicule dont il a constaté un problème (rare ; généralement, le flux des [tâches de maintenance](../../operations/fleet/vehicle-detail.md) est préféré)
3. **Signalé par le système** — des règles IoT ou analytiques peuvent générer automatiquement des tickets (ex. anomalie de batterie)

Chaque nouveau ticket arrive dans cette liste avec un statut (typiquement _En attente_) et démarre son minuteur SLA.

## Filtres

| Filtre         | Type     | Notes                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Recherche      | Texte    | Recherche par ID de ticket, étiquette du véhicule, rapporteur, emplacement                 |
| Statut         | Liste déroulante | Liste pilotée par le backend (`En attente`, `En cours`, `Résolu`, `Ignoré`, `Dupliquer`, etc.) |
| Type de plainte| Liste déroulante | 7 types — voir référence ci-dessous                                                      |

Les filtres se combinent avec ET. Les puces apparaissent au-dessus du tableau ; l'URL reflète l'état actuel.

## Colonnes

| Colonne      | Triable ? | Contenu                                                        |
| ------------ | --------- | -------------------------------------------------------------- |
| **Photo**    | —         | Vignette de la photo de preuve du rider (clic pour agrandir)   |
| **Véhicule** | —         | Étiquette et modèle du véhicule ; clic pour ouvrir le détail du véhicule |
| **SLA**      | —         | Temps restant avant la date limite SLA (devient rouge si dépassé) |
| **Emplacement** | —       | Lieu où le problème a été signalé — coordonnées et/ou adresse  |
| **Rapporteur** | —        | Personne ayant signalé le problème (nom du rider ou étiquette système/opérateur) |
| **Statut**   | —         | Pastille de statut avec couleur (voir référence ci-dessous)    |
| **Dates**    | —         | Horodatages de création / mise à jour                          |

## Types de plainte

Sept types aident à trier les tickets d'un coup d'œil. Chacun est codé par couleur :

| Type                  | Couleur du badge  | Ce que cela signifie généralement                          |
| --------------------- | ----------------- | ---------------------------------------------------------- |
| **Dommage mécanique** | Destructif (rouge) | Collision, cadre cassé, composants pliés                   |
| **Problème électrique** | Avertissement (jaune) | Problèmes d'accélérateur, lumières, capteurs              |
| **Problème de batterie** | Par défaut (bleu) | Ne charge pas, se décharge plus vite que prévu             |
| **Pièces cassées**    | Destructif (rouge) | Béquille manquante, réflecteur absent, freins endommagés   |
| **Problème de sécurité** | Destructif (rouge) | Tout ce qui rend le véhicule dangereux à utiliser          |
| **Propreté**          | Avertissement (jaune) | Sale, odeur, surfaces collantes — urgence moindre          |
| **Autre**             | Contour           | Ne correspond pas aux catégories ci-dessus — lire la description |

Les catégories rouges justifient généralement la mise hors service immédiate du véhicule ; les jaunes/bleues peuvent généralement attendre une fenêtre de service.

## Référence des statuts

La liste des statuts est récupérée depuis le backend, elle peut donc varier légèrement selon le déploiement. Statuts typiques :

| Statut          | Variante          | Signification                                                  |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **En attente**  | Secondaire (gris) | Signalé récemment, personne n'a encore travaillé dessus        |
| **En cours**    | Par défaut (bleu) | Assigné à un opérateur ou tâche de maintenance créée            |
| **Résolu**      | Succès (vert)    | Problème corrigé ; ticket fermé                                |
| **Rejeté**      | Destructif (rouge) | L'opérateur a déterminé que ce n'est pas un vrai problème     |
| **Annulé**     | Destructif (rouge) | Fermé sans résolution (souvent utilisé pour des rapports de faible qualité) |
| **Archivé**    | Contour           | Ancien / historique                                           |
| **Dupliquer**  | (fermé)            | Relié à un ticket antérieur sur le même véhicule                |

Les statuts contenant _résolu_, _ignoré_ ou _dupliquer_ sont considérés comme **fermés** — ils ne comptent plus dans la file d'attente ouverte.

## Sévérité

En interne, les tickets portent une sévérité (`critical`, `high`, `medium`, `low`) dérivée du type de plainte et de toute saisie opérateur/système. La page liste la sévérité via la **couleur du type de plainte** et la **couleur du minuteur SLA** — un SLA dépassé sur un ticket critique est votre priorité absolue.

## Actions sur la ligne

Chaque ligne dispose d'un **menu à trois points** avec un seul élément actif :

| Action           | Fonction                                                              |
| ---------------- | --------------------------------------------------------------------- |
| **Voir les détails** | Ouvre la page de détail du ticket (fil complet + preuves + actions de résolution) |

L'ensemble complet des actions opérateur (Attribuer, Bloquer le véhicule, Créer une tâche de maintenance, Créditer l'utilisateur, Répondre, Fusionner les doublons) se trouve sur la **page de détail du ticket** et est activé/désactivé par feature flag selon le déploiement. La liste sert de file de triage, pas de console de résolution.

## Actions de la page

- **Revue automatique** — ouvre la [file de revue automatique des tickets](ticket-auto-review.md) — revue simplifiée un ticket à la fois

## Flux de travail typiques

- **Triage quotidien** — filtrer `Statut = En attente` → trier par SLA (le plus ancien en premier, échéance la plus proche en haut) → parcourir, ouvrir chaque ticket en détail, décider et agir
- **Triage uniquement critique** — filtrer `Type de plainte = Dommage mécanique / Problème de sécurité` → ce sont les tickets à retirer du service
- **Vérification de l'historique du véhicule** — rechercher par étiquette du véhicule → voir tous les tickets jamais ouverts sur cette unité → utile avant de le remettre en circulation après une réparation
- **Alarme SLA** — trier par SLA → les tickets en haut de la liste sont en retard → escalader immédiatement

## Conseils

- **La photo est votre premier signal** — même avant d'ouvrir le ticket, la miniature vous indique s'il s'agit d'un vrai rapport de dommage ou d'une soumission de faible qualité
- **SLA rouge = agir maintenant** — lorsque le SLA devient rouge, vous avez déjà dépassé le délai contractuel ; c'est votre file réactive
- **Croiser avec le véhicule** — cliquez sur la colonne véhicule → ouvrez l'onglet Alertes du véhicule → les problèmes IoT et les rapports opérateurs se recoupent souvent
- **Attention aux doublons** — plusieurs utilisateurs signalent souvent la même trottinette cassée dans un court laps de temps ; utilisez Recherche de véhicule pour les repérer avant de résoudre
- **L'URL est partageable** — copiez une vue filtrée (par ex. _tickets mécaniques en attente_) et envoyez-la à l'équipe de maintenance
