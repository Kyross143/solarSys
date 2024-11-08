                    /* ca cest les variables*/
    let systemSolaire = document.getElementById('system-solaire');
    let fullscreenBtn = document.getElementById('fullscreen-btn');
    let explosionBtn = document.getElementById('explosion-btn');
    let modal = document.getElementById('modal');
    let modalContent = document.getElementById('modal-content');
    let explosionImagesDiv = document.getElementById('explosion-images');
    let planets = document.querySelectorAll('.planet');
    let ecraserBtn = document.getElementById('ecraser-btn');
    
    
        /* la cest pour laffichage des nom des planetes*/
    planets.forEach(planet => {
        
        let nameSpan = document.createElement('span');
        nameSpan.classList.add('planet-name');

        nameSpan.textContent = planet.getAttribute('data-nom');

        planet.appendChild(nameSpan);
    });
    /* la Hamidou voulait ecraser le syteme solaire jsai pâs trop pk il est bizzare il aime tout nikker*/
    ecraserBtn.onclick = () => {
        planets.forEach(planet => {
            planet.style.display = "";
        });
    };
    /* jai voulut faire une animation j'ai pas reussi*/
    explosionBtn.addEventListener('click', () => {
        
            document.querySelectorAll('.planet').forEach((planet, index) => {
                planet.style.setProperty('--x', Math.random() * 200 - 100);
                planet.style.setProperty('--y', Math.random() * 200 - 100);
                planet.classList.add('explode');
            });

            explosionImagesDiv.classList.remove('info-hidden');
            explosionImagesDiv.classList.add('info-visible');
        });
    /* la il est les appel pour API et un systeme de zoom quand on clique mais ca ne marche pas lol*/
    fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        .then(response => response.json())
        .then(data => {
            
            data.bodies.filter(body => body.isPlanet).forEach((planet) => {
                let planetDiv = document.getElementById(planet.id);
                if (planetDiv) {
                    planetDiv.addEventListener('click', () => {
                        
                        document.querySelectorAll('.planet').forEach(p => p.classList.remove('zoomed'));
                        planetDiv.classList.add('zoomed');

                        modalContent.innerHTML = `
                            <h3>${planet.englishName}</h3>
                            <p>Masse : ${planet.mass?.massValue} x10^${planet.mass?.massExponent} kg</p>
                            <p>Diamètre : ${planet.meanRadius * 2} km</p>
                            <p>Rotation sidérale : ${planet.sideralRotation || 'N/A'} heures</p>
                            <p>Orbites sidérales : ${planet.sideralOrbit || 'N/A'} jours</p>
                            <p>Distance moyenne au soleil : ${(planet.semimajorAxis / 1000).toFixed(0) || 'N/A'} km</p>
                            <p>Gravité : ${planet.gravity || 'N/A'} m/s²</p>
                            <p>Densité : ${planet.density || 'N/A'} g/cm³</p>
                            <button id="close-btn">Fermer</button>
                        `;
                        modal.style.display = 'flex';

                        document.getElementById('close-btn').addEventListener('click', () => {
                            
                            modal.style.display = 'none';
                            document.querySelectorAll('.planet').forEach(p => p.classList.remove('zoomed'));
                        });
                    });
                }
            });
        });

    
/* la jai mis un zoom sur les planetes*/
    let zoomLevel = 1;
    document.body.addEventListener('wheel', event => {
        zoomLevel = event.deltaY > 0 ? Math.min(zoomLevel + 0.1, 2) : Math.max(zoomLevel - 0.1, 0.5);
        systemSolaire.style.transform = `scale(${zoomLevel})`;
    });

    let isDragging = false;
    let startX, startY;
/* la cest le systeme de zoom arriere*/
    systemSolaire.addEventListener('mousedown', event => {
        isDragging = true;
        startX = event.pageX - systemSolaire.offsetLeft;
        startY = event.pageY - systemSolaire.offsetTop;
    });
/* la cest le systeme de zoom avant */
    systemSolaire.addEventListener('mouseup', () => {
        isDragging = false;
    });
/* la jai mis un flex sans flex en gros on clique dessu et on peut depositionner ou on veut */
    /* systemSolaire.addEventListener('mousemove', event => {
        if (isDragging) {
            let x = event.pageX - startX;
            let y = event.pageY - startY;
            systemSolaire.style.left = `${x}px`;
            systemSolaire.style.top = `${y}px`;
        }
    }); */
/* la jai mis un systeme de plein ecran dommage que le background ne reste pas */
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            systemSolaire.requestFullscreen().catch(err => {
                alert(`Erreur, impossible d'activer le mode plein écran: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });


document.addEventListener('DOMContentLoaded', () => {

});
