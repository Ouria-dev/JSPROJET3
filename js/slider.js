/*-----------------SLIDER------------*/

/*----------Création de l'objet slider avec ses méthodes------------------*/
let slider = {
    prev: document.querySelector("#prev"),          // fleche gauche
    next: document.querySelector("#next"),          // fleche droite
    pause: document.querySelector("#pause"),        // Bouton pause
    play: document.querySelector("#play"),          // Bouton play
    slide: document.getElementsByClassName("slide"),// Sélection des images via la classe slide
    image: 0,                                       //  numerotation des images via la variable image par default vaut 0
    
/*Méthode pour avancer le slider*/
    suivant: function () {   
        this.slide[this.image].style.display = "none";  // On fait disparaître l'image 
        this.image === 2 ? this.image = 0 : this.image++;// Si le slider est à la fin (ici 3ème image = n°2), On fait réapparaître la première image, Sinon on incrémente la variable image pour passé à l'image suivante  
        this.slide[this.image].style.display = "block"; // On fait apparaître l'image
    },

/*Méthode pour que le slider fonctionne en arrière*/
    precedent: function () {                                  
        this.slide[this.image].style.display = "none"; 
        this.image === 0 ? this.image = 2 : this.image--; // Si le slider est à la première image (0) on passe a la 3ème image ici la (2), Sinon on va a l'image précédente et on décrémente de -1 pour cela
        this.slide[this.image].style.display = "block";  
    },

/*Méthode pour les touches du clavier*/  
    clavier: function (i) {                              
        if (i.keyCode === 39) {      // keyCode === 39 Touche de fleche droite source: https://www.dcode.fr/code-touches-javascript
            document.addEventListener("keydown", this.suivant()); // Si touche 39 alors applique la méthode suivante
        } else if (i.keyCode === 37) {  //keyCode === 37 Touche de fleche gauche
            document.addEventListener("keydown", this.precedent()); // Si touche 37 alors applique la méthode precedent
        }
    },

/*Méthode pour bouton pause et play*/
    pauseSlide: function () {
        window.clearInterval(timer);       //Met à zero le setIntervel de timer
        this.pause.style.display = "none"; //On fait disparaitre le bouton pause
        this.play.style.display = "block"; //On fait apparaitre le bouton play
    },

    playSlide: function () {
        timer = window.setInterval(slider.suivant.bind(slider), 5000); //Lance le timer
        this.play.style.display = "none";   //On fait disparaitre le bouton play
        this.pause.style.display = "block";  //On fait apparaitre le bouton pause
    },
}

/* Création du script */
/* Création de la variable timer, setInterval déclenche le slider à intervalle régulier de 5s.*/
let timer = window.setInterval(slider.suivant.bind(slider), 5000);//La fonction bind crée une nouvelle fonction liée a l'objet "slider" https://devdocs.io/javascript/global_objects/function/bind

slider.next.addEventListener("click", slider.suivant.bind(slider));     //Le bouton droit appel la méthode "suivant" de l'objet "slider"
slider.prev.addEventListener("click", slider.precedent.bind(slider));   //Le bouton gauche appel la méthode "précédent" de l'objet "slider"
slider.play.addEventListener("click", slider.playSlide.bind(slider));   //Le bouton play appel la méthode "playSlide" de l'objet "slider et relance le timer"
slider.pause.addEventListener("click", slider.pauseSlide.bind(slider)); //Le bouton pause appel la méthode "pauseSlide" de l'objet "slider"
document.addEventListener("keydown", slider.clavier.bind(slider));      //Gestion touche du clavier via la méthode "clavier du slider" de l'objet document
