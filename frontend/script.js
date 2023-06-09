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
var map = L.map("map").setView([52.199, 5.515], 8);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
).addTo(map);

// map.on("click", onMapClick);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("U heeft hier op de map geklikt: " + e.latlng.toString())
//         .openOn(map);
// }

// map.on("click", onMapClick);
map.panTo([53.277761, 6.636075], 8);

// dit is voor eh casper?
// een for each loop om alle markers te maken
// de markers worden gemaakt op basis van de data in de json file

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
      if (
        item.location.indoor === 0 &&
        item.sensordatavalues &&
        item.sensordatavalues.length > 0
      ) {
        const latitude = item.location.latitude;
        const longitude = item.location.longitude;
        const temperatureValue = item.sensordatavalues.find(
          (item) => item.value_type === "temperature"
        );
        if (temperatureValue && temperatureValue.value) {
          const temperature = parseFloat(temperatureValue.value);
          if (temperature < 0) {
            var DynamicColor = "#1D3354";
          } else if (temperature > 3) {
            var DynamicColor = "#0008FF";
          } else if (temperature > 6) {
            var DynamicColor = "#2007E1";
          } else if (temperature > 9) {
            var DynamicColor = "#4006C2";
          } else if (temperature > 12) {
            var DynamicColor = "#6005A3";
          } else if (temperature > 15) {
            var DynamicColor = "#800484";
          } else if (temperature > 18) {
            var DynamicColor = "#A00365";
          } else if (temperature > 21) {
            var DynamicColor = "#C00246";
          } else if (temperature > 24) {
            var DynamicColor = "#E00127";
          } else if (temperature > 27) {
            var DynamicColor = "#FF0008";
          }

          L.circle([latitude, longitude], {
            radius: 200,
            color: DynamicColor,
            className: "sensorMarker",
          }).addTo(map);
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
        // Get the clicked marker's latitude and longitude
        const latitude = event.target._latlng.lat;
        const longitude = event.target._latlng.lng;
      
        // Find the data item for the clicked marker
        const item = data.find(
          (item) =>
            item.location.latitude === latitude &&
            item.location.longitude === longitude
        );
      
        if (item) {
          // Retrieve the temperature value
          const temperatureValue = item.sensordatavalues.find(
            (item) => item.value_type === "temperature"
          );
      
          if (temperatureValue && temperatureValue.value) {
            const temperature = parseFloat(temperatureValue.value);
      
            // Set the content of the popup to include the temperature value
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
      
  });


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
const allSensors = document.getElementsByClassName('sensorMarker');
function setId(){
  for(let i = 0; i < allSensors.length(); i++){
    allSensors[i].id = i.toString();
    
  }
}
setId();