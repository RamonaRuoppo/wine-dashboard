import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useState } from "react"
import Login from "./pages/Login.jsx"
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user_username")
  );

  const handleLogin = (username) => {
    localStorage.setItem("user_username", username);
    if (localStorage.getItem("resetSimData") === "true") {
    localStorage.removeItem("resetSimData");
}
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_username");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/*" element={isLoggedIn ? <Dashboard onLogout={handleLogout}/> : <Navigate to='/login' replace />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
