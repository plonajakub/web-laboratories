import React from 'react';
import "./App.css"
import WelcomePage from "./welcome-page/welcome";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import BulbSwitcher from "./button/button";


function App() {
    return (
        <Router>
            <div>
                <div id="index">
                    <div>Spis treści:</div>
                    <ol>
                        <li>
                            <Link to="/zad1">Strona powitalna, komponenty i właściwości</Link>
                        </li>
                        <li>
                            <Link to="/zad2">Przyciski, formularze i zdarzenia</Link>
                        </li>
                        <li>
                            <Link to="/zad3">Komponent listy</Link>
                        </li>
                    </ol>
                </div>
                <hr/>

                <Switch>
                    <Route path="/zad1">
                        <WelcomePage title="MuzykaFilmowa.org"/>
                    </Route>
                    <Route path="/zad2">
                        <BulbSwitcher/>
                    </Route>
                    <Route path="/zad3">

                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
