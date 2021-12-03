import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAr6oMoJSMt3kjLDM6_5cNJWXeOfcKwMxE",
    authDomain: "whatsapp-mern-7e2e9.firebaseapp.com",
    projectId: "whatsapp-mern-7e2e9",
    storageBucket: "whatsapp-mern-7e2e9.appspot.com",
    messagingSenderId: "302037392607",
    appId: "1:302037392607:web:4cf1b3e97f49f314d01d6a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;