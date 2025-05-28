const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: 250 };

function onScanSuccess(decodedText, decodedResult) {
  // Stop scanning once a code is detected
  html5QrCode.stop().then(() => {
    console.log(`QR Code detected: ${decodedText}`);
    // You can add your logic here to display the email and enable rating
    document.getElementById('scanned-email').innerText = decodedText;
    // Enable rating inputs or buttons if needed
  }).catch(err => {
    console.error('Failed to stop QR scanner', err);
  });
}

function onScanFailure(error) {
  // No action needed for failed scans here
}

html5QrCode.start(
  { facingMode: "environment" },
  config,
  onScanSuccess,
  onScanFailure
).catch(err => {
  console.error('Unable to start scanning', err);
});
