/* -------------------------------

    Скролл к определенной секции и ее анимация
    http://webupblog.ru/animatsiya-pri-prokrutke-stranitsy-na-javascript-i-css/

   ------------------------------- */

// Определение частично видимых элементов
/* 
В качестве аргумента функции нам необходимо передать элемент. Если элемент частично видимый, 
функция вернет true. Иначе, функция вернет false.
*/
function isPartiallyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;
    let height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

// Определение полностью видимых элементов
/* 
Данная функция работает аналогично к isPartiallyVisible функции, которая была описана ранее. 
Если элемент определился, как полностью видимый, то функция isFullyVisible вернет значение true, 
если же данный элемент оказался частично видимым для пользователя, то наша функция вернет значение false.
*/
function isFullyVisible(el) {
    let elementBoundary = el.getBoundingClientRect();

    let top = elementBoundary.top;
    let bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}

// создадим список элементов, для которых будем запускать их анимацию
const sectionText = 'section';
const sectionLength = 6;
const sectionId = [];
const sections = [];

// собрал ID всех секций
for (let i = 1; i <= sectionLength; i++) {
    sectionId.push(sectionText + '_' + i);
}
// собрал все секции по их id в один массив
sectionId.forEach(id => {
    const s = document.getElementById(id);
    sections.push(s);
});


let isScrolling = false;

// вызовем throttleScroll - 
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling == false) {
        /*
        window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести анимацию, 
        и просит его запланировать перерисовку на следующем кадре анимации. 
        В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
        
        Вы должны вызывать этот метод всякий раз, когда готовы обновить анимацию на экране, 
        чтобы запросить планирование анимации. В большинстве браузеров в фоновых вкладках или 
        скрытых <iframe>, вызовы requestAnimationFrame() приостанавливаются, для того чтобы 
        повысить производительность и время работы батареи.
        Callback метод будет вызван с единственным аргументом, содержащим время, на которое 
        запланирована анимация.
        */
        window.requestAnimationFrame(function () { // привязать данные параметры к частоте обновления кадров страницы
            scrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

// если документ загружен то также выховим функцию scrolling
document.addEventListener("DOMContentLoaded", scrolling, false);

function scrolling(e) {
    sections.forEach(s => {
        if (isFullyVisible(s)) {
            s.classList.add('slideInLeft');
        }
    });    
}

/* document.addEventListener("DOMContentLoaded", scrolling, false);
sections.forEach(s => {
        if (isFullyVisible(s)) {
            console.log(s);
        }
    });
function scrolling(e) {

    if (isPartiallyVisible(firstBox)) {
      firstBox.classList.add("active");

      document.body.classList.add("colorOne");
      document.body.classList.remove("colorTwo");
    } else {
      document.body.classList.remove("colorOne");
      document.body.classList.remove("colorTwo");
    }

    if (isFullyVisible(secondBox)) {
      secondBox.classList.add("active");

      document.body.classList.add("colorTwo");
      document.body.classList.remove("colorOne");
    }

    for (var i = 0; i < listItems.length; i++) {
      var listItem = listItems[i];

      if (isPartiallyVisible(listItem)) {
        listItem.classList.add("active");
      } else {
        listItem.classList.remove("active");
      }
    }
  }
 */