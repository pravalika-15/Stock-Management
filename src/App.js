import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Home from "./components/Home";
import "./assets/css/styles.css";
import ProductListing from "./components/ProductListing";
import OrderList from "./components/orderList";
import OrderForm from "./components/orderForm";
import OrderEditForm from "./components/OrderEditForm";
import SupplierCreateForm from "./components/suppliers/createSupplier";
import SupplierTable from "./components/suppliers/Suppliers";
import SupplierEditForm from "./components/suppliers/SupplierEditForm";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by verifying the token in sessionStorage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = new Date().getTime();
      console.log(decodedToken.exp * 1000);
      console.log(currentTime);
      if (decodedToken.exp * 1000 > currentTime) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    }

    console.log("useeffect");
    console.log(token);
    console.log(authenticated);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <>
      <Router>
        <NavBar authenticated={authenticated} onLogout={handleLogout} />
        <div style={{ paddingTop: "64px" }}></div>
        <Routes>
          <Route path="/" element={<Home onLogout={handleLogout} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route path="/products" element={<ProductListing />} />

          {/* Protected Routes */}
          {authenticated ? (
            <>
              <Route path="/orders" element={<OrderList />} />
              <Route path="/create-order" element={<OrderForm />} />
              <Route path="/orders/:id/edit" element={<OrderEditForm />} />
              <Route path="/create-supplier" element={<SupplierCreateForm />} />
              <Route
                path="/suppliers/:id/edit"
                element={<SupplierEditForm />}
              />
              <Route path="/suppliers" element={<SupplierTable />} />
              {/* <Route path="/login" element={<Home onLogout={handleLogout} />} />
              <Route
                path="/register"
                element={<Home onLogout={handleLogout} />}
              /> */}
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
