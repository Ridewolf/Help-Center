# Sessions — Appareils connectés au compte

L'écran **Sessions** (`/settings/sessions`) liste tous les endroits où le compte d'un utilisateur est actuellement connecté, et permet de déconnecter ces sessions. C'est l'écran à consulter chaque fois qu'un utilisateur soupçonne qu'une autre personne a accès à son compte.

Deux points d'entrée, tous deux menant ici :

- **Profil → Gérer les sessions**
- **Paramètres → Carte Confidentialité → Gérer les sessions**

## Organisation de la liste

Les sessions sont **groupées par appareil** — navigateur et version, système d'exploitation et version, type d'appareil, fabricant et modèle — ainsi, un même téléphone apparaît une seule fois au lieu d'une douzaine.

Les groupes sont triés délibérément :

1. L'appareil actuel de l'utilisateur en premier
2. Puis par statut : **actif**, puis **inactif**, puis **ancien**
3. Puis par dernière activité, la plus récente en premier

Chaque groupe est réductible. L'ouvrir révèle chaque session individuelle appartenant à cet appareil.

## Lecture d'un groupe d'appareils

| Ce que vous voyez                   | Signification                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Étiquette de l'appareil**       | Fabricant et modèle si connus, sinon le système d'exploitation et sa version                              |
| Icône du type d'appareil           | Téléphone, tablette ou moniteur                                                                          |
| **Étiquette du navigateur**       | Le navigateur et sa version derrière la session                                                          |
| **Badge de statut de session**    | Voir le tableau ci-dessous                                                                               |
| **Dernière activité**             | Temps relatif — « à l'instant », il y a N minutes / heures / jours, et une date absolue au-delà d'une semaine |
| **Nombre de sessions**            | Combien de sessions cet appareil possède                                                                 |
| **Emplacement**                   | Ville, pays et adresse IP                                                                                 |
| **Créé le**                      | Date de début de cette session                                                                            |
| **Appareil actuel** / **Session actuelle** | Badge mis en évidence sur l'appareil et la session que l'utilisateur utilise actuellement           |

### Badges de statut

| Badge        | Signification                         |
| ------------ | ------------------------------------ |
| **actif**    | Dernière activité il y a moins d'une heure  |
| **inactif**  | Dernière activité il y a moins de 24 heures |
| **ancien**   | Dernière activité il y a 24 heures ou plus   |

Le badge mesure **uniquement la récence** — il n'indique pas si une session est encore valide. Un badge « ancien » ne signifie pas que la session a expiré.

## Déconnexion d'une session

La session actuelle ne dispose pas de contrôle de suppression — par conception, elle ne peut pas être retirée de cette liste. Toute autre session peut l'être :

1. Développer le groupe d'appareils
2. Appuyer sur l'icône **corbeille** de la session
3. Confirmer dans la boîte de dialogue

La liste se recharge et la session disparaît.

## Actions groupées

| Action                     | Fonction                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Déconnecter les autres sessions**  | Déconnecte toutes les sessions sauf celle de l'appareil que l'utilisateur utilise. C'est l'action appropriée lorsqu'un utilisateur soupçonne un accès non autorisé |
| **Déconnecter toutes les sessions**  | Déconnecte tout, **y compris l'appareil actuel**, ramenant l'utilisateur à l'écran de connexion pour se reconnecter. Cette action est présentée comme destructive pour cette raison |
| **Révoquer l'appareil**               | Proposé sur un groupe d'appareils développé qui n'est pas l'appareil actuel — déconnecte toutes les sessions sur cet appareil |

Pendant l'exécution d'une demande de déconnexion, les boutons sont désactivés. En cas d'échec, un court message d'erreur s'affiche ; en cas de succès, une confirmation apparaît et la liste se recharge.

## Scénarios typiques

- **L'utilisateur pense qu'une autre personne est connectée à son compte** — utiliser **Déconnecter les autres sessions**, puis changer le mot de passe depuis **Profil**. Notez qu'un changement de mot de passe réussi déconnecte aussi l'utilisateur, qui devra se reconnecter ensuite ([Profil](profile.md))
- **Une connexion oubliée sur un téléphone emprunté** — développer ce groupe d'appareils, puis **Révoquer l'appareil**
- **Repartir à zéro partout** — **Déconnecter toutes les sessions**, puis se reconnecter ([Connexion](registration-login.md))

## FAQ

- **Pourquoi l'utilisateur ne peut-il pas supprimer sa session actuelle ?** Aucun contrôle de suppression n'est affiché pour celle-ci. Pour terminer la session actuelle, utilisez **Déconnecter toutes les sessions** ou le bouton normal **Se déconnecter** dans Profil.
- **Que signifie réellement « actif » ?** Activité dans la dernière heure — rien de plus.
- **Pourquoi un téléphone affiche-t-il plusieurs sessions ?** Les sessions sont créées à chaque connexion. L'écran les regroupe sous un même appareil et affiche le nombre.
- **Le bouton Gérer les sessions est grisé.** Le compte est en cours de suppression, ce qui désactive la gestion des sessions ainsi que la modification du profil — voir [Profil](profile.md).

## Liens connexes

- [Profil](profile.md) — changement de mot de passe, déconnexion, suppression de compte
- [Paramètres](../help/settings.md) — la carte Confidentialité qui renvoie aussi ici
- [Confidentialité](privacy.md) — politique de confidentialité et consignes de sécurité
