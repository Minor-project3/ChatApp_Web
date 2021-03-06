import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login"
import {useStateValue} from "./StateProvider";

export default function App() {
  const [ {user}, dispatch ]= useStateValue();
   
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="appbody">
          <Router>
            <Sidebar/>
            <Switch>
              
              <Route path="/rooms/:roomid">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}
