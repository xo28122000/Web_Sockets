import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import MessagingScreen from "./screens/MessagingScreen";
import WaitScreen from "./screens/WaitScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/wait">
          <WaitScreen />
        </Route>
        <Route path="/home">
          <MessagingScreen />
        </Route>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
