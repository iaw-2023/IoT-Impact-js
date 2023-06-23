import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import { Login } from "./components/Login";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser([storedUser]);
    }
  }, []);

  return (
    <div className="App">
      {!user.length > 0 ? (
        <Login setUser={setUser} />
      ) : (
        <Home user={user} setUser={setUser} handleLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
