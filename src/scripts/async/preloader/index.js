/*
  Для подготовки css:
  1) Из PCSS/SCSS в css: http://beautifytools.com/scss-compiler.php
  2) css -> autoprefixer: https://autoprefixer.github.io/ru/
  3) Добавить в текущую папку с проектом получившееся содержимое в виде файла [name].mcss
  P.S. по идее, лучше получать стили также как шаблон html ниже (быстрее получится и не будет различных "дерганей" вначале загрузки)
  
  Для загрузки HTML использем загрузку шаблона напрямую из скрипта

  Для добавления прелоадера на страницу был добавлен специальный pug-миксин async_script,
  который следует разместить сразу после meta в head (или перед данным скриптом)
*/
(() => {
  // задержка перед удалением прелоадера
  const DELAY = 1000;
  // id скрипта прелоадера
  const PRELOADER_SCRIPT_ID = "#preloader-script";
  // класс крутилки
  const PRELOADER_LOADER_CLASS = ".preloader__loader";

  // находим head документ
  const head = document.head || document.getElementsByTagName("head")[0];
  // находис body
  const body = document.body;
  // прелоадер
  let preloader = null;

  // уберем прокрутки и добавим некоторые стили к body
  body.style = `
  position: relative;
  height: 100%;
  overflow: hidden;
`;

  //--------------------------------------
  //        Отрисовка прелоадера
  //--------------------------------------
  // загружаем стили
  // fetch("./async/preloader.mcss")
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then((text) => {
  // получаем стили
  //const css = text;
    // получаем стили (здесь вбиваем вручную получившийся css после обработки webpack build), чтобы не отображадись картинки вначале загрузки страницы 
    const css = `#preloader{position:absolute;left:0;top:0;width:100vw;height:100vh;z-index:100;overflow:hidden}.preloader.hide .preloader__left{opacity:0;visibility:hidden;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.preloader.hide .preloader__right{opacity:0;visibility:hidden;-webkit-transform:translateX(200%);transform:translateX(200%)}.preloader.hide .preloader__loader{opacity:0;visibility:visible}.preloader__left,.preloader__right{position:absolute;background:#fff;width:50%;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(0);transform:translateX(0);opacity:1;visibility:visible;-webkit-transition:all .7s ease-out;transition:all .7s ease-out}.preloader__right{-webkit-transform:translateX(100%);transform:translateX(100%)}.preloader__loader{position:relative;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:6.25rem;height:6.25rem;-webkit-perspective:48.75rem;perspective:48.75rem;opacity:1;visibility:visible;-webkit-transition:opacity .7s ease-out;transition:opacity .7s ease-out}.preloader__inner{position:absolute;display:block;width:100%;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50%}.preloader__inner.one{left:0;top:0;-webkit-animation:rotateOne 1.15s linear infinite;animation:rotateOne 1.15s linear infinite;border-bottom:3px solid #5c5edc}.preloader__inner.two{right:0;top:0;-webkit-animation:rotateTwo 1.15s linear infinite;animation:rotateTwo 1.15s linear infinite;border-right:3px solid #ad00ed}.preloader__inner.three{right:0;bottom:0;-webkit-animation:rotateThree 1.15s linear infinite;animation:rotateThree 1.15s linear infinite;border-top:3px solid #b13333}@-webkit-keyframes rotateOne{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotate(0deg);transform:rotateX(35deg) rotateY(-45deg) rotate(0deg)}to{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotate(1turn);transform:rotateX(35deg) rotateY(-45deg) rotate(1turn)}}@keyframes rotateOne{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotate(0deg);transform:rotateX(35deg) rotateY(-45deg) rotate(0deg)}to{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotate(1turn);transform:rotateX(35deg) rotateY(-45deg) rotate(1turn)}}@-webkit-keyframes rotateTwo{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotate(0deg);transform:rotateX(50deg) rotateY(10deg) rotate(0deg)}to{-webkit-transform:rotateX(50deg) rotateY(10deg) rotate(1turn);transform:rotateX(50deg) rotateY(10deg) rotate(1turn)}}@keyframes rotateTwo{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotate(0deg);transform:rotateX(50deg) rotateY(10deg) rotate(0deg)}to{-webkit-transform:rotateX(50deg) rotateY(10deg) rotate(1turn);transform:rotateX(50deg) rotateY(10deg) rotate(1turn)}}@-webkit-keyframes rotateThree{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotate(0deg);transform:rotateX(35deg) rotateY(55deg) rotate(0deg)}to{-webkit-transform:rotateX(35deg) rotateY(55deg) rotate(1turn);transform:rotateX(35deg) rotateY(55deg) rotate(1turn)}}@keyframes rotateThree{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotate(0deg);transform:rotateX(35deg) rotateY(55deg) rotate(0deg)}to{-webkit-transform:rotateX(35deg) rotateY(55deg) rotate(1turn);transform:rotateX(35deg) rotateY(55deg) rotate(1turn)}}`;
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
    const preloaderScript = document.querySelector(PRELOADER_SCRIPT_ID);

    // определяем первый дочерний элемент - скрипт прелоадера
    firstElementChild = body.firstElementChild; //querySelector("#preloader_script");
    // создаем элемент с прелоадером
    preloader = document.createElement("div");
    // заполняем атрибутами и необходимым html
    preloader.setAttribute("id", "preloader");
    preloader.classList.add("preloader");
    preloader.innerHTML = templatePreloaderHTML;

    body.insertBefore(preloader, firstElementChild);
    // вставим стили прелоадера
    style.type = "text/css";
    // добавляем элемент style в head перед аснхронным скриптом
    head.insertBefore(style, preloaderScript);
    // добавляем тест полученного css в style
    if (style.styleSheet) {
      style.styleSheet.cssText = css; // This is required for IE8 and below.
    } else {
      style.appendChild(document.createTextNode(css));
    }
    // передвинем страницу наверх
    window.scrollTo(0, 0);
    console.log("PRELOADER START");
  // })
  // .catch(console.error);

  //--------------------------------------
  //    Слежение за загрузкой страницы
  //--------------------------------------
  // добавим обработчик (добавляется сразу) по завершению
  // загрузки страницы + небольшое время (DELAY)
  window.addEventListener("load", () => {
    setTimeout(() => {
      // найдем крутящийся лоадер
      const loader = preloader.querySelector(PRELOADER_LOADER_CLASS);
      // вернем вертикальную прокрутку
      body.style = `
      overflow: auto;
    `;
      // запустим анимацию удаления прелоадера
      if (!preloader.classList.contains("hide")) {
        preloader.classList.add("hide");
      }
      // по завершению анимации
      loader.addEventListener("transitionend", () => {
        console.log("PRELOADER END");
        // удалим прелоадер из DOM-дерева
        body.removeChild(preloader);
      });
    }, DELAY);
  });
})();
