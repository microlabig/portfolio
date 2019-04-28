import { animatedElements } from './scroll-objects';

/*
    Для включения анимации отредактируйте файлы:
    1) ./scripts/scroll.js (добавление секций в switch case, sectionLength (общее число секций)
    2) ./style/blocks/opacityZero.pcss (для включения элемента в opacity 0)
    3) ./scripts/scrollObjects.js (список анимируемых объектов)
*/


const DELAY_ANIMATION = 300; // задержка анимации

// создадим список элементов, для которых будем запускать их анимацию
const sectionText = 'section';
const sectionLength = 6; // общее число секций
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


function startAnimation(items, animationClass, options) {
  var arr = [...items];
  var counter = 0;
  var animationElement = animationClass;
  //var options = setup;

  function doAnimation(element) {
    return new Promise(resolve => {
      setTimeout(e => {
        if (element) {
          element.classList.add(animationElement);
          element.addEventListener('animationend', function () {
            //element.classList.remove('opacityZero');
            element.style.opacity = 1;
          });
        }
        resolve();
      }, DELAY_ANIMATION);
    });
  }

  (function _f() {
    var elem = arr[0];

    if (counter <= options.length - 1) animationElement = options[counter].animation;

    if (arr.length > 0) {
      doAnimation(elem).then(() => {
        _f();
      });
      counter++;
      arr.shift();
    }
  })();
}

function scrolling(e) {
  let currentSection = 0;
  let currentArr = [];
  let currentElements = [];

  sections.forEach((section,index) => {
     let currSectionFully = 1;

    if (isPartiallyVisible(section)) {

      animatedElements[currentSection].forEach(element => {
        currentArr.push(element);
      });
      currentArr.forEach(element => {
        const el = section.querySelector(element);
        currentElements.push(el);
      });

      switch (currentSection) {
        // section_1 hero            
        case 0:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'slideInLeft'
            },
            {
              animation: 'slideInRight'
            },
            {
              animation: 'slideInUp'
            },
            {
              animation: 'slideInDown'
            }
          ]);
          break;

        // section_2 about
        case 1:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'fadeInDown'
            },
            {
              animation: 'slideInLeft'
            },
            {
              animation: 'fadeInDown'
            }
          ]);
          break;

        // section_3 useful
        case 2:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'slideInUp'
            },
            {
              animation: 'slideInRight'
            }
          ]);
          break;

        // section_4 work
        case 3:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'slideInLeft'
            },
            {
              animation: 'fadeInDown'
            },
            {
              animation: 'slideInLeft'
            }
          ]);
          break;

        // section_5 review
        case 4:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'slideInLeft'
            },
            {
              animation: 'slideInUp'
            }
          ]);
          break;

        // section_6 feedback
        case 5:
          startAnimation(currentElements, 'slideInLeft', [
            {
              animation: 'fadeInDown'
            },
            {
              animation: 'slideInLeft'
            }
          ]);
          break;
      }
      currentArr.length = 0;
      currentElements.length = 0;   
    }
    currentSection++;

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
//}

