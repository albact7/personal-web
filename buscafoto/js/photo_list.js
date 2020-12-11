var photo_locations = [
    { lat: 43.170095, lng: -5.763970 },
    { lat: 43.165113, lng: -5.675096 },
    { lat: 43.103324, lng: -5.507865 },
    { lat: 43.173643, lng: -5.745418 },
    { lat: 43.167302, lng: -5.722004 },
    { lat: 43.163596, lng: -5.643677 },
    { lat: 43.140062, lng: -5.610996 },


    { lat: 43.167964, lng: -5.760158 },
    { lat: 43.150546, lng: -5.584756 },
    { lat: 43.119681, lng: -5.544655 }
];
var pueblo1 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Parque de Boo/Bo</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo1.jpg"/>' +
    '<p>El parque de Boo/Bo se encuentra a la entrada del pueblo y hasta hace poco lucía una bonita fuente en su centro.</p>' +
    '</div>' +
    '</div>';
var pueblo2 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Gasolinera de Corigos</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo2.jpg"/>' +
    '<p>Corigos es una de las villas más conocidas del concejo de Aller/Ayer.</p>' +
    '</div>' +
    '</div>';
var pueblo3 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Café Nevada</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo3.jpg"/>' +
    '<p>El Café Nevada, Felechosa, es un habitual en las noches alleranas de invierno.</p>' +
    '</div>' +
    '</div>';
var pueblo4 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Sotiello</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo4.jpg"/>' +
    '<p>Poco conocido entre los propios alleranos, Sotiello se encuentra justo entre Caborana y Moreda/Morea.</p>' +
    '</div>' +
    '</div>';
var pueblo5 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Oyanco</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo5.jpg"/>' +
    '<p>Oyanco se caracteriza por sus edificios con azulejo de tonalidad averdosada.</p>' +
    '</div>' +
    '</div>';
var pueblo6 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Torre de Soto</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo6.jpg"/>' +
    '<p>Construida en el siglo XII, residencia de Doña Urraca en su niñez.</p>' +
    '</div>' +
    '</div>';
var pueblo7 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Bello/Beyo</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo7.jpg"/>' +
    '<p>La localidad de Bello/Beyo destaca por su numerosa población joven en comparación con otros lugares del concejo.</p>' +
    '</div>' +
    '</div>';
var pueblo8 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Bustillé/Bustiyé</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo8.jpg"/>' +
    '<p>Bustillé/Bustiyé alberga las fiestas parroquiales de San Mamés el último fin de semana de agosto.</p>' +
    '</div>' +
    '</div>';
var pueblo9 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Pelúgano/Pel.luno</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo9.jpg"/>' +
    '<p>Este pueblo se encuentra en la falda de Peña Mea, siendo frecuentado por grupos de montaña.</p>' +
    '</div>' +
    '</div>';
var pueblo10 = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">El Cherón</h1>' +
    '<div id="bodyContent">' +
    '<img class="photo-info" src="./img/pueblo10.jpg"/>' +
    '<p>El Merendero El Cherón en Llanos/Yanos comprende una finca a la vera del río perfecta para pasar días calurosos en verano.</p>' +
    '</div>' +
    '</div>';
var listInfoWindow = [pueblo1, pueblo2, pueblo3, pueblo4, pueblo5, pueblo6, pueblo7, pueblo8, pueblo9, pueblo10];

var orderList = []

function getOrderList() {
    for (var a = [], i = 0; i < 10; ++i) a[i] = i;
    orderList = shuffle(a);
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}