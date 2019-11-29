class Station {
    
    constructor(station, map) {
        this.station = station;
        this.map = map;
        window["oneStation"+this.station.number] = this;//garder une trace pour référence à chaque station
        return this.addMarker();
    }
    
    //ajouter un marqueur pour chaque station
    addMarker() {
        //définir des icônes verts et rouges
        var redIcon = L.icon({
            iconUrl: 'images/cursorRouge.png',
            iconSize: [20, 40],
            iconAnchor: [10, 40]
        });
        var greenIcon = L.icon({
            iconUrl: 'images/cursorVert.png',
            iconSize: [30, 40],
            iconAnchor: [15, 40]
        });
        var orangeIcon = L.icon({
            iconUrl: 'images/cursorOrange.png',
            iconSize: [20, 40],
            iconAnchor: [15, 40]
        });

        var nombre = this.station.number;
        if (this.station.available_bikes > 5 && this.station.status === "OPEN"){ // si staion ouverte avec plus de 5 velo ajouter un marqueur vert pour les stations disponibles
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: greenIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].stationDisplay(true); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),30);/*setView()définit automatiquement la vue de la carte sur l'emplacement de l'utilisateur et getLatLng() Renvoie la position géographique actuelle du marqueur. On détermine le zoom avant de 30 après selection d'une station.*/
            });
        } if (this.station.available_bikes <= 5 && this.station.available_bikes > 0 && this.station.status === "OPEN"){
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: orangeIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].stationDisplay(true); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),30);
            });

        } else if (this.station.available_bikes === 0 && this.station.status === "OPEN"){// sinon ajouter un marqueur rouge pour les stations sans velo
            var marker = L.marker([this.station.position.lat, this.station.position.lng], {icon: redIcon, clickable: true}).addTo(this.map);
            marker.on('click', function (e){ 
                window["oneStation" + nombre].stationDisplay(false); 
                window["oneStation" + nombre].map.setView(e.target.getLatLng(),17);
            });
        }
    }   
  
}