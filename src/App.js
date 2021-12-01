import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./compontents/login/LoginForm";
import RegisterForm from "./compontents/register/RegisterForm";
import Home from "./compontents/HomePage/home/Home";
import UserBoard from "./compontents/UserBoard/userBoard/UserBoard";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

function App() {
  const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (sessionStorage.getItem("user") !== null) {
        next();
      }
      next.redirect("/login");
    } else {
      next();
    }
  };

  return (
    <Router>
      <Switch>
        <Route component={RegisterForm} path="/register" />
        <Route component={LoginForm} path="/login" />
        <Route component={Home} path="/" exact />
        <GuardProvider guards={[requireLogin]}>
          <GuardedRoute
            component={UserBoard}
            path="/user-board"
            exact
            meta={{ auth: true }}
          />
          <GuardedRoute
            component={UserBoard}
            path="/user-board/:category"
            meta={{ auth: true }}
          />
        </GuardProvider>
      </Switch>
    </Router>
  );
}

export default App;
