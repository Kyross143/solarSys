
// Fonction pour afficher/masquer le tableau
function togglePlanetTable() {
  const table = document.getElementById("planetTable");
  const button = document.getElementById("toggleButton");

  // Vérifie la classe pour déterminer la visibilité actuelle
  if (table.classList.contains("d-none")) {
      table.classList.remove("d-none"); // Affiche le tableau
      button.textContent = "Masquer les informations des planètes";
      getPlanets(); // Charge les données des planètes
  } else {
      table.classList.add("d-none"); // Cache le tableau
      button.textContent = "Afficher les informations des planètes";
  }
}

// Ajoute un écouteur d'événement au bouton pour basculer la visibilité du tableau
document.getElementById("toggleButton").addEventListener("click", togglePlanetTable);

// Fonction pour obtenir les données des planètes
function getPlanets() {
  const url = "https://api.le-systeme-solaire.net/rest/bodies/";

  // Faire la requête pour obtenir les données
  fetch(url)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              console.log("Erreur de requête :", response.status);
              return null;
          }
      })
      .then(data => {
          if (data) {
              // Filtrer uniquement les planètes sans utiliser .filter()
              const planets = [];
              for (let i = 0; i < data.bodies.length; i++) {
                  const body = data.bodies[i];
                  if (body.isPlanet) {
                      planets.push(body);
                  }
              }

              // Obtenir l'élément où on va afficher les informations
              const planetList = document.getElementById("planet-list");
              planetList.innerHTML = ""; // Vider le contenu existant

              // Afficher chaque planète sous forme de ligne de tableau
              planets.forEach(planet => {
                  planetList.innerHTML += `
                      <tr>
                          <td>${planet.englishName}</td>
                          <td>${planet.mass?.massValue || 'N/A'} x10^${planet.mass?.massExponent || ''}</td>
                          <td>${(planet.meanRadius * 2).toFixed(2)} km</td>
                          <td>${planet.sideralRotation || 'N/A'}</td>
                          <td>${planet.sideralOrbit || 'N/A'}</td>
                          <td>${(planet.semimajorAxis / 1000).toFixed(0) || 'N/A'} km</td>
                          <td>${planet.gravity || 'N/A'} m/s²</td>
                          <td>${planet.density || 'N/A'} g/cm³</td>
                      </tr>
                  `;
              });
          } else {
              console.log("Aucune donnée n'a été reçue.");
          }
      })
      .catch(error => {
          console.log("Erreur lors de la récupération des données :", error);
      });
}

// Appeler la fonction pour afficher les planètes
getPlanets();

// je vais un autre fetch pour afficher les information du soleil 




