var cron = require('node-cron');
const { doc, setDoc } = require("firebase/firestore"); 
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const fs = require("fs");
const { get } = require('http');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const getData = fs.readFileSync('./csvjson.json', 'utf8' , (err, res) => {
  if (err) {
      console.error(err)
      return
  }
      return res;
  });
const students = JSON.parse(getData);

// Add a new document in collection "cities"
const pushDatas = async(user) => {
  await setDoc(doc(db, "users", user.id.toString()), {
    "season": user.season,
    "cursus": user.cursus,
    "address": user.address,
    "postCode": user.postCode,
    "city": user.city,
    "id_class": user.id_class.toString()
  }).then((res)=> {
    console.log('--- User ', user.id, 'ajouté avec succé 🟢 ---')
  }).catch((err) => {
    console.log(err)
  });
}

students.map((el) => {
  pushDatas(el);
})


  cron.schedule('* * * * *', () => {


    console.log('running a task every minute');
  });

// cron.schedule('* * * * * *', () => {
//   console.log('running a task every seconde');
// });