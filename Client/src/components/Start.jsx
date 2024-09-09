import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminIcon from "../assets/user-cog-lucide.svg";
import employeeIcon from "../assets/user-lucide.svg";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("https://employee-ms-api.vercel.app/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("dashboard");
          } else {
            navigate("employee_details/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login as</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("employee_login");
            }}
          >
            <img src={employeeIcon} alt="Employee" className="me-2" />
            Employee
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate("admin_login");
            }}
          >
            <img src={adminIcon} alt="Admin" className="me-2" />
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
