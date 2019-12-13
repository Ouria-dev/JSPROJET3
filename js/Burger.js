/*-----------------BURGER MENU------------*/

/*----------Création de l'objet slider avec sa méthode------------------*/

let burger = {

        link: document.getElementById('link'),
        burGer: document.getElementById('burger'),
        ul: document.querySelector('ul'),
        
        //méthode de gestionnaire d'événement sur le lien a#link pour venir changer l'attribution de la classe .open à la ul et au span#burger
                burgerPlay: function(){
                        link.addEventListener('click', function(e) {//Détecte l'événement click et exécute ici la bascule du burger en css
                        e.preventDefault()//Annule le comportement par défaut de l'événement
                        burger.burGer.classList.toggle('open')//toggle bascule de l'interface
                        burger.ul.classList.toggle('open')
                        })
                }       
        }