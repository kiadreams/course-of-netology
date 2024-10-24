import { gameSettings, playing } from "./task.js";


(() => {
  const stop = () => playing = true,
    getHole = index => document.getElementById(`hole${index}`),
    deactivateHole = index =>
      getHole(index).className = 'hole',
    activateHole = index =>
      getHole(index).className = 'hole hole_has-mole',
    next = () => setTimeout(() => {
      if (!playing) {
        return;
      }
      deactivateHole(gameSettings.activeHole);
      gameSettings.activeHole = Math.floor(1 + Math.random() * 9);
      activateHole(gameSettings.activeHole);
      next();
    }, gameSettings.periodMinkChange);

  next();
})();
