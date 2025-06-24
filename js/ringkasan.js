document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
    
    // Event listener untuk tombol simpan
    document.getElementById('save-btn').addEventListener('click', saveOrder);
    
    // Event listener untuk tombol kembali
    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'formulir.html';
    });
});

function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const selectedCars = JSON.parse(localStorage.getItem('selectedCars')) || [];
    const customerName = localStorage.getItem('customerName');
    
    if (selectedCars.length === 0 || !customerName) {
        orderSummary.innerHTML = '<p>Tidak ada data pesanan</p>';
        return;
    }
    
    let html = `
        <h3>Nama Pelanggan: ${customerName}</h3>
        <h4>Detail Pesanan:</h4>
    `;
    
    let total = 0;
    
    selectedCars.forEach(car => {
        html += `
            <div class="order-item">
                <p><strong>${car.name}</strong></p>
                <p>Tanggal Sewa: ${car.startDate}</p>
                <p>Durasi: ${car.duration} hari</p>
                <p>Harga: Rp ${car.price.toLocaleString('id-ID')} x ${car.duration} hari = Rp ${car.subtotal.toLocaleString('id-ID')}</p>
            </div>
        `;
        total += car.subtotal;
    });
    
    html += `<p class="total-price">Total: Rp ${total.toLocaleString('id-ID')}</p>`;
    
    orderSummary.innerHTML = html;
}

function saveOrder() {
    const selectedCars = JSON.parse(localStorage.getItem('selectedCars')) || [];
    const customerName = localStorage.getItem('customerName');
    
    if (selectedCars.length === 0 || !customerName) {
        alert('Tidak ada data pesanan yang valid');
        return;
    }
    
    const total = selectedCars.reduce((sum, car) => sum + car.subtotal, 0);
    
    const order = {
        id: Date.now(),
        customerName,
        items: selectedCars,
        total,
        timestamp: new Date().toLocaleString()
    };
    
    // Simpan ke localStorage
    let orders = JSON.parse(localStorage.getItem('carRentalOrders')) || [];
    orders.push(order);
    localStorage.setItem('carRentalOrders', JSON.stringify(orders));
    
    alert('Pemesanan berhasil disimpan!');
    window.location.href = 'riwayat.html';
}