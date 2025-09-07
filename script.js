// ------- Auto KM calculation -------
function calcKm() {
  const start = parseFloat(document.querySelector('.km-start').value) || 0;
  const end = parseFloat(document.querySelector('.km-end').value) || 0;
  const total = end - start;
  document.querySelector('.km-total').value = total > 0 ? total : '';
}

// ------- Auto Time calculation -------
function calcTime() {
  const s = document.querySelector('.time-start').value;
  const e = document.querySelector('.time-end').value;
  const totalBox = document.querySelector('.time-total');
  if (s && e) {
    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60; // overnight
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    totalBox.value = `${hours}h ${mins}m`;
  } else {
    totalBox.value = '';
  }
}

// Attach listeners
['.km-start', '.km-end'].forEach(sel =>
  document.querySelector(sel).addEventListener('input', calcKm)
);
['.time-start', '.time-end'].forEach(sel =>
  document.querySelector(sel).addEventListener('input', calcTime)
);

// ------- Grand total -------
function calcGrandTotal() {
  let sum = 0;
  document.querySelectorAll('.fare-input').forEach(input => {
    sum += parseFloat(input.value) || 0;
  });
  document.getElementById('grand-total').value = sum.toFixed(2);
  document.getElementById('rupees-text').innerText = sum ? `${sum} only` : '';
}
document.querySelectorAll('.fare-input').forEach(inp =>
  inp.addEventListener('input', calcGrandTotal)
);

// ------- Save & Share -------
function savePDF() {
  const element = document.getElementById('bill');
  const opt = {
    margin: 0,
    filename: `Bill-${document.getElementById('bill-no').value || 'New'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).toPdf().get('pdf').then(pdf => {
    pdf.save();
  }).then(() => {
    if (navigator.share) {
      navigator.share({
        title: 'K-Leena Bill',
        text: 'Bill generated',
        url: window.location.href
      });
    } else {
      alert('PDF saved. Use your file manager or messaging app to share.');
    }
  });
                          }
    
