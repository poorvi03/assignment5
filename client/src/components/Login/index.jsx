import "./Login.css";
import "../SignUp/SignUp.css";
import "../../css/Inputs.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setUserAuthenticated }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setUserAuthenticated(true);
        history.push("/");
      }
    } catch (error) {
      console.log("ERROR IN LOGIN PAGE", error);
      if (error.response) {
        setEmailError(error.response.data.email);
        setPasswordError(error.response.data.password);
      }
    }
  };

  const handleRegisterUser = () => {
    history.push("/sign-up");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input
          type="text"
          placeholder="name@google.com"
          autoComplete="none"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h4 className="login-form-error">{emailError}</h4>

        <input
          type="password"
          placeholder="password"
          autoComplete="none"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h4 className="login-form-error">{passwordError}</h4>

        <button className="input-button" onClick={handleLoginUser}>
          Login
        </button>

        <h2 className="register-button" onClick={handleRegisterUser}>
          Register
        </h2>
      </form>
    </div>
  );
};

export default Login;
