import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import News from "./pages/News";

function App() {
    return (
    <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/" component={News} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
