# Appareils IoT

La page IoT (`/iot`) est l'**inventaire matériel** — chaque traceur / unité de verrou que votre flotte possède, qu'il soit actuellement fixé à un véhicule ou non. Chaque ligne correspond à un appareil physique identifié par son **IMEI**, avec une télémétrie en direct (état en ligne, position GPS, signal GSM, batterie) actualisée depuis le dernier ping.

C'est le miroir côté appareil de [Vehicles](../../operations/fleet/vehicles.md) : un véhicule sans IoT ne peut pas être suivi ni contrôlé ; un IoT sans véhicule est simplement un matériel non attribué posé sur une étagère.

Permission requise : **IoT Devices** (`n8p9q9`). Les sous-permissions contrôlent `edit` / `send-command` / `delete` et l'action groupée _Generate vehicle_ emprunte `operations.vehicles.create`.

## Comment les appareils arrivent ici

Les appareils ne sont pas découverts automatiquement — vous les enregistrez à réception des livraisons :

1. **Approvisionnement** — vous achetez des unités IoT auprès d'un fournisseur (Omni, Segway, Okai, etc.). Chaque unité a un **IMEI** unique imprimé sur la boîte / l'autocollant
2. **+ Créer** ici — saisissez Nom, IMEI, Fournisseur, Statut. L'appareil est maintenant dans l'inventaire mais non lié
3. **Lier à un véhicule** — fait depuis [Création / Modification de véhicule](../../operations/fleet/vehicle-create-edit.md) en sélectionnant cet IoT dans le sélecteur d'appareil. Un IoT par véhicule, un véhicule par IoT
4. **La télémétrie commence à arriver** dès que l'appareil s'allume avec une SIM et atteint le broker MQTT de Ridewolf. La liste affiche la photo la plus récente — actualisez ou attendez l'AutoRefresh

Alternativement, utilisez l'action groupée **Generate vehicle** ci-dessous pour créer un véhicule neuf pour chaque IoT sélectionné en une seule fois (par exemple après l'intégration d'un lot de nouvelles trottinettes).

## Filtres

| Filtre  | Type     | Notes                                      |
| ------- | -------- | ------------------------------------------ |
| Recherche | Texte    | Correspond au nom et à l'IMEI              |
| Statut  | Liste déroulante | `Tous` / `Actif` / `Inactif` / `Archivé` |

Les filtres sont synchronisés avec l'URL (l'actualisation conserve votre vue) et réinitialisés aux valeurs par défaut via le lien Effacer dans la barre de filtres.

## Colonnes

| Colonne         | Triable ? | Contenu                                                                 |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **Nom**         | oui       | Nom de l'appareil + ID court ; cliquez sur la ligne pour ouvrir la page de détail |
| **Verrou**      | —         | Pastille d'état du verrou (Verrouillé / Déverrouillé) depuis la dernière commande MQTT |
| **En ligne**    | —         | Point vert si le dernier ping est dans la fenêtre de fraîcheur ; rouge si obsolète |
| **GPS**         | —         | Indicateur de position valide / invalide                                |
| **GSM**         | —         | Force du signal (échelle 0-32, rouge ≤10, jaune ≤20, vert ≤32)          |
| **Batterie**    | oui       | Pourcentage de batterie avec barre colorée                             |
| **Statut**      | oui       | Pastille `Actif` / `Inactif` / `Archivé`                              |
| **Dernier signal** | oui     | Temps écoulé depuis le dernier paquet télémétrique (relatif, ex. « il y a 5 min ») |

## Actions sur la ligne

Un menu à trois points par ligne. Les actions disponibles dépendent des permissions :

| Action             | Permission | Fonctionnalité                                                            |
| ------------------ | ---------- | ------------------------------------------------------------------------- |
| **Voir détails**   | —          | Ouvre la page de détail de l'appareil (onglets Détails / Activité / Commandes / Historique) |
| **Voir emplacement** | —          | Ouvre les dernières coordonnées GPS connues dans Google Maps (nouvel onglet) |
| **Modifier**       | `edit`     | Ouvre le formulaire de modification (Nom / IMEI / Fournisseur / Statut)   |
| **Supprimer**      | `delete`   | Supprime l'enregistrement de l'appareil. Confirmation avec délai de 3 secondes avant déverrouillage |

## Actions groupées

Sélectionnez plusieurs lignes (case à cocher en-tête ou par ligne) pour faire apparaître la barre groupée. Les actions sont aussi soumises aux permissions — celles que vous ne pouvez pas effectuer sont cachées, pas grisées :

| Action                      | Permission        | Fonctionnalité                                                                                                      |
| --------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Generate vehicle**        | `vehicles.create` | Crée un nouveau véhicule par IoT sélectionné, nommé automatiquement avec le préfixe de votre entreprise ; choisissez un modèle de véhicule + étiquettes optionnelles |
| **Changer le statut**       | `edit`            | Définit Actif / Inactif / Archivé pour tous les sélectionnés                                                      |
| **Tester la connexion (Bip)** | `send-command`    | Envoie une commande `Beep` à chaque appareil — utile pour localiser physiquement les unités dans un entrepôt      |
| **Envoyer une commande**    | `send-command`    | Choisissez une commande parmi le fournisseur de la première sélection (procédure prédéfinie ou avancée multi-étapes) et envoyez à tous |
| **Supprimer**               | `delete`          | Suppression groupée avec boîte de confirmation (délai de confirmation de 3 secondes)                              |

Les opérations groupées s'exécutent séquentiellement avec progression (`traités / total`) et un panneau des éléments échoués — un succès partiel est normal, les appareils échoués restent sélectionnés pour que vous puissiez réessayer ou inspecter.

## Page de détail

Cliquer sur une ligne (ou _Voir détails_) ouvre la page de détail de l'appareil. Quatre onglets :

- **Détails** — IMEI / Fournisseur / Statut / coordonnées avec aperçu Google Maps intégré ; bloc complet de télémétrie (mode vitesse, validité GPS, valeur brute GSM, batterie, état verrouillé)
- **Activité** — journal d'activité générique pour cet appareil (`entity-type=iot`)
- **Commandes** — émetteur de commandes spécifique au fournisseur. Le même moteur est utilisé dans l'onglet Commandes de la [Fiche Véhicule](../../operations/fleet/vehicle-detail.md) — voir cet article pour la procédure / flux avancé
- **Historique** — historique de télémétrie / journal des paquets

L'en-tête affiche le Véhicule lié (si associé) sous forme de puce — cliquez pour accéder à la page de détail de ce véhicule. Un menu déroulant **Actions** dans l'en-tête propose Modifier / Voir sur Google Maps / Supprimer.

## Formulaire de création / modification

Le formulaire IoT (`+ Créer` ou _Modifier_) comporte quatre champs, tous obligatoires :

- **Nom** — étiquette courte visible dans les listes (ex. `SCOOTER-014`). Texte libre
- **IMEI** — identifiant matériel unique de l'appareil (utilisé pour lier un véhicule et recevoir le trafic MQTT). Une fois défini, à considérer comme immuable — le modifier sur un appareil déployé interrompra la télémétrie jusqu'à mise à jour de la liaison véhicule
- **Fournisseur** — chaîne du fabricant (ex. `omni`, `segway`). Détermine l'ensemble de commandes que l'appareil comprend — soyez précis, la recherche fournisseur est sensible à la casse
- **Statut** — `Actif` (par défaut) / `Inactif` (caché dans le sélecteur pour liaison véhicule) / `Archivé` (matériel retiré)

Il n'y a pas de formulaire en ligne pour lier un véhicule ici — cette fonction est gérée par le formulaire de création / modification de Véhicule.

## Flux de travail typiques

- **Intégrer un lot de 50 traceurs** — Créez chacun (ou importez via téléversement CSV, si disponible) → sélectionnez tout → _Générer véhicule_ avec le modèle de véhicule correct → terminé ; chaque IoT a maintenant un véhicule apparié en statut `needs_investigation` prêt pour le contrôle qualité
- **Retrouver une unité manquante en entrepôt** — Filtrez par nom/IMEI → action sur la ligne _Tester la connexion (Bip)_ ou Bip en masse → déplacez-vous en écoutant
- **Retirer un appareil défectueux** — Modifier → définir Statut = Archivé (ne pas Supprimer — le journal d'activité est conservé). Si un véhicule était lié, dissociez-le d'abord via le formulaire de modification du Véhicule
- **Déploiement de commande fournisseur** (ex. réglage firmware) — Filtrez par motif de nom ou télémétrie, sélectionnez tout → _Envoyer commande_ → choisissez la commande fournisseur et laissez-la s'exécuter sur la liste avec progression
- **Enquêter sur un véhicule « fantôme »** (en ligne mais perdu) — Voir l'emplacement → si GPS invalide, essayez Bip ; si toujours silencieux, suspectez SIM / batterie
- **Recouper la télémétrie avec les événements** — ouvrez le [rapport Événements](../../analytics/reports/events.md) filtré par le véhicule de cet IoT pour corréler l'état matériel avec l'activité côté plateforme

## Conseils

- **L'IMEI est la clé de liaison** partout — liaison véhicule, routage MQTT, tickets d'assistance. Tapez-le une fois, copiez-le toujours
- **Le champ Fournisseur est structurel, pas cosmétique** — il pilote le catalogue de commandes dans l'onglet Commandes. Une faute de frappe `omni` en `Omni` peut produire une liste de commandes vide
- **En ligne ≠ Actif** — En ligne est un signal télémétrique en direct ; Statut est un indicateur administratif. Un appareil Actif peut être Hors ligne (batterie morte, pas de GSM) ; un Archivé peut encore envoyer des pings tant qu'il est sous tension
- **L'envoi de commande en masse utilise le fournisseur de la première ligne** — si votre sélection mélange plusieurs fournisseurs, divisez-la en lots mono-fournisseur sinon la liste de commandes sera confuse
- **Générer véhicule crée volontairement des véhicules en `needs_investigation`** — ils nécessitent une confirmation humaine que la liaison est correcte avant mise en service. Le marquage en masse lors de la génération facilite la prochaine passe de contrôle qualité
- **Il n'y a pas de bouton « forcer le réappairage »** — si la télémétrie s'arrête après un échange, vérifiez la liaison Véhicule → IoT (modification Véhicule) et la SIM / alimentation de l'appareil, pas cette page
- **Les appareils archivés restent recherchables** par IMEI — pratique quand une ancienne unité revient de réparation et doit être réactivée (retour à Actif)
- **Le Dernier Signal est le contrôle de santé le plus rapide** — triez par ordre décroissant pour trouver d'abord les appareils obsolètes ; tout > 24h sur une ligne Actif mérite un examen
