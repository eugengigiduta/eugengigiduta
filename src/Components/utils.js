import { useCallback } from "react";
export function useUtils() {
  const checkWinner = (arr) => {
    const arrNum = arr.map((val) => Number(val));
    const winNum = arrNum.find(
      (num) =>
        (arrNum.includes(num + 1) === true &&
          arrNum.includes(num + 2) === true &&
          arrNum.includes(num + 3) === true) ||
        (arrNum.includes(num + 10) === true &&
          arrNum.includes(num + 20) === true &&
          arrNum.includes(num + 30) === true) ||
        (arrNum.includes(num + 9) === true &&
          arrNum.includes(num + 18) === true &&
          arrNum.includes(num + 27) === true) ||
        (arrNum.includes(num + 11) === true &&
          arrNum.includes(num + 22) === true &&
          arrNum.includes(num + 33) === true)
    );
    return winNum === 0 ? "0" : winNum;
  };
  const handlePlayer2Moves = useCallback(
    (NUMROWS, selected, selected1, selected2) => {
      const cellsIndexBoard = Array.from({ length: NUMROWS }, () => "1")
        .map((_, i) => String(i))
        .map((val, i) =>
          Array.from({ length: NUMROWS }, () => val).map(
            (val, i) => val + String(i)
          )
        )
        .flat();

      const freeCells = cellsIndexBoard.filter(
        (cell) => selected.includes(cell) === false
      );

      const arrNum = selected1.map((val) => Number(val));

      const cellPlayer1Has1 = selected1.find(
        (cell) => selected1.includes(cell) === true
      );

      const player1Has2Vertical = arrNum.find(
        (num) => arrNum.includes(num + 1) === true
      );
      const player1Has2InLine = arrNum.find(
        (num) => arrNum.includes(num + 10) === true
      );

      const win2Cell = freeCells.find((cell) =>
        Number(cell[1]) === NUMROWS - 1
          ? checkWinner([...selected2, cell])
          : checkWinner([...selected2, cell]) &&
            selected.includes(cell[0] + String(Number(cell[1]) + 1))
      );
      const win1Cell = freeCells.find((cell) =>
        Number(cell[1]) === NUMROWS - 1
          ? checkWinner([...selected1, cell])
          : checkWinner([...selected1, cell]) &&
            selected.includes(cell[0] + String(Number(cell[1]) + 1))
      );
      if (freeCells.length < 1) return;
      else if (selected1.slice(-1)[0][1] === "0")
        return Number(freeCells.slice(-1)[0][0]);
      else if (win2Cell) return Number(win2Cell[0]);
      else if (win1Cell) return Number(win1Cell[0]);
      else if (player1Has2Vertical || player1Has2InLine)
        return Number(selected1.slice(-1)[0][0]);
      else if (cellPlayer1Has1)
        return selected1.slice(-1)[0][0] === String(NUMROWS - 1)
          ? selected1.slice(-1)[0][0] - 1
          : Number(selected1.slice(-1)[0][0]) + 1;
      else return Number(freeCells.slice(0, 1)[0][0]);
    },
    []
  );
  const findLastValidIndex = useCallback((i, selected, board) => {
    const cellSelected = selected
      .filter(
        (cell) =>
          Number(cell) >= Number(String(i) + "0") &&
          Number(cell) <= Number(String(i) + String(board.length - 1))
      )
      .map((cell) => Number(cell))
      .sort((a, b) => a - b)
      .map((num) => (num < 10 ? "0" + num : String(num)));

    const lastIndex = Number(cellSelected[0][1]) - 1;
    return lastIndex;
  }, []);
  return { checkWinner, handlePlayer2Moves, findLastValidIndex };
}
