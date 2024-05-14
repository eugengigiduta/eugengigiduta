import { useContext, useEffect, useRef, useState } from "react";
import "./Welcome.css";
import { UsersContext } from "../App";
export default function Welcome() {
  const { showSignIn, setShowSignIn, user, setUser, onLoggIn, setUsers } =
    useContext(UsersContext);
  const [newUser, setNewUser] = useState({ firstName: "", password: "" });
  const [showRegister, setShowRegister] = useState(false);
  const inputUserEl = useRef(null);
  const inputRegisterEl = useRef(null);
  useEffect(() => {
    inputUserEl.current?.focus();
  }, [showSignIn]);
  useEffect(() => {
    inputRegisterEl.current?.focus();
  }, [showRegister]);
  function handleInputUser(e) {
    inputUserEl.current.focus();
    setUser((val) => (val = { ...val, firstName: e.target.value }));
  }
  function handleInputPassword(e) {
    setUser((val) => (val = { ...val, password: e.target.value }));
  }
  function handleNewUser(e) {
    setNewUser((val) => (val = { ...val, firstName: e.target.value }));
  }
  function handleNewPassword(e) {
    setNewUser((val) => (val = { ...val, password: e.target.value }));
  }

  function handleShowSignIn() {
    setShowSignIn(() => !showSignIn);
    setShowRegister(() => false);
  }
  function handleShowRegister() {
    setShowRegister(() => !showRegister);
    setShowSignIn(() => false);
    setNewUser({ firstName: "", password: "" });
  }
  function handleRegister() {
    newUser.password && setUsers((val) => (newUser ? [...val, newUser] : val));
    handleShowSignIn();
  }

  return (
    <>
      <div
        style={{
          fontSize: "20px",
          marginBottom: "100px",
          marginTop: "70px",
        }}
      >
        <p style={{ color: "green", marginBottom: "10 0px" }}>WELCOME! 👋</p>
        <p style={{ color: "green", marginBottom: "100px" }}>
          Let's Play 🟡🟡🟡🟡 Four in Line{" "}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>__________________</span>
          <button
            onClick={handleShowSignIn}
            style={{
              marginRight: "30px",
            }}
          >
            Sign in
          </button>

          <span>| | </span>

          <button
            onClick={handleShowRegister}
            style={{
              marginLeft: "30px",
            }}
          >
            Register
          </button>
          <span>__________________</span>
        </div>
      </div>{" "}
      {showSignIn && (
        <div className="container">
          {" "}
          <form onClick={(e) => e.preventDefault()}>
            <label>User Name</label>
            <input
              ref={inputUserEl}
              type="text"
              value={user.firstName}
              onChange={handleInputUser}
            />
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={handleInputPassword}
            />
            <button
              onClick={() => {
                inputUserEl.current.focus();
                onLoggIn();
              }}
            >
              👇 Sign in
            </button>
          </form>
        </div>
      )}{" "}
      <div className="container">
        <form
          onClick={(e) => e.preventDefault()}
          style={{
            display: !showRegister || showSignIn ? "none" : "flex",
          }}
        >
          <label>New User Name</label>
          <input
            ref={inputRegisterEl}
            type="text"
            value={newUser.firstName}
            onChange={handleNewUser}
          />
          <label>Set Password</label>
          <input
            type="password"
            value={newUser.password}
            onChange={handleNewPassword}
          />
          <button onClick={handleRegister}>👇 Register</button>
        </form>
      </div>
    </>
  );
}
