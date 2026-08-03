# Tarifs des véhicules

La bibliothèque de règles tarifaires pour votre flotte Ridewolf. Un **Tarif** est un ensemble autonome de règles monétaires — prix de base, frais de départ de trajet, tarif au kilomètre, tarif de pause, tarif de réservation payante, plus des paliers de réduction et un filet de sécurité de remboursement automatique — que le système utilise pour calculer ce qu'un utilisateur paie pour un trajet.

Se trouve à `/settings/vehicle-tariffs`. Permission : **Lister les tarifs** (`v1w2x3`).

## Qu'est-ce qu'un Tarif

Un Tarif n'est **pas** attaché directement à un véhicule — il est attaché à un **Modèle de véhicule** dans les [Paramètres du véhicule](vehicle-settings.md). La chaîne est :

```
Tarif  →  Modèle de véhicule  →  Véhicule  →  Trajet
```

Un enregistrement de tarif unique comprend :

- **Identité** — `Nom`, `Description` (Markdown), `Statut` (Actif / Inactif / Archivé), `Étiquettes`
- **Unité tarifaire** — `Type` : l'un des `per-minute`, `per-hour`, `per-day`, `per-month`. Cela contrôle la granularité de facturation (par minute utilise des calculs au niveau de la seconde ; par jour/mois utilise une facturation par plafond — une unité complète est facturée d'avance)
- **Champs tarifaires** (toutes les valeurs monétaires utilisent la devise de votre entreprise) :
  - **Prix de base** — coût d'une unité tarifaire (ex. une minute, un jour)
  - **Prix de départ de trajet** — frais fixe de déverrouillage facturé une fois au début du trajet
  - **Prix au kilomètre** — coût par km parcouru
  - **Prix de pause** — tarif par minute pendant que le trajet est en pause
  - **Prix de réservation payante** — tarif par minute une fois la période de réservation gratuite expirée
  - **Durée de réservation** — minutes de réservation gratuite avant que la réservation payante ne commence
- **Paliers de réduction** — trois paliers optionnels (Premier / Deuxième / Troisième). Chaque palier est _"après N unités, appliquer X % de réduction"_, donc les trajets plus longs deviennent progressivement moins chers
- **Remboursement automatique** — bascule + deux seuils (`distance` en mètres, `time` en secondes). Lorsqu'activé, si l'utilisateur arrête le trajet avant que les deux seuils soient atteints, le backend annule et rembourse — protège les utilisateurs d'une facturation en cas d'échec de déverrouillage

## Où s'applique le Tarif

1. L'opérateur crée / modifie un **Tarif** ici
2. L'opérateur lie le tarif à un **Modèle de véhicule** dans les [Paramètres du véhicule](vehicle-settings.md)
3. Les véhicules assignés à ce modèle héritent du tarif
4. Lorsqu'un utilisateur démarre un trajet, le backend **capture un instantané du tarif** dans l'enregistrement du trajet et utilise cet instantané pour tous les calculs de facturation

> **L'instantané est la partie critique.** Modifier ou supprimer un tarif ultérieurement ne modifie **pas** rétroactivement les trajets terminés ou en cours. La ventilation du trajet que vous voyez dans le [Détail du trajet](../../operations/trips/ride-detail.md) est calculée à partir des valeurs du tarif **telles qu'elles étaient au début du trajet** — c'est ainsi que Ridewolf garantit l'auditabilité de la facturation.

## Filtres

La barre de filtres au-dessus du tableau :

| Filtre      | Type   | Options                                                 |
| ----------- | ------ | ------------------------------------------------------- |
| **Recherche** | texte  | Libre — correspond au nom / description                  |
| **Statut**  | sélection | Tous les statuts · Actif · Inactif · Archivé             |
| **Type**    | sélection | Tous les types · Par minute · Par heure · Par jour · Par mois |

Les filtres sont temporisés et le tableau se recharge à partir de la page 1 à chaque changement. L'état de l'URL est synchronisé — collez l'URL pour partager la même vue.

## Colonnes

| Colonne        | Triable | Notes                                                                             |
| -------------- | ------- | --------------------------------------------------------------------------------- |
| **Nom**        | oui     | Le libellé du tarif                                                               |
| **Description** | oui     | Tronqué ; texte complet au survol (Markdown rendu ailleurs)                       |
| **Type**       | oui     | Badge contour — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Prix**       | oui     | Prix de base, formaté dans la devise de votre entreprise, police à chasse fixe    |
| **Étiquettes** | non     | Jusqu'à 2 puces d'étiquettes + `+N` en dépassement. Cliquez pour ouvrir un popover d'édition rapide |
| **Statut**     | oui     | Badge coloré (Actif vert / Inactif gris / Archivé bleu). Cliquez pour édition rapide |
| **Créé le**    | oui     | Date de création                                                                  |
| **Mis à jour** | oui     | Date de dernière mise à jour                                                     |

Le tri est **côté client** — fonctionne sur la page courante.

## Actions d'en-tête

- **Rafraîchissement automatique** — actualise la liste (clic manuel ou intervalle, voir [Auto-refresh](../../features/ux/notifications.md))
- **Exporter** — ouvre la boîte de dialogue d'export (page courante · tout filtré · pages spécifiques). Le fichier généré est `vehicle-tariffs-export.json`
- **+ Créer** — ouvre le formulaire de création. Visible uniquement si vous avez la sous-permission **Créer un tarif**

## Actions par ligne

Le menu `⋯` par ligne :

- **Voir les détails** — ouvre `/settings/vehicle-tariffs/:id` (toujours disponible)
- **Modifier** — ouvre `/settings/vehicle-tariffs/:id/edit` (nécessite la sous-permission `edit`)
- **Supprimer** — ouvre une confirmation avec maintien de 3 secondes ; à la confirmation, le tarif est supprimé (nécessite la sous-permission `delete`)

> **Supprimez avec précaution.** Les Modèles de véhicule pointant vers le tarif supprimé devront être réassignés à un autre tarif avant que de nouveaux trajets puissent démarrer sur ces véhicules. Les enregistrements de trajets existants conservent leur instantané intact.

## Édition rapide (Étiquettes / Statut)

Cliquez directement sur les puces **Étiquettes** ou le badge **Statut** dans n'importe quelle ligne → un petit dialogue s'ouvre vous permettant de modifier uniquement ces champs sans entrer dans le formulaire complet. Une notification confirme ; le tableau se rafraîchit.

## Formulaire de création / modification

Les deux `/settings/vehicle-tariffs/create` et `/settings/vehicle-tariffs/:id/edit` partagent la même mise en page : une carte à gauche avec les champs, une barre latérale **Guide des champs** à droite avec une aide contextuelle et un **aperçu en direct** des valeurs saisies (nom, type, prix de base, départ/distance, pause, réservation, étiquettes, paliers de réduction).

### Champs obligatoires

| Champ          | Obligatoire | Validation                                |
| -------------- | ----------- | ----------------------------------------- |
| **Nom**       | oui         | Non vide                                 |
| **Type**       | oui         | L'une des 4 options                      |
| **Statut**     | oui         | L'un de `active` / `inactive` / `archived` |
| **Prix de base** | oui       | `>= 0`                                    |

Tous les autres champs monétaires ont par défaut la valeur `0` et acceptent `0` (effectivement « fonctionnalité désactivée »).

### Sections

1. **Identité** — Nom, Description (Markdown), Type, Statut, Étiquettes
2. **Tarification** — Prix de base, Prix de départ de trajet, Prix au kilomètre, Prix de pause, Prix de réservation payante, Durée de réservation (minutes)
3. **Remboursement automatique** — Interrupteur. Lorsqu'activé, remplir `Distance` (mètres) et `Temps` (secondes). Les deux seuils doivent être franchis avant que le trajet soit considéré comme démarré ; sinon il est automatiquement annulé avec remboursement
4. **Niveaux de remise** — Trois niveaux. Chacun : `Pourcentage de remise` (0-100) et `Après unités` (combien d'unités tarifaires doivent s'écouler avant que la remise s'active). Laisser un niveau à zéro pour le sauter

### Comportement à l'enregistrement

- **Créer** → notification "créé", redirige vers la page de détail
- **Modifier** → notification "mis à jour", redirige vers la page de détail
- **Modifications non enregistrées** sont suivies via une différence de capture instantanée. Quitter la page (annuler / retour) ouvre une boîte de confirmation si quelque chose a changé

> **Correspondance du statut backend.** La valeur `archived` du formulaire est envoyée au backend comme `deleted` — c'est le nom interne. Les opérateurs voient `archived` partout dans l'interface.

## Page de détail

`/settings/vehicle-tariffs/:id` affiche un en-tête avec le libellé du tarif, un badge de statut, les actions **Modifier** et **Supprimer**, trois cartes de statistiques récapitulatives (Statut / Créé / Mis à jour), puis une carte **Détails** avec :

- Champs d'identité (Nom, Type, Statut, Prix de base, dates)
- **Description** rendue depuis Markdown
- **Tarification** — vue en grille de tous les 5 tarifs monétaires (`TariffPriceGrid`)
- **Remboursement automatique** — badge activé/désactivé, plus les deux seuils si actif
- **Niveaux de remise** — répartition visuelle des trois niveaux (`TariffDiscountTiers`)
- **Étiquettes** — puces d'étiquettes résolues (uniquement si définies)
- **Infos système** — ID complet, horodatages de création/mise à jour

## Comment la capture instantanée pilote la ventilation du trajet

Lorsque vous ouvrez un [Détail de trajet](../../operations/trips/ride-detail.md), la **carte de ventilation** est calculée à partir de :

- `ride.tariff` — la capture instantanée intégrée au trajet au moment du départ
- La télémétrie en direct du trajet (durée, distance, temps de pause, temps de réservation)

Le calcul que le backend reproduit localement :

- **Base** — `unités × Prix de base`, où `units` = secondes écoulées (par minute) ou jours/mois arrondis pour les types à plafond
- **Frais de déverrouillage** — forfait `Prix de départ de trajet`, facturé une fois
- **Distance** — `km × Prix au kilomètre`
- **Pause** — `minutes de pause × Prix de pause`
- **Réservation** — premières `minutes de réservation` gratuites, puis `minutes payantes × Prix de réservation payante`
- **Niveaux de remise** appliqués en plus une fois les seuils franchis

Si vous corrigez une faute de frappe dans le tarif aujourd'hui, **les trajets d'hier ne sont pas affectés** — leurs ventilations affichent toujours les anciens chiffres car la capture instantanée est la source de vérité.

## Flux de travail

- **Lancement d'un nouveau schéma tarifaire** — créer le tarif (Statut `Inactif`) → réviser avec la finance → passer à `Actif` → lier au Modèle de véhicule concerné dans [Paramètres du véhicule](vehicle-settings.md)
- **Promo saisonnière** — dupliquer un tarif existant (manuel : créer nouveau + copier les champs), changer le `Prix de base`, lui donner un nom suffixé par la date (ex. `Été 2026 — Trottinette`), lier au modèle pour la période promo, remettre ensuite
- **Réglage du remboursement automatique** — commencer avec des seuils conservateurs (petite distance + court temps) pour que les déverrouillages ratés ne facturent pas, puis assouplir si vous voyez des remboursements faux positifs dans [Trajets](../../operations/trips/rides.md)
- **Retrait d'un ancien tarif** — mettre le Statut à `Archivé` (envoyé comme `deleted` au backend) une fois qu'aucun Modèle de véhicule ne le référence. Les anciens trajets conservent leurs captures instantanées — vous pouvez archiver sans risque
- **Renommage pour clarté** — le Nom est purement un label. Les renommages affectent les nouvelles captures instantanées de trajets à partir de ce moment ; les trajets terminés gardent l'ancien nom dans leur ventilation

## Conseils

- **Capture instantanée, capture instantanée, capture instantanée** — en cas de doute sur le prix d'un trajet historique, vérifiez `ride.tariff.*` sur le [Détail de trajet](../../operations/trips/ride-detail.md), pas le tarif actuel dans cette liste
- **Ne pas supprimer — Archiver à la place** — les tarifs archivés restent en base (suppression douce côté serveur) et sont toujours résolus depuis les anciennes captures instantanées de trajets. La suppression dure est adaptée aux brouillons jamais utilisés
- **Utilisez l'aperçu en direct du Guide des champs** — la barre latérale droite affiche les totaux calculés au fur et à mesure de la saisie, c'est le moyen le plus rapide de valider un nouveau tarif avant enregistrement
- **Le type compte pour le calcul** — passer de `per-minute` à `per-hour` ne redimensionne pas automatiquement le `Prix de base` ; il faut le recalculer manuellement (1 minute à 0,20 € ≠ 1 heure à 0,20 €)
- **Les niveaux de remise sont séquentiels** — `Après` est mesuré dans les mêmes unités que `Type`. Un niveau avec `Après : 30, Remise : 10 %` sur un tarif `per-minute` signifie « à partir de la minute 30, facturer 90 % du prix de base ». Les trois niveaux s'empilent dans l'ordre — le plus élevé applicable l'emporte
- **Étiquetez vos tarifs** — les étiquettes se propagent au Modèle de véhicule et aident au filtrage dans cette liste. Libellés courants : `Trottinette`, `Vélo`, `Promo`, `Legacy`
