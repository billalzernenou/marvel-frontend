import "./App.css";
import Home from "./containers/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import CharacterComics from "./containers/CharacterComics";
import { useState } from "react";
import Cookies from "js-cookie";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Favorites from "./containers/Favorites";

function App() {
  //token authentification
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userIdToken, setUserIdToken] = useState(
    Cookies.get("userIdToken") || null
  );

  const setUser = (token) => {
    if (token) {
      //if token exist add cookie to the browser and update userToken state
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  const setUserId = (idToken) => {
    if (idToken) {
      //if token exist add cookie to the browser and update userToken state
      Cookies.set("userIdToken", idToken, { expires: 7 });
      setUserIdToken(idToken);
    } else {
      Cookies.remove("userIdToken");
      setUserIdToken(null);
    }
  };
  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} setUserId={setUserId} />
      <Switch>
        <Route path="/characters">
          <Characters userIdToken={userIdToken} />
        </Route>
        <Route path="/character/:characterId">
          <CharacterComics />
        </Route>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} setUserId={setUserId} />
        </Route>
        <Route path="/Signup">
          <Signup setUser={setUser} setUserId={setUserId} />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
