document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#starRating .star");
  const selectedRatingInput = document.getElementById("selectedRating");
  let selectedValue = 0;

  function highlightStars(rating) {
    stars.forEach((star) => {
      const starVal = parseInt(star.dataset.value, 10);
      if (starVal <= rating) {
        star.classList.add("selected");
        star.classList.remove("hovered");
      } else {
        star.classList.remove("selected");
        star.classList.remove("hovered");
      }
    });
  }

  stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
      const val = parseInt(star.dataset.value, 10);
      stars.forEach((s) => {
        const starVal = parseInt(s.dataset.value, 10);
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
      selectedValue = parseInt(star.dataset.value, 10);
      selectedRatingInput.value = selectedValue;
      highlightStars(selectedValue);
    });
  });

  // Initialize with no stars highlighted
  highlightStars(0);
});

// Initialize QR code scanner
const scanner = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: 250 };

// Start scanning
scanner
  .start(
    { facingMode: "environment" }, // Use back camera if available
    config,
    (qrCodeMessage) => {
      try {
        // Assuming QR code contains a URL with ?user=EMAIL or just email
        let email = null;

        // Try to extract email from URL param
        if (qrCodeMessage.includes("?user=")) {
          const urlParams = new URLSearchParams(qrCodeMessage.split("?")[1]);
          email = urlParams.get("user");
        } else {
          // Maybe QR code is just the email string itself
          email = qrCodeMessage.trim();
        }

        if (isValidEmail(email)) {
          scannedEmail = email;
          scannedEmailDisplay.textContent = scannedEmail;
          userEmailDisplay.textContent = `Rate This User: ${scannedEmail}`;
        } else {
          alert(
            "Scanned QR code does not contain a valid '@ed.amdsb.ca' email."
          );
        }
      } catch (err) {
        console.error("Error processing QR code: ", err);
      }
    },
    (err) => {
      // QR scan error callback - can ignore or log
      // console.warn("QR scan error:", err);
    }
  )
  .catch((err) => {
    console.error("Unable to start QR scanner.", err);
  });
