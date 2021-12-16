# Data Base Maintenant Directory 

Ce dossier contient plusieurs script qui ont permis dans un premier temps de créer la base de donné à partir de fichier CSV qui on été traduit en fichier JSON.

## Fichier d'import élève

#### `npm run students-initial-migration`

Commande qui permet de lancer le scipt, le fichier students.json est alors lu et importé dans la base de données firebase

## Fichier d'import planning

#### `npm run plannings-initial-migration`

Commande qui permet d'importer les planning dans la base de données à partir des différents fichier JSON planning.

### A l'avenir les fichiers json des étudiants et des planings seront séparé dans deux dossier distinctes pour une meilleur organisation et pour qu'ils soient plus simple à remplacer

## Fichier de mise à jour de la base élève (run constament sur le serveur)

#### `npm run monthly-update`

Ce script permet de mettre à jour la base de données tous les mois à l'aide d'un cron

## Présence d'un fichier .env pour toutes les variables sensibles