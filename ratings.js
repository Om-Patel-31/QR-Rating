const storedEmail = localStorage.getItem("currentUserEmail");
const name = localStorage.getItem("currentUserName");

if (!storedEmail) {
  alert("Please log in first.");
  window.location.href = "index.html";
} else {
  document.getElementById("emailLabel").textContent = `${name} (${storedEmail})`;

  // Generate QR code with link to rate page including user email as query param
  const qr = new QRious({
    element: document.getElementById("ratingQRCode"),
    size: 200,
    value: `${window.location.origin}/rate.html?user=${encodeURIComponent(storedEmail)}`
  });

  // Get stored ratings array or empty array if none
  const rawData = localStorage.getItem(`ratings_${storedEmail}`);
  let ratingData = rawData ? JSON.parse(rawData) : [];

  if (ratingData.length > 0) {
    // Calculate average rating rounded to 2 decimals
    const total = ratingData.reduce((sum, r) => sum + r.rating, 0);
    const average = (total / ratingData.length).toFixed(2);
    document.getElementById("avgRating").textContent = average;
  } else {
    document.getElementById("avgRating").textContent = "0.00";
  }

  // Show last 5 ratings in reverse chronological order
  const list = document.getElementById("recentRatingsList");
  ratingData.slice(-5).reverse().forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.rating} ★ — ${new Date(r.timestamp).toLocaleString()}`;
    list.appendChild(li);
  });
}