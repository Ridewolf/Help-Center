# Détail du véhicule

La page de détail du véhicule (`/vehicles/:id`) est le poste de travail pour une unité unique. Utilisez-la pour voir les données IoT en temps réel, envoyer des commandes, consulter l'historique des trajets, enquêter sur les alertes et effectuer des actions opérateur (modifier, changer d'emplacement, marquer pour maintenance, générer un QR, supprimer).

Vous arrivez généralement ici en cliquant sur une ligne dans la [liste des Véhicules](vehicles.md).

Permission requise : **Véhicules** (`k7m8n9`). Certains onglets et actions nécessitent des permissions supplémentaires (indiquées ci-dessous).

## Mise en page

De haut en bas :

1. **En-tête** — retour, étiquette, statut, bouton _Actions_
2. **Cartes de synthèse** — batterie, dernier signal, résumé santé IoT, modèle, etc.
3. **Carte d'emplacement** — une petite carte montrant l'épingle GPS actuelle
4. **Onglets** — Détails / Trajets / Activité / Alertes / Commandes

## En-tête

La bande supérieure identifie le véhicule :

- **Bouton retour** (`←`) revient à la liste
- **Étiquette du véhicule** (ex. _RW-001_) et **pastille de statut** (Disponible, En cours d'utilisation, etc.)
- Bouton **Actions** à droite — ouvre la boîte de dialogue des actions

## Actions

Cliquer sur **Actions** ouvre une boîte de dialogue modale avec toutes les actions opérateur disponibles pour ce véhicule. Certaines sont soumises à permission :

| Action                   | Permission | Ce que cela fait                                                                                                                       |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Modifier le véhicule** | `edit`     | Ouvre le [formulaire de modification](vehicle-create-edit.md)                                                                          |
| **Voir l'historique de la route** | —          | Ouvre une boîte de dialogue avec les coordonnées du dernier trajet GPS                                                                 |
| **Marquer pour maintenance** | —          | Définit rapidement le statut sur _Maintenance_                                                                                        |
| **Changer d'emplacement** | —          | Ouvre une boîte de dialogue cartographique pour mettre à jour manuellement les coordonnées GPS (utilisé quand l'appareil IoT est silencieux et que l'opérateur connaît l'emplacement du véhicule) |
| **Générer un code QR**   | —          | Ouvre le générateur de QR pour ce véhicule unique (étiquette imprimable)                                                               |
| **Supprimer le véhicule** | `delete`   | Suppression douce avec une boîte de confirmation                                                                                       |

Les actions pour lesquelles vous n'avez pas la permission sont cachées dans la boîte de dialogue.

## Cartes de synthèse

Une grille de petites cartes sous l'en-tête résume le véhicule en un coup d'œil :

- **Batterie** — pourcentage de batterie de la trottinette (et batterie de la carte IoT si rapportée séparément)
- **Dernier signal** — dernière fois que l'appareil IoT a rapporté, avec une pastille de statut (En ligne / Hors ligne / Obsolète)
- **Verrou** — verrouillé / déverrouillé
- **Modèle** — nom du modèle, statut, image
- **GSM / GPS** — statut de validité cellulaire et GPS
- **Mode de vitesse** — mode de conduite actuel (éco, normal, sport, etc., si le modèle le supporte)
- **Tension** — tension de la carte IoT (champ technique)

## Carte d'emplacement

Une petite carte montre le véhicule comme une épingle unique sur sa dernière coordonnée GPS connue, avec un zoom adapté à l'épingle. Utilisez-la pour un "où est-il maintenant ?" rapide sans ouvrir l'historique de la route.

## Onglets

Le détail bascule entre jusqu'à cinq onglets (certains soumis à permission) :

| Onglet       | Permission    | Contenu                                                                           |
| ------------ | ------------- | --------------------------------------------------------------------------------- |
| **Détails**  | —             | Données complètes du véhicule — champs IoT, modèle + tarifs, étiquettes, zones, GSM/GPS, mode de vitesse |
| **Trajets**  | view-rides    | Trajets récents sur ce véhicule (une tranche ciblée de la liste globale des Trajets) |
| **Activité** | —             | Journal d'activité limité à ce véhicule (actions opérateur et système)             |
| **Alertes**  | —             | Erreurs et alarmes IoT groupées avec pagination (historique des "ce qui a mal tourné") |
| **Commandes**| `iot-command` | Envoyer des commandes IoT directement à l'appareil (verrouiller, déverrouiller, alarme, redémarrer, etc.) |

### Onglet Détails

L'onglet par défaut et la vue la plus approfondie de l'état du véhicule :

- **Panneau IoT** — batterie, tension, verrou, signal GSM, validité GPS, dernier signal, mode de vitesse
- **Panneau Modèle** — nom et image du modèle, statut, étiquettes héritées du modèle
- **Panneau Tarifs** — tarifs assignés au modèle du véhicule (ceux-ci régissent le prix des trajets)
- **Panneau Étiquettes** — étiquettes appliquées à ce véhicule spécifique (modifiable par l'opérateur via _Modifier_)
- **Panneau Zones** — zones auxquelles le véhicule appartient actuellement

Si les données IoT ne se chargent pas, une bannière d'erreur apparaît dans cet onglet ; le reste de la page fonctionne toujours.

### Onglet Trajets

Liste les trajets récents effectués avec ce véhicule — même format de ligne que la liste globale des Trajets, filtrée sur ce véhicule uniquement. Cliquez sur une ligne pour ouvrir le détail du trajet.

Cet onglet est caché sauf si vous avez la permission `view-rides` sur ce véhicule.

### Onglet Activité

Un **journal d'activité** chronologique pour ce véhicule : chaque action opérateur (modification, changement de statut, suppression, mise à jour des étiquettes) et chaque événement système (transitions de statut déclenchées par IoT, exécutions d'automatisation).

Utile pour la conformité, la responsabilité et le débogage des changements d'état inattendus.

### Onglet Alertes

**Alertes et erreurs IoT** groupées émises par l'appareil, paginées. Chaque entrée inclut :

- Code et titre lisible par l'humain
- Horodatages de première et dernière apparition
- Fréquence (combien de fois ce code a été émis)
- Statut (actif / résolu)

Un bouton _Effacer_ (lorsqu'il est pris en charge) vous permet de marquer un groupe comme résolu. La pagination vous permet de revenir en arrière dans les alertes historiques.

### Onglet Commandes

**Commandes IoT** directes vers l'appareil, regroupées par catégorie (par ex. _Verrouiller & déverrouiller_, _Alarme_, _Lumières_, _Système_). Autorisation requise : `iot-command`.

- Choisissez une commande et cliquez sur _Envoyer_
- La commande est envoyée à l'appareil IoT ; le temps de réponse dépend du signal cellulaire
- L'historique récent des commandes apparaît en dessous avec le statut (envoyé / livré / échoué)

Utilisez ceci lorsque vous devez faire quelque chose que le chemin principal _Envoyer commande_ en masse ne couvre pas — diagnostics, redémarrages ponctuels, déverrouillages manuels pour les cas d'assistance.

## Flux de travail typiques

- **Enquêter sur une plainte** — ouvrez Activité pour voir quels opérateurs / systèmes ont interagi avec ce véhicule aujourd'hui ; puis Alertes pour les erreurs IoT ; puis Trajets pour le trajet en question
- **Forcer un verrouillage ou déverrouillage** — Onglet Commandes → _Envoyer Verrouiller_ ou _Envoyer Déverrouiller_ (nécessite `iot-command`)
- **Retirer une unité pour maintenance** — _Actions → Marquer pour maintenance_ (définit le statut) ; envoyez l'équipe terrain
- **Corriger manuellement le GPS** — _Actions → Modifier l'emplacement_ (quand l'appareil IoT est silencieux et que vous savez où il se trouve)
- **Imprimer un nouvel autocollant** — _Actions → Générer un code QR_

## Conseils

- **Surveillez l'onglet Alertes** — les codes fréquents sont des avertissements précoces de problèmes matériels ; intervenez avant qu'ils ne deviennent des incidents
- **Activité est votre piste d'audit** — chaque modification par un opérateur est enregistrée ici avec nom et horodatage
- **Les commandes sont unidirectionnelles en mode fire-and-forget via cellulaire** — si vous ne voyez pas de réponse en une minute, l'appareil peut être hors ligne ; vérifiez le Dernier signal dans l'aperçu avant de réessayer
- **Les étiquettes et tarifs proviennent de deux sources** — les étiquettes au niveau du véhicule (panneau Étiquettes, modifiables dans Modifier) remplacent / complètent les étiquettes au niveau du modèle (lecture seule ici, définies dans Paramètres du véhicule)
- **La carte est juste la dernière épingle** — pour la trace, utilisez _Actions → Voir l'historique de la route_
