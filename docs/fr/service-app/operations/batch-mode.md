# Mode par lot — Mise en file de plusieurs véhicules

Le mode par lot (`/batch`) regroupe plusieurs véhicules dans une seule file d'attente afin que vous puissiez les voir côte à côte et les traiter sans avoir à les rechercher à nouveau. Accédez-y depuis l'écran d'accueil ou via le lien de scan dans l'état vide de la [carte de la flotte](../fleet/fleet-map.md).

**Lisez ceci en premier :** le mode par lot est une liste de travail, pas un outil de commandes groupées. Les boutons d'action de groupe en bas de l'écran **ne sont pas disponibles actuellement dans l'application**. Vous agissez sur chaque véhicule depuis sa propre [page véhicule](../fleet/vehicle-controls.md).

## Ajout de véhicules

1. Ouvrez le mode par lot.
2. Scannez le code QR d'un véhicule — le scanner est le même que celui utilisé par la carte de la flotte, donc les mêmes règles de recherche s'appliquent (étiquette, VIN ou IMEI).
3. Chaque scan réussi ajoute le véhicule à la file dans l'état **inactif**.
4. Répétez pour chaque véhicule que vous souhaitez ajouter à la liste.

Les longues files restent réactives, il n'y a donc aucune raison pratique de garder la liste courte, sauf selon votre propre plan de service.

## Lecture de la file d'attente

Chaque ligne affiche :

| Élément              | Comment le lire                                                                         |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Étiquette**        | Le code du véhicule                                                                     |
| **Barre de batterie**| Rouge à 10 % ou moins, orange à 20 % ou moins, ambre à 40 % ou moins, vert au-dessus de 40 % |
| **Batterie du traceur**| La charge propre du traceur                                                            |
| **Icône de connectivité**| Si le traceur est en ligne ou hors ligne                                             |
| **Statut**           | Le statut actuel du véhicule                                                           |
| **État de la ligne** | inactif, en cours, ok, ou échoué                                                      |

Une ligne échouée affiche son message d'erreur à la place de la télémétrie, pour que vous puissiez voir ce qui a mal tourné sans quitter la file.

**Appuyer sur une ligne ouvre la page de ce véhicule** — c'est ainsi que vous agissez réellement sur un véhicule : mettez-les en file ici, puis traitez-les un par un.

## Suppression de véhicules

- **L'icône de la corbeille sur une ligne** supprime ce véhicule de la file. Cela n'envoie rien au véhicule — la suppression n'affecte que votre liste.
- **L'icône de la corbeille dans l'en-tête** vide toute la file après confirmation. Elle est désactivée tant que le lot est marqué comme en cours d'exécution.

## Actions de groupe

Cinq boutons se trouvent en bas de l'écran : un engrenage de paramètres, déverrouiller, une cloche, un éclair et des calques. **Ces actions de groupe ne sont pas disponibles actuellement dans l'application.** Appuyer dessus n'envoie rien à aucun véhicule.

Pour déverrouiller, faire sonner, changer une batterie ou envoyer une commande au traceur, ouvrez le véhicule depuis la file et utilisez les contrôles sur la [page véhicule](../fleet/vehicle-controls.md) :

- Verrouillage et déverrouillage — **Mode conduite**
- Son du localisateur — **Bip**
- [Changement de batterie](battery-swap.md) — la séquence de changement chronométrée
- Commandes du fournisseur — la feuille **Commandes**

## Problèmes courants

| Symptôme                                      | Ce que cela signifie                                                               |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Appuyer sur une action de groupe ne fait rien | Correct — les actions de groupe ne sont pas disponibles. Travaillez chaque véhicule depuis sa page |
| Le bouton tout effacer est grisé               | Le lot est marqué comme en cours d'exécution                                       |
| Une ligne n'affiche ni batterie ni connectivité| Ces valeurs sont inconnues pour ce véhicule — pas zéro                             |
| Un véhicule scanné n'est pas apparu            | Le code n'a pas été résolu. Les règles sont les mêmes que sur la carte de la flotte : étiquette, VIN ou IMEI |

## Conseils

- **Constituez la file au début d'un itinéraire.** Scanner dix véhicules dans une cour une fois vaut mieux que de les chercher un par un plus tard.
- **Utilisez les couleurs de batterie pour ordonner votre travail** — les rouges d'abord, ce sont ceux qu'un utilisateur signalera en priorité.
- **La file est uniquement la vôtre**, donc supprimer une ligne ne change rien pour vos collègues ni pour le véhicule.
- **Pour les opérations à l'échelle de la flotte, utilisez le tableau de bord.** Les changements de statut en masse, les étiquettes en masse et les commandes en masse se trouvent dans la [liste Véhicules du tableau de bord](../../operations/fleet/vehicles.md#actions-groupées).
