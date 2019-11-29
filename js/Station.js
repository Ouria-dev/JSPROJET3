/*-----------------STATION------------*/

/*----------Création de la classe Station avec ses méthodes------------------*/
class Station {
    
    constructor(station, map) {
        this.station = station;
        this.map = map;
        window["oneStation"+this.station.number] = this;//garder une trace pour référence à chaque station
        return this.cursorStationAdd();
    }

/*méthode pour ajouter les curseur pour chaque station ouverte et en fonction du nombre de vélos disponibles*/
    cursorStationAdd() {//ajouter un marqueur pour chaque station
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

        let nombre = this.station.number;
        if (this.station.status === "OPEN" && this.station.available_bikes > 5){ // si staion ouverte avec plus de 5 velo ajouter un marqueur vert pour les stations disponibles
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: greenIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].afficheStation(true); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),30);/*setView()définit automatiquement la vue de la carte sur l'emplacement de l'utilisateur et getLatLng() Renvoie la position géographique actuelle du marqueur. On détermine le zoom avant de 30 après selection d'une station.*/
            });
        } if (this.station.status === "OPEN" && this.station.available_bikes > 0 && this.station.available_bikes <= 5){ //si station ouverte avec au moin 1 velo et jusqu'a 5 vélos ajouter un marqueur orange
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: orangeIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].afficheStation(true); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),30);
            });

        } else if (this.station.status === "OPEN" && this.station.available_bikes === 0){//// sinon si station ouverte mais avec 0 vélo  sinon ajouter un marqueur rouge pour les stations sans velo
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: redIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].afficheStation(false); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),17);
            });
        }
    }   
    
// méthodes pour afficher la zone d'information sur les stations (et formulaire de réservation pour les stations disponibles) après avoir cliquer sur un marqueur
    afficheStation(available) {
        //var nombre = this.station.number;
        let status = (this.station.status === "OPEN") ? "ouverte" : "fermée";
        let prenom = '';
        let nom = '';
        let Formulaire = "";

        if (window.localStorage.getItem('prenom') && window.localStorage.getItem('nom')) {//si le prénom et le nom de famille sont stockés dans localStorage, entrez-les dans le formulaire
            nom = "value = "+window.localStorage.getItem('nom');
            prenom = "value = "+window.localStorage.getItem('prenom');
        }
        
        if (available){//si disponible, ajouter un formulaire de réservation
            Formulaire = "<p><label for='nom'>Nom:   </label><input type='text' name='nom' "+nom+" id='nom' required></p><p><label for='prenom'>Prénom:</label><input type='text' name='prenom' "+prenom+" id='prenom' required></p><input type='submit' id='submit' value='Réserver'>";
        }

        //pour toutes les stations on ajoute les informations de la stations
        document.getElementById("myStationSection").innerHTML = "<form id='formSection'><h2>Détails de la station</h2><p>Station: " + this.station.name + "</p><p>Adresse: " + this.station.address + "</p><p> Station " + status + "</p><p>Emplacements libres: " + this.station.available_bike_stands + "</p><p>Vélos disponibles: " + this.station.available_bikes + "</p>" + Formulaire + "</form>"; 

        //pour les stations disponibles soumettre et enregistrer le prénom et le nom entrés
        if (available) {
            var formulaire = document.querySelector("form");
            formulaire.addEventListener("submit", function (e) {
                window.localStorage.clear();
                window.localStorage.setItem('nom', formulaire.elements.nom.value);
                window.localStorage.setItem('prenom', formulaire.elements.prenom.value);
                e.preventDefault();
            });
        }
    }
}