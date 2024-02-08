import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [getUser, setUser] = useState(
    localStorage.getItem("token")
      ? { token: localStorage.getItem("token"), status: "success" }
      : null
  );
  const[currentPlaying, setCurrentPlaying] = useState([]);

  const signInUser = (input) => {
    setUser(input);
  };

  const signOutUser = () => {
    setUser(null);
  };

  const object = {
    getUser,
    signInUser,
    signOutUser,
    setCurrentPlaying,
    currentPlaying,
  };

  return (
    <div>
      <UserContext.Provider value={object}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export function useUser() {
  return useContext(UserContext);
}