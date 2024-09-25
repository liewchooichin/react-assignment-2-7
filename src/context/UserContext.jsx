import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCredentialsChange = (event) => {
    setCredentials((prevCredentials) => {
      const newCredentials = {
        ...prevCredentials,
        [event.target.name]: event.target.value,
      };
      return newCredentials;
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!credentials.username || !credentials.password) {
      alert("Please provide both username and password.");
      return;
    }

    if (credentials.username === "admin" && credentials.password === "admin") {
      alert(`✅ Logged in with username: ${credentials.username} and password: ${credentials.password}`);

      setIsLoggedIn(true);
    } else {
      alert("❌ Invalid credentials");
    }
  };

  const contextValue = {
    credentials,
    handleCredentialsChange,
    handleLogin,
    handleLogout,
    isLoggedIn,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
