import Account from "./components/Account";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import SpecificPost from "./components/SpecificPost";

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setUserAuthenticated(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home userAuthenticated={userAuthenticated} user={user} />
          </Route>
          <PrivateRoute path="/account" userAuthenticated={userAuthenticated}>
            <Account setUserAuthenticated={setUserAuthenticated} />
          </PrivateRoute>

          <Route path="/sign-up">
            <SignUp setUserAuthenticated={setUserAuthenticated} />
          </Route>
          <Route path="/login">
            <Login setUserAuthenticated={setUserAuthenticated} />
          </Route>
          <Route path="/post/:id">
            <SpecificPost user={user} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
