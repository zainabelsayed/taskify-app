import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterForm from './components/register/RegisterForm';

function App() {
  return (
   <RegisterForm></RegisterForm>
   
    // <Router>
    //   <Switch>
    //     <Route component={RegisterForm} path="/" />
    //     {/* <Route component={LoginForm} path="/" /> */}
    //   </Switch>
    // </Router>
  );
}

export default App;
