// Calculate Grand Total from user inputs
function calculateTotal() {
  const base = parseFloat(document.getElementById("basePrice").value) || 0;
  const extraKm = parseFloat(document.getElementById("extraKm").value) || 0;
  const extraTime = parseFloat(document.getElementById("extraTime").value) || 0;
  const toll = parseFloat(document.getElementById("toll").value) || 0;
  const parking = parseFloat(document.getElementById("parking").value) || 0;
  const battha = parseFloat(document.getElementById("driverBattha").value) || 0;
  const rounding = parseFloat(document.getElementById("roundingOff").value) || 0;

  const total = base + extraKm + extraTime + toll + parking + battha + rounding;
  document.getElementById("grand-total").innerText = total.toFixed(2);
}

// Hook every input
["basePrice","extraKm","extraTime","toll","parking","driverBattha","roundingOff"]
  .forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", calculateTotal);
  });

// Save & Share as PDF / trigger share
document.getElementById("saveShare").addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "Bill",
      text: "K. Leena Travels Bill",
      url: window.location.href
    }).catch(err => console.log("Share cancelled:", err));
  } else {
    window.print(); // fallback for browsers without Web Share API
  }
});
