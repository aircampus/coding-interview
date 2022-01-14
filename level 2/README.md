# Stolen Bike - Projet en ReactJS, MySQL et NodeJS


## Problématique
Les vélos volés sont un problème à Strasbourg depuis plusieurs années.
La police a donc décidé de me solliciter pour créer un logiciel qui va simplifier la résolution des affaires et signalements des vélos volés.


## Explication du code coté Front-End

Via une barre de navigation latérale, l'utilisateur peut acceder à deux onglets :

1 - L'onglet "Signaler un vol". L'utilisateur peut signaler un vol en rentrant divers informations qui sera ensuite transmis dans la base de données.
-> Si il y a un policier qui n'est pas sur une affaire et est donc disponible pour débuter une enquête, l'affaire lui sera automatiquement attribué et le statut du dossier sera "en cours de traitement".
-> Si aucun policier n'est disponible : le dossier sera crée et inséré dans la base de données mais le statut du dossier sera "en attente".

2 - L'onglet "Enquêtes". L'utilisateur peut acceder aux dossiers en selectionnant et cliquant les différents checkbox.
Il peut acceder aux dossiers en cours, en attente, et ceux qui sont résolues.
Pour séléctionner l'ensemble des dossiers, il faut cocher l'ensemble des checkbox.

Une affaire peut basculer de status de en cours -> résolues ou en attente -> résolues en cliquante sur l'emoticone "folder" qui se situe dans la liste des dossiers affichés.


## Explication du code coté Back-End

Il y a 3 routes coté serveur :

1 - Un chemin avec une méthode POST et un path /report qui va envoyer vers la BDD toutes les informations saisises par l'utilisateur via l'onglet "Signaler un vol".

2 - Un chemin avec une méthode GET et un path /report/inProgress pour récupérer la liste des affaires en cours de traitement par un policier.

3 - Un chemin avec une méthode GET et un path /report/resolved pour récupérer la liste des affaires traitées et terminées.

4 - Un chemin avec une méthode GET et un path /report/waiting pour récupérer la liste des signalements en attente de traitement par un policier.

5 - Un chemin avec une méthode PUT /report/:id pour modifier le statut d'une enquête et qui rendra un policier disponible pour prendre une nouvelle enquête parmi la liste des dossiers de signalement qui sont en attente de traitement
