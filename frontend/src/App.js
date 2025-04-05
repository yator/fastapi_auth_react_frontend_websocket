
import { useState, useEffect } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [page, setPage] = useState(token ? "welcome" : "login");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token) {
      const websocket = new WebSocket("ws://localhost:8000/ws");
      websocket.onmessage = (event) => {
        setNotifications((prev) => [...prev, event.data]);
      };
      return () => websocket.close();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  return (
    <div className="p-4">
      {page === "register" && <RegisterPage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} setToken={setToken} />}
      {page === "welcome" && (
        <WelcomePage notifications={notifications} onLogout={handleLogout} />
      )}
    </div>
  );
}
