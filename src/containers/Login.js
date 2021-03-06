import { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Login = ({ setUser, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [displayError, setDisplayError] = useState();
  const history = useHistory();
  const location = useLocation();
  console.log(location);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://the-marvel.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setUserId(response.data._id);

        history.push("/");
      } else {
        setDisplayError("something went wrong, please try again");
      }
    } catch (error) {
      console.log({ message: error });
      if (error.response) {
        console.log(error.response.data);
        setDisplayError("something went wrong, please try again");
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input type="submit" value="Se connecter" />
      </form>

      {displayError && (
        <div className="display-error">
          Le nom d'utilisateur ou le mot de passe saisi est incorrect ?
        </div>
      )}
    </div>
  );
};

export default Login;
