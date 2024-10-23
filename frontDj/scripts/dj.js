// dj.js

const reservationItemsDJ = document.getElementById('reservationItemsDJ');
const playlistForm = document.getElementById('playlistForm');
const playlistItems = document.getElementById('playlistItems');
let currentEventDate = '';

// Charger les réservations dans la vue de DJ Marcel
function loadReservationsForDJ() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservationItemsDJ.innerHTML = '';
    reservations.forEach(reservation => {
        const li = document.createElement('li');
        li.textContent = `${reservation.clientName} - ${reservation.eventDate} - ${reservation.eventType}`;
        li.addEventListener('click', () => {
            currentEventDate = reservation.eventDate;
            loadPlaylist(currentEventDate);
        });
        reservationItemsDJ.appendChild(li);
    });
}

// Ajouter une chanson à la playlist
playlistForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!currentEventDate) {
        alert('Veuillez sélectionner une soirée pour ajouter des chansons.');
        return;
    }

    const songName = document.getElementById('songName').value;

