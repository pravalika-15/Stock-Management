import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ onLogout }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying a token in sessionStorage)
    const isAuthenticated = localStorage.getItem("token") !== null;
    setAuthenticated(isAuthenticated);
  }, []);

  const handleLogout = () => {
    // Clear the token from sessionStorage and update the authenticated state
    localStorage.removeItem("token");
    setAuthenticated(false);
    onLogout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <header>
        <h1>Welcome to the Inventory Management System</h1>
        <p className="description">
          A robust solution for tracking stock levels, order fulfillment, and
          supplier management.
        </p>
      </header>
      <section id="products" className="py-16">
        <h2 className="text-3xl font-bold mb-8">Product Listing</h2>
        {/* Placeholder content for product listing */}
      </section>

      <section id="orders" className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Order Tracking</h2>
        {/* Placeholder content for order tracking */}
      </section>

      <section id="suppliers" className="py-16">
        <h2 className="text-3xl font-bold mb-8">Supplier Management</h2>
        {/* Placeholder content for supplier management */}
      </section>

      <section id="homepage" className="py-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {/* <img src="path/to/logo.png" alt="Company Logo" className="mb-8"> */}
            <p className="text-xl text-center max-w-lg mb-8">
              Welcome to our inventory management system. We provide a
              comprehensive solution for tracking and managing your products,
              orders, and suppliers.
            </p>

            <div id="product-listing" className="max-w-4xl mx-auto">
              {/* <!-- Placeholder content for product listing section --> */}
            </div>

            <div id="order-tracking" className="max-w-4xl mx-auto mt-16">
              {/* <!-- Placeholder content for order tracking section --> */}
            </div>

            <div id="supplier-management" className="max-w-4xl mx-auto mt-16">
              {/* <!-- Placeholder content for supplier management section --> */}
            </div>
          </div>

          <div className="mt-8">
            {authenticated ? (
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mr-4"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block mr-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
