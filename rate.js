const stars = document.querySelectorAll("#starRating .star");
const selectedRatingInput = document.getElementById("selectedRating");
let selectedValue = 0;

stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    const val = parseInt(star.dataset.value);
    stars.forEach((s) => {
      const starVal = parseInt(s.dataset.value);
      if (starVal <= val) {
        s.classList.add("hovered");
      } else {
        s.classList.remove("hovered");
      }
    });
  });

  star.addEventListener("mouseout", () => {
    stars.forEach((s) => s.classList.remove("hovered"));
    highlightStars(selectedValue);
  });

  star.addEventListener("click", () => {
    selectedValue = parseInt(star.dataset.value);
    selectedRatingInput.value = selectedValue;
    highlightStars(selectedValue);
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    const starVal = parseInt(star.dataset.value);
    if (starVal <= rating) {
      star.classList.add("selected");
      star.classList.remove("hovered");
    } else {
      star.classList.remove("selected");
      star.classList.remove("hovered");
    }
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

  if (selectedValue === 0) {
    alert("Please select a rating.");
    return;
  }

const key = `ratings_${email}`;
const data = JSON.parse(localStorage.getItem(key) || "[]");
data.push({ rating: selectedRating, timestamp: Date.now() });
localStorage.setItem(key, JSON.stringify(data));

  alert(`Rated ${email} with ${selectedValue} ★`);
  selectedValue = 0;
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
scanner.render(
  (decoded) => {
    window.location.href = decoded;
  },
  (err) => {
    console.warn("QR scan error", err);
  }
);