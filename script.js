// -------------------- Grand Total Calculation --------------------
function updateGrandTotal() {
  const inputs = document.querySelectorAll('.fare-input');
  let total = 0;

  inputs.forEach(inp => {
    total += parseFloat(inp.value) || 0;
  });

  const totalField = document.getElementById('grand-total');
  const rupeesText = document.getElementById('rupees-text');

  totalField.value = total;
  rupeesText.textContent = numberToWords(total) + " only";
}

function numberToWords(num) {
  if (num === 0) return "Zero Rupees";

  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const toWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred " + (n % 100 ? toWords(n % 100) : "");
    if (n < 100000) return toWords(Math.floor(n / 1000)) + " Thousand " + (n % 1000 ? toWords(n % 1000) : "");
    return n.toString(); // fallback for larger numbers
  };

  return toWords(num).trim() + " Rupees";
}

// Add event listeners to all fare input fields
document.querySelectorAll('.fare-input').forEach(inp => {
  inp.addEventListener('input', updateGrandTotal);
});

// -------------------- Save & Share PDF --------------------
document.getElementById('save-share-btn').addEventListener('click', () => {
  const element = document.querySelector('.bill-container');

  const opt = {
    margin: 0.5,
    filename: `K-Leena-Bill-${new Date().toISOString().slice(0, 10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  // Generate PDF blob first (so we can try to share)
  html2pdf().set(opt).from(element).outputPdf('blob').then((pdfBlob) => {
    const pdfFile = new File([pdfBlob], opt.filename, { type: 'application/pdf' });

    // If Web Share API with files is supported (mobile)
    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      navigator.share({
        files: [pdfFile],
        title: 'K-Leena Bill',
        text: 'Please find attached the K-Leena Travels bill.'
      }).catch(err => console.log('Share cancelled or failed:', err));
    } else {
      // Fallback: auto-download PDF
      html2pdf().set(opt).from(element).save();
    }
  });
});
    
