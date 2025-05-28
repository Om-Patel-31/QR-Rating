import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js";
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const rateeInput = document.getElementById("rateeInput");
const starButtonsContainer = document.getElementById("starButtons");
const submitBtn = document.getElementById("submitBtn");
const statsDisplay = document.getElementById("statsDisplay");
const ratingList = document.getElementById("ratingList");
const anonymousCheckbox = document.getElementById("anonymousCheckbox");

let selectedRating = 0;
let user = null;

// Auth
onAuthStateChanged(auth, (u) => {
  if (u) {
    user = u;
  } else {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
});

// Create star buttons
function createStarButtons() {
  starButtonsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.textContent = "★";
    btn.className = "star-button";
    btn.addEventListener("click", () => {
      selectedRating = i;
      updateStarButtonColors();
    });
    starButtonsContainer.appendChild(btn);
  }
}

function updateStarButtonColors() {
  const buttons = document.querySelectorAll("#starButtons button");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("selected", idx < selectedRating);
  });
}

createStarButtons();

// Submit rating
submitBtn.addEventListener("click", async () => {
  const ratee = rateeInput.value.trim().toLowerCase();
  if (!ratee.endsWith("@ed.amdsb.ca")) {
    alert("Enter a valid @ed.amdsb.ca email.");
    return;
  }
  if (!selectedRating || !user) return;

  const isAnonymous = anonymousCheckbox.checked;

  await addDoc(collection(db, "ratings"), {
    ratee,
    rating: selectedRating,
    rater: isAnonymous ? null : user.email,
    timestamp: serverTimestamp()
  });

  alert("Rating submitted!");
});

// Live sync ratings
rateeInput.addEventListener("input", () => {
  const ratee = rateeInput.value.trim().toLowerCase();
  if (!ratee.endsWith("@ed.amdsb.ca")) return;

  const q = collection(db, "ratings");
  onSnapshot(q, (snapshot) => {
    let sum = 0;
    let count = 0;
    const raters = new Set();

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.ratee === ratee) {
        sum += data.rating;
        count++;
        if (data.rater) raters.add(data.rater);
      }
    });

    if (count === 0) {
      statsDisplay.textContent = "No ratings yet.";
      ratingList.innerHTML = "";
    } else {
      const avg = (sum / count).toFixed(2);
      statsDisplay.textContent = `⭐ Average: ${avg} (${count} ratings)`;
      ratingList.innerHTML = `<strong>Rated by:</strong><br>${[...raters].join("<br>")}`;
    }
  });
});
