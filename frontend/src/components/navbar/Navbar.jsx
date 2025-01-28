import React from "react";
import contactIMG from "../../assets/contact-book.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Navigate to the login page
  };

  const onCompanyNameClick = () => {
    navigate("/dashboard"); // Navigate to the dashboard
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={contactIMG} alt="Logo" className="h-10" />
        <h1
          className="text-2xl font-bold text-gray-800 ml-3 cursor-pointer"
          onClick={onCompanyNameClick}
        >
          Contactopia
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src={contactIMG}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
