# Rider App — Démarrer, Mettre en pause et Terminer un trajet

Un trajet dans l'application Rider suit une séquence fixe d'étapes : choisir un véhicule, éventuellement le réserver, passer les contrôles de départ, prendre les photos avant le trajet, rouler, mettre en pause et reprendre si nécessaire, puis terminer le trajet avec une photo de stationnement et une évaluation.

Le temps est tarifé en **trois segments distincts** — réservation, conduite active et pause — ce qui explique pourquoi le total d'un trajet peut parfois surprendre le conducteur. La [répartition des coûts](#détail-des-coûts) est l'endroit où régler ces questions.

Il y a deux façons de démarrer : **Réserver** (retenir le véhicule d'abord, puis démarrer) et **démarrage direct** (démarrer immédiatement). Les deux commencent sur la [Carte](map.md).

## Sélection d'un véhicule

Le conducteur peut soit :

- **Appuyer sur un marqueur de véhicule** sur la carte, ou
- **Scanner son code QR** — le bouton **Scanner** ouvre le scanner (`/ride/start`). Il utilise le scanner natif de la caméra sur Android et iOS, et un lecteur de caméra intégré sur le web. Une **saisie manuelle du code véhicule** est proposée lorsque le code est endommagé ou illisible. Un code erroné affiche un toast _code invalide_, et le scanner se ferme aussi automatiquement après un délai d'attente.

Les deux chemins mènent à la même fiche de détails du véhicule : les plans tarifaires, plus **Démarrer** et **Réserver**. La position du conducteur est capturée au moment du scan et réutilisée pour le démarrage ou la réservation.

## Pourquoi un conducteur ne peut pas démarrer un trajet

Passez-les dans l'ordre — ce sont les véritables barrières, dans l'ordre où elles s'appliquent :

1. **Il n'y a pas du tout de bouton Scanner.** La barre inférieure de la carte s'affiche uniquement lorsque le conducteur a accès au paiement du trajet : une carte liée, ou un fournisseur qui ne supporte pas les cartes enregistrées. Pas de carte sur un fournisseur compatible carte signifie pas de **Scanner** et pas de **Trajet en groupe**. Corrigez cela dans [Méthodes de paiement](../money/payment-methods.md). **Vérifiez cela en premier.**
2. **Aucun plan ou méthode de paiement sélectionné.** **Démarrer** / **Réserver** reste désactivé tant qu'un plan tarifaire n'est pas choisi, que ce plan n'est pas marqué comme désactivé, et — lorsque le fournisseur exige un choix explicite — qu'une méthode de paiement est sélectionnée. Le bouton désactivé indique la raison.
3. **Solde minimum pour démarrer — uniquement pour les payeurs par solde.** Un conducteur **sans carte liée** est vérifié par rapport au solde minimum de démarrage du tarif et refusé en dessous, avec un message indiquant le montant requis. Lorsque le tarif ne fixe pas ce montant, la règle est simplement « solde supérieur à zéro ». Les conducteurs **avec** une carte liée ne sont pas soumis à cette règle. La règle s'applique à la fois à **Démarrer** et **Réserver**. Lisez la valeur réelle dans le tarif dans [Tarifs des véhicules](../../settings/infrastructure/vehicle-tariffs.md) — ne donnez jamais un chiffre de mémoire.
4. **Permission de localisation.** **Réserver** effectue une vérification de localisation et annule si la permission n'est pas accordée. **Démarrer** a besoin de coordonnées utilisables ou bascule vers la fenêtre modale **Avant de rouler**.
5. **Trop loin du véhicule.** L'application ouvre une boîte de dialogue indiquant le code du véhicule et le rayon requis. Si le véhicule lui-même n'a pas signalé de position, la même boîte apparaît en mode « véhicule hors ligne » avec un compte à rebours de nouvelle tentative. Si la position du conducteur ne peut pas être lue, une boîte « nous ne pouvons pas lire votre position » apparaît à la place.
6. **Délai de refroidissement de réservation.** Un véhicule qui vient d'être libéré ne peut pas être réservé immédiatement ; l'application ouvre une boîte de dialogue de délai de refroidissement de réservation.
7. **Photos avant le trajet non terminées** — voir la section suivante.
8. **Une action est déjà en cours.** Les boutons se verrouillent et affichent un indicateur de chargement pendant qu'une requête est en cours. Ce n'est pas un gel ; une seconde pression est ignorée.

## Photos avant le trajet

Les preuves photo avant le trajet sont configurées par entreprise et activées par défaut. Trois paramètres les régissent :

- Un **interrupteur principal** pour les preuves de démarrage
- **Photos du véhicule** — peuvent être activées, marquées comme obligatoires, et recevoir un nombre de photos (par défaut : activées, non obligatoires, une photo)
- **Selfie** — peut être activé et marqué comme obligatoire (par défaut : activé, non obligatoire)

L'ordre est fixe : fenêtre modale **Avant de rouler** → photos du véhicule → selfie → activation du véhicule. Une étape activée mais non obligatoire peut être sautée par le conducteur ; une obligatoire ne peut pas. Si les preuves de démarrage sont complètement désactivées, la fenêtre modale passe directement à l'activation.

Les photos arrivent dans votre file de modération — voir [Preuves de stationnement](../../support/tickets-proofs-chat/park-proofs.md).

## Mettre en pause et reprendre

- **Pause** et **Reprendre** sont le même bouton bascule, envoyé avec la position actuelle du conducteur.
- Chaque action est ensuite ignorée pendant environ **8 secondes**, volontairement, pour qu'une seconde pression rapide ne fasse rien.
- **Reprendre peut exiger un selfie.** Chaque fois que la preuve selfie est activée pour votre entreprise, reprendre ouvre d'abord une vérification selfie — et **celle-ci ne peut pas être sautée**.
- **La pause est tarifée.** Les minutes en pause sont facturées au **Prix de pause** du tarif. Il n'y a pas de durée maximale de pause.
- **Fonds insuffisants pendant la pause.** Un trajet en pause avec un solde nul ou négatif fait apparaître sur la carte du trajet actif un avis de fonds insuffisants avec **Recharger** et **Terminer le trajet**. Le conducteur ne peut pas reprendre tant que le solde n'est pas rétabli. Considérez cela comme un fort indice plutôt qu'une certitude — l'application l'infère du solde, vérifiez aussi le portefeuille dans le tableau de bord.

## Terminer un trajet

La séquence exacte, pour que vous puissiez expliquer au conducteur à quoi s'attendre ensuite :

1. **Terminer le trajet** ouvre la **fenêtre modale de fin de trajet** : guide de stationnement (où le stationnement est autorisé ou interdit) et une liste de contrôle — véhicule droit, verrouillé, photo, environnement. Si les preuves de fin sont désactivées pour votre entreprise, le trajet se termine simplement ici.
2. **Continuer** ouvre la **fenêtre modale de preuve de stationnement**, lorsque les preuves de fin et les photos de stationnement sont toutes deux activées. Sinon, le trajet se termine sans preuve.
3. Le conducteur prend le nombre requis de photos de stationnement — la fenêtre modale affiche un compteur photos prises / requises. **Passer** est proposé lorsque les photos de stationnement ne sont pas obligatoires (et dans certaines versions de l'application même lorsqu'elles le sont), et cela termine le trajet sans preuve après une boîte de dialogue de confirmation.
4. **Terminer** est refusé localement si des photos manquent. Ensuite, l'application prend une nouvelle position GPS et **ferme le trajet d'abord, avant de téléverser quoi que ce soit** — ainsi un refus (zone incorrecte, trop loin) apparaît immédiatement.
5. Les photos sont ensuite téléversées une par une et enregistrées comme preuves de stationnement de fin de trajet. Un échec de téléversement **ne revient pas sur la fin du trajet** — il est déjà fermé, et la facturation n'est pas affectée.
6. Le trajet est rechargé et la **fenêtre modale d'évaluation** s'ouvre : une notation par étoiles avec un commentaire optionnel, ou passer.

### En dehors de la zone de stationnement

Si la fin est refusée parce que le véhicule est en dehors d'une zone de stationnement autorisée, l'application ouvre une boîte de dialogue illustrée **hors zone de stationnement**. Son action « afficher les zones sur la carte » ramène le conducteur au trajet actif et **efface volontairement les photos de stationnement** — le véhicule va bouger, donc les photos seraient incorrectes. Le conducteur déplace le véhicule dans une zone autorisée et les reprend.

Les zones où le stationnement est autorisé sont entièrement configurables par vous — voir [Zones](../../settings/infrastructure/zones.md).

Les refus de distance à la fin ouvrent la même boîte de dialogue « trop loin » qu'au début, avec une nouvelle tentative qui revalide les photos et essaie de terminer à nouveau. Un échec de fin laisse aussi une ligne de nouvelle tentative sur la carte du trajet actif.

## Détail des coûts

Cinq lignes composent le prix total. Utilisez ces noms lorsque vous expliquez une charge :

| Ligne            | Ce que c'est                         | Champ du tarif              |
| ---------------- | ----------------------------------- | --------------------------- |
| **Frais de déverrouillage** | Facturé une fois, pour ouvrir le véhicule | **Prix de départ du trajet** |
| **Réservation**  | La partie payée d'une mise en attente | **Prix de réservation payé** par minute, après le **Temps de réservation** gratuit |
| **Temps actif**  | Temps de conduite                    | Prix par minute             |
| **Distance**     | Distance parcourue                  | **Prix par km**             |
| **Temps de pause** | Temps en pause                     | **Prix de pause** par minute |


Si le tarif ne peut pas être chargé, le détail du trajet affiche seulement le total — pas de détail, et pas d'erreur. Le total reste correct.

Un enregistrement de trajet terminé contient : statut, prix, distance (affichée en km), durée (affichée en minutes), étiquette et type de véhicule, tarif, segments de conduite active et de pause, période de réservation, adresses de départ et d'arrivée, horodatages et évaluation. Pour les trajets terminés, l'itinéraire est tracé sur une carte. Les conducteurs voient tout cela dans [History](../money/history.md) ; votre équipe voit l'équivalent côté opérateur dans [Ride Detail](../../operations/trips/ride-detail.md).

## Dépannage

| Le conducteur dit…                             | Ce que c'est généralement                                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| « Je ne peux pas démarrer ou réserver »        | Parcourez les huit étapes dans [Why a rider cannot start a ride](#pourquoi-un-conducteur-ne-peut-pas-démarrer-un-trajet) dans l'ordre                |
| « Il n'y a pas de bouton Scan »                 | Pas de carte liée sur un fournisseur qui supporte les cartes enregistrées                                                     |
| « Il indique solde insuffisant et un montant » | C'est le solde minimum de départ du tarif. Rechargez — ou liez une carte, ce qui supprime complètement cette restriction      |
| « Le véhicule ne se déverrouille pas » (mais l'app a accepté le départ) | Côté véhicule : vérifiez son état et sa connectivité dans [Vehicle Detail](../../operations/fleet/vehicle-detail.md) |
| « Je ne peux pas terminer le trajet »           | Généralement hors d'une zone de stationnement autorisée, ou refus trop loin / véhicule hors ligne. Chacun a sa propre boîte de dialogue |
| « Je ne peux pas reprendre mon trajet en pause » | Un selfie de reprise non confirmé, ou un porte-monnaie vide                                                                    |
| « Mes photos de stationnement ont disparu »    | Normal après avoir utilisé « afficher les zones sur la carte » — elles sont effacées pour que le conducteur les reprenne au bon endroit |
| « Le trajet s'est terminé mais il n'y a pas de preuve photo » | Le trajet se ferme avant le téléversement, donc un échec de téléversement laisse un trajet fermé sans preuve. La facturation n'est pas affectée |
| « J'ai été surfacturé »                          | Ouvrez le trajet dans History et lisez le détail ligne par ligne par rapport au tarif. Une longue pause ou une mise en attente payante non remarquée expliquent la plupart des cas |

## Conseils

- **Les cinq lignes de répartition constituent tout votre vocabulaire pour les litiges de facturation.** Nommez la ligne, puis nommez le champ tarifaire correspondant.
- **Les réservations payées sont la surprise discrète.** Un utilisateur qui a réservé puis marché lentement paie pour cela ; la ligne de réservation l'indiquera.
- **Les selfies de reprise ne peuvent pas être sautés** — si un utilisateur est bloqué sur un trajet en pause, demandez si un écran selfie est apparu.
- **Les détections anti-rebond ressemblent à des bugs.** La pause / reprise ignore les tapotements pendant environ 8 secondes ; apprenez aux utilisateurs à attendre plutôt qu'à tapoter plusieurs fois.
- **Un trajet fermé sans preuve n'est pas un problème de facturation**, et le re-téléversement n'est pas possible. Notez-le sur le trajet si vous avez besoin d'un enregistrement.
