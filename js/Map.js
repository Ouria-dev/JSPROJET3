/*-----------------MAP------------*/

/*----------Création de la classe Map ------------------*/
class Map {
    constructor(target, city, lat, long) {
        this.mymap = L.map(target).setView([lat, long], 15);  //carte avec LeafletJS
        this.city = city;
        this.addCarte();
       /* this.addStations();*/
        return this;
    }
    
    //ajouter une carte source : https://leafletjs.com/examples/quick-start/
    addCarte() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZnJlZDMyZyIsImEiOiJjazNnMzZtbngwYWp2M2RxbjRueHloMmMxIn0.IYDCP-mzGXwGiawH7kI0WQ' //ma clé d'accées mapbox
        }).addTo(this.mymap);
    }
}