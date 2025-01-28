import React, { useState } from "react";
import { forgotPassword } from "../../services/AuthService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      alert("Password reset email sent!");
    } catch (error) {
      alert("Failed to send reset email!");
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <h1>Forgot Password</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
