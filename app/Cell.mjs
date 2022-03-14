import { actualCells, checkCells, game } from "./Game.mjs";

const cellsAfterFilter = [];

export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cell = `<div class="game__cell" data-x=${this.x} data-y=${this.y}></div>`;
    this.cellDOM = document.createElement("div");
    this.isFlagged = false;
    this.isRevealed = false;
    this.isBomb = false;
    this.numberOfBombAround = 0;
  }

  init() {
    this.createCell();
  }

  createCell() {
    this.cellDOM.classList.add("game__cell");
    this.cellDOM.setAttribute("data-x", this.x);
    this.cellDOM.setAttribute("data-y", this.y);
  }

  changeIsFlagged() {
    this.isFlagged = !this.isFlagged;
  }

  waveCell() {
    if (game.isEndGame === false) {
      if (this.isFlagged === false && this.isRevealed === false) {
        let cellX = this.x;
        let cellY = this.y;
        for (let i = 0; i < 3; i++) {
          if (i === 0) {
            cellY = this.y - 1;
            cellX = this.x - 1;
          } else {
            cellX++;
            cellY = this.y - 1;
          }
          this.checkHowManyBombs(cellX, cellY);
          for (let i = 0; i < 2; i++) {
            cellY++;
            this.checkHowManyBombs(cellX, cellY);
          }
        }
        if (this.numberOfBombAround > 0) {
          this.cellDOM.innerText = this.numberOfBombAround;
          switch (this.numberOfBombAround) {
            case 1:
              this.cellDOM.classList.add("first");
              break;
            case 2:
              this.cellDOM.classList.add("second");
              break;
            case 3:
              this.cellDOM.classList.add("third");
              break;
            case 4:
              this.cellDOM.classList.add("fourth");
              break;
            case 5:
              this.cellDOM.classList.add("fifth");
              break;
            case 6:
              this.cellDOM.classList.add("sixth");
              break;
            case 7:
              this.cellDOM.classList.add("seventh");
              break;
            case 8:
              this.cellDOM.classList.add("eighth");
              break;
          }
          checkCells.splice(0, checkCells.length);
          this.cellReveal();
        } else {
          this.cellReveal();
          checkCells.filter((cell) => {
            if (cell.isRevealed === false) {
              cellsAfterFilter.push(cell);
            }
          });
          cellsAfterFilter.forEach((cell) => {
            cell.waveCell();
          });
          checkCells.splice(0, checkCells.length);
        }
      }
    }
  }

  checkHowManyBombs(cellX, cellY) {
    actualCells.filter((cell) => {
      if (cell.x === cellX && cell.y === cellY) {
        if (cell.isBomb === true) {
          this.numberOfBombAround++;
        } else if (
          cell.isRevealed === false &&
          cell.isFlagged === false &&
          cell.isBomb === false
        ) {
          checkCells.push(cell);
        }
      }
    });
  }

  cellReveal() {
    if (game.isEndGame === false && this.isFlagged === false) {
      this.isRevealed = true;
      this.cellDOM.classList.add("cellRevealed");
    }
  }

  cellIsBomb() {
    this.isBomb = true;
  }
}
