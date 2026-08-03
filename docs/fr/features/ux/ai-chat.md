# Chat IA

Le tableau de bord est livré avec un **assistant IA** qui comprend le produit, peut lire les données en direct des écrans sur lesquels vous êtes, et — avec votre permission — peut agir en votre nom. Considérez-le comme un coéquipier assis à côté de vous : posez-lui une question, demandez-lui de faire quelque chose ou demandez-lui d'expliquer ce que vous regardez.

## Ouverture du panneau

Cliquez sur l'**icône étincelante** (✨) dans la barre supérieure. Le chat s'ouvre en panneau latéral à droite.

- Si un petit badge `*` en forme d'étoile brille sur l'icône, l'IA a produit une nouvelle réponse depuis votre dernière consultation du panneau.
- Le panneau s'ouvre aussi avec `⌘ + K` / `Ctrl + K` sur la plupart des pages (là où le raccourci est configuré).

## Ce qu'il peut faire

Cinq catégories de capacités, par ordre de puissance croissante :

| Capacité          | Exemples                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| **Expliquer**      | « Que signifie ce statut ? », « Comment créer un tarif ? »                   |
| **Rechercher**    | « Combien de véhicules actifs dans la Zone A ? », « Montre-moi les paiements échoués d'hier » |
| **Naviguer**       | « Ouvre la page des trajets filtrée sur aujourd'hui », « Emmène-moi au véhicule RW-001 »         |
| **Remplir des formulaires** | « Crée une nouvelle étiquette nommée 'VIP' avec la couleur rouge et applique-la au client X »       |
| **Modifier des données**    | « Verrouille le véhicule RW-001 », « Rembourse le paiement #12345 », « Envoie une notification push à tous dans la Zone A » |

L'IA utilise les **mêmes API et les mêmes permissions** que vous avez. Si vous ne pouvez pas effectuer une action manuellement, l'IA ne peut pas la faire en votre nom. C'est la limite de sécurité — il n'existe pas de mode « superutilisateur IA ».

## À l'intérieur du panneau

### En-tête

- **Icône étincelante + titre** « Chat IA »
- **Badge du nom de l'agent** à droite (la pastille verte avec un éclat) indique quel agent est actif — cliquez dessus pour ouvrir les paramètres et changer d'agent
- **Badge de contexte** apparaît sous la description une fois que la conversation contient des messages — montre le taux de remplissage de la mémoire de l'IA (ex. « 12 messages · 35 % de contexte »)

### Bulle de progression en direct

Quand l'IA effectue une tâche en plusieurs étapes (recherche de données, ouverture de pages, appel d'outils), une **bulle de statut en direct** apparaît montrant chaque étape en temps réel :

- _Recherche de véhicules…_
- _Ouverture de /vehicles…_
- _Remplissage du formulaire : Statut = Actif…_
- _Envoi…_

Vous pouvez lire ce qui se passe au fur et à mesure et arrêter tôt si ça ne va pas dans la bonne direction.

### Conversation

La conversation s'écoule comme un chat : messages utilisateur à droite, réponses de l'IA à gauche, rendus en markdown (listes, tableaux, code, liens fonctionnent tous). Les exécutions d'outils peuvent être développées pour voir les arguments et réponses exacts — utile pour vérifier ce qui a été fait.

### Saisie

- **Tapez un message** et appuyez sur `Entrée` pour envoyer ; `Maj + Entrée` pour un saut de ligne
- La zone de saisie s'agrandit au fur et à mesure que vous tapez
- Les fichiers / images collées ne sont pas supportés dans le chat actuel

## Confirmation des modifications

Pour les actions potentiellement destructrices (suppression, remboursement, changement de statut, opérations en masse), l'IA affiche une **confirmation en ligne** au lieu d'exécuter immédiatement :

- Un résumé de ce qui va se passer (« Remboursement du paiement #12345 — 42,50 $ à John Doe »)
- Boutons **Confirmer** / **Annuler**
- Rien ne se passe tant que vous ne confirmez pas

Lisez attentivement le résumé — c'est la seule vérification de sécurité entre la compréhension de l'IA et vos données.

## Paramètres

Cliquez sur le **badge du nom de l'agent** dans l'en-tête pour ouvrir la boîte de dialogue des paramètres :

- **Sélection de l'agent** — choisissez la personnalité de l'agent (différents agents sont adaptés à différentes tâches : flotte, assistance, analytique)
- **Modèle** — choisissez le LLM sous-jacent (lorsque plusieurs sont disponibles)
- **Outils autorisés** — désactivez sélectivement des outils (ex. bloquer les modifications si vous ne voulez que des questions-réponses)
- **Historique de conversation** — effacer, exporter

## Fenêtre de contexte

L'IA a une mémoire limitée de la conversation en cours. Au fur et à mesure que vous discutez, le contexte se remplit ; vous le verrez en pourcentage dans le badge de l'en-tête.

- **En dessous de 70 %** — beaucoup de place
- **70–90 %** — se remplit ; envisagez de commencer une nouvelle conversation pour un sujet non lié
- **Au-dessus de 90 %** — les messages plus anciens peuvent être résumés pour faire de la place ; l'IA peut oublier les premiers détails

Commencer une nouvelle conversation pour une nouvelle tâche est peu coûteux et maintient l'IA performante.

## Conseils

- **Soyez précis** — « Verrouille RW-001 » vaut mieux que « verrouille cette trottinette dont on a parlé »
- **Vérifiez avant de confirmer les modifications** — lisez le résumé sur la carte de confirmation. L'IA infère parfois une entité que vous ne vouliez pas
- **Demandez « que peux-tu faire ici ? »** sur n'importe quelle page — l'IA sait quels outils sont pertinents pour l'écran actuel
- **Utilisez-le pour expliquer des données inconnues** — collez un code de statut ou un libellé d'écran et demandez « que signifie ceci ? »
- **Les permissions s'appliquent toujours** — si l'IA dit « je ne peux pas faire ça », c'est presque toujours un manque de permission, pas une limitation fonctionnelle
- **Données sensibles** — traitez le chat comme l'écran d'un coéquipier. Ne collez pas de mots de passe, numéros de carte de paiement ou toute donnée que vous ne voudriez pas voir enregistrée
- **Déconnexions** — si l'IA s'arrête en cours d'exécution, faites défiler vers le haut pour trouver la dernière bulle de progression en direct ; elle vous indique exactement où ça s'est arrêté
