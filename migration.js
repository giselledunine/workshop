//! But du script : Importer les premieres données dans la base users (qui représente les élève)

// Import de tous les éléments nécessaire

var cron = require('node-cron');
const { doc, setDoc } = require("firebase/firestore"); 
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const fs = require("fs");

// Configuration Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyC9SVhPvjzGEzzc4TLAYaAAbppWi_AcUQo",
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

// Lire le fichier JSON students.json
const getData = fs.readFileSync('./students.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const students = JSON.parse(getData);

// Importation des données de la base de données Firebase

const pushDatas = async(user, index) => {

    // Objet temporaire initialisé en fonction de différrentes conditions
    let temp = {}

    if(user.cursus==='students'){
        temp = {
        "id": user.id,
        "season": user.season,
        "cursus": user.cursus,
        "address": user.address,
        "postCode": user.postCode,
        "city": user.city,
        "id_class": user.id_class.toString()
    }
    }else{
        if(user.address === ""){
            if(user.work_address === "#N/A" || user.work_address === ""){
            console.log("pas d'adresse")
            return
            }else{
                temp = {
                    "id": user.id,
                    "season": user.season,
                    "cursus": user.cursus,
                    "address": user.work_address,
                    "postCode": user.work_postCode,
                    "city": user.work_city,
                    "work_address": user.work_address,
                    "work_postCode": user.work_postCode,
                    "work_city": user.work_city,
                    "id_class": user.id_class.toString()
                }
            }
        }else{
            if(user.work_address === "#N/A" || user.work_address === ""){
                temp = {
                    "id": user.id,
                    "season": user.season,
                    "cursus": user.cursus,
                    "address": user.address,
                    "postCode": user.postCode,
                    "city": user.city,
                    "work_address": user.address,
                    "work_postCode": user.postCode,
                    "work_city": user.city,
                    "id_class": user.id_class.toString()
                }
            }else {
                temp = {
                    "id": user.id,
                    "season": user.season,
                    "cursus": user.cursus,
                    "address": user.address,
                    "postCode": user.postCode,
                    "city": user.city,
                    "work_address": user.work_address,
                    "work_postCode": user.work_postCode,
                    "work_city": user.work_city,
                    "id_class": user.id_class.toString()
                }
            }
        }
    }

    // Envoie de l'object temporaire à la base de données Firebase
    await setDoc(doc(db, "users", user.id.toString()), temp)
    .then((res)=> {
        console.log('--- User id : ', index, ' - id : ', user.id, 'ajouté avec succé 🟢 ---')
    })
    .catch((err) => {
        console.log(err)
    });

    return true
}

// On parcours tous les élèves et on ajoute leurs informations à l'aide de la fonction d'au-dessus
Promise.all(students.map(async(el, idx) => {
    await pushDatas(el, idx);
}))
.then((res) => {
    console.log('Procesus terminé 🟦')
    process.exit();
})