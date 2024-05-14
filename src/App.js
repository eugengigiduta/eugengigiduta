import "./App.css";
import Welcome from "./Components/Welcome";
import Display from "./Components/Display";
import { useState, useEffect, createContext } from "react";
const UsersContext = createContext();
function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [user, setUser] = useState({ firstName: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState({});

  const [showSignIn, setShowSignIn] = useState(false);

  function handelLoggIn() {
    if (
      users.find(
        (_, i, arr) =>
          arr[i].firstName === user?.firstName ??
          arr[i].password === user?.password
      ) &&
      user.firstName
    )
      setIsLoggedIn(() => !isLoggedIn);
    setCurrUser(user);
    setUser({ firstName: "", password: "" });
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [isLoggedIn, users]);

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
        showSignIn,
        setShowSignIn,
        onLoggIn: handelLoggIn,
        setUsers,
        currUser,
        setCurrUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <div className="app">
        <div className="reset">
          {currUser.firstName && isLoggedIn && (
            <span>
              Welcome back,{" "}
              {currUser.firstName[0]?.toUpperCase() +
                currUser.firstName?.slice(1).toLowerCase()}
              !
            </span>
          )}
          {!isLoggedIn ? <Welcome /> : <Display />}
        </div>
      </div>
    </UsersContext.Provider>
  );
}

export default App;
export { UsersContext };
