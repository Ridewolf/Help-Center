# Détail du ticket

La page de détail du ticket (`/support/tickets/:id`) est l'endroit où vous enquêtez sur un ticket d'assistance. Elle s'ouvre sous forme de grande fenêtre modale au-dessus de la [liste des Tickets](tickets.md) — l'URL change pour que le ticket soit partageable / accessible par lien profond.

Vous arrivez généralement ici en cliquant sur une ligne dans la liste, ou en collant une URL directe dans le navigateur.

Permission requise : **Tickets** (`a8b9c1`). Certaines actions nécessitent des sous-permissions supplémentaires (`edit`, `delete`).

## Comment cela se rapporte aux autres vues de ticket

| Vue                                                                       | À quoi ça sert                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Tickets List](tickets.md)                  | La file complète — recherche, filtre, tri                                       |
| [Ticket Auto Review](ticket-auto-review.md) | Mode simplifié — un ticket en attente à la fois, triage rapide au clavier       |
| **Détail du ticket (cette page)**                                              | Analyse approfondie d’un ticket — image complète, description complète, contexte, modifier / supprimer |

## Mise en page

La modale s'empile de haut en bas :

1. **En-tête** — titre (étiquette du ticket), ligne de description ("Ticket #ID"), fermeture (X)
2. **Section image** — photo de preuve du rider (grande, clic pour ouvrir)
3. **Carte des détails du ticket** — statut, type de plainte, description, commentaire
4. **Carte véhicule & emplacement** — véhicule, IMEI, coordonnées de localisation, zone, rapporteur
5. **Pied de page** — boutons _Fermer_ et _Modifier_

## En-tête

La bande supérieure identifie le ticket :

- Une **icône alert-circle** à côté de l’étiquette du ticket (par ex. l’étiquette du véhicule ou un nom de ticket généré)
- Une **ligne de description** affichant l’ID du ticket
- La fermeture de la boîte de dialogue (×) en haut à droite — se ferme aussi avec Échap ou en cliquant à l’extérieur

La fermeture de la boîte supprime le `/:id` de l’URL pour que l’historique retour / avant corresponde à ce que vous voyez.

## Section image

La photo complète de preuve soumise par le rider, assez grande pour être inspectée d’un coup d’œil :

- **Cliquez sur l’image** (ou sur le bouton _Voir en taille réelle_ qui apparaît au survol) — ouvre la photo en résolution originale dans un nouvel onglet
- **Survol** — un voile assombri + le bouton _Voir en taille réelle_ apparaissent
- Si l’image ne se charge pas, un espace réservé apparaît à sa place
- Si le ticket n’a pas d’image (rare, par ex. tickets initiés par l’opérateur), la section est masquée

La vignette dans la liste est une petite version ; ceci est l’image complète prête pour la modération.

## Carte des détails du ticket

Carte de gauche de la grille à deux cartes. Champs :

| Champ              | Ce qu’il affiche                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Statut**         | La pastille de statut (En attente, En cours, Résolu, Ignoré, Dupliquer, etc.) — même palette de couleurs que la liste                 |
| **Type de plainte** | La pastille du type de plainte — même code couleur que la liste (rouge Dommage mécanique, jaune Propreté, etc.)                        |
| **Description**    | La description en texte libre du rider, rendue en markdown (retours à la ligne respectés, liens automatiquement liés) — vide si le rider l’a laissée vide |
| **Commentaire**    | Commentaire interne de l’opérateur / notes sur le ticket — vide tant qu’un opérateur n’en a pas ajouté                                |

Voir [Tickets List → Status reference / Complaint types](tickets.md) pour la signification complète de chaque couleur de pastille.

## Carte véhicule & emplacement

Carte de droite de la grille. Champs :

| Champ        | Ce qu’il affiche                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Véhicule**  | Étiquette du véhicule (avec une icône voiture) et l’IMEI lié de son appareil IoT           |
| **Emplacement** | La latitude / longitude où le problème a été signalé (6 décimales, avec une icône épingle) |
| **Zone**     | La [zone](../../settings/infrastructure/zones.md) dans laquelle se trouve l’emplacement, si applicable |
| **Rapporteur** | Le rider / système / opérateur qui a signalé le ticket, avec son e-mail                    |

Utilisez ces références croisées pour accéder au contexte : cliquez sur le véhicule pour ouvrir le [détail du véhicule](../../operations/fleet/vehicle-detail.md), cliquez sur le rapporteur pour ouvrir son [profil client](../../operations/customers/client-detail.md), ou copiez les coordonnées dans un outil cartographique pour confirmer l’emplacement.

## Actions (pied de page)

La page de détail expose un ensemble d’actions **délibérément restreint** — la plupart des flux de travail des tickets se déroulent sur la liste ou sur des entités associées (véhicule, client). Voici ce qui est disponible :

| Bouton    | Ce qu’il fait                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fermer** | Ferme la modale (supprime `/:id` de l’URL)                                                                                                                    |
| **Modifier**  | Ouvre le ticket en mode édition. Note : dans la version actuelle, le gestionnaire Modifier affiche un toast "Modification non implémentée" — il est connecté mais le formulaire n’est pas encore livré |

### Ce qui est dans la liste mais pas ici

Le menu de ligne de la liste propose deux actions supplémentaires qui n’apparaissent pas sur la page de détail elle-même :

| Action     | Où elle se trouve | Pourquoi                                                                                                                          |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Modifier**   | Ligne de liste + détail | Même fonction Modifier (actuellement un espace réservé)                                                                          |
| **Supprimer** | Menu de la ligne de liste | Supprimer est une action uniquement sur la ligne (avec une boîte de confirmation). Pour supprimer depuis le détail, fermez d'abord la fenêtre modale, puis utilisez le menu de la ligne |

### Ce qu'il y a sur la page de liste

L'en-tête de la page de liste comporte _Revue automatique_ qui mène à la file d'attente simplifiée — il n'y a pas de bouton équivalent dans le détail car vous êtes déjà concentré sur un seul ticket.

## Actions sous drapeau fonctionnel (non incluses dans cette version)

Le code source contient des espaces réservés pour un ensemble plus riche d'actions sur les tickets qui sont **commentées** dans cette version :

- **Attribuer** — assigner le ticket à un opérateur
- **Bloquer le véhicule** — retirer le véhicule du service en un clic
- **Créer une tâche de maintenance** — ouvrir une tâche de maintenance pré-remplie avec les données de ce ticket
- **Créditer l'utilisateur** — émettre un crédit de portefeuille au rapporteur
- **Répondre** — envoyer une réponse préformatée au rider
- **Fusionner les doublons** — lier ce ticket à un ticket principal

Si votre déploiement a ces options activées, elles apparaissent dans le menu de la ligne / un menu déroulant _Actions_ dans l'en-tête — pas dans le corps de la fenêtre modale elle-même. Vérifiez avec votre administrateur si vous vous attendez à les voir et qu'elles n'apparaissent pas.

## Flux de travail typiques

- **Tri par photo** — ouvrir le ticket → regarder l'image → si le dommage est réel, copier l'étiquette du véhicule → fermer la fenêtre modale → ouvrir le détail du véhicule pour le bloquer / créer une tâche de maintenance
- **Résoudre un rapport de faible qualité** — ouvrir le ticket → confirmer que la photo est inutile → fermer → utiliser le menu de la ligne de liste pour supprimer (avec confirmation)
- **Enquêter sur l'historique d'un véhicule** — ouvrir un ticket → cliquer sur le véhicule → voir l'historique complet des alertes + trajets du véhicule → revenir au ticket pour ajouter un commentaire
- **Vérifier la plainte d'un rider par rapport au trajet** — ouvrir le ticket → copier le rapporteur → ouvrir le détail client → vérifier ses trajets récents pour le contexte
- **Partager un ticket avec un collègue** — l'URL contient l'id du ticket (`/support/tickets/:id`) pour que vous puissiez la coller dans un chat et que le destinataire arrive sur la même fenêtre modale

## Astuces

- **L'URL est votre favori** — copier l'URL avec `:id` et la coller plus tard ramène directement au même ticket, même depuis une session différente
- **Échap pour fermer** — la fenêtre modale supporte Échap, clic en dehors, et le X — les trois suppriment l'id de l'URL
- **Cliquez une fois sur l'image pour voir l'original** — la vignette est compressée ; l'original est ce que le rider a réellement envoyé
- **Recoupez avec l'IMEI** — si un véhicule est souvent signalé, c'est souvent l'IoT qui fait défaut, pas le châssis. L'IMEI est votre lien vers le [paramétrage IoT](../../settings/infrastructure/iot.md)
- **Le commentaire est interne uniquement** — les riders ne le voient pas ; utilisez-le librement pour des notes opérateur à opérateur sur le ticket
- **Modifier n'est pas encore disponible** — cliquer sur _Modifier_ aujourd'hui affiche une notification. Si vous devez changer un statut, faites-le depuis les actions au niveau de la liste ou la Revue automatique
