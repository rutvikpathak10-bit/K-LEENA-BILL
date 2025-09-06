document.getElementById('save-share-btn').addEventListener('click', () => {
    const element = document.querySelector('.bill-container');
    
    // PDF options
    const opt = {
        margin:       0.5,
        filename:     'K-Leena-Bill.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
});
