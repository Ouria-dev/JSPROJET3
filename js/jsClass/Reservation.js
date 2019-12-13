/*-----------------RESERVATION------------*/

/*----------Création de la classe RESERVATION avec ses méthodes------------------*/
class Reservation {
    
    constructor(stationname, reservationtime) {
        this.stationName = stationname;
        this.reservationTime = reservationtime;
        return this.ajoutReservationStorage();
    }
    
//méthode pour stocker les informations dans SessionStorage
    ajoutReservationStorage() {
        sessionStorage.clear();
        sessionStorage.setItem('stationname', this.stationName);//La méthode setItem () définit la valeur de l'élément d'objet de stockage spécifié.    
        sessionStorage.setItem('reservationtime', this.reservationTime);//La méthode setItem () définit la valeur de l'élément d'objet de stockage spécifié.   
    }
    
//méthode pour ajouter le code html sur la page d'accueil, pour afficher la réservation et le temps restant, puis définir l'annulation après le délai. (méthode static pour utilisation par la class)
    static ajoutReservation(delay){
        var infoStation = sessionStorage.getItem('stationname');//La méthode getItem () renvoie la valeur de l'élément d'objet de stockage spécifié. Elle appartient à l'objet de stockage   
        var infoTime = Number(sessionStorage.getItem('reservationtime'));
        var delayAutre = (infoTime+(delay*60000)) - Date.now();

        if (window.timer) {clearInterval(window.timer);}

        window.timer = setInterval(function () {//rappel 1min = 60s = 60000ms
            var timeRestant = (infoTime+(delay*60000)) - Date.now();//La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis 1/01/1970 a 00h00.
            var minuteRestant = Math.floor(timeRestant/60000);/*La fonction Math.floor(x) renvoie le 
            plus grand entier qui est inférieur ou égal à un nombre x ex(20.351 = 20)*/
            var secondRestant = Math.floor((timeRestant%60000)/1000);
            
            if (document.getElementById("timer") !== null){
                document.getElementById("timer").innerHTML = minuteRestant+"min "+secondRestant+"s";
            }
        }, 1000);//interval de 1s

        document.getElementById("myReservationSection").innerHTML = "<div id='reservationInfo'><h2>Votre réservation et bien prise en compte: </h2><p>Vous avez réservé un vélo à la station "+infoStation+".</p><p>Votre réservation est encore valable pendant : <span id='timer'></span></p><p><button id='cancelReservation'>Annuler la réservation</button></p></div>";

        document.getElementById("cancelReservation").addEventListener("click", function () {
            document.getElementById("myReservationSection").innerHTML = "<div class='reservationCancel'><h1>Réservation annulée.</h1>"; //affiche du texte pour confirmer l'annulation
            sessionStorage.clear();//On remet a 0 la ssessionStorage 
            
            setTimeout(function () {
                document.getElementById("myReservationSection").innerHTML = "";    
            }, 3000);//arrête d'afficher le texte après 3s
        });

        //arrête la minuterie après le délai et affiche le texte d'expiration
        setTimeout(function () {
            clearInterval(window.timer); 
            document.getElementById("myReservationSection").innerHTML = "<div class='reservationCancel'><h1>Votre réservation a expiré.</h1>";
             
            setTimeout(function () {
                document.getElementById("myReservationSection").innerHTML = "";    
            }, 3000); //arrête d'afficher le texte après 3s          
            sessionStorage.clear();//On remet a 0 la ssessionStorage   
        }, delayAutre);    
    }
}