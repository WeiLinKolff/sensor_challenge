const openSidebarButton = document.getElementById('sidebarShow');
const sidebar = document.getElementById('sidebar');
function openSidebar(){
    openSidebarButton.style.display = 'none';
    sidebar.style.display = 'block';

}
function closeSidebar(){
    openSidebarButton.style.display = 'block';
    sidebar.style.display = 'none';

}
openSidebarButton.addEventListener('click', openSidebar);
var map = L.map('map').setView([52.199715, 5.515292], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);


// function onMapClick(e) {
//     alert("U heeft hier op de map geklikt: " + e.latlng);
// }

map.on('click', onMapClick);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("U heeft hier op de map geklikt: " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
map.setView([52.199715, 5.515292], 8);
