/*-----------------CANVAS------------*///sources : https://developer.mozilla.org/fr/docs/Tutoriel_canvas

/*----------Création de la classe CANVAS avec ses méthodes------------------*/
class Canvas{

    constructor(stationName, stationNombr){
        this.name = stationName;// nom de la station
        this.nombr = stationNombr;// Numéro de la station
        this.ajoutCanvas();
        window.canva = this;
        this.canvas = document.getElementById('myCanvas');// On accéde à l’élément id "canvas" en JavaScript (zone d'affichage)
        this.ctx = this.canvas.getContext('2d');//On accéde au contexte de rendu du canvas via la méthode getContext() qui renvoie un objet appartenant à l’interface CanvasRenderingContext2D.
        this.signed = false;
        this.mousePosition = {x: 0, y: 0};
        this.startPosition = this.mousePosition;
        this.ajoutListeners(); 
        return this; 
    }
    
//méthode pour ajouter le HTML du canvas
    ajoutCanvas() {
        document.getElementById("myCanvasSection").innerHTML = "<form id='canvasForm'><p>Vous êtes sur le point de réserver un vélo à la station: "+this.name+".<p></p><p>Merci de bien vouloir signer:</p><canvas id='myCanvas'></canvas><div id='inputCanvas'><input type='submit' id='confirmCanvas' value='Confirmer'><input type='reset' id='resetCanvas' value='Effacer'></div></form>";
        
    }

//méthode pour tracer une ligne
    drawCanvas() {
        var can = window.canva;
        can.ctx.moveTo(can.startPosition.x, can.startPosition.y);//.moveTo() de l'API Canvas 2D déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y) (le fait de lever un stylo ou un crayon depuis une position sur un papier, et de le placer sur une autre.)
        can.ctx.lineTo(can.mousePosition.x, can.mousePosition.y);//Connecte le dernier point du sous-chemin aux coordonnées x, y avec une ligne droite. (Dessine une ligne depuis la position de dessin courante jusqu'à la position spécifiée par x et y.)
        can.ctx.stroke();//.stroke() de l'API Canvas 2D dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle. (Dessine la forme en traçant son contour.)
        can.startPosition = can.mousePosition; 
    }

//méthode pour ajouter des écouteurs d'événements
    ajoutListeners() {
        this.canvas.addEventListener("mousedown", this.startCanvas);
        this.canvas.addEventListener("mouseup", this.stopCanvas);
        this.canvas.addEventListener("mousemove", this.getPosition);
        document.getElementById("resetCanvas").addEventListener("click", this.refreshCanvas);
        document.querySelector("form#canvasForm").addEventListener("submit", this.submitReservation);
    }

//méthode pour lancer le draw du canvas   
    startCanvas(e) {
        window.canva.time = setInterval(window.canva.drawCanvas, 0);//setInterval lance le "drawCanvas" à intervalle continue
        window.canva.signed = true;
        let rect = window.canva.canvas.getBoundingClientRect();//Renvoie la taille d'un élément et sa position par rapport à la zone d'affichage ici "mycanvas"
        window.canva.startPosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }  
    }

//méthode pour l'arret de l'interval du canvas (celui-ci stop le draw si la souri ne click plus)  
    stopCanvas() {
        clearInterval(window.canva.time);
    }

//méthode pour récupèrer et renvoyer les dimensions et la position de la souri sous forme de coordonnées.
    getPosition(e) {
        let rect = window.canva.canvas.getBoundingClientRect();//Renvoie la taille d'un élément et sa position par rapport à la zone d'affichage ici "mycanvas"
        window.canva.mousePosition = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

//méthode pour réinitialiser le canvas    
    refreshCanvas() {
        var newCanvas = new Canvas(window.canva.name, window.canva.nombr);
    }

//méthode pour vérifier si canvas signé avec ou sans révervation et denamder de signé avec message d'alerte    
    submitReservation() {
        //si l'utilisateur a signé
        if (window.canva.signed){
            //cas où il y a déjà une réservation
            if (window.sessionStorage.getItem('stationname')) {
                var confirmed = confirm("Cette réservation annulera la réservation en cours. Confirmez-vous?"); 
                //si non confirmé, retournez à la carte
                if (confirmed === false) {
                    document.getElementById("myCanvasSection").innerHTML = "";
                    document.getElementById("myStationSection").innerHTML = "";
                    return;
                }
            }
            //enregistrer une réservation (on utilise la methode Date.now pour le faire passer en argument et lancer une new reservation)
            let time = Date.now();//La méthode Date.now() renvoie le nombre de millisecondes écoulées depuis 1/01/1970 a 00h00.
            let reservation = new Reservation(window.canva.name, time); //window.canva.name correspond au nom de la station
            document.getElementById("myStationSection").innerHTML = "";//on reste sur à la carte
            document.getElementById("myCanvasSection").innerHTML = "";
            location.reload();//on recharge la location    
        }

        //si non signé demande la signature via une alert et ramener au canvas
        else {
            alert("Vous devez signer avant de valider.");
            var newCanvas = new Canvas(window.canva.name, window.canva.nombr);
        }
    }
}
