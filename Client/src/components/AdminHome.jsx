import axios from "axios";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [adminDateCreated, setAdminDateCreated] = useState("");

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    adminTimestamp();
  }, []);

  //Admin records
  const AdminRecords = () => {
    axios.get("http://localhost:8080/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  //Admin count
  const adminCount = () => {
    axios.get("http://localhost:8080/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      } else {
        alert(result.data.Error);
      }
    });
  };

  //Employee count
  const employeeCount = () => {
    axios.get("http://localhost:8080/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee);
      } else {
        alert(result.data.Error);
      }
    });
  };

  //Salary count
  const salaryCount = () => {
    axios.get("http://localhost:8080/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      } else {
        alert(result.data.Error);
      }
    });
  };

  //Admin timestamp
  const adminTimestamp = () => {
    axios.get("http://localhost:8080/auth/timestamp").then((result) => {
      if (result.data.Status) {
        setAdminDateCreated(result.data.Result[0].time);
      } else {
        alert(result.data.Error);
      }
    });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th className="d-flex justify-content-center">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              <tr key={index}>
                <td>{a.email}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    {adminDateCreated}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
