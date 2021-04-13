import firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyCsRPkb8giQDzeaoH0r2I6fNf-ZRWKPk0o",
  authDomain: "whatsapp-a9736.firebaseapp.com",
  databaseURL: "https://whatsapp-a9736.firebaseio.com",
  projectId: "whatsapp-a9736",
  storageBucket: "whatsapp-a9736.appspot.com",
  messagingSenderId: "814909566244",
  appId: "1:814909566244:web:736447d2033ef604b197b1"
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();

const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth ,provider};
export default db;


