# Votre application (marque blanche)

La page Votre application (`/settings/your-app`) est un **assistant qui collecte tout ce qui est nécessaire pour créer et publier une application rider personnalisée sous votre propre identité** — nom de l'application, domaine, éléments de marque, texte de la fiche en boutique, captures d'écran et liens légaux. Un aperçu en direct sur appareil à côté du formulaire montre vos choix sur des écrans simulés d'iPhone et Android au fur et à mesure de la saisie.

Vous la trouverez dans la barre latérale sous **Paramètres → Votre application**.

L'assistant comporte huit étapes : **Identité → Domaine → Éléments → Fiche → Captures → Légal → Éditeur → Revue**. Cet article couvre les six premières ; Éditeur et Revue sont traités dans [Your App: Publisher & Submission](your-app-publisher.md).

## Cycle de vie du statut

Une carte de statut en haut indique où en est votre application, avec version et horodatages :

**brouillon → approvisionnement → en révision → production**, ou **rejeté**.

- L'assistant est **modifiable** tant que le statut est `draft` ou `rejected` — un rejet rouvre le formulaire pour que vous puissiez corriger ce que la boutique a refusé.
- Il est **en lecture seule** lorsque le pipeline contrôle l'application : `provisioning`, `in-review` et `production`. Dans ces états, la page est un résumé, et les liens vers les boutiques — **TestFlight, Play internal testing, App Store, Play Store** — apparaissent au fur et à mesure de leur disponibilité.

## Étape Identité

- **Nom de l'application** (obligatoire) — il **dérive automatiquement l'identifiant de bundle iOS, l'identifiant de bundle Android et le sous-domaine**, choisissez-le donc avec soin.
- **Surcharge du bundle** — un interrupteur qui permet la saisie manuelle des identifiants de bundle iOS et Android si ceux dérivés ne vous conviennent pas.
- **Couleur de l'icône** — une valeur hexadécimale utilisée pour la coque de l'icône de l'application et le fond de l'écran de démarrage.

## Étape Domaine

- **Type de domaine** — un choix radio entre **sous-domaine** (dérivé du nom de l'application) et **personnalisé**.
- **Domaine personnalisé** — un champ texte qui n'apparaît que lorsque le type est `custom`.

## Étape Éléments

- Interrupteur **Monochrome** — décide si un seul ensemble d'éléments graphiques sert pour les deux thèmes.
- **Symbole** et **logotype** — toujours obligatoires.
- **Symbole / logotype thème sombre** — affichés uniquement lorsque Monochrome est désactivé, c’est-à-dire lorsque vous fournissez des éléments graphiques distincts pour les thèmes clair et sombre.

La zone de dépôt accepte le glisser-déposer ou une URL collée. Le téléversement binaire direct n'est pas encore disponible — en pratique, fournissez chaque élément sous forme d'URL pour l'instant.

## Étape Fiche

Texte de la fiche en boutique, avec limites de caractères appliquées par les champs :

| Champ                 | Limite                                      |
| --------------------- | ------------------------------------------- |
| **Sous-titre**        | 30 caractères                               |
| **Description courte**| 80 caractères                               |
| **Texte promo**       | 170 caractères (texte promotionnel App Store) |
| **Mots-clés**         | 100 caractères, séparés par des virgules    |
| **Description complète** | 4000 caractères                           |

- **Catégorie** — voyage, navigation, sport, style de vie, santé & fitness, ou entreprise.
- **Langues de la boutique** — choisissez parmi l'ensemble des locales supportées. La **première langue sélectionnée est la base** ; chaque langue supplémentaire obtient son propre onglet avec des remplacements par langue pour le sous-titre, les descriptions, le texte promo et les mots-clés. Les champs laissés vides dans un remplacement retombent sur la traduction automatique depuis la langue de base.

## Étape Captures

Six variantes fixes de captures d'écran, chacune nécessitant un **titre** et un **sous-titre** : `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. L'aperçu en direct dans la colonne de droite les affiche avec vos éléments de marque, se mettant à jour au fur et à mesure de la saisie.

## Étape Légal

Politique de confidentialité, conditions d'utilisation, URL d'assistance, e-mail d'assistance, téléphone d'assistance et URL marketing. Ces champs sont **pré-remplis depuis le profil [My Company](my-company.md)** dès qu'une valeur y existe — compléter My Company en premier vous fait gagner du temps.

## Questions fréquentes

- **Les identifiants de bundle semblent incorrects.** Ils sont dérivés du nom de l'application — activez la surcharge du bundle pour les définir explicitement.
- **Les champs d'éléments pour la variante sombre manquent.** Ils n'apparaissent que lorsque Monochrome est désactivé.
- **Je ne peux plus rien modifier.** Le statut est `provisioning`, `in-review` ou `production` — le pipeline contrôle l'application à ce stade. La modification se rouvre automatiquement si la soumission est rejetée.
- **Le texte du sous-titre est tronqué.** La limite est de 30 caractères — plus courte que ce que vous pourriez attendre.
- **Le champ de domaine personnalisé n'est pas visible.** Réglez d'abord le type de domaine sur `custom`.
- **La page affiche un avis de « brouillon local ».** Vos modifications sont conservées uniquement dans ce navigateur et ne sont pas encore synchronisées — ne supposez pas qu'elles seront automatiquement sauvegardées ; revérifiez le formulaire une fois l'avis disparu.
