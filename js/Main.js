// script pour mon menu burger
let link = document.getElementById('link')
let burger = document.getElementById('burger')
let ul = document.querySelector('ul')

/* gestionnaire d'événement sur le lien a#link pour venir changer l'attribution de la classe .open à la ul et au span#burger */
link.addEventListener('click', function(e) {//Détecte l'événement myEvent et exécute ici click
        e.preventDefault()//Annule le comportement par défaut de l'événement
        burger.classList.toggle('open')// toggle bascule de l'interface
        ul.classList.toggle('open')
})



//quand la page est chargée: démarrer le slide, ajoutez la carte et les informations de réservation
document.addEventListener("DOMContentLoaded", function(event) {//L' DOMContentLoaded événement se déclenche lorsque le document HTML initial a été complètement chargé et analysé
        var map = new Map("map", "Nantes", 47.218371, -1.553621);//créez votre carte avec cible, city, lat, long
                     
        if (window.sessionStorage.getItem('stationname')) {// si la réservation en cours appelle la fonction statique ajoutReservation () pour afficher les informations et pour la terminer après le délai de 20 minutes
        Reservation.ajoutReservation(2);//en paramètre: on indique le nombre de minutes de réservation avant son expiration
        }
        slider.controle();  
});



