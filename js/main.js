document.addEventListener('DOMContentLoaded', () => {
    let systemSolaire = document.getElementById('system-solaire');
    let planets = document.querySelectorAll('.planet');
    
    fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        .then(response => response.json())
        .then(data => {
            data.bodies.filter(body => body.isPlanet).forEach((planet, index) => {
                let planetDiv = document.getElementById(planet.id);
                if (planetDiv) {
                    planetDiv.addEventListener('click', () => {
                        alert(`Nom : ${planet.englishName}\nMasse : ${planet.mass?.massValue} x10^${planet.mass?.massExponent} kg\nDiamètre : ${planet.meanRadius * 2} km\nRotation sidérale : ${planet.sideralRotation || 'N/A'} heures\nOrbites sidérales : ${planet.sideralOrbit || 'N/A'} jours\nDistance moyenne au soleil : ${(planet.semimajorAxis / 1000).toFixed(0) || 'N/A'} km\nGravité : ${planet.gravity || 'N/A'} m/s²\nDensité : ${planet.density || 'N/A'} g/cm³`);
                    });
                }
            });
        });

    // Fonctionnalité de zoom
    let zoomLevel = 1;
    document.body.addEventListener('wheel', event => {
        zoomLevel = event.deltaY > 0 ? Math.min(zoomLevel + 0.1, 2) : Math.max(zoomLevel - 0.1, 0.5);
        systemSolaire.style.transform = `scale(${zoomLevel})`;
    });

    // Fonctionnalité de déplacement
    let isDragging = false;
    let startX, startY;

    systemSolaire.addEventListener('mousedown', event => {
        isDragging = true;
        startX = event.pageX - systemSolaire.offsetLeft;
        startY = event.pageY - systemSolaire.offsetTop;
    });

    systemSolaire.addEventListener('mouseup', () => {
        isDragging = false;
    });

    systemSolaire.addEventListener('mousemove', event => {
        if (isDragging) {
            let x = event.pageX - startX;
            let y = event.pageY - startY;
            systemSolaire.style.left = `${x}px`;
            systemSolaire.style.top = `${y}px`;
        }
    });
});

