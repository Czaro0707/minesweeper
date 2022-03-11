import { actualCells, game } from "./Game.js";

class GameFeatures {
  constructor() {}

  init() {
    actualCells.forEach((cell) => {
      cell.cellDOM.addEventListener("click", () => {
        if (
          cell.isBomb === true &&
          cell.isFlagged === false &&
          cell.isRevealed === false
        ) {
          cell.cellDOM.classList.add("cellIsBomb");
          game.endGame();
        } else {
          cell.waveCell();
          game.checkWin();
        }
      });
    });
  }
}

export const gameFeatures = new GameFeatures();
