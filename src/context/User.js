import React, { useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  return (
    <UserContext.Provider
      value={{ user, setUser, selectedWorkouts, setSelectedWorkouts }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
