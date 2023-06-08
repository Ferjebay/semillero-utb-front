import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjmIbqpCYTxaYMNxCTID9ZSiLbKHe1nkQ",
  authDomain: "esp-iot-app-df933.firebaseapp.com",
  databaseURL: "https://esp-iot-app-df933-default-rtdb.firebaseio.com",
  projectId: "esp-iot-app-df933",
  storageBucket: "esp-iot-app-df933.appspot.com",
  messagingSenderId: "407506270625",
  appId: "1:407506270625:web:8be104c6d971524e4973e0"
};

initializeApp(firebaseConfig);

const casa = localStorage.getItem('hogar');
const db = getDatabase();
const starCountRef = ref(db, `${casa}/`);    
  
export default starCountRef;