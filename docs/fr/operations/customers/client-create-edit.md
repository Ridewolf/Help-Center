# Client — Créer & Modifier

Deux URL :

- **Créer** — `/clients/create` — enregistrer manuellement un nouveau client (rare ; la plupart des clients s'inscrivent eux-mêmes)
- **Modifier** — `/clients/:id/edit` — mettre à jour les informations personnelles et le statut d'un client existant

Les deux sont accessibles depuis la [liste des Clients](clients.md) (bouton `+ Créer` en haut à droite) ou depuis la [page de détail du Client](client-detail.md) (_Actions → Modifier le client_).

Autorisations :

- **Créer** — `Clients` (`e4f5h6`) + une sous-autorisation liée à la création
- **Modifier** — `Clients` (`e4f5h6`) + la sous-autorisation `edit`

## Quand utiliser

La plupart de vos clients **s'inscrivent eux-mêmes** via l'application mobile Rider — vous créerez rarement un client dans le tableau de bord.

La création manuelle est destinée à :

- **Comptes test** — QA interne, utilisateurs de démonstration
- **VIP / entreprises** — comptes devant exister avant que le client télécharge l'application
- **Intégration pilotée par l'opérateur** — événements / partenariats où le personnel inscrit le client en son nom

Pour tout le reste, laissez l'application gérer l'inscription et utilisez **Modifier** pour corriger les coordonnées ou changer le statut.

## Mise en page

Une seule carte avec un formulaire vertical, pas de barre latérale Guide des champs (différent du formulaire Véhicule).

## Champs — Créer

Sept champs au total. Tous obligatoires.

| Champ                | Validation                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Prénom**           | 1–100 caractères                                                                                                       |
| **Nom de famille**   | 1–100 caractères                                                                                                       |
| **E-mail**           | Format e-mail standard (`name@domain.tld`) ; doit être unique parmi les clients                                        |
| **Téléphone**        | Format international commençant par `+` (ex. `+373 60 123 456`) ; chiffres, espaces, tirets, parenthèses uniquement    |
| **Mot de passe**     | **Au moins 12 caractères**, doit contenir une **majuscule, une minuscule, un chiffre et un caractère spécial**          |
| **Confirmer mot de passe** | Doit correspondre exactement au mot de passe                                                                        |
| **Statut**           | Statut initial : `Actif` / `Inactif` / `Bloqué` / `Gelé` / `Inscription en cours` (par défaut _Actif_)                 |

La validation s'exécute à l'enregistrement et en ligne dès que vous quittez un champ. Les erreurs apparaissent en rouge sous le champ.

### Règles du mot de passe

L'exigence du mot de passe est le critère le plus strict. Le tableau de bord refuse tout mot de passe ne respectant pas les quatre règles :

- ≥ 12 caractères
- ≥ 1 lettre majuscule (A–Z)
- ≥ 1 lettre minuscule (a–z)
- ≥ 1 chiffre (0–9)
- ≥ 1 caractère spécial (ex. `!@#$%^&*`)

Après enregistrement, le client utilisera ce mot de passe (plus le téléphone ou l'e-mail) pour se connecter à l'application mobile Rider. Communiquez-le au client via un canal vérifié — ne collez jamais de mots de passe dans des chats non chiffrés de bout en bout.

### Statut (à la création)

| Valeur          | Utilisation                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| **Actif**       | Par défaut — le client peut utiliser le service immédiatement                                 |
| **Inactif**     | Créé mais pas encore activé (vous passerez à Actif plus tard)                                |
| **Bloqué**      | Pré-bloqué (rare — généralement utilisé lors de la recréation d'un compte après une fraude)  |
| **Gelé**        | Compte suspendu                                                                             |
| **Inscription en cours** | Inscription toujours en cours (à utiliser uniquement lors d'une intégration avec un flux externe) |

## Champs — Modifier

La modification masque les champs de mot de passe (les mots de passe sont réinitialisés ailleurs) et ajoute **Étiquettes**.

| Champ           | Notes                                                                                  |
| --------------- | -------------------------------------------------------------------------------------- |
| **Prénom**      | Pré-rempli, même validation que pour Créer                                           |
| **Nom de famille** | Pré-rempli, même validation que pour Créer                                         |
| **E-mail**      | Pré-rempli ; le modifier peut empêcher la connexion du client jusqu'à nouvelle vérification |
| **Téléphone**   | Pré-rempli ; même avertissement que pour E-mail                                      |
| **Étiquettes**  | Sélection multiple ; labels appliqués par l'opérateur pour le regroupement et le filtrage |
| **Statut**      | Pré-rempli avec le statut actuel ; même énumération                                  |

## Enregistrer / Annuler

- **Annuler** (ou flèche retour) — abandonne les modifications non enregistrées et revient à la page précédente
- **Enregistrer** — valide le formulaire et crée / met à jour le client. Une notification confirme le succès ; les erreurs au niveau des champs sont surlignées en rouge

Si la validation échoue (champ manquant, règles du mot de passe, e-mail en double, format du téléphone), la page reste ouverte avec le champ en faute encadré.

## Créer vs Modifier — différences

| Aspect             | Créer                                                  | Modifier                                              |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Champs mot de passe | Présents et obligatoires                                | Cachés                                               |
| Étiquettes         | Non dans le formulaire (définies plus tard via Modifier ou la liste/détail) | Présentes                                            |
| Statut             | Vide → _Actif_ par défaut                               | Pré-rempli avec le statut actuel                     |
| E-mail / Téléphone | Vide                                                   | Pré-rempli — les modifier peut forcer une re-vérification |
| Après enregistrement | Redirection vers le détail du nouveau client           | Redirection vers le détail du client                 |
| Entrée journal d'activité | « Client créé par _nom de l'opérateur_ »               | « Client modifié par _nom de l'opérateur_ » avec diff des champs |

Les deux flux écrivent dans le [Journal des actions](client-detail.md#onglet-activité) du client.

## Flux de travail typiques

- **Créer un VIP** — `+ Créer` dans la liste → remplir nom, e-mail réel, téléphone réel, mot de passe fort, statut _Actif_ → enregistrer → notifier le rider avec les identifiants
- **Corriger une faute de frappe** — ligne de la liste → menu de la ligne → _Modifier_ → corriger le champ → enregistrer (le changement apparaît dans le Journal avec un diff)
- **Intégrer un lot d'entreprise** — automatiser la création via l'API (ce formulaire est pour les cas ponctuels) ; utiliser Modifier ensuite pour appliquer les étiquettes spécifiques à l'entreprise
- **Changer le téléphone après changement d'appareil** — Modifier → mettre à jour Téléphone → enregistrer → le client devra se re-vérifier à la prochaine connexion (selon les règles backend)

## Conseils

- **Le format du téléphone est important** — doit commencer par `+` et l'indicatif pays ; le format est appliqué et le validateur refusera une saisie mal formée
- **Choisir un mot de passe fort** — pour les créations ponctuelles par l'opérateur, utilisez une phrase longue ("rideTheWolf2026!RW") qui satisfait toutes les règles à la fois ; enregistrez-la dans votre gestionnaire de mots de passe, pas dans le chat
- **Unicité de l'e-mail** — l'e-mail en double est la cause la plus fréquente d'échec de création ; vérifiez d'abord la liste en recherchant l'e-mail
- **Ne modifiez pas l'E-mail / Téléphone à la légère sur des clients existants** — les flux de vérification en dépendent ; coordonnez-vous avec le client avant d'enregistrer
- **Les étiquettes se gèrent ici, pas dans la ligne** — vous pouvez aussi ajouter/retirer des étiquettes via l'action groupée dans la liste, mais le formulaire de modification est l'endroit approprié pour des changements précis
- **Les changements de statut ont un poids d'audit** — passer de _Actif → Bloqué_ via ce formulaire est enregistré de la même façon que l'action dédiée _Actions → Bloquer client_ — les deux sont valides
