import { actualCells, startValues, game } from "./Game.js";
import { gsapAnimation } from "./gsapAnimation.js";

class BombCounter {
  constructor(element) {
    this.element = element;
  }

  bombAmount = startValues.numberOfFlags;

  init() {
    actualCells.forEach((cell) => {
      cell.cellDOM.addEventListener("contextmenu", (e) => {
        this.changeBombCounter(e);
        cell.changeIsFlagged();
      });
    });
    this.element.innerHTML = this.bombAmount;
  }

  changeBombCounter(e) {
    e.preventDefault();
    const imgFlag = this.createFlagImg();
    if (game.isEndGame === false) {
      if (e.target.parentNode.classList.contains("flagCell")) {
        e.target.parentNode.classList.remove("flagCell");
        e.target.remove();
        this.bombAmount++;
      } else if (e.target.classList.contains("flagCell")) {
        e.target.innerHTML = "";
        e.target.classList.remove("flagCell");
        this.bombAmount++;
      } else if (
        this.bombAmount &&
        !e.target.classList.contains("cellRevealed")
      ) {
        e.target.classList.add("flagCell");
        e.target.appendChild(imgFlag);
        gsapAnimation.flagAnimation(imgFlag);
        this.bombAmount--;
      }

      this.element.innerHTML = this.bombAmount;
    }
  }

  createFlagImg() {
    const imgFlag = document.createElement("img");
    imgFlag.classList.add("flag");
    imgFlag.setAttribute("src", "./assets/flag.svg");
    return imgFlag;
  }
}

export const bombCounter = new BombCounter(
  document.querySelector(".interface__bomb-counter")
);
