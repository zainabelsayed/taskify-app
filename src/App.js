import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
import Home from "./components/HomePage/home/Home";
import UserProjectBoard from "./components/UserBoard/userBoard/UserProjectBoard";
import UserBoard from "./components/UserBoard/userBoard/UserBoard";
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

  const checkLogin = (to, from, next) => {
    if (sessionStorage.getItem("user") === null) {
      next();
    } else {
      next.redirect("/user-project-board");
    }
  };

  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Home} path="/home" />
        <GuardProvider guards={[requireLogin]}>
          <GuardedRoute
            component={RegisterForm}
            path="/register"
            guards={[checkLogin]}
          />
          <GuardedRoute
            component={LoginForm}
            path="/login"
            guards={[checkLogin]}
          />
          <GuardedRoute
            component={UserProjectBoard}
            path="/user-project-board"
            exact
            meta={{ auth: true }}
          />
          <GuardedRoute
            component={UserProjectBoard}
            path="/user-project-board/:category"
            meta={{ auth: true }}
          />
          <GuardedRoute
            component={UserBoard}
            path="/:category/:projectID/tasks"
            meta={{ auth: true }}
          />
        </GuardProvider>
      </Switch>
    </Router>
  );
}

export default App;
