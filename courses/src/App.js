import './App.css';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap";
import {Button, Navbar} from "react-bootstrap";

function App() {

  return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
