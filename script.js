function generateQR() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();

  if (!firstName || !lastName || !email.endsWith("@ed.amdsb.ca")) {
    alert("Please enter valid details with @ed.amdsb.ca email.");
    return;
  }

  localStorage.setItem("currentUserEmail", email);
  localStorage.setItem("currentUserName", `${firstName} ${lastName}`);

  const qr = new QRious({
    element: document.getElementById("qrcode"),
    size: 200,
    value: `${window.location.origin}/rate.html?user=${email}`
  });

  setTimeout(() => window.location.href = "index.html", 1500);
}

function logout() {
  localStorage.removeItem("currentUserEmail");
  localStorage.removeItem("currentUserName");
  window.location.reload();
}