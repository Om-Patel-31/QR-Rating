const storedEmail = localStorage.getItem("currentUserEmail");
const name = localStorage.getItem("currentUserName");

if (!storedEmail) {
  alert("Please log in first.");
  window.location.href = "index.html";
}

document.getElementById("emailLabel").textContent = `${name} (${storedEmail})`;

const qr = new QRious({
  element: document.getElementById("ratingQRCode"),
  size: 200,
  value: `${window.location.origin}/rate.html?user=${storedEmail}`
});

const rawData = localStorage.getItem(`ratings_${storedEmail}`);
let ratingData = rawData ? JSON.parse(rawData) : [];

if (ratingData.length > 0) {
  const total = ratingData.reduce((sum, r) => sum + r.rating, 0);
  const average = (total / ratingData.length).toFixed(2);
  document.getElementById("avgRating").textContent = average;
}

const list = document.getElementById("recentRatingsList");
ratingData.slice(-5).reverse().forEach(r => {
  const li = document.createElement("li");
  li.textContent = `${r.rating} ★ — ${new Date(r.timestamp).toLocaleString()}`;
  list.appendChild(li);
});
