# Application utilisateur — Vue d'ensemble

L'application utilisateur (l'application Rider) est l'application mobile que vos clients utilisent pour trouver et utiliser des véhicules partagés, recharger leur solde de portefeuille, consulter leurs trajets passés et contacter votre équipe d'assistance.

Cet article est la carte de cette application : ce qu'elle fait, où se trouve chaque écran, et quel guide répond à quelle question. Utilisez-le comme point de départ lorsqu'un utilisateur vous contacte et que vous avez besoin du nom exact de l'écran et des étapes précises.

Pour un parcours utilisateur lors du premier lancement, voir [Getting started](getting-started.md). Pour l'application du personnel sur le terrain, voir [Service app — Overview](../../service-app/basics/overview.md).

## Ce que l'application peut faire

- Carte des véhicules en temps réel comme écran d'accueil
- Solde du portefeuille avec plusieurs fournisseurs de recharge
- Historique des trajets avec détail du coût par trajet et carte de l'itinéraire
- Chat en direct avec l'assistance, plus les canaux de contact que vous activez
- Plusieurs langues d'interface, thèmes clair et sombre
- Gestion des sessions par appareil

## Comment les utilisateurs naviguent dans l'application

La **carte** est l'écran d'accueil. Tout le reste s'ouvre depuis le **menu latéral**, que l'utilisateur fait glisser depuis la carte — ce tiroir est la seule structure de navigation de l'application. Il n'y a pas de barre d'onglets en bas dans l'application, donc ne jamais envoyer un utilisateur en chercher une.

Les messages de chat de l'opérateur peuvent aussi contenir des liens d'application qui amènent directement l'utilisateur à un écran (par exemple l'écran Confidentialité).

## Réponses rapides par tâche

### Compte, connexion et configuration

| Question de l'utilisateur                      | Où se trouve la réponse                                            |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| Comment me connecter ?                         | [Signing in](../account/registration-login.md) — les méthodes disponibles dépendent des paramètres de votre entreprise, donc l'écran de connexion n'est pas le même pour chaque opérateur |
| J'ai oublié mon mot de passe                    | [Signing in](../account/registration-login.md)                    |
| J'ai ouvert l'application depuis un bot Telegram ou Viber | [Signing in](../account/registration-login.md)                  |
| Que se passe-t-il juste après la première connexion ? | [Onboarding and verification](../account/onboarding-verification.md) |
| Quels documents sont demandés ?                | [Onboarding and verification](../account/onboarding-verification.md) |
| Pourquoi mon compte est-il bloqué ?             | [Onboarding and verification](../account/onboarding-verification.md) — l'écran **Compte bloqué** |
| Première visite de l'application                | [Getting started](getting-started.md)                             |

### Trouver un véhicule et rouler

| Question de l'utilisateur                                      | Où se trouve la réponse              |
| ------------------------------------------------------------- | ---------------------------------- |
| Comment trouver et sélectionner un véhicule ? Comment fonctionne la tarification de la réservation ? | [Map](../riding/map.md)              |
| Comment démarrer, mettre en pause et terminer un trajet ?     | [Rides](../riding/rides.md)          |
| Pourquoi ne puis-je pas démarrer un trajet ?                  | [Rides](../riding/rides.md) — couvre un bouton **Scanner** manquant, solde minimum pour démarrer, permission de localisation, distance trop grande du véhicule, délai de réservation et photos de départ inachevées |
| Qu'en est-il de la photo de stationnement à la fin ?          | [Rides](../riding/rides.md) — y compris la boîte de dialogue hors zone de stationnement |
| De quoi est composé le coût de mon trajet ?                   | [Rides](../riding/rides.md) et [History](../money/history.md) |

### Argent et paiements

| Question de l'utilisateur                  | Où se trouve la réponse                                              |
| ------------------------------------------ | ------------------------------------------------------------------- |
| Comment recharger mon solde ?              | [Wallet](../money/wallet.md) pour le point d'entrée, [Payment methods](../money/payment-methods.md) pour le guide complet de chaque processus de recharge |
| Comment ajouter une carte ?                 | [Payment methods](../money/payment-methods.md)                      |
| Quels fournisseurs existent et quelles sont leurs différences ? | [Payment methods](../money/payment-methods.md)                  |
| Ma recharge est en attente / je veux l'annuler | [Payment methods](../money/payment-methods.md)                   |
| Comment fonctionne la recharge automatique ? | [Wallet](../money/wallet.md)                                        |

### Historique, reçus et statistiques

| Question de l'utilisateur                          | Où se trouve la réponse                                        |
| -------------------------------------------------- | -------------------------------------------------------------- |
| Où sont mes trajets et paiements passés ?          | [History](../money/history.md) — deux onglets, chacun paginé  |
| J'ai besoin d'un reçu, d'une carte d'itinéraire et du détail des coûts pour un trajet | [History](../money/history.md) — détail du trajet       |
| Quels sont mes totaux ?                            | [History](../money/history.md). L'écran **Analytique** n'est pas encore disponible dans l'application — voir [Analytics](../money/analytics.md) |

### Profil, paramètres et sécurité

| Question du rider                             | Où se trouve la réponse                                  |
| -------------------------------------------- | ------------------------------------------------------- |
| Comment changer mon nom, ma photo ou mon mot de passe ? | [Profil](../account/profile.md)                     |
| Comment supprimer mon compte ?                | [Profil](../account/profile.md) — voici le processus en vigueur. [Confidentialité](../account/privacy.md) explique pourquoi le bouton sur l'écran Confidentialité n'est pas celui à utiliser |
| Notifications, langue, thème, affichage de la carte | [Paramètres](../help/settings.md)                         |
| Sur quels appareils suis-je connecté ?        | [Sessions](../account/sessions.md)                      |
| Où se trouvent la politique de confidentialité / les consignes de sécurité ? | [Confidentialité](../account/privacy.md)                       |

### Aide

| Question du rider                      | Où se trouve la réponse                     |
| ------------------------------------- | --------------------------------------- |
| Comment contacter l'assistance ?      | [Assistance](../help/support.md)           |
| Abonnements ou code promo              | [Abonnements](../money/subscriptions.md) — non disponible actuellement dans l'application |

## Référence des écrans

| Écran               | Route                       | Description                                                  |
| ------------------- | --------------------------- | ------------------------------------------------------------ |
| **Carte**           | `/map`                      | Écran d'accueil — trouver et sélectionner un véhicule        |
| **Portefeuille**    | `/wallet`                   | Solde, bonus, rechargement, rechargement automatique         |
| **Moyens de paiement** | `/wallet/payment-methods`   | Cartes enregistrées et rechargements en attente              |
| **Historique**      | `/history`                  | Onglets **Trajets** et **Paiements** ; appuyez sur un trajet pour ses détails |
| **Profil**          | `/profile`                  | Infos du compte, photo, mot de passe, suppression du compte  |
| **Paramètres**      | `/settings`                 | Notifications, affichage de la carte, langue, thème          |
| **Sessions**        | `/settings/sessions`        | Tous les appareils connectés au compte                        |
| **Confidentialité** | `/privacy`                  | Politique de confidentialité et consignes de sécurité        |
| **Assistance**      | `/support`                  | Onglets **FAQ** et **Contact**, plus chat en direct         |

## Non disponible actuellement dans l'application

Ne promettez pas ces fonctionnalités à un rider — elles ne sont pas disponibles actuellement dans l'application :

- **Abonnements** et **codes promo** — l'écran ne peut pas être ouvert
- **Analytique** — orientez les riders vers **Historique** pour les totaux
- **Téléversement de documents lors de l'onboarding** — ne dites jamais à un rider que son document a été reçu
- **Mode de conduite**, **Unités**, **Cartes hors ligne**, **codes d'invitation**, **Télécharger mes données** et le bouton **Demander la suppression du compte** sur l'écran Confidentialité

La suppression du compte elle-même fonctionne — depuis **Profil**, voir [Profil](../account/profile.md).

## Ce que modifient les paramètres de votre entreprise

Plusieurs parties de l'application diffèrent entre les opérateurs car vous les configurez dans le tableau de bord, sous **Paramètres → Mon entreprise → Application** :

- **Méthodes d'authentification** — quels onglets le rider voit à l'écran de connexion
- **Étapes supplémentaires d'inscription** — si l'onboarding demande des documents supplémentaires
- **Canaux d'assistance** — quels canaux de contact apparaissent sur les écrans Assistance et Compte bloqué
- **Légal & conformité** — les liens vers les Conditions d'utilisation et la Politique de confidentialité affichés dans l'application

Voir [Mon entreprise](../../settings/administration/my-company.md) pour la partie opérateur de ces paramètres.
