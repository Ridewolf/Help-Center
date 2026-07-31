# Rider App — Paramètres

Les **Paramètres** (`/settings`) regroupent toutes les préférences accessibles au rider : notifications, éléments affichés sur la carte, options de confidentialité, langue, thème et performances.

**Il n'y a pas de bouton Enregistrer.** L'écran affiche instantanément les paramètres en cache, les actualise en arrière-plan et applique chaque modification automatiquement peu après sa réalisation. Un rider qui modifie un paramètre puis ferme immédiatement l'écran a presque certainement enregistré sa modification — c'est la réponse à la question « ma modification a-t-elle été prise en compte ? ».

Plusieurs de ces bascules modifient ce que la [Carte](../riding/map.md) affiche, c'est donc le premier écran à consulter en cas de « la carte est lente » ou « je ne vois pas les niveaux de batterie ».

## Notifications

Cinq bascules indépendantes :

- **Notifications de trajet**
- **Notifications promotionnelles**
- **Mises à jour de l'application**
- **Notifications push**
- **Notifications par e-mail** — un seul interrupteur ; il n'y a pas de sous-options par type sous celui-ci

Dans la même zone :

| Contrôle           | Notes                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| **Son**            | Bascule                                                                      |
| **Volume du son**  | Curseur — apparaît uniquement lorsque **Son** est activé                      |
| **Vibration**      | Bascule                                                                      |
| **Paramètres radar** | Une carte qui apparaît uniquement dans les versions de l'application où les paramètres radar sont activés |

## Carte et affichage

Bascules :

- **Afficher le niveau de batterie**
- **Afficher les véhicules promotionnels**
- **Afficher les tarifs**
- **Zoom automatique**
- **Carte 3D** — prend effet immédiatement sur la carte
- **Animations réduites**

Plus **Mode données**, un sélecteur avec **équilibré**, **faible** et **élevé**. Il régule la qualité des tuiles de la carte et le niveau de détail affiché, et c'est **la première chose à essayer lorsqu'un rider signale une carte lente ou lourde** — baissez-le à _faible_ et activez aussi **Animations réduites**.

**Cartes hors ligne** n'est pas disponible actuellement dans l'application.

## Contrôles de confidentialité

- Bascule **Partage de géolocalisation**
- Bascule **Partage de données**
- **Politique de confidentialité** — ouvre l'URL externe que vous avez configurée dans [Mon entreprise](../../settings/administration/my-company.md) ; le lien apparaît uniquement lorsqu'une URL est définie
- **Gérer les sessions** — ouvre l'écran des appareils connectés (`/settings/sessions`), le même accessible depuis Profil

L'écran complet des directives de confidentialité et de sécurité est une route à part (`/privacy`). **La suppression de compte n'est pas ici** — le processus de suppression fonctionnel se trouve dans l'écran Profil.

## Région et apparence

| Contrôle       | Options                            | Notes                                                                                                     |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Langue**     | **en**, **ru**, **ro**             | S'applique immédiatement, sans rechargement. Seules ces trois langues sont proposées sur cet écran         |
| **Unités**     | —                                  | Un sélecteur d'unités n'est pas disponible actuellement dans l'application                                 |
| **Thème**      | Clair, Sombre, Système             | S'applique immédiatement                                                                                    |
| **Style de carte** | Auto, Clair, Sombre              | **Désactivé et forcé sur Auto lorsque le Thème est réglé sur Système.** Changez le Thème en Clair ou Sombre pour le débloquer |

Seules les trois langues d'application ci-dessus apparaissent ici, même si d'autres locales existent ailleurs dans le produit — voir [Localization](../../settings/administration/localization.md) pour la partie tableau de bord.

## Mode de conduite

**Le mode de conduite n'est pas disponible actuellement dans l'application.** Un rider qui demande où se trouve le contrôle du mode de conduite n'a pas perdu de permission — cette section n'est pas dans l'application, et il n'existe aucun paramètre dans le tableau de bord pour l'ajouter.

## FAQ

| Le rider demande…                      | Réponse                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| « Où est le bouton Enregistrer ? »    | Il n'y en a pas — les modifications s'enregistrent automatiquement                            |
| « Où est le mode de conduite ? »      | Pas disponible actuellement dans l'application                                               |
| « Pourquoi le style de carte est-il grisé ? » | Le **Thème** est réglé sur **Système**. Changez-le d'abord en Clair ou Sombre               |
| « Pourquoi ma langue n'est-elle pas listée ? » | Cet écran propose uniquement **en**, **ru** et **ro**                                      |
| « Où est le réglage des unités ? »    | Pas disponible actuellement dans l'application                                               |
| « Où est la bascule Cartes hors ligne ? » | Pas disponible actuellement dans l'application                                               |
| « Comment supprimer mon compte ? »    | Depuis l'écran Profil, pas depuis Paramètres                                                |
| « Comment voir mes appareils connectés ? » | **Gérer les sessions** — ici, ou via le même bouton dans Profil                             |
| « La carte est lente »                 | **Mode données → faible**, puis activez **Animations réduites**. Voir [Map](../riding/map.md#dépannage) |

## Conseils

- **Le mode Données est votre réglage de performance.** Avant d'accuser le téléphone d'un utilisateur ou vos tuiles, faites-leur essayer le mode _faible_.
- **« Ça n'a pas sauvegardé » est presque toujours faux.** Demandez-leur de rouvrir l'écran — la valeur sera là.
- **Les plaintes concernant la carte se trouvent souvent ici, pas sur la carte.** Les pourcentages de batterie manquants, les prix absents et les véhicules promotionnels manquants sont tous des options sur cet écran.
- **Le thème verrouille le style de la carte.** Mémorisez cette paire ; sinon, c'est un ticket hebdomadaire.
