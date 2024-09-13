import { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/mail-lucide.svg";
import passwordIcon from "../assets/lock-lucide.svg";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // State to track checkbox
  const navigate = useNavigate();

  // For cookie access in axios from different domain
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/auth/admin_login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger mb-2">{error && error}</div>
        <h2 className="mb-4">Welcome back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 flex-row d-flex">
            <img src={emailIcon} alt="Email icon" className="ms-2" />
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control ms-2 shadow-none"
            />
          </div>
          <div className="mb-3 flex-row d-flex">
            <img src={passwordIcon} alt="Password icon" className="ms-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control ms-2 shadow-none"
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
            disabled={!agreeToTerms} // Disable button if checkbox is not checked
          >
            Log in
          </button>
          <div>
            <input
              type="checkbox"
              name="tick"
              id="tick"
              onChange={(e) => setAgreeToTerms(e.target.checked)} // Update state on change
              className="me-2"
            />
            <label htmlFor="tick">Terms & conditions</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
