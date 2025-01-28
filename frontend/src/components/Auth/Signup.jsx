import React, { useState } from "react";
import { register } from "../../services/AuthService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password });
      alert("Signup successful! You can now log in.");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
