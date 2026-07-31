# Échange de batterie — Étape par étape

Un échange de batterie est une séquence en deux étapes : l'application déverrouille le véhicule et son compartiment à batterie, vous donne une fenêtre temporelle pour changer physiquement la batterie, puis verrouille tout à nouveau. **L'étape de fermeture se déclenche automatiquement** — c'est la partie que chaque opérateur doit connaître avant son premier échange.

Vous lancez un échange depuis la [page du véhicule](../fleet/vehicle-controls.md), dans l'onglet **Scooter**.

## Ce qui déclenche un échange

Il y a deux façons de procéder, et elles font exactement la même chose :

- Le bouton **Échange de batterie** dans l'onglet Scooter. Il porte une icône d'éclair et affiche le compte à rebours en direct sur son propre bouton.
- Mettre le statut du véhicule sur **En charge** depuis la fiche **Statut**. Ce chemin lance la même séquence dans la confirmation du changement de statut.

Dans les deux cas, une boîte de confirmation apparaît avant l'envoi de quoi que ce soit.

## Flux opérateur

1. Ouvrez le véhicule et restez dans l'onglet **Scooter**.
2. Appuyez sur **Échange de batterie** — ou mettez le statut sur **En charge**.
3. Confirmez dans la boîte de dialogue.
4. L'application envoie **Mode Échange de batterie Activé**. En cas de succès, vous recevez une notification « Mode Échange de batterie Activé », une vibration haptique, et le véhicule apparaît déverrouillé.
5. Un **compte à rebours de 12 secondes** démarre immédiatement et décompte une fois par seconde sur le bouton. Échangez la batterie pendant ce temps.
6. Quand le compte à rebours atteint zéro, l'application envoie automatiquement **Mode Échange de batterie Désactivé**. Vous n'avez rien à appuyer.
7. En cas de succès, vous ressentez une seconde vibration haptique — une double confirmation délibérée pour que vous puissiez entendre et sentir la fermeture sans regarder l'écran — vous voyez une notification « Mode Échange de batterie Désactivé », et le véhicule apparaît à nouveau verrouillé.

## Ce que fait chaque étape

| Étape                      | Ce qui se passe sur le véhicule                                                      |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Mode Échange de batterie Activé**   | Véhicule déverrouillé, limite de vitesse augmentée à 25 km/h, compartiment à batterie libéré        |
| **Attente**                   | 12 secondes — rien n'est envoyé, c'est votre fenêtre de travail                            |
| **Mode Échange de batterie Désactivé**  | Compartiment à batterie verrouillé, limite de vitesse rétablie à 6 km/h, véhicule verrouillé           |

Notez ce qui arrive à la limite de vitesse : elle est augmentée de 6 à 25 km/h pendant la durée de la fenêtre d'échange et rétablie à 6 quand la fenêtre se ferme. Elle n'est jamais supprimée — 25 km/h est le plafond de service pendant que le véhicule est déverrouillé, et 6 km/h est la valeur par défaut en stationnement.

## Ce que vous voyez et ressentez

- Notifications aux deux extrémités de la séquence : « Mode Échange de batterie Activé », puis « Mode Échange de batterie Désactivé »
- Deux vibrations haptiques, une par étape
- Un compte à rebours de 12 à 0 sur le bouton **Échange de batterie**
- Le badge de verrouillage dans la zone de télémétrie qui bascule de verrouillé à déverrouillé puis de nouveau verrouillé

## Quand une étape échoue

Si une des étapes échoue, vous recevez une notification d'erreur et une vibration haptique d'erreur. **Rien n'est retenté automatiquement.**

Le cas à prévoir est une étape de fermeture échouée : elle laisse le véhicule déverrouillé, avec une limite de 25 km/h et un compartiment à batterie ouvert. Ne vous éloignez pas du véhicule dans ce cas.

1. Envoyez **Mode Conduite** désactivé (verrouillage) depuis l'onglet Scooter, ou relancez l'échange.
2. Confirmez que le badge de verrouillage est vert avant de quitter le véhicule.

## Le statut En charge et les échanges sont la même action

Parce que mettre un véhicule sur **En charge** lance cette séquence, les deux ne sont pas indépendants. Changer le statut est un échange complet : attendez-vous à ce que le véhicule se déverrouille, attendez 12 secondes, puis se reverrouille. Si vous vouliez seulement changer l'étiquette du véhicule, préparez-vous à ce qu'il s'ouvre.

## Échanger plusieurs véhicules

Échangez un véhicule à la fois depuis sa propre page. Lancer un échange de batterie sur toute une file d'attente n'est pas disponible actuellement dans l'application — le [mode batch](batch-mode.md) est une liste de tâches que vous parcourez, pas un outil de commande en masse.

## Problèmes courants

| Symptôme                                  | Que faire                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Le compte à rebours semble bloqué                | Il décompte une fois par seconde. Si l'écran s'est mis en veille, vérifiez le badge de verrouillage pour savoir à quelle étape vous êtes |
| L'étape de fermeture ne s'est jamais déclenchée            | Cherchez une notification d'erreur. Rien ne la retente — relancez l'échange ou verrouillez le véhicule avec **Mode Conduite** désactivé |
| La limite de vitesse affiche toujours 25 km/h      | L'étape de fermeture n'a pas été complétée ; c'est cette étape qui rétablit 6 km/h                          |
| Le compartiment à batterie ne s'ouvre pas       | L'étape d'ouverture a échoué ou a affiché une erreur — le compartiment ne se libère que si cette étape réussit |

## Conseils

- **Ayez la batterie de remplacement en main avant d'appuyer.** Douze secondes suffisent pour échanger, pas pour aller la chercher.
- **Fiez-vous à la seconde vibration.** Deux pulsations signifient que la séquence s'est bien terminée ; une seule pulsation suivie de silence signifie qu'il faut vérifier l'écran.
- **Quittez toujours avec un badge de verrouillage vert** — c'est la vérification qui détecte tous les modes d'échec ci-dessus.
