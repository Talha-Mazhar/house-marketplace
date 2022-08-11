import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD13FogKujV8Jbv_52Pn_L3U50_iqFwwIo',
  authDomain: 'house-marketplace-app-12463.firebaseapp.com',
  projectId: 'house-marketplace-app-12463',
  storageBucket: 'house-marketplace-app-12463.appspot.com',
  messagingSenderId: '158497567201',
  appId: '1:158497567201:web:b6594940647998c072a2a0',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
