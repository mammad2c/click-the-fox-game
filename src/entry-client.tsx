import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./main";

const rootElement = document.getElementById("app") as HTMLElement;

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
);
