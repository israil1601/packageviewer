import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import InputFile from "./components/InputFile";

import PackageContainer from "./components/PackageContainer";
import AppState from "./components/AppState";
import PackageDetails from "./components/PackageDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <AppState>
    <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
        <InputFile  />
          </Route>
      
          <Route path="/packages" exact>
            <ProtectedRoute>
            <PackageContainer />
            </ProtectedRoute>
          </Route>
          <Route path="/packages/:id" exact>
            <ProtectedRoute>
            <PackageDetails />
            </ProtectedRoute>
          </Route>
        </Switch>
    </Router>
    </AppState>
  );
}

export default App;
