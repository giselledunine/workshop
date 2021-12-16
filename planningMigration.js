//! But du script : Importer les premieres données dans la base plannings (planning de chaque type de classes)

//Import de tous les éléments nécessaire
var cron = require('node-cron');
const { doc, setDoc } = require("firebase/firestore"); 
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const fs = require("fs");

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

setDoc(doc(db, "planning", "CPD-B3"), {
    weeks: [
        ...planning1
    ]
})
.then((res)=> {
    console.log('--- Planning 1 ajouté avec succé 🟢 ---')
}).catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "DA-UX"), {
    weeks: [
        ...planning2
    ]
})
.then((res)=> {
    console.log('--- Planning 2 ajouté avec succé 🟢 ---')
}).catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "DAA-DAB-SMW-VABC"), {
    weeks: [
        ...planning3
    ]
})
.then((res)=> {
    console.log('--- Planning 3 ajouté avec succé 🟢 ---')
})
.catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "DAA-DAB-SMW-VDE"), {
    weeks: [
        ...planning4
    ]
})
.then((res)=> {
    console.log('--- Planning 4 ajouté avec succé 🟢 ---')
})
.catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "MDBCV-MDDM"), {
    weeks: [
        ...planning5
    ]
})  
.then((res)=> {
    console.log('--- Planning 5 ajouté avec succé 🟢 ---')
})
.catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "TD6-CPD"), {
    weeks: [
        ...planning6
    ]
})
.then((res)=> {
    console.log('--- Planning 6 ajouté avec succé 🟢 ---')
})
.catch((err) => {
    console.log(err)
});

setDoc(doc(db, "planning", "TL"), {
    weeks: [
        ...planning7
    ]
})  
.then((res)=> {
    console.log('--- Planning 7 ajouté avec succé 🟢 ---')
}).catch((err) => {
    console.log(err)
});