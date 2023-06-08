// import { useStore } from "vuex"
import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjmIbqpCYTxaYMNxCTID9ZSiLbKHe1nkQ",
  authDomain: "esp-iot-app-df933.firebaseapp.com",
  databaseURL: "https://esp-iot-app-df933-default-rtdb.firebaseio.com",
  projectId: "esp-iot-app-df933",
  storageBucket: "esp-iot-app-df933.appspot.com",
  messagingSenderId: "407506270625",
  appId: "1:407506270625:web:8be104c6d971524e4973e0"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// const firebase = () =>{
  
//   const store = useStore()
//   const casa = localStorage.getItem('hogar');
//   const db = getDatabase();
//   const starCountRef = ref(db, `${casa}/`);

//   const updateDataIot = () => {    
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//         store.commit('auth/updateIotData', data)
//     })
//   }

//   return{
//     updateDataIot
//   }
// }

// export default firebase;