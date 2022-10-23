//FIREBASE SET-UP
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from 'firebase/firestore'
console.log(process.env.REACT_APP_API_KEY)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// init firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)