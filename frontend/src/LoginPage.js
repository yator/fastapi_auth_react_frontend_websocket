import { useState } from "react";
import axios from "axios";

export default function LoginPage({ setPage, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:8000/login", { email, password });
    localStorage.setItem("token", response.data.access_token);
    setToken(response.data.access_token);
    setPage("welcome");
    alert("Login successful!");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      alert(error.response.data.detail); // show the exact message from the backend
    } else {
      alert("Something went wrong. Please try again.");
    }
  }
};


  return (
    <>
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 mt-2">
        Login
      </button>
      <p className="mt-2">
        Don't have an account?{" "}
        <button className="text-blue-500 underline" onClick={() => setPage("register")}>
          Register
        </button>
      </p>
    </>
  );
}
