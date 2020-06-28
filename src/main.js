import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

localStorage.setItem('homePage', location.href); // для запоминания домашнего URL

// импорт отдельных скриптов и виджетов 
import "./helpers/consts"; 
import "./scripts/parallax";
import "./scripts/reviews";
import "./scripts/skills";
import "./scripts/works2";
import "./scripts/budda";
import "./scripts/ajaxBudda";
import "./scripts/scrollMenu"; 
import "./scripts/scrollAnimation";
