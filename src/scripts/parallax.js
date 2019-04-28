;(function () {
    //параллакс экрана hero

    const paralax = document.querySelector('.parallax');
    const layers = paralax.children;

    let opacityLayer = 1;

    function moveLayersDependOnScroll(wScroll) {
        Array.from(layers).forEach(layer => {
            let divider = layer.dataset.speed;
            

            if (divider == 0.2) {    // увеличим скорость шара        
                divider = 5;
            }
            if (divider == 0.3) {    // увеличим скорость облаков м/у человеком и шаром        
                divider = 2; 
            }
            if (divider == 0.4) {    // уменьшим скорость человека        
                divider = 0.2;
            }

            const strafe = wScroll * divider / 35; // strafe - разнести  

            if ((divider < 0.6 || divider >= 2) && divider != 0.4) { // не фон и не передние облака
                layer.style.transform = `translateY(-${strafe}%)`;
            }
            
            if (divider == 2) { // облака м/у человеком и шаром (==2 - изменили выше на 16 строке)
                //if (opacityLayer > 0) {
                    layer.style.opacity = opacityLayer;
                    opacityLayer = 1 - window.pageYOffset*100/500/100; // 100 - 100%, 500 - 500px (на сколько прокрутить чтобы облака стали невидимыми), 100- 0..1                               
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
