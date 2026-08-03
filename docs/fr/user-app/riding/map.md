# Rider App — Carte, Réservations & Scan

La carte (`/map`) est l'écran d'accueil de l'application Rider et la dernière étape de l'intégration. Elle affiche trois éléments : la position du rider, les véhicules disponibles autour de lui, et les zones que vous avez dessinées pour votre zone d'exploitation.

Le personnel d'assistance passe plus de temps sur cet écran que sur tout autre, car la plainte la plus courante des riders — _« il n'y a aucun moyen de démarrer un trajet »_ — trouve presque toujours sa réponse ici, dans [La barre inférieure est conditionnelle](#la-barre-inférieure-est-conditionnelle).

Pour le trajet lui-même (portails de départ, pause, fin, preuves photo) voir [Trajets](rides.md). Pour le côté opérateur des zones, voir [Zones](../../settings/infrastructure/zones.md).

## Environnement de navigation

Le bouton **Menu** ouvre le tiroir latéral — la seule navigation de l'application. Il n'y a pas de barre d'onglets en bas. Le tiroir contient :

| Entrée du tiroir       | Ouvre                                        |
| ---------------------- | -------------------------------------------- |
| Ligne du solde du porte-monnaie | [Porte-monnaie](../money/wallet.md)          |
| **Historique**          | [Historique](../money/history.md)             |
| **Assistance**          | [Assistance](../help/support.md)               |
| **Confidentialité**     | L'écran des directives de confidentialité et de sécurité |
| **Paramètres**          | [Paramètres](../help/settings.md)              |
| **Profil**              | L'écran de profil du rider                     |

Les promotions et abonnements ne sont pas encore disponibles dans l'application, et le tiroir ne contient aucune entrée à leur sujet — voir [Subscriptions & Promo Codes](../money/subscriptions.md).

## Contrôles à l'écran

**Contrôles supérieurs**

- **Menu** — ouvre le tiroir latéral décrit ci-dessus
- **Comment rouler** — ouvre la fiche d'aide intégrée à l'application (le contenu d'aide intégré est géré via [Guides rapides](../../settings/content/quick-guides.md))
- **Ma position** — recentre la carte sur le rider

**Barre inférieure**

| Bouton         | Quand il apparaît                                                                                  | Ce qu'il fait                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Trajet de groupe** | Avec la barre inférieure                                                                        | Ouvre le flux de trajet de groupe                                                     |
| **Scanner**       | Avec la barre inférieure                                                                        | Ouvre le scanner QR (`/ride/start`), avec une saisie manuelle du code véhicule en secours |
| **Filtres**    | Seulement lorsque le rider a des étiquettes privées de véhicule à filtrer, et n'est pas déjà en trajet ou en attente | Filtre les marqueurs selon ces étiquettes                                             |

### La barre inférieure est conditionnelle

La barre inférieure s'affiche **uniquement lorsque le rider a accès au paiement des trajets** — c'est-à-dire soit une carte liée, soit un fournisseur de paiement qui ne prend pas en charge les cartes enregistrées.

Un rider **sans carte liée sur un fournisseur qui prend en charge les cartes enregistrées ne voit pas la barre inférieure**, et donc pas le bouton **Scanner** ni le bouton **Trajet de groupe**. C'est voulu, et c'est la cause la plus fréquente du message « l'application ne me laisse pas démarrer un trajet ».

La solution : envoyez-le vers **Porte-monnaie → Gérer les moyens de paiement → Ajouter une carte**. Voir [Moyens de paiement](../money/payment-methods.md).

Si le bouton **Filtres** manque, c'est simplement que le rider n'a pas d'étiquettes privées de véhicule — ou qu'il est déjà en trajet actif ou en réservation.

## Trouver un véhicule

1. La position du rider apparaît une fois la permission de localisation accordée. Elle est demandée lors de l'intégration et peut être réactivée depuis les paramètres système de l'appareil.
2. Les véhicules disponibles apparaissent sous forme de marqueurs.
3. Appuyer sur un marqueur ouvre la fiche détaillée du véhicule — plans tarifaires plus **Démarrer** et **Réserver**.
4. Le panoramique, le zoom par pincement et le contrôle **Ma position** fonctionnent comme prévu.

### Ce qu'un marqueur affiche dépend en partie du choix du rider

Ces bascules dans les [Paramètres](../help/settings.md) modifient ce que la carte affiche :

- **Afficher le niveau de batterie**
- **Afficher les véhicules promotionnels**
- **Afficher les tarifs**
- **Zoom automatique**
- **Carte 3D**

Les zones bonus sur la carte, et la bannière de véhicule à tarif réduit dans la fiche véhicule, ne sont pas encore disponibles dans l'application.

## Zones

Les zones régissent où un véhicule peut être utilisé et où un trajet peut se terminer. Appuyer sur une zone ouvre la fiche d'information de la zone.

Ce qu'une zone spécifique fait réellement — zone restreinte, zone interdite au stationnement, limitation de vitesse, surcharge — dépend entièrement de votre configuration dans [Zones](../../settings/infrastructure/zones.md). Il n'existe pas de code couleur universel à communiquer au rider ; décrivez votre propre configuration.

La règle de zone que les riders rencontrent le plus souvent concerne le stationnement : **terminer un trajet en dehors d'une zone de stationnement autorisée est refusé**, et l'application ouvre une boîte de dialogue dédiée proposant d'afficher les zones sur la carte. Ce flux est documenté dans [Trajets](rides.md#en-dehors-de-la-zone-de-stationnement).

## Réserver un véhicule

**Réserver** est une vraie mise en attente avec un vrai minuteur, et son prix est basé sur le tarif attaché au véhicule :

1. Le rider appuie sur un marqueur, puis sur **Réserver** dans la fiche du véhicule.
2. La période gratuite correspond au **Temps de réservation** du tarif, en minutes. Pendant ce temps, la carte de réservation compte à **rebours**.
3. À l'expiration de la période gratuite, la mise en attente devient une **mise en attente payante** : la carte passe à un compte à **la hausse**, et le **Prix de réservation payant** par minute du tarif s'applique.
4. La partie payante de la mise en attente apparaît alors comme une ligne distincte dans le détail du coût du trajet terminé.

Notes importantes à connaître avant de répondre à un rider :

- **Ne jamais supposer "quelques minutes".** Certains tarifs offrent de longues fenêtres gratuites — 12 ou 24 heures. Lisez la valeur réelle du tarif dans [Tarifs des véhicules](../../settings/infrastructure/vehicle-tariffs.md).
- Si le tarif laisse **Temps de réservation** vide, l'application utilise une courte fenêtre de 3 minutes. Si le **Prix de réservation payé** est vide, un petit tarif par minute par défaut s'applique — définissez les deux explicitement pour que les utilisateurs voient vos chiffres.
- Une réservation est dans l'un de ces états : _en attente_, _active_, _expirée_, _réservée_ ou _en pause_.
- La réservation **requiert l'autorisation de localisation accordée**, et peut toujours être refusée si l'utilisateur est trop loin du véhicule ou si un délai de refroidissement de réservation est en cours sur ce véhicule. Chaque refus déclenche sa propre boîte de dialogue — voir [Trajets](rides.md#pourquoi-un-conducteur-ne-peut-pas-démarrer-un-trajet).

## Dépannage

| L'utilisateur dit…                  | Que vérifier                                                                                                                                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| « Je ne vois aucun véhicule »       | Autorisation de localisation accordée ? Ensuite : l'utilisateur est-il dans une zone que vous desservez réellement ?                                                |
| « Il n'y a pas de bouton Scanner » | Pas de carte liée sur un fournisseur qui supporte les cartes enregistrées. Ajoutez une carte depuis [Méthodes de paiement](../money/payment-methods.md)              |
| « Il n'y a pas de bouton Filtres » | L'utilisateur n'a pas d'étiquettes de véhicule privées, ou est déjà en trajet ou en attente                                                                        |
| « La carte ne charge pas »          | Vérifiez la connectivité d'abord, puis **Paramètres → Mode données** (_équilibré_ / _faible_ / _élevé_), qui contrôle la qualité des tuiles de la carte et le détail chargé |
| « La carte est lente / lourde »    | Même chose : baissez le **Mode données** à _faible_, et activez **Animations réduites** dans [Paramètres](../help/settings.md)                                      |
| « Je ne peux pas démarrer un trajet » | Parcourez les étapes dans [Trajets](rides.md#pourquoi-un-conducteur-ne-peut-pas-démarrer-un-trajet) dans l'ordre — barre inférieure, plan et paiement, solde minimum, localisation, distance, délai, preuves |

## Conseils

- **Vérifiez la barre inférieure avant toute chose.** Demandez à l'utilisateur d'envoyer une capture d'écran de la carte ; une barre inférieure manquante diagnostique instantanément le problème.
- **L'autorisation de localisation est toujours la deuxième question.** Pas de position signifie pas de réservation et, dans la plupart des cas, pas de démarrage.
- **Les zones ne signifient que ce que vous en avez fait.** Avant de dire à un utilisateur « vous ne pouvez pas vous garer ici », ouvrez la zone dans le Tableau de bord et lisez sa configuration réelle.
- **Les longues fenêtres gratuites de réservation surprennent tout le monde**, y compris votre propre personnel. Connaissez le **Temps de réservation** de votre tarif avant d'expliquer une charge d'attente.
