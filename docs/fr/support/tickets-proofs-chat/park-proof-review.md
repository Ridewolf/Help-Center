# Revue de preuve de stationnement

La page de revue (`/support/park-proofs/:id/review`) est l'endroit où vous modérez en détail une photo de preuve de stationnement. L'image complète, tout le contexte lié (client / trajet / véhicule) et le menu d'action complet se trouvent ici.

Vous arrivez généralement ici en cliquant sur la vignette (ou _Voir_ dans le menu de la ligne) dans la [liste des Preuves de stationnement](park-proofs.md).

Permission requise : **Preuves de stationnement** (`d5e6f7`) + sous-permission `review` pour les actions de modération.

## Mise en page

La page est divisée en trois colonnes sur les écrans larges, empilées sur les écrans plus étroits :

| Colonne        | Largeur | Contenu                                            |
| -------------- | ------- | ------------------------------------------------- |
| **Image**      | 5/12    | La photo en taille réelle avec zoom et déplacement |
| **Actions**    | 4/12    | Boutons de modération, commentaire optionnel, suppression admin |
| **Cartes d'info** | 3/12 | Détails client, trajet, véhicule, preuve          |

## Image (colonne de gauche)

Un **visualiseur d'image zoomable** avec la photo en pleine résolution :

- **Cliquez + glissez** pour déplacer lorsque zoomé
- **Molette de défilement** (ou pincement sur mobile) pour zoomer
- **Double-cliquez** pour réinitialiser le zoom

Cherchez :

- Le véhicule entier dans le cadre (pas seulement une roue)
- Un emplacement de stationnement légal (ne bloquant pas les piétons, pas dans une zone interdite)
- La béquille déployée, véhicule en position verticale
- Tout élément contredisant l'histoire du conducteur en cas de litige

## Actions (colonne du milieu)

Les quatre boutons de modération sont empilés verticalement, par ordre de gravité :

| Bouton               | Effet sur le statut | Utilisez-le lorsque                                                    |
| -------------------- | ------------------- | -------------------------------------------------------------------- |
| **Approuver**        | _Approuvé_          | La photo est bonne — le conducteur a bien stationné                  |
| **Avertir**          | _Avertissement_     | La photo n'est pas parfaite mais pas assez mauvaise pour une amende — le conducteur reçoit une notification |
| **Rejeter avec amende** | _Amendé_          | La photo est mauvaise — applique une amende du montant que vous saisissez sous le bouton |
| **Bloquer**          | _Bloqué_            | Violation grave / répétée — bloque le conducteur pour les trajets futurs |

Chaque action nécessite la sous-permission `review`. Les actions que vous ne pouvez pas effectuer sont cachées ou désactivées.

### Montant de l'amende

Le bouton **Rejeter avec amende** dispose d'un champ numérique juste en dessous pour le **montant de l'amende** dans la devise de l'entreprise. L'amende est débitée du portefeuille du client (ou du mode de paiement par défaut du client, selon la configuration). Le montant est obligatoire lorsque vous cliquez sur _Rejeter avec amende_ — sinon le bouton est désactivé.

### Commentaire

Une zone de texte **Commentaire** se trouve sous les boutons d'action. Ce que vous tapez est attaché à l'action et enregistré dans :

- L'enregistrement de la preuve (pour les audits futurs)
- Le [journal d'activité du client](../../operations/customers/client-detail.md#onglet-activité) (pour que toute personne enquêtant sur le client plus tard voie votre note)
- La notification in-app du conducteur (selon l'action — il voit le contexte expliquant pourquoi il a été averti / amendé)

Rédigez le commentaire **avant** de cliquer sur l'action — il est soumis en même temps que l'action, pas après. Soyez précis : « trottinette bloquant le trottoir, photo prise à 22:14 » vaut mieux que « mauvais stationnement ».

### Suppression (admin)

Un bouton **Supprimer** en bas (visible uniquement avec la permission admin) supprime entièrement l'enregistrement de la preuve. Utilisez-le pour :

- Photos de test / téléchargements de spam
- Téléchargements en double (même trajet, plusieurs photos identiques)
- Photos téléchargées pour le mauvais trajet (erreur de données)

N'utilisez pas Supprimer à la place d'Approuver / Rejeter — Supprimer sert à _retirer l'enregistrement du système_, pas à prendre des décisions de modération.

## Cartes d'info (colonne de droite)

Trois cartes « entité liée » plus une carte de détails empilées verticalement :

- **Client** — nom, téléphone, e-mail, statut, liens vers la [page détail client](../../operations/customers/client-detail.md)
- **Trajet** — ID du trajet, horodatages de début/fin, distance, coût ; lien vers la [page détail trajet](../../operations/trips/ride-detail.md)
- **Véhicule** — étiquette, modèle, statut ; lien vers la [page détail véhicule](../../operations/fleet/vehicle-detail.md)
- **Détails de la preuve de stationnement** — type (début/parking/fin), date de création, coordonnées GPS, tout verdict d'auto-revue déjà appliqué

Utilisez ces cartes pour **construire rapidement le contexte** :

- Ce client est-il un récidiviste ou un contrevenant pour la première fois ? — ouvrez Client → Activité
- Ont-ils terminé le trajet à l'emplacement de la photo ? — ouvrez Trajet → carte du parcours
- Ce véhicule est-il souvent mal stationné ? — ouvrez Véhicule → preuves récentes

## Flux de travail typiques

- **Approbation rapide** — image clairement bonne → laissez le commentaire vide → _Approuver_ → retour à la file
- **Avertissement avec contexte** — image mauvaise mais légère → tapez une note d'une phrase → _Avertir_ → le conducteur reçoit un rappel doux
- **Amende après considération** — image clairement mauvaise → vérifiez la carte Client pour récidives → tapez une note expliquant l'amende → saisissez le montant → _Rejeter avec amende_
- **Escalade vers blocage** — image est le troisième avertissement → vérifiez Client → Activité pour avertissements antérieurs → tapez une note → _Bloquer_
- **Audit d'une décision précédente** — ouvrez la preuve → lisez le champ Commentaire dans le journal d'activité pour voir ce que l'opérateur précédent a écrit

## Conseils

- **Zoomer avant de décider** — les béquilles, panneaux de stationnement et chemins piétonniers sont faciles à manquer dans la vignette
- **Taper le commentaire en premier** — une fois que vous cliquez sur une action, elle est soumise ; si vous tapez le commentaire après, vous avez déjà modéré sans contexte
- **Approuver > Avertir > Amender > Bloquer** est une escalade unidirectionnelle — ne passez pas directement à Bloquer dès la première infraction
- **Le commentaire est public** (pour votre équipe et le rider) — restez factuel ; pas de jargon interne, pas d’opinions sur le client
- **Supprimer est irréversible** — une fois une preuve supprimée, vous ne pouvez pas la récupérer ; utilisez _Rejeter_ si vous voulez garder une trace de la mauvaise photo
- **L’image fait foi** — quand le rider conteste une amende, la photo originale + votre commentaire + la chronologie constituent le dossier
