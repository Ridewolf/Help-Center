# Revue automatique des preuves de stationnement

La page de Revue automatique (`/support/park-proofs/auto-review`) est une **interface de file d'attente simplifiée** pour traiter les preuves de stationnement en attente les unes après les autres, sans revenir à la liste entre chaque décision.

Malgré le nom « Auto », les décisions de modération vous appartiennent toujours — _auto_ signifie ici **avancement automatique** : après chaque action, la page charge automatiquement la preuve suivante en attente pour que vous puissiez continuer la modération sans cliquer pour revenir à la liste.

Accédez-y via le bouton **Revue automatique** sur la [liste des Preuves de stationnement](park-proofs.md).

Permission requise : **Preuves de stationnement** (`d5e6f7`) + sous-permission `review`.

## Comment ça fonctionne

1. La page charge la **file d'attente en attente actuelle** à l'ouverture
2. Vous voyez la première preuve — même image + mêmes boutons d'action que sur la [page de revue classique](park-proof-review.md)
3. Choisissez une action (Approuver / Avertir / Rejeter avec amende / Bloquer) ou Passer
4. La page **avance automatiquement** vers la preuve suivante en attente
5. Répétez jusqu'à ce que la file soit vide
6. Une fois vide, la page passe en **état d'attente** — elle interroge périodiquement pour de nouvelles preuves et les charge automatiquement

Vous ne perdez pas votre place par erreur : si vous fermez l'onglet et revenez, la file se reconstitue avec ce qui est encore en attente.

## Mise en page

Deux colonnes égales sur écrans larges, empilées sur écrans étroits :

| Colonne     | Largeur | Contenu                                                        |
| ----------- | ------- | -------------------------------------------------------------- |
| **Image**   | 6/12    | Photo zoomable + horodatage de création en dessous             |
| **Actions** | 6/12    | Même pile de boutons Approuver / Avertir / Rejeter+amende / Bloquer / Commentaire |

Une barre de progression en haut montre votre avancement dans la file.

## En-tête

- **Titre** « Revue automatique des preuves de stationnement »
- **Sous-titre** avec progression : `Examen de X sur Y · PP-12345`
- Bouton **Passer** (en haut à droite) — passe la preuve courante sans décision et passe à la suivante (la preuve reste _En attente_)
- **Flèche retour** — revient à la [liste des Preuves de stationnement](park-proofs.md)

La **barre de progression** sous l'en-tête se remplit au fur et à mesure — léger effet scintillant sur la partie remplie.

## Boutons d'action

Identiques à la [page de revue d'une preuve unique](park-proof-review.md) :

| Bouton               | Effet                                                            |
| -------------------- | ---------------------------------------------------------------- |
| **Approuver**        | Marquer comme _Approuvé_ → avancement automatique                |
| **Avertir**          | Marquer comme _Avertissement_ + envoyer notification au rider → avancement automatique |
| **Rejeter avec amende** | Marquer comme _Amendé_ avec le montant de l'amende saisi → avancement automatique |
| **Bloquer**          | Marquer comme _Bloqué_ (le rider, pas la preuve) → avancement automatique |
| **Passer**           | Ne pas décider ; passer à la preuve suivante (celle-ci reste _En attente_) |
| **Commentaire**      | Zone de texte optionnelle — s’attache à l’action choisie          |

Après chaque décision, la preuve suivante apparaît. Il n’y a pas de « Annuler » — une fois cliqué, l’action est définitive.

## État d'attente

Quand la file est vide, la page affiche un **écran d'attente** au lieu d’une carte d’Actions vide :

- Message « Toutes les preuves ont été examinées »
- **Compte à rebours** jusqu’au prochain rafraîchissement automatique (généralement quelques minutes)
- Bouton **Vérifier maintenant** pour sauter le compte à rebours et interroger immédiatement
- Bouton **Quitter** pour revenir à la liste

Si une nouvelle preuve arrive pendant l’attente (le rider vient de terminer un trajet), la page la charge automatiquement et reprend votre rythme de modération.

## Quand utiliser la Revue automatique vs la liste

| Utilisez la liste (`/support/park-proofs`) quand…               | Utilisez la Revue automatique quand…                   |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| Vous vérifiez ponctuellement des clients ou trajets spécifiques | Vous traitez un arriéré générique de preuves en attente |
| Vous avez juste besoin d’une approbation rapide depuis le menu  | Vous voulez chaque photo devant vous en plein format    |
| Vous auditez des décisions passées (Approuvé / Amendé / etc.)   | Vous vous concentrez sur la file _En attente_ maintenant |
| Vous souhaitez filtrer par date, type ou client                 | Vous voulez de la rapidité : image → action → suivante |


La Revue automatique est l’outil de **flux continu** — ouvrez-la au début de votre session de modération et ne la quittez pas tant que la file n’est pas vide.

## Flux de travail typiques

- **Début de service** — ouvrez la Revue automatique → traitez toutes les preuves en attente → terminez sur l’écran d’attente → faites une pause
- **Session rapide** — ouvrez-la pendant 10 minutes, traitez ce que vous pouvez, _Quittez_ pour revenir à la liste quand autre chose demande votre attention
- **Cas ambigu en cours** — quand vous avez besoin de contexte supplémentaire (carte complète du trajet, historique client), cliquez sur les liens vers les entités associées dans la revue classique (non affichés ici) ; vous pouvez vouloir _Passer_ la preuve et y revenir depuis la liste

## Conseils

- **Tapez d’abord le commentaire** — même règle que sur la page de revue classique : cliquer une action valide avant de pouvoir enregistrer un commentaire tardif
- **Passer est votre ami** pour les cas ambigus — ne mettez pas d’amende si vous n’êtes que « presque sûr » ; passez et revoyez depuis la liste avec tout le contexte (historique client, carte du trajet)
- **L’avancement automatique est rapide** — ne vous précipitez pas ; si vous vous trompez sur un Rejet avec amende, le portefeuille du rider est débité en quelques secondes
- **L’écran d’attente est sain** — une file vide signifie que votre équipe suit le rythme. Éloignez-vous du clavier quand vous le voyez
- **Pas de filtres ici** — la Revue automatique parcourt la file d’attente non filtrée dans l’ordre d’arrivée ; utilisez la [liste](park-proofs.md) si vous devez cibler un sous-ensemble
- **Fermer l’onglet est sûr** — votre place est la file _En attente_ elle-même ; vous pouvez reprendre là où la file en est quand vous rouvrez
