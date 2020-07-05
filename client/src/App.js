import React, {  } from "react";
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import {Navbar} from "./componenets/layouts/Navbar";
import {Landing} from './componenets/layouts/Landing';
import {Register} from "./componenets/auth/Register";
import {Login} from "./componenets/auth/Login";

function App() {
  return (
    <Router>
       <Navbar />
      <Route exact path = "/" component = { Landing }></Route> 
      <section className  ="container">
        <Switch>
          <Route exact path = "/register" component = {Register} />
          <Route exact path = '/login' component = {Login} />
        </Switch>
      </section>
    </Router>
  );
}

export default App;
