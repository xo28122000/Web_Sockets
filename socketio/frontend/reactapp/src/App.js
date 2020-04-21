import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen";
import MessagingScreen from "./screens/MessagingScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/message">
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
