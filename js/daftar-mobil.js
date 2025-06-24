// Data mobil
const cars = [
    { id: 1, name: "Toyota Avanza", price: 500000 },
    { id: 2, name: "Toyota Kijang Innova", price: 700000 },
    { id: 3, name: "Honda HRV", price: 600000 },
    { id: 4, name: "Daihatsu Sigra", price: 450000 }
];

document.addEventListener('DOMContentLoaded', function() {
    // Set tanggal minimal untuk input date
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('.start-date').forEach(input => {
        input.setAttribute('min', today);
    });

    // Event listener untuk tombol lanjut
    document.getElementById('next-btn').addEventListener('click', function() {
        const selectedCars = getSelectedCars();
        if (selectedCars.length === 0) {
            alert('Silakan pilih minimal 1 mobil');
            return;
        }
        localStorage.setItem('selectedCars', JSON.stringify(selectedCars));
        window.location.href = './html/formulir.html';
    });
});

function getSelectedCars() {
    const selectedCars = [];
    
    document.querySelectorAll('.car-checkbox:checked').forEach(checkbox => {
        const carId = parseInt(checkbox.getAttribute('data-id'));
        const car = cars.find(c => c.id === carId);
        const startDate = document.getElementById(`start-date-${carId}`).value;
        const duration = parseInt(document.getElementById(`duration-${carId}`).value);
        
        if (!startDate) {
            alert(`Silakan isi tanggal sewa untuk ${car.name}`);
            return;
        }
        
        if (duration < 1) {
            alert(`Durasi sewa untuk ${car.name} minimal 1 hari`);
            return;
        }
        
        selectedCars.push({
            ...car,
            startDate,
            duration,
            subtotal: car.price * duration
        });
    });
    
    return selectedCars;
}

