# Trouver une trottinette — Localiser un véhicule via Bluetooth

**Find Scooter** (`/finder`) est conçu pour les 30 derniers mètres : le GPS indique que la trottinette est ici, mais elle n'est pas visible. Au lieu de coordonnées, le localisateur vous guide grâce à la puissance du signal Bluetooth — exactement ce dont vous avez besoin lorsque la précision du GPS est insuffisante.

L'écran s'appelle **Find Scooter** dans le [tiroir de navigation](../basics/overview.md#le-tiroir-de-navigation).

Le processus comporte quatre étapes : **choisir un véhicule → pré-vol → navigation → radar**.

## 1. Choisir un véhicule et pré-vol

1. Ouvrez **Find Scooter**. Le sélecteur liste vos véhicules triés par étiquette.
2. Touchez le véhicule que vous recherchez. Le pré-vol démarre immédiatement.

Le pré-vol récupère une copie fraîche de ce véhicule (jamais une version en cache) et vérifie qu'il a une dernière position utilisable et que son traceur est en ligne.

**Un traceur hors ligne ne vous bloque pas.** Vous recevez un indice : la dernière position connue peut être obsolète, mais le Bluetooth peut toujours localiser la trottinette une fois que vous êtes à proximité. C'est tout l'intérêt de cette fonctionnalité — considérez l'avertissement hors ligne comme une information, pas comme une impasse.

## 2. Démarrer la recherche et les autorisations

Touchez **Démarrer la recherche**. Cette seule action demande l'accès à la boussole puis lance simultanément le suivi de localisation, la boussole et le scan Bluetooth.

La demande d'accès à la boussole doit provenir d'une vraie pression — si vous refusez accidentellement une autorisation, revenez au sélecteur et recommencez avec une nouvelle pression plutôt que d'attendre sur l'écran.

Find Scooter nécessite les autorisations de localisation, de mouvement et de Bluetooth. Si rien ne se passe après **Démarrer la recherche**, l'une de ces trois a été refusée.

## 3. Étape de navigation

La carte affiche :

- Une ligne d'itinéraire de vous au véhicule
- Une étiquette de distance, en mètres ou kilomètres
- Une aiguille de boussole pointant vers le véhicule

Le Bluetooth scanne déjà en arrière-plan pendant cette étape, discrètement, pendant que vous marchez — vous n'avez rien à activer.

## 4. Étape radar

L'application passe automatiquement en mode radar dès que la trottinette est détectée une première fois en Bluetooth, et affiche une notification « Trottinette détectée ». Vous ne changez jamais d'étape manuellement.

Le radar affiche le signal Bluetooth sous forme d'un dégradé chaud-froid — **froid signifie loin, chaud signifie proche** — ainsi que le cap de la boussole et la distance.

**Interprétez le radar par le mouvement, pas par la valeur absolue.** Faites quelques pas et observez si le dégradé devient plus chaud ; s'il refroidit, faites demi-tour. Quand la lecture de la boussole est instable, l'écran vous invite à faire un huit pour la calibrer.

L'indicateur de signal devient froid après environ 4 secondes sans nouveau signal Bluetooth, ce qui est normal lorsque vous vous déplacez derrière des obstacles. Une fois la trottinette détectée une fois, le radar reste disponible pour toute la recherche.

## Bip

Le bouton **Bip** fait sonner le localisateur du véhicule. Il y a un délai de 10 secondes entre chaque bip, pendant lequel le bouton est désactivé et affiche un compte à rebours.

Cette limite est volontaire : touchez une fois, puis écoutez en continuant à avancer. Bip répété à l'arrêt ne vous apporte aucune information supplémentaire.

## Problèmes courants

| Symptôme                                   | Que faire                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| La trottinette n'est jamais détectée       | La portée Bluetooth est courte — marchez dans la zone au lieu de rester immobile. Le dernier point GPS connu peut être obsolète si le traceur est hors ligne |
| Le radar n'apparaît jamais                  | La trottinette n'a jamais été détectée en Bluetooth ; le passage au radar nécessite ce premier signal |
| Le radar devient soudainement froid         | La détection s'efface après quelques secondes sans signal — continuez à marcher, il se réactivera    |
| La boussole tourne ou pointe dans la mauvaise direction | Calibrez en faisant un huit, et éloignez-vous des barrières métalliques et des voitures garées      |
| Le bouton **Bip** est grisé                  | Le délai de 10 secondes est en cours                                                                |
| Rien ne démarre après **Démarrer la recherche** | Une autorisation de localisation, mouvement ou Bluetooth a été refusée — autorisez-la et recommencez depuis le sélecteur |

## Conseils

- **Utilisez d'abord le dernier trajet et la télémétrie du véhicule.** Ouvrez la [page du véhicule](../fleet/vehicle-controls.md) pour vérifier si le traceur envoie des données avant de passer vingt minutes sur le terrain.
- **Marchez en ligne droite, pas en cercle.** Deux ou trois segments droits de 10 mètres vous renseignent plus sur la direction qu'une rotation lente.
- **Combinez le bip et le radar** — le radar vous donne la direction, le bip confirme laquelle des trois trottinettes devant vous c'est.
- **Signalez ce que vous trouvez.** Si le véhicule n'est pas du tout là, changez son statut depuis la page du véhicule (par exemple **Nécessite une enquête** ou **Volé**) pendant que vous êtes encore sur place.
