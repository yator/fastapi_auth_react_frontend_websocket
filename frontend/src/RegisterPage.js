import { useState } from "react";
import axios from "axios";

export default function RegisterPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  try {
    const response = await axios.post("http://localhost:8000/register", { email, password });
    alert(response.data.message || "User created successfully!");
    setPage("login");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      alert(error.response.data.detail); // show backend error message
    } else {
      alert("An error occurred during registration.");
    }
  }
};


  return (
    <>
      <h2 className="text-xl font-bold">Register</h2>
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
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 mt-2">
        Register
      </button>
      <p className="mt-2">
        Already have an account?{" "}
        <button className="text-blue-500 underline" onClick={() => setPage("login")}>
          Login
        </button>
      </p>
    </>
  );
}
