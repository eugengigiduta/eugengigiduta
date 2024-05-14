import { useContext } from "react";
import "./Header.css";
import { useUtils } from "./utils";
import { DataContext } from "./Display";
export default function Header() {
  const {
    selected1,
    selected2,
    selected,
    endGame,
    handleReset,
    player1,
    lastName,
    NUMROWS,
    handleUndo,
    imgSrc,
    onSignOut,
    data,
    setData,
    friends,
    setFriends,
    isFriendPlayer,
    setIsFriendPlayer,
    showFriends,
    setShowFriends,
    playAI,
    setPlayAI,
  } = useContext(DataContext);
  const { checkWinner } = useUtils();
  function handleShowFriends() {
    setShowFriends(() => !showFriends);
  }

  function handleAddFriend() {
    setFriends((f) => [...f, data[0]]);
  }
  function handleRemoveFriend(i) {
    const uppdatedFriends = friends.filter((friend) => friend !== friends[i]);
    setFriends(() => uppdatedFriends);
    if (!friends) handleReset();
  }

  return (
    <>
      <div
        style={
          checkWinner(selected1) || checkWinner(selected2)
            ? { padding: 0, display: "flex", flexDirection: "column" }
            : { display: "flex", flexDirection: "column" }
        }
      >
        <div
          className="btns"
          style={
            checkWinner(selected1) || checkWinner(selected2)
              ? { padding: 0 }
              : {}
          }
        >
          {endGame() ? (
            <div
              className="win"
              onClick={handleReset}
              style={{
                backgroundColor: checkWinner(selected1) ? "yellow" : "red",
                color: checkWinner(selected1) ? "red" : "yellow",
                cursor: "pointer",
                display: !endGame() ? "none" : "",
              }}
            >
              {selected.length === NUMROWS * NUMROWS &&
              !checkWinner(selected1) &&
              !checkWinner(selected2)
                ? "   NO 🏆...PLAY AGAIN? 👇"
                : ""}
              {checkWinner(selected1) || checkWinner(selected2) ? (
                <div className="">
                  {" "}
                  {checkWinner(selected1)
                    ? "YOU WIN 🏆"
                    : `${playAI ? "{🤖}" : lastName} WINS (🏆)!`}{" "}
                  Press to play again 😉
                </div>
              ) : (
                "Reset"
              )}
            </div>
          ) : (
            <>
              <button
                className="btn"
                style={{ fontSize: "15px" }}
                onClick={onSignOut}
              >
                Sign out
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowFriends(false);
                  setPlayAI(false);
                  handleReset();
                }}
              >
                Reset/Play
              </button>{" "}
              <div>
                {" "}
                <button
                  className="btn"
                  style={{ fontSize: "25px" }}
                  onClick={() => {
                    setPlayAI(true);
                    setShowFriends(false);
                    handleReset();
                  }}
                >
                  🤖
                </button>{" "}
                <span style={{ fontSize: "25px" }}> 👈 </span>
              </div>{" "}
              <div>
                <div>
                  <div>
                    {" "}
                    <button
                      className="btn"
                      onClick={() => {
                        setPlayAI(false);
                        friends.length > 0 && handleShowFriends();
                      }}
                    >
                      Friends🧑‍🤝‍🧑 {friends.length}
                    </button>{" "}
                    <span style={{ fontSize: "25px" }}> 👈 </span>
                  </div>{" "}
                  <div>
                    {" "}
                    <span style={{ fontSize: "25px" }}> 👉 </span>
                    <button
                      className="btn"
                      onClick={() => {
                        selected2.length === 0 &&
                          setIsFriendPlayer(!isFriendPlayer);
                        handleReset();
                        setShowFriends(false);
                        setPlayAI(false);
                      }}
                    >
                      New opponent
                    </button>
                  </div>{" "}
                </div>
              </div>{" "}
            </>
          )}
          {selected.length > 0 && !endGame() && (
            <button
              className="btn"
              style={{
                marginLeft: "30px",
              }}
              onClick={handleUndo}
            >
              Undo 🤔 {selected.length !== 0 ? (player1 ? "🔴" : "🟡") : ""}
            </button>
          )}
        </div>
      </div>
      {playAI ? (
        <p>{!endGame() ? "You play with" : ""} 🤖 </p>
      ) : (
        <div>
          <p>
            {friends[0] &&
              friends.filter((fr) => fr === data[0])[0] &&
              !endGame() &&
              `Score: You ${data[0].lost} : ${data[0].win} ${lastName} `}
            {<img src={imgSrc} alt="img" style={{ width: "80px" }} />}
            {!friends.filter((fr) => fr === data[0])[0] && !endGame() && (
              <button
                className="btn"
                onClick={() => {
                  handleAddFriend();
                }}
              >
                Add friend{" "}
                <span
                  style={{
                    color: "grey",
                  }}
                >
                  {lastName}
                </span>
              </button>
            )}
          </p>
        </div>
      )}
      <div>
        {showFriends &&
          friends[0] &&
          friends?.map((friend, i) => (
            <div className="container" key={i}>
              {" "}
              <li>
                <button
                  className="btn"
                  style={{ fontSize: "18px", width: "600px" }}
                  onClick={() => {
                    setData([friends[i]]);
                    setShowFriends(false);
                    handleReset();
                  }}
                >
                  {` Play with ${friend?.name.first}? `}
                  <img
                    src={friend?.picture.large}
                    alt="img"
                    style={{ width: "80px" }}
                  />
                  {` You ${friend.lost} : ${friend.win} ${friend.name.first}`}
                </button>{" "}
                <button
                  className="btn"
                  style={{ fontSize: "18px", color: "red" }}
                  onClick={() => {
                    handleRemoveFriend(i);
                    friends.length === 1 && setShowFriends((sh) => !sh);
                  }}
                >
                  x
                </button>
              </li>{" "}
            </div>
          ))}
      </div>
    </>
  );
}
