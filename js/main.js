document.addEventListener('DOMContentLoaded', () => {
    let planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            alert(`Clicked on ${planet.id}`);
            
        });
    });

    let zoomLevel = 1;
    document.body.addEventListener('wheel', event => {
        if (event.deltaY > 0) {
            zoomLevel = Math.min(zoomLevel + 0.1, 2);
        } else {
            zoomLevel = Math.max(zoomLevel - 0.1, 0.5); 
        }
        document.getElementById('solar-system').style.transform = `scale(${zoomLevel})`;
    });

    let trainer = false;
    let startX, startY;
    let system = document.getElementById('solar-system');

    system.addEventListener('mousedown', event => {
        trainer = true;
        startX = event.pageX - system.offsetLeft;
        startY = event.pageY - system.offsetTop;
    });

    system.addEventListener('mouseup', () => {
        trainer = false;
    });

    system.addEventListener('mousemove', event => {
        if (trainer) {
            let x = event.pageX - startX;
            let y = event.pageY - startY;
            system.style.left = `${x}px`;
            system.style.top = `${y}px`;
        }
    });
});
