document.addEventListener('DOMContentLoaded', function() {
    displayOrderHistory();
    
    // Event listener untuk tombol kembali
    document.getElementById('back-btn-3').addEventListener('click', function() {
        window.location.href = '../index.html';
    });
});

function displayOrderHistory() {
    const orderHistory = document.getElementById('order-history');
    const orders = JSON.parse(localStorage.getItem('carRentalOrders')) || [];
    
    if (orders.length === 0) {
        orderHistory.innerHTML = '<p>Belum ada riwayat pemesanan</p>';
        return;
    }
    
    let html = '';
    
    orders.forEach(order => {
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div style="margin-left: 15px; margin-bottom: 5px;">
                    <p>${item.name} - ${item.duration} hari (Rp ${item.subtotal.toLocaleString('id-ID')})</p>
                </div>
            `;
        });
        
        html += `
            <div class="order-history-item">
                <button class="delete-btn" data-id="${order.id}">Hapus</button>
                <p><strong>Pelanggan:</strong> ${order.customerName}</p>
                <p><strong>Waktu Pemesanan:</strong> ${order.timestamp}</p>
                <div>
                    <p><strong>Mobil yang disewa:</strong></p>
                    ${itemsHtml}
                </div>
                <p><strong>Total:</strong> Rp ${order.total.toLocaleString('id-ID')}</p>
            </div>
        `;
    });
    
    orderHistory.innerHTML = html;
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-id'));
            deleteOrder(orderId);
        });
    });
}

function deleteOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('carRentalOrders')) || [];
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('carRentalOrders', JSON.stringify(orders));
    displayOrderHistory();
}