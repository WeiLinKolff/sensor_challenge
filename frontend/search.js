
fetch('127.0.0.1:8080/shadespotSearch.json')
    .then((response) => response.json())
    .then((json) =>  DATA = json);

//  function search(event) {
//     event.preventDefault(); // voorkomt dat het formulier wordt verzonden
  
//     const input = document.getElementById("search-bar").value.toLowerCase();
  
//     const results = searchData.filter(obj =>
//       Object.values(obj).some(val =>
//         typeof val === "string" && val.toLowerCase().includes(input)
//       )
//     );
  
//     const resultContainer = document.getElementById("results");
//     resultContainer.innerHTML = "";
  
//     if (results.length > 0) {
//       const resultList = document.createElement("ul");
//       results.forEach(obj => {
//         const listItem = document.createElement("li");
//         listItem.textContent = `${obj.name} (${obj.age})`;
//         resultList.appendChild(listItem);
//       });
//       resultContainer.appendChild(resultList);
//     } else {
//       resultContainer.textContent = "Geen resultaten gevonden.";
//     }
//   }