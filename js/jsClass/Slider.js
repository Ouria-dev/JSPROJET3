/*-----------------SLIDER------------*/

/*----------Création de la class slider avec ses méthodes------------------*/
class Slider {

    constructor(target, pictures, time) {
        this.pictures = pictures;//représente le tableau d'images
        this.time = time;// représente le temps de d'affichage entre les images
        document.getElementById(target).innerHTML = this.html(); //ajout html
        this.image = 1;
        this.prev = document.querySelector("#prev");   // fleche gauche  
        this.next = document.querySelector("#next");   // fleche droite
        this.pause = document.querySelector("#pause"); // Bouton pause
        this.play = document.querySelector("#play");   // Bouton play
        this.controle(); //ajout eventlisteners
        this.animation;
        this.off;
        this.playSlide();
        return this;
    }


    html() {
        return "<section id='accueil'><div id='contenerImage'><img id='slideImage' src=" + this.pictures[0] + " alt='Diaporama'></div><br><div id='btnContener'><em id='prev' class='fas fa-arrow-circle-left' ></em><em id='pause' class='fas fa-pause-circle' ></em><em id='play' class='fas fa-play-circle' ></em><em id='next' class='fas fa-arrow-circle-right' ></em></div></section>";
    }
    
//méthode pour l'animation
    playSlide() {
        var bouton = this;
        this.animation = setInterval(function(){bouton.suivant();}, this.time);//setInterval vas permettre de gérer le temps entre chaque images. On lui fait passer la fonction suivant() puis le time de notre constructeur que l'on définira avec un new class
        this.off = false;
        play.style.display = "none";//On fait disparaitre le bouton play
        pause.style.display = "block";//On fait apparaitre le bouton pause
    }  

    pauseSlide() {
        window.clearInterval(this.animation);
        this.off = true;
        pause.style.display = "none";//On fait disparaitre le bouton pause              
        play.style.display = "block";//On fait apparaitre le bouton play
    }

//méthode pour afficher l'image suivante ou précédente
    suivant() {
        document.getElementById("slideImage").src = this.pictures[this.image];
        this.image === 2 ? this.image = 0 : this.image++;// Si le slider est à la fin (ici 3ème image = 2), On fait réapparaître la première image, Sinon on incrémente la variable image pour passé à l'image suivante
    }

    precedent() { 
        document.getElementById("slideImage").src = this.pictures[this.image];
        this.image === 0 ? this.image = 2 : this.image--;// Si le slider est à la première image (0) on passe a la 3ème image ici la (2), Sinon on va a l'image précédente et on décrémente de -1 pour cela
    }

//méthode pour le controle des boutons via addEventListener
    controle() {
        var bouton = this;
        pause.addEventListener("click", function(){
            bouton.pauseSlide();//controle bouton pause
        });
        play.addEventListener("click", function(){
            if (bouton.off) {//si l'animation est désactivée, l'animation redémare avec playSlide 
            bouton.playSlide();//controle bouton play    
            }
        });
        prev.addEventListener("click", function(){
            bouton.precedent();//controle bouton précédent
        });
        next.addEventListener("click", function(){
            bouton.suivant();//controle bouton suivant
        });
       
        document.addEventListener("keydown", function(i){//controle touches clavier
            if (i.keyCode === 39) {      // keyCode === 39 Touche de fleche droite source: https://www.dcode.fr/code-touches-javascript
            document.addEventListener("keydown", bouton.suivant()); // Si touche 39 alors applique la méthode "suivant"
            } else if (i.keyCode === 37) {  //keyCode === 37 Touche de fleche gauche
            document.addEventListener("keydown", bouton.precedent()); // Sinon si touche 37 alors applique la méthode "precedent"
        }
        });
    }
}