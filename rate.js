let selectedRating = 0;

const stars = document.querySelectorAll("#stars span");
stars.forEach((star, i) => {
  star.addEventListener("mouseover", () => highlightStars(i + 1));
  star.addEventListener("mouseout", () => highlightStars(selectedRating));
  star.addEventListener("click", () => {
    selectedRating = i + 1;
    highlightStars(selectedRating);
  });
});

function highlightStars(r) {
  stars.forEach((s, i) => {
    s.classList.toggle("selected", i < r);
  });
}

function getEmailFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

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

  alert(`Rated ${email} with ${selectedRating} ★`);
  selectedRating = 0;
  highlightStars(0);
}

const emailParam = getEmailFromURL();
if (emailParam) {
  document.getElementById("userEmailDisplay").textContent = `Rating: ${emailParam}`;
} else {
  document.getElementById("userEmailDisplay").textContent = "Scan QR to rate";
}

// Start QR scanner
const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 200 });
scanner.render((decoded) => {
  window.location.href = decoded;
}, (err) => {
  console.warn("QR scan error", err);
});
