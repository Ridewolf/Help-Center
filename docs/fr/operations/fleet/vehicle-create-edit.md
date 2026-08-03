# Véhicule — Créer & Modifier

Deux URL partagent la même mise en page de formulaire :

- **Créer** — `/vehicles/create` — enregistre une nouvelle unité physique
- **Modifier** — `/vehicles/:id/edit` — met à jour les métadonnées d'un véhicule existant

Les deux sont accessibles depuis la [liste des Véhicules](vehicles.md) (bouton `+ Créer` en haut à droite) ou depuis le [détail du Véhicule](vehicle-detail.md) (`Actions → Modifier le véhicule`).

Permissions :

- **Créer** — `Véhicules` (`k7m8n9`) + sous-permission liée à la création
- **Modifier** — `Véhicules` (`k7m8n9`) + la sous-permission `edit`

## Mise en page

La page se divise en deux colonnes sur desktop, s'empile sur mobile :

- **Gauche (8/12)** — le formulaire lui-même, dans une carte _Informations sur le véhicule_
- **Droite (4/12)** — la barre latérale **Guide des champs** avec une aide contextuelle pour le champ en focus, plus un aperçu en direct de ce que vous avez rempli

## Champs

Cinq champs au total. Les champs obligatoires sont marqués d'un astérisque rouge (`*`).

### 1. Étiquette (obligatoire)

Le code lisible imprimé sur l'autocollant du véhicule (ex. _RW-001_).

- Doit être unique dans toute votre flotte
- Texte libre — la convention typique est _PRÉFIXE-NNN_ (le préfixe de votre entreprise + numéro séquentiel)
- Cliquez sur **Générer** (icône étincelle) pour remplir automatiquement — le système lit le préfixe de votre entreprise et les étiquettes existantes, calcule la séquence suivante et l’écrit dans le champ. Un indicateur de chargement apparaît pendant la requête.

### 2. Statut (obligatoire)

Le statut initial / actuel du véhicule. Douze options — même liste que dans le [filtre de la liste des Véhicules](vehicles.md#référence-des-statuts).

Valeurs de départ courantes lors de la création :

- **Pas prêt** — créé mais pas encore mis à disposition des utilisateurs (choix par défaut sûr)
- **Disponible** — prêt à la location immédiatement (à utiliser uniquement après vérification de l’IoT et du stationnement)
- **Stockage** — pour le stock qui n’est pas encore en service

Lors de la modification, changez le statut avec précaution — cela peut retirer le véhicule de la rotation de location ou le remettre en service.

### 3. Appareil IoT (optionnel)

Le module IoT lié à ce véhicule (la boîte cellulaire qui gère le verrouillage/déverrouillage et rapporte la batterie/GPS).

- Liste déroulante avec recherche — tapez pour filtrer par IMEI ou étiquette
- Optionnel — vous pouvez créer un véhicule sans IoT maintenant et le lier plus tard (en _Modifier_)
- Un appareil IoT ne peut être lié qu’à un seul véhicule à la fois

Lors de la modification, le remplacement de l’appareil IoT est autorisé mais semble irréversible — le nouvel appareil commence à rapporter sous ce véhicule, l’ancien est dissocié. Utilisez ceci lorsqu’une carte est physiquement remplacée.

### 4. Modèle de véhicule (optionnel)

L’enregistrement du modèle (Paramètres → Paramètres du véhicule) qui définit les tarifs, les réglages par défaut et la catégorie de l’unité.

- Liste déroulante avec recherche — tapez pour filtrer par étiquette de modèle
- Optionnel à la création, recommandé de le définir dès que vous connaissez le modèle — les tarifs et comportements en dépendent
- Modifier le modèle plus tard met à jour les tarifs actifs et les règles de comportement — confirmez avec les opérations avant de changer sur une unité en service

### 5. Étiquettes (optionnel)

Étiquettes appliquées par l’opérateur, spécifiques à ce véhicule.

- Sélection multiple — choisissez une ou plusieurs
- Recherchable
- Ce sont des étiquettes _au niveau du véhicule_, distinctes des étiquettes _au niveau du modèle_ héritées du Modèle de véhicule choisi
- Les trajets sur ce véhicule hériteront de ces étiquettes au niveau du véhicule au début du trajet (voir la [liste des Trajets](../trips/rides.md) pour comprendre l’héritage des étiquettes)

## Barre latérale Guide des champs

La colonne de droite est un **guide contextuel**, pas un doublon du formulaire :

- **Aperçu en direct** des valeurs que vous avez saisies/sélectionnées (pour vérifier avant d’enregistrer)
- **Astuce en ligne** qui se met à jour selon le champ en focus — explique la signification du champ, les pièges courants, les valeurs par défaut
- **Champs automatiques** affichés : étiquette actuelle, étiquette de statut, étiquette de l’appareil IoT, étiquette du modèle, nombre d’étiquettes

Utilisez-le comme une seconde paire d’yeux. Sur un écran large, il reste visible pendant que vous faites défiler le formulaire.

## Enregistrer / Retour

- **Retour** (`←`) — abandonne les modifications non enregistrées et revient à la page précédente (la liste, ou le détail en cas de modification)
- **Enregistrer** — valide le formulaire et crée / met à jour le véhicule. Une notification confirme le succès ; les erreurs de champ sont soulignées en rouge avec un message

Si la validation échoue (étiquette manquante, statut manquant, étiquette en double), la page reste ouverte avec le champ fautif encadré en rouge.

## Créer vs Modifier — différences

| Aspect             | Créer                               | Modifier                                                  |
| ------------------ | ---------------------------------- | -------------------------------------------------------- |
| Étiquette          | Vide ou _Générer_                  | Pré-rempli avec l’étiquette actuelle                     |
| Statut             | Vide (vous devez choisir)          | Pré-rempli avec le statut actuel                          |
| Appareil IoT       | Vide ou choisir parmi les appareils non liés | Pré-rempli ; le remplacement dissocie l’ancien           |
| Modèle de véhicule | Vide                              | Pré-rempli                                                |
| Étiquettes         | Vide                              | Pré-rempli avec les étiquettes au niveau du véhicule actuel |
| Après enregistrement | Redirection vers le détail du nouveau véhicule | Reste sur le formulaire / redirection vers le détail (selon le flux) |
| Entrée du journal d’activité | "Véhicule créé par _nom de l’opérateur_" | "Véhicule modifié par _nom de l’opérateur_" avec différences au niveau des champs |

Les deux flux écrivent dans le [Journal des actions](vehicle-detail.md#onglet-activité) du véhicule.

## Flux de travail typiques

- **Intégrer un nouveau lot** — générer l'étiquette → statut _Pas prêt_ → lier IoT → définir le Modèle → enregistrer. Une fois l'unité sur le terrain et testée, modifier en _Disponible_
- **Remplacer une carte IoT défectueuse** — modifier → délier / choisir un nouvel IoT → enregistrer → attendre le premier signal (Dernier signal dans le détail)
- **Reclassifier** — changer le Modèle lors de la migration d'unités entre flottes/catégories
- **Ajouter une étiquette temporaire** — modifier → Étiquettes → enregistrer (ex. « Événement 2026-05 », « Prêt »)

## Conseils

- **Utilisez Générer** pour les étiquettes — cela maintient votre numérotation propre et évite les doublons
- **Définissez le Modèle tôt** — les tarifs proviennent du modèle ; un modèle non défini signifie que les trajets sur ce véhicule utiliseront les règles tarifaires sans modèle
- **Ne changez pas le Statut en _Disponible_ avant d'avoir vérifié physiquement l'IoT** — les utilisateurs pourront le déverrouiller immédiatement
- **Consultez l'astuce du Guide de terrain** en cas de doute sur un champ — l'aide en ligne est plus à jour que cet article
- **Le journal d'activité est votre filet de sécurité** — chaque enregistrement est sauvegardé avec le nom de l'opérateur et l'horodatage dans le [détail du véhicule](vehicle-detail.md#onglet-activité)
