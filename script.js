if (window.innerWidth <= 768) {
  const myDiv = document.createElement('div');
  myDiv.textContent = 'This is mobile only!';
  myDiv.className = 'custom-mobile-div';
  document.body.appendChild(myDiv);
}

mapboxgl.accessToken = 'pk.eyJ1IjoidmFsZXJvcHMiLCJhIjoiY21kMXM0dTRlMDN2dzJ2cTMxYmp3enpxZSJ9.RU1rPEOUyH7RXE3Fn337ew';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    setupMap([-79.55531,43.76238], "point(79.49918 43.77070)")
}

function errorLocation() {
    setupMap([-79.55531,43.76238], "point(79.49918 43.77070)")
}

var roads = [];

var roadMarkers = [];

var roadMarkerObj = [];

const road1 = {
    name: "Fenmar Dr 1",
    roadCoords: "point(-79.55579 43.76242)",
    markerCoords: [[-79.55579, 43.76242]],
    light: 300,
    conditions: 0,
    signs: 0,
    intersections: 0,
    danger: 0,
}

const road2 = {
    name: "Steeles Ave W",
    roadCoords: "point(-79.56367 43.76674)",
    markerCoords: [[-79.56367, 43.76674]],
    light: 40,
    conditions: 40,
    signs: 100,
    intersections: 100,
    danger: 0,
}

const road3 = {
    name: "Toryork Dr",
    roadCoords: "point(-79.56420 43.76259)",
    markerCoords: [[-79.56420, 43.76259]],
    light: 60,
    conditions: 100,
    signs: 10,
    intersections: 20,
    danger: 0,
}

const road4 = {
    name: "407 Express",
    roadCoords: "point(-79.56275 43.77689)",
    markerCoords: [[-79.56275, 43.77689]],
    light: 1000,
    conditions: 1000,
    signs: 1000,
    intersections: 1000,
    danger: 0,
}

const road5 = {
    name: "Fenmar Dr 2",
    roadCoords: "point(-79.54069 43.75807)",
    markerCoords: [[-79.54069, 43.75807]],
    light: 40,
    conditions: 70,
    signs: 40,
    intersections: 40,
    danger: 0,
}

const road6 = {
    name: "Fenmar Dr 3",
    roadCoords: "point(-79.56439 43.76615)",
    markerCoords: [[-79.56439, 43.76615]],
    light: 160,
    conditions: 100,
    signs: 40,
    intersections: 40,
    danger: 0,
}

const road7 = {
    name: "Weston Rd 1",
    roadCoords: "point(-79.54549 43.76551)",
    markerCoords: [[-79.54549, 43.76551]],
    light: 80,
    conditions: 0,
    signs: 0,
    intersections: 80,
    danger: 0,
}

const road8 = {
    name: "Ormont Dr 1",
    roadCoords: "point(-79.54041 43.76588)",
    markerCoords: [[-79.54041, 43.76588]],
    light: 0,
    conditions: 160,
    signs: 0,
    intersections: 0,
    danger: 0,
}

const road9 = {
    name: "Milvan Dr 1",
    roadCoords: "point(-79.55251 43.75028)",
    markerCoords: [[-79.55251, 43.75028]],
    light: 40,
    conditions: 40,
    signs: 40,
    intersections: 40,
    danger: 0,
}

const road10 = {
    name: "Penn Dr 1",
    roadCoords: "point(-79.55834 43.75496)",
    markerCoords: [[-79.55834,43.75496]],
    light: 200,
    conditions: 0,
    signs: 10,
    intersections: 0,
    danger: 0,
}

const road11 = {
    name: "Arrow Rd 1",
    roadCoords: "point(-79.53558 43.75231)",
    markerCoords: [[-79.53558,43.75231]],
    light: 0,
    conditions: 80,
    signs: 0,
    intersections: 80,
    danger: 0,
}

const road12 = {
    name: "Steeles Ave W 2",
    roadCoords: "point(-79.55557 43.76845)",
    markerCoords: [[-79.55557,43.76845]],
    light: 0,
    conditions: 80,
    signs: 0,
    intersections: 80,
    danger: 0,
}



roads.push(road1, road2, road3, road4, road5, road6, road7, road8, road9, road10, road11, road12);

function setupMap(center, excluded) {

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 12,
        hash: true
    });

    for (var marker of roadMarkers) {
        var avoidMarker = document.createElement('div');
            avoidMarker.style.backgroundColor = 'red';
            avoidMarker.style.width = '18px';
            avoidMarker.style.height = '18px';
            avoidMarker.style.borderRadius = '50%';
            avoidMarker.style.display = 'flex';
            avoidMarker.style.alignItems = 'center';
            avoidMarker.style.justifyContent = 'center';
            avoidMarker.style.color = 'white';
            avoidMarker.style.fontSize = '15px';
            avoidMarker.style.fontWeight = 'bold';
            avoidMarker.innerText = '🚫'; // or ✖️ or ⚠️

        var newMarker = new mapboxgl.Marker(avoidMarker)
            .setLngLat(marker)
            .addTo(map);
        
        roadMarkerObj.push(newMarker);
    }
    

    var directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoidmFsZXJvcHMiLCJhIjoiY21kMXM0dTRlMDN2dzJ2cTMxYmp3enpxZSJ9.RU1rPEOUyH7RXE3Fn337ew',
        unit: 'metric',
        profile: 'mapbox/driving',
        exclude: excluded,
    });
    map.addControl(directions, 'top-left');

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');




    

    window.submitConditions = function() {
        var lightlvl = document.getElementById("lightlvl").value;
        var roadCond = document.getElementById("roadCond").value;
        var signage = document.getElementById("signage").value;
        var trafficLights = document.getElementById("trafficLights").value;
        

        map.remove();
        roadMarkers = [];
        roadMarkerObj = [];

        var excludedRoads = "";
        var roadNamesToPrint = "";
        for (var road of roads) {
            var danger = lightlvl * road.light + roadCond * road.conditions + signage * road.signs + trafficLights * road.intersections
            if (danger >= 1500) {
                for (var marker of road.markerCoords) {
                    roadMarkers.push(marker);
                }
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
