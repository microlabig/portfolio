;(function () {
    const wrapper = document.body; // querySelector('.wrappersections--end');
    const buddaWrapper = document.querySelector('.parallax--budda');
    const layers = buddaWrapper.children;
    const center = { // центр секции
        x:Math.round(wrapper.clientWidth/2),
        y:Math.round(wrapper.clientHeight/2)
    };
    const K = 50; // коэффициент смещения параллакса

    let Is_active = false; // для определения нахождения курсора мыши на секции wrapper с буддой

    // если курсор наведен на wrapper
    wrapper.addEventListener('mouseenter', e=> {
        Is_active = true;
    });
    // если курсор убрали c wrapper
    wrapper.addEventListener('mouseleave', e=> {
        Is_active = false;
    });

    // если курсор наведен на wrapper то делаем парралакс с буддой
    wrapper.addEventListener('mousemove', e=> {
        if (Is_active) {
            let divider = 0, // делитель (значение атрибута data-set слоя)
                currPos = { // текущая позиция курсора
                    x:0,
                    y:0
                },
                strafe = { // для смещения
                    x:0,
                    y:0
                }
                        
            for (let i=0; i<layers.length; i++) {
                if (i===2 || i===5 || i===6) { // 1 - горы, 2 - будда, 5 - облако под формой, 6 - облако слева от будды
                    currPos.x = e.clientX;
                    currPos.y = e.clientY;
                    divider = layers[i].dataset.speed;

                    if (divider == 0.1) {    // уменьшим скорость гор        
                        divider = 0.04;            
                    }       

                    strafe.x = (center.x - currPos.x) * divider / K;
                    strafe.y = (center.y - currPos.y) * divider / K;

                    layers[i].style.transform = `translate(${strafe.x}%,${strafe.y}%)`;
                }
            }        
        }
    });
})();