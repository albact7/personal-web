var map;
var marker;
var confirm_place_marker;
var photo;
var village_number;
var cabanaquinta;
var able_to_click;
var circles;
var line; // línea recta entre puntos
var mid_marker; // marcador mitad de línea recta
var zoom_clue = 12;


function initMap() {
    cabanaquinta = new google.maps.LatLng(43.158081, -5.619181);
    var misOpciones = {
        center: cabanaquinta,
        zoom: 12,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("marco_mapa"), misOpciones);
    able_to_click = true;
    google.maps.event.addListener(map, 'click', function(event) {
        locateMarker(event.latLng);
    });
    var homeControlDiv = document.createElement('DIV');
    var homeControl = new HomeControl(homeControlDiv, map, cabanaquinta);

    homeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
    changeButtonsVisibility(true);
    changeLevel(0);
    getOrderList();
    village_number = 0;
    document.getElementById('foto').src = './img/pueblo' + (orderList[village_number] + 1) + '.jpg';
}


function locateMarker(localizacion) {
    if (able_to_click) {
        if (marker) deleteMarker(marker);
        marker = new google.maps.Marker({
            position: localizacion,
            map: map
        });

        map.panTo(localizacion);
    }
}

function deleteMarker(marker) {
    marker.setMap(null);
}

function confirm() {
    if (marker) {
        var image = './img/flag.png';
        var infowindow = new google.maps.InfoWindow({
            content: listInfoWindow[orderList[village_number]]
        });
        confirm_place_marker = new google.maps.Marker({
            position: photo_locations[orderList[village_number]],
            icon: image,
            map: map
        });
        confirm_place_marker.addListener('click', function() {
            infowindow.open(map, confirm_place_marker);
        });

        map.panTo(photo_locations[orderList[village_number]]);
        drawCircles(photo_locations[orderList[village_number]]);
        drawRoute(marker, confirm_place_marker);
        able_to_click = false;
        addPoints();
        changeButtonsVisibility(false);
    } else {
        alert("Selecciona un punto del mapa")
    }
}

function changeButtonsVisibility(play_mode) {
    if (play_mode) {
        document.getElementById("btnConfirm").style.display = 'inline';
        document.getElementById("btnClue").style.display = 'inline';
        document.getElementById("btnNext").style.display = 'none';
    } else {
        document.getElementById("btnConfirm").style.display = 'none';
        document.getElementById("btnClue").style.display = 'none';
        document.getElementById("btnNext").style.display = 'inline';
    }
}

function nextPhoto() {
    deleteMarker(marker);
    deleteMarker(confirm_place_marker);
    village_number++;
    if (village_number >= 10) resetGame();
    document.getElementById('foto').src = './img/pueblo' + (orderList[village_number] + 1) + '.jpg';
    resetSolution();
    changeButtonsVisibility(true);
}

function resetGame() {
    alert("Tu puntuación final es de " + total_points + " puntos.\n¡Juega de nuevo!");
    village_number = 0;
    getOrderList();
    resetPoints();
    addPoints();
}

// dibujamos los círculos concéntricos
function drawCircles(center) {
    circles = [];
    var i;
    for (i = 2000; i <= 8000; i += 2000) {
        var circuloOptions = {
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            fillOpacity: 0.15,
            map: map,
            center: center,
            radius: i
        };
        circulo = new google.maps.Circle(circuloOptions);
        circles.push(circulo);
    }
}

// dibujamos la línea recta
function drawRoute(point_a, point_b) {
    // dibujamos la línea
    line = new google.maps.Polyline({ path: [point_a.position, point_b.position], map: map, strokeColor: '#F0EB00' });
    // calculamos su punto medio
    var middle = google.maps.geometry.spherical.interpolate(point_a.position, point_b.position, 0.5);
    // dibujamos una infowindow con la distancia
    var distance = (google.maps.geometry.spherical.computeDistanceBetween(point_a.position, point_b.position) / 1000).toFixed(2);
    var punctuation = getPunctuationSingle(distance);
    var infowindow = new google.maps.InfoWindow({
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + distance + ' Km</h1>' +
            '<div id="bodyContent">' +
            '<p>Suben ' + punctuation + ' puntos a tu marcador</p>' +
            '</div>'
    });
    var pinIcon = new google.maps.MarkerImage(
        "https://ecoblast.com.mx/wp-content/plugins/google-maps/images/menu-icons/marker.svg",
        null, null, null, new google.maps.Size(40, 40)
    );
    mid_marker = new google.maps.Marker({
        position: middle,
        icon: pinIcon,
        map: map
    });
    infowindow.open(map, mid_marker);

}

// borramos la solución anterior del mapa
function resetSolution() {
    map.setCenter(cabanaquinta);
    map.setZoom(12);
    able_to_click = true;
    deleteMarker(mid_marker);
    line.setMap(null);
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
    marker = undefined;
    zoom_clue = 12;
}

// añadimos la puntuacion al marcador
function addPoints() {
    document.getElementById("points").textContent = total_points;
}

// zoom in cuando se pida una pista
function zoomIn() {
    if (zoom_clue <= 18) {
        if (zoom_clue == 12) {
            alert("¡Si utilizas pistas, tu puntuación disminuirá!")
        }
        map.setCenter(photo_locations[orderList[village_number]]);
        map.setZoom(zoom_clue);
        zoom_clue += 1;
    }
}