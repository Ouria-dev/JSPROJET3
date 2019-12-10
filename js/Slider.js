/*-----------------SLIDER------------*/

/*----------Création de la class Slider avec ses méthodes------------------*/
class Slider {

    constructor(target, pictures, time) {
        this.pictures = pictures;
        this.time = time;
        this.image = 0;
        this.prev = document.querySelector("#prev");     
        this.next = document.querySelector("#next");    
        this.pause = document.querySelector("#pause");  
        this.play = document.querySelector("#play");    
        document.getElementById(target).innerHTML = this.html(); //ajout html
        this.controle(); //ajout eventlisteners
        this.animation;
        this.off;
        this.playSlide();
        return this;
    }


    html() {
        return "<section id='accueil'><div id='contenerImage'><img id='slideImage' src=" + this.pictures[0] + " alt='Diaporama'></div><br><div id='btnContainer'><em id='prev' class='fas fa-arrow-circle-left' ></em><em id='pause' class='fas fa-pause-circle' ></em><em id='play' class='fas fa-play-circle' ></em><em id='next' class='fas fa-arrow-circle-right' ></em></div></section>";
    }
    
//méthode pour l'animation
    playSlide() {
        var bouton = this;
        this.animation = setInterval(function(){bouton.suivant();}, this.time);
        this.off = false;
        play.style.display = "none";
        pause.style.display = "block";
    }  

    pauseSlide() {
        window.clearInterval(this.animation);
        this.off = true;
        pause.style.display = "none";              
        play.style.display = "block"; 
    }

//méthode pour afficher l'image précédente ou suivante
    suivant() {
        document.getElementById("slideImage").src = this.pictures[this.image];
        this.image === 2 ? this.image = 0 : this.image++;
    }

    precedent() { 
        document.getElementById("slideImage").src = this.pictures[this.image];
        this.image === 0 ? this.image = 2 : this.image--; // Si le slider est à la première image (0) on passe a la 3ème image ici la (2), Sinon on va a l'image précédente et on décrémente de -1 pour cela
    }

//méthode pour le controle des boutons via addEventListener
    controle() {
        var bouton = this;
        pause.addEventListener("click", function(){
            bouton.pauseSlide();
        });
        play.addEventListener("click", function(){
            if (bouton.off) {//si l'animation est désactivée, l'animation redémare avec playSlide 
            bouton.playSlide();    
            }
        });
        prev.addEventListener("click", function(){
            bouton.precedent();
        });
        next.addEventListener("click", function(){
            bouton.suivant();
        });
       
        document.addEventListener("keydown", function(i){
            if (i.keyCode === 39) {      // keyCode === 39 Touche de fleche droite source: https://www.dcode.fr/code-touches-javascript
            document.addEventListener("keydown", bouton.suivant(1)); // Si touche 39 alors applique la méthode "suivant"
            } else if (i.keyCode === 37) {  //keyCode === 37 Touche de fleche gauche
            document.addEventListener("keydown", bouton.suivant(-1)); // Sinon si touche 37 alors applique la méthode "suivant" -1
        }
        });
    }
}