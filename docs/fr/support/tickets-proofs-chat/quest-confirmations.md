# Confirmations de quêtes

Les quêtes sont des **tâches gamifiées que la plateforme demande aux utilisateurs d'accomplir en échange d'une récompense** — et les Confirmations de quêtes (`/support/quest-confirmations`) sont l'endroit où un opérateur examine les preuves soumises par un utilisateur et décide s'il faut verser la récompense.

Les quatre types de quêtes sont :

- **battery** — une tâche liée à la batterie
- **lost** — retour d'un objet perdu
- **clean** — nettoyage d'un véhicule
- **parking** — une tâche de stationnement

> **Attention : cette page est une prévisualisation.** Les décisions prises ici **ne sont pas enregistrées et aucune récompense n'est versée** — le flux de révision est visible avant que la fonctionnalité ne soit pleinement intégrée. Ne dites pas à un utilisateur que sa quête a été payée sur la base de cet écran.

## Où la trouver

Il n'y a **aucune entrée dans la barre latérale** — le groupe Assistance dans la barre latérale contient uniquement Preuves de stationnement, Tickets et Conversations. Accédez à la page en tapant directement `/support/quest-confirmations`.

La page est disponible **uniquement en mode Avancé** ; elle est bloquée en mode Facile (Lite). Considérez-la comme une interface réservée aux utilisateurs avancés non listée, plutôt que comme une partie de la navigation normale de l'opérateur — de la même manière que [Error Logs](../../apps/tools/error-logs.md).

La liste et le détail sont sur la même page : sélectionner une soumission déploie un **panneau de détail sur place** au lieu de naviguer ailleurs. Utilisez **Retour à la liste** dans l'en-tête du panneau pour revenir.

## Vue liste

| Filtre         | Options                                |
| -------------- | -------------------------------------- |
| **Statut**     | Tous / En attente / Approuvé / Rejeté |
| **Type de quête** | Tous / Batterie / Perdu / Nettoyage / Stationnement |
| **Recherche**  | Par utilisateur, quête ou véhicule     |
| **Effacer**    | Réinitialise tous les filtres          |

Un résumé statistique au-dessus de la liste affiche le **nombre en attente**, combien ont été **approuvés aujourd'hui**, **rejetés aujourd'hui**, et le **temps moyen de révision** en minutes.

## Révision d'une soumission

1. Cliquez sur une ligne de soumission pour déployer son panneau de détail.
2. Lisez les preuves :
   - la **grille de photos**
   - un **badge QR**, si l'utilisateur a scanné le code du véhicule
   - un **badge GPS** avec la précision en mètres, si la localisation a été capturée
   - le **commentaire** de l'utilisateur, s'il en a laissé un
3. Décidez :
   - **Approuver et payer la récompense** applique l'approbation directement — il n'y a **pas de dialogue de confirmation**, cliquez donc avec précaution.
   - **Rejeter la soumission** affiche un menu déroulant de raisons de rejet (**obligatoire**) plus un commentaire optionnel ; puis appuyez sur **Confirmer le rejet**.

Seules les soumissions **en attente** peuvent être révisées. Les soumissions déjà décidées affichent un bouton **Voir** au lieu de Réviser.

Raisons de rejet : `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Contenu d'une soumission

- **Heure** d'arrivée, **utilisateur**, **quête** revendiquée et **véhicule** concerné
- **Indicateur QR** — si l'utilisateur a scanné le code QR du véhicule
- **Photos** — chacune étiquetée avec ce qu'elle montre
- **GPS** — latitude/longitude avec une étiquette, plus la précision en mètres (une valeur élevée signifie une position approximative)
- **Récompense** — texte libre décrivant le paiement, par exemple un trajet gratuit jusqu'à un montant défini
- **Commentaire utilisateur** — note optionnelle de l'utilisateur
- **Révisé par / à** et un **commentaire de rejet** optionnel une fois la décision prise

## Questions fréquentes

- **L'approbation paie-t-elle réellement la récompense ?** Pas aujourd'hui — la page est une prévisualisation et les décisions ne sont pas enregistrées.
- **Pourquoi n'y a-t-il pas d'étape de confirmation lors de l'approbation ?** Approuver et payer la récompense est une action directe dans l'implémentation actuelle. Cliquez avec précaution.
- **Une soumission n'a pas de badge QR ou GPS — est-ce une fraude ?** Ces deux signaux sont optionnels. Évaluez-les avec les photos plutôt que de considérer l'absence d'un badge comme une preuve.
- **La valeur de précision GPS est énorme — que signifie-t-elle ?** L'appareil a signalé une position approximative ; la localisation est une indication grossière.
- **Puis-je rouvrir une soumission déjà décidée ?** Non — les soumissions approuvées ou rejetées offrent uniquement l'option Voir.
- **Je ne la trouve pas dans le menu.** Il n'y a pas d'entrée de menu ; tapez l'URL directement, en mode Avancé.
