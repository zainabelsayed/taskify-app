import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./compontents/login/LoginForm";
import RegisterForm from "./compontents/register/RegisterForm";
import Home from "./compontents/HomePage/home/Home";
import UserBoard from "./compontents/UserBoard/userBoard/UserBoard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={RegisterForm} path="/register" />
        <Route component={LoginForm} path="/login" />
        <Route component={Home} path="/" exact />
        <Route component={UserBoard} path="/user-board" exact />
        <Route component={UserBoard} path="/user-board/:category" />;
      </Switch>
    </Router>
  );
}

export default App;
