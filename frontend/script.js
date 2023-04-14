// dit is voor de sidebar
const openSidebarButton = document.getElementById("sidebarShow");
const sidebar = document.getElementById("sidebar");
function openSidebar() {
  openSidebarButton.innerHTML = '<i class="fa fa-arrow-left"></i>';
  sidebar.style.display = "block";
}
function closeSidebar() {
  openSidebarButton.innerHTML = "<i class='fa fa-arrow-right'>";
  sidebar.style.display = "none";
}
function sidebarToggle() {
  if (sidebar.style.display == "none") {
    openSidebar();
  } else {
    closeSidebar();
  }
}

openSidebarButton.addEventListener("click", sidebarToggle);
// gevoel temperatuur
function calculateWindChill(T, W) {
  return 33 + (T - 33) * (0, 474 + 0, (454 * W) ^ 0, 5 - 0, 0454 * W);
}
// hier onder begint de js van de kaart
var map = L.map("map").setView([52.199, 5.515], 8);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
).addTo(map);

map.on("click", onMapClick);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("U heeft hier op de map geklikt: " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
map.panTo([53.277761, 6.636075], 8);

// dit is voor eh casper?
// een for each loop om alle markers te maken
// de markers worden gemaakt op basis van de data in de json file


// data.forEach(function (element) {
//     const temperature = element.sensordatavalues.find(function (value) {
//         return value.value_type === 'temperature';
//     }).value;
//     const latitude = element.location.latitude;
//     const longitude = element.location.longitude;
//     console.log(`Temperature: ${temperature}, Latitude: ${latitude}, Longitude: ${longitude}`);
// });



var pin = L.icon({
  iconUrl: "pin.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});




fetch("../backend/output.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      if (item.location.indoor === 0) {
        const latitude = item.location.latitude;
        const longitude = item.location.longitude;
        const temperatureValue = item.sensordatavalues.filter(item => item.value_type === "temperature"); 
        // if(temperatureValue < 5) {
            var DynamicColor = "1D3354";
        // }
        L.circle([latitude, longitude], { radius: 200, color: DynamicColor }).addTo(map);
      }

      else {
        console.log("geen buiten sensor");
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });
