import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Counter } from "./features/counter/Counter";
import { Contactos } from "./Components/Contactos/Index";
import "./App.css";
import Header from "./Components/Util/Header";
import { Outlet } from "react-router-dom";
// import { Modal } from "react-bootstrap";

function App() {

  return (
    <div className="App">
        <Header />
        <Outlet />
    </div>
  );
}

export default App;
