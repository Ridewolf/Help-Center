# Profil — Détails du compte, mot de passe et suppression

L'écran **Profil** (`/profile`) est l'écran du compte du rider : ce que l'opérateur sait à son sujet, plus toutes les actions au niveau du compte — photo, nom, mot de passe, sessions, déconnexion et suppression.

C'est aussi ici que la suppression du compte a lieu réellement. Le bouton sur l'écran Confidentialité n'est pas celui à utiliser — voir [Privacy](privacy.md).

## Ce que l'écran affiche

| Champ              | Modifiable ? | Notes                                              |
| ------------------ | ------------ | -------------------------------------------------- |
| **Photo**          | Oui          | Avatar 96 × 96 avec une superposition d'appareil photo pour le changer |
| **Nom complet**    | Oui          | Affiché ici, modifié dans la feuille d'édition    |
| Badge de statut    | Non          | Lire l'étiquette telle qu'elle est affichée       |
| **E-mail**         | Non          | Affichage uniquement                               |
| **Téléphone**      | Non          | Affichage uniquement                               |
| **Statut du compte** | Non        | Affichage uniquement                               |
| **Membre depuis**  | Non          | Date de création du compte                          |

La date de naissance **n'est pas** affichée sur cet écran. Elle est collectée lors de l'intégration mais n'est ni affichée ni modifiable ici, donc ne pas envoyer un rider ici pour la modifier.

## Modifier le nom

1. Touchez l'icône **crayon**
2. La feuille d'édition s'ouvre avec **Prénom** et **Nom de famille** — et rien d'autre. Les deux sont obligatoires
3. Enregistrer

L'e-mail et le téléphone ne sont pas modifiables ici, et il n'y a pas de flux intégré pour changer l'un ou l'autre. Si un rider a besoin d'un e-mail ou téléphone différent, votre équipe doit le gérer depuis le tableau de bord — voir [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Un détail : un rider connecté avec Apple ou Google peut être invité à taper son vrai nom, car le nom retourné par ces services n'est pas toujours utilisable.

## Changer la photo

Toucher l'avatar ouvre la feuille photo avec trois sources :

- **Prendre une photo** — la caméra du téléphone
- **Choisir dans la galerie**
- **Choisir un fichier**

Limites : **JPEG, JPG, PNG ou WEBP, au maximum 10 Mo**. Il n'y a pas d'étape de recadrage — la photo est utilisée telle quelle, donc dites aux riders de bien cadrer avant de téléverser. Une fois le téléversement terminé, la nouvelle photo remplace l'ancienne partout dans l'application.

## Changer le mot de passe

La feuille **Changer le mot de passe** demande trois champs :

| Champ                | Règle                                   |
| -------------------- | --------------------------------------- |
| **Mot de passe actuel** | Obligatoire                           |
| **Nouveau mot de passe** | Doit respecter les règles de mot de passe affichées |
| **Confirmer le mot de passe** | Doit correspondre au nouveau mot de passe |

Prévenez le rider avant qu'il commence : **un changement de mot de passe réussi le déconnecte** et le ramène à l'écran de connexion avec un message de confirmation. C'est le comportement prévu, pas un bug — il doit simplement se reconnecter avec le nouveau mot de passe.

Un mot de passe actuel incorrect affiche une erreur en ligne sur ce champ. Toute autre erreur apparaît sous forme d'un message court en haut de l'écran.

## Gérer les sessions

**Gérer les sessions** ouvre `/settings/sessions`, la liste de tous les appareils connectés au compte. Voir [Sessions](sessions.md) pour la liste des appareils et les actions de déconnexion partout.

## Se déconnecter

Le bouton **Se déconnecter** termine la session sur cet appareil et ramène le rider au début de l'application. Cela n'affecte pas les autres appareils — utilisez [Sessions](sessions.md) pour ceux-là.

## Supprimer le compte — le flux en fonctionnement

1. **Supprimer le compte** n'apparaît que lorsqu'aucune suppression n'est déjà en attente
2. Le toucher ouvre une boîte de confirmation
3. À la confirmation, la suppression est programmée
4. Le bouton est remplacé par une boîte en attente : une icône d'horloge, **Programmé pour {date}**, et un bouton **Annuler** tant que l'annulation est encore possible

Pour annuler, le rider touche **Annuler**, confirme dans la boîte de dialogue, et le bouton normal **Supprimer le compte** revient.

Il n'y a pas d'exigence de solde dans ce flux — un rider avec de l'argent dans le portefeuille peut toujours programmer une suppression, donc rappelez-lui de dépenser ou récupérer un solde d'abord si cela importe. Voir [Wallet](../money/wallet.md).

## Pendant qu'une suppression est en attente

L'édition du profil, le changement de mot de passe, le téléversement de photo et la gestion des sessions sont **tous désactivés** tant qu'une suppression est programmée.

C'est la réponse chaque fois qu'un rider signale que les boutons de son écran Profil sont grisés : il a une suppression programmée. L'annuler restaure tout.

## FAQ

- **Pourquoi le rider ne peut-il pas modifier son e-mail ou téléphone ici ?** La feuille d'édition ne contient que le prénom et le nom ; les deux champs de contact sont en lecture seule et il n'y a pas de flux intégré pour les changer.
- **Pourquoi tous les boutons sont-ils désactivés ?** Une suppression de compte est en attente. Annulez-la.
- **Le rider a été déconnecté juste après avoir changé le mot de passe.** C'est normal — un changement de mot de passe réussi force une nouvelle connexion.
- **Que signifient les valeurs de statut ?** Lisez l'étiquette **Statut du compte** telle qu'elle est affichée ; ne la mappez pas à une liste fixe de valeurs.
- **Un rider demande comment demander la suppression du compte depuis l'écran Confidentialité.** L'écran Confidentialité n'a pas de bouton de suppression — il est uniquement informatif. Utilisez **Profil → Supprimer le compte** — voir [Privacy](privacy.md).

## Liens connexes

- [Sessions](sessions.md) — appareils connectés au compte
- [Paramètres](../help/settings.md) — notifications, langue, thème, affichage de la carte
- [Privacy](privacy.md) — politique de confidentialité et consignes de sécurité
- [Signing in](registration-login.md) — réinitialisation du mot de passe pour les riders qui n'en ont jamais défini
