# Data Base Maintenant Directory 

Ce dossier contient plusieurs scripts qui ont permis dans un premier temps de créer la base de donné à partir de fichier CSV qui on été traduit en fichier JSON.

## Fichier d'import élève

#### `npm run students-initial-migration`

Commande qui permet de lancer le script, le fichier students.json est alors lu et importé dans la base de données firebase
La collection users possède plusieurs documents qui correspond au différents élèves classé par id
Chaque document possède les informations suivantes :
- id
- id_class
- address
- city
- postCode
- work_address
- work_city
- work_postcode
- cursus

Cette base servait initialement à calculer a l'aide de monthly update les conso en co2 de chaque élève et mettre les infos dans posts mais cette manipulation se fait via l'application React maintenant

## Fichier d'import planning

#### `npm run plannings-initial-migration`

Commande qui permet d'importer les plannings dans la base de données à partir des différents fichiers JSON planning.
La collection planning possède plusieurs documents qui correspond aux différents types de classe
Chaque document possède les informations suivantes :
- Tableau id Class
- Tableau avec toutes les semaines, chaque éléments du tableau possèdes les champs suivant : 
  - id_class 
  - monday
  - tuesday
  - wednesday
  - thursday
  - friday
  - workDay
  - schoolDay
  - week

<img src="/Users/sophiahmamouche/Desktop/workshop/images/planning(1).png" alt="planning1"/>
<img src="/Users/sophiahmamouche/Desktop/workshop/images/plannnig(2).png" alt="planning2"/>
<img src="/Users/sophiahmamouche/Desktop/workshop/images/planning(3).png" alt="planning3"/>

### A l'avenir les fichiers json des étudiants et des planings seront séparé dans deux dossier distinctes pour une meilleur organisation et pour qu'ils soient plus simple à remplacer

## Fichier de mise à jour de la base élève (run constament sur le serveur)

#### `npm run monthly-update`

Ce script permet de mettre à jour la base de données tous les mois à l'aide d'un cron
La collection posts possède plusieurs documents qui correspond aux différents types de classe
Chaque document possède les informations suivantes :
- id
- id_class
- address
- city
- postCode
- address_co2
- address_distance
- work_address
- work_city
- work_postcode
- cursus
- work_co2
- work_distance
  
<img src="/Users/sophiahmamouche/Desktop/workshop/images/posts(1).png" alt="planning1"/>
<img src="/Users/sophiahmamouche/Desktop/workshop/images/posts(2).png" alt="planning2"/>
<img src="/Users/sophiahmamouche/Desktop/workshop/images/posts(3).png" alt="planning3"/>

## Présence d'un fichier .env pour toutes les variables sensibles

Les variables sensibles tel que les clés API sont disponibles dans le .env accessible via  `process.env.[NOM-DE-LA-CLEF]`

## Mise en place du projet

Pour l'utilisation du projet, installation des dépendances suivantes :

`npm install axios` pour les requêtes api <br/>
`npm install firebase` pour récupérer les données sur la base <br/>
`npm install moment` pour obtenir les dates <br/>
`npm install node-cron` pour la mise à jour par mois des données

## Déploiement du script

Google Cloud : serveur distant sur lequel le script peur tourner en continu