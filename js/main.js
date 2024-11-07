document.addEventListener('DOMContentLoaded', () => {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        planet.addEventListener('click', () => {
            alert(`Clicked on ${planet.id}`);
            // Here, you can fetch and display information about the planet
        });
    });

    let zoomLevel = 1;
    document.body.addEventListener('wheel', event => {
        if (event.deltaY > 0) {
            zoomLevel = Math.min(zoomLevel + 0.1, 2); // Zoom in
        } else {
            zoomLevel = Math.max(zoomLevel - 0.1, 0.5); // Zoom out
        }
        document.getElementById('solar-system').style.transform = `scale(${zoomLevel})`;
    });

    let isDragging = false;
    let startX, startY;
    let system = document.getElementById('solar-system');

    system.addEventListener('mousedown', event => {
        isDragging = true;
        startX = event.pageX - system.offsetLeft;
        startY = event.pageY - system.offsetTop;
    });

    system.addEventListener('mouseup', () => {
        isDragging = false;
    });

    system.addEventListener('mousemove', event => {
        if (isDragging) {
            let x = event.pageX - startX;
            let y = event.pageY - startY;
            system.style.left = `${x}px`;
            system.style.top = `${y}px`;
        }
    });
});
