# Mon entreprise

La page **Mon entreprise** (`/settings/my-company`) est votre identité d'opérateur : les informations légales de la société qui gère la flotte, son image de marque, et la configuration que l'application Rider lit — la ville par défaut de la carte, les méthodes de connexion, les canaux d'assistance et les liens légaux.

La page est visible uniquement par les opérateurs disposant **à la fois** de la permission view-company et edit-company — sans droits de modification, elle est complètement masquée plutôt que présentée en lecture seule.

Comme le reste du tableau de bord, Mon entreprise s'adapte au mode d'interface dans lequel vous vous trouvez :

- **Mode facile** (étiqueté _Lite_ dans le sélecteur de mode d'interface) — un résumé en lecture seule des éléments essentiels plus un **assistant guidé en cinq étapes** pour les modifier.
- **Mode avancé** — quatre onglets : **Profil** (étiqueté _Entreprise_ dans la barre d'onglets), **Config App** (étiqueté _App_), **Paiements** et **Intégrations**.

Passer du mode facile au mode avancé demande une confirmation puis recharge la page ; le tableau de bord mémorise le mode choisi.

## Mode facile

Le mode facile affiche les essentiels en un coup d'œil — le logo, les coordonnées (e-mail, téléphone, site web, adresse) et les canaux d'assistance publics activés — plus un aperçu en lecture seule **Plus de détails** de tout le reste : données de l'entité légale, image de marque de l'app, fournisseurs de paiement et intégrations connectées, ainsi que les liens légaux.

Deux actions sont disponibles :

- **Modifier les détails** ouvre l'assistant guidé (ci-dessous).
- **Passer en mode avancé pour paiements & intégrations** — les clés des fournisseurs de paiement et les identifiants d'intégration se configurent uniquement en mode avancé ; ce bouton vous y conduit (confirmation → la page recharge).

### L'assistant en cinq étapes

**Modifier les détails** vous guide à travers les essentiels étape par étape et valide tout en une seule sauvegarde finale :

1. **Nom & logo** — le nom affiché de l'entreprise (obligatoire) et le logo.
2. **Coordonnées** — e-mail, téléphone, site web.
3. **Adresse** — pays, ville, adresse, code postal.
4. **Canaux d'assistance** — les canaux publics visibles par les utilisateurs dans l'app.
5. **Revue** — un résumé de chaque champ avec des raccourcis d'édition par ligne ; **Confirmer & enregistrer** valide l'ensemble d'un coup.

## Mode avancé

Quatre onglets. Un pied de page fixe avec **Abandonner** et **Enregistrer les modifications** apparaît en bas uniquement lorsqu'une modification a été effectuée — si vous ne voyez pas de bouton Enregistrer, rien n'a encore été modifié.

### Onglet Profil (_Entreprise_)

L'entité légale elle-même, répartie en cinq cartes :

- **Identité** — _Nom légal_ (obligatoire), _Libellé_ (un nom court d'affichage ; optionnel ici, bien que l'assistant du mode facile l'exige), _Numéro d'enregistrement_ (obligatoire) et _Identifiant fiscal_ (optionnel, avec une info-bulle expliquant que le format dépend de la juridiction).
- **Emplacement** — _Pays_, _Ville_, _Adresse_ et _Code postal_ (tous obligatoires).
- **Contact** — _E-mail_ (obligatoire), _Téléphone_ et _Site web_ (optionnels).
- **Connectivité traceur** — en lecture seule : le _Domaine_ et le _Port_ attribués à votre entreprise, la chaîne _Point de terminaison_ prête à l'emploi (un clic la sélectionne), et des instructions pas à pas pour configurer un traceur de véhicule. Les appareils eux-mêmes sont gérés sur la page [Traceur](../infrastructure/iot.md).
- **Contenu** — _Description_ (un court résumé) et _À propos_ (un texte plus long), tous deux en Markdown avec aperçu en direct.

**La devise ne se trouve pas dans cet onglet.** La devise de l'entreprise (et son symbole dérivé) se configurent dans le premier onglet **Paiements** — voir [Payments & Integrations](company-integrations.md).

### Onglet Config App (_App_)

Tout ce que l'application Rider lit, de haut en bas :

- **Identité de marque & couleurs** — le nom de l'app, le nom court, le logo et les couleurs du thème/accent (valeurs hexadécimales). Le logo est défini par une URL avec aperçu intégré ; le téléversement direct de fichier n'est pas encore disponible.
- **Vue par défaut de la carte** — cliquez sur la carte interactive pour définir la ville par défaut de l'app Rider ; la latitude, la longitude et le zoom sont enregistrés, et le clic est géocodé inversement en nom de ville.
- **Méthodes d'authentification** — bascules pour _OTP téléphone_, _OTP e-mail_, _E-mail & mot de passe_, _Google_, _Apple_, _Telegram_ et _WhatsApp_. Les méthodes sociales ne fonctionnent qu'après que la carte correspondante sur l'onglet **Intégrations** a été configurée et activée — voir [Payments & Integrations](company-integrations.md).
- **Étapes supplémentaires d'inscription** — étapes d'enregistrement additionnelles, chacune avec un ID, une position et un interrupteur _Requis_ ; **Ajouter une étape** ajoute une nouvelle ligne.
- **Communications** — la bascule _Chat en direct_, et le **bot OTP Telegram** : collez un jeton de bot, cliquez sur **Vérifier les chats** et choisissez le chat que le bot doit utiliser dans la liste déroulante. Ce paramètre est distinct de la carte Telegram dans l'onglet Intégrations — configurer l'un ne configure pas l'autre.
- **Canaux d'assistance** — _E-mail_, _Téléphone_, _Site web_, _Telegram_ et _WhatsApp_, chacun avec un interrupteur activé et une valeur ; seuls les canaux activés sont affichés aux utilisateurs.
- **Légal & conformité** — les URL des _Conditions d'utilisation_, _Politique de confidentialité_ et _Licences_ affichées dans l'app.

### Onglets Paiements & Intégrations

Les passerelles de paiement (devise, les cartes des fournisseurs maib / mia / Stripe, le fournisseur par défaut) et les intégrations de service (Telegram, WhatsApp, Google, Apple, OpenAI) ont leur propre article : **[Payments & Integrations](company-integrations.md)**. L'essentiel à retenir : ces cartes **s'enregistrent individuellement**, séparément du pied de page Enregistrer les modifications de cette page.

## Flux de travail

- **Corriger rapidement un numéro de téléphone ou une adresse** — Mode facile → **Modifier les détails** → passer à l'étape → **Vérifier** → **Confirmer et enregistrer**.
- **Mettre à jour l'adresse enregistrée (Avancé)** — Onglet Profil → Carte Emplacement → modifier les champs → **Enregistrer les modifications**.
- **Rebrander l'application Rider** — Onglet Configuration de l'application → Identité de la marque → mettre à jour le nom, les couleurs et l'URL du logo → **Enregistrer les modifications**.
- **Déplacer la ville par défaut de la carte** — Onglet Configuration de l'application → Vue par défaut de la carte → cliquer sur le nouvel emplacement → **Enregistrer les modifications**.
- **Permettre aux riders de se connecter avec Google** — configurer et activer d'abord la carte Google dans l'onglet Intégrations, puis activer _Google_ sous Méthodes d'authentification → **Enregistrer les modifications**.
- **Ajouter une étape d'inscription avec téléchargement obligatoire d'une pièce d'identité** — Onglet Configuration de l'application → Étapes supplémentaires d'inscription → **Ajouter une étape** → définir la pièce d'identité et la position, activer _Obligatoire_ → **Enregistrer les modifications**.
- **Pointer un traceur vers votre entreprise** — Onglet Profil → Connectivité du traceur → copier la chaîne _Endpoint_ dans la configuration de l'appareil.
- **Publier des documents légaux mis à jour** — Onglet Configuration de l'application → Légal & conformité → coller les nouvelles URL publiques → **Enregistrer les modifications**.

## Questions fréquentes

- **Je ne trouve pas du tout la page.** Elle nécessite à la fois la permission de voir et de modifier l'entreprise — demandez à votre administrateur.
- **Il n'y a pas de bouton Enregistrer en mode Avancé.** Le pied de page apparaît uniquement lorsqu'une modification a été effectuée.
- **Où est la devise ?** Dans l'onglet **Paiements**, pas dans l'onglet Profil — voir [Payments & Integrations](company-integrations.md).
- **Une méthode de connexion sociale ne fonctionne pas pour les riders.** Configurez et activez d'abord la carte d'intégration correspondante, puis activez la méthode d'authentification.
- **Le logo ne se téléverse pas.** Seule une URL peut être fournie aujourd'hui ; le téléversement direct de fichiers arrivera plus tard.
- **Cliquer sur la carte ne remplit pas le nom de la ville.** Les coordonnées et le zoom sont toujours enregistrés — le nom de la ville provient du géocodage inverse et peut parfois être indisponible.
- **Où sont les exigences pour les photos de trajet ?** Pas ici — les preuves de début/fin de trajet sont configurées par modèle de véhicule dans [Vehicle settings](../infrastructure/vehicle-settings.md).
