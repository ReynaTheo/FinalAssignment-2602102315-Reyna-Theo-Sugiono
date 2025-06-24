document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk tombol hitung total
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const customerName = document.getElementById('customer-name').value;
        if (!customerName) {
            alert('Silakan isi nama pelanggan');
            return;
        }
        
        const selectedCars = JSON.parse(localStorage.getItem('selectedCars')) || [];
        if (selectedCars.length === 0) {
            alert('Tidak ada mobil yang dipilih');
            return;
        }
        
        localStorage.setItem('customerName', customerName);
        window.location.href = 'ringkasan.html';
    });
    
    // Event listener untuk tombol kembali
    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});