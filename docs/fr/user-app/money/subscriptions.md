# Rider App — Abonnements et codes promo

**Les abonnements et les codes promo ne sont pas disponibles actuellement dans l'application.** Un utilisateur ne peut pas acheter de forfait, ne peut pas utiliser un code promo, et n'a rien à annuler.

Si vous souhaitez offrir une réduction à un utilisateur, organisez-la depuis le Tableau de bord — voir [Giving a rider a discount today](#offrir-une-réduction-à-un-utilisateur-aujourdhui).

## Ce que voit réellement un utilisateur

- Le tiroir latéral sur la [Carte](../riding/map.md#environnement-de-navigation) **n'a pas d'entrée Promotions ni d'entrée Abonnements**.
- Un lien `/subscriptions` n'ouvre pas d'écran. Un utilisateur qui le tape ou suit un lien vers celui-ci arrive sur l'écran **Introuvable** de l'application. C'est un comportement attendu, pas un problème avec son compte ou son appareil.
- L'ancien lien `/promo` redirige simplement vers le [Portefeuille](wallet.md).
- Il n'existe **aucun paramètre dans le tableau de bord** qui active les abonnements ou les codes promo pour votre entreprise.

Ne promettez pas à un utilisateur qu'un code fonctionnera « une fois que nous l'aurons activé », et ne citez pas de noms de forfaits ou de prix — aucun n'est en vigueur.

## Offrir une réduction à un utilisateur aujourd'hui

Trois mécanismes sont disponibles, tous côté opérateur :

| Mécanisme                 | Où                                                                          | Utile pour                                                   |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Niveaux de réduction tarifaire** | [Tarifs des véhicules](../../settings/infrastructure/vehicle-tariffs.md)           | Rendre les trajets plus longs progressivement moins chers pour tous |
| **Un tarif séparé plus des étiquettes** | [Tarifs des véhicules](../../settings/infrastructure/vehicle-tariffs.md) + [Étiquettes](../../settings/infrastructure/tags.md) | Tarification moins chère pour un groupe défini (entreprise, personnel, VIP) |
| **Crédit manuel de solde** | [Détail client](../../operations/customers/client-detail.md#actions) → **Recharger le solde** | Compensation ponctuelle après une plainte ou un trajet raté   |

Pour une compensation ponctuelle, le crédit manuel de solde est le plus rapide et laisse une entrée dans le journal d'activité du client. Pour toute récurrence, intégrez-la dans un tarif.

## FAQ

| Question                                        | Réponse                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| « Comment acheter un abonnement ? »                  | Pas disponible actuellement dans l'application                                                                 |
| « La page des abonnements affiche Introuvable »        | Correct et attendu                                                                                             |
| « Pouvons-nous activer les abonnements pour notre entreprise ? »  | Non — il n'existe aucun paramètre dans le tableau de bord pour cela                                             |
| « Mon code promo ne s'applique pas »                     | Les codes promo ne sont pas disponibles actuellement dans l'application                                        |
| « Scanner un QR code promo ne fait rien »         | Idem — pas disponible actuellement                                                                              |
| « Comment annuler mon forfait ? »                      | Il n'y a pas de forfait à annuler                                                                              |
| « Quelle tarification s'applique alors ? »              | Le tarif attaché au véhicule utilisé. Voir [Tarifs des véhicules](../../settings/infrastructure/vehicle-tariffs.md) et la [répartition du coût du trajet](../riding/rides.md#détail-des-coûts) |

## Conseils

- **Dites « pas disponible actuellement », puis dites ce que vous _pouvez_ faire.** Un utilisateur qui demande des codes promo cherche généralement une réduction ; un crédit manuel de solde répond à la vraie question.
- **Gardez la logique des réductions dans les tarifs.** Tout ce que vous y définissez s'applique de manière cohérente et s'affiche correctement dans la répartition du coût du trajet de l'utilisateur.
- **Surveillez les codes promo tiers.** Si des utilisateurs arrivent avec des codes issus d'une campagne, assurez-vous que le marketing sait que l'application ne peut pas les utiliser.
