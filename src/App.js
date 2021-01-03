import 'bootstrap/dist/css/bootstrap.min.css';

import UserInput from './pages/UserInput';
import OutputChart from './pages/OutputChart';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    
    <Router>
      <Switch>
        
        <Route path="/chart" component={OutputChart} />
        <Route path="/input" component={UserInput}/>
        <Route path="" component={UserInput}/>
      </Switch>
    </Router>
  );
}

export default App;
