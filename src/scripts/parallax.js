;(function () {
    //параллакс экрана hero

    const paralax = document.querySelector('.parallax');
    const layers = paralax.children;

    function moveLayersDependOnScroll(wScroll) {
        Array.from(layers).forEach(layer => {
            let divider = layer.dataset.speed;

            if (divider == 0.2) {    // увеличим скорость шара        
                divider = 3;
            }
            if (divider == 0.4) {    // уменьшим скорость человека        
                divider = 0.2;
            }

            const strafe = wScroll * divider / 35; // strafe - разнести  

            if ((divider < 0.6 || divider >= 2) && divider != 0.4) { // не фон и не передние облака
                layer.style.transform = `translateY(-${strafe}%)`;
            }

            /* if ((divider < 0.6 || divider >= 2) && divider!= 0.4) { // не фон и не передние облака
                layer.style.transform = `translateY(-${strafe}%)`;
            }    */
        });
    }

    window.addEventListener('scroll', e => {
        const wScroll = window.pageYOffset; // смещение по скролу
        moveLayersDependOnScroll(wScroll);
    });
})();
