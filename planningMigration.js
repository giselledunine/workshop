//! But du script : Importer les premieres données dans la base plannings (planning de chaque type de classes)

//Import de tous les éléments nécessaire
let cron = require('node-cron');
const { doc, updateDoc } = require("firebase/firestore");
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

initializeApp(firebaseConfig);
const db = getFirestore();

// Lectures de tous les fichiers JSON des plannings
const getPlanning1 = fs.readFileSync('./planningCPD-B3.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
        return res;
    });
const getPlanning2 = fs.readFileSync('./planningDA-UX.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const getPlanning3 = fs.readFileSync('./planningDAA-DAB-SMW-VABC.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const getPlanning4 = fs.readFileSync('./planningDAA-DAB-SMW-VDE.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const getPlanning5 = fs.readFileSync('./planningMDBCV-MDDM.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const getPlanning6 = fs.readFileSync('./planningTD6-CPD.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const getPlanning7 = fs.readFileSync('./planningTL.json', 'utf8' , (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    return res;
});
const planning1 = JSON.parse(getPlanning1);
const planning2 = JSON.parse(getPlanning2);
const planning3 = JSON.parse(getPlanning3);
const planning4 = JSON.parse(getPlanning4);
const planning5 = JSON.parse(getPlanning5);
const planning6 = JSON.parse(getPlanning6);
const planning7 = JSON.parse(getPlanning7);

// Importation inital de tous les plannings

const setPlanning = (plan, name) => {

    let weeks = plan.map((el) => {
        const days = Object.keys(el);
        let workDays = 0;
        let holidays = 0;

        for (const day of days) {
            if(el[day] === "NON"){
                workDays ++
            }
            if(el[day] === "Férié"){
                holidays ++
            }
        }
        return {
            workDays,
            schoolDays : 5 - workDays - holidays,
            ...el
        }
    })

    const temp = {
        weeks,
    }
    updateDoc( doc( db, "planning", name), temp)
    .then((res)=> {
        console.log('--- Planning ajouté avec succé 🟢 ---')
    }).catch((err) => {
        console.log(err)
    });
}

setPlanning(planning1, "CPD-B3");
setPlanning(planning2, "DA-UX");
setPlanning(planning3, "DAA-DAB-SMW-VABC");
setPlanning(planning4, "DAA-DAB-SMW-VDE");
setPlanning(planning5, "MDBCV-MDDM");
setPlanning(planning6, "TD6-CPD");
setPlanning(planning7, "TL");