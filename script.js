// --------- KM & TIME AUTO CALC -----------
function calcKm() {
  const start = parseFloat(document.querySelector('.km-start').value) || 0;
  const end   = parseFloat(document.querySelector('.km-end').value) || 0;
  const total = end - start;
  document.querySelector('.km-total').value = total > 0 ? total : '';
}

function calcTime() {
  const s = document.querySelector('.time-start').value;
  const e = document.querySelector('.time-end').value;
  if (s && e) {
    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60; // overnight trip
    const hours = Math.floor(diff / 60);
    const mins  = diff % 60;
    document.querySelector('.time-total').value = `${hours}h ${mins}m`;
  } else {
    document.querySelector('.time-total').value = '';
  }
}

// --------- FARE GRAND TOTAL -----------
function calcGrandTotal() {
  let total = 0;
  document.querySelectorAll('.fare-input').forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) total += val;
  });
  document.getElementById('grand-total').value = total.toFixed(2);
}

// --------- INIT LISTENERS -----------
document.addEventListener('DOMContentLoaded', () => {
  // Km & time rows
  ['.km-start', '.km-end'].forEach(sel =>
    document.querySelector(sel).addEventListener('input', calcKm)
  );
  ['.time-start', '.time-end'].forEach(sel =>
    document.querySelector(sel).addEventListener('input', calcTime)
  );

  // Fare table
  document.querySelectorAll('.fare-input').forEach(input =>
    input.addEventListener('input', calcGrandTotal)
  );

  // optional: recalc once on load
  calcGrandTotal();
});

// --------- SAVE & SHARE BUTTON -----------
async function saveAndShare() {
  // use html2canvas & jsPDF if you already added them, or implement
  // your existing pdf logic here
  const bill = document.querySelector('.bill-container');
  const canvas = await html2canvas(bill, {scale: 2});
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jspdf.jsPDF('p','pt','a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('K_Leena_Bill.pdf');
      }
      
