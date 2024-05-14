import { useCallback, useContext, useEffect } from "react";
import { useUtils } from "./utils";
import { DataContext } from "./Display";
export default function Board() {
  const {
    board,
    endGame,
    selected1,
    selected2,
    player1,
    currUser,
    lastName,
    isLoggedIn,
    selected,
    showFriends,
    NUMROWS,
    setSelected1,
    setSelected2,
    setPlayer1,
    playAI,
  } = useContext(DataContext);
  const { checkWinner, handlePlayer2Moves, findLastValidIndex } = useUtils();

  const handleCellClick = useCallback(
    (i) => {
      const selectedCell = selected.includes(
        String(i) + String(board.length - 1)
      )
        ? String(i) + String(findLastValidIndex(i, selected, board))
        : String(i) + String(board.length - 1);
      if (
        !checkWinner(selected1) &&
        !checkWinner(selected2) &&
        !selected.includes(String(i) + "0")
      ) {
        player1
          ? setSelected1((s1) => [...s1, selectedCell])
          : setSelected2((s2) => [...s2, selectedCell]);

        setPlayer1((player1) => !player1);
      }
    },
    [
      selected,
      selected1,
      selected2,
      board,
      checkWinner,
      setSelected1,
      setSelected2,
      player1,
      setPlayer1,
      findLastValidIndex,
    ]
  );
  function arrWinCells(arr) {
    return arr.reduce((acc, cell, i, arr) => {
      const winCell = arr.find(
        (cell) =>
          !checkWinner(arr.filter((val) => val !== arr[i])) && checkWinner(arr)
      );
      if (winCell) acc = [...acc, cell];

      return acc;
    }, []);
  }
  useEffect(() => {
    playAI &&
      !player1 &&
      selected.length < NUMROWS * NUMROWS &&
      handleCellClick(
        handlePlayer2Moves(NUMROWS, selected, selected1, selected2)
      );
  }, [
    selected,
    selected1,
    selected2,
    NUMROWS,
    playAI,
    player1,
    handleCellClick,
    handlePlayer2Moves,
  ]);
  return (
    !showFriends && (
      <>
        <p>
          {endGame()
            ? "Four In Line  🟡🟡🟡🟡"
            : player1
            ? ` 🟡
          
              ${
                currUser.firstName[0]?.toUpperCase() +
                currUser.firstName?.slice(1).toLowerCase()
              }, play!`
            : `🔴 ${lastName}  plays`}
        </p>
        {isLoggedIn && (
          <div className="board">
            {board.map((row, i) => (
              <div className="row" key={i}>
                {row.map((_, j) => (
                  <div
                    className="cell"
                    key={j}
                    style={{
                      backgroundColor: selected1.includes(String(i) + String(j))
                        ? "yellow"
                        : selected2.includes(String(i) + String(j))
                        ? "red"
                        : "",
                      boxShadow: selected.includes(String(i) + String(j))
                        ? "3px 3px 2px 1px rgb(82, 77, 77)"
                        : "",
                      cursor: j === 0 && !endGame() ? "pointer" : "",
                      opacity:
                        endGame() &&
                        !arrWinCells(selected1).includes(
                          String(i) + String(j)
                        ) &&
                        !arrWinCells(selected2).includes(String(i) + String(j))
                          ? 0.4
                          : 1,
                    }}
                    onClick={() => {
                      if (j === 0 && !selected.includes(String(i) + 0))
                        handleCellClick(i);
                    }}
                  >
                    {j === 0 &&
                    !selected.includes(String(i) + String(j)) &&
                    !endGame()
                      ? "👇"
                      : String(i) + String(j) === selected2.slice(-1)[0] ||
                        arrWinCells(selected1).includes(
                          String(i) + String(j)
                        ) ||
                        arrWinCells(selected2).includes(String(i) + String(j))
                      ? "💥"
                      : "©"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </>
    )
  );
}
