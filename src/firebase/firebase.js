import * as firebase from "firebase";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
  const db = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


 


  export { firebase, googleAuthProvider, db as default };







 
























  

// db.ref("expenses").once("value")
//     .then((snapshot) => {
//         const expenses = [];
//         console.log(snapshot.val());

//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });
//         });

//         console.log(expenses);
// });


//prvni argument ve fci .on je event, ten rika, kdy se ma spustit callback ktery je jako druhy argument  - "value" je event ktery rika: spust callback kdykoli se zmeni jakakoli hodnota veci uvedenych v ref (tady expenses)
// db.ref("expenses").on("value", (snapshot) => {
//     const expenses = [];
    

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// });


// db.ref("expenses").on("child_removed", () => {
//     console.log(snapshot.key, snapshot.val());
// });

// db.ref("expenses").on("child_changed", (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });



//   db.ref("expenses").push({
//       description: "rent",
//       note: "This is note",
//       amount: 13500,
//       createdAt: 15485201
//   });

//   db.ref("expenses").push({
//     description: "gas bill",
//     note: "This is note",
//     amount: 400,
//     createdAt: 796874
// });

// db.ref("expenses").push({
//     description: "water bill",
//     note: "note",
//     amount: 270,
//     createdAt: 15446201
// });
  

//   db.ref("notes/-LDajxZQkRVuFJrKZDEj").update({
//       body: "buy food"
//   });

//   db.ref()
//     .once("value")
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log("Error fetching data", e);
//     });

 

 //ref() je jako tabulka v sql nebo kolekce v mongo, kdyz prazdny argument tak je to v root; set provede zapis argumentu do databaze (muze byt string, objekt, cokoli...)
 //set vymaze vse co tam bylo (pokud byl prazdny argument v ref) a da tam jen to co je v argumentu
 
//   db.ref().set({
//       name: "eso",
//       age: 37,
//       isSingle: false,
//       location: {
//           city: "Nydnol",
//           country: "Bulharsko"
//       }
//   }).then(() => {
//       console.log("data ulozena")
//   }).catch((chyba) => {
//       console.log(chyba)
//   });



 