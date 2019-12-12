/*-----------------MAP------------*/

/*----------Création de la classe Map avec ses méthodes------------------*/
class Map {
    constructor(target, city, lat, long) {
        this.mymap = L.map(target).setView([lat, long], 15);  //carte avec LeafletJS
        this.city = city;
        this.ajoutCarte();
        this.ajoutStations();
        return this;
    }
    
//méthode (api mapbox) pour ajouter une carte source : https://leafletjs.com/examples/quick-start/
    ajoutCarte() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZnJlZDMyZyIsImEiOiJjazNnMzZtbngwYWp2M2RxbjRueHloMmMxIn0.IYDCP-mzGXwGiawH7kI0WQ'
        }).addTo(this.mymap);
    }
    
//méthode (api jcdecaux) pour récupérer les stations et pour chaqu'une d'elle créer une nouvelle station sur la carte source : https://developer.jcdecaux.com/#/opendata/vls?page=getstarted
    ajoutStations() {
        var map = this.mymap;
        //Requête AJAX pour obtenir les données pour les stations de vélo
        var req = new XMLHttpRequest();//on crée un nouvel objet de type  XMLHttpRequest  qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête
        var url = "https://api.jcdecaux.com/vls/v1/stations?contract="+this.city+"&apiKey=e932c78ef50906b64880ec024f50c7015a95b74e";//on demande à ouvrir une connexion vers le service web avec l'api + la ville + notre clée privée
        req.open("GET", url);//Le type de requête est GET car nous voulons récupérer les données.
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) { 
                var stations = JSON.parse(req.responseText);//responseText  : qui contient la réponse du service web au format texte. Ainsi, si le texte que l'on attend est au format JSON, il va falloir le transformer en objet JavaScript avec la fonction  JSON.parse qu'on met dans la variable "stations".
                stations.forEach(function (station) {
                    var newStation = new Station(station, map);    
                });
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }
}