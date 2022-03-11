import { timerCounter } from "./TimerCounter.js";
import { bombCounter } from "./BombCounter.js";
import { game } from "./Game.js";
import { gameFeatures } from "./GameFeatures.js";
// import { gsapAnimation } from "./GsapAnimation.js";

const face = document.querySelector(".interface__button__face");
face.addEventListener("click", () => {
  game.restartGame();
});
// gsapAnimation.faceTension();

game.init();

timerCounter.startTimerCounter();
bombCounter.init();

gameFeatures.init();
