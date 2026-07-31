# Votre application : Éditeur et soumission

Les deux dernières étapes de l'[assistant Your App en marque blanche](your-app.md) (`/settings/your-app`) : choisir **les comptes développeurs qui publient l'application**, fournir les identifiants du store si ce sont les vôtres, et soumettre pour le provisioning.

## Choix de l'éditeur

Une sélection radio avec deux options :

- **Ridewolf** (par défaut) — l'application est publiée via les comptes développeurs propres à Ridewolf. **Aucun identifiant de store n'est requis de votre part.**
- **Vos propres comptes** — l'application est publiée via vos propres comptes développeurs Apple et Google, ce qui nécessite les identifiants ci-dessous.

## Identifiants d'accès au store (comptes propres uniquement)

**Apple — tout est requis :**

- Apple ID
- Team ID
- App Store Connect API **Key ID** et **Issuer ID**
- Clé API privée App Store Connect (le contenu du fichier `.p8`)
- Numéro D-U-N-S

**Google :**

- E-mail du compte de service
- JSON du compte de service
- E-mail Play Console

Ces identifiants sont sensibles — ils sont envoyés pour le provisioning et **ne sont pas conservés dans le brouillon local du navigateur**.

## Attestations manuelles

Deux cases à cocher que vous validez pour confirmer que l'accès a bien été accordé :

- **Accès App Store Connect accordé** — l'Apple ID a été ajouté à App Store Connect
- **Accès Play Console accordé** — les permissions Play Console ont été définies

Ces attestations sont **auto-déclarées et non vérifiées automatiquement**. Les cocher sans avoir accordé les permissions réelles ne sera pas détecté ici — cela se manifestera plus tard par un échec du provisioning.

## Étape de révision

Un résumé en lecture seule de chaque étape précédente, avec des **badges de validation par règle** (par exemple _Ressources requises_ ou _Légal complet_) affichés en réussite ou échec, et des **liens d'édition en place** vers l'étape spécifique nécessitant une attention. Toutes les vérifications doivent réussir avant que le bouton **Soumettre** soit disponible.

## Soumission

La soumission lance la chaîne de provisioning et fait évoluer le statut de **brouillon → provisioning → en révision → production**, ou vers **rejeté**.

- Tant que le statut est `provisioning`, `in-review` ou `production`, la page est **en lecture seule** et les liens vers les stores (TestFlight, test interne Play, App Store, Play Store) apparaissent au fur et à mesure que la chaîne les remplit.
- Un statut **rejeté** rend l'assistant à nouveau modifiable pour que vous puissiez corriger et soumettre de nouveau.

## Questions fréquentes

- **Le bouton Soumettre est indisponible.** Un ou plusieurs badges de validation à l'étape de révision échouent encore — utilisez les liens d'édition pour accéder à l'étape concernée.
- **Les champs Apple/Google ne s'affichent pas.** Ils n'apparaissent que lorsque l'éditeur est défini sur vos propres comptes.
- **Je dois modifier quelque chose après la soumission.** Ce n'est pas possible tant que le statut est `provisioning`, `in-review` ou `production`. Si l'application est rejetée, l'assistant redevient modifiable — `draft` et `rejected` sont les deux états modifiables.
- **Le provisioning a échoué même si j'ai coché les attestations.** Ce sont des déclarations manuelles — vérifiez à nouveau que l'Apple ID a bien accès à App Store Connect et que le compte de service a bien les permissions Play Console.
