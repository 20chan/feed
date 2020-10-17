import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";

function App() {
    return (
        <Router>
            <div>
                <Route exact path="/"><DashboardPage /></Route>
                <Route exact path="/login"><LoginPage /></Route>
                <Route render={() => (<Redirect to="/" />)} />
            </div>
        </Router>
    );
}

export default App;
