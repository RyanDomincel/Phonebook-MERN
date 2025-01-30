import React, { useContext, useState } from "react";
import contactIMG from "../../assets/contact-book.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const NavbarComp = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [openNav, setOpenNav] = useState(false);
  const onLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setCurrentUser(null); // Clear user context
    navigate("/"); // Redirect to homepage
  };
  console.log("currentUser ", currentUser);
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 text-dark">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-4">
          <img src={contactIMG} alt="Logo" className="h-10" />
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-large"
            onClick={() => navigate("/dashboard")}
          >
            Contactopia
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          {currentUser && (
            <div className="flex items-center gap-2">
              <img
                src={currentUser.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <Typography variant="small" className="text-gray-800 font-medium">
                {currentUser.name}
              </Typography>
            </div>
          )}
          {currentUser ? (
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
              onClick={onLogout}
            >
              <span>Log out</span>
            </Button>
          ) : (
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block rounded-md bg-slate-800 py-2 px-4 text-white hover:bg-slate-700"
              onClick={() => navigate("/")}
            >
              <span>Sign in</span>
            </Button>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {currentUser ? (
          <Button fullWidth variant="text" size="sm" onClick={onLogout}>
            <span>Log Out</span>
          </Button>
        ) : (
          <Button
            fullWidth
            variant="gradient"
            size="sm"
            onClick={() => navigate("/")}
          >
            <span>Sign in</span>
          </Button>
        )}
      </MobileNav>
    </Navbar>
  );
};

export default NavbarComp;
