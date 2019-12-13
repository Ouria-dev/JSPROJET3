/*-----------------STATION------------*/

/*----------Création de la classe Station avec ses méthodes------------------*/
class Station {
    
    constructor(station, map) {
        this.station = station;
        this.map = map;
        window["oneStation" + this.station.number] = this;//garder une trace pour référence à chaque station
        return this.ajoutCursorStation();
    }

/*méthode pour ajouter les curseur pour chaque station ouverte et en fonction du nombre de vélos disponibles sur la carte*/
    ajoutCursorStation() {//ajouter un marqueur pour chaque station source : https://leafletjs.com/reference-1.6.0.html#icon
        const redIcon = L.icon({//définir des icônes rouges
            iconUrl: 'images/cursorRouge.png',
            iconSize: [20, 40],
            iconAnchor: [15, 40]
        });
        const greenIcon = L.icon({
            iconUrl: 'images/cursorVert.png',
            iconSize: [30, 40],
            iconAnchor: [15, 40]
        });
        const orangeIcon = L.icon({
            iconUrl: 'images/cursorOrange.png',
            iconSize: [20, 40],
            iconAnchor: [15, 40]
        });

        let infoStation = window["oneStation" + this.station.number]

        if (this.station.status === "OPEN" && this.station.available_bikes > 5){ // si station ouverte avec plus de 5 velo ajouter un marqueur vert pour les stations disponibles
            let marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: greenIcon}).addTo(this.map);
            marker.on('click', function (e){ 
                infoStation.afficheStation(true); 
                infoStation.map.setView(e.target.getLatLng(),30);/*setView()définit automatiquement la vue de la carte sur l'emplacement de l'utilisateur et getLatLng() Renvoie la position géographique actuelle du marqueur. On détermine le zoom avant de 30 après selection d'une station.*/
            });
            
        } if (this.station.status === "OPEN" && this.station.available_bikes > 0 && this.station.available_bikes <= 5){ //si station ouverte avec au moin 1 velo et jusqu'a 5 vélos ajouter un marqueur orange
            let marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: orangeIcon}).addTo(this.map);
            marker.on('click', function (e){ 
                infoStation.afficheStation(true); 
                infoStation.map.setView(e.target.getLatLng(),30);
            });

        } else if (this.station.status === "OPEN" && this.station.available_bikes === 0){// sinon si station ouverte mais avec 0 vélo sinon ajouter un marqueur rouge pour les stations sans velo
            let marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: redIcon}).addTo(this.map);
            marker.on('click', function (e){ 
                infoStation.afficheStation(false); 
                infoStation.map.setView(e.target.getLatLng(),17);
            });
        }
    }    
    
// méthodes pour afficher la zone d'information sur les stations (et formulaire de réservation pour les stations disponibles) après avoir cliquer sur un marqueur
    afficheStation(available) {
        let nombre = this.station.number;
        let status = (this.station.status === "OPEN") ? "ouverte" : "fermée";
        let prenom = '';
        let nom = '';
        let formuLaire = "";

        if (window.localStorage.getItem('prenom') && window.localStorage.getItem('nom')) {//si le prénom et le nom de famille sont stockés dans localStorage, entrez-les dans le formulaire
        nom = "value = "+window.localStorage.getItem('nom');//La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre. ici le nom
        prenom = "value = "+window.localStorage.getItem('prenom');//La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre. ici le prénom
        }
    
        if (available){//si disponible, ajouter un formulaire de réservation
        formuLaire = "<p><label for='nom'>&ensp;&ensp;&thinsp;Nom:   </label><input type='text' name='nom' "+nom+" id='nom' required></p><p><label for='prenom'>Prénom:</label><input type='text' name='prenom' "+prenom+" id='prenom' required></p><input type='submit' id='submit' value='Réserver'>";
        }

        //pour toutes les stations on ajoute les informations de la stations
        document.getElementById("myStationSection").innerHTML = "<form id='formSection'><h2>Détails de la station</h2><p>Station: " + this.station.name + "</p><p>Adresse: " + this.station.address + "</p><p> Station " + status + "</p><p>Emplacements libres: " + this.station.available_bike_stands + "</p><p>Vélos disponibles: " + this.station.available_bikes + "</p>" + formuLaire + "</form>"; 

        //pour les stations disponibles soumettre et enregistrer le prénom et le nom entré après submit affiche le canvas
        if (available) {
            let formulaire = document.querySelector("form");
            formulaire.addEventListener("submit", function (e) {
                let newCanvas = new Canvas(window["oneStation" + nombre].station.name, nombre);
                document.getElementById("myCanvasSection").scrollIntoView({behavior: 'smooth', block: 'center'});//La méthode Element.scrollIntoView() fait défiler la page de manière à rendre l'élément canvas visible.
                window.localStorage.clear();
                window.localStorage.setItem('nom', formulaire.elements.nom.value);//La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
                window.localStorage.setItem('prenom', formulaire.elements.prenom.value);//La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
                e.preventDefault();
            });
        }
    }
}