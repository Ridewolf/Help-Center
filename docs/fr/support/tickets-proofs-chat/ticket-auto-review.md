# Revue automatique des tickets

La page de Revue automatique des tickets (`/support/tickets/auto-review`) est une **interface de file d'attente simplifiée** pour traiter les tickets en attente un par un, sans revenir à la liste entre chaque décision.

Tout comme [Park Proof Auto Review](park-proof-auto-review.md), « Auto » signifie ici **avancement automatique** : après chaque action, la page charge le ticket en attente suivant pour que vous puissiez continuer la modération sans interrompre le flux.

Accédez-y via le bouton **Revue automatique** dans la [liste des tickets](tickets.md).

Permission requise : **Tickets** (`a8b9c1`).

## Comment ça fonctionne

1. La page charge la **file d'attente des tickets en attente actuelle** à l'ouverture
2. Vous voyez le premier ticket — photo de preuve, infos du ticket, et boutons d'action
3. Choisissez une action (Résoudre / En cours / En attente d'info / Ignorer / Dupliquer) ou Passez
4. La page **avance automatiquement** vers le ticket en attente suivant
5. Répétez jusqu'à ce que la file soit vide
6. Quand elle est vide, la page passe en **état d'attente** avec un compte à rebours qui interroge pour de nouveaux tickets

Votre position est la file d'attente elle-même — fermer l'onglet et le rouvrir ne fait pas perdre la progression, vous reprenez simplement au ticket en attente suivant lorsqu'il se charge.

## Disposition

Trois colonnes sur écrans larges, empilées sur écrans étroits :

| Colonne     | Largeur | Contenu                                                                |
| ----------- | ------- | --------------------------------------------------------------------- |
| **Image**   | 5/12    | Photo de preuve zoomable + horodatage                                 |
| **Actions** | 4/12    | Cinq boutons de changement de statut + Passer + Commentaire          |
| **Infos**   | 3/12    | Carte d'infos du ticket avec statut, type de plainte, véhicule, rapporteur, dates |

Une barre de progression en haut montre votre avancement.

## En-tête

- **Titre** « Revue automatique des tickets »
- **Sous-titre** avec progression : `Examen de X sur Y · T-12345`
- Bouton **Passer** (en haut à droite) — passe le ticket actuel sans prendre de décision (le ticket reste _En attente_)
- **Flèche retour** — revient à la [liste des tickets](tickets.md)

## Boutons d'action

Cinq transitions de statut, plus Passer et un Commentaire optionnel :

| Bouton           | Nouveau statut   | Utilisation                                                                 |
| ---------------- | ---------------- | -------------------------------------------------------------------------- |
| **Résoudre**     | _Résolu_         | Le problème est réglé (ou n'était pas réel) — ferme le ticket              |
| **En cours**     | _En cours_       | Le problème est réel, vous avez lancé une correction (tâche de maintenance, suivi) |
| **En attente d'info** | _En attente d'info_ | Vous avez besoin de plus d'infos du rider avant de décider — le rider reçoit une notification |
| **Ignorer**      | _Ignoré_         | Pas un vrai problème (rapport de mauvaise qualité, mauvaise cible, spam)  |
| **Dupliquer**    | _Dupliquer_      | Un autre ticket existe déjà pour le même véhicule / problème              |
| **Passer**       | (inchangé)       | Ne pas décider ; passer au ticket suivant                                |
| **Commentaire**  | (toute action)   | Note optionnelle attachée à l'action choisie                             |

Chaque clic est enregistré immédiatement et passe au ticket suivant. Tapez le **commentaire d'abord** si vous voulez qu'il soit attaché.

### Quand utiliser quel statut de clôture

- **Résoudre** — l'élément défectueux a été réparé (ou le rapport était un malentendu clarifié en vérifiant le véhicule)
- **Ignorer** — le rapport était mauvais / faux / hors sujet ; le rider voit l'ignoré dans son app
- **Dupliquer** — lien vers l'original ; le backend gère la chaîne pour que la résolution d'un ticket ferme tous les autres

_Résoudre_, _Ignorer_ et _Dupliquer_ ferment tous le ticket. _En cours_ et _En attente d'info_ le maintiennent ouvert dans une autre catégorie.

## Colonne d'infos

Une carte **Infos du ticket** à droite montre les données structurées derrière la photo :

- **Statut** — pastille du statut actuel
- **Type de plainte** — pastille colorée (dommage mécanique, électrique, batterie, etc.)
- **Véhicule** — étiquette et lien
- **Rapporteur** — nom (rider) ou étiquette (système / opérateur)
- **Emplacement** — adresse / coordonnées
- **Créé / mis à jour** — horodatages
- **SLA** — temps restant (ou badge « en retard »)

Lisez cette carte avant de décider — elle vous raconte toute l'histoire sans quitter la page.

## État d'attente

Quand la file est vide, la page affiche le même écran d'attente utilisé pour les Preuves de stationnement :

- Message « Tous les tickets ont été examinés »
- Un **compte à rebours** jusqu'à la prochaine interrogation automatique
- Bouton **Vérifier maintenant** pour interroger immédiatement
- Bouton **Quitter** pour revenir à la liste

Si un nouveau ticket arrive pendant l'attente, la page le charge automatiquement.

## Quand utiliser la Revue automatique vs la liste

| Utilisez la liste quand…                                    | Utilisez la Revue automatique quand…                  |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| Vous devez filtrer par statut, type de plainte ou véhicule  | Vous traitez la file d'attente non filtrée             |
| Vous enquêtez sur un véhicule spécifique ou l'historique d'un rider | Vous vous concentrez sur un ticket à la fois, en plein écran |
| Vous auditez des décisions passées (Résolu / Ignoré / etc.) | Vous voulez de la rapidité : lire → décider → suivant  |
| Vous devez escalader à l'équipe de maintenance              | Vous êtes en mode de travail continu sur la file      |

## Flux de travail typiques

- **Début de service** — ouvrez Auto Review → traitez chaque ticket en attente → terminez sur l'écran d'attente
- **Tri rapide** — lisez la photo + le type de plainte + le rapporteur → si évident, _Résoudre_ / _Ignorer_ avec un commentaire d'une ligne ; sinon, _En cours_ et mentionnez l'équipe de maintenance dans le commentaire
- **En attente du client** — lorsque le rapport est flou, _En attente d'info_ avec une question dans le commentaire ; le client est sollicité
- **Doublon** — lorsque la recherche révèle un ticket déjà ouvert pour le même véhicule, _Dupliquer_ pour lier la chaîne
- **Cas ambigu** — _Passer_ et ouvrir depuis la liste avec le contexte complet (historique du véhicule, trajets liés, alertes IoT)

## Conseils

- **Tapez d'abord le commentaire** — même règle que pour les Preuves de stationnement : l'action est validée avant que les commentaires tardifs soient enregistrés
- **Passer ≠ décision** — passer ne ferme rien ; le ticket reste dans la file pour le prochain opérateur
- **Résoudre vs Ignorer n'est pas la même chose** — _Résoudre_ signifie « nous avons corrigé » ; _Ignorer_ signifie « ce n'était pas un vrai problème » ; le client voit la différence dans son application
- **Gestion des doublons** — recherchez d'abord dans la liste par étiquette de véhicule ; si vous trouvez un ticket parent, cliquez sur Dupliquer, sinon résolvez le plus informatif et Dupliquez les autres
- **Le minuteur SLA continue de tourner** pendant l'attente — si la file est vide mais que la liste contient encore des lignes en retard, ces lignes sont filtrées hors d'Auto Review (peut-être permissions, peut-être un statut) ; revenez à la liste pour les voir
- **Auto Review respecte l'ordre des tickets du backend** — les plus récents en attente varient selon le déploiement ; considérez l'ordre de la file comme faisant foi
