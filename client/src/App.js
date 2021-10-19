import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import UrlSorten from './components/UrlSorten';
import RedirectShorten from './components/RedirectShorten';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UrlSorten} />
          <Route exact path="/:slug" component={RedirectShorten} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;