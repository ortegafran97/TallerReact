import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Contactos } from "./Components/Contactos/Index";
import Ingresos from "./Components/Ingresos/Index";
import Vehiculos from "./Components/Vehiculos/Index";
import NewIngreso from "./Components/Ingresos/NewIngreso/NewIngreso";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="contactos" element={<Contactos />} />
            <Route path="vehiculos" element={<Vehiculos />} />
            <Route path="ingresos" element={<Ingresos />} />
            <Route path="newIngreso" element={<NewIngreso />} />
            <Route path="test" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
