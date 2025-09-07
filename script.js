// -------- Grand Total Calculation --------
function updateGrandTotal() {
  const inputs = document.querySelectorAll('.fare-input');
  let total = 0;

  inputs.forEach(inp => {
    total += parseFloat(inp.value) || 0;
  });

  document.getElementById('grand-total').value = total;
  document.getElementById('rupees-text').textContent = numberToWords(total) + " only";
}

function numberToWords(num) {
  if (num === 0) return "Zero Rupees";
  const a = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
             "Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const toWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n/10)] + (n%10 ? " " + a[n%10] : "");
    if (n < 1000) return a[Math.floor(n/100)] + " Hundred " + (n%100 ? toWords(n%100) : "");
    if (n < 100000) return toWords(Math.floor(n/1000)) + " Thousand " + (n%1000 ? toWords(n%1000) : "");
    return n; // fallback for very large
  };
  return toWords(num).trim() + " Rupees";
}

document.querySelectorAll('.fare-input').forEach(inp =>
  inp.addEventListener('input', updateGrandTotal)
);

// -------- Save & Share (Web Share API) --------
document.getElementById('save-share-btn').addEventListener('click', () => {
  const element = document.querySelector('.bill-container');
  const opt = {
    margin: 0.5,
    filename: `K-Leena-Bill-${new Date().toISOString().slice(0,10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  // Produce Blob instead of auto-save
  html2pdf().set(opt).from(element).outputPdf('blob').then((pdfBlob) => {
    const pdfFile = new File([pdfBlob], opt.filename, { type: 'application/pdf' });

    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      navigator.share({
        files: [pdfFile],
        title: 'K-Leena Bill',
        text: 'Please find attached the K-Leena Travels bill.'
      }).catch(err => console.log('Share cancelled or failed:', err));
    } else {
      html2pdf().set(opt).from(element).save(); // fallback download
    }
  });
});
      
