// dit is voor de sidebar
const openSidebarButton = document.getElementById('sidebarShow');
const sidebar = document.getElementById('sidebar');
function openSidebar(){
    openSidebarButton.innerHTML = '<i class="fa fa-arrow-left"></i>'
    sidebar.style.display = 'block';

}
function closeSidebar(){
    openSidebarButton.innerHTML = "<i class='fa fa-arrow-right'>"
    sidebar.style.display = 'none'

}
function sidebarToggle(){
    if (sidebar.style.display == 'none') {
        openSidebar();
    } else{
        closeSidebar();
    }
}

openSidebarButton.addEventListener('click', sidebarToggle);

// hier onder begint de js van de kaart
var map = L.map('map').setView([52.199, 5.515], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);



map.on('click', onMapClick);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("U heeft hier op de map geklikt: " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
map.panTo([53.277761, 6.636075], 8);
