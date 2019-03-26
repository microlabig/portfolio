/* //параллакс экрана budda

const paralax = document.querySelector('.parallax--budda');
const layers = paralax.children;

function moveLayersDependOnScroll(wScroll) {
    Array.from(layers).forEach(layer => {
        let divider = layer.dataset.speed;
        
        if (divider == 0.2) {    // увеличим скорость шара        
            divider = 3;            
        }

        const strafe = wScroll * divider / 37; // strafe - разнести              

        if (divider < 0.6 || divider >= 2) { // не фон и не передние облака
            layer.style.transform = `translateY(-${strafe}%)`;
        }        
    });    
}

window.addEventListener('scroll', e=> {    
    const wScroll = window.pageYOffset; // смещение по скролу
    moveLayersDependOnScroll(wScroll);
}); */

/*
// Навигация по точкам
(function () {   
    // показывать/скрывать Состав в секции Бургер
    let compositionVisible = () => {
        let btnComposition = $('.burgers__composition-btn-block');

        btnComposition.on({
            mouseenter() {
                $(this).addClass("active");
            },
            mouseleave() {
                $(this).removeClass("active");
            }
        });

        $(".burgers__charakter-cross").on("click touchstart", e => {
            e.preventDefault();
            btnComposition.removeClass("active");
        });
    };
    compositionVisible();
})();

*/

const budda = document.querySelector('.parallax--budda');
const layers = budda.children;

let Is_active = false;

window.addEventListener('mouseover', e=> {
    //console.log(event.target.className);
      if (event.target.className == "parallax--budda") {
          console.log(1);
          
      }
});