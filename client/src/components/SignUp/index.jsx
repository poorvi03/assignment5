import "./SignUp.css";
import "../../css/Inputs.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp({ setUserAuthenticated }) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passswordError, setPassswordError] = useState("");

  const handleSignUpUser = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPassswordError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/sign-up",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        history.push("/");
        setUserAuthenticated(true);
      }
    } catch (error) {
      setNameError(error.response.data.name);
      setEmailError(error.response.data.email);
      setPassswordError(error.response.data.password);
      console.log("ERROR IN SIGN UP PAGE", error.response.data);
    }
  };

  return (
    <div className="signUp-container">
      <h1 className="signUp-title">Sign Up</h1>
      <form className="signUp-form">
        <input
          type="text"
          placeholder="name"
          autoComplete="none"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h4 className="signUp-form-error">{nameError}</h4>

        <input
          type="text"
          placeholder="name@google.com"
          autoComplete="none"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h4 className="signUp-form-error">{emailError}</h4>

        <input
          type="password"
          placeholder="password"
          autoComplete="none"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h4 className="signUp-form-error">{passswordError}</h4>

        <button className="input-button" onClick={handleSignUpUser}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
