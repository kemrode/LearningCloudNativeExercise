// client.js

// Gestion des réservations (clients)
const reservationForm = document.getElementById('reservationForm');
const reservationItems = document.getElementById('reservationItems');

// Charger les réservations depuis le localStorage
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservationItems.innerHTML = '';
    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `${reservation.clientName} - ${reservation.eventDate} - ${reservation.eventType}`;
        reservationItems.appendChild(li);
    });
}

// Ajouter une nouvelle réservation
reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventType = document.getElementById('eventType').value;

    const reservation = {
        clientName,
        eventDate,
        eventType
    };

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    loadReservations();
    reservationForm.reset();
});

// Charger les réservations au démarrage
loadReservations();
