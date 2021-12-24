import "./Account.css";
import "../../css/Inputs.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Account({ setUserAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setUserId(res.data._id);
        setAvatar(res.data.profilePicture);
      })
      .catch((error) => {
        setEmailError("");
        setNameError("");
        console.log("ERROR in account page", error);
      });
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");

    try {
      let myFormData = new FormData();
      myFormData.append("name", name);
      myFormData.append("email", email);
      myFormData.append("avatar", avatar);

      const res = await axios.patch(
        "http://localhost:5000/api/user/" + userId,
        myFormData
      );

      console.log(res);
    } catch (error) {
      setNameError(error.response.data.name);
      setEmailError(error.response.data.email);

      console.log("ERROR in account patch: ", error);
    }
  };

  
  const handleLogOutUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setUserAuthenticated(false);
        history.push("/");
      }

      console.log(res);
    } catch (error) {
      console.log("ERROR in handleLogOutUser:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/user/" + userId,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setUserAuthenticated(false);
        history.push("/");
      }
    } catch (error) {
      console.log("ERROR in handleDeleteAccount:", error);
    }
  };

  return (
    <div className="account-container">
    

      <form className="account-form">
        <input
          type="text"
          placeholder="name"
          autoComplete="none"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h4 className="account-form-error">{nameError}</h4>

        <input
          type="text"
          placeholder="name@google.com"
          autoComplete="none"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h4 className="account-form-error">{emailError}</h4>

        <button className="input-button" onClick={handleUpdateUser}>
          Update
        </button>

        <h4 className="logout-button" onClick={handleLogOutUser}>
          Logout
        </h4>
        <h4 className="delete-button" onClick={handleDeleteUser}>
          Delete Account
        </h4>
      </form>
    </div>
  );
}

export default Account;
