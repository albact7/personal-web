// nivel de dificultad actual
var current_level = 0;

HomeControl.prototype.home_ = null;

HomeControl.prototype.getHome = function() {
    return this.home_;
}

HomeControl.prototype.setHome = function(home) {
    this.home_ = home;
}

function HomeControl(controlDiv, map, home) {

    var control = this;

    control.home_ = home;

    controlDiv.style.padding = '5px';


    var goHomeUI = document.createElement('DIV');
    goHomeUI.style.backgroundColor = 'white';
    goHomeUI.style.borderStyle = 'solid';
    goHomeUI.style.borderWidth = '2px';
    goHomeUI.style.cursor = 'pointer';
    goHomeUI.style.textAlign = 'center';
    goHomeUI.title = 'Click to set the map to Home';
    controlDiv.appendChild(goHomeUI);

    var goHomeText = document.createElement('DIV');
    goHomeText.style.fontFamily = 'Arial,sans-serif';
    goHomeText.style.fontSize = '12px';
    goHomeText.style.paddingLeft = '4px';
    goHomeText.style.paddingRight = '4px';
    goHomeText.innerHTML = '<b>Ir a inicio</b>';
    goHomeUI.appendChild(goHomeText);

    google.maps.event.addDomListener(goHomeUI, 'click', function() {
        var currentHome = control.getHome();
        map.setCenter(currentHome);
    });
}

function changeLevel(level) {
    current_level = level;
    switch (level) {
        case 0:
            map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            document.getElementById("easyLevel").style.background = "#ADC4D6";
            document.getElementById("hardLevel").style.background = "#FFFFFF";
            break;
        case 1:
            map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            document.getElementById("easyLevel").style.background = "#FFFFFF";
            document.getElementById("hardLevel").style.background = "#ADC4D6";
            break;
    }
}