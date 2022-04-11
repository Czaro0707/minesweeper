import Cell from "./Cell.mjs";
import { timerCounter } from "./TimerCounter.mjs";
import { bombCounter } from "./BombCounter.mjs";
import { gameFeatures } from "./GameFeatures.mjs";
// import { gsapAnimation } from "./gsapAnimation.mjs";
gameFeatures;

export const GAME = document.querySelector(".game");
let revealedCells = [];
let cellsWithNoBomb = [];

export const gameLevels = [
  {
    level: "begginer",
    cellRows: 8,
    cellColumns: 8,
    numberOfCells: 64,
    numberOfBombs: 10,
    numberOfFlags: 10,
  },
  {
    level: "intermediate",
    cellRows: 16,
    cellColumns: 16,
    numberOfCells: 256,
    numberOfBombs: 40,
    numberOfFlags: 40,
  },
  {
    level: "expert",
    cellRows: 30,
    cellColumns: 16,
    numberOfCells: 480,
    numberOfBombs: 99,
    numberOfFlags: 99,
  },
];

let levelIndex = 0;

export let startValues = {
  game: GAME,
  cellColumns: gameLevels[levelIndex].cellColumns,
  cellRows: gameLevels[levelIndex].cellRows,
  numberOfCells: gameLevels[levelIndex].numberOfCells,
  numberOfBombs: gameLevels[levelIndex].numberOfBombs,
  numberOfFlags: gameLevels[levelIndex].numberOfFlags,
  level: gameLevels[levelIndex].level,
};

export let actualCells = [];
export const checkCells = [];

export default class Game {
  constructor(
    game,
    numberOfCells,
    cellColumns,
    cellRows,
    numberOfBombs,
    level
  ) {
    this.game = game;
    this.numberOfCells = numberOfCells;
    this.cellColumns = cellColumns;
    this.cellRows = cellRows;
    this.numberOfBombs = numberOfBombs;
    this.isEndGame = false;
    this.level = level;
  }

  face = document.querySelector(".interface__button__face");

  init() {
    this.startGame();
    this.drawBombs();
    this.checkBoardDisplay();
  }

  checkBoardDisplay() {
    if (this.level == "intermediate") {
      document.documentElement.style.setProperty(
        "--minesweeper-width",
        "800px"
      );
      document.documentElement.style.setProperty("--minesweeper-rows", "16");
      document.documentElement.style.setProperty("--minesweeper-cols", "16");
    } else if (this.level == "expert") {
      document.documentElement.style.setProperty(
        "--minesweeper-width",
        "1400px"
      );
      document.documentElement.style.setProperty("--minesweeper-rows", "16");
      document.documentElement.style.setProperty("--minesweeper-cols", "30");
      document.documentElement.style.setProperty(
        "--minesweeper-font-size",
        "40px"
      );
    } else if (this.level == "begginer") {
      document.documentElement.style.setProperty(
        "--minesweeper-width",
        "650px"
      );
      document.documentElement.style.setProperty("--minesweeper-rows", "8");
      document.documentElement.style.setProperty("--minesweeper-cols", "8");
      document.documentElement.style.setProperty(
        "--minesweeper-font-size",
        "50px"
      );
    }
  }

  startGame(rowNumber = this.cellRows, columnNumber = this.cellColumns) {
    for (let i = 0; columnNumber > i; i++) {
      for (let j = 0; rowNumber > j; j++) {
        const cell = new Cell(j, i);
        actualCells.push(cell);
        cell.init();
        this.game.appendChild(cell.cellDOM);
      }
    }
  }

  drawBombs(numberOfBombs = this.numberOfBombs) {
    for (let i = 0; i < numberOfBombs; i++) {
      cellsWithNoBomb = [];
      const bombIndex = Math.floor(Math.random() * (this.numberOfCells - i));
      actualCells.filter((cell) => {
        if (cell.isBomb === false) {
          cellsWithNoBomb.push(cell);
        }
      });
      cellsWithNoBomb[bombIndex].cellIsBomb();
    }
  }

  endGame() {
    const endBombs = [];
    actualCells.filter((cell) => {
      if (cell.isBomb) {
        endBombs.push(cell);
      }
    });
    endBombs.forEach((cell) => {
      cell.cellIsBomb();
      cell.cellDOM.classList.add("cellIsBomb");
      if (cell.cellDOM.firstChild) {
        cell.cellDOM.firstChild.remove();
      }
    });
    this.isEndGame = true;
    // gsapAnimation.faceEnd();
    actualCells = [];
    timerCounter.stopTimerCounter();
  }

  playerWin() {
    timerCounter.stopTimerCounter();
    alert(`wygrałeś poziom ${this.level} w ${timerCounter.time} sekund`);
  }

  checkWin() {
    revealedCells = [];
    const numberToWin = actualCells.length - startValues.numberOfBombs;
    actualCells.filter((cell) => {
      if (cell.isRevealed === true) {
        revealedCells.push(cell);
      }
    });
    if (revealedCells.length === numberToWin) {
      this.playerWin();
    }
  }

  restartGame() {
    levelIndex++;
    if (levelIndex > 2) {
      levelIndex = 0;
    }
    startValues = {
      game: GAME,
      cellColumns: gameLevels[levelIndex].cellColumns,
      cellRows: gameLevels[levelIndex].cellRows,
      numberOfCells: gameLevels[levelIndex].numberOfCells,
      numberOfBombs: gameLevels[levelIndex].numberOfBombs,
      numberOfFlags: gameLevels[levelIndex].numberOfFlags,
      level: gameLevels[levelIndex].level,
    };
    timerCounter.time = 0;
    timerCounter.changeNumberInTimer();
    this.endGame();
    GAME.innerHTML = "";
    game = new Game(
      startValues.game,
      startValues.numberOfCells,
      startValues.cellColumns,
      startValues.cellRows,
      startValues.numberOfBombs,
      startValues.level
    );
    bombCounter.bombAmount = startValues.numberOfFlags;
    game.init();
    // gsapAnimation.faceStart();
    gameFeatures.init();
    bombCounter.init();
    timerCounter.stopTimerCounter();
    timerCounter.startTimerCounter();
  }
}

export let game = new Game(
  startValues.game,
  startValues.numberOfCells,
  startValues.cellColumns,
  startValues.cellRows,
  startValues.numberOfBombs,
  startValues.level
);
