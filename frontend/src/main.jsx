import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ContactProvider } from "./context/ContactContext";
import { UserProvider } from "./context/UserContext";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ContactProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ContactProvider>
    </AuthProvider>
  </React.StrictMode>
);
