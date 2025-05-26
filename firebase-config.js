// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDoystFxI7RJH6U5rCeW-vytfC5Pxq0osE",
  authDomain: "qr-rating.firebaseapp.com",
  projectId: "qr-rating",
  storageBucket: "qr-rating.appspot.com",
  messagingSenderId: "916383461440",
  appId: "1:916383461440:web:5e8d2d68eac8699f0d6fa5",
  measurementId: "G-6YM2GCNW2M"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);