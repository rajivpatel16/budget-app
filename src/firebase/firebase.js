import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBzBT8G3RX96Pq3U5AdNNetZotatG85X0M",
    authDomain: "budgetapp-4fcd4.firebaseapp.com",
    databaseURL: "https://budgetapp-4fcd4-default-rtdb.firebaseio.com",
    projectId: "budgetapp-4fcd4",
    storageBucket: "budgetapp-4fcd4.appspot.com",
    messagingSenderId: "717900688427",
    appId: "1:717900688427:web:f3fc7db9ea14dffab90e6e",
    measurementId: "G-HL3JW7CZMT"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default }
  
//   db.ref('expenses').on('child_removed', (snapshot) => {
//       console.log(snapshot.val, snapshot.key)
//   })

//   db.ref('expenses').on('child_changed', (snapshot)=> {
//     console.log(snapshot.val, snapshot.key)
//   })

//   db.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.val, snapshot.key)
//   })

//   db.ref('expenses').push({ description: 'Rent', amount: 6363, createdAt: 7773737373, note: '' })

//   db.ref('expenses').once('value').then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses)
//   })

//   db.ref('note/-MQRObxMVxf-T0WJN9FT').update({
//       body: 'Buy food'
//   })

//   db.ref('note').push({
//     title: 'React Native, Angular',
//     body: 'Course Topic'
// });

//   const notes = [{
//       id: 12,
//       title: 'First Total',
//       body: 'this is my first note'
//   },{
//     id: '122hjdshdj',
//     title: 'Another Note',
//     body: 'this is my first note'
// }]
// db.ref('note').set(notes);
// db.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// })

// setTimeout(() => {
// db.ref('name').set('Rajiv Patel')
// },1500);

//   db.ref().once('value').then((snapshot) => {
//       const val =  snapshot.val();
//     console.log(val)
//   }).catch((e) => {
//     console.log(e)
//   })

//   db.ref().set({
//       name: 'Rajiv Patel',
//       age: 30,
//       isSingle: false,
//       stressLevel: 6,
//       job: {
//         title: 'Software Developer',
//         company: 'Srijan'
//       },
//       location: {
//           city: 'delhi',
//           country: 'India'
//       }
//   }).then(() => {
//       console.log('Data is saved')
//   }).catch((error) => {
//     console.log(error)
//   })

//   db.ref().update({
//     stressLevel: 9,
//   'job/company': 'Amazone',
//   'location/city': 'Noida'
//   }).then(() => {
//       console.log('data updated')
//   }).catch((e) => {
//       console.log('here is error', e)
//   })

// database.ref('single').remove().then( ()=> {
//     console.log("Remove succeeded.")
// }).catch((error) => {
//     console.log("Remove failed: " + error.message)
// })