/*
  Для подготовки css:
  1) Из PCSS/SCSS в css: http://beautifytools.com/scss-compiler.php
  2) css -> autoprefixer: https://autoprefixer.github.io/ru/
  3) Добавить в текущую папку с проектом получившееся содержимое в виде файла [name].mcss
  P.S. по идее, лучше получать стили также как шаблон html ниже (быстрее получится)
  
  Для загрузки HTML использем загрузку шаблона напрямую из скрипта

  Для добавления прелоадера на страницу был добавлен специальный pug-миксин async_script,
  который следует разместить сразу после body
*/
// задержка перед удалением прелоадера
const DELAY = 1000;

// находим head документ
const head = document.head || document.getElementsByTagName("head")[0];
// находис body
const body = document.body;
// прелоадер
let preloader = null;
// скрипт прелоадера
let preloaderScript = null;

console.log("PRELOADER START");
//--------------------------------------
//        Отрисовка прелоадера
//--------------------------------------
// загружаем стили
fetch("./async/preloader.mcss")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    // получаем стили
    const css = text;
    // шаблон HTML
    const templatePreloaderHTML = `
      <div class="preloader__back">
        <div class="preloader__left"></div>
        <div class="preloader__right"></div>
      </div>
      <div class="preloader__loader">
        <div class="preloader__inner one"></div>
        <div class="preloader__inner two"></div>
        <div class="preloader__inner three"></div>
      </div>
    `;

    // создаем элемент style
    const style = document.createElement("style");

    // определяем первый дочерний элемент - скрипт прелоадера
    preloaderScript = body.querySelector("#preloader_script");
    // создаем элемент с прелоадером
    preloader = document.createElement("div");
    // заполняем атрибутами и необходимым html
    preloader.setAttribute("id", "preloader");
    preloader.classList.add("preloader");
    preloader.innerHTML = templatePreloaderHTML;
    // вставляем прелоадер перед первым дочерним элементом body (скриптом прелоадера)
    body.style.overflow = "hidden";
    body.insertBefore(preloader, preloaderScript);
    style.type = "text/css";
    // добавляем элемент style в head
    head.appendChild(style);
    // добавляем тест полученного css в style
    if (style.styleSheet) {
      style.styleSheet.cssText = css; // This is required for IE8 and below.
    } else {
      style.appendChild(document.createTextNode(css));
    }
  })
  .catch(console.error);

//--------------------------------------
//    Слежение за загрузкой страницы
//--------------------------------------
// добавис обработчик по завершению
// загрузки страницы + небольшое время (DELAY)
// добавляется сразу
window.addEventListener("load", () => {
  setTimeout(() => {
    // найдем крутящийся лоадер
    const loader = preloader.querySelector(".preloader__loader");

    body.style.overflow = "auto";
    // запустим анимацию удаления прелоадера
    if (!preloader.classList.contains("hide")) {
      preloader.classList.add("hide");
    }
    // по завершению анимации
    loader.addEventListener("transitionend", () => {
      console.log("PRELOADER END");
      // удалим прелоадер из DOM-дерева
      body.removeChild(preloader);
      body.removeChild(preloaderScript);
    });
  }, DELAY);
});
