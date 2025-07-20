mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZXJvcHMiLCJhIjoiY21kMXM0dTRlMDN2dzJ2cTMxYmp3enpxZSJ9.RU1rPEOUyH7RXE3Fn337ew';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude], "point(79.49918 43.77070)")
}

function errorLocation() {
    setupMap([43.6426, -79.3871], "point(79.49918 43.77070)")
}

function setupMap(center, excluded) {

    const roads = [];

    const toPrint = [];

    const road1 = {
        name: "Fenmar Drive",
        roadCoords: "point(-79.55590 43.76246),point(-79.56439 43.76615)",
        light: 160,
        conditions: 100,
        signs: 40,
        intersections: 40,
        danger: 0,
    }

    const road2 = {
        name: "Steeles Ave W",
        roadCoords: "point(-79.56367 43.76674)",
        light: 40,
        conditions: 40,
        signs: 100,
        intersections: 100,
        danger: 0,
    }

    const road3 = {
        name: "Toryork Dr",
        roadCoords: "point(-79.56420 43.76259)",
        light: 60,
        conditions: 100,
        signs: 10,
        intersections: 20,
        danger: 0,
    }

    const road4 = {
        name: "407 Express",
        roadCoords: "point(-79.56275 43.77689)",
        light: 1000,
        conditions: 1000,
        signs: 1000,
        intersections: 1000,
        danger: 0,
    }

    roads.push(road1);
    roads.push(road2);
    roads.push(road3);
    roads.push(road4);


    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 12,
        hash: true
    });

    //const searchBox = new MapboxSearchBox;
    //searchBox.accessToken = 'pk.eyJ1IjoidmFsZXJvcHMiLCJhIjoiY21kMXM0dTRlMDN2dzJ2cTMxYmp3enpxZSJ9.RU1rPEOUyH7RXE3Fn337ew';
    //map.addControl(searchBox);

    //new mapboxgl.Marker().setLngLat(center).addTo(map);

    var directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoidmFsZXJvcHMiLCJhIjoiY21kMXM0dTRlMDN2dzJ2cTMxYmp3enpxZSJ9.RU1rPEOUyH7RXE3Fn337ew',
        unit: 'metric',
        profile: 'mapbox/driving',
        exclude: excluded,
    });
    map.addControl(directions, 'top-left');

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');




    

    window.submitConditions = function() {
        var lightlvl = document.getElementById("lightlvl").value;
        var roadCond = document.getElementById("roadCond").value;
        var signage = document.getElementById("signage").value;
        var trafficLights = document.getElementById("trafficLights").value;
        
        var excludedRoads = "";
        var roadNamesToPrint = "";
        for (var road of roads) {
            road.danger = lightlvl * road.light + roadCond * road.conditions + signage * road.signs + trafficLights * road.intersections
            if (road.danger >= 1500) {
                if (excludedRoads == "") {
                    excludedRoads = excludedRoads + road.roadCoords;
                    roadNamesToPrint = roadNamesToPrint + road.name;
                } else {
                    excludedRoads = excludedRoads + "," + road.roadCoords;
                    roadNamesToPrint = roadNamesToPrint + ", " + road.name
                }
                
            }
            
        }
        setupMap(center, excludedRoads);
        alert("Roads excluded: " + roadNamesToPrint);
    }



}
