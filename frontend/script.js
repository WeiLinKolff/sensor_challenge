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
// function calculateWindChill(T, W) {
//   return 33 + (T - 33) * (0, 474 + 0, (454 * W) ^ 0, 5 - 0, 0454 * W);
// }
// hier onder begint de js van de kaart
var map = L.map("map").setView([51.985406, 5.743262], 10);

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

// map.on("click", onMapClick);
map.panTo([53.277761, 6.636075], 8);

// dit is voor eh casper?
// een for each loop om alle markers te maken
// de markers worden gemaakt op basis van de data in de json file


var ColorIcon = L.Icon.extend({
  options: {
      customId: "",
      shadowUrl: 'img/temp1.png',
      iconSize:     [10, 10],
      shadowSize:   [10, 10],
      iconAnchor:   [10, 10],
      shadowAnchor: [10, 10],
      popupAnchor:  [10, 10]
  }
});

  const Color1 = new ColorIcon({iconUrl: "img/temp2.png"});
  const Color2 = new ColorIcon({iconUrl: "img/temp3.png"});

  const Color3 = new ColorIcon({iconUrl: "img/temp4.png"});

  const Color4 = new ColorIcon({iconUrl: "img/temp5.png"});

  const Color5 = new ColorIcon({iconUrl: "img/temp6.png"});

  const Color6 = new ColorIcon({iconUrl: "img/temp7.png"});

  const Color7 = new ColorIcon({iconUrl: "img/temp8.png"});

  const Color8 = new ColorIcon({iconUrl: "img/temp9.png"});

  const Color9 = new ColorIcon({iconUrl: "img/temp10.png"});

  const Color10 = new ColorIcon({iconUrl: "img/temp11.png"});
  // deze waarden moet later worden aangepast opbasis van gemiddelde temperatuur in de regio
  const localForcast =  8;
  function setMarkerTitle(customId){
    var result = customId;
    
    return result;
}
function createMarkers(minLat, maxLat, minLng, maxLng){
fetch("../backend/output.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      if (
        item.location.indoor === 0 &&
        item.sensordatavalues &&
        item.sensordatavalues.length > 0 && 
        item.location.latitude < maxLat &&
        item.location.latitude > minLat &&
        item.location.longitude > minLng &&
        item.location.longitude < maxLng
      ) {
        const latitude = item.location.latitude;
        const longitude = item.location.longitude;
        const temperatureValue = item.sensordatavalues.find(
          (item) => item.value_type === "temperature"
        );
        if (temperatureValue && temperatureValue.value && latitude < maxLat && latitude > minLat && longitude > minLng && longitude < maxLng) {
          const temperature = parseFloat(temperatureValue.value);
          if (temperature < localForcast - 2) {
            L.marker([latitude, longitude], {icon: Color1, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);;
          } else if (temperature < localForcast -1) {
            L.marker([latitude, longitude], {icon: Color2, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature < localForcast) {
            L.marker([latitude, longitude], {icon: Color3, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast) {
            L.marker([latitude, longitude], {icon: Color4, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 1) {
            L.marker([latitude, longitude], {icon: Color5, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 2) {
            L.marker([latitude, longitude], {icon: Color6, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 3) {
            L.marker([latitude, longitude], {icon: Color7, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 4) {
            L.marker([latitude, longitude], {icon: Color8, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 5) {
            L.marker([latitude, longitude], {icon: Color9, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } else if (temperature > localForcast + 6) {
            L.marker([latitude, longitude], {icon: Color10, myCustomId: temperature.toString(), title: setMarkerTitle(temperature.toString())}).addTo(map);
          } //else{
          //   L.marker([latitude, longitude], {icon: Color10, id: temperature.toString()}).addTo(map);
          // }
          
       
          L.bind;
        } else {
          console.log("Temperature value not found for item:", item);
        }
      } else {
        console.log(
          "Geen buiten sensor or empty sensordatavalues for item:",
          item
        );
      }
    });

    let currentPopup = null; // Variable to keep track of the current popup

    let elements = document.getElementsByClassName("leaflet-interactive");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", showPopup);
    }

    function showPopup(event) {
  //       // Get the clicked marker's latitude and longitude
        const lanLng = event.target.getLatLng();
        const lng = lanLng.lng;
        const lat = lanLng.lat
      
        // Find the data item for the clicked marker
        const item = data.find(
          (item) =>
            item.location.latitude === lat &&
            item.location.longitude === lng
        );
      
        if (item) {
          // Retrieve the temperature value
          const temperatureValue = item.sensordatavalues.find(
            (item) => item.value_type === "temperature"
          );
      
          if (temperatureValue && temperatureValue.value) {
            const temperature = parseFloat(temperatureValue.value);
      
  //           // Set the content of the popup to include the temperature value
            const popupContent = `
              <div class="popup">
                <h4>Temperatuur: ${temperature} &deg;C</h4>
                <p>Oorzaak: ${item.oorzaak}</p>
              </div>
            `;
      
            // Create and open a new popup with the updated content
            const popup = L.popup()
              .setLatLng([latitude, longitude])
              .setContent(popupContent)
              .openOn(map);
      
            // Close the current popup if exists
            if (currentPopup) {
              currentPopup.closePopup();
            }
      
            // Update the current popup variable to the new popup
            currentPopup = popup;
          } else {
            console.log("Temperature value not found for item:", item);
          }
        } else {
          console.log("Data item not found for clicked marker");
        }
      }
      
  })
}

  // average temp in screen

// function getCurrentMapCorners(){
//   let bounds = map.getBounds();
//   let ne = bounds.getNorthEast();
//   let sw = bounds.getSouthWest();
//   let mapCorners = ne;
//   return(mapCorners);
// }
// let corner = getCurrentMapCorners();
// console.log(corner);
// // function getDataFromScreen(mapCornerNE, mapCornerSW){
  
// // }

let previousBounds = null;
map.on('moveend', function() {
  let bounds = map.getBounds();
  
  let northEast = bounds.getNorthEast(); // returns the northeast corner coordinates
  let southWest = bounds.getSouthWest(); // returns the southwest corner coordinates
  createMarkers(southWest.lat, northEast.lat, southWest.lng, northEast.lng);
  let markers = document.getElementsByClassName("leaflet-marker-icon");
  const popupText = document.getElementById('popupText')
  for(let i = 0; i < markers.length; i++){
    markers[i].on('click', function() {
      popupText.innerText = ""
    });
  }
  
});