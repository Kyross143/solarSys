// Fonction pour obtenir les données des planètes
function getPlanets() {
  const url = "https://api.le-systeme-solaire.net/rest/bodies/";

  // Faire la requête pour obtenir les données
  fetch(url)
      .then(response => {
          // Vérifie que la réponse est correcte
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

              // Utiliser innerHTML pour afficher les informations de chaque planète
              planets.forEach(planet => {
                  planetList.innerHTML += `
                      <div class="planet">
                          <h3>Nom : ${planet.englishName}</h3>
                          <p>Masse : ${planet.mass?.massValue} x10^${planet.mass?.massExponent} kg</p>
                          <p>Diamètre : ${planet.meanRadius * 2} km</p>
                      </div>
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
