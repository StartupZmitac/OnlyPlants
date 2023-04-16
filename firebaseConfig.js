// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg1cKjmhFvCNAXSI52A_0Nm1AQ4-XJeQI",
  authDomain: "onlyplants-8f1f0.firebaseapp.com",
  projectId: "onlyplants-8f1f0",
  storageBucket: "onlyplants-8f1f0.appspot.com",
  messagingSenderId: "351211898295",
  appId: "1:351211898295:web:6a1ea9357b1bb3959d1432",
  measurementId: "G-FXCWNRJCVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

const firePlants = doc(firestore, 'MyPlants/indoor_plants');

export const writeNewPlant = () => {
  console.log('writing to db')
    const docData = {
        name: 'kwiotek',
        watering : 1,
        poisonous : false,
        indoor : true
    };
    setDoc(firePlants, docData);
}
