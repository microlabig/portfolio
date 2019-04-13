import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

localStorage.setItem('homePage', location.href); // для запоминания домашнего URL

import "./scripts/parallax";
import "./scripts/reviews";
import "./scripts/skills";
import "./scripts/works";
import "./scripts/budda";
import "./scripts/ajaxBudda";