// // script.js

// // Gestion des réservations
// const reservationForm = document.getElementById('reservationForm');
// const reservationItems = document.getElementById('reservationItems');

// reservationForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const clientName = document.getElementById('clientName').value;
//     const eventDate = document.getElementById('eventDate').value;
//     const eventType = document.getElementById('eventType').value;
    
//     const newReservation = document.createElement('li');
//     newReservation.textContent = `${clientName} - ${eventDate} - ${eventType}`;
    
//     reservationItems.appendChild(newReservation);
    
//     reservationForm.reset();
// });

// // Gestion des playlists
// const playlistForm = document.getElementById('playlistForm');
// const playlistItems = document.getElementById('playlistItems');

// playlistForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const songName = document.getElementById('songName').value;
//     const artistName = document.getElementById('artistName').value;
    
//     const newSong = document.createElement('li');
//     newSong.textContent = `${songName} - ${artistName}`;
    
//     playlistItems.appendChild(newSong);
    
//     playlistForm.reset();
// });

// // Gestion des clients
// const clientForm = document.getElementById('clientForm');
// const clientItems = document.getElementById('clientItems');

// clientForm.addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const newClientName = document.getElementById('newClientName').value;
//     const clientEmail = document.getElementById('clientEmail').value;
    
//     const newClient = document.createElement('li');
//     newClient.textContent = `${newClientName} - ${clientEmail}`;
    
//     clientItems.appendChild(newClient);
    
//     clientForm.reset();
// });
