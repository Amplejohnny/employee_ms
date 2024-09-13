import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import AdminHome from "./components/AdminHome";
import Employee from "./components/Employee";
import Category from "./components/Category";
import AddCategory from "./components/AddCategory";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeDetails from "./components/EmployeeDetails";
import Start from "./components/Start";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/auth/admin_login" element={<AdminLogin />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route
          path="/employee_details/:id"
          element={
            <PrivateRoute>
              <EmployeeDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<AdminHome />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
