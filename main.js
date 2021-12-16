//! But du script : Mise à jour de la base de données des élèves chaque mois (en fonciton des api mise à jour de la 
//! consommation de gaz carbonnique)

//Importer les dépendances nécessaires
const { doc, setDoc, updateDoc, getDocs, collection } = require("firebase/firestore"); 
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { default: axios } = require("axios");
const fs = require("fs");

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dataco2-8f888.firebaseapp.com",
  databaseURL: "https://dataco2-8f888-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dataco2-8f888",
  storageBucket: "dataco2-8f888.appspot.com",
  messagingSenderId: "228963406020",
  appId: "1:228963406020:web:ed8252a3f1463c6363b991",
  measurementId: "G-QXFP91DHHC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

const updateDataBase = async() => {

  //getDatas from Firestore
  const plannings = await getDocs(collection(db, "planning"));
  const getUsers = await getDocs(collection(db, "posts"));

  let users = []
  getUsers.forEach(user => users.push(user.data()))

  for (const user, index of users) {

    console.log(user.cursus);
    
    //Initialisation des données
    let address_coordinates = null;
    let work_coordinates = null;
    const school_coordinates = [2.368984,48.868514];
    let adresse_distance = null;
    let work_distance = null;
    let adress_co2 = null;
    let work_co2 = null;

    //Formater les adresse pour la requête
    let address = user.address.toString().replaceAll(' ', '+');
    let work = user.work_address?.toString().replaceAll(' ', '+') || null;

    //Récupérer ses coordonnées longitude latitude
    await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${user.postCode}`)
    .then((res)=>{
      console.log('coordonées', res.data.features[0].geometry.coordinates)
      address_coordinates = res.data.features[0].geometry.coordinates;
    })
    .catch((err)=>{
      console.log(err)
    })

    // Si l'élève possède une adresse d'alternance lancement de la requête
    if(work !== null) {
      await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${work}&postcode=${user.work_postCode}`)
      .then((res)=>{
        console.log('coordonnées', res.data.features[0].geometry.coordinates)
        work_coordinates = res.data.features[0].geometry.coordinates;
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    // Récupération de la distance entre domicile et école selon l'hypothèse qu'ils prennent tous les transiliens et 
    // RER pour l'instant
    // A l'avenir produit en crois entre le temps de trajet des différentes étapes du trajet calculé par citymaper et la 
    // vitesse de chaque type de transport utilisé
    if(address_coordinates !== null) {
      await axios.get(`https://api.external.citymapper.com/api/1/directions/transit?start=${address_coordinates[1]},${address_coordinates[0]}&end=${school_coordinates[1]},${school_coordinates[0]}`, {
      headers: {
        'Citymapper-Partner-Key': 'lhort6chJbLPF4jrdPxs5pHsDI22tmw6'
      }
    })
    .then((res) => {
      adresse_distance = (40*res.data.routes[0].duration_seconds) / 3600;
      console.log('distance du trajet domicile', adresse_distance);
    })
    .catch((err)=>{
      console.log(err)
    })
    }

    // Récupération de la distance entre travail si il possède une adresse travail et école selon l'hypothèse qu'ils 
    // prennent tous les transiliens et RER pour l'instant
    if(work_coordinates !== null ) {
      await axios.get(`https://api.external.citymapper.com/api/1/directions/transit?start=${work_coordinates[1]},${work_coordinates[0]}&end=${school_coordinates[1]},${school_coordinates[0]}`, {
        headers: {
          'Citymapper-Partner-Key': 'lhort6chJbLPF4jrdPxs5pHsDI22tmw6'
        }
      })
    .then((res) => {
      work_distance = (40*res.data.routes[0].duration_seconds) / 3600;
      console.log('distance du trajet travail', work_distance);
    })
    .catch((err)=>{
      console.log(err)
    })
    }

    // Api ADEME afin de récupérer la consommation de CO2 en fonction de la distance
    await axios.get(`https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${adresse_distance}`)
    .then((res) => {
      adress_co2 = res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e
      console.log('conso CO2 domicile: ', res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e)
    })
    .catch((err) => {
      console.log(err);
    })

    // Api ADEME afin de récupérer la consommation de CO2 en fonction de la distance si il possède une adresse travail 
    // (j'aurais pu mettre toutes ses requête dans la même condition mais je l'ai pas fait. Dans l'optique d'écrire un 
    // code plus lisible je le ferai)
    if(work_distance !== null) {
      await axios.get(`https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=${work_distance}`)
      .then((res) => {
        work_co2 = res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e;
        console.log('conso CO2 travail: ', res.data.find((el) => el.name === 'RER ou Transilien').emissions.gco2e)
      })
      .catch((err) => {
        console.error(err)
      })
    }

    // Initialisation de l'objec temporaire
    let temp = {
      adresse_distance: adresse_distance,
      work_distance: work_distance,
      work_co2: work_co2 || adress_co2,
      adress_co2: adress_co2 || work_co2
    }

    // Modification de l'utilisateur dans Firebase
    updateDoc(doc(db, "posts", user.id.toString()), temp)
    .then((res)=> {
      console.log('--- User numéro :', index, ' - id : ',user.id, 'modifié avec succé 🟢 ---')
    })
    .catch((err) => {
      console.log(err)
    });
  }
}

// Cron qui permet de mettre à jour la base de données des élèves tous les mois
cron.schedule('0 0 1 * *', async() => {
  updateDataBase();
});