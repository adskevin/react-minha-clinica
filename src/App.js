import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Patients from './Components/Patients'
import MyNavbar from './Components/MyNavbar'

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Router>
          <Switch>
            <Route exact path="/">
              <h1>Atendimentos</h1>
            </Route>
            <Route path="/atendimentos">
              <h1>Atendimentos</h1>
            </Route>
            <Route path="/pacientes">
              <Patients />
            </Route>
            <Route path="/procedimentos">
              <h1>Procedimentos</h1>
            </Route>
            <Route path="/profissionais">
              <h1>Profissionais</h1>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
