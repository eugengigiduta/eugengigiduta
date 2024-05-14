import Board from "./Board.js";
import Header from "./Header.js";
import { createContext, useContext, useEffect, useState } from "react";
import { useUtils } from "./utils.js";
import { UsersContext } from "../App.js";
const USERSAPI = "https://randomuser.me/api";
const NUMROWS = 7;
const board = Array.from({ length: NUMROWS }, () =>
  Array.from({ length: NUMROWS }, () => "1")
);
const DataContext = createContext();
export default function Display() {
  const { isLoggedIn, setIsLoggedIn, setShowSignIn, currUser } =
    useContext(UsersContext);
  const { checkWinner } = useUtils();
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [player1, setPlayer1] = useState(true);
  const selected = [...selected1, ...selected2];
  const [data, setData] = useState([]);
  const [imgSrc] = data.map((val) => [val.picture.large]);
  const [lastName] = data.map((val) => val.name.first);
  const [player2, setPlayer2] = useState({});
  const [friends, setFriends] = useState(function () {
    return JSON.parse(localStorage.getItem(currUser.password)) || [];
  });
  const [isFriendPlayer, setIsFriendPlayer] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [playAI, setPlayAI] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(USERSAPI);
      const { results } = await res.json();
      setData(() => results);

      setData((data) => [
        { ...data[0], win: data[0].win || 0, lost: data[0].lost || 0 },
      ]);
    };
    fetchData();
  }, [isFriendPlayer]);
  useEffect(() => {
    if (checkWinner(selected2) && !playAI) {
      data[0].win += 1;
    }
    if (checkWinner(selected1) && !playAI) {
      data[0].lost += 1;
    }
  }, [data, playAI, selected1, selected2, player2, checkWinner]);

  useEffect(() => {
    localStorage.setItem(currUser.password, JSON.stringify(friends));
  }, [friends, currUser.password, player1]);

  function handleSignOut() {
    handleReset();
    setIsLoggedIn(() => false);
    setShowSignIn(() => false);
  }
  function handleReset() {
    setSelected1(() => []);
    setSelected2(() => []);
    setPlayer1(() => true);
  }

  function handleUndo() {
    player1 ? selected2.pop() : selected1.pop();
    setPlayer1(!player1);
  }
  function endGame() {
    if (
      selected.length === NUMROWS * NUMROWS ||
      checkWinner(selected1) ||
      checkWinner(selected2)
    )
      return true;
  }

  return (
    <DataContext.Provider
      value={{
        selected1,
        setSelected1,
        setSelected2,
        selected2,
        selected,
        checkWinner,
        endGame,
        handleReset,
        player1,
        setPlayer1,
        lastName,
        NUMROWS,
        handleUndo,
        imgSrc,
        onSignOut: handleSignOut,
        data,
        setData,
        setPlayer2,
        friends,
        setFriends,
        isFriendPlayer,
        setIsFriendPlayer,
        showFriends,
        setShowFriends,
        playAI,
        setPlayAI,
        currUser,
        isLoggedIn,
        board,
      }}
    >
      <div className="app">
        <Header />
        <Board />
      </div>
    </DataContext.Provider>
  );
}
export { DataContext };
