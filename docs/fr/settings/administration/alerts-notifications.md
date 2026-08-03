# Alertes et notifications

La page Alertes et notifications (`/settings/alerts-notifications`) est la **console d'alerte de l'opérateur** — comment la plateforme informe le _personnel_ qu'une action est nécessaire. Elle couvre les canaux (push / in-app / e-mail / SMS), les fournisseurs externes (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), les règles qui déclenchent les alertes, les modèles de messages, les politiques d'escalade, les abonnés et le journal de livraison.

Cette page concerne les **alertes pour l'équipe qui gère la plateforme**. Pour les messages de notification destinés aux utilisateurs (Début du trajet, Pénalité appliquée, etc.), voir l'onglet _Notifications_ de [General](general.md).

> _Note_ : cette page est actuellement un **prototype uniquement front-end** — les configurations des canaux, règles, abonnements et le journal de livraison sont stockés en local (ou initialisés depuis `mockData.ts`). _Enregistrer les modifications_ affiche un toast de confirmation mais ne contacte pas encore de point de terminaison backend. La structure de la page correspond au modèle réel et peut servir de spécification pour le travail sur l'API.

Permission requise : aucun `requiredPermissions` spécifique n'est défini sur la route — tout opérateur connecté peut l'ouvrir.

## Barre d'outils supérieure

L'en-tête de la page comporte quatre boutons :

| Action       | Fonction                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Auto-refresh | Le widget partagé `AutoRefresh` — sans effet ici, présent pour la cohérence avec les autres pages                                    |
| Test all     | Affiche un toast _"Test de tous"_ — espace réservé pour "envoyer un test à chaque canal activé"                         |
| Mute 1h      | Toast _"Muet pendant 1h"_ — espace réservé pour une mise en sourdine globale d'une heure                                |
| Maintenance  | Bouton rouge destructeur — ouvre une boîte de dialogue d'alerte demandant confirmation ; la confirmation affiche un toast indiquant que la maintenance est activée |

## Onglets

Sept onglets en haut. Chacun est un sous-composant distinct.

| Onglet        | Objectif                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| Channels      | Canaux intégrés (push / in-app / e-mail / SMS) + routage par gravité + résumés      |
| Providers     | Identifiants des fournisseurs externes (E-mail / SMS / Telegram / Slack / Discord / Webhook) |
| Rules         | Règles d'alerte par famille d'événements                                           |
| Templates     | Texte des notifications par famille d'événements × langue                          |
| Policies      | Chaîne d'escalade, mise en sourdine automatique, sécurité de l'audience, masquage des données personnelles (PII) |
| Subscriptions | Qui (rôle ou utilisateur) reçoit quelles familles d'événements sur quels canaux   |
| Logs          | Journal de livraison en lecture seule (entrées envoyées / acquittées / échouées)  |

### Canaux

Trois cartes empilées.

**Canaux intégrés**

- _Push_ — configuration complète (interrupteur activé, limite de fréquence, tentatives, heures calmes de / à, bouton de test).
- _In-app_ — activé, limite de fréquence, secondes avant fermeture automatique.
- _E-mail_ — dépend du fournisseur d'e-mail dans l'onglet Providers. Activé, limite de fréquence, tentatives.
- _SMS_ — dépend du fournisseur SMS. Activé, limite de fréquence, tentatives, heures calmes.

**Correspondance de gravité** — trois listes déroulantes mappant `info` → `inApp` (par défaut), `warning` → `push`, `critical` → `push+email`. Ce sont les canaux utilisés lorsqu'une règle a cette gravité mais ne spécifie pas de canaux précis.

**Résumé (Digest)** — fréquence (désactivé / horaire / quotidien / hebdomadaire) + heure d'envoi (sélecteur HH:00).

### Fournisseurs

Six blocs de fournisseurs, chacun avec un interrupteur d'activation et des identifiants.

- _E-mail_ — liste déroulante du type de fournisseur (SMTP / SendGrid / Mailgun), clé API ou identifiants SMTP (entrée masquée), domaine d'envoi.
- _SMS_ — SID du compte, jeton d'authentification (masqué), numéro d'envoi — format Twilio.
- _Telegram_ — jeton du bot (masqué) + sélecteur d'ID de chat (liste codée en dur de trois chats de démonstration : `@ridewolf_alerts`, `@support_team`, `@management` ; le bouton **Test** est un espace réservé).
- _Slack_ — URL du webhook + canal.
- _Discord_ — URL du webhook.
- _Webhook_ — URL générique du webhook + secret de signature.

Chaque bloc fournisseur affiche un badge _Activé_ à côté du titre une fois son interrupteur activé. Les boutons _Test_ affichent un toast.

### Règles

Un tableau des règles d'alerte. Colonnes : Nom / Famille d'événements / Gravité / Canaux / Statut / Actions (menu à 3 points : Modifier / Dupliquer / Activer-Désactiver / Supprimer). Cliquez sur **+ Créer une règle** pour ouvrir la boîte de dialogue de règle — choisissez un nom, la portée (globale / zone / rôle), une ou plusieurs familles d'événements, la gravité (info / avertissement / critique), les canaux et le drapeau activé.

Règles initiales : _Échecs de paiement_ (critique, famille paiements, push+email+telegram) et _Véhicule hors ligne_ (avertissement, famille véhicules, push+email).

### Modèles

Choisissez une famille d'événements + langue + canal, puis modifiez le titre et le corps. Le corps supporte des espaces réservés (ex. `{{ride.id}}`, `{{amount}}`) que le bloc **Aperçu** remplit avec un événement d'exemple. _Envoyer un test_ affiche un toast indiquant qu'un test est envoyé au canal sélectionné.

### Politiques

Quatre blocs :

- _Escalade critique_ — liste déroulante de chaîne (ex. push → e-mail → telegram → SMS), délai d'acquittement en minutes, interrupteur de demande d'accusé de lecture.
- _Mise en sourdine automatique_ — silence les répétitions : si le même événement se produit _N_ fois en _M_ minutes, mise en sourdine pendant _K_ minutes (trois entrées numériques). Une chaîne récapitulative en dessous reformule la règle.
- _Sécurité de l'audience_ — interrupteur _Bloquer les SMS en dehors des heures calmes_ (outrepasse les heures calmes par canal pour les SMS spécifiquement).
- _Masquage des données_ — interrupteur _Masquer les données personnelles dans les messages externes_ ; un indice explique ce qui est masqué (téléphone, e-mail, 4 derniers chiffres des cartes, etc.).

### Abonnements

Un tableau des entrées d'abonnement. Chaque ligne lie une cible (un Rôle ou un Utilisateur spécifique) à une ou plusieurs familles d'événements et canaux — par exemple _Rôle : Admin → système + paiements → push + e-mail_. Le bouton **+ Créer** ouvre une boîte de dialogue d'abonnement ; le menu de la ligne propose Modifier / Supprimer.

Utilisez les Abonnements pour envoyer des alertes aux personnes qui ne correspondent à aucun canal épinglé dans une Règle — les Règles définissent _quoi_ alerter, les Abonnements définissent _qui_ reçoit l'alerte.

### Journaux

Tableau en lecture seule des tentatives de livraison. Colonnes : Heure / Événement / Route / Canal / Destinataire / Statut (envoyé / acquitté / échoué) / Latence. Cliquez sur une ligne pour ouvrir une notification détaillée (espace réservé pour un panneau de détails complet). Utilisez ceci pour confirmer qu'une alerte a bien été envoyée, ou pour déboguer un fournisseur défaillant.

## Familles d'événements

Les Règles, Modèles et Abonnements utilisent tous la même liste fixe de familles d'événements (définie dans `models/channels.ts`) :

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Celles-ci correspondent approximativement aux domaines du tableau de bord — choisissez la famille qui correspond au type d'événement sur lequel vous souhaitez alerter.

## Flux de travail

- **Configurer les alertes e-mail** — Onglet Fournisseurs → activer E-mail → choisir le type de fournisseur → coller la clé API → enregistrer → revenir à Canaux → activer le canal E-mail → terminé.
- **Être alerté en cas d'échec de paiement** — Onglet Règles → modifier _Échecs de paiement_ → vérifier que la gravité est `critical` et que les canaux incluent ceux que vous surveillez réellement → enregistrer.
- **Bloquer le spam SMS la nuit** — Onglet Politiques → activer _Bloquer les SMS en dehors des heures calmes_ → définir les heures calmes par canal dans l'onglet Canaux.
- **Envoyer un résumé quotidien au lieu de notifications** — Onglet Canaux → carte Résumé → définir la fréquence sur _quotidien_, heure par exemple 09:00.
- **Ajouter un nouveau rôle d'astreinte** — Onglet Abonnements → + Créer → choisir le rôle → familles d'événements → canaux → enregistrer. Ils recevront les alertes futures correspondantes.
- **Déboguer une alerte manquante** — Onglet Journaux → chercher l'événement par route ou heure → si le statut est `failed`, aller dans Fournisseurs pour vérifier les identifiants ; si `sent` mais que l'humain ne l'a pas vue, vérifier Abonnements / heures calmes / état de sourdine.

## Conseils

- **Front-end uniquement pour l'instant.** Enregistrer affiche une notification mais l'API n'existe pas encore — considérez cette page comme une spécification, pas une source de vérité.
- **Les boutons de test sont des prototypes.** _Tester tout_, _Sourdine 1h_, _Tester_ par canal et la confirmation _Maintenance_ affichent juste une notification — ils ne déclenchent pas réellement de messages de test ni ne mettent en sourdine quoi que ce soit.
- **La correspondance de gravité est la solution de secours.** La liste _Canaux_ d'une Règle prévaut si elle est définie ; seule une liste vide ou non définie utilise la correspondance de gravité.
- **Le résumé est séparé des alertes par événement.** Activer le résumé ne met pas en sourdine les alertes individuelles — il ajoute simplement le résumé périodique.
- **Les abonnements peuvent cibler un utilisateur**, pas seulement un rôle. Utilisez cela pour des escalades ponctuelles (par exemple _le responsable de nuit reçoit toutes les alertes `rides` en push_) sans créer de rôle.
- **La mise en page mobile est volontairement en lecture seule.** Tous les onglets sur mobile indiquent simplement _Utilisez le bureau pour la configuration complète_ — l'alerte est une tâche d'administration nécessitant le bureau.
- **La suppression des données personnelles est importante pour SMS/e-mail.** Si elle est désactivée, le contenu des alertes peut divulguer des numéros de téléphone ou des extrémités de carte aux fournisseurs externes — laissez-la activée sauf raison spécifique.
