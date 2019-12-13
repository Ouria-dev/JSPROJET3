/*BURGER*/
// Initialisation du Burger
burger.burgerPlay();


/*SLIDER*/
// lancement du slider
var slider = new Slider("mySectionSlider", ["images/slider/1.jpg", "images/slider/2.jpg", "images/slider/3.jpg"], 5000);

/*MAP*/
//quand la page est chargée: ajoutez la carte et les informations de réservation. Possibilité de changer la ville comme on le souhaite.
document.addEventListener("DOMContentLoaded", function(event) {//DOMContentLoaded l'événement se déclenche lorsque le document HTML initial a été complètement chargé et analysé
        var map = new Map("map", "Nantes", 47.218371, -1.553621);//création de la carte avec cible, city, lat, long
        /*Lyon: ("map", "Lyon", 45.751758502, 4.82217016556);
         Nantes: ("map", "Nantes", 47.218371, -1.553621);
         Nancy: ("map", "Nancy", 48.69050657806748, 6.170651257414107);
         Rouen: ("map", "Rouen", 49.443023194592875, 1.0847361053546016);
         Toulouse: ("map", "Toulouse", 43.60623880411132, 1.4234894229356654); */

        if (window.sessionStorage.getItem('stationname')) {// si la réservation en cours appelle la fonction statique ajoutReservation () pour afficher les informations et pour la terminer après le délai de 20 minutes
        Reservation.ajoutReservation(20);//en paramètre: on indique le nombre de minutes de réservation avant son expiration
        }
});




