// rate.js

// === DOM Elements ===
const stars = document.querySelectorAll("#starRating .star");
const selectedRatingInput = document.getElementById("selectedRating");
const userEmailDisplay = document.getElementById("userEmailDisplay");

let selectedRating = 0;

// === Highlight Stars ===
function highlightStars(rating) {
  stars.forEach((star) => {
    const val = parseInt(star.dataset.value, 10);
    star.classList.toggle("selected", val <= rating);
  });
}

// === Star Event Listeners ===
stars.forEach((star) => {
  const value = parseInt(star.dataset.value, 10);

  star.addEventListener("mouseover", () => highlightStars(value));
  star.addEventListener("mouseout", () => highlightStars(selectedRating));
  star.addEventListener("click", () => {
    selectedRating = value;
    selectedRatingInput.value = selectedRating;
    highlightStars(selectedRating);
  });
});

// === Get Email From URL ===
function getEmailFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

// === Submit Rating ===
function submitRating() {
  const email = getEmailFromURL();

  if (!email || !email.endsWith("@ed.amdsb.ca")) {
    alert("Invalid user.");
    return;
  }

  if (selectedRating === 0) {
    alert("Please select a rating.");
    return;
  }

  const key = `ratings_${email}`;
  const data = JSON.parse(localStorage.getItem(key) || "[]");

  data.push({ rating: selectedRating, timestamp: Date.now() });
  localStorage.setItem(key, JSON.stringify(data));

  alert(`You rated ${email} with ${selectedRating} ★`);
  selectedRating = 0;
  highlightStars(0);
}

// === Display Email ===
const emailParam = getEmailFromURL();
userEmailDisplay.textContent = emailParam
  ? `Rating: ${emailParam}`
  : "Scan QR to rate";

// === QR Code Scanner ===
const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 200 });
scanner.render(
  (decodedText) => (window.location.href = decodedText),
  (error) => console.warn("QR scan error:", error)
);