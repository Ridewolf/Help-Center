# Automatisation de la maintenance

La page Automatisation de la maintenance (`/maintenance/automation`) est l'endroit où **les règles déclenchant automatiquement des travaux de maintenance** seront définies — « tous les 500 km, créer une tâche d'inspection », « lorsqu'un événement batterie se produit, commander des pièces ». Elle partage le **Panneau d'information Maintenance** avec les [Tâches de maintenance](tasks.md) et [Inventaire & Pièces](inventory.md).

Vous la trouverez dans la barre latérale sous **Maintenance → Automatisation**.

> **Attention : l'automatisation arrive bientôt.** Le bouton bascule **Activer les règles d'automatisation** est désactivé, avec une explication affichée directement dans l'interface, et les règles ne peuvent pas encore être créées. Les chiffres d'automatisation du Panneau d'information (règles actives, déclenchées aujourd'hui, taux de réussite) sont la partie active de la page.

## Comment une règle est structurée

Une règle associe **un déclencheur à une action** :

- **Type de déclencheur** — `mileage`, `time`, `event` ou `schedule`, plus ses paramètres
- **Type d'action** — `create_task`, `send_notification`, `order_parts` ou `schedule_service`, plus sa configuration
- **Nom**, **description**, **statut** (`active` / `inactive` / `paused`)
- **S'applique à** — quels véhicules ou groupes la règle couvre
- **Conditions** — critères supplémentaires que le déclencheur doit satisfaire
- Suivi d'exécution : **nombre d'exécutions**, **dernière exécution**, **historique d'exécution**

## Le flux de création prévu

La création de règle sera un assistant en trois étapes :

1. **Déclencheur** — nom, description, type de déclencheur et ses paramètres
2. **Action** — choisir le type d'action
3. **Revue** — la règle est affichée sous forme d'une phrase en langage clair, _« Quand {déclencheur}, {action} »_, pour vérification avant sauvegarde

## Questions fréquentes

- **Le bouton d'activation ne bougera pas — permissions ?** Non. Il est désactivé pour tous pendant la finalisation de la fonctionnalité ; l'interface l'indique clairement. C'est prévu.
- **Que mesure le compteur de taux de réussite ?** La part des exécutions de règles qui se sont terminées avec succès sur la période fixe de 30 jours du Panneau d'information.
- **Puis-je exprimer « batterie en dessous de 20 % ET plus vieille qu'un an » ?** Les règles comportent une liste de conditions dans le modèle, mais l'éditeur de conditions n'est pas encore disponible.

## Conseils

- **Pensez dès maintenant en paires déclencheur → action** — noter les règles souhaitées (« tous les 30 jours → planifier un service », « événement de panne IoT → créer une tâche ») facilitera grandement l'activation de l'automatisation dès sa mise en service.
- **Surveillez « déclenché aujourd'hui » une fois en production** — une règle qui se déclenche beaucoup plus souvent que prévu est mal configurée ; mettez-la en pause (statut `paused`) plutôt que de la supprimer.
