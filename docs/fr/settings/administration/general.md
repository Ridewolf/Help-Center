# Général

La page Général (`/settings/general`) est le **panneau de contrôle système global** — un endroit unique pour définir les valeurs par défaut qui régissent l'application Rider, la flotte, la tarification, les trajets, les notifications et les options pour développeurs. Tout ce qui est ici s'applique globalement à l'ensemble de l'entreprise ; les exceptions par véhicule ou par tarif se trouvent dans [Paramètres du véhicule](../infrastructure/vehicle-settings.md) et [Tarifs des véhicules](../infrastructure/vehicle-tariffs.md).

> _Note_ : cette page est actuellement un **écran uniquement frontal** — chaque valeur est conservée dans l'état local et le bouton **Enregistrer** affiche simplement une notification de confirmation. Aucune donnée n'est encore envoyée au backend. Considérez-la comme la spécification / interface de préproduction pour la future API.

La route `/settings/general-settings` est un **espace réservé** quasi vide avec une seule illustration et un titre. L'écran de configuration réel est `/settings/general` (cet article) — c'est là que se trouvent les six onglets.

Permission requise : aucun `requiredPermissions` spécifique n'est défini dans le routeur — tout opérateur connecté peut ouvrir la page.

## Onglets

La page comporte six onglets en haut (bureau). Sur mobile, ces mêmes onglets se replient en un accordéon indiquant simplement _Utilisez le bureau pour la configuration complète_ — ces paramètres sont réservés aux administrateurs par conception.

| Onglet        | Icône       | Ce qu'il couvre                                                                                         |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| App           | sliders     | Contrôle des mises à jour de l'app, visibilité par défaut des modules, flags de fonctionnalités, limites de taux, valeurs par défaut des véhicules             |
| Locale        | globe       | Langue par défaut, fuseau horaire, langues activées, formats date / heure / unité, fournisseur de carte + style des zones |
| Pricing       | dollar sign | Valeurs par défaut de tarification, modèles de tarifs, politique de remises/promo, valeurs par défaut des abonnements                      |
| Rides         | car         | Règles de réservation et de trajet, pause/arrêt automatique, pénalités, traitement des paiements                          |
| Notifications | bell        | Activation des canaux (push / e-mail / SMS) et modèles de messages pour les événements du rider                            |
| Advanced      | code        | Intégrations, sécurité, conservation des données, pages légales, flags développeur, maintenance système            |

Un pied de page fixe avec **Abandonner** et **Enregistrer les modifications** apparaît en bas uniquement après que vous ayez modifié un champ — la page utilise `useFormState` pour comparer avec l'instantané chargé.

## Sections par onglet

### App

Deux cartes empilées.

**Valeurs par défaut de l'app**

- _Exiger la mise à jour de l'app_ — interrupteur + champ texte version minimale (désactivé tant que l'interrupteur est éteint). Si activé, l'application Rider bloquera les utilisateurs en dessous de cette version.
- _Visibilité par défaut des modules_ — quatre interrupteurs (Marketing, Rééquilibrage, Assistance, Analytique) qui préconfigurent les modules visibles pour les nouveaux opérateurs.
- _Flags de fonctionnalités_ — quatre interrupteurs (Suivi en direct, Statistiques avancées, Multi-devises, Marque blanche).
- _Limite de taux API_ / _Limite de taux UI_ — champs numériques (par défaut 1000 / 100 requêtes/min).

**Valeurs par défaut des véhicules**

- _Ensemble d'icônes par défaut_ — liste déroulante avec recherche des noms d'ensembles d'icônes (actuellement quatre maquettes codées en dur : Icônes par défaut / Ensemble moderne / Minimaliste / Couleur audacieuse ; la liste réelle proviendra de [Ensembles d'icônes](../content/icon-sets.md)).
- _Seuils de batterie_ — deux champs numériques (Faible %, Critique %). La validation s'effectue à l'enregistrement : critique doit être inférieur à faible sinon une erreur toast s'affiche.
- _Poids du score de santé_ — trois champs en pourcentage (signal / erreurs / batterie). Validés pour totaliser 100 à l'enregistrement.
- _Étiquettes automatiques_ — chaîne de tags séparés par des virgules appliqués automatiquement aux véhicules tout neufs.

### Locale

- _Langue par défaut_ / _Fuseau horaire_ — sélection.
- _Langues activées_ — multi-puces ; X pour supprimer.
- _Début de semaine_ — lundi / dimanche.
- _Format de date_ — JJ/MM/AAAA, MM/JJ/AAAA, ISO, etc.
- _Format de l'heure_ — 12h / 24h.
- _Unité de température_ — Celsius / Fahrenheit.
- _Unité de distance_ — km / mi.
- _Devise d'affichage_ — par défaut EUR (À FAIRE dans le code : charger depuis l'API entreprise).
- _Arrondi des prix_ — aucun / au plus proche 0,05 / etc.

**Cartes** (carte séparée dans le même onglet)

- _Fournisseur_ (MapTiler par défaut) et _Style_ (clair / sombre / satellite).
- _Clé API_ — champ texte pour la clé du fournisseur.
- _Zoom par défaut_ + _Centre par défaut_ — utilisés en l'absence de contexte GPS.
- _Style des zones_ — couleur + largeur de trait pour les polygones Parking / Interdit / Basse vitesse / Parking payant. Les sélecteurs utilisent une palette de 12 couleurs.
- _Limite basse vitesse_ — numérique (km/h).

### Pricing

Quatre cartes : _Valeurs par défaut de tarification_, _Modèles de tarifs_, _Remises & Promo_, _Abonnements_. Ces paramètres définissent des **valeurs de secours** — la tarification réelle des trajets est remplacée par véhicule via [Tarifs des véhicules](../infrastructure/vehicle-tariffs.md).

- Valeurs par défaut de tarification : frais de déverrouillage, prix/min, prix/km, attente payante, minutes de réservation gratuites, remise à deux niveaux basée sur le nombre de trajets.
- Modèles de tarifs : par période (minute / heure / jour / semaine / mois / année) — prix, durée max, interrupteur parking gratuit, interrupteur activé. Plus _autoriser la superposition_.
- Remises & Promo : % de remise max, préfixe promo (par défaut `WOLF`), jours de validité par défaut, règles de cumul.
- Abonnements : % de remise par défaut, jours d'essai, renouvellement automatique, autoriser les codes promo.

### Rides

- Règles de réservation + trajet : minutes de réservation gratuite, nombre max de réservations actives par client, solde minimum pour démarrer, pause automatique + arrêt automatique (chacun avec activé + seuil).
- Pénalités : deux types de pénalités (Hors zone, Stationnement incorrect) — chacun avec un montant de frais et un message d'avertissement.
- _Guide rapide par défaut_ — liste déroulante tirée d'une liste provisoire ; sera alimentée par [Guides rapides](../content/quick-guides.md).
- _Ensemble de FAQ par défaut_ — liste déroulante provenant de [Ensembles de FAQ](../content/faq-sets.md).
- Carte Paiements : 3-D Secure, mode de capture (immédiat / pré-autorisation), montant pré-autorisé, durée de blocage (heures), politique de remboursement, délai max de remboursement (jours).

### Notifications

- _Canaux_ — trois interrupteurs (Push / E-mail / SMS) — contrôlent les canaux disponibles dans l'application Rider.
- _Modèles_ — titre + texte du corps pour les trois événements principaux : Trajet démarré, Trajet terminé, Pénalité appliquée. Les variables comme `{{amount}}` / `{{reason}}` sont remplacées par le backend.
- Un bouton **Notification de test** affiche un toast d'information (pas d'envoi réel pour l'instant).

Pour le pipeline d'alerte **côté opérateur**, voir [Alerts & Notifications](alerts-notifications.md) — cet onglet-ci concerne le côté application Rider.

### Avancé

Cinq cartes.

- _Intégrations_ — point de terminaison webhook + secret, ID Google Analytics, DSN Sentry, chaînes de bot Telegram et Slack. Un bouton **Test webhook** affiche un toast.
- _Sécurité_ — interrupteur exiger 2FA, délai d'expiration de session (min), politique de mot de passe (longueur min + majuscules/chiffres/caractères spéciaux), clés reCAPTCHA, liste blanche IP, menu déroulant restrictions d'export.
- _Confidentialité_ — conservation des données en jours (télémétrie / médias / journaux), interrupteur anonymiser GPS, SLA d'export et SLA de suppression en jours.
- _Légal_ — Conditions d'utilisation + Politique de confidentialité en zones de texte Markdown, plus une chaîne de version et une date de publication.
- _Développeur / Avancé_ — mode bac à sable, niveau de journalisation, URLs des points de terminaison production + staging, interrupteurs d'expérimentation (routage IA, maintenance prédictive, tarification dynamique).
- _Système / Maintenance_ — interrupteur mode maintenance + texte de bannière + interrupteur mode lecture seule.
- _Audit & Sauvegardes_ — boutons _Créer une sauvegarde_ et _Supprimer toutes les données_ (les deux affichent des toasts ; la suppression _requiert une confirmation admin_ — pas encore implémentée).

## Flux de travail

- **Verrouiller une nouvelle version** — Onglet App → activer _Exiger la mise à jour de l'app_ → définir la version min → Enregistrer. Les utilisateurs sur des versions plus anciennes reçoivent une invite de mise à jour.
- **Ajouter une langue** — Onglet Locale → _Langues activées_ → sélectionner la puce de langue → Enregistrer. Les chaînes doivent encore être traduites via [Localization](localization.md).
- **Ajuster l'expérience pénalité utilisateur** — Onglet Trajets → modifier les frais hors zone + texte d'avertissement → Enregistrer.
- **Mettre la plateforme en pause pour maintenance** — Avancé → _Système / Maintenance_ → basculer l'interrupteur, modifier le texte de la bannière, éventuellement activer le mode lecture seule → Enregistrer.
- **Déployer un nouveau style de carte** — Locale → carte _Cartes_ → choisir un style → ajuster les couleurs des zones → Enregistrer (les changements s'appliquent globalement une fois l'API connectée).

## Conseils

- **Front-end uniquement pour l'instant.** L'enregistrement capture un instantané local mais ne contacte aucun point de terminaison backend — ne comptez pas sur cette page pour persister quoi que ce soit avant la mise en place de l'API.
- **La validation se fait à l'enregistrement.** Les seuils de batterie (critique < faible) et les poids du score de santé (somme à 100) sont vérifiés lors de l'appui sur Enregistrer, pas pendant la saisie — corrigez l'erreur du toast et réessayez.
- **Ne pas confondre avec `/settings/general-settings`.** Cette route existe mais affiche seulement une carte vide — ouvrez `/settings/general` pour l'écran réel.
- **Abandonner est votre filet de sécurité** — le pied de page n'apparaît que s'il y a des modifications non enregistrées ; cliquez sur _Abandonner_ pour revenir à l'instantané chargé sans quitter la page.
- **La version mobile est volontairement limitée.** Seule l'accordéon App est fonctionnel ; le reste vous invite à utiliser une session desktop.
- **Le réglage par véhicule prime.** Tout ce que vous définissez dans Tarification / Trajets est une valeur par défaut ; le tarif réel payé par un utilisateur provient du Tarif des véhicules lié au modèle — voir [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
