import { GAME, game } from "./Game.js";

class GsapAnimation {
  constructor(face) {
    this.face = face;
  }

  flagAnimation(flag) {
    gsap.to(flag, {
      rotateY: 360,
      duration: 0.5,
      ease: "bounce.inOut",
    });
  }

  faceTension() {
    GAME.addEventListener("mousedown", (e) => {
      if (
        e.buttons === 1 &&
        !e.target.classList.contains("cellRevealed") &&
        e.target.classList.contains("game__cell") &&
        !e.target.classList.contains("flagCell") &&
        !game.isEndGame
      ) {
        gsap.to(this.face, { fill: "yellow", duration: 0.3 });
      }
    });
    window.addEventListener("mouseup", (e) => {
      if (!game.isEndGame) {
        gsap.to(this.face, { fill: "black", duration: 0.3 });
      }
    });
  }

  faceEnd() {
    gsap.to(this.face, { fill: "red" });
  }

  faceStart() {
    gsap.to(this.face, { fill: "black" });
  }
}

export const gsapAnimation = new GsapAnimation(
  document.querySelector(".interface__button__face")
);
